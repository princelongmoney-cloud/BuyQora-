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
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="blockOverlay"><div class="modal" style="color:#222"><span class="close" id="blockClose">✕</span><h3>Blocked users</h3><div id="blockList"></div></div></div>');
$('blockClose').onclick=()=>$('blockOverlay').classList.remove('show');
const rep=document.querySelector('#chatOverlay button[onclick="reportCurrentChatUser()"]');
if(rep){
 rep.insertAdjacentHTML('beforebegin','<button id="chatBlockBtn" style="background:none;border:none;color:#c0392b;font-size:12.5px;cursor:pointer;float:right;margin:2px 0 0 12px">🚫 Block</button>');
 $('chatBlockBtn').onclick=async()=>{
  if(!currentChat)return;
  const{data:{session}}=await supabaseClient.auth.getSession();
  if(!session)return;
  if(!confirm('Block this user? You will not be able to message each other. You can unblock them later in Profile.'))return;
  const{error}=await supabaseClient.from('blocks').insert({blocker_id:session.user.id,blocked_id:currentChat.otherUserId});
  if(error&&error.code!=='23505'){alert('Could not block: '+error.message);return;}
  alert('User blocked.');
  closeChat();
 };
}
async function openBlocked(){
 const box=$('blockList');
 box.innerHTML='<p style="color:#999">Loading...</p>';
 $('blockOverlay').classList.add('show');
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){box.innerHTML='<p>Please log in.</p>';return;}
 const{data,error}=await supabaseClient.from('blocks').select('id,blocked_id').eq('blocker_id',session.user.id).order('created_at',{ascending:false});
 if(error){box.innerHTML='<p style="color:#c0392b">'+esc(error.message)+'</p>';return;}
 if(!data.length){box.innerHTML='<p style="color:#999">You have not blocked anyone.</p>';return;}
 for(const b of data){b.name=await getProfileName(b.blocked_id);}
 box.innerHTML=data.map(b=>'<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #eee"><span style="font-weight:bold">'+esc(b.name)+'</span><button data-id="'+b.id+'" style="background:#555;color:#fff;border:0;border-radius:6px;padding:7px 12px;font-size:12px;font-weight:bold">Unblock</button></div>').join('');
}
$('blockList').onclick=async e=>{
 const b=e.target.closest('button[data-id]');
 if(!b)return;
 b.disabled=true;
 const{error}=await supabaseClient.from('blocks').delete().eq('id',b.dataset.id);
 if(error){alert('Could not unblock: '+error.message);b.disabled=false;return;}
 openBlocked();
};
const lo=$('bqLogout');
if(lo){
 lo.insertAdjacentHTML('beforebegin','<button class="button" id="bqBlocked" style="background:#555;margin-top:10px">Blocked users</button>');
 $('bqBlocked').onclick=()=>{closeProfile();openBlocked();};
}
})();
(function(){
const s=document.createElement('style');
s.textContent='.modal{color:#222 !important} #inboxList .inbox-row>div:first-child{color:#222 !important}';
document.head.appendChild(s);
})();
(function(){
const $=id=>document.getElementById(id);
const st=document.createElement('style');
st.textContent='.detail-image{height:300px !important} #dMainImg{cursor:zoom-in} #bqViewer button{position:absolute;background:rgba(255,255,255,.2);color:#fff;border:0;border-radius:999px;width:46px;height:46px;font-size:26px;line-height:1;cursor:pointer;z-index:2} #bqVClose{top:16px;right:16px} #bqVPrev{left:10px;top:50%;transform:translateY(-50%)} #bqVNext{right:10px;top:50%;transform:translateY(-50%)}';
document.head.appendChild(st);
document.body.insertAdjacentHTML('beforeend','<div id="bqViewer" style="display:none;position:fixed;inset:0;background:#000;z-index:300;align-items:center;justify-content:center"><button id="bqVClose">✕</button><button id="bqVPrev">‹</button><img id="bqVImg" alt="" style="max-width:100%;max-height:100%;object-fit:contain"><button id="bqVNext">›</button><div id="bqVCount" style="position:absolute;bottom:22px;left:0;right:0;text-align:center;color:#fff;font-size:14px"></div></div>');
let list=[],idx=0;
function show(i){
 if(!list.length)return;
 idx=(i+list.length)%list.length;
 $('bqVImg').src=list[idx];
 $('bqVCount').textContent=list.length>1?(idx+1)+' / '+list.length:'';
 const m=list.length>1?'block':'none';
 $('bqVPrev').style.display=m;
 $('bqVNext').style.display=m;
}
function openV(){
 const l=currentDetailListing;
 if(!l)return;
 list=l.images&&l.images.length?l.images:(l.image_url?[l.image_url]:[]);
 if(!list.length)return;
 const cur=$('dMainImg')?$('dMainImg').src:'';
 let i=list.findIndex(u=>new URL(u,location.href).href===cur);
 if(i<0)i=0;
 $('bqViewer').style.display='flex';
 show(i);
}
function closeV(){$('bqViewer').style.display='none';}
$('bqVClose').onclick=closeV;
$('bqVPrev').onclick=()=>show(idx-1);
$('bqVNext').onclick=()=>show(idx+1);
let sx=0;
$('bqViewer').addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
$('bqViewer').addEventListener('touchend',e=>{
 const dx=e.changedTouches[0].clientX-sx;
 if(Math.abs(dx)>60&&list.length>1)show(idx+(dx<0?1:-1));
},{passive:true});
$('detailContent').addEventListener('click',e=>{
 if(e.target.id==='dMainImg')openV();
});
new MutationObserver(()=>{
 const box=document.querySelector('#detailContent .detail-image');
 if(box&&!$('bqHint')&&$('dMainImg')){
  box.insertAdjacentHTML('afterend','<p id="bqHint" style="font-size:12px;color:#999;margin:-6px 0 8px;text-align:center">🔍 Tap the photo to view it full size</p>');
 }
}).observe($('detailContent'),{childList:true});
})();
(function(){
const $=id=>document.getElementById(id);
const sel=$('profileState');
if(!sel)return;
sel.insertAdjacentHTML('afterend','<label>Account type</label><select id="profileType"><option value="personal">Personal seller</option><option value="business">Business</option></select><div id="profileBizBox" style="display:none"><label>Business name</label><input type="text" id="profileBizName" placeholder="e.g. Ada Fashion Store"><label>About your business</label><textarea id="profileBizDesc" placeholder="What you sell, where you are, opening hours"></textarea><label>Logo or profile photo</label><div style="display:flex;align-items:center;gap:12px;margin-bottom:12px"><img id="profileLogoPrev" alt="" style="width:56px;height:56px;border-radius:50%;object-fit:cover;background:#eee;display:none"><input type="file" id="profileLogo" accept="image/*" style="margin-bottom:0;flex:1;min-width:0"></div><p id="profileVerifyLine" style="font-size:13px;margin-bottom:10px"></p><button class="button" id="profileVerifyBtn" style="background:#0277bd;margin-bottom:12px;display:none">Request verification</button></div><label style="display:flex;align-items:center;gap:8px"><input type="checkbox" id="profileShowPhone" style="width:auto;margin:0"> Show my phone number on my seller page</label><div style="height:12px"></div>');
let curStatus='none';
function toggle(){$('profileBizBox').style.display=$('profileType').value==='business'?'block':'none';}
$('profileType').onchange=toggle;
function verifyUI(){
 const map={none:'Not verified yet',pending:'⏳ Verification requested. We will review it soon.',verified:'✅ Verified business',rejected:'Verification was not approved. Update your details and request again.'};
 $('profileVerifyLine').textContent='Status: '+(map[curStatus]||map.none);
 $('profileVerifyBtn').style.display=(curStatus==='none'||curStatus==='rejected')?'block':'none';
}
function shrink(file){return new Promise(res=>{const img=new Image(),u=URL.createObjectURL(file);img.onload=()=>{const r=Math.min(1,512/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*r);c.height=Math.round(img.height*r);c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(b=>res(b||file),'image/jpeg',0.85);};img.onerror=()=>{URL.revokeObjectURL(u);res(file);};img.src=u;});}
$('profileLogo').onchange=()=>{const f=$('profileLogo').files[0];if(f){$('profileLogoPrev').src=URL.createObjectURL(f);$('profileLogoPrev').style.display='block';}};
const origOpen=window.openProfile;
window.openProfile=async function(){
 await origOpen.apply(this,arguments);
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return;
 const{data:p}=await supabaseClient.from('profiles').select('account_type,business_name,business_description,logo_url,show_phone,verification_status').eq('id',session.user.id).single();
 if(!p)return;
 $('profileType').value=p.account_type||'personal';
 $('profileBizName').value=p.business_name||'';
 $('profileBizDesc').value=p.business_description||'';
 $('profileShowPhone').checked=!!p.show_phone;
 $('profileLogo').value='';
 if(p.logo_url){$('profileLogoPrev').src=p.logo_url;$('profileLogoPrev').style.display='block';}else{$('profileLogoPrev').style.display='none';}
 curStatus=p.verification_status||'none';
 toggle();verifyUI();
};
const origSave=window.saveProfile;
window.saveProfile=async function(){
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return;
 if(!$('profileName').value.trim())return origSave.apply(this,arguments);
 const err=$('profileError');
 err.style.display='none';
 const type=$('profileType').value;
 const biz=$('profileBizName').value.trim();
 if(type==='business'&&!biz){err.textContent='Enter your business name.';err.style.display='block';return;}
 const upd={account_type:type,business_name:biz||null,business_description:$('profileBizDesc').value.trim()||null,show_phone:$('profileShowPhone').checked};
 const f=$('profileLogo').files[0];
 if(f){
  const blob=await shrink(f);
  const path=session.user.id+'/logo-'+Date.now()+'.jpg';
  const{error:ue}=await supabaseClient.storage.from('business-logos').upload(path,blob,{contentType:'image/jpeg'});
  if(ue){err.textContent='Logo upload failed: '+ue.message;err.style.display='block';return;}
  upd.logo_url=supabaseClient.storage.from('business-logos').getPublicUrl(path).data.publicUrl;
 }
 const{error}=await supabaseClient.from('profiles').update(upd).eq('id',session.user.id);
 if(error){err.textContent=error.message;err.style.display='block';return;}
 return origSave.apply(this,arguments);
};
$('profileVerifyBtn').onclick=async()=>{
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return;
 const{data:p}=await supabaseClient.from('profiles').select('business_name,account_type').eq('id',session.user.id).single();
 if(!p||p.account_type!=='business'||!p.business_name){alert('Save your business details first (account type Business and a business name), then request verification.');return;}
 if(!confirm('Request verification for '+p.business_name+'? Our team will review your business.'))return;
 const{error}=await supabaseClient.from('profiles').update({verification_status:'pending'}).eq('id',session.user.id);
 if(error){alert('Could not send request: '+error.message);return;}
 curStatus='pending';verifyUI();
 alert('Verification requested. We will review it.');
};
})();
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="verOverlay"><div class="modal" style="color:#222;max-width:650px"><span class="close" id="verClose">✕</span><h3>Verification requests</h3><div class="filter-row" id="verTabs" style="justify-content:flex-start"><div class="filter-chip active" data-s="pending">Pending</div><div class="filter-chip" data-s="verified">Verified</div><div class="filter-chip" data-s="rejected">Rejected</div></div><div id="verList"></div></div></div>');
let tab='pending',rows=[];
$('verClose').onclick=()=>$('verOverlay').classList.remove('show');
function btn(a,id,t,c){return '<button data-a="'+a+'" data-id="'+id+'" style="background:'+c+';color:#fff;border:0;border-radius:6px;padding:7px 12px;font-size:12px;font-weight:bold;margin-right:6px">'+t+'</button>';}
async function load(){
 const box=$('verList');
 box.innerHTML='<p style="color:#999">Loading...</p>';
 const{data,error}=await supabaseClient.from('profiles').select('id,full_name,phone,state,business_name,business_description,logo_url,verification_status').eq('verification_status',tab).order('full_name');
 if(error){box.innerHTML='<p style="color:#c0392b">'+esc(error.message)+'</p>';return;}
 rows=data||[];
 if(!rows.length){box.innerHTML='<p style="color:#999">None in this list.</p>';return;}
 box.innerHTML=rows.map(p=>{
  let b='';
  if(tab==='pending')b=btn('approve',p.id,'Approve','#2e7d32')+btn('reject',p.id,'Reject','#c0392b');
  else if(tab==='verified')b=btn('revoke',p.id,'Revoke','#777');
  else b=btn('approve',p.id,'Approve','#2e7d32');
  return '<div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid #eee"><div style="width:56px;height:56px;flex:0 0 56px;border-radius:50%;background:#eee;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:24px">'+(p.logo_url?'<img src="'+esc(p.logo_url)+'" style="width:100%;height:100%;object-fit:cover">':'🏪')+'</div><div style="flex:1;min-width:0"><div style="font-weight:bold;font-size:15px">'+esc(p.business_name||'(no business name)')+'</div><div style="color:#666;font-size:13px;margin:2px 0">Owner: '+esc(p.full_name||'')+' · '+esc(p.state||'')+(p.phone?' · '+esc(p.phone):'')+'</div><div style="font-size:13px;margin-bottom:8px">'+esc(p.business_description||'No description')+'</div>'+b+'</div></div>';
 }).join('');
}
$('verTabs').onclick=e=>{
 const c=e.target.closest('.filter-chip');
 if(!c)return;
 tab=c.dataset.s;
 document.querySelectorAll('#verTabs .filter-chip').forEach(x=>x.classList.toggle('active',x===c));
 load();
};
$('verList').onclick=async e=>{
 const b=e.target.closest('button[data-a]');
 if(!b)return;
 const a=b.dataset.a,id=b.dataset.id;
 const p=rows.find(r=>r.id===id);
 const name=p?(p.business_name||p.full_name):'this business';
 const cfg={approve:['verified','Approve verification for '+name+'?','Your business is verified','Congratulations! Your business is now verified on BuyQora.'],reject:['rejected','Reject verification for '+name+'?','Verification not approved','We could not verify your business yet. Update your business details and request again.'],revoke:['none','Remove verification from '+name+'?','Verification removed','Your verified status was removed. Contact support if you have questions.']}[a];
 if(!cfg||!confirm(cfg[1]))return;
 b.disabled=true;
 const upd={verification_status:cfg[0],verified_at:a==='approve'?new Date().toISOString():null};
 const{error}=await supabaseClient.from('profiles').update(upd).eq('id',id);
 if(error){alert('Could not update: '+error.message);b.disabled=false;return;}
 try{await supabaseClient.from('notifications').insert({user_id:id,title:cfg[2],message:cfg[3]});}catch(x){}
 load();
};
const ao=document.querySelector('#adminOverlay .modal h3');
if(ao){
 ao.insertAdjacentHTML('afterend','<button class="button" id="bqVerBtn" style="margin-bottom:12px;background:#0277bd">✅ Verification requests</button>');
 $('bqVerBtn').onclick=()=>{$('verOverlay').classList.add('show');load();};
}
})();
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const naira=n=>'₦'+Number(n||0).toLocaleString();
async function getSettings(){
 const{data}=await supabaseClient.from('app_settings').select('key,value');
 const o={};(data||[]).forEach(r=>{o[r.key]=r.value;});return o;
}
async function setKey(k,v){
 const{data,error}=await supabaseClient.from('app_settings').update({value:String(v),updated_at:new Date().toISOString()}).eq('key',k).select();
 if(error)return error;
 if(!data||!data.length){const r=await supabaseClient.from('app_settings').insert({key:k,value:String(v)});return r.error;}
 return null;
}

/* ---------- SELLER: payment step ---------- */
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="payOverlay"><div class="modal" style="color:#222"><span class="close" id="payClose">✕</span><h3>Verification payment</h3><p class="error" id="payError"></p><div id="payInfo" style="font-size:14px;line-height:1.6;margin-bottom:12px"></div><label>Payment reference</label><input type="text" id="payRef" placeholder="Sender name or transaction ID"><button class="button" id="paySubmit">I have paid, submit request</button></div></div>');
$('payClose').onclick=()=>$('payOverlay').classList.remove('show');
let pay={price:0,months:'12',instr:''};
$('profileVerifyBtn').onclick=async()=>{
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return;
 const{data:p}=await supabaseClient.from('profiles').select('business_name,account_type').eq('id',session.user.id).single();
 if(!p||p.account_type!=='business'||!p.business_name){alert('Save your business details first (account type Business and a business name), then request verification.');return;}
 const s=await getSettings();
 pay={price:parseFloat(s.verification_price)||0,months:s.verification_months||'12',instr:(s.payment_instructions||'').trim()};
 if(pay.price<=0){
  if(!confirm('Request verification for '+p.business_name+'? Our team will review your business.'))return;
  const{error}=await supabaseClient.from('profiles').update({verification_status:'pending'}).eq('id',session.user.id);
  if(error){alert('Could not send request: '+error.message);return;}
  alert('Verification requested. We will review it.');
  if(window.openProfile)window.openProfile();
  return;
 }
 $('payError').style.display='none';
 $('payInfo').innerHTML='<p><b>Price:</b> '+naira(pay.price)+' for '+esc(pay.months)+' months</p><p style="margin-top:8px"><b>Pay by bank transfer to:</b></p><p style="white-space:pre-wrap;background:#f7f7f7;border-radius:8px;padding:10px">'+(pay.instr?esc(pay.instr):'Payment details are not set up yet. Please contact support.')+'</p><p style="margin-top:8px;color:#666;font-size:13px">After paying, enter your payment reference below. Verification does not guarantee a risk-free transaction.</p>';
 $('payOverlay').classList.add('show');
};
$('paySubmit').onclick=async()=>{
 const err=$('payError');err.style.display='none';
 const ref=$('payRef').value.trim();
 if(!pay.instr){err.textContent='Payment details are not set up yet. Please contact support.';err.style.display='block';return;}
 if(ref.length<3){err.textContent='Enter your payment reference (sender name or transaction ID).';err.style.display='block';return;}
 const b=$('paySubmit');b.disabled=true;
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){b.disabled=false;return;}
 const{error:pe}=await supabaseClient.from('payments').insert({user_id:session.user.id,purpose:'verification',related_id:session.user.id,amount:pay.price,reference:ref,status:'submitted'});
 if(pe){err.textContent='Could not record payment: '+pe.message;err.style.display='block';b.disabled=false;return;}
 const{error:ue}=await supabaseClient.from('profiles').update({verification_status:'pending'}).eq('id',session.user.id);
 b.disabled=false;
 if(ue){err.textContent='Payment saved, but the request failed: '+ue.message;err.style.display='block';return;}
 $('payOverlay').classList.remove('show');$('payRef').value='';
 alert('Request sent. We will check your payment and review your business.');
 if(window.openProfile)window.openProfile();
};

/* ---------- ADMIN: settings ---------- */
const h=document.querySelector('#verOverlay .modal h3');
if(h){
 h.insertAdjacentHTML('afterend','<details id="verSet" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:bold;color:#0277bd;padding:6px 0">⚙️ Verification price &amp; payment details</summary><label style="margin-top:8px">Price (₦, 0 = free)</label><input type="number" id="verSetPrice" inputmode="numeric"><label>Verified for (months)</label><input type="number" id="verSetMonths" inputmode="numeric"><label>Payment instructions (bank, account name, account number)</label><textarea id="verSetInstr" placeholder="Bank: ...&#10;Account name: ...&#10;Account number: ..."></textarea><button class="button" id="verSetSave">Save settings</button></details>');
 async function loadSet(){
  const s=await getSettings();
  $('verSetPrice').value=s.verification_price||'0';
  $('verSetMonths').value=s.verification_months||'12';
  $('verSetInstr').value=s.payment_instructions||'';
 }
 const vb=$('bqVerBtn');
 if(vb){const old=vb.onclick;vb.onclick=function(){if(old)old.apply(this,arguments);loadSet();};}
 $('verSetSave').onclick=async()=>{
  const price=parseFloat(String($('verSetPrice').value).replace(/[^0-9.]/g,''));
  const months=parseInt($('verSetMonths').value,10);
  const instr=$('verSetInstr').value.trim();
  if(isNaN(price)||price<0){alert('Enter a valid price (0 for free).');return;}
  if(!(months>0)){alert('Enter the number of months.');return;}
  if(price>0&&!instr&&!confirm('Price is above 0 but payment instructions are empty. Save anyway?'))return;
  const b=$('verSetSave');b.disabled=true;
  for(const[k,v]of[['verification_price',price],['verification_months',months],['payment_instructions',instr]]){
   const er=await setKey(k,v);
   if(er){alert('Could not save: '+er.message);b.disabled=false;return;}
  }
  b.disabled=false;alert('Settings saved.');
 };
}

/* ---------- ADMIN: payment check on each request ---------- */
const list=$('verList');
let busy=false;
async function decorate(){
 if(busy)return;
 const todo=[];
 list.querySelectorAll('button[data-a][data-id]').forEach(b=>{
  const par=b.parentElement;
  if(!par.querySelector('.bqPay')){
   const d=document.createElement('div');
   d.className='bqPay';d.dataset.uid=b.dataset.id;d.dataset.need='1';
   d.style.cssText='background:#f7f7f7;border-radius:8px;padding:8px 10px;font-size:12.5px;margin-bottom:8px';
   d.textContent='Checking payment...';
   par.insertBefore(d,b);todo.push(d);
  }
 });
 if(!todo.length)return;
 busy=true;
 try{
  const s=await getSettings();
  const price=parseFloat(s.verification_price)||0;
  const uids=[...new Set(todo.map(d=>d.dataset.uid))];
  const{data}=await supabaseClient.from('payments').select('id,user_id,amount,reference,status,created_at').eq('purpose','verification').in('user_id',uids).order('created_at',{ascending:false});
  const latest={};(data||[]).forEach(p=>{if(!latest[p.user_id])latest[p.user_id]=p;});
  todo.forEach(d=>{
   const p=latest[d.dataset.uid];
   d.dataset.need=(price>0&&!(p&&p.status==='confirmed'))?'1':'0';
   if(!p){d.innerHTML='💳 No payment submitted'+(price>0?' (required: '+naira(price)+')':'');}
   else{d.innerHTML='💳 '+naira(p.amount)+' · Ref: <b>'+esc(p.reference)+'</b> · '+esc(p.status)+(p.status==='submitted'?' <button data-pay="'+p.id+'" style="background:#2e7d32;color:#fff;border:0;border-radius:6px;padding:5px 10px;font-size:12px;font-weight:bold;margin-left:6px">Payment received</button>':'');}
  });
 }finally{busy=false;}
 decorate();
}
new MutationObserver(()=>decorate()).observe(list,{childList:true,subtree:true});
list.addEventListener('click',async e=>{
 const pb=e.target.closest('button[data-pay]');
 if(pb){
  e.stopImmediatePropagation();
  pb.disabled=true;
  const{data:{session}}=await supabaseClient.auth.getSession();
  const{error}=await supabaseClient.from('payments').update({status:'confirmed',confirmed_by:session.user.id,confirmed_at:new Date().toISOString()}).eq('id',pb.dataset.pay);
  if(error){alert('Could not confirm: '+error.message);pb.disabled=false;return;}
  const d=pb.closest('.bqPay');if(d)d.remove();
  decorate();
  return;
 }
 const ab=e.target.closest('button[data-a="approve"]');
 if(ab){
  const d=ab.parentElement.querySelector('.bqPay');
  if(d&&d.dataset.need==='1'){
   e.stopImmediatePropagation();
   alert('Confirm the payment first: check your bank, then tap "Payment received".');
  }
 }
},true);
})();
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const naira=n=>'₦'+Number(n||0).toLocaleString();
const NAMES={basic:'Basic Boost',featured:'Featured',premium:'Premium',top:'Top Advert'};
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="promoOverlay"><div class="modal" style="color:#222"><span class="close" id="promoClose">✕</span><h3>Promote this listing</h3><p id="promoTitle" style="font-weight:bold;margin-bottom:10px"></p><p class="error" id="promoError"></p><label>Package</label><div id="promoPkgs"></div><label>Duration</label><select id="promoDays"></select><div id="promoTotal" style="font-size:16px;font-weight:bold;color:#ff6b00;margin:4px 0 12px"></div><div id="promoPay" style="font-size:14px;line-height:1.6"></div><label>Payment reference</label><input type="text" id="promoRef" placeholder="Sender name or transaction ID"><button class="button" id="promoSubmit">I have paid, submit promotion</button></div></div>');
$('promoClose').onclick=()=>$('promoOverlay').classList.remove('show');
const st={listing:null,pkgs:[],durs:[],pkg:null,instr:''};

function total(){
 const p=st.pkgs.find(x=>x.id===st.pkg);
 const d=st.durs.find(x=>String(x.days)===$('promoDays').value);
 if(!p||!d)return 0;
 return Math.round(Number(p.price_7d)*Number(d.multiplier));
}
function showTotal(){
 const p=st.pkgs.find(x=>x.id===st.pkg);
 if(!p){$('promoTotal').textContent='Choose a package';return;}
 let t='Total: '+naira(total())+' for '+$('promoDays').value+' day(s) · shown as "'+p.label+'"';
 if(p.id==='top')t+='\nTop Advert is reviewed by our team before it goes live. Larger campaigns may cost more.';
 $('promoTotal').style.whiteSpace='pre-line';
 $('promoTotal').textContent=t;
}
function drawPkgs(){
 $('promoPkgs').innerHTML=st.pkgs.map(p=>'<div data-p="'+p.id+'" style="border:2px solid '+(p.id===st.pkg?'#ff6b00':'#ddd')+';border-radius:10px;padding:10px;margin-bottom:8px;cursor:pointer"><b>'+esc(p.name)+'</b><span style="float:right;color:#ff6b00;font-weight:bold">'+naira(p.price_7d)+' / 7 days</span><div style="font-size:12.5px;color:#666;margin-top:2px">'+esc(p.description||'')+'</div></div>').join('');
}
$('promoPkgs').onclick=e=>{const c=e.target.closest('[data-p]');if(!c)return;st.pkg=c.dataset.p;drawPkgs();showTotal();};
$('promoDays').onchange=showTotal;

async function openPromo(listingId){
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){openAuth('login');return;}
 const err=$('promoError');err.style.display='none';
 const[{data:l},{data:pk},{data:du},{data:se}]=await Promise.all([
  supabaseClient.from('listings').select('id,title,status,seller_id').eq('id',listingId).single(),
  supabaseClient.from('promotion_packages').select('*').eq('active',true).order('sort_order'),
  supabaseClient.from('promotion_durations').select('*').eq('active',true).order('days'),
  supabaseClient.from('app_settings').select('value').eq('key','payment_instructions').maybeSingle()
 ]);
 if(!l||l.seller_id!==session.user.id){alert('Listing not found.');return;}
 if(l.status!=='active'){alert('Only live listings can be promoted.');return;}
 if(!pk||!pk.length||!du||!du.length){alert('Promotions are not available yet. Please try again later.');return;}
 const{data:cur}=await supabaseClient.from('promotions').select('id,status,expires_at').eq('listing_id',l.id).in('status',['active','pending_payment']).order('created_at',{ascending:false}).limit(1);
 if(cur&&cur.length){
  const c=cur[0];
  if(c.status==='active'&&new Date(c.expires_at)>new Date()){alert('This listing already has an active promotion.');return;}
  if(c.status==='pending_payment'){
   const{data:pp}=await supabaseClient.from('payments').select('id').eq('purpose','promotion').eq('related_id',c.id).limit(1);
   if(pp&&pp.length){alert('A promotion for this listing is already waiting for payment confirmation.');return;}
  }
 }
 st.listing=l;st.pkgs=pk;st.durs=du;st.pkg=pk[0].id;st.instr=((se&&se.value)||'').trim();
 $('promoTitle').textContent=l.title;
 $('promoDays').innerHTML=du.map(d=>'<option value="'+d.days+'"'+(d.days===7?' selected':'')+'>'+d.days+' day'+(d.days>1?'s':'')+'</option>').join('');
 $('promoPay').innerHTML=st.instr?'<p><b>Pay by bank transfer to:</b></p><p style="white-space:pre-wrap;background:#f7f7f7;border-radius:8px;padding:10px;margin-bottom:10px">'+esc(st.instr)+'</p>':'<p style="color:#c0392b">Payment details are not set up yet. Please contact support.</p>';
 $('promoRef').value='';
 drawPkgs();showTotal();
 $('promoOverlay').classList.add('show');
}

$('promoSubmit').onclick=async()=>{
 const err=$('promoError');err.style.display='none';
 const ref=$('promoRef').value.trim();
 const show=m=>{err.textContent=m;err.style.display='block';};
 if(!st.listing||!st.pkg)return;
 if(!st.instr)return show('Payment details are not set up yet. Please contact support.');
 if(ref.length<3)return show('Enter your payment reference (sender name or transaction ID).');
 const b=$('promoSubmit');b.disabled=true;b.textContent='Submitting...';
 const reset=()=>{b.disabled=false;b.textContent='I have paid, submit promotion';};
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){reset();return;}
 const{data:pr,error:pe}=await supabaseClient.from('promotions').insert({listing_id:st.listing.id,seller_id:session.user.id,package_id:st.pkg,days:parseInt($('promoDays').value,10),status:'pending_payment'}).select('id,amount').single();
 if(pe){reset();return show('Could not create promotion: '+pe.message);}
 const{error:ye}=await supabaseClient.from('payments').insert({user_id:session.user.id,purpose:'promotion',related_id:pr.id,amount:pr.amount,reference:ref,status:'submitted'});
 reset();
 if(ye)return show('Promotion created but the payment record failed: '+ye.message+'. Please contact support.');
 $('promoOverlay').classList.remove('show');
 alert('Promotion request sent. Once we confirm your payment, your promotion goes live.');
 if(window.openMine)window.openMine();
};

async function decorate(){
 const box=$('myList');
 const pauseBtns=[...box.querySelectorAll('button[data-a="pause"]')].filter(b=>!b.parentElement.querySelector('[data-a="promote"]'));
 if(!pauseBtns.length)return;
 const ids=[];
 pauseBtns.forEach(b=>{
  const wrap=b.parentElement;
  const pb=document.createElement('button');
  pb.dataset.a='promote';pb.dataset.id=b.dataset.id;pb.textContent='🚀 Promote';
  pb.style.cssText='background:#8e24aa;color:#fff;border:0;border-radius:6px;padding:6px 10px;font-size:12px;font-weight:bold';
  wrap.insertBefore(pb,wrap.firstChild);
  const line=document.createElement('div');
  line.className='bqPromoLine';line.dataset.lid=b.dataset.id;
  line.style.cssText='font-size:12.5px;color:#666;margin-top:6px';
  wrap.parentElement.insertBefore(line,wrap);
  ids.push(b.dataset.id);
 });
 const{data:pr}=await supabaseClient.from('promotions').select('id,listing_id,package_id,days,status,expires_at,created_at').in('listing_id',ids).order('created_at',{ascending:false});
 if(!pr||!pr.length)return;
 const{data:pays}=await supabaseClient.from('payments').select('related_id,status').eq('purpose','promotion').in('related_id',pr.map(x=>x.id));
 const paid={};(pays||[]).forEach(p=>{paid[p.related_id]=p.status;});
 const seen={};
 pr.forEach(p=>{
  if(seen[p.listing_id])return;seen[p.listing_id]=1;
  const line=box.querySelector('.bqPromoLine[data-lid="'+p.listing_id+'"]');
  if(!line)return;
  const nm=NAMES[p.package_id]||p.package_id;
  let t='';
  if(p.status==='active'&&new Date(p.expires_at)>new Date())t='🚀 '+nm+' · Active · Expires '+new Date(p.expires_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  else if(p.status==='pending_payment')t='⏳ '+nm+' · '+(paid[p.id]?'Payment submitted, awaiting confirmation':'Awaiting payment');
  else if(p.status==='active'||p.status==='expired')t='Promotion ended ('+nm+')';
  else if(p.status==='rejected')t='Promotion not approved ('+nm+')';
  else if(p.status==='suspended')t='Promotion suspended ('+nm+')';
  if(t)line.textContent=t;
 });
}
new MutationObserver(()=>decorate()).observe($('myList'),{childList:true,subtree:true});
$('myList').addEventListener('click',e=>{
 const b=e.target.closest('button[data-a="promote"]');
 if(!b)return;
 e.stopImmediatePropagation();
 openPromo(b.dataset.id);
},true);
})();
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const naira=n=>'₦'+Number(n||0).toLocaleString();
const dt=d=>d?new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'-';
const NAMES={basic:'Basic Boost',featured:'Featured',premium:'Premium',top:'Top Advert'};
const sty=document.createElement('style');
sty.textContent='.modal-overlay#aprOverlay>.modal{position:fixed !important;inset:0 !important;width:100% !important;height:100% !important;max-width:none !important;max-height:none !important;margin:0 !important;border-radius:0 !important;box-sizing:border-box !important;overflow-y:auto !important;padding:calc(env(safe-area-inset-top,0px) + 12px) 16px calc(env(safe-area-inset-bottom,0px) + 12px) !important}';
document.head.appendChild(sty);
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="aprOverlay"><div class="modal" style="color:#222"><span class="close" id="aprClose">✕</span><h3>Promotions</h3><div id="aprRev" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px"></div><details id="aprSet" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:bold;color:#0277bd;padding:6px 0">⚙️ Promotion prices (per 7 days)</summary><div id="aprPk" style="margin-top:8px"></div><button class="button" id="aprPkSave">Save prices</button></details><div class="filter-row" id="aprTabs" style="justify-content:flex-start"><div class="filter-chip active" data-t="pending">Pending</div><div class="filter-chip" data-t="active">Active</div><div class="filter-chip" data-t="expired">Expired</div><div class="filter-chip" data-t="other">Rejected</div></div><div id="aprList"></div></div></div>');
$('aprClose').onclick=()=>$('aprOverlay').classList.remove('show');
let tab='pending',rows=[],pays={},names={};
function grp(r){
 if(r.status==='pending_payment')return 'pending';
 if(r.status==='active')return new Date(r.expires_at)>new Date()?'active':'expired';
 if(r.status==='expired')return 'expired';
 return 'other';
}
function btn(a,id,t,c){return '<button data-a="'+a+'" data-id="'+id+'" style="background:'+c+';color:#fff;border:0;border-radius:6px;padding:7px 12px;font-size:12px;font-weight:bold;margin:6px 6px 0 0">'+t+'</button>';}
function render(){
 const box=$('aprList');
 const f=rows.filter(r=>grp(r)===tab);
 if(!f.length){box.innerHTML='<p style="color:#999">None in this list.</p>';return;}
 box.innerHTML=f.map(r=>{
  const p=pays[r.id];
  const pl=p?'💳 '+naira(p.amount)+' · Ref: <b>'+esc(p.reference)+'</b> · '+esc(p.status):'💳 No payment submitted';
  let b='';
  const g=grp(r);
  if(g==='pending'){
   if(p&&p.status==='submitted')b+=btn('paid',r.id,'Payment received &amp; activate','#2e7d32');
   else if(p&&p.status==='confirmed')b+=btn('activate',r.id,'Activate','#2e7d32');
   b+=btn('reject',r.id,'Reject','#c0392b');
  }else if(g==='active'){
   b+=btn('extend',r.id,'Extend +7 days','#0277bd')+btn('suspend',r.id,'Suspend','#777');
  }else if(r.status==='suspended'){
   b+=btn('reinstate',r.id,'Reinstate','#2e7d32');
  }
  return '<div style="padding:14px 0;border-bottom:1px solid #eee"><div style="font-weight:bold;font-size:15px">'+esc(r.listings&&r.listings.title||'Listing')+'</div><div style="color:#666;font-size:13px;margin:2px 0">Seller: '+esc(names[r.seller_id]||'')+'</div><div style="font-size:13px">'+esc(NAMES[r.package_id]||r.package_id)+' · '+r.days+' day(s) · '+naira(r.amount)+'</div><div style="font-size:12.5px;color:#666;margin:2px 0">'+(r.starts_at?'Starts '+dt(r.starts_at)+' · Expires '+dt(r.expires_at):'Requested '+dt(r.created_at))+'</div><div style="background:#f7f7f7;border-radius:8px;padding:6px 10px;font-size:12.5px;margin-top:6px">'+pl+'</div>'+b+'</div>';
 }).join('');
}
async function revenue(){
 const{data}=await supabaseClient.from('payments').select('amount,confirmed_at').eq('purpose','promotion').eq('status','confirmed');
 const now=Date.now(),day=86400000;let t=0,w=0,m=0,all=0;
 (data||[]).forEach(p=>{
  const a=Number(p.amount)||0;all+=a;
  const age=now-new Date(p.confirmed_at||0).getTime();
  if(age<day)t+=a;if(age<7*day)w+=a;if(age<30*day)m+=a;
 });
 const c=(l,v)=>'<div style="background:#f7f7f7;border-radius:8px;padding:8px 10px"><div style="font-size:12px;color:#666">'+l+'</div><div style="font-weight:bold;color:#ff6b00">'+naira(v)+'</div></div>';
 $('aprRev').innerHTML=c('Last 24 hours',t)+c('Last 7 days',w)+c('Last 30 days',m)+c('Total promotion revenue',all);
}
async function load(){
 $('aprList').innerHTML='<p style="color:#999">Loading...</p>';
 const{data,error}=await supabaseClient.from('promotions').select('*, listings(title)').order('created_at',{ascending:false}).limit(200);
 if(error){$('aprList').innerHTML='<p style="color:#c0392b">'+esc(error.message)+'</p>';return;}
 rows=data||[];pays={};
 if(rows.length){
  const{data:py}=await supabaseClient.from('payments').select('id,related_id,amount,reference,status').eq('purpose','promotion').in('related_id',rows.map(r=>r.id));
  (py||[]).forEach(p=>{pays[p.related_id]=p;});
 }
 for(const uid of [...new Set(rows.map(r=>r.seller_id))]){names[uid]=await getProfileName(uid);}
 render();revenue();
}
async function loadPk(){
 const{data}=await supabaseClient.from('promotion_packages').select('id,name,price_7d').order('sort_order');
 $('aprPk').innerHTML=(data||[]).map(p=>'<label>'+esc(p.name)+' (₦ per 7 days)</label><input type="number" inputmode="numeric" data-pk="'+p.id+'" value="'+p.price_7d+'">').join('');
}
$('aprPkSave').onclick=async()=>{
 const b=$('aprPkSave');b.disabled=true;
 for(const i of document.querySelectorAll('#aprPk input[data-pk]')){
  const v=parseFloat(i.value);
  if(isNaN(v)||v<0){alert('Enter valid prices.');b.disabled=false;return;}
  const{error}=await supabaseClient.from('promotion_packages').update({price_7d:v}).eq('id',i.dataset.pk);
  if(error){alert('Could not save: '+error.message);b.disabled=false;return;}
 }
 b.disabled=false;alert('Prices saved. New requests will use them.');
};
$('aprTabs').onclick=e=>{
 const c=e.target.closest('.filter-chip');if(!c)return;
 tab=c.dataset.t;
 document.querySelectorAll('#aprTabs .filter-chip').forEach(x=>x.classList.toggle('active',x===c));
 render();
};
async function note(r,title,msg){try{await supabaseClient.from('notifications').insert({user_id:r.seller_id,title,message:msg});}catch(x){}}
$('aprList').onclick=async e=>{
 const b=e.target.closest('button[data-a]');if(!b)return;
 const r=rows.find(x=>x.id===b.dataset.id);if(!r)return;
 const a=b.dataset.a,name=r.listings&&r.listings.title||'this listing';
 b.disabled=true;
 let err=null;
 if(a==='paid'){
  if(!confirm('Have you checked your bank and received '+naira(r.amount)+'? This will start the promotion for "'+name+'".')){b.disabled=false;return;}
  const{data:{session}}=await supabaseClient.auth.getSession();
  const p=pays[r.id];
  ({error:err}=await supabaseClient.from('payments').update({status:'confirmed',confirmed_by:session.user.id,confirmed_at:new Date().toISOString()}).eq('id',p.id));
  if(!err)({error:err}=await supabaseClient.rpc('activate_promotion',{p_id:r.id}));
  if(!err)note(r,'Your promotion is live','Payment confirmed. "'+name+'" is now promoted.');
 }else if(a==='activate'){
  ({error:err}=await supabaseClient.rpc('activate_promotion',{p_id:r.id}));
  if(!err)note(r,'Your promotion is live','"'+name+'" is now promoted.');
 }else if(a==='reject'){
  if(!confirm('Reject the promotion for "'+name+'"? If the seller already paid, you must refund them yourself.')){b.disabled=false;return;}
  ({error:err}=await supabaseClient.from('promotions').update({status:'rejected'}).eq('id',r.id));
  if(!err)note(r,'Promotion not approved','We could not approve the promotion for "'+name+'". Contact support if you paid.');
 }else if(a==='suspend'){
  if(!confirm('Suspend this promotion?')){b.disabled=false;return;}
  ({error:err}=await supabaseClient.from('promotions').update({status:'suspended'}).eq('id',r.id));
 }else if(a==='reinstate'){
  ({error:err}=await supabaseClient.from('promotions').update({status:'active'}).eq('id',r.id));
 }else if(a==='extend'){
  const nx=new Date(new Date(r.expires_at).getTime()+7*86400000).toISOString();
  ({error:err}=await supabaseClient.from('promotions').update({expires_at:nx}).eq('id',r.id));
 }
 if(err){alert('Could not update: '+err.message);b.disabled=false;return;}
 load();
};
const anchor=$('bqVerBtn')||document.querySelector('#adminOverlay .modal h3');
if(anchor){
 const html='<button class="button" id="bqPromoAdmin" style="margin-bottom:12px;background:#8e24aa">🚀 Promotions &amp; revenue</button>';
 if(anchor.id==='bqVerBtn')anchor.insertAdjacentHTML('afterend',html);else anchor.insertAdjacentHTML('afterend',html);
 $('bqPromoAdmin').onclick=()=>{$('aprOverlay').classList.add('show');load();loadPk();};
}
})();
