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
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const MAXP=5;
$('sellPrice').insertAdjacentHTML('afterend','<label style="display:flex;gap:8px;align-items:center;margin-bottom:12px"><input type="checkbox" id="sellNeg" style="width:auto;margin:0"> Price is negotiable</label>');
$('sellState').insertAdjacentHTML('afterend','<label>City / area</label><input type="text" id="sellCity" placeholder="e.g. Owerri, Ikeja, Onitsha">');
const si=$('sellImage');si.multiple=true;
if(si.previousElementSibling)si.previousElementSibling.textContent='Photos (up to 5)';
function shrink(file){return new Promise(res=>{
 const img=new Image(),u=URL.createObjectURL(file);
 img.onload=()=>{const r=Math.min(1,1280/Math.max(img.width,img.height));
  const c=document.createElement('canvas');c.width=Math.round(img.width*r);c.height=Math.round(img.height*r);
  c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);
  c.toBlob(b=>res(b||file),'image/jpeg',0.8);};
 img.onerror=()=>{URL.revokeObjectURL(u);res(file);};
 img.src=u;});}
window.submitListing=async function(){
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){alert('Please log in first.');return;}
 const err=$('sellError'),ok=$('sellSuccess');err.style.display='none';ok.style.display='none';
 const title=$('sellTitle').value.trim(),priceRaw=$('sellPrice').value.trim();
 const price=parseFloat(priceRaw.replace(/[^0-9.]/g,''));
 if(!title||!priceRaw||isNaN(price)){err.textContent='Add a title and a valid price.';err.style.display='block';return;}
 const files=Array.from(si.files||[]).slice(0,MAXP);
 const btn=$('sellSubmitBtn');btn.disabled=true;btn.textContent='Posting...';
 const fail=m=>{err.textContent=m;err.style.display='block';btn.disabled=false;btn.textContent='Post listing';};
 const images=[];
 for(let i=0;i<files.length;i++){
  btn.textContent='Uploading photo '+(i+1)+' of '+files.length+'...';
  const blob=await shrink(files[i]);
  const path=session.user.id+'/'+Date.now()+'-'+i+'.jpg';
  const{error:ue}=await supabaseClient.storage.from('listing-images').upload(path,blob,{contentType:'image/jpeg'});
  if(ue)return fail('Image upload failed: '+ue.message);
  images.push(supabaseClient.storage.from('listing-images').getPublicUrl(path).data.publicUrl);
 }
 btn.textContent='Posting...';
 const row={seller_id:session.user.id,title,description:$('sellDesc').value.trim(),price,category_id:$('sellCategory').value,state:$('sellState').value,city:$('sellCity').value.trim()||null,negotiable:$('sellNeg').checked,condition:$('sellCondition').value,image_url:images[0]||null,images};
 let{error}=await supabaseClient.from('listings').insert(row);
 if(error&&/condition/i.test(error.message)){delete row.condition;({error}=await supabaseClient.from('listings').insert(row));}
 if(error)return fail(error.message);
 btn.disabled=false;btn.textContent='Post listing';ok.textContent='Listing posted!';ok.style.display='block';
 ['sellTitle','sellPrice','sellDesc','sellCity'].forEach(id=>$(id).value='');$('sellNeg').checked=false;si.value='';
 loadListings();setTimeout(closeSell,1200);
};
function ago(d){const s=(Date.now()-new Date(d))/1000;if(!(s>=0))return '';if(s<3600)return Math.max(1,Math.round(s/60))+' min ago';if(s<86400)return Math.round(s/3600)+' hr ago';const n=Math.round(s/86400);return n<30?n+' day'+(n>1?'s':'')+' ago':new Date(d).toLocaleDateString();}
window.openDetail=async function(l){
 currentDetailListing=l;
 const{data:{session}}=await supabaseClient.auth.getSession();
 const own=session&&session.user.id===l.seller_id;
 const imgs=l.images&&l.images.length?l.images:(l.image_url?[l.image_url]:[]);
 const sim=currentListings.filter(x=>x.id!==l.id&&x.category_id===l.category_id).slice(0,6);
 const where=l.city?l.city+', '+l.state:l.state;
 $('detailContent').innerHTML=
 '<div class="detail-image">'+(imgs.length?'<img id="dMainImg" src="'+esc(imgs[0])+'" alt="">':(CATEGORY_ICONS[l.category_id]||'🛍️'))+'<button class="fav-btn detail-fav-btn" id="detailFavBtn">'+(currentFavorites.has(l.id)?'♥':'♡')+'</button></div>'+
 (imgs.length>1?'<div class="bq-thumbs">'+imgs.map((u,i)=>'<img src="'+esc(u)+'" data-i="'+i+'" class="'+(i?'':'on')+'">').join('')+'</div>':'')+
 '<h3>'+esc(l.title)+'</h3>'+
 '<p class="price" style="font-size:18px;margin:6px 0 6px">₦'+Number(l.price).toLocaleString()+(l.negotiable?'<span class="bq-neg">Negotiable</span>':'')+'</p>'+
 '<p class="bq-meta">👁 <span id="dViews">'+(l.views||0)+'</span> views · Posted '+ago(l.created_at)+'</p>'+
 '<span class="detail-tag">📍 '+esc(where)+'</span><span class="detail-tag">'+esc(CATEGORY_LABELS[l.category_id]||l.category_id)+'</span>'+(l.condition?'<span class="detail-tag">'+(l.condition==='new'?'New':'Used')+'</span>':'')+
 (l.status&&l.status!=='active'?'<p style="color:#c0392b !important;font-weight:bold;margin:8px 0">This listing is '+esc(l.status)+'.</p>':'')+
 '<p class="detail-desc" style="white-space:pre-wrap">'+esc(l.description||'No description provided.')+'</p>'+
 '<p class="bq-meta">Seller: <b id="dSeller">...</b></p>'+
 (own?'<button class="button" id="dManage">Manage this listing</button>':'<button class="button" id="contactSellerBtn" onclick="contactSeller()">Contact seller</button><button class="button" id="dShare" style="background:#0277bd;margin-top:8px">Share</button><button class="report-btn button" onclick="openReport(currentDetailListing.id, currentDetailListing.seller_id)">🚩 Report this listing</button>')+
 (own?'<button class="button" id="dShare" style="background:#0277bd;margin-top:8px">Share</button>':'')+
 (sim.length?'<h4 class="bq-simh">Similar listings</h4><div class="bq-sim">'+sim.map(x=>'<div data-id="'+x.id+'">'+(x.image_url?'<img src="'+esc(x.image_url)+'" alt="">':'<img alt="" style="background:#eee">')+'<span>'+esc(x.title)+'</span><b>₦'+Number(x.price).toLocaleString()+'</b></div>').join('')+'</div>':'');
 $('detailFavBtn').onclick=()=>toggleFavorite(l.id,$('detailFavBtn'));
 document.querySelectorAll('.bq-thumbs img').forEach(t=>t.onclick=()=>{$('dMainImg').src=t.src;document.querySelectorAll('.bq-thumbs img').forEach(x=>x.classList.toggle('on',x===t));});
 $('dShare').onclick=async()=>{const url=location.origin+location.pathname+'?l='+l.id;try{if(navigator.share){await navigator.share({title:l.title,text:l.title+' - ₦'+Number(l.price).toLocaleString()+' on BuyQora',url});}else{await navigator.clipboard.writeText(url);alert('Link copied!');}}catch(e){}};
 if($('dManage'))$('dManage').onclick=()=>{closeDetail();openMine();};
 document.querySelectorAll('.bq-sim div').forEach(d=>d.onclick=()=>{const x=currentListings.find(z=>String(z.id)===d.dataset.id);if(x)openDetail(x);});
 $('detailOverlay').classList.add('show');
 getProfileName(l.seller_id).then(n=>{const s=$('dSeller');if(s)s.textContent=n;});
 if(!own){try{const k='bqv'+l.id;if(!sessionStorage.getItem(k)){sessionStorage.setItem(k,'1');supabaseClient.rpc('increment_listing_views',{p_id:String(l.id)}).then(r=>{if(!r.error){l.views=(l.views||0)+1;const v=$('dViews');if(v)v.textContent=l.views;}});}}catch(e){}}
};
const f2=document.createElement('div');f2.className='bq-filter2';
f2.innerHTML='<input id="bqMin" type="number" inputmode="numeric" placeholder="Min ₦"><input id="bqMax" type="number" inputmode="numeric" placeholder="Max ₦"><input id="bqCity" type="text" placeholder="City">';
document.querySelector('.bq-filter').insertAdjacentElement('afterend',f2);
const baseRender=window.renderListings;
window.renderListings=function(){
 const lo=parseFloat($('bqMin').value),hi=parseFloat($('bqMax').value),cq=$('bqCity').value.trim().toLowerCase();
 const all=currentListings;
 if(lo>0||hi>0||cq){currentListings=all.filter(l=>(!(lo>0)||Number(l.price)>=lo)&&(!(hi>0)||Number(l.price)<=hi)&&(!cq||(l.city||'').toLowerCase().includes(cq)));}
 try{baseRender();}finally{currentListings=all;}
};
['bqMin','bqMax','bqCity'].forEach(id=>$(id).addEventListener('input',()=>renderListings()));
$('bqNav').addEventListener('click',e=>{if(e.target.closest('[data-n="home"]')){['bqMin','bqMax','bqCity'].forEach(id=>$(id).value='');renderListings();}});
const p=new URLSearchParams(location.search).get('l');
if(p){let n=0;const t=setInterval(()=>{const x=currentListings.find(z=>String(z.id)===p);if(x){clearInterval(t);openDetail(x);}else if(++n>20)clearInterval(t);},500);}
})();
(function(){
const $=id=>document.getElementById(id);
const MAX=1000000000;
function bad(raw){
 const n=parseFloat(String(raw).replace(/[^0-9.]/g,''));
 if(isNaN(n)||n<=0)return 'Enter a price greater than zero.';
 if(n>MAX)return 'Price is too high. The maximum is ₦1,000,000,000. Check for extra digits.';
 return '';
}
const orig=window.submitListing;
window.submitListing=function(){
 const m=bad($('sellPrice').value);
 if(m){const e=$('sellError');e.textContent=m;e.style.display='block';$('sellSuccess').style.display='none';return;}
 return orig.apply(this,arguments);
};
const es=$('editSave'),oe=es.onclick;
es.onclick=function(){
 const m=bad($('editPrice').value);
 if(m){const e=$('editError');e.textContent=m;e.style.display='block';return;}
 return oe.apply(this,arguments);
};
})();
(function(){
const $=id=>document.getElementById(id);
document.querySelector('#authOverlay .switch').insertAdjacentHTML('afterend','<p class="switch" id="bqForgotWrap"><a id="bqForgot">Forgot password?</a></p>');
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="resetOverlay"><div class="modal" style="color:#222"><h3>Set a new password</h3><p class="error" id="resetError"></p><p class="success" id="resetSuccess"></p><input type="password" id="resetPw1" placeholder="New password (6+ characters)"><input type="password" id="resetPw2" placeholder="Repeat new password"><button class="button" id="resetSave">Save new password</button></div></div>');
const oldUI=window.updateAuthUI;
window.updateAuthUI=function(){oldUI.apply(this,arguments);$('bqForgotWrap').style.display=(authMode==='login')?'block':'none';};
window.updateAuthUI();
$('bqForgot').onclick=async()=>{
 const err=$('authError');err.style.display='none';
 const email=$('authEmail').value.trim();
 if(!email){err.textContent='Type your email in the box above first, then tap Forgot password.';err.style.display='block';return;}
 const{error}=await supabaseClient.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
 if(error){err.textContent=error.message;err.style.display='block';return;}
 alert('Done! We sent a password reset link to '+email+'. Open your email and tap the link.');
};
function showReset(){$('resetError').style.display='none';$('resetSuccess').style.display='none';$('resetOverlay').classList.add('show');}
supabaseClient.auth.onAuthStateChange(ev=>{if(ev==='PASSWORD_RECOVERY'){closeAuth();showReset();}});
if(location.hash.indexOf('type=recovery')>-1){closeAuth();showReset();}
$('resetSave').onclick=async()=>{
 const e=$('resetError'),s=$('resetSuccess');e.style.display='none';s.style.display='none';
 const a=$('resetPw1').value,b=$('resetPw2').value;
 if(a.length<6){e.textContent='Password must be at least 6 characters.';e.style.display='block';return;}
 if(a!==b){e.textContent='The two passwords do not match.';e.style.display='block';return;}
 const{error}=await supabaseClient.auth.updateUser({password:a});
 if(error){e.textContent=error.message;e.style.display='block';return;}
 s.textContent='Password changed! You are now logged in.';s.style.display='block';
 history.replaceState(null,'',location.pathname);
 setTimeout(()=>{$('resetOverlay').classList.remove('show');refreshAccountBar();},1500);
};
})();
(function(){
const SUPPORT_EMAIL='princelongmoney@gmail.com';
const $=id=>document.getElementById(id);
const PAGES={
terms:['Terms of Use',`<p><i>Last updated: October 2026</i></p>
<h4>1. About BuyQora</h4><p>BuyQora is an online marketplace where people in Nigeria post items and services and contact each other. BuyQora is only a platform. We are not the buyer or the seller, and we do not handle payments, delivery or returns.</p>
<h4>2. Your account</h4><p>You must be 18 or older. Give correct details and keep your password safe. You are responsible for everything done with your account.</p>
<h4>3. Posting listings</h4><p>Only post items you own or are allowed to sell. Use an honest title, price, photos and description. Mark an item as sold or remove it when it is gone.</p>
<h4>4. Not allowed</h4><p>Illegal items, weapons, drugs, stolen goods, fake or counterfeit goods, adult content, fake listings, scams, spam, harassment, impersonation, and sharing other people's private details.</p>
<h4>5. Staying safe</h4><p>Meet in a public place, inspect the item before you pay, and never send money in advance to someone you do not know. BuyQora will never ask for your password or any code sent to your email. BuyQora is not responsible for deals between users.</p>
<h4>6. Reports and enforcement</h4><p>You can report any listing or user inside the app. We may remove listings and suspend or ban accounts that break these rules, with or without notice.</p>
<h4>7. Your content</h4><p>You keep ownership of your photos and text. You allow BuyQora to show them in the app so your listing can be seen.</p>
<h4>8. Liability</h4><p>BuyQora is provided as it is. To the extent the law allows, we are not liable for losses from deals between users.</p>
<h4>9. Changes</h4><p>We may update these terms. Using BuyQora after an update means you accept it.</p>
<h4>10. Contact</h4><p>Questions? Email ${SUPPORT_EMAIL}.</p>`],
privacy:['Privacy Policy',`<p><i>Last updated: October 2026</i></p>
<h4>What we collect</h4><p>Your name, email, phone number and state; the listings, photos and descriptions you post; your messages to other users; your favorites; and reports you make.</p>
<h4>How we use it</h4><p>To run your account, show your listings, let buyers and sellers message each other, send account emails such as sign-up confirmation and password reset, keep the marketplace safe, and handle reports.</p>
<h4>What other people can see</h4><p>Your name, your listings and photos, and your listing city and state are visible to other users. Your email is not shown publicly. Messages are visible only to the people in that conversation and to our admins when a report needs review.</p>
<h4>Who we share data with</h4><p>We do not sell your data. We use trusted services to run BuyQora, including Supabase for hosting data and photos and Brevo for sending emails. They only handle data to provide those services.</p>
<h4>Keeping your data</h4><p>We keep your data while your account is active. You can ask us to delete your account and data at any time by emailing ${SUPPORT_EMAIL}.</p>
<h4>Security</h4><p>We take reasonable steps to protect your data, but no online service is completely secure. Choose a strong password and never share it.</p>
<h4>Children</h4><p>BuyQora is for people aged 18 and over.</p>
<h4>Changes and contact</h4><p>We may update this policy. For any question, email ${SUPPORT_EMAIL}.</p>`],
contact:['Contact & Support',`<p>Need help, found a problem, or want your account or data deleted?</p>
<p>Email us: <b>${SUPPORT_EMAIL}</b></p>
<p>Please include your account email and a short description. If you are reporting a scam, include the listing title and the seller name.</p>
<p>To report a listing or a user quickly, open the listing or chat and tap the Report button.</p>`]
};
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="legalOverlay"><div class="modal" style="color:#222;max-width:600px"><span class="close" id="legalClose">✕</span><h3 id="legalTitle"></h3><div id="legalBody" style="font-size:14px;line-height:1.6"></div></div></div>');
function openLegal(k){
 $('legalTitle').textContent=PAGES[k][0];
 $('legalBody').innerHTML=PAGES[k][1];
 $('legalBody').querySelectorAll('h4').forEach(h=>{h.style.margin='14px 0 4px';});
 $('legalOverlay').classList.add('show');
}
$('legalClose').onclick=()=>$('legalOverlay').classList.remove('show');
const f=document.querySelector('footer');
if(f){
 f.style.paddingBottom='100px';
 f.insertAdjacentHTML('afterbegin','<p id="legalLinks" style="margin-bottom:12px"><a data-l="terms" style="color:#ff6b00;cursor:pointer">Terms</a> &nbsp;·&nbsp; <a data-l="privacy" style="color:#ff6b00;cursor:pointer">Privacy</a> &nbsp;·&nbsp; <a data-l="contact" style="color:#ff6b00;cursor:pointer">Contact</a></p>');
 $('legalLinks').onclick=e=>{const a=e.target.closest('[data-l]');if(a)openLegal(a.dataset.l);};
}
})();
(function(){
const links=document.getElementById('legalLinks');
const p=document.getElementById('products');
if(!links||!p)return;
const box=document.createElement('div');
box.style.cssText='text-align:center;padding:24px 16px 110px;font-size:14px;color:#aaa';
links.style.marginBottom='8px';
box.appendChild(links);
box.insertAdjacentHTML('beforeend','<p style="font-size:12px">© 2026 BuyQora</p>');
p.insertAdjacentElement('afterend',box);
})();
