(function(){var s=document.createElement('style');s.textContent='#bqNav [data-n="sell"]{background:#ff6b00 !important;color:#fff !important;border-radius:14px !important;font-weight:bold !important}#bqNav [data-n="sell"] b{filter:brightness(0) invert(1) !important}';document.head.appendChild(s);})();/* BuyQora home + bottom nav + New/Used. Runs after index.html's own script (defer). */
(function(){var map=[['profileOverlay','me'],['inboxOverlay','msg'],['favoritesOverlay','saved'],['sellOverlay','sell']];var last='home';function open(id){var e=document.getElementById(id);return e&&e.classList.contains('show');}function other(){if(document.querySelector('.modal-overlay.show'))return true;return ['bqPayOv','bqSavedOv','bqAlertOv','bqSetScr','bqDashOv','bqOvOv','bqAuditOv'].some(function(i){return document.getElementById(i);});}function tick(){var n=document.getElementById('bqNav');if(!n)return;var cur=null;for(var i=0;i<map.length;i++){if(open(map[i][0])){cur=map[i][1];break;}}if(!cur){cur=other()?last:'home';}last=cur;n.querySelectorAll('[data-n]').forEach(function(b){b.classList.toggle('on',b.dataset.n===cur);});}})();(function(){var m=document.querySelector('#adminOverlay .modal h3');if(!m)return;m.insertAdjacentHTML('afterend','<button class="button" id="bqOvBtn" style="margin-bottom:12px;background:#37474f">📈 Overview numbers</button>');function $(i){return document.getElementById(i);}async function cnt(t,f){try{var q=supabaseClient.from(t).select('id',{count:'exact',head:true});if(f)q=f(q);var r=await q;return r.error?'—':r.count;}catch(e){return '—';}}function card(t,v){return '<div style="border:1px solid #e3e3e3;border-radius:12px;padding:12px"><div style="font-size:12.5px;color:#666">'+t+'</div><div style="font-weight:bold;font-size:20px;color:#0b6b3a;margin-top:4px">'+v+'</div></div>';}function naira(n){return '₦'+Number(n||0).toLocaleString();}$('bqOvBtn').onclick=async function(){var o=$('bqOvOv');if(o)o.remove();o=document.createElement('div');o.id='bqOvOv';o.style.cssText='position:fixed;left:0;right:0;top:0;bottom:var(--bqnavh,72px);z-index:100003;background:#fff;overflow-y:auto;padding:16px;color:#222;font-family:inherit';o.innerHTML='<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><button id="bqOvX" style="font-size:30px;background:none;border:0;padding:6px 10px;color:#222">←</button><h2 style="margin:0;font-size:20px">Overview</h2></div><div id="bqOvBody">Loading...</div>';document.body.appendChild(o);$('bqOvX').onclick=function(){o.remove();};var b=$('bqOvBody');try{var now=new Date().toISOString();var d30=new Date(Date.now()-30*864e5).toISOString();var R=await Promise.all([cnt('profiles'),cnt('profiles',function(q){return q.eq('verification_status','verified');}),cnt('profiles',function(q){return q.eq('verification_status','pending');}),cnt('listings'),cnt('listings',function(q){return q.eq('status','active');}),cnt('listings',function(q){return q.eq('status','pending_payment');}),cnt('promotions',function(q){return q.eq('status','active').gt('expires_at',now);}),cnt('ad_campaigns',function(q){return q.eq('status','active').gt('expires_at',now);}),cnt('reports',function(q){return q.eq('status','open');}),cnt('payments',function(q){return q.eq('status','submitted');}),supabaseClient.from('payments').select('amount,confirmed_at').eq('status','confirmed')]);var pr=R[10];var all='—',mo='—',n='—';if(!pr.error){var rows=pr.data||[];n=rows.length;all=naira(rows.reduce(function(a,x){return a+(Number(x.amount)||0);},0));mo=naira(rows.filter(function(x){return x.confirmed_at&&x.confirmed_at>=d30;}).reduce(function(a,x){return a+(Number(x.amount)||0);},0));}b.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+card('Registered users',R[0])+card('Verified sellers',R[1])+card('Verification requests waiting',R[2])+card('Total listings (ever)',R[3])+card('Live listings',R[4])+card('Listings awaiting payment',R[5])+card('Active promotions',R[6])+card('Active banner ads',R[7])+card('Open reports',R[8])+card('Payments waiting to confirm',R[9])+card('Confirmed payments',n)+card('Confirmed, last 30 days',mo)+'</div><div style="margin-top:10px">'+card('Total confirmed payments',all)+'</div><p style="color:#666;font-size:13px;margin-top:12px">All numbers come from your real records, including any test payments you confirmed.</p>';}catch(e){b.textContent='Could not load: '+(e&&e.message?e.message:e);}};document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('#bqNav [data-n]')){var o=$('bqOvOv');if(o)o.remove();}},true);})();(function(){var $=function(i){return document.getElementById(i);};function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}function closeDash(){var o=$('bqDashOv');if(o)o.remove();}function card(t,v){return '<div style="border:1px solid #e3e3e3;border-radius:12px;padding:12px"><div style="font-size:12.5px;color:#666">'+t+'</div><div style="font-weight:bold;font-size:20px;color:#0b6b3a;margin-top:4px">'+v+'</div></div>';}async function openDash(){closeDash();var o=document.createElement('div');o.id='bqDashOv';o.style.cssText='position:fixed;left:0;right:0;top:0;bottom:var(--bqnavh,72px);z-index:99999;background:#fff;overflow-y:auto;padding:16px;color:#222;font-family:inherit';o.innerHTML='<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><button id="bqDashX" style="font-size:30px;background:none;border:0;padding:6px 10px;color:#222">←</button><h2 style="margin:0;font-size:20px">Seller dashboard</h2></div><div id="bqDashBody">Loading...</div>';document.body.appendChild(o);$('bqDashX').onclick=closeDash;var b=$('bqDashBody');try{var s=await supabaseClient.auth.getSession();var ses=s.data.session;if(!ses){b.textContent='Please log in.';return;}var uid=ses.user.id;var r=await Promise.all([supabaseClient.from('app_settings').select('key,value'),supabaseClient.from('seller_listing_counts').select('posted').eq('user_id',uid).maybeSingle(),supabaseClient.from('listings').select('status').eq('seller_id',uid),supabaseClient.from('profiles').select('verification_status,verified_at').eq('id',uid).maybeSingle(),supabaseClient.from('payments').select('amount,status').eq('user_id',uid),supabaseClient.from('promotions').select('status,expires_at').eq('seller_id',uid)]);var S={};(r[0].data||[]).forEach(function(x){S[x.key]=x.value;});var lim=parseInt(S.free_listings,10);if(isNaN(lim))lim=5;var fee=parseFloat(S.posting_fee);if(isNaN(fee))fee=1800;var mo=parseInt(S.verification_months,10)||12;var posted=r[1].data?r[1].data.posted:0;var used=Math.min(posted,lim),left=Math.max(0,lim-posted);var L=r[2].data||[];var cnt=function(st){return L.filter(function(x){return x.status===st;}).length;};var p=r[3].data||{};var vs=p.verification_status||'none';var vt='Not verified';if(vs==='verified'){vt='✅ Verified';if(p.verified_at){var d=new Date(p.verified_at);d.setMonth(d.getMonth()+mo);vt+=' until '+d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});}}else if(vs==='pending')vt='⏳ Waiting for review';else if(vs==='rejected')vt='Not approved';var P=r[4].data||[];var tot=P.filter(function(x){return x.status==='confirmed';}).reduce(function(a,x){return a+(Number(x.amount)||0);},0);var wait=P.filter(function(x){return x.status==='submitted';}).length;var pr=(r[5].data||[]).filter(function(x){return x.status==='active'&&new Date(x.expires_at)>new Date();}).length;var adm=typeof isAdmin!=='undefined'&&isAdmin;var msg,col;if(adm){msg='Admin: you can post without paying.';col='#0277bd';}else if(left>0){msg='You have used '+used+' of your '+lim+' free listings. '+left+' remaining.';col='#2e7d32';}else{msg='You have used all '+lim+' free listings. Your next listing costs ₦'+fee.toLocaleString()+'.';col='#c0392b';}b.innerHTML='<div style="font-weight:bold;border-radius:12px;padding:14px;margin-bottom:12px;background:#f7f7f7;color:'+col+'">'+msg+'</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+card('Listings posted (ever)',posted)+card('Live listings',cnt('active'))+card('Paused',cnt('paused'))+card('Sold',cnt('sold'))+card('Awaiting payment',cnt('pending_payment'))+card('Active promotions',pr)+card('Verification','<span style="font-size:15px">'+esc(vt)+'</span>')+card('Payments confirmed','₦'+tot.toLocaleString())+'</div>'+(wait?'<p style="margin-top:12px;color:#666;font-size:14px">⏳ '+wait+' payment(s) waiting for confirmation.</p>':'');}catch(e){b.textContent='Could not load: '+(e&&e.message?e.message:e);}}setInterval(function(){var g=$('bqProfGrid');if(!g||$('bqDashBtn'))return;g.insertAdjacentHTML('beforeend','<button class="button" id="bqDashBtn" style="margin:0 !important;width:100% !important;min-height:62px !important;padding:10px 8px !important;border-radius:14px !important;font-size:15px !important;font-weight:bold !important;background:#fff !important;color:#0b6b3a !important;border:1.5px solid #0b6b3a !important;grid-column:1 / span 2 !important">📊 Seller dashboard</button>');$('bqDashBtn').onclick=function(){try{closeProfile();}catch(e){}openDash();};},1000);document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('#bqNav [data-n]'))closeDash();},true);})();(function(){var m=document.querySelector('#adminOverlay .modal h3');if(!m)return;m.insertAdjacentHTML('afterend','<button class="button" id="bqAuditBtn" style="margin-bottom:12px;background:#455a64">📜 Audit log</button>');function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}document.getElementById('bqAuditBtn').onclick=async function(){var o=document.getElementById('bqAuditOv');if(o)o.remove();o=document.createElement('div');o.id='bqAuditOv';o.style.cssText='position:fixed;left:0;right:0;top:0;bottom:var(--bqnavh,72px);z-index:100003;background:#fff;overflow-y:auto;padding:16px;color:#222;font-family:inherit';o.innerHTML='<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><button id="bqAuditX" style="font-size:30px;background:none;border:0;padding:6px 10px;color:#222">←</button><h2 style="margin:0;font-size:20px">Audit log</h2></div><div id="bqAuditBody">Loading...</div>';document.body.appendChild(o);document.getElementById('bqAuditX').onclick=function(){o.remove();};var b=document.getElementById('bqAuditBody');try{var r=await supabaseClient.from('audit_log').select('*').order('created_at',{ascending:false}).limit(100);if(r.error){b.textContent='Could not load: '+r.error.message;return;}var d=r.data||[];if(!d.length){b.innerHTML='<p style="color:#666">No changes recorded yet.</p>';return;}var ids=[...new Set(d.map(function(x){return x.actor_id;}).filter(Boolean))];var nm={};for(var i=0;i<ids.length;i++){try{nm[ids[i]]=await getProfileName(ids[i]);}catch(e){}}b.innerHTML=d.map(function(x){return '<div style="border:1px solid #e3e3e3;border-radius:12px;padding:12px 14px;margin-bottom:10px"><div style="font-weight:bold">'+esc(x.action)+'</div><div style="font-size:14px;margin:4px 0">'+esc(x.old_value)+' → <b>'+esc(x.new_value)+'</b></div><div style="font-size:12.5px;color:#666">By: '+esc(nm[x.actor_id]||(x.actor_id?'Unknown':'System'))+' · '+new Date(x.created_at).toLocaleString('en-GB')+'</div></div>';}).join('');}catch(e){b.textContent='Could not load: '+e.message;}};})();(function(){var s=document.createElement('style');s.textContent='.bqRcBtn{margin-top:10px;padding:10px 16px;border-radius:10px;border:1.5px solid #0b6b3a;background:#fff;color:#0b6b3a;font-weight:bold;font-size:14px}.bqRcHead{display:none}@media print{body.bq-printing>*:not(#bqPayOv){display:none!important}body.bq-printing #bqPayOv{position:static!important;overflow:visible!important;padding:0!important}body.bq-printing #bqPayOv>div:first-child,body.bq-printing .bqRc:not(.bqPrintOne),body.bq-printing .bqRcBtn{display:none!important}body.bq-printing .bqRcHead{display:block!important;margin-bottom:10px}}';document.head.appendChild(s);window.addEventListener('afterprint',function(){document.body.classList.remove('bq-printing');});function dress(){var b=document.getElementById('bqPayBody');if(!b)return;b.querySelectorAll(':scope>div').forEach(function(c){if(c.dataset.rc)return;c.dataset.rc='1';if(c.textContent.indexOf('Confirmed')<0)return;c.classList.add('bqRc');var h=document.createElement('div');h.className='bqRcHead';h.innerHTML='<b style="font-size:20px">BuyQora</b><br>Payment receipt<br>Support: support.buyqora@gmail.com<hr>';c.insertBefore(h,c.firstChild);var x=document.createElement('button');x.className='bqRcBtn';x.textContent='Print / Save as PDF';x.onclick=function(){document.querySelectorAll('.bqPrintOne').forEach(function(e){e.classList.remove('bqPrintOne');});c.classList.add('bqPrintOne');document.body.classList.add('bq-printing');window.print();};c.appendChild(x);});}setInterval(dress,800);})();(function(){var s=document.createElement('style');s.textContent='#bqCats .bq-cat{width:100% !important}#bqCats .bq-cat i{width:100% !important}';document.head.appendChild(s);})();(function(){var s=document.createElement('style');s.textContent='#bqCats{align-items:start !important}#bqCats .bq-cat{display:flex !important;flex-direction:column !important;justify-content:flex-start !important;align-items:center !important;align-self:start !important}#bqCats .bq-cat i{flex:none !important}';document.head.appendChild(s);})();(function(){
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
function subRow(icon,name,note,key){const f='sub-'+(key==='all'?'all-'+subCat:key)+'.jpg?v=2';return '<div class="bqSubRow" data-k="'+key+'" style="display:flex;align-items:center;gap:14px;padding:14px 16px;border-bottom:1px solid #eee;cursor:pointer"><div style="position:relative;overflow:hidden;width:56px;height:56px;border-radius:12px;background:#fff3e8;display:flex;align-items:center;justify-content:center;font-size:26px;flex:0 0 56px">'+icon+'<img src="'+f+'" alt="" loading="lazy" onerror="this.remove()" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div><div style="flex:1;min-width:0"><div style="font-weight:bold;font-size:15px;color:#222">'+esc(name)+'</div><div style="font-size:12.5px;color:#777;margin-top:2px">'+note+'</div></div><div style="color:#999;font-size:20px">›</div></div>';}
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
 const f=currentListings.filter(l=>(activeCategory==='all'||l.category_id===activeCategory)&&(activeSub==='all'||l.subcategory===activeSub)&&(activeState==='all'||l.state===activeState)&&(condFilter==='all'||l.condition===condFilter)&&(!q||(l.title||'').toLowerCase().includes(q)||(l.description||'').toLowerCase().includes(q))&&(!window.bqExtraFilter||window.bqExtraFilter(l)));
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
const MAXP=8;
$('sellPrice').insertAdjacentHTML('afterend','<label style="display:flex;gap:8px;align-items:center;margin-bottom:12px"><input type="checkbox" id="sellNeg" style="width:auto;margin:0"> Price is negotiable</label>');
$('sellState').insertAdjacentHTML('afterend','<label>City / area</label><input type="text" id="sellCity" placeholder="e.g. Owerri, Ikeja, Onitsha">');
const si=$('sellImage');si.multiple=true;
if(si.previousElementSibling)si.previousElementSibling.textContent='Photos (at least 2, up to 8)';
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
 const row={seller_id:session.user.id,title,description:$('sellDesc').value.trim(),price,category_id:$('sellCategory').value,state:$('sellState').value,city:$('sellCity').value.trim()||null,negotiable:$('sellNeg').checked,condition:$('sellCondition').value,image_url:images[0]||null,images,subcategory:SUBCATS[$('sellCategory').value]?($('sellSub').value||null):null,details:(window.getListingDetails?window.getListingDetails():{})};
 let{error}=await supabaseClient.from('listings').insert(row);
 if(error&&/condition/i.test(error.message)){delete row.condition;({error}=await supabaseClient.from('listings').insert(row));}
 if(error&&/subcategory/i.test(error.message)){delete row.subcategory;({error}=await supabaseClient.from('listings').insert(row));}
 if(error&&/details/i.test(error.message)){delete row.details;({error}=await supabaseClient.from('listings').insert(row));}
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
 ((l.details&&typeof l.details==='object')?Object.keys(l.details).map(k=>{const v=l.details[k];if(!v)return '';const nl=['brand','storage','make','model'].includes(k)?'':(k.charAt(0).toUpperCase()+k.slice(1)+': ');return '<span class="detail-tag">'+nl+esc(v)+'</span>';}).join(''):'')+
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
const SUPPORT_EMAIL='support.buyqora@gmail.com';
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
contact:['Contact Us',`<p><b>BuyQora</b> &middot; <i>Buy. Sell. Discover. Promote. Grow.</i></p>
<p>Need help? Email our support team and we will reply by email.</p>
<p style="margin:14px 0 6px"><b>Support email:</b><br><a href="mailto:${SUPPORT_EMAIL}?subject=BuyQora%20Customer%20Support" style="color:#0b6b3a;font-size:17px;font-weight:bold;word-break:break-all">${SUPPORT_EMAIL}</a></p>
<p style="margin:12px 0 18px"><a href="mailto:${SUPPORT_EMAIL}?subject=BuyQora%20Customer%20Support" style="display:block;text-align:center;background:#0b6b3a;color:#fff;text-decoration:none;font-weight:bold;font-size:16px;padding:14px;border-radius:12px">&#9993; Email Support</a></p>
<h4>You can contact us about</h4>
<ul style="padding-left:20px;margin:0 0 12px">
<li><b>Account and login</b> &ndash; trouble signing in or changing account details.</li>
<li><b>Buyers and sellers</b> &ndash; questions about buying, selling or a seller page.</li>
<li><b>Listing problems</b> &ndash; a listing that will not post, edit or show correctly.</li>
<li><b>Payments and transactions</b> &ndash; questions about a BuyQora fee, receipt or promotion payment.</li>
<li><b>Suspicious listings or users</b> &ndash; tell us about scams or bad behaviour.</li>
</ul>
<p>Please include the email you use on BuyQora and a short description. For a scam report, include the listing title and the seller name.</p>
<p>To report a listing or user quickly, open the listing or chat and tap the <b>Report</b> button.</p>
<p style="color:#666;font-size:13px">Support is by email only. BuyQora does not have live chat or a ticket system yet. Never share your password with anyone.</p>`]
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
 f.insertAdjacentHTML('afterbegin','<p id="legalLinks" style="margin-bottom:12px"><a data-l="terms" style="color:#ff6b00;cursor:pointer">Terms</a> &nbsp;·&nbsp; <a data-l="privacy" style="color:#ff6b00;cursor:pointer">Privacy</a> &nbsp;·&nbsp; <a data-l="contact" style="color:#ff6b00;cursor:pointer">Contact Us</a></p>');
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
$('quotaNote').insertAdjacentHTML('afterend','<div id="oneItemNote" style="font-size:13px;line-height:1.5;border-radius:8px;padding:8px 10px;margin-bottom:12px;background:#fff6ec;color:#8a4b00">One listing = one item. You can add up to 8 photos of the same item. To sell another item, post it as a separate listing.</div>');
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
const EMAIL='support.buyqora@gmail.com';
document.body.insertAdjacentHTML('beforeend','<div class="modal-overlay" id="adTermsOverlay"><div class="modal" style="color:#222;max-width:600px"><span class="close" id="adTermsClose">✕</span><h3>Advertising Terms</h3><div id="adTermsBody" style="font-size:14px;line-height:1.6"></div></div></div>');
$('adTermsBody').innerHTML='<p><i>Last updated: October 2026</i></p>'+
'<h4>1. Who can advertise</h4><p>Any registered BuyQora seller, business, company or brand aged 18 or over can promote a listing or place an advert, as long as the content follows our Terms of Use.</p>'+
'<h4>2. Promotion and advert types</h4><p>BuyQora offers paid listing promotions (Basic Boost, Featured, Premium, VIP, Diamond and Top Advert) and business adverts such as banners and video. Promoted items are clearly labelled, for example Promoted, Featured, Premium, VIP, Diamond or Sponsored.</p>'+
'<h4>3. Prices and duration</h4><p>Prices and durations are shown before you pay and may be changed by BuyQora at any time. A change does not affect a promotion you have already paid for.</p>'+
'<h4>4. Payment</h4><p>A promotion or advert starts only after BuyQora has received and confirmed your payment. Payments are currently made by bank transfer and confirmed by our team. Keep your proof of payment.</p>'+
'<h4>5. Refunds</h4><p>Once a promotion or advert is active, the fee is not refundable. If we fail to show a paid promotion, contact us and we will extend it or refund you.</p>'+
'<h4>6. Advert content</h4><p>Adverts must be honest and lawful. No illegal, fake, counterfeit, misleading or adult content, no scams, and no content that harms or insults others. You must have the right to use all text, images and video in your advert.</p>'+
'<h4>7. Our right to reject or remove</h4><p>BuyQora may reject, pause or remove any advert or promotion that breaks these terms or our Terms of Use, without a refund where the breach is serious.</p>'+
'<h4>8. No guarantee of results</h4><p>A promotion increases visibility but we cannot guarantee a number of views, messages or sales.</p>'+
'<h4>9. Verified business badge</h4><p>The verified badge is a paid service. We may remove it if the business information turns out to be false.</p>'+
'<h4>10. Extra listing fee</h4><p>Every seller can post 3 listings for free. After that, a fee applies for each extra listing and is shown before you pay. Listings you delete still count towards the 3 free listings. A listing is published only after BuyQora has received and confirmed your payment.</p>'+
'<h4>11. Contact</h4><p>For any advertising question, email '+EMAIL+'.</p>';
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
'.bq-chatbox .bq-start{width:100%;background:#ff6b00;color:#fff;border:0;border-radius:12px;padding:14px;font-size:16px;font-weight:700;cursor:pointer}'+
'.bq-clamp{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}'+
'.bq-more{display:inline-block;color:#0b6b3a;font-weight:700;margin:2px 0 8px;cursor:pointer}'+
'.bq-seller{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e3ebe6;border-radius:14px;padding:12px;margin:12px 0}'+
'.bq-av{width:54px;height:54px;border-radius:50%;background:#e8f5ee;color:#0b6b3a;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px;overflow:hidden;flex:none}'+
'.bq-av img{width:100%;height:100%;object-fit:cover}'+
'.bq-sinfo{flex:1;min-width:0}.bq-sinfo b{font-size:16px;color:#14261c;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.bq-sinfo .bq-sub{font-size:13px;color:#5d6d64;margin-top:2px}'+
'.bq-viewads{color:#0b6b3a;font-weight:700;font-size:14px;white-space:nowrap;cursor:pointer}'+
'.bq-fb{background:#fff;border:1px solid #e3ebe6;border-radius:14px;padding:12px;margin:12px 0}.bq-fb h4{margin:0 0 8px;font-size:16px;color:#14261c}'+
'.bq-fbcard{background:#f5f7f6;border-radius:12px;padding:10px 12px;font-size:14px;color:#1b2a22}.bq-fbcard .st{color:#f5a623}'+
'.bq-viewall{display:block;margin-top:8px;color:#0b6b3a;font-weight:700;cursor:pointer}'+
'.bq-act{display:block;width:100%;box-sizing:border-box;text-align:center;background:#fff;border-radius:12px;padding:14px;font-size:16px;font-weight:700;margin:10px 0;cursor:pointer}';
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
async function bottom(l,prof,own){
 const root=$('detailContent');
 if(!root||root.querySelector('.bq-bottom'))return;
 /* description: show more */
 const desc=root.querySelector('.detail-desc');
 if(desc&&(desc.textContent||'').length>180){
  desc.classList.add('bq-clamp');
  const t=document.createElement('a');t.className='bq-more';t.textContent='Show more ▾';
  t.onclick=()=>{const c=desc.classList.toggle('bq-clamp');t.textContent=c?'Show more ▾':'Show less ▴';};
  desc.insertAdjacentElement('afterend',t);
 }
 /* seller card */
 const sp=$('dSeller')?$('dSeller').closest('p'):null;
 const nm=prof?(prof.business_name||prof.full_name||'User'):'User';
 const ver=prof&&prof.verification_status==='verified';
 const all=(typeof currentListings!=='undefined'&&currentListings)?currentListings.filter(x=>x.seller_id===l.seller_id):[];
 const others=all.filter(x=>String(x.id)!==String(l.id)).slice(0,10);
 const total=Math.max(all.length,1);
 const card=document.createElement('div');card.className='bq-bottom bq-seller';
 card.innerHTML='<div class="bq-av">'+(prof&&prof.logo_url?'<img src="'+esc(prof.logo_url)+'" alt="">':esc(nm.charAt(0).toUpperCase()))+'</div>'+
  '<div class="bq-sinfo"><b>'+esc(nm)+'</b>'+(ver?'<span class="bq-badge2" style="display:inline-block;margin-top:3px">✔ Verified</span>':'')+'<div class="bq-sub">'+esc(since(prof&&prof.created_at))+'</div></div>'+
  '<a class="bq-viewads">View ads ('+total+') ›</a>';
 if(sp){sp.insertAdjacentElement('beforebegin',card);sp.style.display='none';}
 else root.appendChild(card);
 /* more from this seller */
 let moreH=null;
 if(others.length){
  moreH=document.createElement('div');moreH.className='bq-bottom';
  moreH.innerHTML='<h4 class="bq-simh">More from this seller</h4><div class="bq-sim">'+others.map(x=>'<div data-id="'+x.id+'">'+(x.image_url?'<img src="'+esc(x.image_url)+'" alt="">':'<img alt="" style="background:#eee">')+'<span>'+esc(x.title)+'</span><b>₦'+Number(x.price).toLocaleString()+'</b></div>').join('')+'</div>';
  const simh=root.querySelector('.bq-simh');
  if(simh)simh.insertAdjacentElement('beforebegin',moreH);else root.appendChild(moreH);
  moreH.querySelectorAll('.bq-sim div').forEach(d=>d.onclick=()=>{const x=currentListings.find(z=>String(z.id)===d.dataset.id);if(x)openDetail(x);});
 }
 card.querySelector('.bq-viewads').onclick=()=>{(moreH||card).scrollIntoView({behavior:'smooth',block:'center'});};
 /* feedback preview */
 try{
  const {data:rv}=await supabaseClient.from('reviews').select('rating,comment,created_at,reviewer_id').eq('seller_id',l.seller_id).order('created_at',{ascending:false}).limit(2);
  const {data:sm}=await supabaseClient.from('seller_ratings').select('review_count').eq('seller_id',l.seller_id).maybeSingle();
  if(rv&&rv.length){
   const pm={};
   try{const ids=[...new Set(rv.map(x=>x.reviewer_id))];const{data:pp}=await supabaseClient.from('profiles').select('id,full_name,business_name,logo_url').in('id',ids);(pp||[]).forEach(p=>{pm[p.id]=p;});}catch(e){}
   const dt=d=>{const x=new Date(d);const z=n=>String(n).padStart(2,'0');return z(x.getDate())+'/'+z(x.getMonth()+1)+'/'+String(x.getFullYear()).slice(2);};
   const cardH=r=>{
    const p=pm[r.reviewer_id]||{};const who=p.business_name||p.full_name||'Buyer';const n=Math.round(r.rating||0);
    const av=p.logo_url?'<img src="'+esc(p.logo_url)+'" alt="" style="width:100%;height:100%;object-fit:cover">':esc(who.charAt(0).toUpperCase());
    return '<div style="background:#f5f7f6;border-radius:14px;padding:14px;margin-top:12px;color:#1b2a22">'+
     '<div style="display:flex;align-items:center;gap:10px"><span style="width:40px;height:40px;border-radius:50%;background:#dfe7e2;flex:0 0 40px;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;font-weight:bold">'+av+'</span><b style="font-size:16px;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(who)+'</b><span style="color:#777;font-size:13px">'+esc(dt(r.created_at))+'</span></div>'+
     '<div style="font-size:20px;margin:8px 0 6px;letter-spacing:2px"><span style="color:#f5a623">'+'★'.repeat(n)+'</span><span style="color:#cdd5d0">'+'★'.repeat(5-n)+'</span></div>'+
     (r.comment?'<div style="font-size:15px;line-height:1.5">'+esc(r.comment)+'</div>':'')+'</div>';
   };
   const fb=document.createElement('div');fb.className='bq-bottom bq-fb';
   fb.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><h4 style="margin:0">Feedback about seller</h4><a class="bq-viewall" style="display:inline!important;margin:0!important;color:#0b6b3a;font-weight:600;white-space:nowrap;cursor:pointer">View all'+(sm&&sm.review_count?' ('+sm.review_count+')':'')+' ›</a></div>'+rv.map(cardH).join('');
   const anchor=$('bqRate')||sp||card;
   anchor.insertAdjacentElement('afterend',fb);
   fb.querySelector('.bq-viewall').onclick=()=>{const a=$('bqRateLink');if(a)a.click();};
   setTimeout(()=>{const br=$('bqRate');if(br&&fb.previousElementSibling!==br)br.insertAdjacentElement('afterend',fb);},700);
  }
 }catch(e){}
 /* buttons */
 const end=document.createElement('div');end.className='bq-bottom';
 end.innerHTML=(own?'<button class="bq-act" id="bqUnavail" style="color:#0277bd;border:2px solid #0277bd">Mark unavailable</button>':'')+'<button class="bq-act" id="bqPostLike" style="color:#0b6b3a;border:2px solid #0b6b3a">Post ad like this</button>';
 const rep=root.querySelector('.report-btn')||$('dManage')||$('dShare');
 if(rep)rep.insertAdjacentElement('afterend',end);else root.appendChild(end);
 if($('bqUnavail'))$('bqUnavail').onclick=async()=>{
  if(!confirm('Mark this listing as unavailable (sold)? Buyers will no longer see it.'))return;
  const {error}=await supabaseClient.from('listings').update({status:'sold'}).eq('id',l.id);
  if(error){alert('Could not update: '+error.message);return;}
  closeDetail();
  try{if(typeof loadListings==='function')loadListings();}catch(e){}
  alert('Marked as unavailable.');
 };
 $('bqPostLike').onclick=()=>{
  closeDetail();
  const sb=document.querySelector('#bqNav [data-n="sell"]');
  if(sb)sb.click();else if(typeof openSell==='function')openSell();
  setTimeout(()=>{try{
   const c=$('sellCategory');if(c&&l.category_id){c.value=l.category_id;c.dispatchEvent(new Event('change'));}
   setTimeout(()=>{try{if(l.subcategory&&$('sellSub')){$('sellSub').value=l.subcategory;$('sellSub').dispatchEvent(new Event('change'));}}catch(e){}},250);
   if(l.condition&&$('sellCondition'))$('sellCondition').value=l.condition;
   if(l.state&&$('sellState'))$('sellState').value=l.state;
   if(l.city&&$('sellCity'))$('sellCity').value=l.city;
  }catch(e){}},400);
 };
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

 try{await bottom(l,prof,own);}catch(e){}
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

/* BuyQora logo and tagline in the header */
(function(){
const logo=document.querySelector('.bq-logo');
if(!logo||logo.querySelector('.bq-mark'))return;
const css=document.createElement('style');
css.textContent='.bq-logo{display:flex!important;align-items:center;gap:10px}'+
'.bq-mark{width:42px;height:42px;border-radius:12px;background:#ff6b00;color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;box-shadow:0 2px 6px rgba(0,0,0,.25);flex:none;font-family:inherit}'+
'.bq-word{display:flex;flex-direction:column;line-height:1.1;font-size:24px;font-weight:800;letter-spacing:.2px}'+
'.bq-word small{font-size:11px;font-weight:500;letter-spacing:.2px;color:#d6efe0;margin-top:3px;white-space:nowrap}';
document.head.appendChild(css);
logo.innerHTML='<span class="bq-mark">B</span><span class="bq-word">BuyQora<small>Buy. Sell. Discover. Promote. Grow.</small></span>';
})();

/* Messages inbox: search, tabs, thumbnails, unread counts, closed ads */
(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const css=document.createElement('style');
css.textContent='.bq-isearch{width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #cfdad4;border-radius:12px;font-size:15px;margin:6px 0 10px;background:#fff;color:#1b2a22}'+
'.bq-tabs{display:flex;gap:4px;border-bottom:1px solid #e3ebe6;margin-bottom:4px;overflow-x:auto}'+
'.bq-tabs button{background:none;border:0;padding:10px 12px;font-size:15px;color:#6b7c73;font-weight:600;border-bottom:3px solid transparent;white-space:nowrap;cursor:pointer}'+
'.bq-tabs button.on{color:#0b6b3a;border-bottom-color:#0b6b3a}'+
'.bq-badge3{background:#e53935;color:#fff;border-radius:99px;font-size:11px;padding:1px 6px;margin-left:4px}'+
'#inboxList .bq-ir{display:flex!important;gap:12px;align-items:center;padding:12px 0!important}'+
'.bq-thumb{position:relative;width:64px;height:64px;flex:none}'+
'.bq-thumb img.m{width:64px;height:64px;border-radius:12px;object-fit:cover;background:#e8ece9;display:block}'+
'.bq-av2{position:absolute;right:-6px;bottom:-6px;width:28px;height:28px;border-radius:50%;background:#0b6b3a;color:#fff;border:2px solid #fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;overflow:hidden}'+
'.bq-av2 img{width:100%;height:100%;object-fit:cover}'+
'.bq-imain{flex:1;min-width:0}'+
'.bq-irow1{display:flex;justify-content:space-between;gap:8px;align-items:baseline}'+
'.bq-iname{font-size:15px;color:#33443b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.bq-iname.u{font-weight:800;color:#14261c}'+
'.bq-idate{font-size:12.5px;color:#6b7c73;white-space:nowrap}'+
'.bq-ilast{font-size:14px;color:#6b7c73;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}'+
'.bq-ilast.u{color:#14261c;font-weight:700}'+
'.bq-ititle{font-size:13.5px;color:#5d6d64;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.bq-closed{background:#e8ece9;color:#33443b;font-size:12px;font-weight:700;padding:2px 8px;border-radius:6px;margin-right:6px}'+
'.bq-strike{text-decoration:line-through}'+
'.bq-ucount{background:#0b6b3a;color:#fff;min-width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex:none}';
document.head.appendChild(css);

let tab='all',q='',convos=[];
function fmt(d){
 const t=new Date(d),n=new Date();
 if(t.toDateString()===n.toDateString())return t.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
 return t.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
}
function ensureUI(){
 if($('bqInboxSearch'))return;
 const h=$('inboxOverlay').querySelector('h3');
 if(!h)return;
 h.insertAdjacentHTML('afterend','<input id="bqInboxSearch" class="bq-isearch" placeholder="Search in Messages"><div class="bq-tabs" id="bqInboxTabs"><button data-t="all" class="on">All</button><button data-t="unread">Unread<span id="bqUnreadN"></span></button><button data-t="unanswered">Unanswered</button></div>');
 $('bqInboxSearch').oninput=e=>{q=e.target.value.trim().toLowerCase();render();};
 $('bqInboxTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;tab=b.dataset.t;$('bqInboxTabs').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));render();};
}
function render(){
 const list=$('inboxList');
 const unreadChats=convos.filter(c=>c.unread>0).length;
 const un=$('bqUnreadN');if(un)un.innerHTML=unreadChats?'<span class="bq-badge3">'+unreadChats+'</span>':'';
 const rows=convos.map((c,i)=>({c,i})).filter(({c})=>{
  if(tab==='unread'&&!c.unread)return false;
  if(tab==='unanswered'&&!c.unanswered)return false;
  if(q&&!(c.otherName+' '+c.listingTitle+' '+c.lastBody).toLowerCase().includes(q))return false;
  return true;
 });
 if(!rows.length){list.innerHTML='<p style="color:#999;font-size:14px;padding:14px 0">'+(convos.length?'No conversations here.':'No conversations yet.')+'</p>';return;}
 list.innerHTML=rows.map(({c,i})=>{
  const u=c.unread>0;
  const tick=c.lastMine?(c.lastRead?'<span style="color:#0b6b3a"> ✓✓</span>':'<span style="color:#9aa7a0"> ✓</span>'):'';
  const av=c.logo?'<img src="'+esc(c.logo)+'" alt="">':esc((c.otherName||'?').charAt(0).toUpperCase());
  return '<div class="inbox-row bq-ir" data-idx="'+i+'"><div class="bq-thumb"><img class="m" '+(c.image?'src="'+esc(c.image)+'"':'')+' alt=""><span class="bq-av2">'+av+'</span></div>'+
   '<div class="bq-imain"><div class="bq-irow1"><span class="bq-iname'+(u?' u':'')+'">'+esc(c.otherName)+'</span><span class="bq-idate">'+esc(fmt(c.lastTime))+tick+'</span></div>'+
   '<div class="bq-ilast'+(u?' u':'')+'">'+esc(c.lastBody)+'</div>'+
   '<div class="bq-ititle">'+(c.closed?'<span class="bq-closed">CLOSED AD</span>':'')+'<span class="'+(c.closed?'bq-strike':'')+'">'+esc(c.listingTitle)+'</span></div></div>'+
   (u?'<span class="bq-ucount">'+c.unread+'</span>':'')+'</div>';
 }).join('');
}
window.openInbox=async function(){
 ensureUI();
 const list=$('inboxList');
 list.innerHTML='<p style="color:#999;font-size:14px;">Loading...</p>';
 $('inboxOverlay').classList.add('show');
 const {data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return;
 const me=session.user.id;
 let r=await supabaseClient.from('messages').select('*, listings(title,status,image_url)').or('sender_id.eq.'+me+',recipient_id.eq.'+me).order('created_at',{ascending:false});
 if(r.error)r=await supabaseClient.from('messages').select('*, listings(title)').or('sender_id.eq.'+me+',recipient_id.eq.'+me).order('created_at',{ascending:false});
 if(r.error){list.innerHTML='<p style="color:#c0392b;font-size:13px;">'+esc(r.error.message)+'</p>';return;}
 const data=r.data||[];
 if(!data.length){convos=[];currentConversations=[];render();return;}
 const map={};
 for(const m of data){
  const other=m.sender_id===me?m.recipient_id:m.sender_id;
  const key=m.listing_id+'::'+other;
  let c=map[key];
  if(!c){
   const L=m.listings;
   c=map[key]={listingId:m.listing_id,listingTitle:(L&&L.title)||'Listing',otherId:other,lastBody:m.body,lastTime:m.created_at,lastMine:m.sender_id===me,lastRead:!!m.read,unread:0,
    image:L&&L.image_url||'',closed:!L||(L.status!==undefined&&L.status!=='active'),logo:'',otherName:'',unanswered:m.sender_id!==me};
  }
  if(m.recipient_id===me&&!m.read)c.unread++;
 }
 convos=Object.values(map);
 const ids=[...new Set(convos.map(c=>c.otherId))];
 try{
  const {data:ps}=await supabaseClient.from('profiles').select('id,full_name,business_name,logo_url').in('id',ids);
  const pm={};(ps||[]).forEach(p=>{pm[p.id]=p;});
  for(const c of convos){const p=pm[c.otherId];if(p){c.otherName=p.business_name||p.full_name||'';c.logo=p.logo_url||'';}}
 }catch(e){}
 for(const c of convos){if(!c.otherName){try{c.otherName=await getProfileName(c.otherId)||'User';}catch(e){c.otherName='User';}}}
 currentConversations=convos;
 render();
};
})();

/* Post an item: red "required" messages under empty fields */
(function(){
const $=id=>document.getElementById(id);
const css=document.createElement('style');
css.textContent='.bq-bad{border-color:#e53935!important;background:#fff5f5!important}'+
'.bq-req{color:#e53935;font-size:13px;font-weight:600;margin:-6px 0 12px}';
document.head.appendChild(css);
function clearOne(el){
 if(!el)return;
 el.classList.remove('bq-bad');
 const n=el.nextElementSibling;
 if(n&&n.classList.contains('bq-req'))n.remove();
}
function mark(el,msg){
 clearOne(el);
 el.classList.add('bq-bad');
 el.insertAdjacentHTML('afterend','<div class="bq-req">'+msg+'</div>');
}
function validate(){
 let first=null;
 const bad=(el,msg)=>{mark(el,msg);if(!first)first=el;};
 ['sellTitle','sellPrice','sellSub','sellDesc','sellImage'].forEach(id=>clearOne($(id)));
 const t=$('sellTitle'),p=$('sellPrice'),s=$('sellSub'),d=$('sellDesc');
 if(t&&!t.value.trim())bad(t,'This field is required. Enter a title for your item.');
 if(p){
  const raw=p.value.trim(),num=parseFloat(raw.replace(/[^0-9.]/g,''));
  if(!raw)bad(p,'This field is required. Enter a price, for example 85000.');
  else if(isNaN(num)||num<=0)bad(p,'Enter a valid price in naira.');
 }
 if(s&&s.style.display!=='none'&&!s.value)bad(s,'This field is required. Choose the type.');
 if(d&&d.value.trim().length<10)bad(d,'This field is required. Add a short description (at least 10 characters).');
 const im=$('sellImage');
 if(im){const n=(im.files||[]).length;if(n<2)bad(im,'This field is required. Add at least 2 photos (up to 8).');else if(n>8)bad(im,'You can add up to 8 photos. Only the first 8 will be used.');}
 if(first){
  const err=$('sellError');if(err)err.style.display='none';
  first.scrollIntoView({behavior:'smooth',block:'center'});
  try{first.focus({preventScroll:true});}catch(e){}
  return false;
 }
 return true;
}
document.addEventListener('click',e=>{
 const b=e.target&&e.target.closest?e.target.closest('#sellSubmitBtn'):null;
 if(!b)return;
 if(!validate()){e.stopImmediatePropagation();e.preventDefault();}
},true);
['input','change'].forEach(ev=>document.addEventListener(ev,e=>{
 const el=e.target;
 if(el&&['sellTitle','sellPrice','sellSub','sellDesc','sellImage'].includes(el.id))clearOne(el);
}));
})();

/* ===== Category fields (all categories) ===== */
(function(){
const yrs=[];for(let y=new Date().getFullYear()+1;y>=1990;y--)yrs.push(String(y));
const nums=['1','2','3','4','5','6','7','8+'];
const F={
 phones:[['brand','Brand','s',['Apple (iPhone)','Samsung','Tecno','Infinix','Itel','Xiaomi','Oppo','Nokia','Huawei','Google Pixel','Other']],['storage','Storage','s',['16GB','32GB','64GB','128GB','256GB','512GB','1TB']],['color','Color','t','e.g. Black, Blue']],
 vehicles:[['make','Make','s',['Toyota','Honda','Lexus','Mercedes-Benz','Hyundai','Kia','Nissan','Ford','Peugeot','Volkswagen','BMW','Mazda','Suzuki','Other']],['year','Year','s',yrs],['mileage','Mileage (km)','t','e.g. 85000'],['transmission','Transmission','s',['Automatic','Manual']],['fuel','Fuel','s',['Petrol','Diesel','Electric','Hybrid','Gas']]],
 property:[['bedrooms','Bedrooms','s',nums],['bathrooms','Bathrooms','s',nums],['furnished','Furnished','s',['Yes','No','Semi-furnished']]],
 electronics:[['brand','Brand','s',['Apple','Samsung','JBL','HP','Dell','Lenovo','LG','Sony','Hisense','TCL','Other']],['model','Model','t','e.g. MacBook Air M1']],
 fashion:[['size','Size','t','e.g. M, L, 42'],['color','Color','t','e.g. Black, Blue']]
};
const ages=['Under 1 month','1-3 months','3-6 months','6-12 months','1-2 years','2+ years'];
const ACC=[['type','Type','s',['Power Bank','Cases','Stands & Holders','Chargers & Cables','Screen Protectors','Memory Cards','Other']],['brand','Brand','t','e.g. Oraimo, Anker']];
const PET={an_dogs:[['breed','Breed','s',['Rottweiler','German Shepherd','Lhasa Apso','Caucasian Shepherd','Cane Corso','Boerboel','Alsatian','Pitbull','Husky','Poodle','Local / Mixed','Other']],['gender','Gender','s',['Male','Female']],['age','Age','s',ages]],
 an_cats:[['breed','Breed','s',['Persian','Siamese','Maine Coon','British Shorthair','Local / Mixed','Other']],['gender','Gender','s',['Male','Female']],['age','Age','s',ages]]};
function ready(){
 const d=document.getElementById('sellDesc');
 if(!d)return false;
 if(document.getElementById('catFields'))return true;
 const lb=d.previousElementSibling&&d.previousElementSibling.tagName==='LABEL'?d.previousElementSibling:d;
 lb.insertAdjacentHTML('beforebegin','<div id="catFields" data-cat=""></div>');
 return true;
}
function build(){
 if(!ready())return;
 const c=document.getElementById('sellCategory'),box=document.getElementById('catFields');
 const cat=c?c.value:'';
 const sb=document.getElementById('sellSub');const sub=((cat==='animals'||cat==='phones')&&sb)?sb.value:'';
 const key=cat+':'+sub;
 if(box.dataset.cat===key)return;
 box.dataset.cat=key;
 const list=(cat==='animals')?(PET[sub]||[]):(cat==='phones'&&sub==='ph_acc')?ACC:(F[cat]||[]);
 box.innerHTML=list.map(f=>'<label>'+f[1]+'</label>'+(f[2]==='s'?'<select data-k="'+f[0]+'"><option value="">Choose</option>'+f[3].map(o=>'<option>'+o+'</option>').join('')+'</select>':'<input data-k="'+f[0]+'" placeholder="'+f[3]+'">')).join('');
}
document.addEventListener('change',e=>{if(e.target&&e.target.id==='sellCategory')build();});
setInterval(build,800);
window.getListingDetails=function(){
 const o={},box=document.getElementById('catFields');
 if(!box)return o;
 box.querySelectorAll('[data-k]').forEach(el=>{
  let v=(el.value||'').trim();if(!v)return;
  if(el.dataset.k==='mileage'){const n=v.replace(/[^0-9]/g,'');if(!n)return;v=Number(n).toLocaleString()+' km';}
  o[el.dataset.k]=v;
 });
 return o;
};
})();

/* ===== My payments & receipts ===== */
(function(){
const PURP={posting:'Extra listing fee',verification:'Business verification',promotion:'Listing promotion',banner:'Banner / video ad'};
const STAT={submitted:'⏳ Waiting for confirmation',confirmed:'✅ Confirmed',rejected:'❌ Not confirmed'};
function rno(id){return 'BQ-'+String(id).replace(/-/g,'').slice(0,8).toUpperCase();}
function fd(t){try{return new Date(t).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});}catch(e){return '';}}
function close(){const o=document.getElementById('bqPayOv');if(o)o.remove();}
async function open(){
 close();
 const ov=document.createElement('div');ov.id='bqPayOv';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:#fff;overflow-y:auto;padding:16px;color:#222;font-family:inherit';
 ov.innerHTML='<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><button id="bqPayX" style="font-size:30px;background:none;border:0;padding:6px 10px;color:#222">←</button><h2 style="margin:0;font-size:20px">My payments</h2></div><div id="bqPayBody">Loading...</div>';
 document.body.appendChild(ov);
 document.getElementById('bqPayX').onclick=close;
 const body=document.getElementById('bqPayBody');
 try{
  const{data:{session}}=await supabaseClient.auth.getSession();
  if(!session){body.textContent='Please log in.';return;}
  const{data,error}=await supabaseClient.from('payments').select('*').eq('user_id',session.user.id).order('created_at',{ascending:false});
  if(error){body.textContent='Could not load: '+error.message;return;}
  if(!data||!data.length){body.innerHTML='<p style="color:#666">No payments yet.</p>';return;}
  body.innerHTML=data.map(p=>'<div style="border:1px solid #e3e3e3;border-radius:12px;padding:12px 14px;margin-bottom:12px">'+
   '<div style="font-weight:bold;font-size:16px">'+(PURP[p.purpose]||p.purpose||'Payment')+'</div>'+
   '<div style="color:#ff6b00;font-weight:bold;font-size:18px;margin:4px 0">₦'+Number(p.amount||0).toLocaleString()+'</div>'+
   '<div style="font-size:14px;line-height:1.7">'+(STAT[p.status]||p.status||'')+'<br>Receipt no: <b>'+rno(p.id)+'</b><br>Your transfer reference: '+(p.reference?String(p.reference).replace(/</g,'&lt;'):'-')+'<br>Date: '+fd(p.created_at)+'</div></div>').join('');
 }catch(e){body.textContent='Could not load: '+e.message;}
}
function add(){
 if(document.getElementById('bqPayBtn'))return;
 const a=document.getElementById('bqPush');
 if(!a)return;
 a.insertAdjacentHTML('afterend','<button class="button" id="bqPayBtn" style="margin-top:10px;background:#0b6b3a">🧾 My payments</button>');
 document.getElementById('bqPayBtn').onclick=open;
}
setInterval(add,1000);
})();

/* ===== Profile screen: tidy button layout ===== */
(function(){
const ORDER=['bqAdBtn','bqMine','bqPayBtn','bqMyAds','bqBlocked','bqSavedBtn','bqPush','bqAlertBtn','bqHelpBtn'];
const ICON={bqMine:'📦 ',bqMyAds:'📊 ',bqBlocked:'🚫 '};
const LABEL={bqAdBtn:'📢 Advertise on BuyQora',bqMine:'📦 My listings',bqPayBtn:'🧾 My payments',bqMyAds:'📊 My ads',bqBlocked:'🚫 Blocked users',bqSavedBtn:'🔍 Saved searches',bqAlertBtn:'⚙️ Alert settings',bqHelpBtn:'💬 Help & Support'};
function css(b,full,bg,color,border){
 b.style.setProperty('margin','0','important');
 b.style.setProperty('width','100%','important');
 b.style.setProperty('min-height','62px','important');
 b.style.setProperty('padding','10px 8px','important');
 b.style.setProperty('border-radius','14px','important');
 b.style.setProperty('font-size','15px','important');
 b.style.setProperty('font-weight','bold','important');
 b.style.setProperty('line-height','1.3','important');
 b.style.setProperty('background',bg,'important');
 b.style.setProperty('color',color,'important');
 b.style.setProperty('border',border,'important');
 b.style.setProperty('grid-column',full?'1 / span 2':'auto','important');
}
function tidy(){
 const lo=document.getElementById('bqLogout');
 if(!lo)return;
 let g=document.getElementById('bqProfGrid');
 if(!g){
  lo.insertAdjacentHTML('beforebegin','<div id="bqProfTitle" style="margin:22px 0 10px;font-weight:bold;font-size:16px;color:#0b6b3a">My account</div><div id="bqProfGrid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px"></div>');
  g=document.getElementById('bqProfGrid');
 }
 const present=ORDER.map(id=>document.getElementById(id)).filter(Boolean);
 present.forEach((b,i)=>{if(g.children[i]!==b)g.insertBefore(b,g.children[i]||null);});
 ORDER.forEach(id=>{
  const b=document.getElementById(id);
  if(!b)return;
  if(LABEL[id]&&b.textContent!==LABEL[id])b.textContent=LABEL[id];
  if(id==='bqAdBtn')css(b,true,'#8e24aa','#fff','0');
  else if(id==='bqAlertBtn')css(b,false,'#fff','#0b6b3a','1.5px solid #0b6b3a');
  else if(id==='bqPush')css(b,false,'#e8f5ee','#0b6b3a','1.5px solid #0b6b3a');
  else css(b,false,'#fff','#0b6b3a','1.5px solid #0b6b3a');
 });
 css(lo,true,'#fff','#c0392b','1.5px solid #c0392b');
 lo.style.setProperty('margin-top','22px','important');
 lo.style.setProperty('min-height','50px','important');
}
setInterval(tidy,700);
})();

/* ===== Saved searches ===== */
(function(){
const g=id=>document.getElementById(id);
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const CL=()=>window.CATEGORY_LABELS||{};
function label(v){
 const a=[];
 if(v.q)a.push('"'+v.q+'"');
 if(v.cat&&v.cat!=='all')a.push((CL()[v.cat])||v.cat);
 if(v.st&&v.st!=='all')a.push(v.st);
 if(v.cond&&v.cond!=='all')a.push(v.cond==='new'?'New':'Used');
 if(v.city)a.push(v.city);
 if(v.min)a.push('from ₦'+Number(v.min).toLocaleString());
 if(v.max)a.push('up to ₦'+Number(v.max).toLocaleString());
 return a.join(' · ')||'All listings';
}
function view(){
 const v=window.bqGetView?window.bqGetView():{};
 v.min=g('bqMin')?g('bqMin').value.trim():'';
 v.max=g('bqMax')?g('bqMax').value.trim():'';
 v.city=g('bqCity')?g('bqCity').value.trim():'';
 return v;
}
async function save(){
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){if(window.openAuth)openAuth('login');return;}
 const v=view();
 const name=prompt('Name this search',label(v).slice(0,40));
 if(name===null)return;
 const{error}=await supabaseClient.from('saved_searches').insert({user_id:session.user.id,name:name.trim()||label(v).slice(0,40),view:v});
 alert(error?('Could not save: '+error.message):'Search saved. Find it in Profile → Saved searches.');
}
function addSaveBtn(){
 if(g('bqSaveSearch'))return;
 const a=document.querySelector('.bq-filter2');
 if(!a)return;
 a.insertAdjacentHTML('afterend','<div style="padding:0 14px 8px"><button id="bqSaveSearch" style="background:#fff;color:#0b6b3a;border:1.5px solid #0b6b3a;border-radius:12px;padding:9px 14px;font-weight:bold;font-size:14px">💾 Save this search</button></div>');
 g('bqSaveSearch').onclick=save;
}
function closeOv(){const o=g('bqSavedOv');if(o)o.remove();}
function runSearch(v){
 closeOv();
 try{if(window.closeProfile)closeProfile();else{const p=g('profileOverlay');if(p)p.classList.remove('show');}}catch(e){}
 if(g('bqMin'))g('bqMin').value=v.min||'';
 if(g('bqMax'))g('bqMax').value=v.max||'';
 if(g('bqCity'))g('bqCity').value=v.city||'';
 if(window.bqSetView)window.bqSetView({cat:v.cat||'all',sub:v.sub||'all',st:v.st||'all',cond:v.cond||'all',sort:v.sort||'new',q:v.q||''});
 const h=document.querySelector('#products h2');if(h)h.scrollIntoView({behavior:'smooth'});
}
async function openSaved(){
 closeOv();
 const ov=document.createElement('div');ov.id='bqSavedOv';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:#fff;overflow-y:auto;padding:16px;color:#222;font-family:inherit';
 ov.innerHTML='<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><button id="bqSavedX" style="font-size:30px;background:none;border:0;padding:6px 10px;color:#222">←</button><h2 style="margin:0;font-size:20px">Saved searches</h2></div><div id="bqSavedBody">Loading...</div>';
 document.body.appendChild(ov);
 g('bqSavedX').onclick=closeOv;
 const body=g('bqSavedBody');
 try{
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session){body.textContent='Please log in.';return;}
 const{data,error}=await supabaseClient.from('saved_searches').select('*').eq('user_id',session.user.id).order('created_at',{ascending:false});
 if(error){body.textContent='Could not load: '+error.message;return;}
 if(!data||!data.length){body.innerHTML='<p style="color:#666">No saved searches yet. On the home page, set your search or filters, then tap "Save this search".</p>';return;}
 body.innerHTML=data.map(r=>'<div style="border:1px solid #e3e3e3;border-radius:12px;padding:12px 14px;margin-bottom:12px"><div style="font-weight:bold;font-size:16px">'+esc(r.name)+'</div><div style="color:#666;font-size:14px;margin:4px 0 10px">'+esc(label(r.view||{}))+'</div><button data-open="'+r.id+'" style="background:#0b6b3a;color:#fff;border:0;border-radius:10px;padding:10px 18px;font-weight:bold;font-size:15px;margin-right:10px">Open</button><button data-del="'+r.id+'" style="background:#fff;color:#c0392b;border:1.5px solid #c0392b;border-radius:10px;padding:9px 16px;font-weight:bold;font-size:15px">Delete</button></div>').join('');
 body.onclick=async e=>{
  const o=e.target.closest('[data-open]'),d=e.target.closest('[data-del]');
  if(o){const r=data.find(x=>String(x.id)===o.dataset.open);if(r)runSearch(r.view||{});}
  if(d){if(!confirm('Delete this saved search?'))return;const{error:de}=await supabaseClient.from('saved_searches').delete().eq('id',d.dataset.del);if(de){alert('Could not delete: '+de.message);return;}openSaved();}
 };
 }catch(e){body.textContent='Could not load: '+(e&&e.message?e.message:e);}
}
function addTile(){
 if(g('bqSavedBtn'))return;
 const a=g('bqPayBtn')||g('bqBlocked');
 if(!a)return;
 a.insertAdjacentHTML('afterend','<button class="button" id="bqSavedBtn">🔍 Saved searches</button>');
 g('bqSavedBtn').onclick=openSaved;
}
setInterval(()=>{addSaveBtn();addTile();},1000);
})();

/* ===== Alert settings ===== */
(function(){
const g=id=>document.getElementById(id);
function closeOv(){const o=g('bqAlertOv');if(o)o.remove();}
function row(id,title,sub,on){
 return '<label style="display:flex;align-items:center;gap:14px;border:1px solid #e3e3e3;border-radius:12px;padding:14px;margin-bottom:12px"><input type="checkbox" id="'+id+'" '+(on?'checked':'')+' style="width:26px;height:26px;flex:none"><span><b style="font-size:16px">'+title+'</b><br><span style="color:#666;font-size:14px">'+sub+'</span></span></label>';
}
async function openAlerts(){
 closeOv();
 const ov=document.createElement('div');ov.id='bqAlertOv';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:#fff;overflow-y:auto;padding:16px;color:#222;font-family:inherit';
 ov.innerHTML='<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><button id="bqAlertX" style="font-size:30px;background:none;border:0;padding:6px 10px;color:#222">←</button><h2 style="margin:0;font-size:20px">Alert settings</h2></div><div id="bqAlertBody">Loading...</div>';
 document.body.appendChild(ov);
 g('bqAlertX').onclick=closeOv;
 const body=g('bqAlertBody');
 try{
  const{data:{session}}=await supabaseClient.auth.getSession();
  if(!session){body.textContent='Please log in.';return;}
  const uid=session.user.id;
  const r1=await supabaseClient.from('notification_prefs').select('*').eq('user_id',uid).maybeSingle();
  if(r1.error){body.textContent='Could not load: '+r1.error.message;return;}
  const pr=r1.data||{};
  let st='';
  try{const r2=await supabaseClient.from('profiles').select('state').eq('id',uid).maybeSingle();st=(r2.data&&r2.data.state)||'';}catch(e){}
  const nl=pr.new_listings!==false,so=!!pr.my_state_only;
  body.innerHTML=row('bqAlNew','New listing alerts','Get a phone alert when someone posts a new listing.',nl)+row('bqAlState','Only my state','Only alert me about listings in '+(st||'your state')+(st?'':' (set your state in Profile first)')+'.',so)+'<p id="bqAlMsg" style="color:#0b6b3a;font-weight:bold;min-height:22px"></p><p style="color:#666;font-size:13.5px">To receive phone alerts, also turn on "Turn on phone alerts" in your Profile.</p>';
  async function save(){
   const m=g('bqAlMsg');m.textContent='Saving...';
   const{error}=await supabaseClient.from('notification_prefs').upsert({user_id:uid,new_listings:g('bqAlNew').checked,my_state_only:g('bqAlState').checked,updated_at:new Date().toISOString()},{onConflict:'user_id'});
   m.textContent=error?('Could not save: '+error.message):'Saved ✓';
  }
  g('bqAlNew').onchange=save;g('bqAlState').onchange=save;
 }catch(e){body.textContent='Could not load: '+(e&&e.message?e.message:e);}
}
function addTile(){
 if(g('bqAlertBtn'))return;
 const a=g('bqPush');
 if(!a)return;
 a.insertAdjacentHTML('afterend','<button class="button" id="bqAlertBtn">⚙️ Alert settings</button>');
 g('bqAlertBtn').onclick=openAlerts;
}
setInterval(addTile,1000);
})();

/* ===== Bottom menu stays visible on every screen ===== */
(function(){
const nav=document.getElementById('bqNav');
if(!nav)return;
const css=document.createElement('style');
css.textContent=
 '#bqNav{z-index:100000 !important}'+
 '.modal-overlay,#bqPayOv,#bqSavedOv,#bqAlertOv{bottom:var(--bqnavh,72px) !important;height:auto !important}'+
 'html body .modal-overlay:not(#chatOverlay)>.modal,html body #chatOverlay>.modal,html body #inboxOverlay>.modal{bottom:var(--bqnavh,72px) !important;height:auto !important;overflow-y:auto !important}'+
 'html body #chatOverlay>.modal{overflow-y:hidden !important}'+
 '#profileOverlay .modal{padding-bottom:30px !important}'+
 'html body .modal-overlay.show{background:#f5f7f6 !important}'+
 'html body.bq-kb .modal-overlay:not(#chatOverlay)>.modal,html body.bq-kb #chatOverlay>.modal,html body.bq-kb #inboxOverlay>.modal{bottom:0 !important}'+
 'body.bq-kb #bqNav{display:none !important}'+
 'body.bq-kb .modal-overlay,body.bq-kb #bqPayOv,body.bq-kb #bqSavedOv,body.bq-kb #bqAlertOv{bottom:0 !important}';
document.head.appendChild(css);
function size(){const r=nav.getBoundingClientRect();const h=Math.round(document.documentElement.clientHeight-r.top);if(h>20&&h<260)document.documentElement.style.setProperty('--bqnavh',h+'px');}
size();window.addEventListener('resize',size);setInterval(size,1500);
/* hide the menu while typing so the keyboard has room */
let t;
document.addEventListener('focusin',e=>{const k=e.target&&e.target.tagName;if(k==='INPUT'||k==='TEXTAREA'){clearTimeout(t);if(e.target.type!=='checkbox'&&e.target.type!=='file'&&e.target.type!=='radio')document.body.classList.add('bq-kb');}});
document.addEventListener('focusout',()=>{clearTimeout(t);t=setTimeout(()=>document.body.classList.remove('bq-kb'),250);});
/* hide the menu under the full-screen photo viewer */
setInterval(()=>{const v=document.getElementById('bqViewer');nav.style.visibility=(v&&v.style.display!=='none'&&v.style.display!=='')?'hidden':'';},500);
/* tapping a menu button first closes whatever screen is open */
document.addEventListener('click',e=>{
 const b=e.target&&e.target.closest?e.target.closest('#bqNav [data-n]'):null;
 if(!b)return;
 document.querySelectorAll('.modal-overlay.show').forEach(o=>o.classList.remove('show'));
 ['bqPayOv','bqSavedOv','bqAlertOv','bqCatScr','bqSetScr'].forEach(id=>{const o=document.getElementById(id);if(o)o.remove();});
 try{document.body.style.overflow='';}catch(x){}
},true);
})();

/* ===== Choose a promotion while posting ===== */
(function(){
const g=id=>document.getElementById(id);
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const naira=n=>'₦'+Number(n||0).toLocaleString();
let pkgs=[],chosen='none',loaded=false;
function draw(){
 const box=g('bqPostPromo');if(!box)return;
 const card=(id,name,desc,right,on)=>'<div data-pp="'+id+'" style="border:2px solid '+(on?'#0b6b3a':'#ddd')+';background:'+(on?'#f0f9f4':'#fff')+';border-radius:12px;padding:12px 14px;margin-bottom:10px;cursor:pointer"><div style="display:flex;justify-content:space-between;gap:10px"><b style="font-size:16px">'+esc(name)+'</b><span style="color:#ff6b00;font-weight:bold;white-space:nowrap">'+right+'</span></div>'+(desc?'<div style="color:#555;font-size:13.5px;margin-top:5px;line-height:1.45">'+esc(desc)+'</div>':'')+'</div>';
 box.innerHTML='<div style="font-weight:bold;font-size:17px;margin:18px 0 4px;color:#0b6b3a">Promote your ad (optional)</div><div style="color:#666;font-size:13.5px;margin-bottom:10px">Get more views and sell faster. You choose how long and pay after posting.</div>'+
  card('none','No promo','Post a normal listing. Your ad stays live for free for the standard period.','Free',chosen==='none')+
  pkgs.map(p=>card(p.id,p.name,p.description,naira(p.price_7d)+' / 7 days',chosen===p.id)).join('');
}
async function load(){
 if(loaded)return;loaded=true;
 try{const{data}=await supabaseClient.from('promotion_packages').select('*').eq('active',true).order('sort_order');pkgs=data||[];}catch(e){}
 draw();
}
function add(){
 const b=g('sellSubmitBtn');
 if(!b||g('bqPostPromo'))return;
 b.insertAdjacentHTML('beforebegin','<div id="bqPostPromo"></div>');
 g('bqPostPromo').onclick=e=>{const c=e.target.closest('[data-pp]');if(!c)return;chosen=c.dataset.pp;draw();};
 draw();load();
}
setInterval(add,800);
/* after a successful post, open the promotion payment for the new listing */
async function afterPost(){
 const pick=chosen;
 if(pick==='none')return;
 const{data:{session}}=await supabaseClient.auth.getSession();
 if(!session)return;
 const{data}=await supabaseClient.from('listings').select('id,status,created_at').eq('seller_id',session.user.id).order('created_at',{ascending:false}).limit(1);
 const l=data&&data[0];
 if(!l||Date.now()-new Date(l.created_at)>120000)return;
 chosen='none';draw();
 if(l.status!=='active'){setTimeout(()=>alert('Your listing goes live after your ₦1,800 posting payment is confirmed. After that, open My listings and tap Promote to add your promotion.'),1500);return;}
 setTimeout(()=>{
  const box=g('myList');if(!box)return;
  const tmp=document.createElement('button');tmp.dataset.a='promote';tmp.dataset.id=l.id;tmp.style.display='none';
  box.appendChild(tmp);tmp.click();tmp.remove();
  let n=0;const t=setInterval(()=>{
   const ov=g('promoOverlay');
   if(ov&&ov.classList.contains('show')){const c=ov.querySelector('[data-p="'+pick+'"]');if(c)c.click();clearInterval(t);}
   else if(++n>20)clearInterval(t);
  },300);
 },1400);
}
let last='';
const ok=g('sellSuccess');
if(ok)new MutationObserver(()=>{
 const t=ok.textContent||'';
 if(ok.style.display!=='none'&&t!==last&&/Listing (posted|saved)/.test(t)){last=t;afterPost();}
 if(ok.style.display==='none')last='';
}).observe(ok,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:['style']});
})();

/* ===== Help & Support tile in Profile ===== */
(function(){
function add(){
 if(document.getElementById('bqHelpBtn'))return;
 const a=document.getElementById('bqAlertBtn')||document.getElementById('bqPush');
 if(!a)return;
 a.insertAdjacentHTML('afterend','<button class="button" id="bqHelpBtn">💬 Help & Support</button>');
 document.getElementById('bqHelpBtn').onclick=function(){
  const l=document.querySelector('#legalLinks [data-l="contact"]');
  if(l)l.click();
 };
}
setInterval(add,1000);
})();

/* ===== Guarantee: the end of every screen scrolls clear of the bottom menu ===== */
(function(){
function fix(){
 const nav=document.getElementById('bqNav');
 if(!nav)return;
 const navTop=nav.getBoundingClientRect().top;
 document.querySelectorAll('.modal-overlay.show>.modal').forEach(m=>{
  if(m.parentElement.id==='chatOverlay')return;
  let sp=m.querySelector(':scope>.bqSpacer');
  if(!sp){sp=document.createElement('div');sp.className='bqSpacer';}
  if(m.lastElementChild!==sp)m.appendChild(sp);
  const covered=m.getBoundingClientRect().bottom>navTop+2;
  const h=covered?(nav.offsetHeight+28):20;
  if(sp.dataset.h!==String(h)){sp.dataset.h=h;sp.style.cssText='height:'+h+'px;flex:none;width:100%';}
 });
}
setInterval(fix,600);
})();

/* ===== Dogs & Cats: Filters button + screen (breed, gender) ===== */
(function(){
let sel={breed:'',gender:''},lastSub='';
const BREEDS={an_dogs:['Rottweiler','German Shepherd','Lhasa Apso','Caucasian Shepherd','Cane Corso','Boerboel','Other'],an_cats:['Persian','Siamese','Maine Coon','Other']};
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
window.bqExtraFilter=function(l){
 if(!sel.breed&&!sel.gender)return true;
 const d=(l&&l.details&&typeof l.details==='object')?l.details:{};
 if(sel.breed){
  const known=(BREEDS[l.subcategory]||[]).filter(x=>x!=='Other');
  const b=d.breed||'';
  if(sel.breed==='Other'){if(!b||known.indexOf(b)>-1)return false;}
  else if(b!==sel.breed)return false;
 }
 if(sel.gender&&d.gender!==sel.gender)return false;
 return true;
};
function chip(k,v,on){return '<button data-k="'+k+'" data-v="'+esc(v)+'" style="padding:11px 18px;margin:0 8px 10px 0;border-radius:22px;font-size:16px;font-weight:600;border:1.5px solid '+(on?'#0b6b3a':'#cfd8d3')+';background:'+(on?'#0b6b3a':'#fff')+';color:'+(on?'#fff':'#333')+'">'+esc(v)+'</button>';}
function closeOv(){const o=document.getElementById('bqPetOv');if(o)o.remove();}
function openOv(sub){
 closeOv();
 const tmp={breed:sel.breed,gender:sel.gender};
 const ov=document.createElement('div');ov.id='bqPetOv';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:#fff;overflow-y:auto;padding:16px 16px 110px;color:#222;font-family:inherit';
 function paint(){
  ov.innerHTML='<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px"><button id="bqPetX" style="font-size:30px;background:none;border:0;padding:6px 10px;color:#222">←</button><h2 style="margin:0;font-size:20px">Filters</h2></div>'+
  '<div style="font-weight:bold;margin:12px 0 10px">Breed</div><div>'+BREEDS[sub].map(x=>chip('breed',x,tmp.breed===x)).join('')+'</div>'+
  '<div style="font-weight:bold;margin:14px 0 10px">Gender</div><div>'+['Male','Female'].map(x=>chip('gender',x,tmp.gender===x)).join('')+'</div>'+
  '<div style="position:fixed;left:0;right:0;bottom:0;background:#fff;padding:12px 16px;border-top:1px solid #e3e3e3;display:flex;gap:10px"><button id="bqPetClear" style="flex:1;padding:14px;border-radius:12px;border:1.5px solid #0b6b3a;background:#fff;color:#0b6b3a;font-weight:bold;font-size:16px">Clear</button><button id="bqPetApply" style="flex:2;padding:14px;border-radius:12px;border:0;background:#0b6b3a;color:#fff;font-weight:bold;font-size:16px">Show results</button></div>';
  document.getElementById('bqPetX').onclick=closeOv;
  document.getElementById('bqPetClear').onclick=()=>{tmp.breed='';tmp.gender='';paint();};
  document.getElementById('bqPetApply').onclick=()=>{sel={breed:tmp.breed,gender:tmp.gender};closeOv();if(window.renderListings)window.renderListings();const b=document.getElementById('bqPetBar');if(b)b.dataset.sig='';draw();};
  ov.querySelectorAll('button[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k,v=b.dataset.v;tmp[k]=tmp[k]===v?'':v;paint();});
 }
 paint();document.body.appendChild(ov);
}
const ICON={an_dogs:'🐕',an_cats:'🐈'};
function sheet(){
 closeOv();
 const ov=document.createElement('div');ov.id='bqPetOv';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.45);display:flex;align-items:flex-end';
 ov.innerHTML='<div style="background:#fff;width:100%;border-radius:18px 18px 0 0;padding:18px 16px 30px"><div style="font-weight:bold;font-size:18px;margin-bottom:12px">Gender</div>'+['Male','Female'].map(x=>'<button data-g="'+x+'" style="display:block;width:100%;text-align:left;padding:14px;margin-bottom:8px;border-radius:12px;font-size:17px;border:1.5px solid '+(sel.gender===x?'#0b6b3a':'#e0e0e0')+';background:'+(sel.gender===x?'#e8f5ee':'#fff')+';color:#222">'+x+'</button>').join('')+'<button data-g="" style="display:block;width:100%;padding:14px;border-radius:12px;font-size:16px;border:0;background:#f1f1f1;color:#444">Any gender</button></div>';
 ov.onclick=e=>{const g=e.target.closest('[data-g]');if(g){sel.gender=g.dataset.g;closeOv();if(window.renderListings)window.renderListings();const bb=document.getElementById('bqPetBar');if(bb)bb.dataset.sig='';draw();return;}if(e.target===ov)closeOv();};
 document.body.appendChild(ov);
}
function pill(txt,on,act){return '<button data-act="'+act+'" style="flex:none;padding:10px 16px;border-radius:12px;font-size:15px;font-weight:600;border:1.5px solid '+(on?'#0b6b3a':'#cfd8d3')+';background:'+(on?'#e8f5ee':'#fff')+';color:'+(on?'#0b6b3a':'#333')+'">'+txt+'</button>';}
function draw(){
 let sub='all';try{sub=window.bqGetView().sub;}catch(e){}
 let bar=document.getElementById('bqPetBar');
 const list=BREEDS[sub];
 if(sub!==lastSub){lastSub=sub;sel={breed:'',gender:''};if(window.renderListings)window.renderListings();}
 if(!list){if(bar)bar.remove();return;}
 const h=document.querySelector('#products h2');if(!h)return;
 if(!bar){
  bar=document.createElement('div');bar.id='bqPetBar';bar.style.cssText='margin:6px 0 12px';h.insertAdjacentElement('afterend',bar);
  bar.onclick=e=>{
   const t=e.target.closest('[data-breed]');
   if(t){const v=t.dataset.breed;sel.breed=sel.breed===v?'':v;bar.dataset.sig='';if(window.renderListings)window.renderListings();draw();return;}
   const p=e.target.closest('[data-act]');if(!p)return;
   const act=p.dataset.act;
   if(act==='more')openOv(lastSub);
   else if(act==='gender')sheet();
   else if(act==='xgender'){sel.gender='';bar.dataset.sig='';if(window.renderListings)window.renderListings();draw();}
   else if(act==='xbreed'){sel.breed='';bar.dataset.sig='';if(window.renderListings)window.renderListings();draw();}
  };
 }
 const sig=sub+'|'+sel.breed+'|'+sel.gender;
 if(bar.dataset.sig===sig)return;bar.dataset.sig=sig;
 const top3=list.slice(0,3);
 const tile=(lbl,ic,on,attr)=>'<button '+attr+' style="padding:10px 4px 8px;border-radius:14px;background:#fff;border:2px solid '+(on?'#0b6b3a':'#e3e8e5')+';display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0"><span style="width:52px;height:52px;border-radius:50%;background:'+(on?'#e8f5ee':'#f1f4f2')+';display:flex;align-items:center;justify-content:center;font-size:28px">'+ic+'</span><span style="font-size:13px;font-weight:600;color:#222;line-height:1.2;max-width:100%;word-break:break-word;text-align:center">'+esc(lbl)+'</span></button>';
 let html='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:10px">'+top3.map(x=>tile(x,ICON[sub]||'🐾',sel.breed===x,'data-breed="'+esc(x)+'"')).join('')+tile('Other','⋯',false,'data-act="more"')+'</div>';
 html+='<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">';
 if(sel.breed&&top3.indexOf(sel.breed)<0)html+=pill('✓ '+esc(sel.breed)+' ✕',true,'xbreed');
 html+=sel.gender?pill('✓ '+esc(sel.gender)+' ✕',true,'xgender'):pill('Gender ▾',false,'gender');
 html+=pill('More ▾',!!sel.breed&&top3.indexOf(sel.breed)<0,'more')+'</div>';
 bar.innerHTML=html;
}
setInterval(draw,600);
})();

/* ===== Sub-category opens its own screen (like Jiji) ===== */
(function(){
const $=id=>document.getElementById(id);
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
{const st=document.createElement('style');st.textContent='body.bq-kb #bqCatScr{bottom:0 !important}';document.head.appendChild(st);}
const yrs=[];for(let y=new Date().getFullYear()+1;y>=1990;y--)yrs.push(String(y));
const nums=['1','2','3','4','5','6','7','8+'];
const ages=['Under 1 month','1-3 months','3-6 months','6-12 months','1-2 years','2+ years'];
const DOGB=['Rottweiler','German Shepherd','Lhasa Apso','Caucasian Shepherd','Cane Corso','Boerboel','Alsatian','Pitbull','Husky','Poodle','Local / Mixed','Other'];
const CATB=['Persian','Siamese','Maine Coon','British Shorthair','Local / Mixed','Other'];
const CARB=['Toyota','Honda','Lexus','Mercedes-Benz','Hyundai','Kia','Nissan','Ford','Peugeot','Volkswagen','BMW','Mazda','Suzuki','Other'];
const PHB=['Apple (iPhone)','Samsung','Tecno','Infinix','Itel','Xiaomi','Oppo','Nokia','Huawei','Google Pixel','Other'];
const ELB=['Apple','Samsung','JBL','HP','Dell','Lenovo','LG','Sony','Hisense','TCL','Other'];
const ACCT=['Power Bank','Cases','Stands & Holders','Chargers & Cables','Screen Protectors','Memory Cards','Other'];
/* tiles: key stored in details, full list, 3 shown tiles, word */
const TILES={
 an_dogs:{k:'breed',all:DOGB,top:['Rottweiler','German Shepherd','Lhasa Apso','Caucasian Shepherd','Cane Corso','Boerboel'],w:'Breed',ic:'🐕'},
 an_cats:{k:'breed',all:CATB,top:['Persian','Siamese','Maine Coon','British Shorthair'],w:'Breed',ic:'🐈'},
 cars:{k:'make',all:CARB,top:['Toyota','Honda','Lexus','Mercedes-Benz','Hyundai','Kia'],w:'Make'},
 buses:{k:'make',all:CARB,top:['Toyota','Hyundai','Honda','Mercedes-Benz','Kia','Nissan'],w:'Make'},
 trucks:{k:'make',all:CARB,top:['Toyota','Ford','Nissan','Mercedes-Benz','Hyundai','Kia'],w:'Make'},
 motorcycles:{k:'make',all:CARB,top:['Honda','Suzuki','Toyota','Kia','Hyundai'],w:'Make'},
 ph_phones:{k:'brand',all:PHB,top:['Apple (iPhone)','Samsung','Tecno','Infinix','Itel','Xiaomi'],w:'Brand'},
 ph_tablets:{k:'brand',all:PHB,top:['Apple (iPhone)','Samsung','Tecno','Huawei','Xiaomi'],w:'Brand'},
 el_laptops:{k:'brand',all:ELB,top:['Apple','HP','Dell','Lenovo','Samsung','Sony'],w:'Brand'},
 el_tv:{k:'brand',all:ELB,top:['Samsung','LG','Sony','Hisense','TCL'],w:'Brand'},
 el_audio:{k:'brand',all:ELB,top:['Sony','Samsung','LG'],w:'Brand'},
 el_head:{k:'brand',all:ELB,top:['Apple','JBL','Samsung'],w:'Brand'},
 ph_acc:{k:'type',all:ACCT,top:['Power Bank','Cases','Stands & Holders'],w:'Type'},
 el_cam:{k:'brand',all:ELB,top:['Sony','Samsung','Apple'],w:'Brand'},
 el_games:{k:'brand',all:ELB,top:['Sony','Samsung','Apple'],w:'Brand'}
};
/* extra filter buttons: k, label, type s=choose t=type, opts */
const VEH=[{k:'year',l:'Year',t:'s',o:yrs},{k:'transmission',l:'Transmission',t:'s',o:['Automatic','Manual']},{k:'fuel',l:'Fuel',t:'s',o:['Petrol','Diesel','Electric','Hybrid','Gas']}];
const PRO=[{k:'bedrooms',l:'Bedrooms',t:'s',o:nums},{k:'bathrooms',l:'Bathrooms',t:'s',o:nums},{k:'furnished',l:'Furnished',t:'s',o:['Yes','No','Semi-furnished']}];
const PHX=[{k:'storage',l:'Storage',t:'s',o:['16GB','32GB','64GB','128GB','256GB','512GB','1TB']},{k:'color',l:'Color',t:'t'}];
const FAS=[{k:'size',l:'Size',t:'t'},{k:'color',l:'Color',t:'t'}];
const PETX=[{k:'gender',l:'Gender',t:'s',o:['Male','Female']},{k:'age',l:'Age',t:'s',o:ages}];
const EXTRA={an_dogs:PETX,an_cats:PETX,cars:VEH,buses:VEH,trucks:VEH,motorcycles:VEH,new_builds:PRO,rent_homes:PRO,sale_homes:PRO,short_let:PRO,ph_phones:PHX,ph_tablets:PHX,fa_women:FAS,fa_men:FAS,fa_shoes:FAS,fa_bags:[{k:'color',l:'Color',t:'t'}],fa_trad:FAS};
const NOCOND={animals:1,services:1,jobs:1,food:1};
let st='all',cat='',sub='',tileSel='',vals={},cond='',pmin='',pmax='',sort='new',pop=null,q='',onlyVer=false,view='grid',profs={},shown=[];
function close(){const o=$('bqCatScr');if(o)o.remove();}
function base(){return (currentListings||[]).filter(l=>l.category_id===cat&&(sub==='all'||l.subcategory===sub));}
function det(l){return (l&&l.details&&typeof l.details==='object')?l.details:{};}
function matches(l){
 if(st!=='all'&&l.state!==st)return false;
 if(onlyVer){const p=profs[l.seller_id];if(!p||p.verification_status!=='verified')return false;}
 if(q){const t=((l.title||'')+' '+(l.description||'')).toLowerCase();if(t.indexOf(q)<0)return false;}
 if(cond&&l.condition!==cond)return false;
 const pr=Number(l.price);if(pmin!==''&&pr<Number(pmin))return false;if(pmax!==''&&pr>Number(pmax))return false;
 const d=det(l),T=TILES[sub];
 if(T&&tileSel){const known=T.all.filter(x=>x!=='Other');const b=d[T.k]||'';
  if(tileSel==='Other'){if(!b||known.indexOf(b)>-1)return false;}else if(b!==tileSel)return false;}
 for(const f of (EXTRA[sub]||[])){const v=vals[f.k];if(!v)continue;const x=String(d[f.k]||'');
  if(f.t==='s'){if(x!==v)return false;}else if(x.toLowerCase().indexOf(v.toLowerCase())<0)return false;}
 return true;
}
function since(t){
 if(!t)return '';const m=Math.max(0,Math.floor((Date.now()-new Date(t).getTime())/2592000000));
 if(m<1)return 'New on BuyQora';if(m<12)return m+' month'+(m>1?'s':'')+' on BuyQora';const y=Math.floor(m/12);return y+' year'+(y>1?'s':'')+' on BuyQora';
}
async function loadProfs(){
 const ids=[...new Set(base().map(l=>l.seller_id).filter(x=>x&&!profs[x]))];
 if(!ids.length)return;
 try{const{data}=await supabaseClient.from('profiles').select('id,full_name,business_name,logo_url,verification_status,created_at').in('id',ids);
  (data||[]).forEach(p=>{profs[p.id]=p;});ids.forEach(x=>{if(!profs[x])profs[x]={id:x};});
  try{const{data:rv}=await supabaseClient.from('reviews').select('seller_id,rating').in('seller_id',ids);const rs2={};(rv||[]).forEach(r=>{(rs2[r.seller_id]=rs2[r.seller_id]||[]).push(Number(r.rating));});ids.forEach(x=>{const a=rs2[x];if(a&&a.length){profs[x].avg=a.reduce((m,n)=>m+n,0)/a.length;profs[x].cnt=a.length;}});}catch(e){}
  if($('bqCatScr'))paint();}catch(e){}
}
function card(l,i){
 const p=profs[l.seller_id]||{};const ver=p.verification_status==='verified';
 const nm=p.business_name||p.full_name||'Seller';
 const img='<div class="product-image" style="'+(view==='list'?'width:130px;flex:0 0 130px;height:130px':'')+'">'+(l.image_url?'<img src="'+esc(l.image_url)+'" alt="" loading="lazy">':(CATEGORY_ICONS[l.category_id]||'🛍️'))+(l.condition?'<span class="bq-cond '+esc(l.condition)+'">'+(l.condition==='new'?'New':'Used')+'</span>':'')+'</div>';
 const info='<div style="min-width:0;flex:1"><p class="price" style="margin:6px 0 2px;color:#0b6b3a;font-weight:bold">₦'+Number(l.price).toLocaleString()+'</p><h3 style="margin:0 0 3px;font-size:15px;line-height:1.3">'+esc(l.title)+'</h3><p class="loc" style="margin:0 0 6px">'+esc((l.city||l.state||'')+(l.condition?' • '+(l.condition==='new'?'Brand New':'Used'):''))+'</p>'+
  '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px">'+(ver?'<span style="font-size:12px;font-weight:600;padding:3px 8px;border-radius:12px;background:#e8f5ee;color:#0b6b3a">✔ Verified</span>':'')+(p.created_at?'<span style="font-size:12px;padding:3px 8px;border-radius:12px;background:#f1f4f2;color:#444">'+esc(since(p.created_at))+'</span>':'')+'</div>'+
  (nm?'<div style="display:flex;align-items:center;gap:6px;font-size:13px;color:#444"><span style="width:22px;height:22px;border-radius:50%;background:#dfe7e2;flex:0 0 22px;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold">'+(p.logo_url?'<img src="'+esc(p.logo_url)+'" alt="" style="width:100%;height:100%;object-fit:cover">':esc(nm.charAt(0).toUpperCase()))+'</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(nm)+'</span>'+(p.avg?'<span style="margin-left:auto;font-weight:600;white-space:nowrap"><span style="color:#f5a623">★</span> '+p.avg.toFixed(1)+'</span>':'')+'</div>':'')+'</div>';
 return '<div class="product" data-i="'+i+'" style="'+(view==='list'?'display:flex;gap:12px;align-items:flex-start;padding:10px':'')+'">'+img+info+'</div>';
}
function save(){try{sessionStorage.setItem('bqCatScr',JSON.stringify({cat,sub,st,tileSel,vals,cond,pmin,pmax,sort,q,onlyVer,view}));}catch(e){}}
function paint(){
 const body=$('bqCatBody');if(!body)return;
 save();
 const T=TILES[sub],X=EXTRA[sub]||[];
 let f=base().filter(matches);
 if(sort==='lo')f.sort((a,b)=>Number(a.price)-Number(b.price));
 else if(sort==='hi')f.sort((a,b)=>Number(b.price)-Number(a.price));
 else f.sort((a,b)=>new Date(b.created_at||0)-new Date(a.created_at||0));
 shown=f;
 const tile=(lbl,ic,on,attr)=>'<button '+attr+' style="flex:none;width:calc(25% - 6px);padding:10px 4px 8px;border-radius:14px;background:#fff;border:2px solid '+(on?'#0b6b3a':'#e3e8e5')+';display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0"><span style="width:52px;height:52px;border-radius:50%;background:'+(on?'#e8f5ee':'#f1f4f2')+';display:flex;align-items:center;justify-content:center;font-size:28px">'+ic+'</span><span style="font-size:12.5px;font-weight:600;color:#222;line-height:1.2;max-width:100%;min-height:2.4em;white-space:normal;word-break:break-word;text-align:center">'+esc(lbl)+'</span></button>';
 const pill=(t,on,act)=>'<button data-act="'+act+'" style="flex:none;padding:8px 13px;border-radius:12px;font-size:14px;font-weight:600;border:1.5px solid '+(on?'#0b6b3a':'#cfd8d3')+';background:'+(on?'#e8f5ee':'#fff')+';color:'+(on?'#0b6b3a':'#333')+'">'+t+'</button>';
 let top='';
 if(T)top+='<div style="display:flex;gap:8px;overflow-x:auto;padding:12px 12px 4px">'+T.top.map(x=>tile(x,T.ic||('<b style="font-size:26px;color:#0b6b3a">'+esc(String(x).charAt(0))+'</b>'),tileSel===x,'data-tile="'+esc(x)+'"')).join('')+tile('Other','⋯',false,'data-act="o:tile"')+'</div>';
 top+='<div style="display:flex;flex-wrap:wrap;gap:8px;padding:10px 12px 4px">';
 top+=(st!=='all')?pill('📍 '+esc(st)+' ✕',true,'x:state'):pill('📍 State ▾',false,'o:state');
 if(T&&tileSel&&T.top.indexOf(tileSel)<0)top+=pill('✓ '+esc(tileSel)+' ✕',true,'x:tile');
 X.forEach(fd=>{const v=vals[fd.k];top+=v?pill('✓ '+esc(v)+' ✕',true,'x:'+fd.k):pill(esc(fd.l)+' ▾',false,'o:'+fd.k);});
 if(!NOCOND[cat])top+=cond?pill('✓ '+(cond==='new'?'New':'Used')+' ✕',true,'x:cond'):pill('Condition ▾',false,'o:cond');
 top+=(pmin!==''||pmax!=='')?pill('✓ ₦'+esc(pmin||'0')+(pmax!==''?'–'+esc(pmax):'+')+' ✕',true,'x:price'):pill('Price ▾',false,'o:price');
 top+=onlyVer?pill('✓ Verified sellers ✕',true,'x:ver'):pill('Verified sellers ▾',false,'o:ver');
 if(T)top+=pill('More ▾',false,'o:tile');
 top+='</div>';
 const wrap=inner=>'<div data-act="shClose" style="position:fixed;left:0;right:0;top:0;bottom:var(--bqnavh,72px);z-index:5;background:rgba(0,0,0,.45);display:flex;align-items:flex-end"><div style="background:#fff;width:100%;max-height:78%;overflow-y:auto;border-radius:18px 18px 0 0;padding:18px 16px 24px">'+inner+'</div></div>';
 const head=t=>'<div style="font-weight:bold;font-size:18px;margin-bottom:12px">'+esc(t)+'</div>';
 const opt=(attr,txt,on)=>'<button '+attr+' style="display:block;width:100%;text-align:left;padding:14px;margin-bottom:8px;border-radius:12px;font-size:17px;border:1.5px solid '+(on?'#0b6b3a':'#e0e0e0')+';background:'+(on?'#e8f5ee':'#fff')+';color:#222">'+esc(txt)+'</button>';
 const anyb=attr=>'<button '+attr+' style="display:block;width:100%;padding:14px;border-radius:12px;font-size:16px;border:0;background:#f1f1f1;color:#444">Any</button>';
 let sheet='';
 const stOpts=[];try{const so=$('bqState');if(so)for(const o of so.options){if(o.value&&o.value!=='all')stOpts.push(o.value);}}catch(e){}
 const inSt=base().filter(l=>st==='all'||l.state===st);const nVer=inSt.filter(l=>{const p=profs[l.seller_id];return p&&p.verification_status==='verified';}).length;
 if(pop==='state')sheet=wrap(head('Select state')+stOpts.map(x=>opt('data-st="'+esc(x)+'"',x,st===x)).join('')+anyb('data-st="all"'));
 else if(pop==='sort')sheet=wrap(head('Sort by')+opt('data-sort="new"','Newest',sort==='new')+opt('data-sort="lo"','Lowest price',sort==='lo')+opt('data-sort="hi"','Highest price',sort==='hi'));
 else if(pop==='ver')sheet=wrap(head('Select verified sellers')+opt('data-ver="0"','Show all ('+inSt.length+' ads)',!onlyVer)+opt('data-ver="1"','Verified sellers ('+nVer+' ads)',onlyVer));
 else if(pop==='tile'&&T)sheet=wrap(head(T.w)+T.all.map(x=>opt('data-pick="'+esc(x)+'"',x,tileSel===x)).join('')+anyb('data-pick=""'));
 else if(pop==='cond')sheet=wrap(head('Condition')+opt('data-cond="new"','New',cond==='new')+opt('data-cond="used"','Used',cond==='used')+anyb('data-cond=""'));
 else if(pop==='price')sheet=wrap(head('Price (₦)')+'<input id="bqPmin" type="number" inputmode="numeric" placeholder="Min" value="'+esc(pmin)+'" style="width:100%;padding:13px;border:1.5px solid #cfd8d3;border-radius:12px;font-size:16px;margin-bottom:10px"><input id="bqPmax" type="number" inputmode="numeric" placeholder="Max" value="'+esc(pmax)+'" style="width:100%;padding:13px;border:1.5px solid #cfd8d3;border-radius:12px;font-size:16px;margin-bottom:12px"><button data-act="priceok" style="width:100%;padding:14px;border-radius:12px;border:0;background:#0b6b3a;color:#fff;font-weight:bold;font-size:16px">Apply</button>');
 else if(pop){const fd=X.find(z=>z.k===pop);if(fd){
  if(fd.t==='s')sheet=wrap(head(fd.l)+fd.o.map(x=>opt('data-val="'+esc(x)+'"',x,vals[fd.k]===x)).join('')+anyb('data-val=""'));
  else sheet=wrap(head(fd.l)+'<input id="bqTxt" placeholder="Type '+esc(fd.l.toLowerCase())+'" value="'+esc(vals[fd.k]||'')+'" style="width:100%;padding:13px;border:1.5px solid #cfd8d3;border-radius:12px;font-size:16px;margin-bottom:12px"><button data-act="txtok" style="width:100%;padding:14px;border-radius:12px;border:0;background:#0b6b3a;color:#fff;font-weight:bold;font-size:16px">Apply</button>');}}
 body.innerHTML=top+
  '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:14px 12px 8px"><div style="font-weight:bold;font-size:16px">Found '+f.length+' ad'+(f.length===1?'':'s')+'</div><div style="display:flex;gap:8px"><button data-act="o:sort" style="padding:9px 14px;border-radius:10px;border:1.5px solid #cfd8d3;background:#fff;font-size:14px;font-weight:600">⇅ Sort: '+(sort==='lo'?'Lowest price':sort==='hi'?'Highest price':'Newest')+'</button><button data-act="view" style="padding:9px 14px;border-radius:10px;border:1.5px solid #cfd8d3;background:#fff;font-size:18px">'+(view==='grid'?'☰':'▦')+'</button></div></div>'+
  (f.length?'<div style="display:grid;grid-template-columns:'+(view==='grid'?'1fr 1fr':'1fr')+';gap:12px;padding:0 12px 24px">'+f.map(card).join('')+'</div>':'<div style="padding:30px 20px;color:#666;text-align:center">No listings match yet. Try another filter, or post one yourself.</div>')+sheet;
 
}
function open(c,s){
 close();st=(typeof activeState!=='undefined'&&activeState)||'all';cat=c;sub=s;tileSel='';vals={};cond='';pmin='';pmax='';sort='new';pop=null;q='';onlyVer=false;view='grid';
 const title=sub==='all'?(CATEGORY_LABELS[cat]||'Listings'):(SUBLABEL[sub]||'Listings');
 const ov=document.createElement('div');ov.id='bqCatScr';
 ov.style.cssText='position:fixed;left:0;right:0;top:0;bottom:var(--bqnavh,72px);z-index:900;background:#f5f7f6;overflow-y:auto;color:#222;font-family:inherit';
 ov.innerHTML='<div style="position:sticky;top:0;z-index:3;background:#0b6b3a;display:flex;align-items:center;gap:10px;padding:10px 12px"><button data-act="back" aria-label="Back" style="flex:none;width:52px;height:52px;font-size:40px;line-height:1;font-weight:bold;background:rgba(255,255,255,.18);border:0;border-radius:14px;color:#fff;display:flex;align-items:center;justify-content:center;padding:0 0 4px">←</button><input id="bqCatQ" placeholder="Search in '+esc(title)+'" style="flex:1;min-width:0;padding:11px 14px;border-radius:10px;border:0;font-size:16px;background:#fff;color:#222"><button data-act="savesearch" aria-label="Save this search" style="flex:none;width:52px;height:52px;font-size:26px;background:rgba(255,255,255,.18);border:0;border-radius:14px;color:#fff;display:flex;align-items:center;justify-content:center;padding:0">🔖</button></div><div id="bqCatBody"></div>';
 ov.onclick=e=>{
  const cd=e.target.closest('.product[data-i]');
  if(cd){const l=shown[+cd.dataset.i];if(l){ov.style.display='none';try{window.openDetail(l);}catch(x){}
    const iv=setInterval(()=>{const d=$('detailOverlay');if(!$('bqCatScr')){clearInterval(iv);return;}if(!d||!d.classList.contains('show')){clearInterval(iv);ov.style.display='';}},400);}return;}
  const sk=e.target.closest('[data-st]');if(sk){st=sk.dataset.st;pop=null;paint();return;}
  const sr=e.target.closest('[data-sort]');if(sr){sort=sr.dataset.sort;pop=null;paint();return;}
  const vr=e.target.closest('[data-ver]');if(vr){onlyVer=vr.dataset.ver==='1';pop=null;paint();return;}
  const pk=e.target.closest('[data-pick]');if(pk){tileSel=pk.dataset.pick;pop=null;paint();return;}
  const cn=e.target.closest('[data-cond]');if(cn){cond=cn.dataset.cond;pop=null;paint();return;}
  const vl=e.target.closest('[data-val]');if(vl){if(pop)vals[pop]=vl.dataset.val;pop=null;paint();return;}
  const t=e.target.closest('[data-tile]');if(t){const v=t.dataset.tile;tileSel=tileSel===v?'':v;paint();return;}
  const a=e.target.closest('[data-act]');if(!a)return;
  const act=a.dataset.act;
  if(act==='back'){const c0=cat;try{sessionStorage.removeItem('bqCatScr');}catch(x){}close();try{window.bqOpenPicker(c0);}catch(x){}}
  else if(act==='savesearch'){(async()=>{
   const{data:{session}}=await supabaseClient.auth.getSession();
   if(!session){if(window.openAuth)openAuth('login');return;}
   const v={cat:cat,sub:sub||'all',st:st||'all',cond:cond||'all',sort:sort||'new',q:(q||tileSel||''),min:pmin||'',max:pmax||'',city:''};
   const nm=prompt('Name this search',(title+(tileSel?' · '+tileSel:'')+(st&&st!=='all'?' · '+st:'')).slice(0,40));
   if(nm===null)return;
   const{error}=await supabaseClient.from('saved_searches').insert({user_id:session.user.id,name:(nm.trim()||title).slice(0,40),view:v});
   if(error){alert('Could not save: '+error.message);return;}
   a.textContent='✅';setTimeout(()=>{a.textContent='🔖';},1800);
   alert('Search saved. Find it in Profile → Saved searches.');
  })();}
  else if(act==='ver'){onlyVer=!onlyVer;paint();}
  else if(act==='view'){view=view==='grid'?'list':'grid';paint();}
  else if(act==='shClose'){if(e.target===a){pop=null;paint();}}
  else if(act==='priceok'){pmin=($('bqPmin').value||'').trim();pmax=($('bqPmax').value||'').trim();pop=null;paint();}
  else if(act==='txtok'){if(pop)vals[pop]=($('bqTxt').value||'').trim();pop=null;paint();}
  else if(act.indexOf('o:')===0){pop=act.slice(2);paint();}
  else if(act.indexOf('x:')===0){const k=act.slice(2);if(k==='state')st='all';else if(k==='ver')onlyVer=false;else if(k==='tile')tileSel='';else if(k==='cond')cond='';else if(k==='price'){pmin='';pmax='';}else vals[k]='';paint();}
 };
 document.body.appendChild(ov);
 $('bqCatQ').oninput=e=>{q=e.target.value.trim().toLowerCase();paint();};
 paint();loadProfs();
}
let restored=false,tries=0;
const rs=setInterval(()=>{
 tries++;
 if(tries>60){clearInterval(rs);restored=true;return;}
 let sv=null;try{sv=JSON.parse(sessionStorage.getItem('bqCatScr')||'null');}catch(e){}
 if(!sv){clearInterval(rs);restored=true;return;}
 let ready=false;try{ready=Array.isArray(currentListings)&&currentListings.length>0&&!!document.getElementById('bqState');}catch(e){}
 if(!ready)return;
 clearInterval(rs);
 open(sv.cat,sv.sub);
 st=sv.st||'all';tileSel=sv.tileSel||'';vals=sv.vals||{};cond=sv.cond||'';pmin=sv.pmin||'';pmax=sv.pmax||'';sort=sv.sort||'new';q=sv.q||'';onlyVer=!!sv.onlyVer;view=sv.view||'grid';
 const qi=$('bqCatQ');if(qi)qi.value=q;
 paint();restored=true;
},400);
setInterval(()=>{if(restored&&!$('bqCatScr')){try{sessionStorage.removeItem('bqCatScr');}catch(e){}}},800);
document.addEventListener('click',e=>{
 const r=e.target&&e.target.closest?e.target.closest('#subList .bqSubRow'):null;
 if(!r)return;
 const c=(function(){const t=$('subTitle').textContent;for(const k in CATEGORY_LABELS){if(CATEGORY_LABELS[k]===t)return k;}return '';})();
 if(!c)return;
 e.stopImmediatePropagation();e.preventDefault();
 $('subOverlay').classList.remove('show');
 open(c,r.dataset.k);
},true);
})();

/* ===== Settings screen (gear on Profile) ===== */
(function(){
const $=id=>document.getElementById(id);
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const SUPPORT='support.buyqora@gmail.com';
let prof={},user=null;
/* ----- dark mode: recolours the app properly (no inversion); photos and emoji are untouched ----- */
{const st=document.createElement('style');st.id='bqDarkCss';
 st.textContent='html.bq-dark{background:#12161a;color-scheme:dark}html.bq-dark ::placeholder{color:#8a949b !important;opacity:1}';
 document.head.appendChild(st);}
const DK={on:false,touched:new Map(),obs:null,pend:new Set(),raf:0};
function pc(str){const m=String(str).match(/[\d.]+/g)||[];return{r:+m[0]||0,g:+m[1]||0,b:+m[2]||0,a:m[3]!==undefined?+m[3]:1};}
function hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);if(mx===r)h=(g-b)/d+(g<b?6:0);else if(mx===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60;}return{h,s,l};}
const H=(h,s,l)=>'hsl('+Math.round(h)+','+Math.round(s*100)+'%,'+Math.round(l*100)+'%)';
function mapBg(c){if(c.a<.9)return null;const{h,s,l}=hsl(c.r,c.g,c.b);
 if(s<.2){if(l>=.985)return '#1c2228';if(l>=.955)return '#12161a';if(l>=.82)return '#252d34';if(l>=.65)return '#323b43';return null;}
 if(l>=.8)return H(h,.3,.17);if(l>=.65)return H(h,.3,.24);return null;}
function mapText(c){if(c.a<.3)return null;const{h,s,l}=hsl(c.r,c.g,c.b);
 if(s<.2){if(l<.4)return '#e6eaed';if(l<.62)return '#a7b1b8';if(l<.78)return '#9aa5ac';return null;}
 if(l<.62)return H(h,Math.min(Math.max(s,.4),.6),.64);return null;}
function mapBd(c){if(c.a<.3)return null;const{h,s,l}=hsl(c.r,c.g,c.b);
 if(s<.2){if(l>=.7)return '#313a41';return null;}
 if(l<.42)return H(h,Math.min(Math.max(s,.4),.6),.45);if(l>=.8)return H(h,.3,.26);return null;}
function dset(el,prop,val){const st=el.style;if(st.getPropertyValue(prop)===val&&st.getPropertyPriority(prop)==='important')return;
 let t=DK.touched.get(el);if(!t){t={};DK.touched.set(el,t);}
 if(!(prop in t))t[prop]=[st.getPropertyValue(prop),st.getPropertyPriority(prop)];
 st.setProperty(prop,val,'important');}
const SKIP={SCRIPT:1,STYLE:1,LINK:1,META:1,IMG:1,VIDEO:1,CANVAS:1,IFRAME:1,NOSCRIPT:1,SOURCE:1};
function dproc(el){
 if(!el||el.nodeType!==1||SKIP[el.tagName]||el instanceof SVGElement)return;
 const cs=getComputedStyle(el);
 let v=mapBg(pc(cs.backgroundColor));if(v)dset(el,'background-color',v);
 v=mapText(pc(cs.color));if(v)dset(el,'color',v);
 for(const sd of ['top','right','bottom','left']){
  if(parseFloat(cs['border-'+sd+'-width'])>0&&cs['border-'+sd+'-style']!=='none'){
   v=mapBd(pc(cs['border-'+sd+'-color']));if(v)dset(el,'border-'+sd+'-color',v);}}
}
function dtree(root){if(!root||root.nodeType!==1)return;dproc(root);const all=root.querySelectorAll('*');for(let i=0;i<all.length;i++)dproc(all[i]);}
function dflush(){DK.raf=0;if(!DK.on)return;const items=[...DK.pend];DK.pend.clear();
 for(const n of items){if(n.nodeType===1&&n.isConnected)dtree(n);}
 if(DK.touched.size>6000){for(const k of [...DK.touched.keys()]){if(!k.isConnected)DK.touched.delete(k);}}}
function dqueue(n){DK.pend.add(n);if(!DK.raf)DK.raf=requestAnimationFrame(dflush);}
function darkOn(){
 if(DK.on)return;DK.on=true;document.documentElement.classList.add('bq-dark');
 dtree(document.body);
 DK.obs=new MutationObserver(ms=>{if(!DK.on)return;for(const m of ms){if(m.type==='attributes')dqueue(m.target);else m.addedNodes.forEach(n=>{if(n.nodeType===1)dqueue(n);});}});
 DK.obs.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});
}
function darkOff(){
 if(!DK.on)return;DK.on=false;if(DK.obs){DK.obs.disconnect();DK.obs=null;}DK.pend.clear();
 document.documentElement.classList.remove('bq-dark');
 DK.touched.forEach((t,el)=>{for(const p in t){if(t[p][0]==='')el.style.removeProperty(p);else el.style.setProperty(p,t[p][0],t[p][1]);}});
 DK.touched.clear();
}
function themePref(){let t='system';try{t=localStorage.getItem('bqTheme')||'system';}catch(e){}return t;}
function applyTheme(){
 const t=themePref();let dark=t==='dark';
 if(t==='system'){try{dark=window.matchMedia('(prefers-color-scheme: dark)').matches;}catch(e){}}
 if(dark)darkOn();else darkOff();
}
applyTheme();
try{window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',applyTheme);}catch(e){}
const THEMENAME={system:'System (default)',light:'Light',dark:'Dark'};
function closeSet(){const o=$('bqSetScr');if(o)o.remove();}
function sheetClose(){const o=$('bqSetSheet');if(o)o.remove();}
function sheet(title,body){
 sheetClose();
 const o=document.createElement('div');o.id='bqSetSheet';
 o.style.cssText='position:fixed;left:0;right:0;top:0;bottom:var(--bqnavh,72px);z-index:100002;background:rgba(0,0,0,.45);display:flex;align-items:flex-end';
 o.innerHTML='<div style="background:#fff;width:100%;max-height:85%;overflow-y:auto;border-radius:18px 18px 0 0;padding:18px 16px 26px;color:#222"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><div style="font-weight:bold;font-size:18px">'+esc(title)+'</div><button id="bqShX" style="font-size:26px;background:none;border:0;color:#555;padding:0 6px">✕</button></div>'+body+'</div>';
 o.onclick=e=>{if(e.target===o)sheetClose();};
 ($('bqSetScr')||document.body).appendChild(o);
 $('bqShX').onclick=sheetClose;
}
const inp=(id,label,val,type)=>'<div style="font-size:14px;color:#555;margin:8px 0 5px">'+esc(label)+'</div><input id="'+id+'" type="'+(type||'text')+'" value="'+esc(val||'')+'" style="width:100%;padding:13px;border:1.5px solid #cfd8d3;border-radius:12px;font-size:16px;box-sizing:border-box">';
const btn=(id,t,bg)=>'<button id="'+id+'" style="width:100%;margin-top:16px;padding:14px;border-radius:12px;border:0;background:'+(bg||'#0b6b3a')+';color:#fff;font-weight:bold;font-size:16px">'+esc(t)+'</button><div id="bqShMsg" style="margin-top:10px;font-size:14px"></div>';
const msg=(t,ok)=>{const m=$('bqShMsg');if(m){m.style.color=ok?'#0b6b3a':'#c0392b';m.textContent=t;}};
async function load(){
 try{const{data:{session}}=await supabaseClient.auth.getSession();if(!session)return false;user=session.user;
  let r=await supabaseClient.from('profiles').select('full_name,phone,state,business_name,account_type,feedback_disabled').eq('id',user.id).maybeSingle();
  if(r.error)r=await supabaseClient.from('profiles').select('full_name,phone,state,business_name,account_type').eq('id',user.id).maybeSingle();
  prof=r.data||{};return true;}catch(e){return false;}
}
function row(ic,bg,label,val,act){
 return '<button data-a="'+act+'" style="display:flex;align-items:center;gap:14px;width:100%;padding:12px 14px;background:#fff;border:0;border-bottom:1px solid #eef1ef;text-align:left;color:#222"><span style="width:44px;height:44px;border-radius:10px;background:'+bg+';display:flex;align-items:center;justify-content:center;font-size:22px;flex:none">'+ic+'</span><span style="flex:1;min-width:0;font-size:16px">'+esc(label)+'</span>'+(val?'<span style="color:#777;font-size:14px;max-width:42%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(val)+'</span>':'')+'<span style="color:#999;font-size:22px">›</span></button>';
}
const grp=h=>'<div style="margin:10px 0;background:#fff;border-top:1px solid #eef1ef">'+h+'</div>';
async function openSet(){
 if(!(await load()))return;
 closeSet();
 const o=document.createElement('div');o.id='bqSetScr';
 o.style.cssText='position:fixed;left:0;right:0;top:0;bottom:var(--bqnavh,72px);z-index:100001;background:#f2f4f3;overflow-y:auto;color:#222;font-family:inherit';
 o.innerHTML='<div style="position:sticky;top:0;z-index:3;background:#0b6b3a;color:#fff;display:flex;align-items:center;gap:12px;padding:10px 12px"><button data-a="back" style="flex:none;width:52px;height:52px;font-size:40px;line-height:1;font-weight:bold;background:rgba(255,255,255,.18);border:0;border-radius:14px;color:#fff;display:flex;align-items:center;justify-content:center;padding:0 0 4px">←</button><div style="font-size:20px;font-weight:bold">Settings</div></div>'+
 grp(row('👤','#e8f5ee','Personal details',prof.full_name,'personal')+row('🏢','#fff0e0','Business info',prof.business_name,'business'))+
 grp(row('📞','#e3f7e8','Phone numbers',prof.phone,'phone')+row('✉️','#fff0e0','Change email',user.email,'email')+row('🌐','#e3f7e8','Change language','English','lang'))+
 grp(row('😊','#fff0e0','Disable feedback',prof.feedback_disabled?'Disabled':'Enabled','fb')+row('📲','#e1f1fb','In-app calls','Disabled','calls')+row('🔔','#fde8ea','Manage notifications','','notif'))+
 grp(row('ℹ️','#e9eef3','About BuyQora','','about')+row('📶','#e9eef3','Check connection','','conn')+row('🌙','#e9eef3','Dark mode',THEMENAME[themePref()],'theme'))+
 grp(row('🔒','#e9eef3','Change password','','pass')+row('🗑️','#e9eef3','Delete my account permanently','','del')+row('🚪','#e9eef3','Log out','','out'))+
 '<div style="height:30px"></div>';
 o.onclick=e=>{const b=e.target.closest('[data-a]');if(b)act(b.dataset.a);};
 document.body.appendChild(o);
}
async function save(upd){
 const{error}=await supabaseClient.from('profiles').update(upd).eq('id',user.id);
 return error;
}
function act(a){
 if(a==='back'){closeSet();return;}
 if(a==='business'){closeSet();const t=$('profileType');if(t&&t.scrollIntoView)t.scrollIntoView({block:'center'});return;}
 if(a==='out'){closeSet();const l=$('bqLogout');if(l)l.click();return;}
 if(a==='notif'){
  const o=$('bqSetScr'),ab=$('bqAlertBtn');if(!ab)return;
  o.style.display='none';ab.click();
  let n=0;const iv=setInterval(()=>{n++;if(!$('bqSetScr')){clearInterval(iv);return;}if(n>4&&!$('bqAlertOv')){clearInterval(iv);o.style.display='';}if(n>200){clearInterval(iv);o.style.display='';}},400);return;
 }
 if(a==='personal'){
  let so='';try{const sel=$('bqState');if(sel)for(const x of sel.options){if(x.value&&x.value!=='all')so+='<option'+(prof.state===x.value?' selected':'')+'>'+esc(x.value)+'</option>';}}catch(e){}
  sheet('Personal details',inp('bqF1','Full name',prof.full_name)+'<div style="font-size:14px;color:#555;margin:8px 0 5px">State</div><select id="bqF2" style="width:100%;padding:13px;border:1.5px solid #cfd8d3;border-radius:12px;font-size:16px;background:#fff"><option value="">Choose state</option>'+so+'</select>'+btn('bqSv','Save'));
  $('bqSv').onclick=async()=>{const n=$('bqF1').value.trim();if(!n){msg('Enter your name.');return;}const er=await save({full_name:n,state:$('bqF2').value||null});if(er){msg(er.message);return;}prof.full_name=n;prof.state=$('bqF2').value;msg('Saved ✓',true);setTimeout(()=>{sheetClose();openSet();},700);};return;
 }
 if(a==='phone'){
  sheet('Phone number',inp('bqF1','Phone number',prof.phone,'tel')+btn('bqSv','Save'));
  $('bqSv').onclick=async()=>{const v=$('bqF1').value.trim();if(v.length<7){msg('Enter a valid phone number.');return;}const er=await save({phone:v});if(er){msg(er.message);return;}prof.phone=v;msg('Saved ✓',true);setTimeout(()=>{sheetClose();openSet();},700);};return;
 }
 if(a==='email'){
  sheet('Change email','<div style="color:#555;font-size:14px">Current: '+esc(user.email)+'</div>'+inp('bqF1','New email','', 'email')+btn('bqSv','Send confirmation'));
  $('bqSv').onclick=async()=>{const v=$('bqF1').value.trim();if(!/^\S+@\S+\.\S+$/.test(v)){msg('Enter a valid email.');return;}const{error}=await supabaseClient.auth.updateUser({email:v});if(error){msg(error.message);return;}msg('Done. Check your new email and tap the confirmation link.',true);};return;
 }
 if(a==='pass'){
  sheet('Change password',inp('bqF1','New password','','password')+inp('bqF2','Confirm new password','','password')+btn('bqSv','Change password'));
  $('bqSv').onclick=async()=>{const p1=$('bqF1').value,p2=$('bqF2').value;if(p1.length<6){msg('Password must be at least 6 characters.');return;}if(p1!==p2){msg('The two passwords do not match.');return;}const{error}=await supabaseClient.auth.updateUser({password:p1});if(error){msg(error.message);return;}msg('Password changed ✓',true);};return;
 }
 if(a==='about'){
  sheet('About BuyQora','<div style="line-height:1.6;font-size:15px">BuyQora is a Nigerian marketplace where you can buy and sell almost anything, near you.<br><br>Support: <a href="mailto:'+SUPPORT+'" style="color:#0b6b3a;font-weight:bold">'+SUPPORT+'</a><br>Support is by email only.</div>');return;
 }
 if(a==='conn'){
  sheet('Check connection','<div id="bqCn" style="font-size:16px;padding:6px 0">Checking…</div>');
  const t0=Date.now();
  supabaseClient.from('profiles').select('id').limit(1).then(r=>{const c=$('bqCn');if(!c)return;if(r.error){c.style.color='#c0392b';c.textContent='Could not reach BuyQora. Check your internet.';}else{c.style.color='#0b6b3a';c.textContent='✓ Connected ('+(Date.now()-t0)+' ms)';}}).catch(()=>{const c=$('bqCn');if(c){c.style.color='#c0392b';c.textContent='No connection. Check your internet.';}});return;
 }
 if(a==='theme'){
  const cur=themePref();
  const o=(v,t)=>'<button data-th="'+v+'" style="display:block;width:100%;text-align:left;padding:14px;margin-bottom:8px;border-radius:12px;font-size:17px;border:1.5px solid '+(cur===v?'#0b6b3a':'#e0e0e0')+';background:'+(cur===v?'#e8f5ee':'#fff')+';color:#222">'+t+(cur===v?' ✓':'')+'</button>';
  sheet('Dark mode',o('system','System (default)')+o('light','Light')+o('dark','Dark'));
  $('bqSetSheet').querySelectorAll('[data-th]').forEach(b=>b.onclick=()=>{try{localStorage.setItem('bqTheme',b.dataset.th);}catch(e){}applyTheme();sheetClose();openSet();});
  return;
 }
 if(a==='lang'){
  sheet('Change language','<button style="display:block;width:100%;text-align:left;padding:14px;margin-bottom:8px;border-radius:12px;font-size:17px;border:1.5px solid #0b6b3a;background:#e8f5ee;color:#222">English ✓</button>'+['Igbo','Yoruba','Hausa','Pidgin'].map(x=>'<div style="padding:14px;margin-bottom:8px;border-radius:12px;font-size:17px;border:1.5px solid #e0e0e0;color:#999">'+x+' <span style="font-size:13px">· coming soon</span></div>').join(''));return;
 }
 if(a==='calls'){
  sheet('In-app calls','<div style="line-height:1.6;font-size:15px">In-app calls are not available yet. For now, buyers can reach you by <b>Messages</b>, and by your phone number if you choose to show it on your profile.</div>');return;
 }
 if(a==='fb'){
  const off=!!prof.feedback_disabled;
  const o=(v,t,on)=>'<button data-fb="'+v+'" style="display:block;width:100%;text-align:left;padding:14px;margin-bottom:8px;border-radius:12px;font-size:17px;border:1.5px solid '+(on?'#0b6b3a':'#e0e0e0')+';background:'+(on?'#e8f5ee':'#fff')+';color:#222">'+t+'</button>';
  sheet('Feedback','<div style="font-size:14px;color:#555;margin-bottom:12px;line-height:1.5">Choose whether buyers can leave reviews and ratings on your profile.</div>'+o('0','Enabled — buyers can leave feedback',!off)+o('1','Disabled — nobody can leave new feedback',off)+'<div id="bqShMsg" style="margin-top:8px;font-size:14px"></div>');
  $('bqSetSheet').querySelectorAll('[data-fb]').forEach(b=>b.onclick=async()=>{const v=b.dataset.fb==='1';const er=await save({feedback_disabled:v});if(er){msg('This option is not ready yet. Please try again later.');return;}prof.feedback_disabled=v;msg('Saved ✓',true);setTimeout(()=>{sheetClose();openSet();},600);});
  return;
 }
 if(a==='del'){
  sheet('Delete my account','<div style="color:#c0392b;font-size:15px;line-height:1.5">This permanently deletes your account and cannot be undone. Type <b>DELETE</b> to confirm.</div>'+inp('bqF1','','','text')+btn('bqSv','Delete my account permanently','#c0392b'));
  $('bqSv').onclick=async()=>{if($('bqF1').value.trim()!=='DELETE'){msg('Type DELETE in capital letters.');return;}
   const{error}=await supabaseClient.rpc('delete_my_account');
   if(error){const m=$('bqShMsg');if(m){m.style.color='#c0392b';m.innerHTML='We could not delete it automatically. Please email <a href="mailto:'+SUPPORT+'?subject=Delete%20my%20account" style="color:#0b6b3a;font-weight:bold">'+SUPPORT+'</a> and we will delete it for you.';}return;}
   try{await supabaseClient.auth.signOut();}catch(e){}location.reload();};return;
 }
}
function gear(){
 const m=document.querySelector('#profileOverlay .modal');
 if(!m)return;
 const vis=$('profileOverlay')&&$('profileOverlay').classList.contains('show');
 let g=$('bqGearBar');
 if(!vis){return;}
 if(!g){
  m.insertAdjacentHTML('afterbegin','<div id="bqGearBar" style="position:sticky;top:0;z-index:6;display:flex;justify-content:flex-end;background:#fff;padding:2px 0 6px"><button id="bqGear" aria-label="Settings" style="display:flex;align-items:center;gap:8px;padding:9px 16px;border-radius:14px;border:1.5px solid #0b6b3a;background:#fff;color:#0b6b3a;font-weight:bold;font-size:16px"><span style="font-size:22px">⚙️</span>Settings</button></div>');
  $('bqGear').onclick=openSet;
 }
}
setInterval(gear,700);
})();

/* ===== Real photos on the home category tiles (falls back to the emoji if a photo is missing) ===== */
(function(){
{const st=document.createElement('style');st.textContent='#bqCats .bq-cat i{position:relative;overflow:hidden;height:74px !important;border-radius:16px !important;background:#1f272c !important}#bqCats .bq-cat i img.bqCatPh{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:inherit}';document.head.appendChild(st);}
function run(){
 document.querySelectorAll('#bqCats .bq-cat').forEach(b=>{
  const i=b.querySelector('i');if(!i||i.querySelector('img.bqCatPh')||i.dataset.ph==='none')return;
  const id=b.dataset.c;
  const im=new Image();im.className='bqCatPh';im.alt='';im.loading='lazy';
  im.onerror=()=>{i.dataset.ph='none';im.remove();};
  im.src='tile-'+id+'.png?v=1';
  i.appendChild(im);
 });
}
setInterval(run,800);run();
})();

/* ===== Strong screen headers: arrow never scrolls away, spaced, shows press ===== */
(function(){
const st=document.createElement('style');
st.textContent=
'.bqHdr{position:sticky;top:0;z-index:30;background:var(--bqhb,#fff);display:flex;align-items:center;gap:10px;padding:8px 4px 10px;margin:0 0 12px}'+
'.bqHdr>.close{position:static!important;float:none!important;margin:0!important;display:inline-flex!important;align-items:center;justify-content:center;min-width:52px;height:52px;font-size:38px!important;line-height:1;font-weight:700;border-radius:14px;background:rgba(11,107,58,.10);-webkit-tap-highlight-color:transparent;transition:background .1s,transform .1s}'+
'.bqHdr>.close:active,#subClose:active{background:rgba(11,107,58,.35)!important;transform:scale(.92)}'+
'.bqHdr>h1,.bqHdr>h2,.bqHdr>h3{margin:0!important;display:block!important}'+
'#subOverlay .modal{padding:0!important}'+
'#subOverlay .modal>div:first-child{position:sticky!important;top:0!important;z-index:30!important;background:#fff!important;padding:8px 12px!important;margin:0!important;min-height:0!important}'+
'#subTitle{margin:0!important;font-size:20px!important}'+
'#subClose{border-radius:14px;background:rgba(11,107,58,.10);transition:background .1s,transform .1s}'+
'#bqNav button{transition:transform .1s}#bqNav button:active{transform:scale(.92)}';
document.head.appendChild(st);
function bgOf(m){
 let e=m;while(e&&e!==document.body){const c=getComputedStyle(e).backgroundColor;if(c&&c!=='transparent'&&c!=='rgba(0, 0, 0, 0)')return c;e=e.parentElement;}
 return '#fff';
}
function wrap(){
 document.querySelectorAll('.modal-overlay>.modal').forEach(m=>{
  if(m.parentElement.id==='chatOverlay'||m.dataset.bqh)return;
  const c=m.querySelector(':scope>.close');if(!c)return;
  const h=c.nextElementSibling;
  const w=document.createElement('div');w.className='bqHdr';
  m.insertBefore(w,c);w.appendChild(c);
  if(h&&/^H[1-3]$/.test(h.tagName))w.appendChild(h);
  w.style.setProperty('--bqhb',bgOf(m));
  m.dataset.bqh='1';
 });
}
setInterval(wrap,500);
/* bottom menu: green highlight moves the instant you tap */
document.addEventListener('click',e=>{
 const b=e.target&&e.target.closest?e.target.closest('#bqNav [data-n]'):null;if(!b)return;
 document.querySelectorAll('#bqNav [data-n]').forEach(x=>x.classList.toggle('on',x===b));
},true);
})();


/* ===== Fix: header gap + bottom menu highlight that really follows the screen ===== */
(function(){
function scroller(h){let e=h.parentElement;while(e&&e!==document.body){const o=getComputedStyle(e).overflowY;if(o==='auto'||o==='scroll')return e;e=e.parentElement;}return null;}
function fixTop(){
 document.querySelectorAll('.bqHdr,#subOverlay .modal>div:first-child').forEach(h=>{
  const sc=scroller(h);if(!sc)return;
  const p=parseFloat(getComputedStyle(sc).paddingTop)||0;
  h.style.setProperty('top',(-p)+'px','important');
 });
}
setInterval(fixTop,300);
const MAP=[['profileOverlay','me'],['inboxOverlay','msg'],['favoritesOverlay','saved'],['sellOverlay','sell']];
let tapped='home';
const G='#1b8a3a',GR='#8b9096';
function shown(id){const e=document.getElementById(id);return !!(e&&e.classList.contains('show'));}
function anyScreen(){return !!document.querySelector('.modal-overlay.show')||['bqPayOv','bqSavedOv','bqAlertOv','bqSetScr','bqDashOv','bqOvOv','bqAuditOv','bqCatScr'].some(i=>document.getElementById(i));}
function byTitle(){
 const o=[...document.querySelectorAll('.modal-overlay.show')].pop();if(!o)return null;
 const h=o.querySelector('h1,h2,h3');const t=(h?h.textContent:'').toLowerCase();
 if(t.indexOf('my profile')>-1)return 'me';
 if(t.indexOf('message')>-1||t.indexOf('inbox')>-1)return 'msg';
 if(t.indexOf('saved')>-1||t.indexOf('favorite')>-1)return 'saved';
 return null;
}
function cur(){
 for(let i=0;i<MAP.length;i++){if(shown(MAP[i][0]))return MAP[i][1];}
 const t=byTitle();if(t)return t;
 if(anyScreen())return tapped;
 tapped='home';return 'home';
}
function paint(c){
 const n=document.getElementById('bqNav');if(!n)return;
 n.querySelectorAll('[data-n]').forEach(b=>{
  const on=b.dataset.n===c;b.classList.toggle('on',on);
  if(b.dataset.n==='sell')return;
  b.style.setProperty('color',on?G:GR,'important');
  b.style.setProperty('font-weight',on?'700':'400','important');
  const ic=b.querySelector('b');if(ic){ic.style.filter=on?'none':'grayscale(1) opacity(.55)';}
 });
}
document.addEventListener('click',e=>{
 const b=e.target&&e.target.closest?e.target.closest('#bqNav [data-n]'):null;if(!b)return;
 tapped=b.dataset.n;paint(tapped);
},true);
setInterval(()=>paint(cur()),200);
})();


/* ===== Seller name on every listing card in the home grid (like Jiji) ===== */
(function(){
const P={};let busy=false;
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function row(p){
 const nm=p.business_name||p.full_name||'Seller';
 const av=p.logo_url?'<img src="'+esc(p.logo_url)+'" alt="" style="width:100%;height:100%;object-fit:cover">':esc(nm.charAt(0).toUpperCase());
 return '<div class="bqSel" style="display:flex;align-items:center;gap:6px;font-size:13px;margin:6px 0 2px"><span style="width:22px;height:22px;border-radius:50%;background:#dfe7e2;color:#244;flex:0 0 22px;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold">'+av+'</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0">'+esc(nm)+'</span>'+(p.verification_status==='verified'?'<span style="flex:none;font-size:11px;font-weight:600;padding:2px 7px;border-radius:10px;background:#e8f5ee;color:#0b6b3a">✔ Verified</span>':'')+'</div>';
}
async function run(){
 if(busy)return;
 const grid=document.getElementById('productGrid');if(!grid)return;
 const cards=[...grid.querySelectorAll('.product[data-idx]')].filter(c=>!c.querySelector('.bqSel'));
 if(!cards.length)return;
 let list=[];try{list=window.currentFilteredListings||currentFilteredListings||[];}catch(e){}
 const need=[...new Set(cards.map(c=>(list[c.dataset.idx]||{}).seller_id).filter(id=>id&&!P[id]))];
 busy=true;
 try{
  if(need.length){
   const{data}=await supabaseClient.from('profiles').select('id,full_name,business_name,logo_url,verification_status').in('id',need);
   (data||[]).forEach(p=>{P[p.id]=p;});
   need.forEach(id=>{if(!P[id])P[id]={id:id};});
  }
  cards.forEach(c=>{
   if(c.querySelector('.bqSel'))return;
   const l=list[c.dataset.idx];if(!l)return;
   c.insertAdjacentHTML('beforeend',row(P[l.seller_id]||{}));
  });
 }catch(e){}
 busy=false;
}
setInterval(run,700);
})();
