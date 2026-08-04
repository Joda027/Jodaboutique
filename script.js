(function(){
  const LOGO_SRC = "data:image/webp;base64,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";
  document.querySelectorAll('.brand-logo').forEach(img=>{ img.src = LOGO_SRC; });

  const ICONS = {
    collier: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14c0 14 8 24 18 24s18-10 18-24" stroke-linecap="round"/><circle cx="32" cy="42" r="5"/></svg>',
    bracelet: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="32" cy="32" rx="20" ry="12"/><ellipse cx="32" cy="32" rx="12" ry="6"/></svg>',
    boucles: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="22" cy="16" r="4"/><path d="M22 20v10a6 6 0 006 6" stroke-linecap="round"/><circle cx="42" cy="16" r="4"/><path d="M42 20v10a6 6 0 01-6 6" stroke-linecap="round"/></svg>',
    bague: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="32" cy="38" r="14"/><path d="M26 24l6-10 6 10z" stroke-linejoin="round"/></svg>',
    sac: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><rect x="14" y="24" width="36" height="28" rx="3"/><path d="M22 24v-4a10 10 0 0120 0v4" stroke-linecap="round"/></svg>',
    foulard: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 18c8 6 8 14 0 20s0 14 8 20" stroke-linecap="round"/><path d="M52 18c-8 6-8 14 0 20s0 14-8 20" stroke-linecap="round"/></svg>',
    autre: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M32 10l6 14 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z" stroke-linejoin="round"/></svg>'
  };
  function iconFor(cat){
    const key = (cat||'').toLowerCase();
    for(const k of Object.keys(ICONS)){ if(key.includes(k)) return ICONS[k]; }
    return ICONS.autre;
  }

  let products = [];
  let variants = [];
  let orders = [];
  let team = [];
  let pendingInvites = [];
  let activity = [];
  let cart = {};
  let selectedVariant = {};
  function parseCartKey(key){
    const idx = key.indexOf('::');
    return idx===-1 ? {productId:key, variantId:null} : {productId:key.slice(0,idx), variantId:key.slice(idx+2)};
  }
  let currentUser = null;
  let likes = {};
  let traffic = {};
  let expenses = [];
  let offlineSales = [];
  let settings = {};
  let categories = [];
  let deliveryZones = [];
  let ordersRealtimeChannel = null;
  const baseTitle = document.title;
  let salesArchive = {count:0, revenue:0, byProduct:{}};
  let sessionLikes = {};
  let openCategories = {};

  const SUPABASE_URL = 'https://sfkxhelutkoqinmfceyc.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_HQc7xFR0jmCbFXXqhOFDhw_fjZ-x07V';
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  async function logActivity(actorName, action){
    await sb.from('activity_log').insert({actor:actorName, action});
    if(currentUser && currentUser.role==='admin') await loadActivity();
  }

  async function loadProducts(){
    const { data, error } = await sb.from('products')
      .select('id,name,cat,price,stock,image,approved,rejected,rejectReason:reject_reason,addedBy:added_by')
      .order('created_at', {ascending:true});
    if(error) console.error('loadProducts', error);
    products = data || [];
  }
  async function loadVariants(){
    const { data, error } = await sb.from('product_variants')
      .select('id,productId:product_id,color,image,stock')
      .order('created_at', {ascending:true});
    if(error) console.error('loadVariants', error);
    variants = data || [];
  }
  function variantsFor(productId){ return variants.filter(v=>v.productId===productId); }
  async function loadOrders(){
    if(!currentUser){ orders = []; return; }
    const { data, error } = await sb.from('orders')
      .select('id,ts,customer,phone,address,deliveryZone:delivery_zone,deliveryFee:delivery_fee,items,total,originalTotal:original_total,status,claimedBy:claimed_by')
      .order('ts', {ascending:false});
    if(error) console.error('loadOrders', error);
    orders = data || [];
  }
  async function loadTeam(){
    if(!currentUser){ team = []; return; }
    const { data, error } = await sb.from('team_members').select('id,name,role').order('created_at');
    if(error) console.error('loadTeam', error);
    team = data || [];
  }
  async function loadInvites(){
    if(!currentUser || currentUser.role!=='admin'){ pendingInvites = []; return; }
    const { data, error } = await sb.from('team_invites').select('email,name,role').order('created_at');
    if(error) console.error('loadInvites', error);
    pendingInvites = data || [];
  }
  async function loadActivity(){
    if(!currentUser || currentUser.role!=='admin'){ activity = []; return; }
    const { data, error } = await sb.from('activity_log').select('ts,actor,action').order('ts',{ascending:false}).limit(120);
    if(error) console.error('loadActivity', error);
    activity = (data||[]).map(a=>({date:new Date(a.ts).toLocaleString('fr-FR'), actor:a.actor, action:a.action}));
  }
  async function loadLikes(){
    const { data, error } = await sb.from('likes').select('product_id,count');
    if(error) console.error('loadLikes', error);
    likes = {};
    (data||[]).forEach(r=>{ likes[r.product_id] = r.count; });
  }
  async function loadTraffic(){
    if(!currentUser || currentUser.role!=='admin'){ traffic = {}; return; }
    const { data, error } = await sb.from('traffic').select('week_key,visits,clicks');
    if(error) console.error('loadTraffic', error);
    traffic = {};
    (data||[]).forEach(r=>{ traffic[r.week_key] = {visits:r.visits, clicks:r.clicks}; });
  }
  async function loadExpenses(){
    if(!currentUser || currentUser.role!=='admin'){ expenses = []; return; }
    const { data, error } = await sb.from('expenses').select('id,ts,label,amount,type');
    if(error) console.error('loadExpenses', error);
    expenses = data || [];
  }
  async function loadOfflineSales(){
    if(!currentUser || currentUser.role!=='admin'){ offlineSales = []; return; }
    const { data, error } = await sb.from('offline_sales').select('id,ts,label,amount');
    if(error) console.error('loadOfflineSales', error);
    offlineSales = data || [];
  }
  async function loadSettings(){
    const { data, error } = await sb.from('settings').select('whatsapp,phone,facebook,orange_money,promo_active,promo_percent,promo_ends_at,delivery_enabled,delivery_zones,categories').eq('id', true).maybeSingle();
    if(error) console.error('loadSettings', error);
    settings = data || {whatsapp:'', phone:'', facebook:'', orange_money:'', promo_active:false, promo_percent:0, promo_ends_at:null, delivery_enabled:false, delivery_zones:[], categories:[]};
    categories = Array.isArray(settings.categories) ? settings.categories : [];
    deliveryZones = Array.isArray(settings.delivery_zones) ? settings.delivery_zones : [];
  }
  function deliveryActive(){ return !!settings.delivery_enabled && deliveryZones.length > 0; }
  function parseDeliveryZones(text){
    return String(text||'').split('\n').map(l=>l.trim()).filter(Boolean).map(line=>{
      const idx = line.indexOf(':');
      if(idx === -1) return {zone: line, price: null};
      const zone = line.slice(0, idx).trim();
      const priceRaw = line.slice(idx+1).replace(/[^0-9]/g,'');
      return {zone, price: priceRaw ? Number(priceRaw) : null};
    }).filter(z=>z.zone);
  }
  function formatDeliveryZones(zones){
    return (zones||[]).map(z=> z.price ? `${z.zone} : ${z.price}` : z.zone).join('\n');
  }
  function renderDeliveryZoneOptions(){
    const sel = document.getElementById('custDeliveryZone');
    if(!sel) return;
    if(!deliveryActive()){ sel.style.display = 'none'; sel.value=''; return; }
    sel.style.display = '';
    sel.innerHTML = '<option value="">Zone de livraison (facultatif)</option>'
      + deliveryZones.map(z=>`<option value="${escapeHtml(z.zone)}">${escapeHtml(z.zone)}${z.price ? ' — '+money(z.price) : ' (à convenir)'}</option>`).join('');
  }
  function promoActive(){
    if(!settings.promo_active || Number(settings.promo_percent) <= 0) return false;
    if(settings.promo_ends_at && new Date(settings.promo_ends_at).getTime() <= Date.now()) return false;
    return true;
  }

  let promoCountdownTimer = null;
  function renderPromoCountdown(){
    const el = document.getElementById('promoCountdown');
    if(!el) return;
    if(promoCountdownTimer){ clearInterval(promoCountdownTimer); promoCountdownTimer = null; }
    if(!promoActive() || !settings.promo_ends_at){
      el.style.display = 'none';
      return;
    }
    const endTs = new Date(settings.promo_ends_at).getTime();
    const textEl = document.getElementById('promoCountdownText');
    const tick = () => {
      const diff = endTs - Date.now();
      if(diff <= 0){
        el.style.display = 'none';
        clearInterval(promoCountdownTimer); promoCountdownTimer = null;
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      const pad = n => String(n).padStart(2,'0');
      const parts = days > 0 ? `${days}j ${pad(hours)}h ${pad(mins)}m` : `${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
      textEl.textContent = `-${settings.promo_percent}% · Fin dans ${parts}`;
    };
    el.style.display = 'flex';
    tick();
    promoCountdownTimer = setInterval(tick, 1000);
  }
  function effectivePrice(price){
    if(!promoActive()) return Number(price);
    return Math.round(Number(price) * (1 - Number(settings.promo_percent)/100));
  }
  async function loadSalesArchive(){
    if(!currentUser || currentUser.role!=='admin'){ salesArchive = {count:0, revenue:0, byProduct:{}}; return; }
    const { data, error } = await sb.from('sales_archive').select('count,revenue,by_product').eq('id', true).maybeSingle();
    if(error) console.error('loadSalesArchive', error);
    salesArchive = data ? {count:data.count||0, revenue:data.revenue||0, byProduct:data.by_product||{}} : {count:0, revenue:0, byProduct:{}};
  }

  async function loadAll(){
    await Promise.all([loadProducts(), loadVariants(), loadLikes(), loadSettings()]);
    await trackVisit();
    await initPush();
    renderContactBar();
    renderSubscribeMini();
    renderCategoriesUI();
    renderStore();
    renderCarousel(); renderHeroShowcase();
    renderPromoCountdown();
    renderDeliveryZoneOptions();

    const sharedProductId = new URLSearchParams(location.search).get('p');
    if(sharedProductId) scrollToProduct(sharedProductId);

    const { data:{ session } } = await sb.auth.getSession();
    if(session) await handleAuthSession();
  }

  async function handleAuthSession(){
    const { data:{ user } } = await sb.auth.getUser();
    if(!user){ currentUser = null; return; }
    const { data } = await sb.from('team_members').select('id,name,role').eq('auth_user_id', user.id).maybeSingle();
    currentUser = data || null;
    if(currentUser){
      await Promise.all([loadProducts(), loadVariants()]);
      await Promise.all([loadTeam(), loadOrders()]);
      if(currentUser.role==='admin'){
        await Promise.all([loadActivity(), loadExpenses(), loadOfflineSales(), loadSettings(), loadSalesArchive(), loadInvites(), loadTraffic()]);
      }
      renderLoggedArea();
      startInactivityTimer();
      subscribeOrdersRealtime();
      refreshTeamAlertsBtn();
    }
  }

  function subscribeOrdersRealtime(){
    if(ordersRealtimeChannel) return;
    ordersRealtimeChannel = sb.channel('orders-changes')
      .on('postgres_changes', {event:'*', schema:'public', table:'orders'}, async ()=>{
        if(!currentUser) return;
        await loadOrders();
        updateOrdersBadge();
        if(document.getElementById('tab-commandes').style.display !== 'none') renderOrdersTab();
        if(currentUser.role==='admin') renderOverview();
      })
      .subscribe();
  }

  function updateOrdersBadge(){
    if(!currentUser) return;
    const isAdmin = currentUser.role==='admin';
    const pending = orders.filter(o=> o.status==='nouvelle' && (isAdmin || o.claimedBy===null)).length;
    const badge = document.getElementById('commandesBadge');
    if(badge){ badge.textContent = String(pending); badge.style.display = pending>0 ? 'inline-flex' : 'none'; }
    document.title = pending>0 ? `(${pending}) ${baseTitle}` : baseTitle;
  }

  /* ---------- TRAFFIC TRACKING ---------- */
  function weekKey(d){
    const date = new Date(d);
    const jan1 = new Date(date.getFullYear(),0,1);
    const week = Math.ceil((((date - jan1) / 86400000) + jan1.getDay() + 1) / 7);
    return date.getFullYear() + '-S' + String(week).padStart(2,'0');
  }
  async function trackVisit(){ await sb.rpc('track_visit', {p_week: weekKey(Date.now())}); }
  async function trackClick(){ await sb.rpc('track_click', {p_week: weekKey(Date.now())}); }

  /* ---------- WHATSAPP HELPERS ---------- */
  const WA_ICON = '<svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2z"/></svg>';
  const CALL_ICON = '<svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>';
  const BELL_ICON = '<svg viewBox="0 0 24 24"><path d="M12 22a2.2 2.2 0 002.2-2.2H9.8A2.2 2.2 0 0012 22zm6.6-5.3v-5.2c0-3.2-1.8-5.9-4.8-6.6v-.7A1.8 1.8 0 0012 2.4a1.8 1.8 0 00-1.8 1.8v.7c-3 .7-4.8 3.4-4.8 6.6v5.2L3.6 18.5v.9h16.8v-.9l-1.8-1.8z"/></svg>';
  const FB_ICON = '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"/></svg>';
  function waNumber(){ return (settings.whatsapp||'').replace(/[^0-9]/g,''); }
  function waLink(message){
    const num = waNumber();
    const txt = encodeURIComponent(message||'');
    return num ? `https://wa.me/${num}?text=${txt}` : '';
  }
  /* ---------- NOTIFICATIONS PUSH (client) ---------- */
  // Clé publique VAPID (voir NOTIFICATIONS.md). La clé privée reste côté serveur.
  const VAPID_PUBLIC_KEY = 'BA5wOVE-Es3Aj3HQnTwfBZYUTIqi9CaxK6D0Kbj9cXWQVg_-iU5HrpQhehXv8NWRnmADgOB2MMizeAb4Tb2AzaE';
  let swRegistration = null;

  function pushSupported(){
    return 'serviceWorker' in navigator && 'PushManager' in window && !!VAPID_PUBLIC_KEY;
  }
  function urlBase64ToUint8Array(base64String){
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));
  }
  async function initPush(){
    if(!pushSupported()) return;
    try{ swRegistration = await navigator.serviceWorker.register('sw.js'); }
    catch(e){ console.error('service worker', e); }
  }
  async function currentPushSubscription(){
    if(!swRegistration) return null;
    return await swRegistration.pushManager.getSubscription();
  }
  async function refreshSubscribeLabel(){
    const label = document.getElementById('subscribeLabel');
    if(!label) return;
    const sub = await currentPushSubscription();
    label.textContent = sub ? 'Ne plus recevoir les nouveautés' : 'Recevoir les nouveautés';
  }
  async function renderSubscribeMini(){
    const btn = document.getElementById('subscribeMini');
    if(!btn) return;
    if(!pushSupported()){ btn.style.display = 'none'; return; }
    btn.style.display = 'inline-flex';
    const sub = await currentPushSubscription();
    if(sub){
      btn.classList.add('is-subscribed');
      btn.textContent = '✓ Abonnée';
    } else {
      btn.classList.remove('is-subscribed');
      btn.textContent = "🔔 S'abonner";
    }
  }
  const subscribeMini = document.getElementById('subscribeMini');
  if(subscribeMini) subscribeMini.addEventListener('click', async ()=>{
    const sub = await currentPushSubscription();
    if(sub){
      if(!confirm('Se désabonner des notifications Joda Boutique ?')) return;
      await unsubscribeFromPush();
    } else {
      subscribeMini.textContent = 'Activation…';
      const ok = await subscribeToPush(null, null);
      if(!ok) alert("Notifications refusées ou indisponibles. Autorisez les notifications dans votre navigateur, puis réessayez.");
    }
    await renderSubscribeMini();
    await refreshSubscribeLabel();
  });
  // Enregistre l'abonnement en base. orderId/customer facultatifs (suivi de commande).
  async function savePushSubscription(sub, orderId, customer){
    const json = sub.toJSON();
    const row = {
      id: 's'+Date.now()+Math.floor(Math.random()*1000),
      endpoint: json.endpoint,
      p256dh: json.keys.p256dh,
      auth: json.keys.auth
    };
    if(orderId) row.order_id = orderId;
    if(customer) row.customer = customer;
    // upsert sur endpoint : un même navigateur ne crée pas de doublon.
    const { error } = await sb.from('push_subscribers').upsert(row, {onConflict:'endpoint'});
    if(error) console.error('savePushSubscription', error);
    return !error;
  }
  async function subscribeToPush(orderId, customer){
    if(!pushSupported()) return false;
    if(!swRegistration) await initPush();
    if(!swRegistration) return false;
    const permission = await Notification.requestPermission();
    if(permission !== 'granted') return false;
    let sub = await currentPushSubscription();
    if(!sub){
      sub = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }
    return await savePushSubscription(sub, orderId, customer);
  }
  async function unsubscribeFromPush(){
    const sub = await currentPushSubscription();
    if(!sub) return;
    await sb.from('push_subscribers').delete().eq('endpoint', sub.endpoint);
    await sub.unsubscribe();
  }

  /* ---------- ALERTES ÉQUIPE (nouvelle commande / annulation) ---------- */
  async function subscribeTeamPush(){
    if(!pushSupported() || !currentUser) return false;
    if(!swRegistration) await initPush();
    if(!swRegistration) return false;
    const permission = await Notification.requestPermission();
    if(permission !== 'granted') return false;
    let sub = await currentPushSubscription();
    if(!sub){
      sub = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }
    const j = sub.toJSON();
    const row = {
      id: 't'+Date.now()+Math.floor(Math.random()*1000),
      endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth,
      team_member_id: currentUser.id
    };
    const { error } = await sb.from('team_push_subscribers').upsert(row, {onConflict:'endpoint'});
    return !error;
  }
  async function unsubscribeTeamPush(){
    const sub = await currentPushSubscription();
    if(!sub || !currentUser) return;
    // On ne coupe pas l'abonnement navigateur : il peut aussi servir au suivi client.
    await sb.from('team_push_subscribers').delete().eq('endpoint', sub.endpoint).eq('team_member_id', currentUser.id);
  }
  async function isTeamPushSubscribed(){
    if(!currentUser) return false;
    const sub = await currentPushSubscription();
    if(!sub) return false;
    const { data } = await sb.from('team_push_subscribers').select('id').eq('endpoint', sub.endpoint).eq('team_member_id', currentUser.id).maybeSingle();
    return !!data;
  }
  async function refreshTeamAlertsBtn(){
    const btn = document.getElementById('teamAlertsBtn');
    if(!btn) return;
    if(!pushSupported()){ btn.style.display = 'none'; return; }
    btn.style.display = '';
    const subscribed = await isTeamPushSubscribed();
    btn.classList.toggle('is-subscribed', subscribed);
    btn.textContent = subscribed ? '🔔 Alertes activées' : '🔔 Alertes commandes';
  }
  document.getElementById('teamAlertsBtn').addEventListener('click', async ()=>{
    const btn = document.getElementById('teamAlertsBtn');
    const subscribed = await isTeamPushSubscribed();
    if(subscribed){
      await unsubscribeTeamPush();
    } else {
      btn.textContent = 'Activation…';
      const ok = await subscribeTeamPush();
      if(!ok) alert("Notifications refusées ou indisponibles. Autorisez les notifications dans votre navigateur, puis réessayez.");
    }
    await refreshTeamAlertsBtn();
  });
  // Alerte l'équipe (push + email si configuré) sans bloquer le flux principal.
  async function notifyTeam(event, orderId){
    try{
      const res = await fetch(`${SUPABASE_URL}/functions/v1/notify-team`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({event, orderId})
      });
      if(!res.ok) console.error('notifyTeam', res.status, await res.text());
    }catch(e){ console.error('notifyTeam', e); /* alerte secondaire : on n'interrompt jamais la commande pour ça */ }
  }
  // Bouton du menu contact (délégué : le menu est reconstruit à chaque rendu).
  document.getElementById('contactBar').addEventListener('click', async (e)=>{
    if(!e.target.closest('#subscribeBtn')) return;
    e.stopPropagation();
    const label = document.getElementById('subscribeLabel');
    const sub = await currentPushSubscription();
    if(sub){
      await unsubscribeFromPush();
      label.textContent = 'Recevoir les nouveautés';
    } else {
      label.textContent = 'Activation…';
      const ok = await subscribeToPush(null, null);
      label.textContent = ok ? 'Notifications activées ✓' : 'Notifications refusées';
      setTimeout(refreshSubscribeLabel, 2500);
    }
  });

  function messengerLinkFrom(fbUrl){
    const match = String(fbUrl||'').match(/facebook\.com\/(?:pages\/[^\/]+\/)?([^\/\?&]+)/i);
    return match && match[1] ? `https://m.me/${match[1]}` : fbUrl;
  }
  function buildContactItems(includeBell){
    const num = waNumber();
    const phoneNum = (settings.phone||'').replace(/[^0-9]/g,'');
    const fbUrl = (settings.facebook||'').trim();
    let items = '';
    if(num){
      items += `<a class="contact-menu-item wa" href="${waLink('Bonjour Joda Boutique, je vous contacte depuis votre site.')}" target="_blank" rel="noopener">
        <span class="mi-icon">${WA_ICON}</span><span class="mi-text">WhatsApp</span></a>`;
    }
    if(phoneNum){
      items += `<a class="contact-menu-item call" href="tel:+${phoneNum}">
        <span class="mi-icon">${CALL_ICON}</span><span class="mi-text">Appeler<span class="mi-number">+${phoneNum}</span></span></a>`;
    }
    if(fbUrl){
      const messengerLink = messengerLinkFrom(fbUrl);
      items += `<a class="contact-menu-item fb" href="${escapeHtml(messengerLink)}" target="_blank" rel="noopener">
        <span class="mi-icon">${FB_ICON}</span><span class="mi-text">Messenger</span></a>`;
    }
    if(includeBell && pushSupported()){
      items += `<button type="button" class="contact-menu-item bell" id="subscribeBtn">
        <span class="mi-icon">${BELL_ICON}</span><span class="mi-text" id="subscribeLabel">Recevoir les nouveautés</span></button>`;
    }
    return items;
  }
  function renderContactBar(){
    const bar = document.getElementById('contactBar');
    const num = waNumber();
    const phoneNum = (settings.phone||'').replace(/[^0-9]/g,'');
    const fbUrl = (settings.facebook||'').trim();
    if(!num && !phoneNum && !fbUrl){ bar.style.display='none'; return; }
    bar.style.display='flex';
    const items = buildContactItems(true);
    bar.innerHTML = `
      <div class="contact-menu">
        <button type="button" class="contact-menu-btn" id="contactMenuBtn">Nous contacter ▾</button>
        <div class="contact-menu-panel" id="contactMenuPanel">${items}</div>
      </div>`;
    refreshSubscribeLabel();
  }
  document.getElementById('contactBar').addEventListener('click', (e)=>{
    if(e.target.closest('#contactMenuBtn')){
      e.stopPropagation();
      document.querySelector('.contact-menu').classList.toggle('open');
    }
  });
  document.addEventListener('click', ()=>{
    const menu = document.querySelector('.contact-menu');
    if(menu) menu.classList.remove('open');
  });

  /* ---------- IMAGE HELPER ---------- */
  function resizeImageToBlob(file, maxDim, quality){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onerror = ()=>reject(new Error('read failed'));
      reader.onload = ()=>{
        const img = new Image();
        img.onerror = ()=>reject(new Error('image load failed'));
        img.onload = ()=>{
          let w = img.width, h = img.height;
          if(w > h && w > maxDim){ h = Math.round(h * maxDim / w); w = maxDim; }
          else if(h > maxDim){ w = Math.round(w * maxDim / h); h = maxDim; }
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('encode failed')), 'image/jpeg', quality);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  // Redimensionne puis envoie la photo dans le stockage Supabase ; renvoie l'URL publique.
  async function uploadProductPhoto(file, productId){
    const blob = await resizeImageToBlob(file, 700, 0.72);
    const path = `${productId}-${Date.now()}.jpg`;
    const { error } = await sb.storage.from('product-images').upload(path, blob, {contentType:'image/jpeg', upsert:true});
    if(error) throw error;
    const { data } = sb.storage.from('product-images').getPublicUrl(path);
    return data.publicUrl;
  }
  // Convertit une ancienne photo base64 (stockée dans la base) en fichier dans le stockage.
  async function migrateLegacyImagesToStorage(){
    const legacy = products.filter(p=>p.image && p.image.startsWith('data:'));
    let done = 0;
    for(const p of legacy){
      try{
        const blob = await (await fetch(p.image)).blob();
        const path = `${p.id}-${Date.now()}.jpg`;
        const { error: upErr } = await sb.storage.from('product-images').upload(path, blob, {contentType:'image/jpeg', upsert:true});
        if(upErr) throw upErr;
        const { data } = sb.storage.from('product-images').getPublicUrl(path);
        const { error: updErr } = await sb.from('products').update({image:data.publicUrl}).eq('id', p.id);
        if(updErr) throw updErr;
        done++;
      }catch(e){ console.error('migrateLegacyImagesToStorage', p.id, e); }
    }
    return {done, total:legacy.length};
  }

  function money(n){ return Number(n).toLocaleString('fr-FR') + ' GNF'; }
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function teamName(id){ const t = team.find(x=>x.id===id); return t ? t.name : '—'; }

  /* ---------- STORE RENDER ---------- */
  function isApproved(p){ return p.approved === true; }
  function productCardHtml(p, i){
    const pVariants = variantsFor(p.id);
    let activeVariant = null;
    if(pVariants.length){
      activeVariant = pVariants.find(v=>v.id===selectedVariant[p.id]) || pVariants.find(v=>Number(v.stock)>0) || pVariants[0];
      selectedVariant[p.id] = activeVariant.id;
    }
    const stockNum = activeVariant ? Number(activeVariant.stock) : Number(p.stock);
    const outOfStock = stockNum <= 0;
    const low = stockNum > 0 && stockNum <= 3;
    const displayImage = (activeVariant && activeVariant.image) || p.image;
    const media = displayImage
      ? `<div class="photo-wrap"><img src="${displayImage}" alt="${escapeHtml(p.name)}" loading="lazy"></div>`
      : `<div class="icon">${iconFor(p.cat)}</div>`;
    const likeCount = likes[p.id] || 0;
    const liked = sessionLikes[p.id] ? 'liked' : '';
    const priceHtml = promoActive()
      ? `<span class="price">${effectivePrice(p.price).toLocaleString('fr-FR')}</span><span class="curr">GNF</span>
         <div class="price-old-row"><span class="price-old">${Number(p.price).toLocaleString('fr-FR')} GNF</span><span class="promo-badge">-${settings.promo_percent}%</span></div>`
      : `<span class="price">${Number(p.price).toLocaleString('fr-FR')}</span><span class="curr">GNF</span>`;
    const swatches = pVariants.length ? `<div class="color-swatches">
      ${pVariants.map(v=>`<button type="button" class="swatch ${v.id===activeVariant.id?'active':''} ${Number(v.stock)<=0?'oos':''}" data-swatch="${v.id}" data-swatch-product="${p.id}" title="${escapeHtml(v.color)}${Number(v.stock)<=0?' (épuisé)':''}">${escapeHtml(v.color)}</button>`).join('')}
    </div>` : '';
    return `<div class="tag-card" id="prod-${p.id}" style="transform:rotate(${(i%2===0?-1:1)*1.4}deg)">
      <button class="like-btn ${liked}" data-like="${p.id}" title="J'aime">♥${likeCount>0?`<span class="like-count">${likeCount}</span>`:''}</button>
      <button class="share-btn" data-share="${p.id}" title="Partager cette pièce">🔗</button>
      ${media}
      <h3>${escapeHtml(p.name)}</h3>
      <div class="cat">${escapeHtml(p.cat)}</div>
      ${swatches}
      <div class="price-row ${promoActive()?'promo':''}">${priceHtml}</div>
      <div class="stock ${low?'low':''}">${outOfStock ? 'Épuisé' : stockNum + ' en stock'}</div>
      <button class="add" data-id="${p.id}" ${activeVariant?`data-variant-id="${activeVariant.id}"`:''} ${outOfStock?'disabled':''}>${outOfStock?'Indisponible':'Ajouter au panier'}</button>
    </div>`;
  }
  function refreshProductCard(id){
    const p = products.find(x=>x.id===id);
    const el = document.getElementById('prod-'+id);
    if(!p || !el) return;
    const tmp = document.createElement('div');
    tmp.innerHTML = productCardHtml(p, 0);
    const newEl = tmp.firstElementChild;
    el.replaceWith(newEl);
    wireStoreButtons(newEl);
  }

  function wireStoreButtons(root){
    root.querySelectorAll('button.add').forEach(btn=>{
      btn.addEventListener('click', ()=>{ addToCart(btn.dataset.id, btn.dataset.variantId || null); trackClick(); });
    });
    root.querySelectorAll('button[data-swatch]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        selectedVariant[btn.dataset.swatchProduct] = btn.dataset.swatch;
        refreshProductCard(btn.dataset.swatchProduct);
      });
    });
    root.querySelectorAll('.photo-wrap img').forEach(img=>{
      img.addEventListener('click', ()=> openLightbox(img.src, img.alt));
    });
    root.querySelectorAll('button[data-like]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const id = btn.dataset.like;
        if(sessionLikes[id]) return;
        sessionLikes[id] = true;
        const { data, error } = await sb.rpc('like_product', {p_product_id:id});
        if(!error) likes[id] = data;
        trackClick();
        renderStore();
      });
    });
    root.querySelectorAll('button[data-share]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const id = btn.dataset.share;
        const p = products.find(x=>x.id===id);
        const url = `${location.origin}/produit/${encodeURIComponent(id)}`;
        const shareData = { title: p ? p.name+' — Joda Boutique' : 'Joda Boutique', url };
        if(navigator.share){
          try{ await navigator.share(shareData); }catch(e){ /* partage annulé */ }
          return;
        }
        if(navigator.clipboard && navigator.clipboard.writeText){
          try{
            await navigator.clipboard.writeText(url);
            const original = btn.textContent;
            btn.textContent = '✓';
            setTimeout(()=>{ btn.textContent = original; }, 1500);
            return;
          }catch(e){ /* on retombe sur prompt() */ }
        }
        prompt('Copiez ce lien pour le partager :', url);
      });
    });
  }

  function currentSearch(){
    const nameEl = document.getElementById('searchName');
    const minEl = document.getElementById('searchMin');
    const maxEl = document.getElementById('searchMax');
    return {
      name: nameEl ? nameEl.value.trim().toLowerCase() : '',
      min: minEl && minEl.value !== '' ? Number(minEl.value) : null,
      max: maxEl && maxEl.value !== '' ? Number(maxEl.value) : null
    };
  }
  function matchesSearch(p, s){
    if(s.name && !String(p.name).toLowerCase().includes(s.name)) return false;
    const price = effectivePrice(p.price);
    if(s.min !== null && price < s.min) return false;
    if(s.max !== null && price > s.max) return false;
    return true;
  }
  function groupByCategory(list){
    const map = {};
    list.forEach(p=>{ const c = (p.cat && p.cat.trim()) || 'Autre'; (map[c] = map[c] || []).push(p); });
    const toGroup = (name, items)=>{
      const withImg = items.find(p=>p.image);
      return {name, items, cover: withImg ? withImg.image : ''};
    };
    const ordered = [];
    categories.forEach(c=>{ if(map[c]){ ordered.push(toGroup(c, map[c])); delete map[c]; } });
    Object.keys(map).sort((a,b)=>a.localeCompare(b,'fr')).forEach(c=> ordered.push(toGroup(c, map[c])));
    return ordered;
  }

  function renderStore(){
    const grid = document.getElementById('productGrid');
    const visible = products.filter(isApproved);
    document.getElementById('heroStockCount').textContent = visible.reduce((s,p)=>s+Number(p.stock||0),0);

    const s = currentSearch();
    const searchActive = s.name !== '' || s.min !== null || s.max !== null;
    document.body.classList.toggle('searching', searchActive);
    const filtered = visible.filter(p=> matchesSearch(p, s));

    document.getElementById('productCountNote').textContent =
      searchActive ? (filtered.length + ' résultat' + (filtered.length>1?'s':'')) : (visible.length + ' pièces disponibles');

    if(visible.length === 0){
      grid.innerHTML = '<div class="loading">Aucune pièce pour le moment. Ajoutez-en depuis l\'espace équipe.</div>';
      return;
    }

    if(searchActive){
      grid.innerHTML = filtered.length
        ? `<div class="grid">${filtered.map((p,i)=>productCardHtml(p,i)).join('')}</div>`
        : '<div class="loading">Aucun produit ne correspond à votre recherche.</div>';
      wireStoreButtons(grid);
      return;
    }

    const groups = groupByCategory(visible);
    grid.innerHTML = groups.map(g=>{
      const isOpen = !!openCategories[g.name];
      const cover = g.cover
        ? `<span class="cat-cover"><img src="${g.cover}" alt="" loading="lazy"></span>`
        : `<span class="cat-cover cat-cover-icon">${iconFor(g.name)}</span>`;
      return `<div class="cat-group ${isOpen?'open':''}">
        <button class="cat-header" type="button" data-cat-toggle="${escapeHtml(g.name)}">
          <span class="cat-head-left">${cover}<span class="cat-title">${escapeHtml(g.name)}</span></span>
          <span class="cat-meta"><span class="cat-count">${g.items.length} pièce${g.items.length>1?'s':''}</span><span class="cat-chevron">▾</span></span>
        </button>
        <div class="cat-body"><div class="grid">${g.items.map((p,i)=>productCardHtml(p,i)).join('')}</div></div>
      </div>`;
    }).join('');
    grid.querySelectorAll('[data-cat-toggle]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const name = btn.getAttribute('data-cat-toggle');
        openCategories[name] = !openCategories[name];
        btn.closest('.cat-group').classList.toggle('open', !!openCategories[name]);
      });
    });
    wireStoreButtons(grid);
  }

  // Ouvre la catégorie d'une pièce et fait défiler la collection jusqu'à elle.
  function scrollToProduct(productId){
    const p = products.find(x=>x.id===productId);
    if(!p) return;
    openCategories[(p.cat && p.cat.trim()) || 'Autre'] = true;
    document.getElementById('searchName').value = '';
    document.getElementById('searchMin').value = '';
    document.getElementById('searchMax').value = '';
    renderStore();
    requestAnimationFrame(()=>{
      const el = document.getElementById('prod-'+productId);
      if(!el) return;
      el.scrollIntoView({behavior:'smooth', block:'center'});
      el.classList.add('flash-highlight');
      setTimeout(()=>el.classList.remove('flash-highlight'), 1600);
    });
  }

  /* ---------- SEARCH BAR WIRING ---------- */
  ['searchName','searchMin','searchMax'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener('input', renderStore);
  });
  document.getElementById('clearSearch').addEventListener('click', ()=>{
    document.getElementById('searchName').value = '';
    document.getElementById('searchMin').value = '';
    document.getElementById('searchMax').value = '';
    renderStore();
  });

  /* ---------- HERO SHOWCASE (défilement continu du catalogue) ---------- */
  function renderHeroShowcase(){
    const showcase = document.getElementById('heroShowcase');
    const track = document.getElementById('hsTrack');
    if(!showcase || !track) return;
    const imgs = products.filter(p=> p.image && isApproved(p)).map(p=>p.image);
    if(imgs.length === 0){ showcase.style.display = 'none'; return; }
    showcase.style.display = '';
    // liste dupliquée => boucle sans coupure (l'animation translate de -50%).
    const html = imgs.map(src=>`<img class="hs-img" src="${src}" alt="" loading="lazy">`).join('');
    track.innerHTML = html + html;
    // vitesse proportionnelle au nombre d'images (rythme constant).
    track.style.animationDuration = Math.max(18, imgs.length * 4) + 's';
  }

  /* ---------- FEATURED CAROUSEL ---------- */
  let carouselTimer = null;
  let carouselItems = [];
  function renderCarousel(){
    const section = document.getElementById('carouselSection');
    const track = document.getElementById('carouselTrack');
    const dots = document.getElementById('carouselDots');
    carouselItems = products.filter(p=>p.image && isApproved(p));
    if(carouselTimer){ clearInterval(carouselTimer); carouselTimer = null; }
    if(carouselItems.length === 0){ section.style.display = 'none'; return; }
    section.style.display = '';
    track.innerHTML = carouselItems.map(p=>{
      const cp = promoActive()
        ? `${effectivePrice(p.price).toLocaleString('fr-FR')} GNF<div class="cp-old-row"><span class="cp-old">${Number(p.price).toLocaleString('fr-FR')} GNF</span><span class="promo-badge">-${settings.promo_percent}%</span></div>`
        : `${Number(p.price).toLocaleString('fr-FR')} GNF`;
      return `
      <div class="car-slide" data-pid="${p.id}" title="Voir dans la collection">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
        <div class="car-caption">
          <div class="cn">${escapeHtml(p.name)}</div>
          <div class="cp">${cp}</div>
        </div>
      </div>`;
    }).join('');
    dots.innerHTML = carouselItems.map((p,i)=>`<button class="car-dot ${i===0?'active':''}" data-i="${i}"></button>`).join('');
    dots.querySelectorAll('.car-dot').forEach(d=>{
      d.addEventListener('click', ()=> goToSlide(Number(d.dataset.i)));
    });
    track.querySelectorAll('.car-slide[data-pid]').forEach(slide=>{
      slide.addEventListener('click', ()=> scrollToProduct(slide.dataset.pid));
    });
    if(carouselItems.length > 1){
      carouselTimer = setInterval(()=>{
        const cur = currentSlideIndex();
        goToSlide((cur + 1) % carouselItems.length);
      }, 4200);
    }
  }
  function currentSlideIndex(){
    const track = document.getElementById('carouselTrack');
    const slides = track.querySelectorAll('.car-slide');
    if(!slides.length) return 0;
    const slideWidth = slides[0].offsetWidth + 20;
    return Math.round(track.scrollLeft / slideWidth);
  }
  function goToSlide(i){
    const track = document.getElementById('carouselTrack');
    const slides = track.querySelectorAll('.car-slide');
    if(!slides.length) return;
    const slideWidth = slides[0].offsetWidth + 20;
    track.scrollTo({left: i * slideWidth, behavior:'smooth'});
    document.querySelectorAll('.car-dot').forEach((d,idx)=>d.classList.toggle('active', idx===i));
  }
  document.getElementById('carPrev').addEventListener('click', ()=>{
    goToSlide(Math.max(0, currentSlideIndex()-1));
  });
  document.getElementById('carNext').addEventListener('click', ()=>{
    goToSlide(Math.min(carouselItems.length-1, currentSlideIndex()+1));
  });
  document.getElementById('carouselTrack').addEventListener('mouseenter', ()=>{ if(carouselTimer){ clearInterval(carouselTimer); carouselTimer=null; } });
  document.getElementById('carouselTrack').addEventListener('mouseleave', ()=>{
    if(carouselItems.length > 1 && !carouselTimer){
      carouselTimer = setInterval(()=>{ goToSlide((currentSlideIndex()+1) % carouselItems.length); }, 4200);
    }
  });

  function addToCart(id, variantId){
    const p = products.find(x=>x.id===id);
    if(!p) return;
    const key = variantId ? `${id}::${variantId}` : id;
    const limit = variantId ? Number((variants.find(v=>v.id===variantId)||{}).stock || 0) : Number(p.stock);
    const inCart = cart[key] || 0;
    if(inCart >= limit) return;
    cart[key] = inCart + 1;
    renderCart();
    openDrawer();
  }

  function renderCart(){
    const keys = Object.keys(cart).filter(k=>cart[k]>0);
    const count = keys.reduce((s,k)=>s+cart[k],0);
    document.getElementById('cartCount').textContent = count;
    const itemsEl = document.getElementById('drawerItems');
    const checkoutForm = document.getElementById('checkoutForm');
    if(keys.length===0){
      itemsEl.innerHTML = '<div class="empty-note">Votre panier est vide.</div>';
      checkoutForm.style.display='none';
    } else {
      checkoutForm.style.display='block';
      itemsEl.innerHTML = keys.map(key=>{
        const {productId, variantId} = parseCartKey(key);
        const p = products.find(x=>x.id===productId);
        if(!p) return '';
        const v = variantId ? variants.find(x=>x.id===variantId) : null;
        const label = v ? `${p.name} (${v.color})` : p.name;
        return `<div class="cart-item">
          <div>
            <div class="ci-name">${escapeHtml(label)}</div>
            <div class="ci-price">${money(effectivePrice(p.price))} × ${cart[key]}</div>
          </div>
          <div class="qty-ctrl">
            <button data-act="dec" data-key="${key}">−</button>
            <span>${cart[key]}</span>
            <button data-act="inc" data-key="${key}">+</button>
          </div>
        </div>`;
      }).join('');
      itemsEl.querySelectorAll('button[data-act]').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const key = btn.dataset.key;
          const {productId, variantId} = parseCartKey(key);
          const p = products.find(x=>x.id===productId);
          const limit = variantId ? Number((variants.find(x=>x.id===variantId)||{}).stock || 0) : Number(p.stock);
          if(btn.dataset.act==='inc'){ if(cart[key] < limit) cart[key]++; }
          else { cart[key]--; if(cart[key]<=0) delete cart[key]; }
          renderCart();
        });
      });
    }
    const merchandiseTotal = keys.reduce((s,key)=>{
      const {productId} = parseCartKey(key);
      const p = products.find(x=>x.id===productId);
      return s + (p ? effectivePrice(p.price) * cart[key] : 0);
    },0);
    const zoneSel = document.getElementById('custDeliveryZone');
    const zoneName = zoneSel ? zoneSel.value : '';
    const zone = zoneName ? deliveryZones.find(z=>z.zone===zoneName) : null;
    const deliveryFee = (zone && zone.price) ? Number(zone.price) : 0;
    const feeRow = document.getElementById('deliveryFeeRow');
    if(zone && zone.price){
      feeRow.style.display = '';
      document.getElementById('deliveryFeeAmount').textContent = money(deliveryFee);
    } else {
      feeRow.style.display = 'none';
    }
    document.getElementById('cartTotal').textContent = money(merchandiseTotal + deliveryFee);
  }
  document.getElementById('custDeliveryZone').addEventListener('change', renderCart);

  function openDrawer(){ document.getElementById('drawer').classList.add('open'); document.getElementById('overlay').classList.add('show'); }
  function closeDrawer(){ document.getElementById('drawer').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }

  function openLightbox(src, alt){
    if(!src) return;
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxImg').alt = alt || '';
    document.getElementById('imgLightbox').style.display = 'flex';
  }
  function closeLightbox(){
    document.getElementById('imgLightbox').style.display = 'none';
    document.getElementById('lightboxImg').src = '';
  }
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('imgLightbox').addEventListener('click', (e)=>{ if(e.target.id==='imgLightbox') closeLightbox(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeLightbox(); });

  document.getElementById('openCart').addEventListener('click', openDrawer);
  document.getElementById('closeCart').addEventListener('click', closeDrawer);
  document.getElementById('overlay').addEventListener('click', closeDrawer);
  document.getElementById('heroShop').addEventListener('click', ()=>{ window.scrollTo({top: document.getElementById('productGrid').offsetTop - 100, behavior:'smooth'}); });

  document.getElementById('checkoutBtn').addEventListener('click', async ()=>{
    const keys = Object.keys(cart).filter(k=>cart[k]>0);
    const msg = document.getElementById('checkoutMsg');
    if(keys.length===0){ msg.textContent = 'Ajoutez au moins un article.'; return; }
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.replace(/[^0-9]/g,'');
    const address = document.getElementById('custAddress').value.trim();
    const deliveryZone = document.getElementById('custDeliveryZone').value || null;
    if(!name){ msg.textContent = "Merci d'indiquer votre nom."; return; }
    if(!phone){ msg.textContent = "Merci d'indiquer votre numéro de téléphone (chiffres uniquement)."; return; }
    if(!address){ msg.textContent = "Merci d'indiquer votre adresse de livraison."; return; }
    const items = keys.map(key=>{
      const {productId, variantId} = parseCartKey(key);
      return variantId ? {id:productId, qty:cart[key], variantId} : {id:productId, qty:cart[key]};
    });

    msg.textContent = 'Envoi en cours…';
    const { data, error } = await sb.rpc('place_order', {p_customer:name, p_phone:phone, p_items:items, p_address:address, p_delivery_zone:deliveryZone});
    if(error){
      msg.textContent = "La commande n'a pas pu être enregistrée (stock insuffisant ou erreur de connexion). Réessayez.";
      return;
    }
    await Promise.all([loadProducts(), loadVariants()]);
    cart = {};
    renderCart(); renderStore(); renderCarousel(); renderHeroShowcase();
    if(currentUser){ await loadOrders(); renderLoggedArea(); }
    notifyTeam('new_order', data.id);

    // Abonnement au suivi de commande (si la cliente l'a accepté).
    const optIn = document.getElementById('notifyOptIn');
    if(optIn && optIn.checked && pushSupported()){
      subscribeToPush(data.id, name).catch(e=>console.error('push opt-in', e));
    }

    const orderItems = data.items || [];
    const total = data.total || 0;
    const deliveryFee = data.deliveryFee || 0;
    const grandTotal = total + deliveryFee;
    const recap = 'Bonjour Joda Boutique !%0AJe viens de passer une commande :%0A'
      + orderItems.map(it=>`- ${it.name}${it.color ? ' ('+it.color+')' : ''} x${it.qty}`).join('%0A')
      + `%0ATotal articles : ${money(total)}`
      + (deliveryZone ? `%0ALivraison (${deliveryZone})${deliveryFee ? ' : '+money(deliveryFee) : ' : à convenir'}` : '')
      + `%0ATotal à payer : ${money(grandTotal)}`
      + `%0ANom : ${name}` + (phone ? `%0ATéléphone : ${phone}` : '') + (address ? `%0AAdresse : ${address}` : '');
    const waHref = waLink(decodeURIComponent(recap));
    const contactItems = buildContactItems(false);
    const orangeMoney = (settings.orange_money||'').trim();
    msg.innerHTML = 'Commande envoyée ! Merci ' + escapeHtml(name) + '. Total à payer : ' + money(grandTotal) + '.'
      + (orangeMoney ? `<div class="checkout-om"><span class="om-label">Dépôt Orange Money</span><span class="om-number">${escapeHtml(orangeMoney)}</span><button type="button" class="btn-mini" id="copyOmBtn">Copier</button></div>` : '')
      + (waHref ? `<div class="checkout-wa"><a class="wa-btn" href="${waHref}" target="_blank" rel="noopener">${WA_ICON} Confirmer sur WhatsApp</a></div>` : '')
      + (contactItems ? `<p class="section-note" style="margin:12px 0 4px;">Vous pouvez aussi nous joindre directement :</p><div class="checkout-contact-list">${contactItems}</div>` : '');
    const copyOmBtn = document.getElementById('copyOmBtn');
    if(copyOmBtn) copyOmBtn.addEventListener('click', async ()=>{
      try{ await navigator.clipboard.writeText(orangeMoney); copyOmBtn.textContent = 'Copié ✓'; }
      catch(e){ prompt('Copiez ce numéro :', orangeMoney); }
    });
    document.getElementById('custName').value=''; document.getElementById('custPhone').value=''; document.getElementById('custAddress').value=''; document.getElementById('custDeliveryZone').value='';
    setTimeout(()=>{ if(!waHref && !contactItems && !orangeMoney){ msg.textContent=''; closeDrawer(); } }, 4000);
  });

  /* ---------- NAV / VIEWS ---------- */
  function setView(view){
    document.getElementById('storeView').style.display = view==='store' ? '' : 'none';
    document.getElementById('adminView').style.display = view==='admin' ? '' : 'none';
    document.querySelectorAll('.navbtn[data-view]').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
    if(view==='admin'){
      if(currentUser){ document.getElementById('loginGate').style.display='none'; document.getElementById('adminLoggedArea').style.display=''; }
      else { document.getElementById('loginGate').style.display=''; document.getElementById('adminLoggedArea').style.display='none'; }
    }
  }
  document.querySelectorAll('[data-view]').forEach(el=>{
    el.addEventListener('click', ()=> setView(el.dataset.view));
  });
  setView('store');

  /* ---------- LOGIN / AUTH ---------- */
  let authMode = 'login';
  function updateAuthModeUI(){
    const loginBtn = document.getElementById('modeLoginBtn');
    const signupBtn = document.getElementById('modeSignupBtn');
    loginBtn.style.background = authMode==='login' ? 'var(--navy)' : 'none';
    loginBtn.style.color = authMode==='login' ? '#fff' : 'var(--ink)';
    signupBtn.style.background = authMode==='signup' ? 'var(--navy)' : 'none';
    signupBtn.style.color = authMode==='signup' ? '#fff' : 'var(--ink)';
    document.getElementById('signupNote').style.display = authMode==='signup' ? 'block' : 'none';
    document.getElementById('authSubmitBtn').textContent = authMode==='signup' ? 'Créer mon compte' : 'Se connecter';
    document.getElementById('forgotPasswordBtn').style.display = authMode==='signup' ? 'none' : 'inline-block';
    document.getElementById('loginMsg').textContent = '';
  }
  document.getElementById('modeLoginBtn').addEventListener('click', ()=>{ authMode='login'; updateAuthModeUI(); });
  document.getElementById('modeSignupBtn').addEventListener('click', ()=>{ authMode='signup'; updateAuthModeUI(); });
  updateAuthModeUI();

  document.getElementById('authSubmitBtn').addEventListener('click', async ()=>{
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    const msg = document.getElementById('loginMsg');
    if(!email || !password){ msg.textContent = 'Renseignez votre email et votre mot de passe.'; return; }
    msg.textContent = 'Connexion en cours…';
    if(authMode==='signup'){
      const { error } = await sb.auth.signUp({email, password});
      if(error){ msg.textContent = error.message; return; }
      await handleAuthSession();
      if(!currentUser){
        msg.textContent = "Cet email n'a pas été invité par l'administratrice. Contactez-la pour recevoir une invitation.";
        await sb.auth.signOut();
        return;
      }
    } else {
      const { error } = await sb.auth.signInWithPassword({email, password});
      if(error){ msg.textContent = 'Email ou mot de passe incorrect.'; return; }
      await handleAuthSession();
      if(!currentUser){
        msg.textContent = "Ce compte n'a pas (ou plus) accès à l'espace équipe.";
        await sb.auth.signOut();
        return;
      }
    }
    msg.textContent = '';
    document.getElementById('authPassword').value = '';
    setView('admin');
  });

  document.getElementById('forgotPasswordBtn').addEventListener('click', async ()=>{
    const email = document.getElementById('authEmail').value.trim();
    const msg = document.getElementById('loginMsg');
    if(!email){ msg.textContent = "Indiquez votre email ci-dessus, puis cliquez à nouveau sur ce lien."; return; }
    msg.textContent = 'Envoi en cours…';
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + window.location.pathname });
    msg.textContent = error ? ('Erreur : '+error.message) : "Si ce compte existe, un email de réinitialisation vient d'être envoyé.";
  });

  /* ---------- VISIBILITÉ DES MOTS DE PASSE ---------- */
  function wirePasswordToggle(inputId, btnId){
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    btn.addEventListener('click', ()=>{
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? 'Masquer' : 'Afficher';
    });
  }
  wirePasswordToggle('authPassword', 'authPasswordToggle');
  wirePasswordToggle('adminNewPassword', 'adminNewPasswordToggle');
  wirePasswordToggle('myPassword', 'myPasswordToggle');
  wirePasswordToggle('resetPassword', 'resetPasswordToggle');

  /* ---------- RÉINITIALISATION VIA LIEN EMAIL ---------- */
  sb.auth.onAuthStateChange((event)=>{
    if(event === 'PASSWORD_RECOVERY'){
      document.getElementById('storeView').style.display = 'none';
      document.getElementById('adminView').style.display = '';
      document.getElementById('loginGate').style.display = 'none';
      document.getElementById('adminLoggedArea').style.display = 'none';
      document.getElementById('resetGate').style.display = '';
    }
  });
  document.getElementById('resetPasswordBtn').addEventListener('click', async ()=>{
    const pw = document.getElementById('resetPassword').value;
    const msg = document.getElementById('resetPasswordMsg');
    if(!pw || pw.length < 8){ msg.textContent = 'Le mot de passe doit contenir au moins 8 caractères.'; return; }
    const { error } = await sb.auth.updateUser({password:pw});
    if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    msg.textContent = 'Mot de passe mis à jour !';
    document.getElementById('resetPassword').value = '';
    await handleAuthSession();
    document.getElementById('resetGate').style.display = 'none';
    setView('admin');
  });

  async function doLogout(auto){
    stopInactivityTimer();
    await sb.auth.signOut();
    currentUser = null;
    if(ordersRealtimeChannel){ sb.removeChannel(ordersRealtimeChannel); ordersRealtimeChannel = null; }
    document.title = baseTitle;
    setView('admin');
    if(auto){
      const msg = document.getElementById('loginMsg');
      if(msg) msg.textContent = 'Vous avez été déconnectée après 5 minutes d\'inactivité. Reconnectez-vous.';
    }
  }
  document.getElementById('logoutBtn').addEventListener('click', ()=> doLogout(false));

  /* ---------- DÉCONNEXION AUTO APRÈS INACTIVITÉ ---------- */
  const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes
  let inactivityTimer = null;
  function resetInactivityTimer(){
    if(!currentUser) return;
    if(inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(()=>{ if(currentUser) doLogout(true); }, INACTIVITY_LIMIT);
  }
  function startInactivityTimer(){
    ['mousemove','mousedown','keydown','touchstart','scroll','click'].forEach(ev=>{
      document.addEventListener(ev, resetInactivityTimer, {passive:true});
    });
    resetInactivityTimer();
  }
  function stopInactivityTimer(){
    if(inactivityTimer){ clearTimeout(inactivityTimer); inactivityTimer = null; }
  }

  /* ---------- LOGGED AREA ---------- */
  function tabsForRole(role){
    if(role==='admin') return [
      {key:'overview', label:"Vue d'ensemble"},
      {key:'stats', label:'Statistiques'},
      {key:'finances', label:'Finances'},
      {key:'produits', label:'Produits'},
      {key:'commandes', label:'Commandes'},
      {key:'equipe', label:'Équipe'},
      {key:'reglages', label:'Réglages'}
    ];
    return [
      {key:'mystats', label:'Mes statistiques'},
      {key:'produits', label:'Mes produits'},
      {key:'commandes', label:'Commandes'},
      {key:'monprofil', label:'Mon profil'}
    ];
  }

  function renderLoggedArea(){
    document.getElementById('whoName').textContent = currentUser.name;
    document.getElementById('whoRole').textContent = currentUser.role==='admin' ? 'Administratrice' : 'Assistante';
    document.getElementById('whoRole').className = 'role-badge' + (currentUser.role==='admin' ? '' : ' assistant');

    const tabs = tabsForRole(currentUser.role);
    const tabsEl = document.getElementById('adminTabs');
    tabsEl.innerHTML = tabs.map((t,i)=>`<button class="admin-tab ${i===0?'active':''}" data-tab="${t.key}">${t.label}${t.key==='commandes' ? '<span class="tab-badge" id="commandesBadge" style="display:none;"></span>' : ''}</button>`).join('');
    ['overview','stats','finances','produits','commandes','equipe','monprofil','mystats','reglages'].forEach(k=>{
      document.getElementById('tab-'+k).style.display = (tabs[0].key===k) ? '' : 'none';
    });
    tabsEl.querySelectorAll('.admin-tab').forEach(tab=>{
      tab.addEventListener('click', ()=>{
        tabsEl.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        ['overview','stats','finances','produits','commandes','equipe','monprofil','mystats','reglages'].forEach(k=>{
          document.getElementById('tab-'+k).style.display = (tab.dataset.tab===k) ? '' : 'none';
        });
      });
    });

    document.getElementById('addProductTitle').textContent = currentUser.role==='admin' ? 'Ajouter une pièce' : 'Ajouter une pièce à mon rayon';
    document.getElementById('catalogTitle').textContent = currentUser.role==='admin' ? 'Catalogue complet' : 'Mes pièces';
    document.getElementById('ordersTitle').textContent = currentUser.role==='admin' ? 'Toutes les commandes' : 'Commandes disponibles et en cours';
    document.getElementById('addedByHeadCell').style.display = currentUser.role==='admin' ? '' : 'none';

    if(currentUser.role==='admin'){ renderOverview(); renderStatsTab(); renderFinancesTab(); renderSettingsTab(); }
    renderProductsTab();
    renderOrdersTab();
    if(currentUser.role==='admin') renderTeamTab();
    else { renderMyProfileTab(); renderMyStatsTab(); }
  }

  function renderOverview(){
    const statGrid = document.getElementById('statGrid');
    const nouvelles = orders.filter(o=>o.status==='nouvelle').length;
    const enCours = orders.filter(o=>o.status==='en cours').length;
    const traitees = orders.filter(o=>o.status==='traitée').length;
    const annulees = orders.filter(o=>o.status==='annulée').length;
    const rupture = products.filter(p=>Number(p.stock)<=0).length;
    const pending = products.filter(p=>!isApproved(p)).length;
    statGrid.innerHTML = `
      <div class="stat-card"><div class="num">${products.length}</div><div class="lbl">Pièces au catalogue</div></div>
      <div class="stat-card"><div class="num" style="color:${pending>0?'var(--wine)':'var(--navy)'}">${pending}</div><div class="lbl">En attente d'approbation</div></div>
      <div class="stat-card"><div class="num">${rupture}</div><div class="lbl">En rupture</div></div>
      <div class="stat-card"><div class="num">${nouvelles}</div><div class="lbl">Commandes nouvelles</div></div>
      <div class="stat-card"><div class="num">${enCours}</div><div class="lbl">En cours</div></div>
      <div class="stat-card"><div class="num">${traitees}</div><div class="lbl">Traitées</div></div>
      <div class="stat-card"><div class="num">${annulees}</div><div class="lbl">Annulées</div></div>
    `;
    const rowHtml = a => `<tr><td>${a.date}</td><td>${escapeHtml(a.actor)}</td><td>${escapeHtml(a.action)}</td></tr>`;
    const body = document.getElementById('activityBody');
    const first = activity.slice(0, 10);
    const rest = activity.slice(10);
    body.innerHTML = first.map(rowHtml).join('') || '<tr><td colspan="3">Aucune activité pour le moment.</td></tr>';
    const moreBody = document.getElementById('activityMoreBody');
    const moreWrap = document.getElementById('activityMoreWrap');
    const toggle = document.getElementById('activityToggle');
    if(rest.length){
      moreBody.innerHTML = rest.map(rowHtml).join('');
      toggle.style.display = '';
      const open = moreWrap.style.display !== 'none';
      toggle.textContent = open ? 'Masquer' : `Voir les ${rest.length} activités plus anciennes`;
    } else {
      moreBody.innerHTML = '';
      moreWrap.style.display = 'none';
      toggle.style.display = 'none';
    }
  }
  document.getElementById('activityToggle').addEventListener('click', ()=>{
    const moreWrap = document.getElementById('activityMoreWrap');
    const toggle = document.getElementById('activityToggle');
    const willOpen = moreWrap.style.display === 'none';
    moreWrap.style.display = willOpen ? '' : 'none';
    const rest = activity.slice(10);
    toggle.textContent = willOpen ? 'Masquer' : `Voir les ${rest.length} activités plus anciennes`;
  });

  /* ---------- STATS TAB ---------- */
  function soldQuantities(filterFn){
    const map = {};
    orders.forEach(o=>{
      if(o.status==='annulée') return;
      if(filterFn && !filterFn(o)) return;
      o.items.forEach(it=>{
        if(!map[it.name]) map[it.name] = {qty:0, revenue:0};
        map[it.name].qty += it.qty;
        map[it.name].revenue += it.qty * it.price;
      });
    });
    return map;
  }
  function locationStats(){
    const map = {};
    orders.forEach(o=>{
      if(o.status==='annulée') return;
      const loc = (o.address && o.address.trim()) || 'Non précisé';
      if(!map[loc]) map[loc] = {count:0, revenue:0};
      map[loc].count++;
      map[loc].revenue += Number(o.total||0);
    });
    return map;
  }
  function barChart(container, entries, unit, wine){
    if(entries.length===0){ container.innerHTML = '<div class="status-msg">Pas encore de données.</div>'; return; }
    const max = Math.max(...entries.map(e=>e.value), 1);
    container.innerHTML = entries.map(e=>`
      <div class="bar-row">
        <div class="bar-label" title="${escapeHtml(e.label)}">${escapeHtml(e.label)}</div>
        <div class="bar-track"><div class="bar-fill ${wine?'wine':''}" style="width:${Math.round(e.value/max*100)}%"></div></div>
        <div class="bar-val">${e.value.toLocaleString('fr-FR')}${unit||''}</div>
      </div>`).join('');
  }

  function renderStatsTab(){
    renderWeekPanel();
    const now = Date.now();
    const weekAgo = now - 7*86400000;
    const weekOrders = orders.filter(o=> o.ts && o.ts >= weekAgo && o.status!=='annulée');
    const weekOffline = offlineSales.filter(o=> o.ts && o.ts >= weekAgo).reduce((s,o)=>s+Number(o.amount||0),0);
    const weekRevenue = weekOrders.reduce((s,o)=>s+Number(o.total||0),0) + weekOffline;
    const weekItems = weekOrders.reduce((s,o)=>s+o.items.reduce((x,it)=>x+it.qty,0),0);
    const totalStock = products.reduce((s,p)=>s+Number(p.stock||0),0);
    const curWeek = weekKey(now);
    const t = traffic[curWeek] || {visits:0, clicks:0};

    document.getElementById('statsTopGrid').innerHTML = `
      <div class="stat-card"><div class="num">${weekOrders.length}</div><div class="lbl">Commandes cette semaine</div></div>
      <div class="stat-card"><div class="num">${weekItems}</div><div class="lbl">Articles vendus (7 jours)</div></div>
      <div class="stat-card"><div class="num">${weekRevenue.toLocaleString('fr-FR')}</div><div class="lbl">Ventes 7 jours (GNF)</div></div>
      <div class="stat-card"><div class="num">${totalStock}</div><div class="lbl">Pièces en stock</div></div>
      <div class="stat-card"><div class="num">${t.visits}</div><div class="lbl">Visites cette semaine</div></div>
      <div class="stat-card"><div class="num">${t.clicks}</div><div class="lbl">Clics cette semaine</div></div>
    `;

    const weekMap = soldQuantities(o=> o.ts && o.ts >= weekAgo);
    barChart(document.getElementById('weeklySales'),
      Object.entries(weekMap).map(([label,v])=>({label, value:v.qty})).sort((a,b)=>b.value-a.value).slice(0,10), ' vendu(s)');

    const allMap = soldQuantities(null);
    const combined = {};
    Object.entries(allMap).forEach(([n,v])=>{ combined[n] = (combined[n]||0) + v.qty; });
    Object.entries(salesArchive.byProduct||{}).forEach(([n,q])=>{ combined[n] = (combined[n]||0) + q; });
    barChart(document.getElementById('topSellers'),
      Object.entries(combined).map(([label,value])=>({label, value})).sort((a,b)=>b.value-a.value).slice(0,10), ' vendu(s)');

    const locMap = locationStats();
    barChart(document.getElementById('salesByLocation'),
      Object.entries(locMap).map(([label,v])=>({label, value:v.revenue})).sort((a,b)=>b.value-a.value).slice(0,10), ' GNF');

    const likeEntries = Object.entries(likes).map(([pid,count])=>{
      const p = products.find(x=>x.id===pid);
      return p ? {label:p.name, value:count} : null;
    }).filter(Boolean).sort((a,b)=>b.value-a.value).slice(0,10);
    barChart(document.getElementById('likesRanking'), likeEntries, ' ❤', true);

    const stockBody = document.getElementById('stockBody');
    stockBody.innerHTML = products.slice().sort((a,b)=>Number(a.stock)-Number(b.stock)).map(p=>{
      const s = Number(p.stock);
      const etat = s<=0 ? '<span class="pill new">rupture</span>' : (s<=3 ? '<span class="pill progress">stock bas</span>' : '<span class="pill done">ok</span>');
      return `<tr><td>${escapeHtml(p.name)}</td><td>${s}</td><td>${etat}</td></tr>`;
    }).join('') || '<tr><td colspan="3">Aucune pièce.</td></tr>';

    const weeks = Object.keys(traffic).sort().slice(-8);
    barChart(document.getElementById('trafficBars'),
      weeks.map(w=>({label:w, value:(traffic[w].visits||0)})), ' visites');
  }

  /* ---------- FINANCES TAB ---------- */
  const COMMISSION_RATE = 0.10;
  function assistantOrders(assistantId, filterFn){
    return orders.filter(o=> o.claimedBy===assistantId && (!filterFn || filterFn(o)));
  }
  function commissionOf(ordersList){
    return Math.round(ordersList.filter(o=>o.status==='traitée').reduce((s,o)=>s+o.total,0) * COMMISSION_RATE);
  }

  function renderMyStatsTab(){
    renderMyWeekPanel();
    const now = Date.now();
    const weekAgo = now - 7*86400000;
    const mk = monthKey(now);
    const mine = assistantOrders(currentUser.id, o=>o.ts);
    const mineWeek = mine.filter(o=>o.ts >= weekAgo);
    const mineMonth = mine.filter(o=>monthKey(o.ts)===mk);
    const weekSales = mineWeek.filter(o=>o.status==='traitée').reduce((s,o)=>s+o.total,0);
    const monthCom = commissionOf(mineMonth);
    const weekCom = commissionOf(mineWeek);
    const pending = mineMonth.filter(o=>o.status!=='traitée' && o.status!=='annulée').length;

    document.getElementById('myStatsGrid').innerHTML = `
      <div class="stat-card"><div class="num">${mineWeek.length}</div><div class="lbl">Commandes prises (7 jours)</div></div>
      <div class="stat-card"><div class="num">${weekSales.toLocaleString('fr-FR')}</div><div class="lbl">Mes ventes traitées 7 jours (GNF)</div></div>
      <div class="stat-card commission-highlight"><div class="num">${weekCom.toLocaleString('fr-FR')}</div><div class="lbl">Ma commission 7 jours (GNF)</div></div>
      <div class="stat-card commission-highlight"><div class="num">${monthCom.toLocaleString('fr-FR')}</div><div class="lbl">Ma commission du mois (GNF)</div></div>
      <div class="stat-card"><div class="num">${pending}</div><div class="lbl">En attente de traitement</div></div>
    `;

    const weekMap = {};
    mineWeek.filter(o=>o.status!=='annulée').forEach(o=> o.items.forEach(it=>{ weekMap[it.name] = (weekMap[it.name]||0) + it.qty; }));
    barChart(document.getElementById('myWeeklySales'),
      Object.entries(weekMap).map(([label,value])=>({label,value})).sort((a,b)=>b.value-a.value).slice(0,10), ' vendu(s)');

    const body = document.getElementById('myOrdersBody');
    document.getElementById('myOrdersEmpty').style.display = mineMonth.length ? 'none' : 'block';
    body.innerHTML = mineMonth.map(o=>{
      const com = o.status==='traitée' ? Math.round(o.total*COMMISSION_RATE) : 0;
      const pillClass = o.status==='nouvelle' ? 'new' : (o.status==='en cours' ? 'progress' : (o.status==='annulée' ? 'cancel' : 'done'));
      return `<tr>
        <td>${new Date(o.ts).toLocaleString('fr-FR')}</td>
        <td>${escapeHtml(o.customer)}</td>
        <td>${money(o.total)}</td>
        <td><span class="pill ${pillClass}">${o.status}</span></td>
        <td>${o.status==='traitée' ? money(com) : (o.status==='annulée' ? '<span class="section-note">annulée</span>' : '<span class="section-note">après traitement</span>')}</td>
      </tr>`;
    }).join('');
  }

  document.getElementById('genMyReportBtn').addEventListener('click', async ()=>{
    const box = document.getElementById('myReportBox');
    box.style.display = 'block';
    box.textContent = 'Analyse en cours…';
    const now = Date.now();
    const mk = monthKey(now);
    const mineMonth = assistantOrders(currentUser.id, o=> o.ts && monthKey(o.ts)===mk);
    const treated = mineMonth.filter(o=>o.status==='traitée');
    const sales = treated.reduce((s,o)=>s+o.total,0);
    const com = commissionOf(mineMonth);
    const soldMap = {};
    mineMonth.forEach(o=> o.items.forEach(it=>{ soldMap[it.name] = (soldMap[it.name]||0) + it.qty; }));
    const topSold = Object.entries(soldMap).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([n,q])=>n+' : '+q).join('; ') || 'aucune vente';

    const prompt = `Tu rédiges le rapport mensuel personnel d'une assistante de vente de Joda Boutique (bijoux et accessoires, Guinée, monnaie GNF). Ton chaleureux et encourageant mais factuel, en français. Utilise uniquement les données fournies, sans rien inventer. Structure : 1) Résumé de son mois, 2) Ses points forts, 3) Sa commission, 4) Un ou deux conseils simples pour le mois prochain. Maximum 200 mots, paragraphes simples sans markdown.

Données du mois (${monthLabel(now)}) pour ${currentUser.name} :
- Commandes prises en charge : ${mineMonth.length}, dont ${treated.length} traitées
- Ventes traitées : ${sales.toLocaleString('fr-FR')} GNF
- Commission (10% des ventes traitées) : ${com.toLocaleString('fr-FR')} GNF
- Articles qu'elle a le plus vendus : ${topSold}`;

    try{
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, messages:[{role:"user", content:prompt}] })
      });
      const data = await response.json();
      const text = (data.content||[]).filter(i=>i.type==='text').map(i=>i.text).join('\n').trim();
      box.textContent = text || "Le rapport n'a pas pu être généré. Réessayez.";
    }catch(e){
      box.textContent = "Le rapport n'a pas pu être généré (connexion). Réessayez.";
    }
  });

  function monthKey(ts){ const d = new Date(ts); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'); }
  function monthLabel(ts){ return new Date(ts).toLocaleDateString('fr-FR',{month:'long', year:'numeric'}); }

  function monthFinancials(refTs){
    const mk = monthKey(refTs);
    const monthOrders = orders.filter(o=> o.ts && monthKey(o.ts)===mk && o.status!=='annulée');
    const onsiteRevenue = monthOrders.reduce((s,o)=>s+Number(o.total||0),0);
    const monthOffline = offlineSales.filter(o=> monthKey(o.ts)===mk);
    const offlineTotal = monthOffline.reduce((s,o)=>s+Number(o.amount||0),0);
    const revenue = onsiteRevenue + offlineTotal;
    const monthExpenses = expenses.filter(e=> monthKey(e.ts)===mk);
    const totalExp = monthExpenses.reduce((s,e)=>s+Number(e.amount),0);
    return {mk, monthOrders, onsiteRevenue, monthOffline, offlineTotal, revenue, monthExpenses, totalExp, profit: revenue-totalExp};
  }

  /* ---------- SEMAINE CALENDAIRE (LUNDI -> DIMANCHE) ---------- */
  function weekBounds(ts){
    const d = new Date(ts);
    const day = (d.getDay()+6)%7; // lundi=0 ... dimanche=6
    const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate()-day, 0,0,0,0);
    const sunday = new Date(monday.getTime() + 7*86400000 - 1);
    return {start: monday.getTime(), end: sunday.getTime()};
  }
  function weekRangeLabel(ts){
    const {start,end} = weekBounds(ts);
    const opts = {day:'numeric', month:'short'};
    return new Date(start).toLocaleDateString('fr-FR',opts)+' – '+new Date(end).toLocaleDateString('fr-FR',opts);
  }
  function weekFinancials(refTs){
    const {start,end} = weekBounds(refTs);
    const weekOrders = orders.filter(o=> o.ts>=start && o.ts<=end && o.status!=='annulée');
    const onsiteRevenue = weekOrders.reduce((s,o)=>s+Number(o.total||0),0);
    const weekOffline = offlineSales.filter(o=> o.ts>=start && o.ts<=end);
    const offlineTotal = weekOffline.reduce((s,o)=>s+Number(o.amount||0),0);
    const revenue = onsiteRevenue + offlineTotal;
    const weekExpenses = expenses.filter(e=> e.ts>=start && e.ts<=end);
    const totalExp = weekExpenses.reduce((s,e)=>s+Number(e.amount),0);
    const itemsSold = weekOrders.reduce((s,o)=>s+o.items.reduce((x,it)=>x+it.qty,0),0);
    const totalCom = team.filter(t=>t.role==='assistant').reduce((sum,a)=>{
      const mine = assistantOrders(a.id, o=> o.ts>=start && o.ts<=end && o.status!=='annulée');
      return sum + commissionOf(mine);
    }, 0);
    const netProfit = revenue - totalExp - totalCom;
    return {start, end, weekOrders, onsiteRevenue, offlineTotal, revenue, totalExp, itemsSold, totalCom, profit: netProfit};
  }

  let statsWeekOffset = 0;
  function renderWeekPanel(){
    const grid = document.getElementById('weekStatGrid');
    if(!grid) return;
    const now = Date.now();
    const refTs = now + statsWeekOffset*7*86400000;
    const f = weekFinancials(refTs);
    document.getElementById('weekRangeLabel').textContent = weekRangeLabel(refTs);
    document.getElementById('weekNextBtn').disabled = statsWeekOffset >= 0;

    grid.innerHTML = `
      <div class="stat-card"><div class="num">${f.weekOrders.length}</div><div class="lbl">Commandes</div></div>
      <div class="stat-card"><div class="num">${f.itemsSold}</div><div class="lbl">Articles vendus</div></div>
      <div class="stat-card"><div class="num">${f.revenue.toLocaleString('fr-FR')}</div><div class="lbl">Ventes (GNF)</div></div>
      <div class="stat-card"><div class="num">${f.totalExp.toLocaleString('fr-FR')}</div><div class="lbl">Dépenses (GNF)</div></div>
      <div class="stat-card"><div class="num">${f.totalCom.toLocaleString('fr-FR')}</div><div class="lbl">Commissions équipe (GNF)</div></div>
      <div class="stat-card net-highlight"><div class="num">${f.profit.toLocaleString('fr-FR')}</div><div class="lbl">Net après commissions (GNF)</div></div>
    `;

    const soldMap = {};
    f.weekOrders.forEach(o=> o.items.forEach(it=>{ soldMap[it.name] = (soldMap[it.name]||0) + it.qty; }));
    barChart(document.getElementById('weekTopProducts'),
      Object.entries(soldMap).map(([label,value])=>({label,value})).sort((a,b)=>b.value-a.value).slice(0,10), ' vendu(s)');

    const rows = [];
    for(let i=7;i>=0;i--){ rows.push(weekFinancials(now - i*7*86400000)); }
    barChart(document.getElementById('weekSalesChart'),
      rows.map(r=>({label: weekRangeLabel(r.start), value: r.revenue})), ' GNF');
    document.getElementById('weekHistoryBody').innerHTML = rows.map(r=>`
      <tr>
        <td>${weekRangeLabel(r.start)}</td>
        <td>${r.weekOrders.length}</td>
        <td>${r.itemsSold}</td>
        <td>${money(r.revenue)}</td>
        <td>${money(r.totalExp)}</td>
        <td>${money(r.totalCom)}</td>
        <td style="color:var(--wine);font-weight:600;">${money(r.profit)}</td>
      </tr>`).join('');
  }
  document.getElementById('weekPrevBtn').addEventListener('click', ()=>{ statsWeekOffset--; renderWeekPanel(); });
  document.getElementById('weekNextBtn').addEventListener('click', ()=>{ if(statsWeekOffset<0){ statsWeekOffset++; renderWeekPanel(); } });

  let myWeekOffset = 0;
  function renderMyWeekPanel(){
    const grid = document.getElementById('myWeekStatGrid');
    if(!grid || !currentUser) return;
    const now = Date.now();
    const refTs = now + myWeekOffset*7*86400000;
    const {start,end} = weekBounds(refTs);
    const mine = assistantOrders(currentUser.id, o=> o.ts>=start && o.ts<=end && o.status!=='annulée');
    const treated = mine.filter(o=>o.status==='traitée');
    const sales = treated.reduce((s,o)=>s+o.total,0);
    const com = commissionOf(mine);
    const itemsSold = mine.reduce((s,o)=>s+o.items.reduce((x,it)=>x+it.qty,0),0);

    document.getElementById('myWeekRangeLabel').textContent = weekRangeLabel(refTs);
    document.getElementById('myWeekNextBtn').disabled = myWeekOffset >= 0;

    const netAfterCom = sales - com;
    grid.innerHTML = `
      <div class="stat-card"><div class="num">${mine.length}</div><div class="lbl">Commandes prises</div></div>
      <div class="stat-card"><div class="num">${itemsSold}</div><div class="lbl">Articles vendus</div></div>
      <div class="stat-card"><div class="num">${sales.toLocaleString('fr-FR')}</div><div class="lbl">Ventes traitées (GNF)</div></div>
      <div class="stat-card commission-highlight"><div class="num">${com.toLocaleString('fr-FR')}</div><div class="lbl">Ma commission (GNF)</div></div>
      <div class="stat-card net-highlight"><div class="num">${netAfterCom.toLocaleString('fr-FR')}</div><div class="lbl">Net boutique après ma commission (GNF)</div></div>
    `;

    const soldMap = {};
    mine.forEach(o=> o.items.forEach(it=>{ soldMap[it.name] = (soldMap[it.name]||0) + it.qty; }));
    barChart(document.getElementById('myWeekTopProducts'),
      Object.entries(soldMap).map(([label,value])=>({label,value})).sort((a,b)=>b.value-a.value).slice(0,10), ' vendu(s)');

    const rows = [];
    for(let i=7;i>=0;i--){
      const wTs = now - i*7*86400000;
      const {start:ws, end:we} = weekBounds(wTs);
      const wMine = assistantOrders(currentUser.id, o=> o.ts>=ws && o.ts<=we && o.status!=='annulée');
      const wTreated = wMine.filter(o=>o.status==='traitée');
      const wSales = wTreated.reduce((s,o)=>s+o.total,0);
      const wCom = commissionOf(wMine);
      rows.push({label: weekRangeLabel(wTs), count: wMine.length, sales: wSales, com: wCom, net: wSales-wCom});
    }
    barChart(document.getElementById('myWeekSalesChart'),
      rows.map(r=>({label: r.label, value: r.sales})), ' GNF');
    document.getElementById('myWeekHistoryBody').innerHTML = rows.map(r=>`
      <tr><td>${r.label}</td><td>${r.count}</td><td>${money(r.sales)}</td><td style="color:#1B7A3D;font-weight:600;">${money(r.com)}</td><td style="color:var(--wine);font-weight:600;">${money(r.net)}</td></tr>`).join('');
  }
  document.getElementById('myWeekPrevBtn').addEventListener('click', ()=>{ myWeekOffset--; renderMyWeekPanel(); });
  document.getElementById('myWeekNextBtn').addEventListener('click', ()=>{ if(myWeekOffset<0){ myWeekOffset++; renderMyWeekPanel(); } });

  function renderFinancesTab(){
    const f = monthFinancials(Date.now());
    const mk = monthKey(Date.now());
    const assistantsList = team.filter(t=>t.role==='assistant');
    const comRows = assistantsList.map(a=>{
      const mine = assistantOrders(a.id, o=> o.ts && monthKey(o.ts)===mk);
      const treated = mine.filter(o=>o.status==='traitée');
      const sales = treated.reduce((s,o)=>s+o.total,0);
      const com = Math.round(sales*COMMISSION_RATE);
      return {name:a.name, count:treated.length, sales, com, net: sales-com};
    });
    const totalCom = comRows.reduce((s,r)=>s+r.com,0);
    const netProfit = f.profit - totalCom;

    document.getElementById('finGrid').innerHTML = `
      <div class="stat-card"><div class="num">${f.revenue.toLocaleString('fr-FR')}</div><div class="lbl">Ventes du mois (GNF)</div></div>
      <div class="stat-card"><div class="num">${f.offlineTotal.toLocaleString('fr-FR')}</div><div class="lbl">dont ventes hors site (GNF)</div></div>
      <div class="stat-card"><div class="num">${f.totalExp.toLocaleString('fr-FR')}</div><div class="lbl">Dépenses du mois (GNF)</div></div>
      <div class="stat-card"><div class="num">${totalCom.toLocaleString('fr-FR')}</div><div class="lbl">Commissions (10%)</div></div>
      <div class="stat-card net-highlight"><div class="num">${netProfit.toLocaleString('fr-FR')}</div><div class="lbl">Résultat net (GNF)</div></div>
      <div class="stat-card"><div class="num">${f.monthOrders.length}</div><div class="lbl">Commandes du mois</div></div>
    `;

    document.getElementById('commissionsBody').innerHTML = comRows.map(r=>`
      <tr>
        <td>${escapeHtml(r.name)}</td>
        <td>${r.count}</td>
        <td>${money(r.sales)}</td>
        <td><strong>${money(r.com)}</strong></td>
        <td style="color:var(--wine);font-weight:600;">${money(r.net)}</td>
      </tr>`).join('') || '<tr><td colspan="5">Aucune assistante.</td></tr>';

    const body = document.getElementById('expensesBody');
    document.getElementById('expEmpty').style.display = f.monthExpenses.length ? 'none' : 'block';
    body.innerHTML = f.monthExpenses.map(e=>`
      <tr>
        <td>${new Date(e.ts).toLocaleDateString('fr-FR')}</td>
        <td>${escapeHtml(e.label)}</td>
        <td>${escapeHtml(e.type)}</td>
        <td>${money(e.amount)}</td>
        <td><button class="btn-mini danger" data-exp="${e.id}">Retirer</button></td>
      </tr>`).join('');
    body.querySelectorAll('button[data-exp]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        await sb.from('expenses').delete().eq('id', btn.dataset.exp);
        await loadExpenses();
        renderFinancesTab();
      });
    });

    const offBody = document.getElementById('offSalesBody');
    document.getElementById('offSalesEmpty').style.display = f.monthOffline.length ? 'none' : 'block';
    offBody.innerHTML = f.monthOffline.map(o=>`
      <tr>
        <td>${new Date(o.ts).toLocaleDateString('fr-FR')}</td>
        <td>${escapeHtml(o.label)}</td>
        <td>${money(o.amount)}</td>
        <td><button class="btn-mini danger" data-off="${o.id}">Retirer</button></td>
      </tr>`).join('');
    offBody.querySelectorAll('button[data-off]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        await sb.from('offline_sales').delete().eq('id', btn.dataset.off);
        await loadOfflineSales();
        renderFinancesTab(); renderStatsTab();
      });
    });
  }

  document.getElementById('addOffSaleBtn').addEventListener('click', async ()=>{
    const label = document.getElementById('offSaleLabel').value.trim();
    const amount = Number(document.getElementById('offSaleAmount').value);
    const msg = document.getElementById('offSaleMsg');
    if(!label || !amount){ msg.textContent = 'Renseignez une description et un montant.'; return; }
    const { error } = await sb.from('offline_sales').insert({id:'os'+Date.now(), ts:Date.now(), label, amount, created_by: currentUser.id});
    if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    await logActivity(currentUser.name, 'a enregistré une vente hors site : '+label+' ('+money(amount)+')');
    document.getElementById('offSaleLabel').value='';
    document.getElementById('offSaleAmount').value='';
    msg.textContent = 'Vente hors site enregistrée.';
    setTimeout(()=>msg.textContent='',2000);
    await loadOfflineSales();
    renderFinancesTab(); renderStatsTab();
  });

  document.getElementById('addExpenseBtn').addEventListener('click', async ()=>{
    const label = document.getElementById('expLabel').value.trim();
    const amount = Number(document.getElementById('expAmount').value);
    const type = document.getElementById('expType').value;
    const msg = document.getElementById('expMsg');
    if(!label || !amount){ msg.textContent = 'Renseignez une description et un montant.'; return; }
    const { error } = await sb.from('expenses').insert({id:'e'+Date.now(), ts:Date.now(), label, amount, type, created_by: currentUser.id});
    if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    await logActivity(currentUser.name, 'a enregistré une dépense : '+label+' ('+money(amount)+')');
    document.getElementById('expLabel').value='';
    document.getElementById('expAmount').value='';
    msg.textContent = 'Dépense enregistrée.';
    setTimeout(()=>msg.textContent='',2000);
    await loadExpenses();
    renderFinancesTab();
  });

  /* ---------- MONTHLY REPORT ---------- */
  document.getElementById('genReportBtn').addEventListener('click', async ()=>{
    const box = document.getElementById('reportBox');
    box.style.display = 'block';
    box.textContent = 'Analyse en cours…';
    const f = monthFinancials(Date.now());
    const soldMap = soldQuantities(o=> o.ts && monthKey(o.ts)===f.mk);
    const topSold = Object.entries(soldMap).sort((a,b)=>b[1].qty-a[1].qty).slice(0,5)
      .map(([n,v])=>n+' : '+v.qty+' vendus ('+v.revenue.toLocaleString('fr-FR')+' GNF)').join('; ') || 'aucune vente';
    const likedList = Object.entries(likes).map(([pid,c])=>{
      const p = products.find(x=>x.id===pid); return p ? p.name+' ('+c+' ❤)' : null;
    }).filter(Boolean).join('; ') || 'aucun j\'aime enregistré';
    const lowStock = products.filter(p=>Number(p.stock)<=3).map(p=>p.name+' ('+p.stock+')').join('; ') || 'aucun';
    const expList = f.monthExpenses.map(e=>e.label+' : '+Number(e.amount).toLocaleString('fr-FR')+' GNF ('+e.type+')').join('; ') || 'aucune';
    const curWeek = weekKey(Date.now());
    const t = traffic[curWeek] || {visits:0, clicks:0};
    const comDetail = team.filter(x=>x.role==='assistant').map(a=>{
      const treated = assistantOrders(a.id, o=> o.ts && monthKey(o.ts)===f.mk && o.status==='traitée');
      const sales = treated.reduce((s,o)=>s+o.total,0);
      return a.name+' : '+Math.round(sales*COMMISSION_RATE).toLocaleString('fr-FR')+' GNF ('+treated.length+' commandes)';
    }).join('; ') || 'aucune';
    const totalComR = team.filter(x=>x.role==='assistant').reduce((sum,a)=>{
      const treated = assistantOrders(a.id, o=> o.ts && monthKey(o.ts)===f.mk && o.status==='traitée');
      return sum + Math.round(treated.reduce((s,o)=>s+o.total,0)*COMMISSION_RATE);
    },0);

    const prompt = `Tu es l'analyste financière de Joda Boutique, une boutique de bijoux et accessoires en Guinée (monnaie : GNF). Rédige un rapport mensuel clair et concret en français, destiné à la gérante. Utilise uniquement les données fournies, sans en inventer. Structure : 1) Résumé du mois, 2) Ce qui a bien marché, 3) Ce qui a moins marché ou points d'attention, 4) Budget (ventes, dépenses, commissions, résultat net), 5) Recommandations et projections simples pour le mois prochain. Reste concis (300 mots max), ton professionnel mais accessible, sans tableau ni markdown, juste des paragraphes et des tirets simples.

Données du mois (${monthLabel(Date.now())}) :
- Chiffre d'affaires total : ${f.revenue.toLocaleString('fr-FR')} GNF (${f.onsiteRevenue.toLocaleString('fr-FR')} GNF via le site sur ${f.monthOrders.length} commandes + ${f.offlineTotal.toLocaleString('fr-FR')} GNF de ventes hors site)
- Dépenses totales : ${f.totalExp.toLocaleString('fr-FR')} GNF — détail : ${expList}
- Commissions des assistantes (10% des ventes traitées) : ${totalComR.toLocaleString('fr-FR')} GNF — détail : ${comDetail}
- Résultat net (ventes − dépenses − commissions) : ${(f.profit - totalComR).toLocaleString('fr-FR')} GNF
- Meilleures ventes : ${topSold}
- Pièces préférées du public : ${likedList}
- Stocks bas ou en rupture : ${lowStock}
- Fréquentation cette semaine : ${t.visits} visites, ${t.clicks} clics`;

    try{
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:1000,
          messages:[{role:"user", content: prompt}]
        })
      });
      const data = await response.json();
      const text = (data.content||[]).filter(i=>i.type==='text').map(i=>i.text).join('\n').trim();
      box.textContent = text || "Le rapport n'a pas pu être généré. Réessayez.";
    }catch(e){
      box.textContent = "Le rapport n'a pas pu être généré (connexion). Réessayez.";
    }
  });

  /* ---------- WEEKLY REPORT ---------- */
  document.getElementById('genWeeklyReportBtn').addEventListener('click', async ()=>{
    const box = document.getElementById('weeklyReportBox');
    box.style.display = 'block';
    box.textContent = 'Analyse en cours…';
    const now = Date.now();
    const weekAgo = now - 7*86400000;
    const weekOrders = orders.filter(o=> o.ts && o.ts >= weekAgo && o.status!=='annulée');
    const weekOfflineTotal = offlineSales.filter(o=> o.ts >= weekAgo).reduce((s,o)=>s+Number(o.amount||0),0);
    const revenue = weekOrders.reduce((s,o)=>s+Number(o.total||0),0) + weekOfflineTotal;
    const weekExpenses = expenses.filter(e=> e.ts >= weekAgo);
    const totalExp = weekExpenses.reduce((s,e)=>s+Number(e.amount),0);
    const soldMap = soldQuantities(o=> o.ts && o.ts >= weekAgo);
    const topSold = Object.entries(soldMap).sort((a,b)=>b[1].qty-a[1].qty).slice(0,5)
      .map(([n,v])=>n+' : '+v.qty+' vendus ('+v.revenue.toLocaleString('fr-FR')+' GNF)').join('; ') || 'aucune vente';
    const lowStock = products.filter(p=>Number(p.stock)<=3).map(p=>p.name+' ('+p.stock+')').join('; ') || 'aucun';
    const curWeek = weekKey(now);
    const t = traffic[curWeek] || {visits:0, clicks:0};

    const prompt = `Tu es l'analyste de Joda Boutique, une boutique de bijoux et accessoires en Guinée (monnaie : GNF). Rédige un rapport hebdomadaire court et concret en français, destiné à la gérante, sur les 7 derniers jours. Utilise uniquement les données fournies, sans en inventer. Structure : 1) Résumé de la semaine, 2) Ce qui a bien marché, 3) Points d'attention, 4) Une recommandation simple pour la semaine prochaine. Maximum 180 mots, paragraphes simples sans markdown.

Données des 7 derniers jours :
- Chiffre d'affaires : ${revenue.toLocaleString('fr-FR')} GNF (${weekOrders.length} commandes sur le site + ${weekOfflineTotal.toLocaleString('fr-FR')} GNF de ventes hors site)
- Dépenses : ${totalExp.toLocaleString('fr-FR')} GNF
- Meilleures ventes : ${topSold}
- Stocks bas ou en rupture : ${lowStock}
- Fréquentation : ${t.visits} visites, ${t.clicks} clics`;

    try{
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:800, messages:[{role:"user", content: prompt}] })
      });
      const data = await response.json();
      const text = (data.content||[]).filter(i=>i.type==='text').map(i=>i.text).join('\n').trim();
      box.textContent = text || "Le rapport n'a pas pu être généré. Réessayez.";
    }catch(e){
      box.textContent = "Le rapport n'a pas pu être généré (connexion). Réessayez.";
    }
  });

  let expandedVariantIds = new Set();
  function renderProductsTab(){
    const isAdmin = currentUser.role==='admin';
    let visible = isAdmin ? products : products.filter(p=>p.addedBy===currentUser.id);
    const rank = p => isApproved(p) ? 2 : (p.rejected ? 1 : 0);
    visible = visible.slice().sort((a,b)=> rank(a) - rank(b));
    const body = document.getElementById('adminProductBody');
    body.innerHTML = visible.map(p=>{
      let statusPill;
      if(isApproved(p)) statusPill = '<span class="pill done">publiée</span>';
      else if(p.rejected) statusPill = '<span class="pill new">refusée</span>' +
        (p.rejectReason ? `<div class="section-note" style="margin-top:4px;max-width:160px;">Motif : ${escapeHtml(p.rejectReason)}</div>` : '');
      else statusPill = '<span class="pill progress">en attente</span>';
      const myVariants = variantsFor(p.id);
      let actions = '';
      if(isAdmin && !isApproved(p)){
        actions += `<button class="btn-mini" data-act="approve" data-id="${p.id}">✓ Approuver</button>`;
        if(!p.rejected) actions += `<button class="btn-mini danger" data-act="reject" data-id="${p.id}">✗ Refuser</button>`;
      }
      if(!isAdmin && !isApproved(p)){
        actions += `<button class="btn-mini" data-act="edit" data-id="${p.id}">Modifier</button>`;
        if(p.rejected) actions += `<button class="btn-mini" data-act="resubmit" data-id="${p.id}">Renvoyer</button>`;
      }
      if(isAdmin) actions += `<button class="btn-mini" data-act="edit" data-id="${p.id}">Modifier</button>`;
      actions += `<button class="btn-mini" data-act="editprice" data-id="${p.id}">Prix</button>
          <button class="btn-mini" data-act="photo" data-id="${p.id}">Photo</button>
          <button class="btn-mini" data-detail-variants="${p.id}">Couleurs${myVariants.length?' ('+myVariants.length+')':''}</button>
          ${myVariants.length===0 ? `<button class="btn-mini" data-act="restock" data-id="${p.id}">+ stock</button>` : ''}
          <button class="btn-mini danger" data-act="delete" data-id="${p.id}">Retirer</button>`;
      const openV = expandedVariantIds.has(p.id);
      const variantRows = myVariants.map(v=>`
        <div class="variant-row">
          ${v.image ? `<img class="photo-thumb" src="${v.image}" alt="">` : '<span class="photo-thumb"></span>'}
          <strong>${escapeHtml(v.color)}</strong>
          <span class="section-note">${v.stock} en stock</span>
          <button class="btn-mini" data-vact="photo" data-vid="${v.id}" data-pid="${p.id}">Photo</button>
          <button class="btn-mini" data-vact="stock" data-vid="${v.id}" data-pid="${p.id}">Stock</button>
          <button class="btn-mini danger" data-vact="delete" data-vid="${v.id}" data-pid="${p.id}">Supprimer</button>
        </div>`).join('');
      return `
      <tr>
        <td>${p.image ? `<img class="photo-thumb" src="${p.image}" alt="">` : '—'}</td>
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.cat)}</td>
        <td>${money(p.price)}</td>
        <td>${p.stock}</td>
        <td>${statusPill}</td>
        <td style="${isAdmin?'':'display:none;'}">${escapeHtml(teamName(p.addedBy))}</td>
        <td>${actions}</td>
      </tr>
      <tr class="variant-detail-row" id="variantDetail-${p.id}" style="${openV?'':'display:none;'}">
        <td colspan="8">
          <div class="variant-manage">
            ${variantRows || '<div class="section-note" style="margin-bottom:10px;">Aucune couleur ajoutée — la pièce reste vendue sans choix de couleur tant qu\'aucune n\'est ajoutée ici.</div>'}
            <div class="variant-add-form">
              <input class="text-input" style="margin:0;" id="newColorName-${p.id}" placeholder="Nom de la couleur (ex: Or)">
              <input class="text-input" style="margin:0;" id="newColorStock-${p.id}" type="number" min="0" placeholder="Stock">
              <input class="text-input" style="margin:0;" id="newColorPhoto-${p.id}" type="file" accept="image/*">
              <button class="btn-mini" data-vact="add" data-pid="${p.id}">Ajouter cette couleur</button>
            </div>
            <div class="status-msg" id="variantMsg-${p.id}"></div>
          </div>
        </td>
      </tr>`;
    }).join('') || `<tr><td colspan="${isAdmin?8:7}">Aucune pièce ${isAdmin?'enregistrée':'dans votre rayon'}.</td></tr>`;
    body.querySelectorAll('button[data-detail-variants]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const pid = btn.dataset.detailVariants;
        const row = document.getElementById('variantDetail-'+pid);
        if(!row) return;
        const willOpen = row.style.display === 'none';
        row.style.display = willOpen ? '' : 'none';
        if(willOpen) expandedVariantIds.add(pid); else expandedVariantIds.delete(pid);
      });
    });
    body.querySelectorAll('button[data-vact]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const pid = btn.dataset.pid;
        const p = products.find(x=>x.id===pid);
        if(currentUser.role!=='admin' && p.addedBy !== currentUser.id) return;
        if(btn.dataset.vact === 'add'){
          const nameInput = document.getElementById('newColorName-'+pid);
          const stockInput = document.getElementById('newColorStock-'+pid);
          const photoInput = document.getElementById('newColorPhoto-'+pid);
          const msg = document.getElementById('variantMsg-'+pid);
          const color = nameInput.value.trim();
          const stock = Math.max(0, Number(stockInput.value) || 0);
          if(!color){ msg.textContent = 'Indiquez un nom de couleur.'; return; }
          const newId = 'v'+Date.now();
          let image = '';
          if(photoInput.files && photoInput.files[0]){
            try{ image = await uploadProductPhoto(photoInput.files[0], newId); }
            catch(e){ /* pas grave, couleur enregistrée sans photo */ }
          }
          const { error } = await sb.from('product_variants').insert({id:newId, product_id:pid, color, image, stock});
          if(error){ msg.textContent = 'Erreur : '+error.message; return; }
          await sb.from('products').update({stock: Number(p.stock) + stock}).eq('id', pid);
          await logActivity(currentUser.name, 'a ajouté la couleur "'+color+'" pour "'+p.name+'"');
          expandedVariantIds.add(pid);
        } else if(btn.dataset.vact === 'stock'){
          const v = variants.find(x=>x.id===btn.dataset.vid);
          const add = prompt('Combien de pièces ajouter au stock de la couleur "'+v.color+'" ? (nombre négatif pour retirer)', '5');
          if(add===null) return;
          const newVStock = Math.max(0, Number(v.stock) + (Number(add)||0));
          const appliedDelta = newVStock - Number(v.stock);
          await sb.from('product_variants').update({stock:newVStock}).eq('id', v.id);
          await sb.from('products').update({stock: Math.max(0, Number(p.stock) + appliedDelta)}).eq('id', pid);
          await logActivity(currentUser.name, 'a ajusté le stock de la couleur "'+v.color+'" de "'+p.name+'"');
          expandedVariantIds.add(pid);
        } else if(btn.dataset.vact === 'photo'){
          const v = variants.find(x=>x.id===btn.dataset.vid);
          const input = document.createElement('input');
          input.type = 'file'; input.accept = 'image/*';
          input.onchange = async ()=>{
            const file = input.files[0];
            if(!file) return;
            try{
              const image = await uploadProductPhoto(file, v.id);
              await sb.from('product_variants').update({image}).eq('id', v.id);
              await logActivity(currentUser.name, 'a ajouté une photo pour la couleur "'+v.color+'"');
              expandedVariantIds.add(pid);
              await loadVariants();
              renderProductsTab(); renderStore();
            }catch(e){ alert("La photo n'a pas pu être chargée."); }
          };
          input.click();
          return;
        } else if(btn.dataset.vact === 'delete'){
          const v = variants.find(x=>x.id===btn.dataset.vid);
          if(!confirm('Supprimer la couleur "'+v.color+'" ('+v.stock+' en stock) ?')) return;
          await sb.from('product_variants').delete().eq('id', v.id);
          await sb.from('products').update({stock: Math.max(0, Number(p.stock) - Number(v.stock))}).eq('id', pid);
          await logActivity(currentUser.name, 'a supprimé la couleur "'+v.color+'" de "'+p.name+'"');
          expandedVariantIds.add(pid);
        }
        await Promise.all([loadProducts(), loadVariants()]);
        renderProductsTab(); renderStore(); renderCarousel(); renderHeroShowcase();
      });
    });
    body.querySelectorAll('button[data-act]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const id = btn.dataset.id;
        const p = products.find(x=>x.id===id);
        if(!isAdmin && p.addedBy !== currentUser.id) return;
        if((btn.dataset.act==='approve' || btn.dataset.act==='reject') && !isAdmin) return;
        if(btn.dataset.act==='approve'){
          await sb.from('products').update({approved:true, rejected:false, reject_reason:null}).eq('id', p.id);
          await logActivity(currentUser.name, 'a approuvé "'+p.name+'" (proposé par '+teamName(p.addedBy)+')');
        } else if(btn.dataset.act==='reject'){
          const reason = prompt('Motif du refus (visible par '+teamName(p.addedBy)+', qui pourra modifier la pièce et la renvoyer) :', '');
          if(reason===null) return;
          await sb.from('products').update({rejected:true, reject_reason: reason.trim() || 'Non précisé'}).eq('id', p.id);
          await logActivity(currentUser.name, 'a refusé "'+p.name+'" (proposé par '+teamName(p.addedBy)+')');
        } else if(btn.dataset.act==='edit'){
          const newName = prompt('Nom de la pièce :', p.name);
          if(newName===null) return;
          const newCat = prompt('Catégorie :', p.cat);
          if(newCat===null) return;
          const newPrice = prompt('Prix (GNF) :', p.price);
          if(newPrice===null) return;
          const newStock = prompt('Stock :', p.stock);
          if(newStock===null) return;
          const patch = {
            name: newName.trim() || p.name,
            cat: newCat.trim() || p.cat,
            price: Number(newPrice) || p.price,
            stock: Number(newStock) >= 0 ? Number(newStock) : p.stock
          };
          let logMsg = 'a modifié "'+patch.name+'"';
          if(!isAdmin && p.rejected){
            patch.rejected = false; patch.reject_reason = null;
            logMsg = 'a modifié et renvoyé "'+patch.name+'" pour approbation';
          }
          await sb.from('products').update(patch).eq('id', p.id);
          await logActivity(currentUser.name, logMsg);
        } else if(btn.dataset.act==='editprice'){
          const newPrice = prompt('Nouveau prix de vente (GNF) pour "'+p.name+'" :', p.price);
          if(newPrice===null) return;
          const price = Number(newPrice);
          if(!price || price <= 0){ alert('Prix invalide.'); return; }
          await sb.from('products').update({price}).eq('id', p.id);
          await logActivity(currentUser.name, 'a modifié le prix de "'+p.name+'" à '+money(price));
        } else if(btn.dataset.act==='resubmit'){
          await sb.from('products').update({rejected:false, reject_reason:null}).eq('id', p.id);
          await logActivity(currentUser.name, 'a renvoyé "'+p.name+'" pour approbation');
        } else if(btn.dataset.act==='delete'){
          await sb.from('products').delete().eq('id', id);
          await logActivity(currentUser.name, 'a retiré "'+p.name+'" du catalogue');
        } else if(btn.dataset.act==='restock'){
          const add = prompt('Combien de pièces ajouter au stock de "'+p.name+'" ?', '5');
          if(add===null) return;
          await sb.from('products').update({stock: Number(p.stock) + (Number(add)||0)}).eq('id', p.id);
          await logActivity(currentUser.name, 'a réapprovisionné "'+p.name+'" (+'+(Number(add)||0)+')');
        } else if(btn.dataset.act==='photo'){
          const input = document.createElement('input');
          input.type = 'file'; input.accept = 'image/*';
          input.onchange = async ()=>{
            const file = input.files[0];
            if(!file) return;
            try{
              const image = await uploadProductPhoto(file, p.id);
              await sb.from('products').update({image}).eq('id', p.id);
              await logActivity(currentUser.name, 'a ajouté une photo pour "'+p.name+'"');
              await loadProducts();
              renderProductsTab(); renderStore(); renderCarousel(); renderHeroShowcase();
            }catch(e){ alert("La photo n'a pas pu être chargée."); }
          };
          input.click();
          return;
        }
        await loadProducts();
        renderProductsTab(); renderStore(); renderCarousel(); renderHeroShowcase(); if(currentUser.role==='admin') renderOverview();
      });
    });
  }

  document.getElementById('addProductBtn').addEventListener('click', async ()=>{
    const name = document.getElementById('npName').value.trim();
    const cat = document.getElementById('npCat').value.trim() || 'Autre';
    const price = Number(document.getElementById('npPrice').value);
    const stock = Number(document.getElementById('npStock').value) || 0;
    const photoInput = document.getElementById('npPhoto');
    const msg = document.getElementById('addProductMsg');
    if(!name || !price){ msg.textContent = 'Renseignez au moins un nom et un prix.'; return; }
    const isAdminAdd = currentUser.role==='admin';
    const newId = 'p'+Date.now();
    let image = '';
    if(photoInput.files && photoInput.files[0]){
      try{ image = await uploadProductPhoto(photoInput.files[0], newId); }
      catch(e){ /* pas grave, on continue sans photo */ }
    }
    const { error } = await sb.from('products').insert({
      id:newId, name, cat, price, stock, image,
      added_by: currentUser.id, approved: isAdminAdd
    });
    if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    // enregistre automatiquement une nouvelle catégorie dans la liste gérée (admin uniquement)
    if(isAdminAdd && cat && cat!=='Autre' && !categories.some(c=>c.toLowerCase()===cat.toLowerCase())){
      categories.push(cat);
      await saveCategories();
    }
    await logActivity(currentUser.name, isAdminAdd ? 'a ajouté "'+name+'" au catalogue' : 'a proposé "'+name+'" (en attente d\'approbation)');
    document.getElementById('npName').value='';
    document.getElementById('npCat').value='';
    document.getElementById('npPrice').value='';
    document.getElementById('npStock').value='';
    photoInput.value='';
    msg.textContent = isAdminAdd ? '"'+name+'" ajouté et publié.' : '"'+name+'" envoyé pour approbation. Il sera visible des clients après validation de l\'administratrice.';
    setTimeout(()=>msg.textContent='',4000);
    await loadProducts();
    renderProductsTab(); renderStore(); renderCarousel(); renderHeroShowcase(); if(currentUser.role==='admin') renderOverview();
  });

  let expandedOrderIds = new Set();
  function renderOrdersTab(){
    updateOrdersBadge();
    const isAdmin = currentUser.role==='admin';
    let visible;
    if(isAdmin) visible = orders;
    else visible = orders.filter(o=> o.claimedBy===null || o.claimedBy===currentUser.id );
    const oBody = document.getElementById('ordersBody');
    document.getElementById('ordersEmpty').style.display = visible.length ? 'none' : 'block';
    oBody.innerHTML = visible.map(o=>{
      const pillClass = o.status==='nouvelle' ? 'new' : (o.status==='en cours' ? 'progress' : (o.status==='annulée' ? 'cancel' : 'done'));
      let actionBtns = `<button class="btn-mini" data-detail="${o.id}">Détails</button>`;
      if(o.status==='nouvelle' && (isAdmin || o.claimedBy===null)){
        actionBtns += `<button class="btn-mini" data-act="claim" data-id="${o.id}">Prendre en charge</button>`;
      }
      if(o.status==='en cours' && (isAdmin || o.claimedBy===currentUser.id)){
        actionBtns += `<button class="btn-mini" data-act="done" data-id="${o.id}">Marquer traitée</button>`;
      }
      if((isAdmin || o.claimedBy===currentUser.id) && o.status!=='traitée' && o.status!=='annulée'){
        actionBtns += `<button class="btn-mini" data-act="adjust" data-id="${o.id}">Ajuster prix</button>`;
      }
      if(o.status!=='annulée' && (isAdmin || (o.claimedBy===currentUser.id && o.status!=='traitée'))){
        actionBtns += `<button class="btn-mini danger" data-act="cancel" data-id="${o.id}">Annuler</button>`;
      }
      if(isAdmin){
        actionBtns += `<button class="btn-mini danger" data-act="delete-order" data-id="${o.id}">Supprimer</button>`;
      }
      const totalCell = (o.originalTotal && o.originalTotal!==o.total)
        ? `<span style="text-decoration:line-through;color:var(--muted);font-size:11px;">${money(o.originalTotal)}</span><br>${money(o.total)}`
        : money(o.total);
      const open = expandedOrderIds.has(o.id);
      const deliveryLine = o.deliveryZone
        ? `${escapeHtml(o.deliveryZone)}${o.deliveryFee ? ' — '+money(o.deliveryFee)+' (non compté dans les statistiques)' : ' (prix à convenir)'}`
        : 'Aucune';
      return `<tr>
        <td>${new Date(o.ts).toLocaleString('fr-FR')}</td>
        <td>${escapeHtml(o.customer)}${o.phone ? ' · '+escapeHtml(o.phone) : ''}</td>
        <td>${o.items.map(it=>escapeHtml(it.name)+(it.color?' ('+escapeHtml(it.color)+')':'')+' ×'+it.qty).join(', ')}</td>
        <td>${totalCell}</td>
        <td><span class="pill ${pillClass}">${o.status}</span></td>
        <td>${o.claimedBy ? escapeHtml(teamName(o.claimedBy)) : '—'}</td>
        <td>${actionBtns}</td>
      </tr>
      <tr class="order-detail-row" id="detail-${o.id}" style="${open?'':'display:none;'}">
        <td colspan="7">
          <div class="order-detail-grid">
            <div><strong>Téléphone :</strong> ${o.phone ? escapeHtml(o.phone) : '—'}</div>
            <div><strong>Adresse :</strong> ${o.address ? escapeHtml(o.address) : '—'}</div>
            <div><strong>Livraison :</strong> ${deliveryLine}</div>
          </div>
        </td>
      </tr>`;
    }).join('');
    oBody.querySelectorAll('button[data-detail]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.dataset.detail;
        const row = document.getElementById('detail-'+id);
        if(!row) return;
        const willOpen = row.style.display === 'none';
        row.style.display = willOpen ? '' : 'none';
        if(willOpen) expandedOrderIds.add(id); else expandedOrderIds.delete(id);
      });
    });
    oBody.querySelectorAll('button[data-act]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const o = orders.find(x=>x.id===btn.dataset.id);
        if(btn.dataset.act==='claim'){
          const { error } = await sb.from('orders').update({status:'en cours', claimed_by: currentUser.id}).eq('id', o.id);
          if(!error){
            await logActivity(currentUser.name, 'a pris en charge la commande de '+o.customer);
            sendPush('Votre commande est en préparation',
              `Bonjour ${o.customer}, votre commande Joda Boutique est prise en charge. Nous vous recontactons très vite.`, o.id);
          }
        } else if(btn.dataset.act==='done'){
          const { error } = await sb.from('orders').update({status:'traitée'}).eq('id', o.id);
          if(!error){
            await logActivity(currentUser.name, 'a marqué traitée la commande de '+o.customer);
            sendPush('Votre commande est prête',
              `Bonjour ${o.customer}, votre commande Joda Boutique est prête. Merci de votre confiance !`, o.id);
          }
        } else if(btn.dataset.act==='adjust'){
          const nv = prompt('Prix de vente final pour la commande de '+o.customer+' (le client a peut-être négocié une réduction).\nTotal actuel : '+money(o.total), o.total);
          if(nv===null) return;
          const newTotal = Number(nv);
          if(isNaN(newTotal) || newTotal<0){ alert('Montant invalide.'); return; }
          const { error } = await sb.from('orders').update({ original_total: o.originalTotal || o.total, total:newTotal }).eq('id', o.id);
          if(!error) await logActivity(currentUser.name, 'a ajusté le prix de la commande de '+o.customer+' à '+money(newTotal));
        } else if(btn.dataset.act==='cancel'){
          if(!confirm('Annuler la commande de '+o.customer+' ? Les articles seront remis en stock et cette commande ne comptera plus dans les finances.')) return;
          const { error } = await sb.from('orders').update({status:'annulée'}).eq('id', o.id);
          if(!error){
            for(const it of o.items){
              const p = products.find(x=>x.id===it.id);
              if(p) await sb.from('products').update({stock: Number(p.stock) + Number(it.qty)}).eq('id', it.id);
              if(it.variantId){
                const { data: v } = await sb.from('product_variants').select('stock').eq('id', it.variantId).maybeSingle();
                if(v) await sb.from('product_variants').update({stock: Number(v.stock) + Number(it.qty)}).eq('id', it.variantId);
              }
            }
            await logActivity(currentUser.name, 'a annulé la commande de '+o.customer);
            await loadProducts();
            notifyTeam('order_cancelled', o.id);
          }
        } else if(btn.dataset.act==='delete-order'){
          if(currentUser.role!=='admin') return;
          if(!confirm('Supprimer définitivement la commande de '+o.customer+' ('+money(o.total)+') ? Cette action est irréversible et ne remet pas les articles en stock.')) return;
          const { error } = await sb.from('orders').delete().eq('id', o.id);
          if(!error) await logActivity(currentUser.name, 'a supprimé la commande de '+o.customer);
        }
        await loadOrders();
        renderOrdersTab(); if(currentUser.role==='admin'){ renderOverview(); renderStatsTab(); renderFinancesTab(); } else renderMyStatsTab();
      });
    });
  }

  /* ---------- TEAM TAB (admin) ---------- */
  function renderTeamTab(){
    const wrap = document.getElementById('teamList');
    wrap.innerHTML = team.map(t=>`
      <div class="team-row">
        <input class="text-input" data-id="${t.id}" value="${escapeHtml(t.name)}" style="flex:2;" ${t.id===currentUser.id?'disabled title="Modifiez votre nom depuis votre profil"':''}>
        <span class="role-badge ${t.role==='admin'?'':'assistant'}">${t.role==='admin'?'Admin':'Assistante'}</span>
        ${t.role!=='admin' ? `<button class="btn-mini danger" data-remove="${t.id}">Retirer l'accès</button>` : ''}
      </div>`).join('');
    wrap.querySelectorAll('input[data-id]:not([disabled])').forEach(inp=>{
      inp.addEventListener('change', async ()=>{
        const newName = inp.value.trim();
        if(!newName) return;
        await sb.from('team_members').update({name:newName}).eq('id', inp.dataset.id);
        await logActivity(currentUser.name, "a renommé un membre de l'équipe");
        await loadTeam(); renderTeamTab();
      });
    });
    wrap.querySelectorAll('button[data-remove]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        if(!confirm("Retirer l'accès de ce membre de l'équipe ? Son compte de connexion restera mais n'aura plus accès à l'espace équipe.")) return;
        await sb.from('team_members').delete().eq('id', btn.dataset.remove);
        await logActivity(currentUser.name, "a retiré l'accès d'un membre de l'équipe");
        await loadTeam(); renderTeamTab();
      });
    });

    const invWrap = document.getElementById('invitesList');
    invWrap.innerHTML = pendingInvites.map(i=>`
      <div class="team-row">
        <span style="flex:2;">${escapeHtml(i.name)} — ${escapeHtml(i.email)}</span>
        <span class="role-badge assistant">En attente</span>
        <button class="btn-mini danger" data-cancel="${escapeHtml(i.email)}">Annuler</button>
      </div>`).join('') || '<div class="status-msg">Aucune invitation en attente.</div>';
    invWrap.querySelectorAll('button[data-cancel]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        await sb.from('team_invites').delete().eq('email', btn.dataset.cancel);
        await loadInvites(); renderTeamTab();
      });
    });
  }
  document.getElementById('sendInviteBtn').addEventListener('click', async ()=>{
    const email = document.getElementById('inviteEmail').value.trim();
    const name = document.getElementById('inviteName').value.trim();
    const msg = document.getElementById('inviteMsg');
    if(!email || !name){ msg.textContent = 'Renseignez un email et un nom.'; return; }
    const { error } = await sb.from('team_invites').insert({email, name, role:'assistant'});
    if(error){ msg.textContent = "Erreur : cet email est peut-être déjà invité ou déjà membre de l'équipe."; return; }
    await logActivity(currentUser.name, "a invité "+name+" ("+email+") à rejoindre l'équipe");
    document.getElementById('inviteEmail').value='';
    document.getElementById('inviteName').value='';
    msg.textContent = 'Invitation enregistrée. Communiquez cet email à la personne concernée.';
    setTimeout(()=>msg.textContent='',4000);
    await loadInvites(); renderTeamTab();
  });

  /* ---------- RÉGLAGES TAB (admin) ---------- */
  function renderCategoriesUI(){
    // datalist for the product form (available to all team members)
    const dl = document.getElementById('catOptions');
    if(dl) dl.innerHTML = categories.map(c=>`<option value="${escapeHtml(c)}">`).join('');
    // management list (admin only, in Réglages)
    const list = document.getElementById('categoriesList');
    if(list){
      list.innerHTML = categories.length
        ? categories.map(c=>`<span class="cat-chip">${escapeHtml(c)}<button type="button" data-remove-cat="${escapeHtml(c)}" title="Supprimer">×</button></span>`).join('')
        : '<div class="section-note">Aucune catégorie pour l\'instant.</div>';
      list.querySelectorAll('button[data-remove-cat]').forEach(btn=>{
        btn.addEventListener('click', ()=> removeCategory(btn.getAttribute('data-remove-cat')));
      });
    }
  }
  async function saveCategories(){
    const { error } = await sb.from('settings').update({categories}).eq('id', true);
    if(error){ document.getElementById('categoryMsg').textContent = 'Erreur : '+error.message; return false; }
    await loadSettings();
    renderCategoriesUI(); renderStore();
    return true;
  }
  async function removeCategory(name){
    categories = categories.filter(c=>c!==name);
    if(await saveCategories()){
      const msg = document.getElementById('categoryMsg');
      msg.textContent = 'Catégorie supprimée. Les produits déjà classés gardent leur nom.';
      setTimeout(()=>msg.textContent='',3000);
    }
  }
  const addCatBtn = document.getElementById('addCategoryBtn');
  if(addCatBtn) addCatBtn.addEventListener('click', async ()=>{
    const input = document.getElementById('newCategoryInput');
    const name = input.value.trim();
    const msg = document.getElementById('categoryMsg');
    if(!name){ msg.textContent = 'Indiquez un nom de catégorie.'; return; }
    if(categories.some(c=>c.toLowerCase()===name.toLowerCase())){ msg.textContent = 'Cette catégorie existe déjà.'; return; }
    categories.push(name);
    if(await saveCategories()){
      input.value='';
      msg.textContent = 'Catégorie ajoutée.';
      setTimeout(()=>msg.textContent='',2000);
    }
  });

  /* ---------- ENVOI DES NOTIFICATIONS (admin) ---------- */
  // Appelle l'Edge Function 'send-push'. orderId => notification ciblée sur une commande.
  async function sendPush(title, body, orderId){
    const { data: { session } } = await sb.auth.getSession();
    if(!session) return {error:'Session expirée'};
    try{
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-push`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${session.access_token}` },
        body: JSON.stringify({title, body, orderId: orderId || null})
      });
      const out = await res.json();
      if(!res.ok) return {error: out.error || 'Envoi impossible'};
      return out;
    }catch(e){ return {error:"Le service de notification n'est pas joignable."}; }
  }

  async function renderNotificationsPanel(){
    const countEl = document.getElementById('subscriberCount');
    const listEl = document.getElementById('announcementsList');
    if(!countEl) return;
    const { count } = await sb.from('push_subscribers').select('id', {count:'exact', head:true});
    countEl.textContent = (count || 0) + ' cliente(s) abonnée(s) aux notifications.';
    const { data } = await sb.from('announcements').select('id,ts,title,recipients').order('ts', {ascending:false}).limit(5);
    listEl.innerHTML = (data && data.length)
      ? '<div class="section-note" style="margin-bottom:6px;">Derniers envois :</div>' + data.map(a=>
          `<div class="section-note">• ${new Date(Number(a.ts)).toLocaleDateString('fr-FR')} — ${escapeHtml(a.title)} (${a.recipients} envoi${a.recipients>1?'s':''})</div>`
        ).join('')
      : '';
  }

  const sendNotifBtn = document.getElementById('sendNotifBtn');
  if(sendNotifBtn) sendNotifBtn.addEventListener('click', async ()=>{
    const title = document.getElementById('notifTitle').value.trim();
    const body = document.getElementById('notifBody').value.trim();
    const msg = document.getElementById('notifMsg');
    if(!title || !body){ msg.textContent = 'Renseignez un titre et un message.'; return; }
    msg.textContent = 'Envoi en cours…';
    const out = await sendPush(title, body, null);
    if(out.error){ msg.textContent = 'Erreur : '+out.error; return; }
    await sb.from('announcements').insert({
      id:'a'+Date.now(), ts:Date.now(), title, body, sent_by: currentUser.id, recipients: out.sent || 0
    });
    await logActivity(currentUser.name, `a envoyé une notification "${title}" à ${out.sent||0} cliente(s)`);
    document.getElementById('notifTitle').value='';
    document.getElementById('notifBody').value='';
    msg.textContent = `Notification envoyée à ${out.sent||0} cliente(s).`;
    renderNotificationsPanel();
    setTimeout(()=>msg.textContent='',4000);
  });

  function toLocalDatetimeInput(ts){
    const d = new Date(ts);
    const pad = n => String(n).padStart(2,'0');
    return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes());
  }

  function renderSettingsTab(){
    document.getElementById('setWhatsapp').value = settings.whatsapp || '';
    document.getElementById('setPhone').value = settings.phone || '';
    document.getElementById('setFacebook').value = settings.facebook || '';
    document.getElementById('setOrangeMoney').value = settings.orange_money || '';
    document.getElementById('setPromoActive').checked = !!settings.promo_active;
    document.getElementById('setPromoPercent').value = settings.promo_percent || '';
    document.getElementById('setPromoEndsAt').value = settings.promo_ends_at ? toLocalDatetimeInput(settings.promo_ends_at) : '';
    document.getElementById('setDeliveryEnabled').checked = !!settings.delivery_enabled;
    document.getElementById('setDeliveryZones').value = formatDeliveryZones(deliveryZones);
    renderCategoriesUI();
    renderNotificationsPanel();
    const a = salesArchive || {count:0, revenue:0, byProduct:{}};
    const topArch = Object.entries(a.byProduct||{}).sort((x,y)=>y[1]-x[1]).slice(0,5)
      .map(([n,q])=>`${n} : ${q}`).join('\n') || 'aucun';
    document.getElementById('archiveSummary').textContent =
      `Résumé cumulé conservé (même après réinitialisation) :\n`
      + `• Ventes archivées : ${a.count||0} commandes\n`
      + `• Chiffre d'affaires archivé : ${money(a.revenue||0)}\n`
      + `• Top articles archivés :\n${topArch}`;
  }

  document.getElementById('saveContactBtn').addEventListener('click', async ()=>{
    const wa = document.getElementById('setWhatsapp').value.replace(/[^0-9]/g,'');
    const ph = document.getElementById('setPhone').value.replace(/[^0-9]/g,'');
    const fb = document.getElementById('setFacebook').value.trim();
    const om = document.getElementById('setOrangeMoney').value.replace(/[^0-9]/g,'');
    const msg = document.getElementById('contactMsg');
    const { error } = await sb.from('settings').update({whatsapp: wa, phone: ph, facebook: fb, orange_money: om}).eq('id', true);
    if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    await loadSettings();
    msg.textContent = 'Coordonnées enregistrées.';
    renderContactBar();
    setTimeout(()=>msg.textContent='',3000);
  });

  document.getElementById('savePromoBtn').addEventListener('click', async ()=>{
    const active = document.getElementById('setPromoActive').checked;
    const percent = Number(document.getElementById('setPromoPercent').value) || 0;
    const endsAtRaw = document.getElementById('setPromoEndsAt').value;
    const msg = document.getElementById('promoMsg');
    if(active && (percent <= 0 || percent >= 100)){ msg.textContent = 'Indiquez un pourcentage valide (entre 1 et 99).'; return; }
    const endsAt = endsAtRaw ? new Date(endsAtRaw).toISOString() : null;
    if(active && endsAt && new Date(endsAt).getTime() <= Date.now()){ msg.textContent = 'La date de fin doit être dans le futur.'; return; }
    const { error } = await sb.from('settings').update({promo_active: active, promo_percent: percent, promo_ends_at: endsAt}).eq('id', true);
    if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    await loadSettings();
    await logActivity(currentUser.name, active ? `a activé une promotion de ${percent}%` : 'a désactivé la promotion');
    msg.textContent = 'Promotion mise à jour.';
    renderStore(); renderCarousel(); renderHeroShowcase(); renderCart(); renderPromoCountdown();
    setTimeout(()=>msg.textContent='',2000);
  });

  document.getElementById('saveDeliveryBtn').addEventListener('click', async ()=>{
    const enabled = document.getElementById('setDeliveryEnabled').checked;
    const zones = parseDeliveryZones(document.getElementById('setDeliveryZones').value);
    const msg = document.getElementById('deliveryMsg');
    const { error } = await sb.from('settings').update({delivery_enabled: enabled, delivery_zones: zones}).eq('id', true);
    if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    await loadSettings();
    await logActivity(currentUser.name, enabled ? 'a activé les zones de livraison' : 'a désactivé les zones de livraison');
    msg.textContent = 'Livraison mise à jour.';
    renderDeliveryZoneOptions(); renderCart();
    setTimeout(()=>msg.textContent='',2000);
  });

  document.getElementById('migrateImagesBtn').addEventListener('click', async ()=>{
    const btn = document.getElementById('migrateImagesBtn');
    const msg = document.getElementById('migrateImagesMsg');
    const legacyCount = products.filter(p=>p.image && p.image.startsWith('data:')).length;
    if(!legacyCount){ msg.textContent = 'Aucune ancienne photo à convertir.'; return; }
    btn.disabled = true;
    msg.textContent = `Conversion de ${legacyCount} photo(s) en cours…`;
    const { done, total } = await migrateLegacyImagesToStorage();
    await loadProducts();
    renderProductsTab(); renderStore(); renderCarousel(); renderHeroShowcase();
    btn.disabled = false;
    msg.textContent = done===total ? `${done} photo(s) converties avec succès.` : `${done} sur ${total} converties — réessayez pour les autres (vérifiez votre connexion).`;
  });

  document.getElementById('clearActivityBtn').addEventListener('click', async ()=>{
    if(!currentUser || currentUser.role!=='admin') return;
    if(!confirm("Vider tout le journal d'activité ? Cette action est irréversible.")) return;
    const msg = document.getElementById('clearActivityMsg');
    const { error } = await sb.from('activity_log').delete().gte('id', 0);
    if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    await logActivity(currentUser.name, "a vidé le journal d'activité");
    renderOverview();
    msg.textContent = 'Journal vidé.';
    setTimeout(()=>msg.textContent='', 3000);
  });

  document.getElementById('resetSalesBtn').addEventListener('click', async ()=>{
    if(!confirm('Réinitialiser toutes les ventes ?\n\nLes commandes seront effacées mais le résumé statistique cumulé sera conservé. Cette action est irréversible.')) return;
    const msg = document.getElementById('resetMsg');
    msg.textContent = 'Réinitialisation en cours…';
    try{
      const newArchive = {
        count: (salesArchive.count||0) + orders.length,
        revenue: (salesArchive.revenue||0) + orders.reduce((s,o)=>s+Number(o.total||0),0),
        byProduct: Object.assign({}, salesArchive.byProduct||{})
      };
      orders.forEach(o=> (Array.isArray(o.items)?o.items:[]).forEach(it=>{
        newArchive.byProduct[it.name] = (newArchive.byProduct[it.name]||0) + Number(it.qty||0);
      }));
      const { error: aErr } = await sb.from('sales_archive')
        .update({count:newArchive.count, revenue:newArchive.revenue, by_product:newArchive.byProduct}).eq('id', true);
      if(aErr){ msg.textContent = "Erreur (sauvegarde du résumé) : " + aErr.message; return; }
      const { error: dErr } = await sb.from('orders').delete().gte('ts', 0);
      if(dErr){ msg.textContent = "Erreur (suppression des commandes) : " + dErr.message; return; }
      await logActivity(currentUser.name, "a réinitialisé l'historique des ventes (résumé conservé)");
      await Promise.all([loadOrders(), loadSalesArchive()]);
      msg.textContent = 'Historique réinitialisé. Résumé conservé.';
      renderOverview(); renderStatsTab(); renderFinancesTab(); renderSettingsTab(); renderOrdersTab();
      setTimeout(()=>{ msg.textContent=''; }, 4000);
    }catch(e){
      msg.textContent = 'Erreur : ' + (e && e.message ? e.message : e);
    }
  });

  document.getElementById('adminChangePasswordBtn').addEventListener('click', async ()=>{
    const pw = document.getElementById('adminNewPassword').value;
    const msg = document.getElementById('adminPasswordMsg');
    if(!pw || pw.length < 8){ msg.textContent = 'Le mot de passe doit contenir au moins 8 caractères.'; return; }
    const { error } = await sb.auth.updateUser({password:pw});
    msg.textContent = error ? ('Erreur : '+error.message) : 'Mot de passe mis à jour.';
    document.getElementById('adminNewPassword').value='';
    setTimeout(()=>msg.textContent='',3000);
  });

  /* ---------- MON PROFIL TAB (assistant) ---------- */
  function renderMyProfileTab(){
    document.getElementById('myName').value = currentUser.name;
    document.getElementById('myPassword').value = '';
  }
  document.getElementById('saveMyProfileBtn').addEventListener('click', async ()=>{
    const newName = document.getElementById('myName').value.trim();
    const newPassword = document.getElementById('myPassword').value;
    const msg = document.getElementById('myProfileMsg');
    if(newName && newName !== currentUser.name){
      await sb.from('team_members').update({name:newName}).eq('id', currentUser.id);
      currentUser.name = newName;
      document.getElementById('whoName').textContent = newName;
    }
    if(newPassword){
      if(newPassword.length < 8){ msg.textContent = 'Le mot de passe doit contenir au moins 8 caractères.'; return; }
      const { error } = await sb.auth.updateUser({password:newPassword});
      if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    }
    msg.textContent = 'Profil mis à jour.';
    document.getElementById('myPassword').value='';
    setTimeout(()=>msg.textContent='',2000);
  });

  /* ---------- CHATBOT CLIENT ---------- */
  const chatHistory = [];
  const chatPanel = document.getElementById('chatPanel');
  document.getElementById('chatFab').addEventListener('click', ()=>{
    chatPanel.classList.toggle('open');
    if(chatPanel.classList.contains('open')) document.getElementById('chatInput').focus();
  });
  document.getElementById('chatClose').addEventListener('click', ()=> chatPanel.classList.remove('open'));

  function addChatMsg(text, who){
    const body = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = 'chat-msg ' + who;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  async function sendChat(){
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if(!text) return;
    input.value = '';
    addChatMsg(text, 'user');
    chatHistory.push({role:'user', content:text});
    const typing = addChatMsg('Joda écrit…', 'bot typing');
    trackClick();

    const catalog = products.filter(isApproved).map(p=>
      `${p.name} (${p.cat}) — ${Number(p.price).toLocaleString('fr-FR')} GNF — ${Number(p.stock)>0 ? p.stock+' en stock' : 'épuisé'}`
    ).join('\n');

    const systemPrompt = `Tu es l'assistante virtuelle de Joda Boutique, une boutique de bijoux et accessoires ("L'excellence dans la qualité"). Tu parles français, tu es chaleureuse, brève (2-4 phrases max par réponse) et honnête. Tu aides les clientes à choisir, tu renseignes sur les prix et les stocks à partir du catalogue ci-dessous uniquement, et tu expliques comment commander : ajouter au panier puis cliquer "Commander" en laissant son nom et téléphone — l'équipe rappelle pour confirmer la livraison et le paiement. Si on te demande quelque chose qui n'est pas dans le catalogue ou que tu ne sais pas (délais exacts, adresse, promotions), dis-le simplement et invite à laisser ses coordonnées via une commande ou à contacter la boutique. Ne donne jamais d'informations inventées.

CATALOGUE ACTUEL :
${catalog}`;

    try{
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:1000,
          system: systemPrompt,
          messages: chatHistory.slice(-12)
        })
      });
      const data = await response.json();
      const reply = (data.content||[]).filter(i=>i.type==='text').map(i=>i.text).join('\n').trim()
        || "Désolée, je n'ai pas pu répondre. Pouvez-vous reformuler ?";
      typing.remove();
      addChatMsg(reply, 'bot');
      chatHistory.push({role:'assistant', content:reply});
    }catch(e){
      typing.remove();
      addChatMsg("Désolée, je n'arrive pas à répondre pour le moment. Réessayez dans un instant.", 'bot');
    }
  }
  document.getElementById('chatSend').addEventListener('click', sendChat);
  document.getElementById('chatInput').addEventListener('keydown', e=>{ if(e.key==='Enter') sendChat(); });

  loadAll();
})();
