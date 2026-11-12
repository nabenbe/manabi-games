const CACHE='manabi-adventure-20261112-monsters-v1';const PAGE='./index.html';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.add(PAGE)).then(()=>self.skipWaiting()).catch(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('manabi-adventure-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
self.addEventListener('fetch',e=>{if(e.request.mode!=='navigate'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(PAGE,copy)).catch(()=>{});}return res;}).catch(()=>caches.match(PAGE).then(r=>r||Response.error())))});
