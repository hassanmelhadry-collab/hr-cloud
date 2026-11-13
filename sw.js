// تطبيق الجوال: الواجهة تُحفظ على الجهاز وتفتح فورًا؛ البيانات دائمًا من الخادم
const V = 'hr-cloud-4b9727f1a6';
const PRE = ["./","./assets/tajawal-latin-400-normal-BVNSOH3d.woff2","./assets/tajawal-arabic-500-normal-DoitJjou.woff2","./assets/tajawal-latin-500-normal-CoYeBiSI.woff2","./assets/tajawal-arabic-700-normal-c-WwFYr-.woff2","./assets/tajawal-latin-700-normal-BypgxfGb.woff2","./assets/tajawal-arabic-800-normal-C3W71-SS.woff2","./assets/tajawal-latin-800-normal-CmI34b-g.woff2","./assets/tajawal-arabic-400-normal-DIMBuZnN.woff2","./assets/index-BPwUiu1m.css","./assets/react-Cr3jetm1.js","./assets/supabase-f4bNl52y.js","./assets/charts-BOW69M33.js","./assets/xlsx-Cznzrv2E.js","./assets/index-CJ4Vx5li.js","./assets/Profile-CXmV2GM3.js","./assets/PayrollRun-0Higv9zX.js","./assets/Builder-UpvLee92.js","./assets/Reports-BjMVN3mM.js","./assets/Dashboard-A2shzqLh.js","./assets/Settings-CgMR9k-A.js","./assets/Fingerprint-bsR-mqMP.js","./assets/Org-CufeuIeO.js","./assets/Ops-Dkcg2En_.js","./assets/Admin-B4rk7_Li.js","./assets/Analytics-jPh4us4z.js","./assets/charts-kadVtNXt.js","./assets/MyAttendance-6ntcFeNj.js","./assets/Nitaqat-CO6CWiBz.js","./assets/Governance-sMlLhZfp.js","./assets/Letters-BLkhPE7c.js","./assets/ImportExport-CLqKNUe4.js","./assets/EntityPage-C1URyG2-.js","./assets/RecordForm-CnvoaGPJ.js","./assets/companyZip-CJtMjfB2.js","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(PRE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
const put = (req, res) => { if (res && res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(req, cp)); } return res; };
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return; // طلبات البيانات لا تُخزَّن
  if (u.pathname.includes('/assets/')) { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(x => put(e.request, x)))); return; }
  // الصفحة والإعداد: من الشبكة أولًا (3 ثوانٍ كحد أقصى) ثم من الجهاز
  e.respondWith(new Promise(res => { let done = false; const fb = () => caches.match(e.request).then(r => r || caches.match('./index.html')).then(r => { if (!done && r) { done = true; res(r); } });
    const t = setTimeout(fb, 3000);
    fetch(e.request).then(x => { clearTimeout(t); put(e.request, x); if (!done) { done = true; res(x); } }).catch(() => { clearTimeout(t); fb().then(() => { if (!done) { done = true; res(Response.error()); } }); }); }));
});
