/* BuyQora home + bottom nav + New/Used. Runs after index.html's own script (defer). */
(function(){
const CATS=[['trending','🔥','Trending'],['vehicles','🚗','Vehicles'],['property','🏡','Property'],['phones','📱','Phones & Tablets'],['electronics','💻','Electronics'],['home','🛋️','Home, Furniture & Appliances'],['fashion','👗','Fashion'],['beauty','🧴','Beauty & Personal Care'],['services','🔧','Services'],['repair','⛑️','Repair & Construction'],['equipment','🏭','Commercial Equipment & Tools'],['leisure','🏋️','Leisure & Activities'],['kids','🧸','Babies & Kids'],['food','🥕','Food, Agriculture & Farming'],['animals','🐕','Animals & Pets'],['jobs','💼','Jobs'],['seeking','📄','Seeking Work - CVs'],['business','🧳','Business & Industry']];
CATS.forEach(c=>{CATEGORY_ICONS[c[0]]=c[1];CATEGORY_LABELS[c[0]]=c[2];});
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
async function authed(fn){const{data:{session}}=await supabaseClient.auth.getSession();if(!session){openAuth('login');return;}fn(session);}
let condFilter='all',sortMode='new';

const root=document.createElement('div');root.id='bq';
root.innerHTML=`<div class="bq-top"><div class="bq-bar"><span class="bq-logo">BuyQora</span><button id="bqBell" aria-label="Notifications">🔔<span id="bqBellBadge" class="bq-badge"></span></button></div>
<h2>What are you looking for?</h2><div class="bq-search"><select id="bqState"></select><div class="bq-input"><input id="bqQ" type="search" placeholder="I am looking for..."><span>🔍</span></div></div></div>
<div class="bq-chips"><button data-a="sell">💰 How to sell</button><button data-a="buy">🛒 How to buy</button><button data-a="admin" id="bqAdmin" style="display:none">🛡️ Admin</button></div>
<h3 class="bq-h" id="bqRecH" style="display:none">Recommended for you</h3><div class="bq-rec" id="bqRec"></div>
<div class="bq-cats" id="bqCats">${CATS.map(c=>`<button class="bq-cat" data-c="${c[0]}"><i>${c[1]}</i>${esc(c[2])}</button>`).join('')}</div>
<div class="bq-filter"><div class="bq-seg" id="bqCond"><button data-v="all" class="on">All</button><button data-v="new">New</button><button data-v="used">Used</button></div><select id="bqSort"><option value="new">Newest</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select></div>`;
document.body.prepend(root);
const nav=document.createElement('nav');nav.id='bqNav';
nav.innerHTML=[['home','🏠','Home'],['saved','🔖','Saved'],['sell','➕','Sell'],['msg','💬','Messages'],['me','👤','Profile']].map(n=>`<button data-n="${n[0]}"${n[0]==='home'?' class="on"':''}><b>${n[1]}</b>${n[2]}</button>`).join('');
document.body.appendChild(nav);

$('bqState').innerHTML='<option value="all">All states</option>'+BUYQORA_STATES.map(s=>`<option>${s}</option>`).join('');
$('bqState').onchange=e=>{activeState=e.target.value;renderListings();};
$('bqQ').oninput=()=>renderListings();
$('bqQ').onkeydown=e=>{if(e.key==='Enter'){e.target.blur();$('products').scrollIntoView({behavior:'smooth'});}};
$('bqCond').onclick=e=>{const b=e.target.closest('[data-v]');if(!b)return;condFilter=b.dataset.v;
 document.querySelectorAll('#bqCond button').forEach(x=>x.classList.toggle('on',x===b));renderListings();};
$('bqSort').onchange=e=>{sortMode=e.target.value;renderListings();};
$('bqBell').onclick=()=>authed(openNotifications);
$('bqCats').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;const c=b.dataset.c;activeCategory=c==='trending'?'all':c;
 document.querySelectorAll('.bq-cat').forEach(x=>x.classList.toggle('on',x===b&&c!=='trending'));renderListings();$('products').scrollIntoView({behavior:'smooth'});};
document.querySelector('.bq-chips').onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
 if(a==='admin')openAdmin();
 if(a==='sell')alert('How to sell:\n1. Log in or sign up\n2. Tap Sell\n3. Add title, price, category, New or Used, state and a photo\n4. Post, then reply to buyers in Messages');
 if(a==='buy')alert('How to buy:\n1. Search or pick a category\n2. Open a listing and tap Contact seller\n3. Agree a price and meet in a safe public place\n4. Pay only after you inspect the item');};
nav.onclick=e=>{const b=e.target.closest('[data-n]');if(!b)return;const n=b.dataset.n;
 if(n==='home'){activeCategory='all';activeState='all';condFilter='all';sortMode='new';$('bqState').value='all';$('bqQ').value='';$('bqSort').value='new';
  document.querySelectorAll('#bqCond button').forEach(x=>x.classList.toggle('on',x.dataset.v==='all'));
  document.querySelectorAll('.bq-cat').forEach(x=>x.classList.remove('on'));renderListings();window.scrollTo({top:0,behavior:'smooth'});}
 if(n==='saved')authed(openFavorites);
 if(n==='sell')authed(openSell);
 if(n==='msg')authed(openInbox);
 if(n==='me')authed(openProfile);};

document.querySelector('#profileOverlay .modal').insertAdjacentHTML('beforeend','<button class="button" id="bqLogout" style="background:#555;margin-top:10px">Log out</button>');
$('bqLogout').onclick=async()=>{closeProfile();await logout();};

function sync(){const b=$('notifBadge');const t=b&&b.style.display!=='none'?b.textContent:'';const bb=$('bqBellBadge');bb.textContent=t;bb.style.display=t?'inline-block':'none';$('bqAdmin').style.display=isAdmin?'':'none';}
new MutationObserver(sync).observe($('accountBar'),{childList:true,subtree:true,characterData:true,attributes:true});

const sc=$('sellCategory');sc.innerHTML=CATS.filter(c=>c[0]!=='trending').map(c=>`<option value="${c[0]}">${esc(c[2])}</option>`).join('');
sc.insertAdjacentHTML('afterend','<label>Condition</label><select id="sellCondition"><option value="new">New</option><option value="used">Used</option></select>');

function renderRec(){const rec=currentListings.filter(l=>l.image_url).slice(0,10);$('bqRecH').style.display=rec.length?'':'none';
 $('bqRec').innerHTML=rec.map(l=>`<div data-id="${l.id}"><img src="${esc(l.image_url)}" alt="" loading="lazy"><span>${esc(l.title)}</span></div>`).join('');}
$('bqRec').onclick=e=>{const d=e.target.closest('[data-id]');if(!d)return;const l=currentListings.find(x=>String(x.id)===d.dataset.id);if(l)openDetail(l);};

window.renderListings=function(){
 const grid=$('productGrid'),q=$('bqQ').value.trim().toLowerCase();
 const f=currentListings.filter(l=>(activeCategory==='all'||l.category_id===activeCategory)&&(activeState==='all'||l.state===activeState)&&(condFilter==='all'||l.condition===condFilter)&&(!q||(l.title||'').toLowerCase().includes(q)||(l.description||'').toLowerCase().includes(q)));
 if(sortMode==='lo')f.sort((a,b)=>Number(a.price)-Number(b.price));
 else if(sortMode==='hi')f.sort((a,b)=>Number(b.price)-Number(a.price));
 else f.sort((a,b)=>new Date(b.created_at||0)-new Date(a.created_at||0));
 currentFilteredListings=f;
 document.querySelector('#products h2').textContent=activeCategory==='all'?'Trending':(CATEGORY_LABELS[activeCategory]||'Listings');
 renderRec();
 if(!f.length){grid.innerHTML='<div class="empty-state">No listings match yet. Try another category or state, or post one yourself.</div>';return;}
 grid.innerHTML=f.map((l,i)=>`<div class="product" data-idx="${i}"><div class="product-image">${l.image_url?`<img src="${esc(l.image_url)}" alt="" loading="lazy">`:(CATEGORY_ICONS[l.category_id]||'🛍️')}${l.condition?`<span class="bq-cond ${esc(l.condition)}">${l.condition==='new'?'New':'Used'}</span>`:''}<button class="fav-btn" data-listing-id="${l.id}">${currentFavorites.has(l.id)?'♥':'♡'}</button></div><h3>${esc(l.title)}</h3><p class="price">₦${Number(l.price).toLocaleString()}</p><p class="loc">📍 ${esc(l.state)}</p></div>`).join('');
};

window.submitListing=async function(){
 const{data:{session}}=await supabaseClient.auth.getSession();if(!session){alert('Please log in first.');return;}
 const err=$('sellError'),ok=$('sellSuccess');err.style.display='none';ok.style.display='none';
 const title=$('sellTitle').value.trim(),priceRaw=$('sellPrice').value.trim(),category_id=$('sellCategory').value,state=$('sellState').value,description=$('sellDesc').value.trim(),condition=$('sellCondition').value,fileInput=$('sellImage'),file=fileInput.files[0];
 const price=parseFloat(priceRaw.replace(/[^0-9.]/g,''));
 if(!title||!priceRaw||isNaN(price)){err.textContent='Add a title and a valid price.';err.style.display='block';return;}
 const btn=$('sellSubmitBtn');btn.disabled=true;btn.textContent='Posting...';
 const fail=m=>{err.textContent=m;err.style.display='block';btn.disabled=false;btn.textContent='Post listing';};
 let image_url=null;
 if(file){const path=`${session.user.id}/${Date.now()}.${file.name.split('.').pop()}`;
  const{error:ue}=await supabaseClient.storage.from('listing-images').upload(path,file);
  if(ue)return fail('Image upload failed: '+ue.message);
  image_url=supabaseClient.storage.from('listing-images').getPublicUrl(path).data.publicUrl;}
 const row={seller_id:session.user.id,title,description,price,category_id,state,image_url,condition};
 let{error}=await supabaseClient.from('listings').insert(row);
 if(error&&/condition/i.test(error.message)){delete row.condition;({error}=await supabaseClient.from('listings').insert(row));}
 if(error)return fail(error.message);
 btn.disabled=false;btn.textContent='Post listing';ok.textContent='Listing posted!';ok.style.display='block';
 $('sellTitle').value='';$('sellPrice').value='';$('sellDesc').value='';fileInput.value='';loadListings();setTimeout(closeSell,1200);
};
renderListings();
})();
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
document.body.insertAdjacentHTML('beforeend',`
<div class="modal-overlay" id="myOverlay"><div class="modal" style="color:#222;max-width:600px"><span class="close" id="myClose">✕</span><h3>My listings</h3><div id="myList"></div></div></div>
<div class="modal-overlay" id="editOverlay"><div class="modal" style="color:#222"><span class="close" id="editClose">✕</span><h3>Edit listing</h3><p class="error" id="editError"></p>
<label>Title</label><input id="editTitle"><label>Price (₦)</label><input id="editPrice">
<label>Category</label><select id="editCategory"></select>
<label>Condition</label><select id="editCondition"><option value="new">New</option><option value="used">Used</option></select>
<label>State</label><select id="editState"></select>
<label>Description</label><textarea id="editDesc"></textarea>
<button class="button" id="editSave">Save changes</button></div></div>`);
$('editCategory').innerHTML=$('sellCategory').innerHTML;
$('editState').innerHTML=BUYQORA_STATES.map(s=>'<option>'+s+'</option>').join('');
const lo=$('bqLogout');
if(lo){lo.insertAdjacentHTML('beforebegin','<button class="button" id="bqMine" style="margin-top:10px">My listings</button>');
 $('bqMine').onclick=()=>{closeProfile();openMine();};}
$('myClose').onclick=()=>$('myOverlay').classList.remove('show');
$('editClose').onclick=()=>$('editOverlay').classList.remove('show');
let mine=[],editing=null;
const LBL={active:['Live','#2e7d32'],paused:['Paused','#777'],sold:['Sold','#0277bd']};
async function openMine(){
 $('myOverlay').classList.add('show');
 const box=$('myList');box.innerHTML='<p style="color:#999">Loading...</p>';
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){box.innerHTML='<p>Please log in.</p>';return;}
 const{data,error}=await supabaseClient.from('listings').select('*').eq('seller_id',session.user.id).neq('status','removed').order('created_at',{ascending:false});
 if(error){box.innerHTML='<p style="color:#c0392b">'+esc(error.message)+'</p>';return;}
 mine=data||[];
 if(!mine.length){box.innerHTML='<p style="color:#999">You have no listings yet. Tap Sell to post one.</p>';return;}
 box.innerHTML=mine.map(l=>{
  const B=(a,t,c)=>'<button data-a="'+a+'" data-id="'+l.id+'" style="background:'+(c||'#ff6b00')+';color:#fff;border:0;border-radius:6px;padding:6px 10px;font-size:12px;font-weight:bold">'+t+'</button>';
  const st=LBL[l.status]||[l.status,'#777'];
  let btns='';
  if(l.status==='active')btns=B('edit','Edit')+B('pause','Pause','#777')+B('sold','Sold','#2e7d32')+B('renew','Renew','#0277bd')+B('delete','Delete','#c0392b');
  else if(l.status==='paused')btns=B('edit','Edit')+B('resume','Resume','#2e7d32')+B('sold','Sold','#0277bd')+B('delete','Delete','#c0392b');
  else btns=B('relist','Relist','#2e7d32')+B('delete','Delete','#c0392b');
  return '<div style="display:flex;gap:10px;padding:12px 0;border-bottom:1px solid #eee"><div style="width:64px;height:64px;flex:0 0 64px;border-radius:8px;background:#eee;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:26px">'+(l.image_url?'<img src="'+esc(l.image_url)+'" style="width:100%;height:100%;object-fit:cover">':'🛍️')+'</div><div style="flex:1;min-width:0"><div style="font-weight:bold;font-size:14px">'+esc(l.title)+'</div><div style="color:#ff6b00;font-weight:bold;font-size:13px">₦'+Number(l.price).toLocaleString()+' <span style="background:'+st[1]+';color:#fff;border-radius:999px;padding:1px 8px;font-size:11px;margin-left:4px">'+st[0]+'</span></div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">'+btns+'</div></div></div>';
 }).join('');
}
window.openMine=openMine;
$('myList').onclick=async e=>{
 const b=e.target.closest('button[data-a]');if(!b)return;
 const l=mine.find(x=>String(x.id)===b.dataset.id);if(!l)return;
 const a=b.dataset.a;
 if(a==='edit'){editing=l;$('editError').style.display='none';
  $('editTitle').value=l.title||'';$('editPrice').value=l.price||'';$('editCategory').value=l.category_id;
  $('editCondition').value=l.condition||'used';$('editState').value=l.state;$('editDesc').value=l.description||'';
  $('editOverlay').classList.add('show');return;}
 let upd=null;
 if(a==='pause')upd={status:'paused'};
 if(a==='resume'||a==='relist')upd={status:'active'};
 if(a==='sold')upd={status:'sold'};
 if(a==='renew')upd={status:'active',created_at:new Date().toISOString()};
 if(a==='delete'){if(!confirm('Delete this listing?'))return;upd={status:'removed'};}
 if(!upd)return;
 b.disabled=true;
 const{error}=await supabaseClient.from('listings').update(upd).eq('id',l.id);
 if(error){alert('Could not update: '+error.message);b.disabled=false;return;}
 await openMine();loadListings();
};
$('editSave').onclick=async()=>{
 if(!editing)return;
 const err=$('editError');err.style.display='none';
 const price=parseFloat(String($('editPrice').value).replace(/[^0-9.]/g,''));
 const title=$('editTitle').value.trim();
 if(!title||isNaN(price)){err.textContent='Add a title and a valid price.';err.style.display='block';return;}
 const upd={title,price,category_id:$('editCategory').value,state:$('editState').value,condition:$('editCondition').value,description:$('editDesc').value.trim()};
 let{error}=await supabaseClient.from('listings').update(upd).eq('id',editing.id);
 if(error&&/condition/i.test(error.message)){delete upd.condition;({error}=await supabaseClient.from('listings').update(upd).eq('id',editing.id));}
 if(error){err.textContent=error.message;err.style.display='block';return;}
 $('editOverlay').classList.remove('show');
 await openMine();loadListings();
};
})();
