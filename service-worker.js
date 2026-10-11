const CACHE='buyqora-v3';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{
 e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
 const req=e.request;
 if(req.method!=='GET'||!req.url.startsWith(self.location.origin))return;
 e.respondWith(fetch(req).then(res=>{
  if(res&&res.status===200){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});}
  return res;
 }).catch(()=>caches.match(req)));
});
self.addEventListener('push',e=>{
 let d={};
 try{d=e.data?e.data.json():{};}catch(_){d={title:'BuyQora',body:e.data?e.data.text():''};}
 e.waitUntil(self.registration.showNotification(d.title||'BuyQora',{
  body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',data:{url:d.url||'./'}
 }));
});
self.addEventListener('notificationclick',e=>{
 e.notification.close();
 const url=(e.notification.data&&e.notification.data.url)||'./';
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
  for(const c of l){if('focus' in c)return c.focus();}
  return clients.openWindow(url);
 }));
});
