/* BuyQora home + bottom nav + New/Used. Runs after index.html's own script (defer). */
(function(){
const CATS=[['trending','🔥','Trending'],['vehicles','🚗','Vehicles'],['property','🏡','Property'],['phones','📱','Phones & Tablets'],['electronics','💻','Electronics'],['home','🛋️','Home, Furniture & Appliances'],['fashion','👗','Fashion'],['beauty','🧴','Beauty & Personal Care'],['services','🔧','Services'],['repair','⛑️','Repair & Construction'],['equipment','🏭','Commercial Equipment & Tools'],['leisure','🏋️','Leisure & Activities'],['kids','🧸','Babies & Kids'],['food','🥕','Food, Agriculture & Farming'],['animals','🐕','Animals & Pets'],['jobs','💼','Jobs'],['seeking','📄','Seeking Work - CVs'],['business','🧳','Business & Industry']];
CATS.forEach(c=>{CATEGORY_ICONS[c[0]]=c[1];CATEGORY_LABELS[c[0]]=c[2];});
const SUBCATS={vehicles:[['cars','Cars','🚗'],['buses','Buses & Minivans','🚌'],['trucks','Trucks & Trailers','🚚'],['motorcycles','Motorcycles & Scooters','🏍️'],['tricycles','Tricycles (Keke)','🛺'],['parts','Vehicle Parts & Accessories','🔧'],['heavy','Heavy Equipment','🚜'],['boats','Watercraft & Boats','🚤']],property:[['new_builds','New Builds','🏗️'],['rent_homes','Houses & Apartments For Rent','🏠'],['sale_homes','Houses & Apartments For Sale','🏡'],['short_let','Short Let','🔑'],['land_rent','Land & Plots For Rent','🌱'],['land_sale','Land & Plots For Sale','🌳'],['venues','Event Centres, Venues & Workstations','🏛️'],['comm_rent','Commercial Property For Rent','🏬'],['comm_sale','Commercial Property For Sale','🏪']],phones:[['ph_phones','Mobile Phones','📱'],['ph_tablets','Tablets','📲'],['ph_watches','Smart Watches & Trackers','⌚'],['ph_acc','Phone & Tablet Accessories','🔌'],['ph_parts','Phone Parts & Repair','🛠️']],electronics:[['el_laptops','Laptops & Computers','💻'],['el_compacc','Computer Accessories & Parts','⌨️'],['el_tv','TVs & Video Equipment','📺'],['el_audio','Audio & Music Equipment','🔊'],['el_head','Headphones & Earbuds','🎧'],['el_cam','Cameras & Photo','📷'],['el_games','Video Games & Consoles','🎮'],['el_power','Generators, Solar & Inverters','🔋'],['el_sec','Security & Surveillance','📹'],['el_print','Printers & Scanners','🖨️'],['el_net','Networking Products','📡']],home:[['hm_furn','Furniture','🛋️'],['hm_app','Home Appliances','🔌'],['hm_kit','Kitchen Appliances','🍳'],['hm_ware','Kitchenware & Cookware','🥘'],['hm_decor','Home Accessories & Decor','🖼️'],['hm_bed','Bedding & Linens','🛏️'],['hm_light','Lighting','💡'],['hm_cool','Air Conditioners & Fans','❄️'],['hm_garden','Garden & Outdoor','🌿']],fashion:[['fa_women','Women\'s Clothing','👗'],['fa_men','Men\'s Clothing','👔'],['fa_shoes','Shoes & Footwear','👟'],['fa_bags','Bags','👜'],['fa_watch','Watches','⌚'],['fa_jewel','Jewelry','💍'],['fa_acc','Clothing Accessories','🧣'],['fa_trad','Traditional & Wedding Wear','🥻']],beauty:[['be_hair','Wigs & Hair Products','💇'],['be_make','Makeup','💄'],['be_skin','Skin Care','🧴'],['be_fra','Fragrances','🌸'],['be_body','Bath & Body','🛁'],['be_tools','Beauty Tools & Accessories','🪞'],['be_well','Health & Wellness','💊']],services:[['sv_build','Building & Trade Services','🏗️'],['sv_car','Car Services','🚗'],['sv_clean','Cleaning Services','🧹'],['sv_cater','Catering & Food Services','🍲'],['sv_event','Event Planning & Photography','📸'],['sv_beauty','Beauty & Hair Services','💅'],['sv_edu','Tutoring & Training','🎓'],['sv_print','Printing & Design','🖨️'],['sv_it','IT & Web Services','🖥️'],['sv_log','Logistics & Delivery','🚚'],['sv_other','Other Services','🧰']],repair:[['rp_mat','Building Materials','🧱'],['rp_elec','Electrical Equipment','💡'],['rp_plumb','Plumbing & Water Systems','🚰'],['rp_doors','Doors, Windows & Roofing','🚪'],['rp_tiles','Tiles, Paint & Flooring','🎨'],['rp_tools','Hand & Power Tools','🔨'],['rp_repair','Repair Services','🔧']],equipment:[['eq_med','Medical Equipment','🩺'],['eq_rest','Restaurant & Catering Equipment','🍽️'],['eq_salon','Salon Equipment','💈'],['eq_manu','Manufacturing & Industrial Machines','🏭'],['eq_office','Office Equipment','🗄️'],['eq_shop','Shop & Retail Fittings','🏪'],['eq_print','Printing Equipment','🖨️']],leisure:[['lz_sport','Sports Equipment','⚽'],['lz_gym','Fitness & Gym','🏋️'],['lz_books','Books & Games','📚'],['lz_music','Musical Instruments','🎸'],['lz_art','Art & Collectibles','🖼️'],['lz_camp','Camping & Outdoors','⛺']],kids:[['kd_gear','Baby Gear & Prams','🍼'],['kd_babycl','Baby Clothing','👶'],['kd_kidcl','Kids Clothing & Shoes','👕'],['kd_toys','Toys & Games','🧸'],['kd_school','School Supplies','🎒'],['kd_furn','Kids Furniture','🛏️'],['kd_mat','Maternity & Feeding','🤱']],food:[['fd_food','Food & Beverages','🍲'],['fd_produce','Farm Produce','🥕'],['fd_feed','Livestock Feeds','🌾'],['fd_mach','Farm Machinery & Tools','🚜'],['fd_seed','Seeds & Seedlings','🌱'],['fd_fert','Fertilizers & Chemicals','🧪'],['fd_fish','Fish & Fishery','🐟']],animals:[['an_dogs','Dogs & Puppies','🐕'],['an_cats','Cats & Kittens','🐈'],['an_birds','Birds & Poultry','🐓'],['an_fish','Fish & Aquatics','🐠'],['an_live','Livestock (Goats, Cattle, Pigs)','🐐'],['an_acc','Pet Food & Accessories','🦴'],['an_other','Other Animals','🐾']],jobs:[['jb_full','Full-time Jobs','💼'],['jb_part','Part-time Jobs','⏰'],['jb_contract','Contract & Freelance','📝'],['jb_intern','Internships & Training','🎓'],['jb_remote','Remote Jobs','🏠'],['jb_driver','Drivers & Delivery','🚚'],['jb_sales','Sales & Marketing','📣'],['jb_domestic','Domestic & Home Help','🧹']],seeking:[['sk_admin','Admin & Office','🗂️'],['sk_sales','Sales & Marketing','📣'],['sk_driver','Drivers & Delivery','🚚'],['sk_tech','Technical & Trades','🔧'],['sk_it','IT & Computing','💻'],['sk_edu','Teaching & Training','📚'],['sk_domestic','Domestic & Home Help','🧹'],['sk_other','Other','📄']],business:[['bz_sale','Businesses For Sale','🏢'],['bz_partner','Partnerships & Investments','🤝'],['bz_franchise','Franchises','🏷️'],['bz_whole','Wholesale & Bulk Supplies','📦'],['bz_supply','Commercial Supplies','🛒'],['bz_serv','Business Services','🧾']]};
const SUBLABEL={};Object.keys(SUBCATS).forEach(k=>SUBCATS[k].forEach(x=>{SUBLABEL[x[0]]=x[1];}));
window.SUBCATS=SUBCATS;window.SUBLABEL=SUBLABEL;
window.subLabel=l=>(l&&l.subcategory&&SUBLABEL[l.subcategory])||'';
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
async function authed(fn){const{data:{session}}=await supabaseClient.auth.getSession();if(!session){openAuth('login');return;}fn(session);}
let condFilter='all',sortMode='new',activeSub='all';
window.bqGetView=()=>({cat:activeCategory,sub:activeSub,st:activeState,cond:condFilter,sort:sortMode,q:(document.getElementById('bqQ')?document.getElementById('bqQ').value.trim():'')});
window.bqOpenPicker=c=>{openSubPicker(c);};
window.bqSetView=v=>{activeCategory=v.cat;activeSub=v.sub;activeState=v.st;condFilter=v.cond;sortMode=v.sort;
 const g=id=>document.getElementById(id);
 if(g('bqQ'))g('bqQ').value=v.q||'';
 if(g('bqState'))g('bqState').value=v.st;
 if(g('bqSort'))g('bqSort').value=v.sort;
 document.querySelectorAll('#bqCond button').forEach(x=>x.classList.toggle('on',x.dataset.v===v.cond));
 document.querySelectorAll('.bq-cat').forEach(x=>x.classList.toggle('on',v.cat!=='all'&&x.dataset.c===v.cat));
 if(window.renderListings)window.renderListings();};

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
$('bqCats').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;const c=b.dataset.c;if(SUBCATS[c]){openSubPicker(c);return;}activeCategory=c==='trending'?'all':c;activeSub='all';
 document.querySelectorAll('.bq-cat').forEach(x=>x.classList.toggle('on',x===b&&c!=='trending'));renderListings();$('products').scrollIntoView({behavior:'smooth'});};
document.querySelector('.bq-chips').onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
 if(a==='admin')openAdmin();
 if(a==='sell')alert('How to sell:\n1. Log in or sign up\n2. Tap Sell\n3. Add title, price, category, New or Used, state and a photo\n4. Post, then reply to buyers in Messages');
 if(a==='buy')alert('How to buy:\n1. Search or pick a category\n2. Open a listing and tap Contact seller\n3. Agree a price and meet in a safe public place\n4. Pay only after you inspect the item');};
nav.onclick=e=>{const b=e.target.closest('[data-n]');if(!b)return;const n=b.dataset.n;
 if(n==='home'){activeCategory='all';activeSub='all';activeState='all';condFilter='all';sortMode='new';$('bqState').value='all';$('bqQ').value='';$('bqSort').value='new';
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
sc.insertAdjacentHTML('afterend','<label id="sellSubL" style="display:none">Type</label><select id="sellSub" style="display:none"></select>');
function fillSub(prefix,cat,val){const L=document.getElementById(prefix+'SubL'),S=document.getElementById(prefix+'Sub');if(!L||!S)return;const list=SUBCATS[cat];if(!list){L.style.display=S.style.display='none';S.innerHTML='';return;}S.innerHTML='<option value="">Choose a type</option>'+list.map(x=>'<option value="'+x[0]+'">'+esc(x[1])+'</option>').join('');S.value=val&&SUBLABEL[val]?val:'';L.style.display=S.style.display='';}
window.fillSub=fillSub;sc.addEventListener('change',()=>fillSub('sell',sc.value));fillSub('sell',sc.value);
sc.insertAdjacentHTML('afterend','<label>Condition</label><select id="sellCondition"><option value="new">New</option><option value="used">Used</option></select>');

document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="subOverlay"><div class="modal" style="color:#222;padding:0"><div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #eee;position:sticky;top:0;background:#fff;z-index:2"><h3 id="subTitle" style="margin:0"></h3><span id="subClose" style="font-size:22px;cursor:pointer;padding:4px 8px">✕</span></div><div id="subList"></div></div></div>');
let subCat=null;
function subRow(icon,name,note,key){const f='sub-'+(key==='all'?'all-'+subCat:key)+'.jpg';return '<div class="bqSubRow" data-k="'+key+'" style="display:flex;align-items:center;gap:14px;padding:14px 16px;border-bottom:1px solid #eee;cursor:pointer"><div style="position:relative;overflow:hidden;width:56px;height:56px;border-radius:12px;background:#fff3e8;display:flex;align-items:center;justify-content:center;font-size:26px;flex:0 0 56px">'+icon+'<img src="'+f+'" alt="" loading="lazy" onerror="this.remove()" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div><div style="flex:1;min-width:0"><div style="font-weight:bold;font-size:15px;color:#222">'+esc(name)+'</div><div style="font-size:12.5px;color:#777;margin-top:2px">'+note+'</div></div><div style="color:#999;font-size:20px">›</div></div>';}
function openSubPicker(c){
 subCat=c;$('subTitle').textContent=CATEGORY_LABELS[c]||'Category';
 const live=currentListings.filter(l=>l.category_id===c);
 const cnt=k=>{const n=live.filter(l=>l.subcategory===k).length;return n?n+' listing'+(n>1?'s':''):'No listings yet';};
 $('subList').innerHTML=subRow(CATEGORY_ICONS[c]||'🛍️','All '+(CATEGORY_LABELS[c]||''),live.length+' listing'+(live.length===1?'':'s'),'all')+SUBCATS[c].map(x=>subRow(x[2],x[1],cnt(x[0]),x[0])).join('');
 $('subOverlay').classList.add('show');
}
$('subClose').onclick=()=>$('subOverlay').classList.remove('show');
$('subList').onclick=e=>{const r=e.target.closest('.bqSubRow');if(!r||!subCat)return;
 activeCategory=subCat;activeSub=r.dataset.k;$('subOverlay').classList.remove('show');
 document.querySelectorAll('.bq-cat').forEach(x=>x.classList.toggle('on',x.dataset.c===subCat));
 renderListings();$('products').scrollIntoView({behavior:'smooth'});};
function renderRec(){const rec=currentListings.filter(l=>l.image_url).slice(0,10);$('bqRecH').style.display=rec.length?'':'none';
 $('bqRec').innerHTML=rec.map(l=>`<div data-id="${l.id}"><img src="${esc(l.image_url)}" alt="" loading="lazy"><span>${esc(l.title)}</span></div>`).join('');}
$('bqRec').onclick=e=>{const d=e.target.closest('[data-id]');if(!d)return;const l=currentListings.find(x=>String(x.id)===d.dataset.id);if(l)openDetail(l);};

window.renderListings=function(){
 const grid=$('productGrid'),q=$('bqQ').value.trim().toLowerCase();
 const f=currentListings.filter(l=>(activeCategory==='all'||l.category_id===activeCategory)&&(activeSub==='all'||l.subcategory===activeSub)&&(activeState==='all'||l.state===activeState)&&(condFilter==='all'||l.condition===condFilter)&&(!q||(l.title||'').toLowerCase().includes(q)||(l.description||'').toLowerCase().includes(q)));
 if(sortMode==='lo')f.sort((a,b)=>Number(a.price)-Number(b.price));
 else if(sortMode==='hi')f.sort((a,b)=>Number(b.price)-Number(a.price));
 else f.sort((a,b)=>new Date(b.created_at||0)-new Date(a.created_at||0));
 currentFilteredListings=f;
 document.querySelector('#products h2').textContent=activeCategory==='all'?'Trending':(activeSub!=='all'&&SUBLABEL[activeSub]?SUBLABEL[activeSub]:(CATEGORY_LABELS[activeCategory]||'Listings'));
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
<label>Category</label><select id="editCategory"></select><label id="editSubL" style="display:none">Type</label><select id="editSub" style="display:none"></select>
<label>Condition</label><select id="editCondition"><option value="new">New</option><option value="used">Used</option></select>
<label>State</label><select id="editState"></select>
<label>Description</label><textarea id="editDesc"></textarea>
<button class="button" id="editSave">Save changes</button></div></div>`);
$('editCategory').innerHTML=$('sellCategory').innerHTML;
$('editCategory').addEventListener('change',()=>fillSub('edit',$('editCategory').value));
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
  $('editTitle').value=l.title||'';$('editPrice').value=l.price||'';$('editCategory').value=l.category_id;fillSub('edit',l.category_id,l.subcategory);
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
 const editCat=$('editCategory').value;
 if(SUBCATS[editCat]&&!$('editSub').value){err.textContent='Choose the type of '+(CATEGORY_LABELS[editCat]||'item')+'.';err.style.display='block';return;}
 const upd={title,price,category_id:editCat,state:$('editState').value,condition:$('editCondition').value,description:$('editDesc').value.trim(),subcategory:SUBCATS[editCat]?$('editSub').value:null};
 let{error}=await supabaseClient.from('listings').update(upd).eq('id',editing.id);
 if(error&&/condition/i.test(error.message)){delete upd.condition;({error}=await supabaseClient.from('listings').update(upd).eq('id',editing.id));}
 if(error&&/subcategory/i.test(error.message)){delete upd.subcategory;({error}=await supabaseClient.from('listings').update(upd).eq('id',editing.id));}
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
 if(SUBCATS[$('sellCategory').value]&&!$('sellSub').value)return fail('Choose the type of '+(CATEGORY_LABELS[$('sellCategory').value]||'item')+' you are listing.');
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
 const row={seller_id:session.user.id,title,description:$('sellDesc').value.trim(),price,category_id:$('sellCategory').value,state:$('sellState').value,city:$('sellCity').value.trim()||null,negotiable:$('sellNeg').checked,condition:$('sellCondition').value,image_url:images[0]||null,images,subcategory:SUBCATS[$('sellCategory').value]?($('sellSub').value||null):null};
 let{error}=await supabaseClient.from('listings').insert(row);
 if(error&&/condition/i.test(error.message)){delete row.condition;({error}=await supabaseClient.from('listings').insert(row));}
 if(error&&/subcategory/i.test(error.message)){delete row.subcategory;({error}=await supabaseClient.from('listings').insert(row));}
 if(error)return fail(error.message);
 btn.disabled=false;btn.textContent='Post listing';ok.textContent='Listing posted!';ok.style.display='block';
 ['sellTitle','sellPrice','sellDesc','sellCity'].forEach(id=>$(id).value='');$('sellNeg').checked=false;si.value='';
 loadListings();setTimeout(closeSell,1200);
};
function ago(d){const s=(Date.now()-new Date(d))/1000;if(!(s>=0))return '';if(s<3600)return Math.max(1,Math.round(s/60))+' min ago';if(s<86400)return Math.round(s/3600)+' hr ago';const n=Math.round(s/86400);return n<30?n+' day'+(n>1?'s':'')+' ago':new Date(d).toLocaleDateString();}
const openDetailCore=async function(l){
 currentDetailListing=l;
 const{data:{session}}=await supabaseClient.auth.getSession();
 const own=session&&session.user.id===l.seller_id;
 let rawImgs=l.images;if(typeof rawImgs==='string'){try{rawImgs=JSON.parse(rawImgs);}catch(e){rawImgs=rawImgs?[rawImgs]:[];}}
 const imgs=Array.isArray(rawImgs)&&rawImgs.length?rawImgs.filter(Boolean):(l.image_url?[l.image_url]:[]);
 const sim=currentListings.filter(x=>x.id!==l.id&&x.category_id===l.category_id).slice(0,6);
 const where=l.city?l.city+', '+l.state:l.state;
 $('detailContent').innerHTML=
 '<div class="detail-image">'+(imgs.length?'<img id="dMainImg" src="'+esc(imgs[0])+'" alt="">':(CATEGORY_ICONS[l.category_id]||'🛍️'))+'<button class="fav-btn detail-fav-btn" id="detailFavBtn">'+(currentFavorites.has(l.id)?'♥':'♡')+'</button></div>'+
 (imgs.length>1?'<div class="bq-thumbs">'+imgs.map((u,i)=>'<img src="'+esc(u)+'" data-i="'+i+'" class="'+(i?'':'on')+'">').join('')+'</div>':'')+
 '<h3>'+esc(l.title)+'</h3>'+
 '<p class="price" style="font-size:18px;margin:6px 0 6px">₦'+Number(l.price).toLocaleString()+(l.negotiable?'<span class="bq-neg">Negotiable</span>':'')+'</p>'+
 '<p class="bq-meta">👁 <span id="dViews">'+(l.views||0)+'</span> views · Posted '+ago(l.created_at)+'</p>'+
 '<span class="detail-tag">📍 '+esc(where)+'</span><span class="detail-tag">'+esc(CATEGORY_LABELS[l.category_id]||l.category_id)+'</span>'+(subLabel(l)?'<span class="detail-tag">'+esc(subLabel(l))+'</span>':'')+(l.condition?'<span class="detail-tag">'+(l.condition==='new'?'New':'Used')+'</span>':'')+
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
window.openDetail=async function(l){
 try{await openDetailCore(l);}
 catch(e){
  try{$('detailOverlay').classList.remove('show');}catch(x){}
  alert('Could not open this listing. Error: '+(e&&e.message?e.message:e)+'. Please screenshot this message and send it to support.');
 }
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
<h4>1. About BuyQora</h4><p>BuyQora is an online marketplace where people in Nigeria post items and services and contact each other. BuyQora is only a platform. We are not the buyer or the seller, and we do not handle payments between buyers and sellers, delivery or returns. Fees for BuyQora's own services (extra listings, promotions and business verification) are explained in the Advertising Terms.</p>
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
const NAMES={basic:'Basic Boost',featured:'Featured',premium:'Premium',top:'Top Advert',vip:'VIP',diamond:'Diamond'};
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
const NAMES={basic:'Basic Boost',featured:'Featured',premium:'Premium',top:'Top Advert',vip:'VIP',diamond:'Diamond'};
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
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const LBL={basic:['Promoted','#0277bd'],featured:['Featured','#ff6b00'],premium:['Premium','#8e24aa'],top:['Sponsored','#c62828'],vip:['⭐ VIP','#b8860b'],diamond:['💎 Diamond','#00838f']};
const RANK={basic:1,featured:2,premium:3,top:4,vip:5,diamond:6};
let promoMap={};
window.bqPromoOf=l=>promoMap[l.id]||null;
window.bqPromoLbl=LBL;

async function loadPromos(){
 try{
  const{data}=await supabaseClient.from('promotions').select('listing_id,package_id,expires_at').eq('status','active').gt('expires_at',new Date().toISOString());
  const m={};
  (data||[]).forEach(p=>{const c=m[p.listing_id];if(!c||RANK[p.package_id]>RANK[c.package_id])m[p.listing_id]=p;});
  promoMap=m;
 }catch(e){}
}
function rankOf(l){
 const p=promoMap[l.id];if(!p)return 0;
 if(p.package_id==='basic'&&activeCategory==='all'&&!$('bqQ').value.trim())return 0;
 return RANK[p.package_id]||0;
}
function tag(pk,style){
 const t=LBL[pk]||LBL.basic;
 return '<b class="bqPromoTag" style="position:absolute;'+style+';background:'+t[1]+';color:#fff;font-size:10px;padding:2px 7px;border-radius:999px;z-index:3">'+t[0]+'</b>';
}

const rec=$('bqRec');
const fh=document.createElement('h3');fh.className='bq-h';fh.id='bqFeatH';fh.textContent='⭐ Featured';
const fr=document.createElement('div');fr.className='bq-rec';fr.id='bqFeat';
if(rec){rec.after(fr);rec.after(fh);}
fr.onclick=e=>{
 const d=e.target.closest('[data-id]');if(!d)return;
 const l=currentListings.find(x=>String(x.id)===d.dataset.id);
 if(l)openDetail(l);
};
function renderFeatured(){
 const items=currentListings.filter(l=>{const p=promoMap[l.id];return p&&(p.package_id==='featured'||p.package_id==='premium'||p.package_id==='top'||p.package_id==='vip'||p.package_id==='diamond');})
  .sort((a,b)=>RANK[promoMap[b.id].package_id]-RANK[promoMap[a.id].package_id]).slice(0,10);
 fh.style.display=fr.style.display=items.length?'':'none';
 fr.innerHTML=items.map(l=>'<div data-id="'+l.id+'" style="position:relative">'+(l.image_url?'<img src="'+esc(l.image_url)+'" alt="" loading="lazy">':'<img alt="" style="background:#eee">')+'<span>'+esc(l.title)+'</span>'+tag(promoMap[l.id].package_id,'top:6px;left:6px')+'</div>').join('');
}

const prev=window.renderListings;
window.renderListings=function(){
 prev.apply(this,arguments);
 try{
  const grid=$('productGrid');
  const sortVal=$('bqSort')?$('bqSort').value:'new';
  const items=[...grid.querySelectorAll('.product[data-idx]')].map(c=>({c,l:currentFilteredListings[c.dataset.idx]})).filter(x=>x.l);
  if(sortVal==='new')items.sort((a,b)=>rankOf(b.l)-rankOf(a.l));
  items.forEach((x,i)=>{
   x.c.dataset.idx=i;grid.appendChild(x.c);
   const p=promoMap[x.l.id];
   const box=x.c.querySelector('.product-image');
   if(p&&box&&!box.querySelector('.bqPromoTag'))box.insertAdjacentHTML('beforeend',tag(p.package_id,'left:6px;bottom:6px'));
  });
  currentFilteredListings=items.map(x=>x.l);
  renderFeatured();
 }catch(e){}
};

const ol=window.loadListings;
if(ol)window.loadListings=async function(){
 await ol.apply(this,arguments);
 await loadPromos();
 window.renderListings();
};
loadPromos().then(()=>window.renderListings());
})();
(function(){
const sub=document.getElementById('promoSubmit');
if(!sub)return;
const orig=sub.onclick;
sub.onclick=function(){
 const line=(document.getElementById('promoTotal').textContent||'').split('\n')[0];
 if(!confirm(line+'\n\nSubmit this promotion?'))return;
 return orig.apply(this,arguments);
};
})();
(function(){
const wrap=document.getElementById('promoPkgs');
if(!wrap)return;
wrap.insertAdjacentHTML('beforebegin','<select id="promoPkgSel" style="margin-bottom:10px"><option value="basic">Basic Boost</option><option value="featured">Featured</option><option value="premium">Premium</option><option value="top">Top Advert</option></select><div id="promoPicked" style="font-weight:bold;margin-bottom:10px;color:#8e24aa"></div>');
const sel=document.getElementById('promoPkgSel');
const days=document.getElementById('promoDays');
function show(){
 const t=(document.getElementById('promoTotal').textContent||'').split('\n')[0];
 document.getElementById('promoPicked').textContent='Selected → '+t;
}
sel.onchange=function(){
 const card=wrap.querySelector('[data-p="'+sel.value+'"]');
 if(card)card.click();
 show();
};
days.addEventListener('change',function(){setTimeout(show,0);});
wrap.addEventListener('click',function(e){
 const c=e.target.closest('[data-p]');
 if(c){sel.value=c.dataset.p;}
 setTimeout(show,0);
});
new MutationObserver(function(){
 if(document.getElementById('promoOverlay').classList.contains('show')){
  sel.value='basic';
  setTimeout(show,0);
 }
}).observe(document.getElementById('promoOverlay'),{attributes:true,attributeFilter:['class']});
})();
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const naira=n=>'₦'+Number(n||0).toLocaleString();
async function cfg(){
 const{data}=await supabaseClient.from('app_settings').select('key,value');
 const o={};(data||[]).forEach(r=>{o[r.key]=r.value;});
 const l=parseInt(o.free_listings,10),f=parseFloat(o.posting_fee);
 return{lim:isNaN(l)?5:l,fee:isNaN(f)?1800:f,instr:(o.payment_instructions||'').trim()};
}

/* ---- Sell screen: remaining free listings ---- */
const sh=document.querySelector('#sellOverlay .modal h3');
sh.insertAdjacentHTML('afterend','<div id="quotaNote" style="font-size:13.5px;font-weight:bold;border-radius:8px;padding:8px 10px;margin-bottom:12px;background:#f7f7f7;display:none"></div>');
$('quotaNote').insertAdjacentHTML('afterend','<div id="oneItemNote" style="font-size:13px;line-height:1.5;border-radius:8px;padding:8px 10px;margin-bottom:12px;background:#fff6ec;color:#8a4b00">One listing = one item. You can add up to 5 photos of the same item. To sell another item, post it as a separate listing.</div>');
async function showQuota(){
 const n=$('quotaNote');n.style.display='none';
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return;
 const c=await cfg();
 const{data:row}=await supabaseClient.from('seller_listing_counts').select('posted').eq('user_id',session.user.id).maybeSingle();
 const left=Math.max(0,c.lim-(row?row.posted:0));
 let t,col;
 if(isAdmin){t='Admin: you can post without paying.';col='#0277bd';}
 else if(left>0){t='You have '+left+' free listing'+(left>1?'s':'')+' remaining.';col='#2e7d32';}
 else{t="You've used your "+c.lim+' free listings. Your next listing costs '+naira(c.fee)+'. It goes live after we confirm your payment.';col='#c0392b';}
 n.textContent=t;n.style.color=col;n.style.display='block';
}
const oOpen=window.openSell;
window.openSell=function(){oOpen.apply(this,arguments);showQuota();};

/* ---- Seller payment screen ---- */
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="postOverlay" style="z-index:10001"><div class="modal" style="color:#222"><span class="close" id="postClose">✕</span><h3>Pay to publish your listing</h3><p id="postTitle" style="font-weight:bold;margin-bottom:8px"></p><p class="error" id="postError"></p><div id="postInfo" style="font-size:14px;line-height:1.6;margin-bottom:12px"></div><label>Payment reference</label><input type="text" id="postRef" placeholder="Sender name or transaction ID"><button class="button" id="postSubmit">I have paid, submit</button></div></div>');
$('postClose').onclick=()=>$('postOverlay').classList.remove('show');
const ps={id:null,fee:0,instr:''};
async function openPostPay(id,title){
 const err=$('postError');err.style.display='none';
 const{data:ex}=await supabaseClient.from('payments').select('status').eq('purpose','posting').eq('related_id',id).in('status',['submitted','confirmed']).limit(1);
 if(ex&&ex.length){alert('Payment for this listing was already submitted. Please wait for confirmation.');return;}
 const c=await cfg();
 ps.id=id;ps.fee=c.fee;ps.instr=c.instr;
 $('postTitle').textContent=title||'';
 $('postInfo').innerHTML='<p>Your listing is saved but hidden until your payment is confirmed.</p><p style="margin-top:8px"><b>Posting fee:</b> '+naira(c.fee)+'</p><p style="margin-top:8px"><b>Pay by bank transfer to:</b></p>'+(c.instr?'<p style="white-space:pre-wrap;background:#f7f7f7;border-radius:8px;padding:10px">'+esc(c.instr)+'</p>':'<p style="color:#c0392b">Payment details are not set up yet. Please contact support.</p>');
 $('postRef').value='';
 $('postOverlay').classList.add('show');
}
$('postSubmit').onclick=async()=>{
 const err=$('postError');err.style.display='none';
 const ref=$('postRef').value.trim();
 const show=m=>{err.textContent=m;err.style.display='block';};
 if(!ps.instr)return show('Payment details are not set up yet. Please contact support.');
 if(ref.length<3)return show('Enter your payment reference (sender name or transaction ID).');
 const b=$('postSubmit');b.disabled=true;
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){b.disabled=false;return;}
 const{error}=await supabaseClient.from('payments').insert({user_id:session.user.id,purpose:'posting',related_id:ps.id,amount:ps.fee,reference:ref,status:'submitted'});
 b.disabled=false;
 if(error)return show('Could not record payment: '+error.message);
 $('postOverlay').classList.remove('show');
 alert('Payment submitted. Your listing goes live once we confirm it.');
 if(window.openMine&&$('myOverlay').classList.contains('show'))window.openMine();
};

/* ---- after posting: open payment screen if the listing was held ---- */
const oSub=window.submitListing;
window.submitListing=async function(){
 await oSub.apply(this,arguments);
 try{
  const{data:{session}}=await supabaseClient.auth.getSession();
  if(!session)return;
  const since=new Date(Date.now()-60000).toISOString();
  const{data:l}=await supabaseClient.from('listings').select('id,title').eq('seller_id',session.user.id).eq('status','pending_payment').gte('created_at',since).order('created_at',{ascending:false}).limit(1);
  if(l&&l.length){
   const s=$('sellSuccess');s.textContent='Listing saved. Pay the posting fee to publish it.';s.style.display='block';
   openPostPay(l[0].id,l[0].title);
  }
  showQuota();
 }catch(e){}
};

/* ---- My listings: show held listings ---- */
async function decoratePend(){
 const box=$('myList');
 const rows=[...box.children].filter(r=>r.textContent.indexOf('pending_payment')>-1&&!r.dataset.pp);
 if(!rows.length)return;
 rows.forEach(r=>{r.dataset.pp='1';});
 const ids=rows.map(r=>{const b=r.querySelector('button[data-id]');return b&&b.dataset.id;}).filter(Boolean);
 const{data:py}=await supabaseClient.from('payments').select('related_id,status').eq('purpose','posting').in('related_id',ids).order('created_at');
 const map={};(py||[]).forEach(p=>{map[p.related_id]=p.status;});
 rows.forEach(r=>{
  const b=r.querySelector('button[data-id]');if(!b)return;
  const id=b.dataset.id;
  r.querySelectorAll('span').forEach(s=>{if(s.textContent==='pending_payment')s.textContent='Awaiting payment';});
  const rel=r.querySelector('button[data-a="relist"]');if(rel)rel.remove();
  const wrap=b.parentElement;
  const st=map[id];
  if(st==='submitted'||st==='confirmed'){
   wrap.insertAdjacentHTML('afterbegin','<span style="font-size:12.5px;color:#666;width:100%">⏳ Payment submitted, awaiting confirmation</span>');
  }else{
   wrap.insertAdjacentHTML('afterbegin','<button data-a="postpay" data-id="'+id+'" style="background:#00897b;color:#fff;border:0;border-radius:6px;padding:6px 10px;font-size:12px;font-weight:bold">💳 Pay to publish</button>');
  }
 });
}
new MutationObserver(()=>decoratePend()).observe($('myList'),{childList:true,subtree:true});
$('myList').addEventListener('click',e=>{
 const b=e.target.closest('button[data-a="postpay"]');
 if(!b)return;
 e.stopImmediatePropagation();
 const t=b.closest('div[style*="border-bottom"]');
 const title=t?(t.querySelector('div[style*="font-weight:bold"]')||{}).textContent:'';
 openPostPay(b.dataset.id,title);
},true);

/* ---- Admin: listing payments ---- */
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="lpOverlay" style="z-index:10000"><div class="modal" style="color:#222"><span class="close" id="lpClose">✕</span><h3>Listing payments</h3><div id="lpList"></div></div></div>');
$('lpClose').onclick=()=>$('lpOverlay').classList.remove('show');
async function lpLoad(){
 const box=$('lpList');box.innerHTML='<p style="color:#999">Loading...</p>';
 const c=await cfg();
 const{data:pays,error}=await supabaseClient.from('payments').select('id,user_id,related_id,reference,created_at').eq('purpose','posting').eq('status','submitted').order('created_at',{ascending:false});
 if(error){box.innerHTML='<p style="color:#c0392b">'+esc(error.message)+'</p>';return;}
 if(!pays||!pays.length){box.innerHTML='<p style="color:#999">No listing payments waiting.</p>';return;}
 const{data:ls}=await supabaseClient.from('listings').select('id,title').in('id',pays.map(p=>p.related_id));
 const lm={};(ls||[]).forEach(l=>{lm[l.id]=l;});
 const names={};
 for(const uid of [...new Set(pays.map(p=>p.user_id))]){names[uid]=await getProfileName(uid);}
 const bt=(a,p,t,col)=>'<button data-a="'+a+'" data-id="'+p.id+'" data-lid="'+p.related_id+'" data-uid="'+p.user_id+'" style="background:'+col+';color:#fff;border:0;border-radius:6px;padding:7px 12px;font-size:12px;font-weight:bold;margin:6px 6px 0 0">'+t+'</button>';
 box.innerHTML=pays.map(p=>'<div style="padding:14px 0;border-bottom:1px solid #eee"><div style="font-weight:bold;font-size:15px">'+esc(lm[p.related_id]?lm[p.related_id].title:'Listing')+'</div><div style="color:#666;font-size:13px;margin:2px 0">Seller: '+esc(names[p.user_id]||'')+'</div><div style="background:#f7f7f7;border-radius:8px;padding:6px 10px;font-size:12.5px;margin-top:6px">💳 Expected '+naira(c.fee)+' · Ref: <b>'+esc(p.reference)+'</b></div>'+bt('pub',p,'Payment received &amp; publish','#2e7d32')+bt('rej',p,'Reject','#c0392b')+'</div>').join('');
}
$('lpList').onclick=async e=>{
 const b=e.target.closest('button[data-a]');if(!b)return;
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return;
 b.disabled=true;
 if(b.dataset.a==='pub'){
  if(!confirm('Have you checked your bank and received the posting fee? This will publish the listing.')){b.disabled=false;return;}
  const r1=await supabaseClient.from('listings').update({status:'active'}).eq('id',b.dataset.lid).select('id');
  if(r1.error||!(r1.data&&r1.data.length)){alert('Could not publish the listing: '+(r1.error?r1.error.message:'no permission'));b.disabled=false;return;}
  const r2=await supabaseClient.from('payments').update({status:'confirmed',confirmed_by:session.user.id,confirmed_at:new Date().toISOString()}).eq('id',b.dataset.id);
  if(r2.error){alert('Listing published but the payment record failed: '+r2.error.message);}
  await supabaseClient.from('notifications').insert({user_id:b.dataset.uid,title:'Your listing is live',message:'Payment confirmed. Your listing is now published.'});
  if(window.loadListings)window.loadListings();
 }else{
  if(!confirm('Reject this payment? The seller can submit a new one.')){b.disabled=false;return;}
  const r=await supabaseClient.from('payments').update({status:'rejected',confirmed_by:session.user.id,confirmed_at:new Date().toISOString()}).eq('id',b.dataset.id);
  if(r.error){alert('Could not update: '+r.error.message);b.disabled=false;return;}
  await supabaseClient.from('notifications').insert({user_id:b.dataset.uid,title:'Payment not confirmed',message:'We could not confirm your posting payment. Please check the details and submit it again.'});
 }
 lpLoad();
};
const anc=$('bqPromoAdmin')||$('bqVerBtn')||document.querySelector('#adminOverlay .modal h3');
if(anc){
 anc.insertAdjacentHTML('afterend','<button class="button" id="bqLpAdmin" style="margin-bottom:12px;background:#00897b">💳 Listing payments</button>');
 $('bqLpAdmin').onclick=()=>{$('lpOverlay').classList.add('show');lpLoad();};
}
})();

/* Results count under the category heading */
(function(){
const prev=window.renderListings;
window.renderListings=function(){
 prev.apply(this,arguments);
 try{
  const h=document.querySelector('#products h2'),n=(window.currentFilteredListings||currentFilteredListings||[]).length;
  if(h&&!/·/.test(h.textContent))h.textContent=h.textContent+' · '+n+(n===1?' ad':' ads');
 }catch(e){}
};
window.renderListings();
})();

/* Vehicles: brand chips + year filter (matches words in the title/description) */
(function(){
const BR=[['Toyota',['toyota']],['Lexus',['lexus']],['Mercedes-Benz',['mercedes','benz']],['Honda',['honda']],['Nissan',['nissan']],['Hyundai',['hyundai']],['Kia',['kia']],['Ford',['ford']],['BMW',['bmw']],['Peugeot',['peugeot']],['Volkswagen',['volkswagen']],['Other',null]];
const known=BR.filter(b=>b[1]).flatMap(b=>b[1]);
let brand='';
const css=document.createElement('style');
css.textContent='.bq-veh{display:none;padding:6px 12px}.bq-veh.on{display:block}.bq-vb{display:flex;gap:8px;overflow-x:auto;padding-bottom:8px}.bq-vb button{flex:0 0 auto;padding:7px 14px;border-radius:18px;border:1px solid #888;background:transparent;color:inherit;font-size:14px}.bq-vb button.on{background:#f97316;border-color:#f97316;color:#fff}.bq-vy{display:flex;gap:8px}.bq-vy input{flex:1;min-width:0;padding:8px;border-radius:8px;border:1px solid #888;background:transparent;color:inherit}';
document.head.appendChild(css);
const bar=document.createElement('div');bar.className='bq-veh';
bar.innerHTML='<div class="bq-vb">'+BR.map(b=>'<button data-b="'+b[0]+'">'+b[0]+'</button>').join('')+'</div><div class="bq-vy"><input id="bqYf" type="number" inputmode="numeric" placeholder="Year from"><input id="bqYt" type="number" inputmode="numeric" placeholder="Year to"></div>';
const anchor=document.querySelector('.bq-filter2')||document.querySelector('.bq-filter');
anchor.insertAdjacentElement('afterend',bar);
const hasW=(t,w)=>new RegExp('\\b'+w+'\\b').test(t);
const yearOf=l=>{const re=/\b(19[89]\d|20[0-3]\d)\b/;const m=re.exec(l.title||'')||re.exec(l.description||'');return m?+m[1]:0;};
const prev=window.renderListings;
window.renderListings=function(){
 const on=activeCategory==='vehicles';
 bar.classList.toggle('on',on);
 if(!on){brand='';document.getElementById('bqYf').value='';document.getElementById('bqYt').value='';}
 bar.querySelectorAll('.bq-vb button').forEach(b=>b.classList.toggle('on',b.dataset.b===brand));
 const yf=parseInt(document.getElementById('bqYf').value),yt=parseInt(document.getElementById('bqYt').value);
 const all=currentListings;
 if(on&&(brand||yf>0||yt>0)){
  const def=BR.find(b=>b[0]===brand);
  currentListings=all.filter(l=>{
   const t=((l.title||'')+' '+(l.description||'')).toLowerCase();
   if(brand){const words=def[1]||null;
    if(words){if(!words.some(w=>hasW(t,w)))return false;}
    else if(known.some(w=>hasW(t,w)))return false;}
   if(yf>0||yt>0){const y=yearOf(l);if(!y)return false;if(yf>0&&y<yf)return false;if(yt>0&&y>yt)return false;}
   return true;});
 }
 try{prev.apply(this,arguments);}finally{currentListings=all;}
};
bar.addEventListener('click',e=>{const b=e.target.closest('button[data-b]');if(!b)return;brand=(brand===b.dataset.b)?'':b.dataset.b;renderListings();});
['bqYf','bqYt'].forEach(id=>document.getElementById(id).addEventListener('input',()=>renderListings()));
window.renderListings();
})();

/* Bundle: Advertising terms page + grid/list toggle + Recently viewed row */
(function(){
const $=id=>document.getElementById(id);
const store={get(k){try{return localStorage.getItem(k);}catch(e){return null;}},set(k,v){try{localStorage.setItem(k,v);}catch(e){}}};

/* 1. Advertising terms */
const EMAIL='princelongmoney@gmail.com';
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="adTermsOverlay"><div class="modal" style="color:#222;max-width:600px"><span class="close" id="adTermsClose">✕</span><h3>Advertising Terms</h3><div id="adTermsBody" style="font-size:14px;line-height:1.6"></div></div></div>');
$('adTermsBody').innerHTML='<p><i>Last updated: October 2026</i></p>'+
'<h4>1. Who can advertise</h4><p>Any registered BuyQora seller, business, company or brand aged 18 or over can promote a listing or place an advert, as long as the content follows our Terms of Use.</p>'+
'<h4>2. Promotion and advert types</h4><p>BuyQora offers paid listing promotions (Basic Boost, Featured, Premium and Top Advert) and business adverts such as banners and video. Promoted items are clearly labelled, for example Promoted, Featured, Premium or Sponsored.</p>'+
'<h4>3. Prices and duration</h4><p>Prices and durations are shown before you pay and may be changed by BuyQora at any time. A change does not affect a promotion you have already paid for.</p>'+
'<h4>4. Payment</h4><p>A promotion or advert starts only after BuyQora has received and confirmed your payment. Payments are currently made by bank transfer and confirmed by our team. Keep your proof of payment.</p>'+
'<h4>5. Refunds</h4><p>Once a promotion or advert is active, the fee is not refundable. If we fail to show a paid promotion, contact us and we will extend it or refund you.</p>'+
'<h4>6. Advert content</h4><p>Adverts must be honest and lawful. No illegal, fake, counterfeit, misleading or adult content, no scams, and no content that harms or insults others. You must have the right to use all text, images and video in your advert.</p>'+
'<h4>7. Our right to reject or remove</h4><p>BuyQora may reject, pause or remove any advert or promotion that breaks these terms or our Terms of Use, without a refund where the breach is serious.</p>'+
'<h4>8. No guarantee of results</h4><p>A promotion increases visibility but we cannot guarantee a number of views, messages or sales.</p>'+
'<h4>9. Verified business badge</h4><p>The verified badge is a paid service. We may remove it if the business information turns out to be false.</p>'+
'<h4>10. Contact</h4><p>For any advertising question, email '+EMAIL+'.</p>';
$('adTermsBody').querySelectorAll('h4').forEach(h=>{h.style.margin='14px 0 4px';});
$('adTermsClose').onclick=()=>$('adTermsOverlay').classList.remove('show');
const links=$('legalLinks');
if(links){
 links.insertAdjacentHTML('beforeend',' &nbsp;·&nbsp; <a id="adTermsLink" style="color:#ff6b00;cursor:pointer">Advertising</a>');
 $('adTermsLink').onclick=()=>$('adTermsOverlay').classList.add('show');
}

/* 2. Grid / list toggle */
const css=document.createElement('style');
css.textContent='#bqView{display:flex;justify-content:flex-end;padding:0 12px 8px}#bqView button{padding:7px 14px;border-radius:18px;border:1px solid #888;background:transparent;color:inherit;font-size:14px}'+
'#productGrid.bq-list{display:flex!important;flex-direction:column;gap:10px}'+
'#productGrid.bq-list .product{display:grid!important;grid-template-columns:120px 1fr;column-gap:12px;align-items:start;width:100%}'+
'#productGrid.bq-list .product>.product-image{grid-column:1;grid-row:1/span 10;width:120px;height:120px;min-height:0}'+
'#productGrid.bq-list .product>.product-image img{width:100%;height:100%;object-fit:cover}'+
'#productGrid.bq-list .product>*:not(.product-image){grid-column:2}';
document.head.appendChild(css);
const grid=$('productGrid');
const vb=document.createElement('div');vb.id='bqView';vb.innerHTML='<button type="button"></button>';
grid.before(vb);
const btn=vb.firstChild;
function applyView(){const list=store.get('bq_view')==='list';grid.classList.toggle('bq-list',list);btn.textContent=list?'▦ Grid view':'☰ List view';}
btn.onclick=()=>{store.set('bq_view',store.get('bq_view')==='list'?'grid':'list');applyView();};
applyView();

/* 3. Recently viewed */
const rec=$('bqRec');
const rh=document.createElement('h3');rh.className='bq-h';rh.id='bqRvH';rh.textContent='🕘 Recently viewed';rh.style.display='none';
const rr=document.createElement('div');rr.className='bq-rec';rr.id='bqRv';
if(rec){rec.after(rr);rec.after(rh);}
rr.onclick=e=>{const d=e.target.closest('[data-id]');if(!d)return;const l=currentListings.find(x=>String(x.id)===d.dataset.id);if(l)openDetail(l);};
const ids=()=>{try{return JSON.parse(store.get('bq_recent')||'[]');}catch(e){return [];}};
function renderRecent(){
 const items=ids().map(id=>currentListings.find(l=>String(l.id)===String(id))).filter(Boolean).slice(0,10);
 rh.style.display=items.length?'':'none';
 rr.innerHTML=items.map(l=>'<div data-id="'+l.id+'">'+(l.image_url?'<img src="'+String(l.image_url).replace(/"/g,'&quot;')+'" alt="" loading="lazy">':'')+'<span>'+String(l.title||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))+'</span></div>').join('');
}
const od=window.openDetail;
window.openDetail=async function(l){
 try{if(l&&l.id!=null){const a=ids().filter(x=>String(x)!==String(l.id));a.unshift(l.id);store.set('bq_recent',JSON.stringify(a.slice(0,12)));}}catch(e){}
 try{return await od.apply(this,arguments);}finally{try{renderRecent();}catch(e){}}
};
const prev=window.renderListings;
window.renderListings=function(){prev.apply(this,arguments);try{renderRecent();applyView();}catch(e){}};
window.renderListings();
})();

/* Back arrow (←) instead of ✕ on every popup screen */
(function(){
const css=document.createElement('style');
css.textContent='.modal>.close{float:none!important;position:static!important;display:inline-block!important;margin:0 12px 0 0!important;vertical-align:middle;font-size:30px!important;line-height:1;cursor:pointer;color:inherit}'+
'.modal>.close+h3,.modal>.close+h2{display:inline-block!important;vertical-align:middle;margin:0!important}'+
'#bqVClose{right:auto!important;left:16px!important}';
document.head.appendChild(css);
const GLYPHS=['✕','×','✖','✗','X','x'];
function fix(){
 document.querySelectorAll('.close,#subClose,#bqVClose').forEach(el=>{
  if(GLYPHS.includes(el.textContent.trim())){el.textContent='←';el.setAttribute('aria-label','Back');}
  if(el.id==='subClose'&&!el.dataset.moved){
   const p=el.parentElement;
   if(p){p.insertBefore(el,p.firstChild);p.style.justifyContent='flex-start';p.style.gap='10px';el.dataset.moved='1';el.style.fontSize='28px';}
  }
 });
}
fix();
new MutationObserver(fix).observe(document.body,{childList:true,subtree:true});
})();


/* Verified sellers only filter */
(function(){
const $=id=>document.getElementById(id);
const anchor=document.querySelector('.bq-filter2')||document.querySelector('.bq-filter');
if(!anchor||typeof supabaseClient==='undefined')return;
const css=document.createElement('style');
css.textContent='#bqVerRow{padding:0 12px 8px}#bqVerBtn{padding:7px 14px;border-radius:18px;border:1px solid #888;background:transparent;color:inherit;font-size:14px}#bqVerBtn.on{background:#1b8a3a;border-color:#1b8a3a;color:#fff}';
document.head.appendChild(css);
const row=document.createElement('div');row.id='bqVerRow';row.innerHTML='<button type="button" id="bqVerBtn">✅ Verified sellers only</button>';
anchor.insertAdjacentElement('afterend',row);
let on=false,ids=null;
async function load(){
 try{
  const{data,error}=await supabaseClient.from('profiles').select('id').eq('verification_status','verified');
  if(error)throw error;
  ids=new Set((data||[]).map(r=>String(r.id)));
 }catch(e){ids=null;}
}
const prev=window.renderListings;
window.renderListings=function(){
 const all=currentListings;
 if(on&&ids)currentListings=all.filter(l=>ids.has(String(l.seller_id)));
 try{prev.apply(this,arguments);}finally{currentListings=all;}
};
$('bqVerBtn').onclick=async()=>{
 on=!on;$('bqVerBtn').classList.toggle('on',on);
 if(on&&!ids)await load();
 if(on&&!ids){on=false;$('bqVerBtn').classList.remove('on');alert('Could not load verified sellers right now. Please try again.');}
 renderListings();
};
load();
})();
/* Banner ads: Advertise form, home banner, My ads, admin Banner ads */
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const naira=n=>'₦'+Number(n||0).toLocaleString();
const dt=d=>d?new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'-';
async function getCfg(){
 const{data}=await supabaseClient.from('app_settings').select('key,value');
 const o={};(data||[]).forEach(r=>{o[r.key]=r.value;});
 return{price:parseFloat(o.banner_price_per_day)||5000,instr:(o.payment_instructions||'').trim()};
}
function fixLink(raw){
 const v=String(raw||'').trim();if(!v)return null;
 const d=v.replace(/[\s+()-]/g,'');
 if(/^\d{10,15}$/.test(d)){return 'https://wa.me/'+(d.startsWith('0')?'234'+d.slice(1):d);}
 if(/^https?:\/\//i.test(v))return v;
 if(/^[^\s]+\.[^\s]+$/.test(v))return 'https://'+v;
 return undefined;
}
function cropBanner(file){return new Promise(res=>{
 const img=new Image(),u=URL.createObjectURL(file);
 img.onload=()=>{const W=1200,H=400,r=Math.max(W/img.width,H/img.height),w=img.width*r,h=img.height*r;
  const c=document.createElement('canvas');c.width=W;c.height=H;
  c.getContext('2d').drawImage(img,(W-w)/2,(H-h)/2,w,h);URL.revokeObjectURL(u);
  c.toBlob(b=>res(b||file),'image/jpeg',0.85);};
 img.onerror=()=>{URL.revokeObjectURL(u);res(file);};
 img.src=u;});}

/* ---------- Home banner ---------- */
const box=document.createElement('div');box.id='bqAds';box.style.cssText='margin:0 12px 12px';
document.querySelector('.bq-chips').insertAdjacentElement('afterend',box);
let ads=[],shown=[],cur=0,timer=null,key='';
async function loadAds(){
 try{
  const{data}=await supabaseClient.from('ad_campaigns').select('id,title,image_url,video_url,link_url,states').eq('status','active').gt('expires_at',new Date().toISOString());
  ads=(data||[]).sort(()=>Math.random()-0.5);
 }catch(e){ads=[];}
 drawAds();
}
function show(i){
 cur=(i+shown.length)%shown.length;
 box.querySelectorAll('[data-ad]').forEach((im,j)=>{im.style.opacity=j===cur?1:0;im.style.pointerEvents=j===cur?'auto':'none';});
 const d=$('bqAdDots');
 if(d)d.innerHTML=shown.map((a,j)=>'<span style="display:inline-block;width:6px;height:6px;border-radius:50%;margin:0 2px;background:'+(j===cur?'#fff':'rgba(255,255,255,.4)')+'"></span>').join('');
 const a=shown[cur];
 try{const k='bqad'+a.id;if(!sessionStorage.getItem(k)){sessionStorage.setItem(k,'1');supabaseClient.rpc('banner_view',{p_id:a.id}).then(()=>{},()=>{});}}catch(e){}
}
function drawAds(){
 const st=(typeof activeState!=='undefined')?activeState:'all';
 shown=ads.filter(a=>st==='all'||!a.states||!a.states.length||a.states.includes(st));
 const k=shown.map(a=>a.id).join(',');
 if(k===key&&box.firstChild)return;
 key=k;cur=0;clearInterval(timer);
 if(!shown.length){
  box.innerHTML='<div id="bqAdsEmpty" style="border:1px dashed #888;border-radius:12px;padding:14px;text-align:center;font-size:14px;cursor:pointer">📢 Advertise your business here<div style="font-size:12px;opacity:.7;margin-top:2px">Reach buyers across Nigeria. Tap to learn more.</div></div>';
  return;
 }
 box.innerHTML='<div style="position:relative;border-radius:12px;overflow:hidden;aspect-ratio:3/1;background:#222">'+
  shown.map((a,i)=>{const st='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:'+(i?0:1)+';transition:opacity .5s;'+(a.link_url?'cursor:pointer':'');return a.video_url?'<video data-ad="'+a.id+'" src="'+esc(a.video_url)+'" poster="'+esc(a.image_url)+'" muted autoplay loop playsinline preload="metadata" style="'+st+'"></video>':'<img data-ad="'+a.id+'" src="'+esc(a.image_url)+'" alt="'+esc(a.title)+'" style="'+st+'">';}).join('')+
  '<span style="position:absolute;top:6px;left:6px;background:rgba(0,0,0,.6);color:#fff;font-size:10px;padding:2px 7px;border-radius:999px">Sponsored</span>'+
  (shown.length>1?'<div id="bqAdDots" style="position:absolute;bottom:6px;left:0;right:0;text-align:center"></div>':'')+
  '</div><div style="text-align:right;font-size:12px;margin-top:4px"><a id="bqAdsHere" style="color:#ff6b00;cursor:pointer">📢 Advertise here</a></div>';
 show(0);
 try{box.querySelectorAll('video').forEach(v=>{v.muted=true;v.play().catch(()=>{});});}catch(e){}
 if(shown.length>1)timer=setInterval(()=>show(cur+1),5000);
}
box.onclick=e=>{
 if(e.target.closest('#bqAdsHere,#bqAdsEmpty')){openForm();return;}
 const im=e.target.closest('[data-ad]');if(!im)return;
 const a=shown.find(x=>x.id===im.dataset.ad);
 if(!a||!a.link_url)return;
 supabaseClient.rpc('banner_click',{p_id:a.id}).then(()=>{},()=>{});
 window.open(a.link_url,'_blank','noopener');
};
const prevR=window.renderListings;
window.renderListings=function(){prevR.apply(this,arguments);try{drawAds();}catch(e){}};
loadAds();

/* ---------- Advertise form ---------- */
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="adFormOverlay" style="z-index:10001"><div class="modal" style="color:#222"><span class="close" id="adFormClose">✕</span><h3>Advertise on BuyQora</h3><p style="font-size:13.5px;line-height:1.5;margin-bottom:10px">Show your banner on the home screen to buyers in the states you choose. Your ad goes live after we confirm your payment.</p><p class="error" id="adFormError"></p>'+
'<label>Ad title</label><input id="adTitle" maxlength="60" placeholder="e.g. Ada Fashion Store - New arrivals">'+
'<label>Banner image (wide, best size 1200 x 400)</label><input type="file" id="adImage" accept="image/*"><img id="adPrev" alt="" style="display:none;width:100%;aspect-ratio:3/1;object-fit:cover;border-radius:10px;margin-bottom:12px">'+
'<label>Video (optional, up to 20 MB, plays muted on the banner)</label><input type="file" id="adVideo" accept="video/*" style="margin-bottom:12px">'+
'<label>Link when tapped (optional)</label><input id="adLink" placeholder="WhatsApp number or website link">'+
'<label>Show in</label><div id="adStates" style="max-height:150px;overflow:auto;border:1px solid #ddd;border-radius:8px;padding:8px;margin-bottom:12px"></div>'+
'<label>Duration</label><select id="adDays"><option value="1">1 day</option><option value="7" selected>7 days</option><option value="14">14 days</option><option value="30">30 days</option></select>'+
'<div id="adTotal" style="font-size:16px;font-weight:bold;color:#ff6b00;margin:4px 0 12px"></div><div id="adPayInfo" style="font-size:14px;line-height:1.6;margin-bottom:10px"></div>'+
'<label>Payment reference</label><input id="adRef" placeholder="Sender name or transaction ID"><button class="button" id="adSubmit">I have paid, submit ad</button></div></div>');
$('adFormClose').onclick=()=>$('adFormOverlay').classList.remove('show');
let cfg={price:5000,instr:''},blob=null;
function renderStates(){
 $('adStates').innerHTML='<label style="display:flex;gap:8px;align-items:center;margin-bottom:6px;font-weight:bold"><input type="checkbox" id="adAll" checked style="width:auto;margin:0"> All states</label>'+
 BUYQORA_STATES.map(s=>'<label style="display:flex;gap:8px;align-items:center;margin-bottom:6px"><input type="checkbox" class="adSt" value="'+esc(s)+'" style="width:auto;margin:0"> '+esc(s)+'</label>').join('');
}
$('adStates').onchange=e=>{
 const all=$('adAll'),sts=[...document.querySelectorAll('.adSt')];
 if(e.target===all&&all.checked)sts.forEach(x=>x.checked=false);
 else if(e.target!==all&&e.target.checked)all.checked=false;
 if(!sts.some(x=>x.checked))all.checked=true;
};
function total(){return cfg.price*parseInt($('adDays').value,10);}
function showTotal(){$('adTotal').textContent='Total: '+naira(total())+' ('+naira(cfg.price)+' per day)';}
$('adDays').onchange=showTotal;
$('adImage').onchange=async()=>{
 const f=$('adImage').files[0];blob=null;$('adPrev').style.display='none';
 if(!f)return;
 blob=await cropBanner(f);
 $('adPrev').src=URL.createObjectURL(blob);$('adPrev').style.display='block';
};
async function openForm(){
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){openAuth('login');return;}
 cfg=await getCfg();
 $('adFormError').style.display='none';
 ['adTitle','adLink','adRef'].forEach(id=>$(id).value='');
 $('adImage').value='';$('adVideo').value='';blob=null;$('adPrev').style.display='none';$('adDays').value='7';
 renderStates();showTotal();
 $('adPayInfo').innerHTML=cfg.instr?'<p><b>Pay by bank transfer to:</b></p><p style="white-space:pre-wrap;background:#f7f7f7;border-radius:8px;padding:10px">'+esc(cfg.instr)+'</p>':'<p style="color:#c0392b">Payment details are not set up yet. Please contact support.</p>';
 $('adFormOverlay').classList.add('show');
}
window.openAdForm=openForm;
$('adSubmit').onclick=async()=>{
 const err=$('adFormError');err.style.display='none';
 const bad=m=>{err.textContent=m;err.style.display='block';};
 const title=$('adTitle').value.trim(),ref=$('adRef').value.trim(),link=fixLink($('adLink').value);
 if(title.length<3)return bad('Enter an ad title.');
 if(!blob)return bad('Choose a banner image.');
 if($('adVideo').files[0]&&$('adVideo').files[0].size>20*1024*1024)return bad('The video is too big. Maximum 20 MB.');
 if(link===undefined)return bad('The link is not valid. Use a WhatsApp number or a website address.');
 if(!cfg.instr)return bad('Payment details are not set up yet. Please contact support.');
 if(ref.length<3)return bad('Enter your payment reference (sender name or transaction ID).');
 const b=$('adSubmit');b.disabled=true;b.textContent='Submitting...';
 const reset=()=>{b.disabled=false;b.textContent='I have paid, submit ad';};
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){reset();return;}
 const path=session.user.id+'/'+Date.now()+'.jpg';
 const{error:ue}=await supabaseClient.storage.from('ad-banners').upload(path,blob,{contentType:'image/jpeg'});
 if(ue){reset();return bad('Image upload failed: '+ue.message);}
 const image_url=supabaseClient.storage.from('ad-banners').getPublicUrl(path).data.publicUrl;
 let video_url=null;
 const vf=$('adVideo').files[0];
 if(vf){
  const ext=(vf.name.split('.').pop()||'mp4').toLowerCase().replace(/[^a-z0-9]/g,'')||'mp4';
  const vpath=session.user.id+'/'+Date.now()+'.'+ext;
  const{error:ve}=await supabaseClient.storage.from('ad-videos').upload(vpath,vf,{contentType:vf.type||'video/mp4'});
  if(ve){reset();return bad('Video upload failed: '+ve.message);}
  video_url=supabaseClient.storage.from('ad-videos').getPublicUrl(vpath).data.publicUrl;
 }
 const states=$('adAll').checked?[]:[...document.querySelectorAll('.adSt:checked')].map(x=>x.value);
 const{data:ad,error:ae}=await supabaseClient.from('ad_campaigns').insert({title,image_url,video_url,media_type:video_url?'video':'image',link_url:link,states,days:parseInt($('adDays').value,10)}).select('id,amount').single();
 if(ae){reset();return bad('Could not create ad: '+ae.message);}
 const{error:pe}=await supabaseClient.from('payments').insert({user_id:session.user.id,purpose:'banner',related_id:ad.id,amount:ad.amount,reference:ref,status:'submitted'});
 reset();
 if(pe)return bad('Ad saved but the payment record failed: '+pe.message+'. Please contact support.');
 $('adFormOverlay').classList.remove('show');
 alert('Ad submitted. It goes live once we confirm your payment.');
};

/* ---------- My ads ---------- */
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="myAdsOverlay" style="z-index:10000"><div class="modal" style="color:#222"><span class="close" id="myAdsClose">✕</span><h3>My ads</h3><div id="myAdsList"></div></div></div>');
$('myAdsClose').onclick=()=>$('myAdsOverlay').classList.remove('show');
async function openMyAds(){
 const l=$('myAdsList');l.innerHTML='<p style="color:#999">Loading...</p>';
 $('myAdsOverlay').classList.add('show');
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){l.innerHTML='<p>Please log in.</p>';return;}
 const{data,error}=await supabaseClient.from('ad_campaigns').select('*').eq('advertiser_id',session.user.id).order('created_at',{ascending:false});
 if(error){l.innerHTML='<p style="color:#c0392b">'+esc(error.message)+'</p>';return;}
 if(!data.length){l.innerHTML='<p style="color:#999">You have no ads yet.</p>';return;}
 const{data:py}=await supabaseClient.from('payments').select('related_id,status').eq('purpose','banner').in('related_id',data.map(r=>r.id));
 const paid={};(py||[]).forEach(p=>{paid[p.related_id]=p.status;});
 l.innerHTML=data.map(r=>{
  let t;
  if(r.status==='active'&&new Date(r.expires_at)>new Date())t='🟢 Live until '+dt(r.expires_at);
  else if(r.status==='pending_payment')t=paid[r.id]?'⏳ Payment submitted, awaiting confirmation':'Awaiting payment';
  else if(r.status==='active'||r.status==='expired')t='Ended '+dt(r.expires_at);
  else if(r.status==='rejected')t='Not approved. Contact support if you paid.';
  else t='Paused by BuyQora';
  return '<div style="padding:12px 0;border-bottom:1px solid #eee"><img src="'+esc(r.image_url)+'" alt="" style="width:100%;aspect-ratio:3/1;object-fit:cover;border-radius:8px"><div style="font-weight:bold;margin-top:6px">'+esc(r.title)+'</div><div style="font-size:13px;color:#666">'+r.days+' day(s) · '+naira(r.amount)+'</div><div style="font-size:13px;margin-top:2px">'+t+'</div><div style="font-size:12.5px;color:#666;margin-top:2px">👁 '+r.views+' views · 👆 '+r.clicks+' taps</div></div>';
 }).join('');
}
const lo=$('bqLogout');
if(lo){
 lo.insertAdjacentHTML('beforebegin','<button class="button" id="bqAdBtn" style="margin-top:10px;background:#8e24aa">📢 Advertise on BuyQora</button><button class="button" id="bqMyAds" style="margin-top:10px;background:#555">My ads</button>');
 $('bqAdBtn').onclick=()=>{closeProfile();openForm();};
 $('bqMyAds').onclick=()=>{closeProfile();openMyAds();};
}

/* ---------- Admin: Banner ads ---------- */
const sty=document.createElement('style');
sty.textContent='.modal-overlay#adsAdmOverlay>.modal{position:fixed !important;inset:0 !important;width:100% !important;height:100% !important;max-width:none !important;max-height:none !important;margin:0 !important;border-radius:0 !important;box-sizing:border-box !important;overflow-y:auto !important;padding:calc(env(safe-area-inset-top,0px) + 12px) 16px calc(env(safe-area-inset-bottom,0px) + 12px) !important}';
document.head.appendChild(sty);
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="adsAdmOverlay" style="z-index:10000"><div class="modal" style="color:#222"><span class="close" id="adsAdmClose">✕</span><h3>Banner ads</h3><details style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:bold;color:#0277bd;padding:6px 0">⚙️ Banner price</summary><label style="margin-top:8px">Price per day (₦)</label><input type="number" id="adsAdmPrice" inputmode="numeric"><button class="button" id="adsAdmSave">Save price</button></details><div class="filter-row" id="adsAdmTabs" style="justify-content:flex-start"><div class="filter-chip active" data-t="pending">Pending</div><div class="filter-chip" data-t="active">Active</div><div class="filter-chip" data-t="expired">Expired</div><div class="filter-chip" data-t="other">Rejected</div></div><div id="adsAdmList"></div></div></div>');
$('adsAdmClose').onclick=()=>$('adsAdmOverlay').classList.remove('show');
let tab='pending',rows=[],pays={},names={};
function grp(r){
 if(r.status==='pending_payment')return 'pending';
 if(r.status==='active')return new Date(r.expires_at)>new Date()?'active':'expired';
 if(r.status==='expired')return 'expired';
 return 'other';
}
function bt(a,id,t,c){return '<button data-a="'+a+'" data-id="'+id+'" style="background:'+c+';color:#fff;border:0;border-radius:6px;padding:7px 12px;font-size:12px;font-weight:bold;margin:6px 6px 0 0">'+t+'</button>';}
function admRender(){
 const l=$('adsAdmList'),f=rows.filter(r=>grp(r)===tab);
 if(!f.length){l.innerHTML='<p style="color:#999">None in this list.</p>';return;}
 l.innerHTML=f.map(r=>{
  const p=pays[r.id],g=grp(r);
  const pl=p?'💳 '+naira(p.amount)+' · Ref: <b>'+esc(p.reference)+'</b> · '+esc(p.status):'💳 No payment submitted';
  let b='';
  if(g==='pending'){
   if(p&&p.status==='submitted')b+=bt('paid',r.id,'Payment received &amp; activate','#2e7d32');
   else if(p&&p.status==='confirmed')b+=bt('activate',r.id,'Activate','#2e7d32');
   b+=bt('reject',r.id,'Reject','#c0392b');
  }else if(g==='active'){
   b+=bt('extend',r.id,'Extend +7 days','#0277bd')+bt('suspend',r.id,'Suspend','#777');
  }else if(r.status==='suspended'){
   b+=bt('reinstate',r.id,'Reinstate','#2e7d32');
  }
  return '<div style="padding:14px 0;border-bottom:1px solid #eee"><img src="'+esc(r.image_url)+'" alt="" style="width:100%;aspect-ratio:3/1;object-fit:cover;border-radius:8px"><div style="font-weight:bold;font-size:15px;margin-top:6px">'+esc(r.title)+'</div><div style="color:#666;font-size:13px">Advertiser: '+esc(names[r.advertiser_id]||'')+'</div><div style="font-size:13px">'+r.days+' day(s) · '+naira(r.amount)+' · '+((r.states&&r.states.length)?esc(r.states.join(', ')):'All states')+'</div><div style="font-size:12.5px;color:#666;word-break:break-all">Link: '+esc(r.link_url||'none')+'</div><div style="font-size:12.5px;color:#666">'+(r.starts_at?'Starts '+dt(r.starts_at)+' · Expires '+dt(r.expires_at)+' · ':'Requested '+dt(r.created_at)+' · ')+'👁 '+r.views+' · 👆 '+r.clicks+'</div><div style="background:#f7f7f7;border-radius:8px;padding:6px 10px;font-size:12.5px;margin-top:6px">'+pl+'</div>'+b+'</div>';
 }).join('');
}
async function admLoad(){
 $('adsAdmList').innerHTML='<p style="color:#999">Loading...</p>';
 const{data,error}=await supabaseClient.from('ad_campaigns').select('*').order('created_at',{ascending:false}).limit(200);
 if(error){$('adsAdmList').innerHTML='<p style="color:#c0392b">'+esc(error.message)+'</p>';return;}
 rows=data||[];pays={};
 if(rows.length){
  const{data:py}=await supabaseClient.from('payments').select('id,related_id,amount,reference,status').eq('purpose','banner').in('related_id',rows.map(r=>r.id));
  (py||[]).forEach(p=>{pays[p.related_id]=p;});
 }
 for(const uid of [...new Set(rows.map(r=>r.advertiser_id))]){names[uid]=await getProfileName(uid);}
 admRender();
}
$('adsAdmTabs').onclick=e=>{
 const c=e.target.closest('.filter-chip');if(!c)return;
 tab=c.dataset.t;
 document.querySelectorAll('#adsAdmTabs .filter-chip').forEach(x=>x.classList.toggle('active',x===c));
 admRender();
};
async function note(r,t,m){try{await supabaseClient.from('notifications').insert({user_id:r.advertiser_id,title:t,message:m});}catch(x){}}
$('adsAdmList').onclick=async e=>{
 const b=e.target.closest('button[data-a]');if(!b)return;
 const r=rows.find(x=>x.id===b.dataset.id);if(!r)return;
 const a=b.dataset.a;
 b.disabled=true;
 let err=null;
 if(a==='paid'){
  if(!confirm('Have you checked your bank and received '+naira(r.amount)+'? This will start the ad "'+r.title+'".')){b.disabled=false;return;}
  const{data:{session}}=await supabaseClient.auth.getSession();
  ({error:err}=await supabaseClient.from('payments').update({status:'confirmed',confirmed_by:session.user.id,confirmed_at:new Date().toISOString()}).eq('id',pays[r.id].id));
  if(!err)({error:err}=await supabaseClient.rpc('activate_banner',{p_id:r.id}));
  if(!err)await note(r,'Your ad is live','Payment confirmed. Your banner "'+r.title+'" is now showing on BuyQora.');
 }else if(a==='activate'){
  ({error:err}=await supabaseClient.rpc('activate_banner',{p_id:r.id}));
  if(!err)await note(r,'Your ad is live','Your banner "'+r.title+'" is now showing on BuyQora.');
 }else if(a==='reject'){
  if(!confirm('Reject this ad? If the advertiser already paid, you must refund them yourself.')){b.disabled=false;return;}
  ({error:err}=await supabaseClient.from('ad_campaigns').update({status:'rejected'}).eq('id',r.id));
  if(!err)await note(r,'Ad not approved','We could not approve your banner "'+r.title+'". Contact support if you paid.');
 }else if(a==='suspend'){
  if(!confirm('Suspend this ad?')){b.disabled=false;return;}
  ({error:err}=await supabaseClient.from('ad_campaigns').update({status:'suspended'}).eq('id',r.id));
 }else if(a==='reinstate'){
  ({error:err}=await supabaseClient.from('ad_campaigns').update({status:'active'}).eq('id',r.id));
 }else if(a==='extend'){
  const nx=new Date(new Date(r.expires_at).getTime()+7*86400000).toISOString();
  ({error:err}=await supabaseClient.from('ad_campaigns').update({expires_at:nx}).eq('id',r.id));
 }
 if(err){alert('Could not update: '+err.message);b.disabled=false;return;}
 admLoad();loadAds();
};
$('adsAdmSave').onclick=async()=>{
 const v=parseFloat($('adsAdmPrice').value);
 if(isNaN(v)||v<=0){alert('Enter a valid price.');return;}
 const b=$('adsAdmSave');b.disabled=true;
 const now=new Date().toISOString();
 let{data,error}=await supabaseClient.from('app_settings').update({value:String(v),updated_at:now}).eq('key','banner_price_per_day').select();
 if(!error&&(!data||!data.length))({error}=await supabaseClient.from('app_settings').insert({key:'banner_price_per_day',value:String(v)}));
 b.disabled=false;
 if(error){alert('Could not save: '+error.message);return;}
 alert('Price saved. New ads will use it.');
};
const anc=$('bqLpAdmin')||$('bqPromoAdmin')||document.querySelector('#adminOverlay .modal h3');
if(anc){
 anc.insertAdjacentHTML('afterend','<button class="button" id="bqAdsAdmin" style="margin-bottom:12px;background:#d81b60">📢 Banner ads</button>');
 $('bqAdsAdmin').onclick=async()=>{
  $('adsAdmOverlay').classList.add('show');
  const c=await getCfg();$('adsAdmPrice').value=c.price;
  admLoad();
 };
}
})();
/* Reviews & ratings */
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const dt=d=>d?new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'';
const stars=n=>{const r=Math.round(n||0);return '★'.repeat(r)+'☆'.repeat(5-r);};
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="revOverlay" style="z-index:10002"><div class="modal" style="color:#222"><span class="close" id="revClose">✕</span><h3 id="revTitle">Reviews</h3><div id="revSum" style="font-size:15px;margin:8px 0 12px"></div><div id="revForm"></div><div id="revList"></div></div></div>');
$('revClose').onclick=()=>$('revOverlay').classList.remove('show');
let sid=null,sname='',pick=0,mine=null;

async function getSummary(id){
 try{const{data}=await supabaseClient.from('seller_ratings').select('avg_rating,review_count').eq('seller_id',id).maybeSingle();return data;}catch(e){return null;}
}
function sumText(s){return s&&s.review_count>0?'<span style="color:#f5a623">'+stars(s.avg_rating)+'</span> <b>'+Number(s.avg_rating).toFixed(1)+'</b> ('+s.review_count+' review'+(s.review_count>1?'s':'')+')':'No reviews yet';}

function drawPick(){
 document.querySelectorAll('#revStars button').forEach(b=>{b.style.color=(+b.dataset.s<=pick)?'#f5a623':'#bbb';});
}
async function openReviews(id,name){
 sid=id;sname=name||'this seller';pick=0;mine=null;
 $('revTitle').textContent='Reviews: '+sname;
 $('revSum').textContent='Loading...';$('revForm').innerHTML='';$('revList').innerHTML='';
 $('revOverlay').classList.add('show');
 const{data:{session}}=await supabaseClient.auth.getSession();
 const[{data:rows,error},sum]=await Promise.all([
  supabaseClient.from('reviews').select('id,reviewer_id,rating,comment,created_at').eq('seller_id',id).order('created_at',{ascending:false}).limit(100),
  getSummary(id)
 ]);
 if(error){$('revSum').textContent='';$('revList').innerHTML='<p style="color:#c0392b">'+esc(error.message)+'</p>';return;}
 $('revSum').innerHTML=sumText(sum);
 const list=rows||[];
 const names={};
 for(const u of [...new Set(list.map(r=>r.reviewer_id))]){names[u]=await getProfileName(u);}
 const me=session?session.user.id:null;
 mine=me?list.find(r=>r.reviewer_id===me):null;
 if(mine)pick=mine.rating;
 if(!me){
  $('revForm').innerHTML='<button class="button" id="revLogin">Log in to leave a review</button>';
  $('revLogin').onclick=()=>{$('revOverlay').classList.remove('show');openAuth('login');};
 }else if(me===id){
  $('revForm').innerHTML='<p style="color:#777;font-size:13px">You cannot review yourself.</p>';
 }else{
  $('revForm').innerHTML='<div style="background:#f7f7f7;border-radius:10px;padding:12px;margin-bottom:12px"><div style="font-weight:bold;margin-bottom:6px">'+(mine?'Update your review':'Rate this seller')+'</div><div id="revStars" style="font-size:34px;line-height:1;margin-bottom:8px">'+[1,2,3,4,5].map(n=>'<button type="button" data-s="'+n+'" style="background:none;border:0;font-size:34px;padding:0 4px;cursor:pointer">★</button>').join('')+'</div><textarea id="revComment" maxlength="500" placeholder="Share your experience (optional)" style="width:100%;min-height:70px;margin-bottom:8px"></textarea><p class="error" id="revErr"></p><button class="button" id="revSend">'+(mine?'Update review':'Submit review')+'</button></div>';
  $('revComment').value=mine&&mine.comment?mine.comment:'';
  drawPick();
  $('revStars').onclick=e=>{const b=e.target.closest('button[data-s]');if(!b)return;pick=+b.dataset.s;drawPick();};
  $('revSend').onclick=async()=>{
   const err=$('revErr');err.style.display='none';
   if(pick<1){err.textContent='Tap a star to choose your rating.';err.style.display='block';return;}
   const b=$('revSend');b.disabled=true;
   const{error:ue}=await supabaseClient.from('reviews').upsert({seller_id:id,reviewer_id:me,rating:pick,comment:$('revComment').value.trim()||null},{onConflict:'seller_id,reviewer_id'});
   b.disabled=false;
   if(ue){err.textContent='Could not save: '+ue.message;err.style.display='block';return;}
   openReviews(id,sname);refreshLine();
  };
 }
 if(!list.length){$('revList').innerHTML='<p style="color:#999">No reviews yet. Be the first.</p>';return;}
 $('revList').innerHTML=list.map(r=>{
  const own=r.reviewer_id===me;
  const del=(own||isAdmin)?'<a data-del="'+r.id+'" style="color:#c0392b;cursor:pointer;font-size:12.5px;float:right">'+(own?'Delete':'Remove')+'</a>':'';
  return '<div style="padding:12px 0;border-bottom:1px solid #eee">'+del+'<div style="font-weight:bold">'+esc(names[r.reviewer_id]||'User')+(own?' (you)':'')+'</div><div style="color:#f5a623;font-size:15px">'+stars(r.rating)+' <span style="color:#999;font-size:12px">'+dt(r.created_at)+'</span></div>'+(r.comment?'<div style="font-size:14px;margin-top:4px;white-space:pre-wrap">'+esc(r.comment)+'</div>':'')+'</div>';
 }).join('');
}
$('revList').onclick=async e=>{
 const a=e.target.closest('[data-del]');if(!a)return;
 if(!confirm('Delete this review?'))return;
 const{error}=await supabaseClient.from('reviews').delete().eq('id',a.dataset.del);
 if(error){alert('Could not delete: '+error.message);return;}
 openReviews(sid,sname);refreshLine();
};

/* rating line on the listing screen */
async function refreshLine(){
 const t=$('bqRateTxt');if(!t||!window.currentDetailListing)return;
 const s=await getSummary(currentDetailListing.seller_id);
 t.innerHTML=sumText(s);
}
function addLine(l){
 const sel=$('dSeller');
 if(!sel||$('bqRate'))return;
 sel.parentElement.insertAdjacentHTML('afterend','<div id="bqRate" style="margin:6px 0 10px;font-size:14px"><span id="bqRateTxt" style="color:#999">Loading rating...</span> <a id="bqRateLink" style="color:#ff6b00;cursor:pointer;font-weight:bold;margin-left:6px">Reviews</a></div>');
 $('bqRateLink').onclick=()=>openReviews(l.seller_id,($('dSeller')&&$('dSeller').textContent!=='...')?$('dSeller').textContent:'this seller');
 refreshLine();
}
const od=window.openDetail;
window.openDetail=async function(l){
 const r=await od.apply(this,arguments);
 try{addLine(l);}catch(e){}
 return r;
};
})();
/* Fix: rating line on listing screen */
(function(){
const $=id=>document.getElementById(id);
const stars=n=>{const r=Math.round(n||0);return '★'.repeat(r)+'☆'.repeat(5-r);};
async function fill(){
 const t=$('bqRateTxt');
 if(!t||t.dataset.f||typeof currentDetailListing==='undefined'||!currentDetailListing)return;
 t.dataset.f='1';
 let d=null;
 try{({data:d}=await supabaseClient.from('seller_ratings').select('avg_rating,review_count').eq('seller_id',currentDetailListing.seller_id).maybeSingle());}catch(e){}
 t.innerHTML=d&&d.review_count>0?'<span style="color:#f5a623">'+stars(d.avg_rating)+'</span> <b>'+Number(d.avg_rating).toFixed(1)+'</b> ('+d.review_count+' review'+(d.review_count>1?'s':'')+')':'No reviews yet';
}
new MutationObserver(fill).observe($('detailContent'),{childList:true,subtree:true});
new MutationObserver(()=>{
 if(!$('revOverlay').classList.contains('show')){const t=$('bqRateTxt');if(t){delete t.dataset.f;fill();}}
}).observe($('revOverlay'),{attributes:true,attributeFilter:['class']});
})();

/* Phone alerts (web push) */
(function(){
const $=id=>document.getElementById(id);
const VAPID='BBi-GQBfLogfGYbiqT7vNTSCfm7T8zTOOp6LYqAlbhRJaSSu8x0-AVa_vDWsODJF_TY3wGHNusgKI5c1iagj9gw';
function toKey(s){const p='='.repeat((4-s.length%4)%4);const raw=atob((s+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));}
const lo=$('bqLogout');
if(!lo)return;
lo.insertAdjacentHTML('beforebegin','<button class="button" id="bqPush" style="margin-top:10px;background:#00897b">🔔 Turn on phone alerts</button>');
async function getReg(){
 let r=await navigator.serviceWorker.getRegistration();
 if(!r)r=await navigator.serviceWorker.register('service-worker.js');
 await navigator.serviceWorker.ready;
 return r;
}
$('bqPush').onclick=async()=>{
 const b=$('bqPush');
 try{
  if(!('serviceWorker' in navigator)||!('PushManager' in window)||!('Notification' in window)){alert('Phone alerts are not supported on this browser. Try Chrome on Android.');return;}
  const{data:{session}}=await supabaseClient.auth.getSession();
  if(!session){alert('Please log in first.');return;}
  const perm=await Notification.requestPermission();
  if(perm!=='granted'){alert('Alerts were not allowed. You can allow them in your phone browser settings.');return;}
  b.disabled=true;b.textContent='Turning on...';
  const r=await getReg();
  let sub=await r.pushManager.getSubscription();
  if(!sub)sub=await r.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:toKey(VAPID)});
  const j=sub.toJSON();
  const{error}=await supabaseClient.from('push_subscriptions').upsert({user_id:session.user.id,endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth},{onConflict:'endpoint'});
  if(error){b.textContent='🔔 Turn on phone alerts';alert('Could not save: '+error.message);return;}
  b.textContent='🔔 Phone alerts are on';
  alert('Phone alerts are on.');
 }catch(e){b.textContent='🔔 Turn on phone alerts';alert('Could not turn on alerts: '+e.message);}
 finally{b.disabled=false;}
};
})();

/* Bigger back arrow + phone back button closes the open screen */
(function(){
const css=document.createElement('style');
css.textContent='.modal>.close,#subClose{display:inline-flex!important;align-items:center;justify-content:center;min-width:52px;height:52px;font-size:40px!important;line-height:1;font-weight:700;margin:0 6px 0 -8px!important;cursor:pointer;-webkit-tap-highlight-color:transparent;border-radius:50%}'+
'.modal>.close:active,#subClose:active{background:rgba(128,128,128,.25)}'+
'#bqVClose{min-width:52px;height:52px;font-size:38px!important;display:inline-flex!important;align-items:center;justify-content:center}';
document.head.appendChild(css);

const stack=[];let ignore=0;
function openIds(){
 const ids=[...document.querySelectorAll('.modal-overlay.show')].map(e=>e.id).filter(Boolean);
 const v=document.getElementById('bqViewer');
 if(v&&getComputedStyle(v).display!=='none')ids.push('bqViewer');
 return ids;
}
function closeEl(id){
 if(id==='bqViewer'){
  const b=document.getElementById('bqVClose');
  if(b)b.click();else document.getElementById('bqViewer').style.display='none';
  return;
 }
 const el=document.getElementById(id);
 if(!el)return;
 const c=el.querySelector('.close,[id$="Close"]');
 if(c)c.click();else el.classList.remove('show');
}
function sync(){
 const now=openIds();
 now.forEach(id=>{
  if(!stack.includes(id)){stack.push(id);try{history.pushState({bqOv:id},'');}catch(e){}}
 });
 const gone=stack.filter(id=>!now.includes(id));
 if(gone.length){
  gone.forEach(id=>stack.splice(stack.indexOf(id),1));
  let n=gone.length;
  if(gone.includes('subOverlay')&&window.bqGetView&&window.__bqLast){
   const v=window.bqGetView();
   if(JSON.stringify(v)!==window.__bqLast.key){
    try{history.replaceState({bqOv:'subOverlay',cat:v.cat,prev:window.__bqLast.view},'');}catch(e){}
    n--;
   }
  }
  if(n>0){
   ignore++;
   try{history.go(-n);}catch(e){ignore=Math.max(0,ignore-1);}
   setTimeout(()=>{ignore=0;},500);
  }
 }
}
try{if(history.state&&history.state.bqOv)history.replaceState(null,'');}catch(e){}
window.addEventListener('popstate',(ev)=>{
 if(ignore>0){ignore--;window.__bqConsumed=true;return;}
 const top=stack.pop();
 if(top){window.__bqConsumed=true;closeEl(top);return;}
 if(ev&&ev.state&&ev.state.bqOv){
  window.__bqConsumed=true;
  const s0=ev.state;
  if(s0.bqOv==='subOverlay'&&s0.cat&&window.bqOpenPicker){
   try{if(s0.prev&&window.bqRestoreView)window.bqRestoreView(s0.prev);}catch(e){}
   stack.push('subOverlay');
   try{window.bqOpenPicker(s0.cat);}catch(e){}
  }else{try{history.back();}catch(e){}}
 }
});
setInterval(sync,200);
})();

/* Chat header layout, live chat refresh, and stay on the same screen after refresh */
(function(){
const css=document.createElement('style');
css.textContent='#chatOverlay .modal{display:grid!important;grid-template-columns:auto 1fr auto auto;grid-template-rows:auto minmax(0,1fr) auto;align-items:center;column-gap:8px}'+
'#chatOverlay .modal>.close{grid-column:1;grid-row:1;margin:0 0 0 -8px!important}'+
'#chatOverlay #chatTitle{grid-column:2;grid-row:1;margin:0!important;font-size:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'#chatOverlay #chatBlockBtn{grid-column:3;grid-row:1;float:none!important;margin:0!important}'+
'#chatOverlay button[onclick="reportCurrentChatUser()"]{grid-column:4;grid-row:1;float:none!important;margin:0!important}'+
'#chatOverlay .modal>div[style*="clear"]{display:none!important}'+
'#chatOverlay #chatMessages{grid-column:1/-1;grid-row:2;min-height:0}'+
'#chatOverlay .modal>div:last-child{grid-column:1/-1;grid-row:3}';
document.head.appendChild(css);

/* live refresh of messages while a chat is open */
setInterval(async()=>{
 try{
  if(document.hidden)return;
  const ov=document.getElementById('chatOverlay');
  if(!ov||!ov.classList.contains('show'))return;
  if(typeof currentChat==='undefined'||!currentChat||typeof loadChatMessages!=='function')return;
  const box=document.getElementById('chatMessages');
  const atBottom=box.scrollHeight-box.scrollTop-box.clientHeight<40;
  const st=box.scrollTop;
  await loadChatMessages();
  if(!atBottom)box.scrollTop=st;
 }catch(e){}
},5000);

/* remember the open screen so a page refresh brings the person back to it */
const KEY='bqScreen';
const OPEN={profileOverlay:'openProfile',favoritesOverlay:'openFavorites',notifOverlay:'openNotifications',inboxOverlay:'openInbox'};
function save(){
 try{
  const shown=[...document.querySelectorAll('.modal-overlay.show')].map(e=>e.id);
  if(!shown.length){sessionStorage.removeItem(KEY);return;}
  if(shown.includes('chatOverlay')&&typeof currentChat!=='undefined'&&currentChat){
   sessionStorage.setItem(KEY,JSON.stringify({t:'chat',c:currentChat}));return;
  }
  const id=shown.find(i=>OPEN[i]);
  if(id&&shown.length===1)sessionStorage.setItem(KEY,JSON.stringify({t:id}));
  else sessionStorage.removeItem(KEY);
 }catch(e){}
}
let restored=false;
setInterval(()=>{if(restored)save();},500);
setTimeout(async()=>{
 try{
  const raw=sessionStorage.getItem(KEY);
  if(raw){
   const s=JSON.parse(raw);
   if(s.t==='chat'&&s.c&&typeof openChat==='function')await openChat(s.c.listingId,s.c.listingTitle,s.c.otherUserId);
   else if(OPEN[s.t]&&typeof window[OPEN[s.t]]==='function')await window[OPEN[s.t]]();
  }
 }catch(e){}
 restored=true;
},1500);
})();


/* Back button goes back one step at a time through searches, categories and filters */
(function(){
if(!window.bqGetView||!window.bqSetView||typeof window.renderListings!=='function')return;
const key=v=>JSON.stringify(v);
let lastKey=key(window.bqGetView()),timer=null,restoring=false;
window.__bqLast={key:lastKey,view:window.bqGetView()};
window.bqRestoreView=function(v){
 clearTimeout(timer);
 restoring=true;
 try{window.bqSetView(v);}catch(e){}
 lastKey=key(window.bqGetView());
 window.__bqLast={key:lastKey,view:window.bqGetView()};
 restoring=false;
};
try{if(!history.state)history.replaceState({bqView:window.bqGetView()},'');}catch(e){}
const orig=window.renderListings;
function commit(){
 const v=window.bqGetView(),k=key(v);
 if(k===lastKey)return;
 lastKey=k;
 window.__bqLast={key:k,view:v};
 try{history.pushState({bqView:v},'');}catch(e){}
}
window.renderListings=function(){
 const r=orig.apply(this,arguments);
 if(!restoring){clearTimeout(timer);timer=setTimeout(commit,700);}
 return r;
};
window.addEventListener('popstate',ev=>{
 if(window.__bqConsumed){window.__bqConsumed=false;return;}
 const st=ev&&ev.state;
 if(st&&st.bqView){
  window.bqRestoreView(st.bqView);
 }
});
})();

/* Product page, top half: photo count, location row, Call button, chat with the seller, seller time on BuyQora */
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const ago=d=>{const s=(Date.now()-new Date(d))/1000;if(!(s>=0))return '';if(s<3600)return Math.max(1,Math.round(s/60))+' min ago';if(s<86400)return Math.round(s/3600)+' hr ago';const n=Math.round(s/86400);if(n<30)return n+' day'+(n===1?'':'s')+' ago';const m=Math.round(n/30);if(m<12)return m+' month'+(m===1?'':'s')+' ago';const y=Math.round(n/365);return y+' year'+(y===1?'':'s')+' ago';};
const css=document.createElement('style');
css.textContent='.bq-photocount{position:absolute;left:10px;bottom:10px;background:rgba(0,0,0,.6);color:#fff;font-size:13px;font-weight:700;padding:4px 10px;border-radius:99px}'+
'.bq-locrow{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:10px 0 4px;color:#5d6d64;font-size:14px}'+
'.bq-badge2{background:#e8f5ee;color:#0b6b3a;font-weight:700;font-size:12.5px;padding:4px 10px;border-radius:99px;white-space:nowrap}'+
'.bq-call{display:flex;align-items:center;justify-content:center;gap:8px;background:#0b6b3a;color:#fff!important;text-decoration:none;font-weight:700;font-size:17px;border-radius:12px;padding:13px;margin:10px 0}'+
'.bq-chatbox{background:#f5f7f6;border:1px solid #e3ebe6;border-radius:14px;padding:14px;margin:12px 0}'+
'.bq-chatbox h4{margin:0 0 10px;font-size:16px;color:#14261c}'+
'.bq-qchips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}'+
'.bq-qchips button{background:#fff;color:#0b6b3a;border:1.5px solid #0b6b3a;border-radius:99px;padding:8px 12px;font-size:13.5px;font-weight:600;cursor:pointer}'+
'.bq-chatbox textarea{width:100%;box-sizing:border-box;min-height:64px;border:1px solid #cfdad4;border-radius:12px;padding:12px;font-size:15px;background:#fff;color:#1b2a22;resize:vertical;margin-bottom:10px}'+
'.bq-chatbox .bq-start{width:100%;background:#ff6b00;color:#fff;border:0;border-radius:12px;padding:14px;font-size:16px;font-weight:700;cursor:pointer}';
document.head.appendChild(css);

function since(d){
 if(!d)return '';
 const t=new Date(d);if(isNaN(t))return '';
 const days=(Date.now()-t)/86400000;
 if(days<7)return 'New on BuyQora';
 if(days<30){const w=Math.floor(days/7);return w+' week'+(w===1?'':'s')+' on BuyQora';}
 const m=Math.floor(days/30.44);
 if(m<12)return m+' month'+(m===1?'':'s')+' on BuyQora';
 const y=Math.floor(days/365.25);
 return y+(m%12?'+':'')+' year'+(y===1?'':'s')+' on BuyQora';
}
async function sellerProfile(id){
 let r=await supabaseClient.from('profiles').select('full_name,business_name,logo_url,phone,show_phone,verification_status,created_at').eq('id',id).maybeSingle();
 if(r.error){r=await supabaseClient.from('profiles').select('full_name,business_name,logo_url,phone,show_phone,verification_status').eq('id',id).maybeSingle();}
 return r.data||null;
}
async function enhance(l){
 const root=$('detailContent');
 if(!root||!l)return;
 const {data:{session}}=await supabaseClient.auth.getSession();
 const own=!!session&&session.user.id===l.seller_id;
 const prof=await sellerProfile(l.seller_id);
 try{
  const rs=await supabaseClient.rpc('seller_since',{uid:l.seller_id});
  if(!rs.error&&rs.data&&prof&&(!prof.created_at||new Date(rs.data)<new Date(prof.created_at)))prof.created_at=rs.data;
 }catch(e){}

 /* photo count */
 const img=root.querySelector('.detail-image');
 const n=root.querySelectorAll('.bq-thumbs img').length||(l.image_url?1:0);
 if(img&&n>1&&!img.querySelector('.bq-photocount')){const b=document.createElement('span');b.className='bq-photocount';b.textContent='📷 '+n;img.appendChild(b);}

 /* location + time row, verified badge */
 const h3=root.querySelector('h3');
 if(h3&&!root.querySelector('.bq-locrow')){
  const where=l.city?l.city+', '+l.state:l.state;
  const row=document.createElement('div');row.className='bq-locrow';
  const verified=prof&&prof.verification_status==='verified';
  const pr=window.bqPromoOf?window.bqPromoOf(l):null;
  const pl=pr&&window.bqPromoLbl?window.bqPromoLbl[pr.package_id]:null;
  const promoBadge=pl?'<span class="bq-badge2" style="background:'+pl[1]+';color:#fff">'+esc(pl[0])+'</span>':'';
  row.innerHTML='<span>📍 '+esc(where||'')+' · '+esc(ago(l.created_at))+'</span><span style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">'+promoBadge+(verified?'<span class="bq-badge2">✔ Verified seller</span>':'')+'</span>';
  h3.parentNode.insertBefore(row,h3);
  root.querySelectorAll('.detail-tag').forEach(t=>{if(t.textContent.trim().startsWith('📍'))t.remove();});
 }

 /* seller line: name and time on BuyQora */
 const ds=$('dSeller');
 if(ds&&prof){
  const nm=prof.business_name||prof.full_name||'User';
  const sn=since(prof.created_at);
  ds.textContent=nm;
  if(sn&&!ds.parentNode.querySelector('.bq-since')){const s=document.createElement('span');s.className='bq-since';s.textContent=' · '+sn;ds.parentNode.appendChild(s);}
 }

 if(own||root.querySelector('.bq-chatbox'))return;

 /* Call button (only when the seller chose to show their number) */
 const priceP=root.querySelector('p.price');
 let anchor=priceP;
 if(prof&&prof.show_phone&&prof.phone){
  const tel=String(prof.phone).replace(/[^0-9+]/g,'');
  if(tel){const a=document.createElement('a');a.className='bq-call';a.href='tel:'+tel;a.innerHTML='📞 Call';anchor.insertAdjacentElement('afterend',a);anchor=a;}
 }

 /* Chat with the seller */
 const box=document.createElement('div');box.className='bq-chatbox';
 box.innerHTML='<h4>Chat with the seller</h4><div class="bq-qchips"><button data-m="Hello, I would like to make an offer for this item.">Make an offer</button><button data-m="Hello, is this still available?">Is this available</button><button data-m="Hello, what is your last price?">Last price</button></div><textarea id="bqMsgBox" placeholder="Write your message here"></textarea><button class="bq-start" id="bqStartChat">Start chat</button>';
 anchor.insertAdjacentElement('afterend',box);
 box.querySelectorAll('.bq-qchips button').forEach(b=>b.onclick=()=>{$('bqMsgBox').value=b.dataset.m;$('bqMsgBox').focus();});
 $('bqStartChat').onclick=async()=>{
  const text=$('bqMsgBox').value.trim();
  const {data:{session:s2}}=await supabaseClient.auth.getSession();
  if(!s2){alert('Please log in first.');if(typeof openAuth==='function')openAuth('login');return;}
  const btn=$('bqStartChat');btn.disabled=true;
  try{
   closeDetail();
   await openChat(l.id,l.title,l.seller_id);
   if(text){const ci=$('chatInput');if(ci){ci.value=text;await sendChatMessage();}}
  }catch(e){}
  btn.disabled=false;
 };
 const old=$('contactSellerBtn');if(old)old.style.display='none';
}
const prevOD=window.openDetail;
window.openDetail=async function(l){
 const r=await prevOD.apply(this,arguments);
 try{await enhance(l);}catch(e){}
 return r;
};
})();

/* My listings: big, joined action buttons */
(function(){
const css=document.createElement('style');
css.textContent='#myList button[data-a]{border-radius:0!important;padding:14px 4px!important;font-size:14px!important;font-weight:700!important;min-height:48px;white-space:nowrap;cursor:pointer}'+
'#myList .bqBtnGrid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(88px,1fr));gap:2px;background:#fff;border-radius:12px;overflow:hidden;margin-top:10px}';
document.head.appendChild(css);
function fix(){
 const box=document.getElementById('myList');
 if(!box)return;
 box.querySelectorAll('button[data-a]').forEach(b=>{
  const p=b.parentElement;
  if(p&&p!==box&&!p.classList.contains('bqBtnGrid')){p.classList.add('bqBtnGrid');p.removeAttribute('style');}
 });
}
const box=document.getElementById('myList');
if(box)new MutationObserver(fix).observe(box,{childList:true,subtree:true});
setInterval(fix,700);
})();
