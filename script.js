(function(){
  const LOGO_SRC = 'logo.webp';
  document.querySelectorAll('.brand-logo').forEach(img=>{ img.src = LOGO_SRC; });

  const ICONS = {
    collier: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14c0 14 8 24 18 24s18-10 18-24" stroke-linecap="round"/><circle cx="32" cy="42" r="5"/></svg>',
    bracelet: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="32" cy="32" rx="20" ry="12"/><ellipse cx="32" cy="32" rx="12" ry="6"/></svg>',
    boucles: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="22" cy="16" r="4"/><path d="M22 20v10a6 6 0 006 6" stroke-linecap="round"/><circle cx="42" cy="16" r="4"/><path d="M42 20v10a6 6 0 01-6 6" stroke-linecap="round"/></svg>',
    bague: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="32" cy="38" r="14"/><path d="M26 24l6-10 6 10z" stroke-linejoin="round"/></svg>',
    sac: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><rect x="14" y="24" width="36" height="28" rx="3"/><path d="M22 24v-4a10 10 0 0120 0v4" stroke-linecap="round"/></svg>',
    foulard: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 18c8 6 8 14 0 20s0 14 8 20" stroke-linecap="round"/><path d="M52 18c-8 6-8 14 0 20s0 14-8 20" stroke-linecap="round"/></svg>',
    montre: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="32" cy="32" r="13"/><path d="M26 19l2-9h8l2 9M26 45l2 9h8l2-9M32 25v7l5 3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    lunette: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="20" cy="36" r="9"/><circle cx="44" cy="36" r="9"/><path d="M29 35c2-2 4-2 6 0M11 34L8 22M53 34l3-12" stroke-linecap="round"/></svg>',
    chaussure: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 44V22h12c2 6 8 10 16 12l14 3c4 1 6 4 6 7v2H8z" stroke-linejoin="round"/><path d="M8 50h48" stroke-linecap="round"/></svg>',
    parfum: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><rect x="18" y="24" width="28" height="30" rx="4"/><path d="M26 24v-6h12v6M28 12h8v6h-8z" stroke-linejoin="round"/></svg>',
    robe: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 8l2 10-6 10-8 26h40l-8-26-6-10 2-10M26 18h12" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    vetement: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 10l-14 8 5 10 5-3v29h24V25l5 3 5-10-14-8c-1 4-4 6-8 6s-7-2-8-6z" stroke-linejoin="round"/></svg>',
    chapeau: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 40c0-12 7-22 16-22s16 10 16 22M8 42c8 4 40 4 48 0" stroke-linecap="round"/></svg>',
    promo: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="32" cy="32" r="22"/><path d="M24 40l16-16" stroke-linecap="round"/><circle cx="25" cy="25" r="3"/><circle cx="39" cy="39" r="3"/></svg>',
    autre: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M32 10l6 14 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z" stroke-linejoin="round"/></svg>'
  };
  const ICON_ALIASES = {casquette:'chapeau', chemise:'vetement', habit:'vetement', 'vêtement':'vetement', pantalon:'vetement', basket:'chaussure', sandale:'chaussure', 'boucle':'boucles', 'écharpe':'foulard'};
  function iconFor(cat){
    const key = (cat||'').toLowerCase();
    for(const a of Object.keys(ICON_ALIASES)){ if(key.includes(a)) return ICONS[ICON_ALIASES[a]]; }
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
  let salesArchive = {count:0, revenue:0, byProduct:{}, byAssistant:{}};
  let sessionLikes = {};
  let activeCat = '';

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
    const baseCols = 'id,ts,customer,phone,address,deliveryZone:delivery_zone,deliveryFee:delivery_fee,items,total,originalTotal:original_total,status,claimedBy:claimed_by';
    let { data, error } = await sb.from('orders')
      .select(baseCols + ',paymentMethod:payment_method,paymentPhone:payment_phone,paymentRef:payment_ref,paymentStatus:payment_status')
      .order('ts', {ascending:false});
    if(error){
      // Base pas encore migrée (supabase/migrations/2026-10-22-paiement.sql) : on charge sans le paiement.
      ({ data, error } = await sb.from('orders').select(baseCols).order('ts', {ascending:false}));
    }
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
    // Toute la ligne : les colonnes ajoutées par les migrations apparaissent dès qu'elles existent.
    const { data, error } = await sb.from('settings').select('*').eq('id', true).maybeSingle();
    if(error) console.error('loadSettings', error);
    settings = data || {whatsapp:'', phone:'', facebook:'', orange_money:'', promo_active:false, promo_percent:0, promo_ends_at:null, delivery_enabled:false, delivery_zones:[], categories:[]};
    categories = Array.isArray(settings.categories) ? settings.categories : [];
    deliveryZones = Array.isArray(settings.delivery_zones) ? settings.delivery_zones : [];
  }
  let paymentMethod = 'livraison';
  function omNumber(){ return (settings.orange_money||'').trim(); }
  // Orange Money n'est proposé que si un numéro marchand est renseigné dans Réglages.
  function renderPaymentOptions(){
    const om = omNumber();
    const online = !!settings.online_payment;
    document.getElementById('payOptOm').style.display = om ? '' : 'none';
    document.getElementById('payOptOnline').style.display = online ? '' : 'none';
    document.getElementById('omMerchantNumber').textContent = om;
    if((paymentMethod==='orange_money' && !om) || (paymentMethod==='en_ligne' && !online)) paymentMethod = 'livraison';
    document.querySelectorAll('.pay-opt').forEach(b=>b.classList.toggle('active', b.dataset.pay===paymentMethod));
    document.getElementById('omPanel').style.display = paymentMethod==='orange_money' ? '' : 'none';
    document.getElementById('onlinePanel').style.display = paymentMethod==='en_ligne' ? '' : 'none';
    document.getElementById('cashPanel').style.display = paymentMethod==='livraison' ? '' : 'none';
  }
  document.querySelectorAll('.pay-opt').forEach(btn=>{
    btn.addEventListener('click', ()=>{ paymentMethod = btn.dataset.pay; renderPaymentOptions(); });
  });
  document.getElementById('copyOmMerchant').addEventListener('click', async (e)=>{
    try{ await navigator.clipboard.writeText(omNumber()); e.target.textContent = 'Copié ✓'; }
    catch(err){ prompt('Copiez ce numéro :', omNumber()); }
  });
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
  let promoHopTimer = null;
  const PROMO_SPOTS = 4;
  function renderPromoCountdown(){
    const el = document.getElementById('promoCountdown');
    if(!el) return;
    if(promoCountdownTimer){ clearInterval(promoCountdownTimer); promoCountdownTimer = null; }
    if(promoHopTimer){ clearInterval(promoHopTimer); promoHopTimer = null; }
    if(!promoActive()){
      el.style.display = 'none';
      return;
    }
    document.getElementById('promoPct').textContent = `-${settings.promo_percent}%`;
    const textEl = document.getElementById('promoCountdownText');
    el.style.display = 'flex';

    if(settings.promo_ends_at){
      const endTs = new Date(settings.promo_ends_at).getTime();
      const tick = () => {
        const diff = endTs - Date.now();
        if(diff <= 0){ renderPromoCountdown(); renderStore(); renderCarousel(); renderCategoryShowcase(); renderCart(); return; }
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        const pad = n => String(n).padStart(2,'0');
        const parts = days > 0 ? `${days}j ${pad(hours)}h ${pad(mins)}m` : `${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
        textEl.textContent = `Fin dans ${parts}`;
      };
      tick();
      promoCountdownTimer = setInterval(tick, 1000);
    } else {
      textEl.textContent = 'Sur toute la boutique';
    }

    // Le badge change de place toutes les 7 secondes (sauf si l'utilisateur préfère moins d'animations).
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let spot = 0;
    promoHopTimer = setInterval(()=>{
      el.classList.add('hop');
      setTimeout(()=>{
        el.classList.remove('pos-'+spot);
        spot = (spot + 1) % PROMO_SPOTS;
        el.classList.add('pos-'+spot);
        el.classList.remove('hop');
      }, 450);
    }, 7000);
  }
  function openPromoProducts(){
    setView('store');
    selectCategory('__promo');
  }
  document.getElementById('promoCountdown').addEventListener('click', openPromoProducts);
  document.getElementById('promoCountdown').addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openPromoProducts(); } });
  function effectivePrice(price){
    if(!promoActive()) return Number(price);
    return Math.round(Number(price) * (1 - Number(settings.promo_percent)/100));
  }
  async function loadSalesArchive(){
    salesArchive = {count:0, revenue:0, byProduct:{}, byAssistant:{}};
    if(!currentUser || currentUser.role!=='admin') return;
    let { data, error } = await sb.from('sales_archive').select('count,revenue,by_product,by_assistant').eq('id', true).maybeSingle();
    if(error) ({ data, error } = await sb.from('sales_archive').select('count,revenue,by_product').eq('id', true).maybeSingle());
    if(error) console.error('loadSalesArchive', error);
    if(data) salesArchive = {count:data.count||0, revenue:data.revenue||0, byProduct:data.by_product||{}, byAssistant:data.by_assistant||{}};
  }

  async function loadAll(){
    await Promise.all([loadProducts(), loadVariants(), loadLikes(), loadSettings()]);
    await trackVisit();
    await initPush();
    renderContactBar();
    renderSubscribeMini();
    renderCategoriesUI();
    renderStore();
    renderCarousel(); renderCategoryShowcase();
    renderPromoCountdown();
    renderDeliveryZoneOptions();
    loadReviews().then(renderReviews);
    renderPaymentOptions();
    restoreCart();
    renderCart();
    initConsent();

    handlePaymentReturn();

    const sharedProductId = new URLSearchParams(location.search).get('p');
    if(sharedProductId) scrollToProduct(sharedProductId);

    const { data:{ session } } = await sb.auth.getSession();
    if(session) await handleAuthSession();
  }

  /* ---------- RETOUR DU PAIEMENT EN LIGNE (?commande=ID&paiement=retour|annule) ---------- */
  function showPayReturn(icon, title, text){
    document.getElementById('payReturn').style.display = 'flex';
    document.getElementById('payReturnIcon').textContent = icon;
    document.getElementById('payReturnTitle').textContent = title;
    document.getElementById('payReturnText').textContent = text;
  }
  async function handlePaymentReturn(){
    const params = new URLSearchParams(location.search);
    const orderId = params.get('commande');
    const back = params.get('paiement');
    if(!orderId || !back) return;
    history.replaceState(null, '', location.pathname);
    if(back === 'annule'){
      showPayReturn('✕', 'Paiement annulé', "Votre commande est enregistrée mais n'est pas payée. Notre équipe vous contactera, ou écrivez-nous sur WhatsApp.");
      return;
    }
    showPayReturn('⏳', 'Vérification du paiement…', 'Merci de patienter quelques secondes.');
    for(let i=0; i<20; i++){
      try{
        const res = await fetch('/.netlify/functions/pay-status?commande='+encodeURIComponent(orderId));
        const data = await res.json();
        if(data.status === 'reçu'){ showPayReturn('✓', 'Paiement confirmé', 'Merci ! Votre commande est payée. Notre équipe la prépare.'); return; }
        if(data.status === 'échoué'){ showPayReturn('✕', 'Paiement non abouti', "Le paiement n'a pas été validé. Votre commande est enregistrée : notre équipe vous contactera."); return; }
      }catch(e){ console.error('pay-status', e); }
      await new Promise(r=>setTimeout(r, 3000));
    }
    showPayReturn('⏳', 'Paiement en cours de vérification', "Nous n'avons pas encore la confirmation d'Orange. Votre commande est enregistrée ; notre équipe vérifiera le paiement.");
  }
  document.getElementById('payReturnClose').addEventListener('click', ()=>{ document.getElementById('payReturn').style.display = 'none'; });

  /* ---------- AVIS DE CLIENTES ---------- */
  let reviews = [];
  async function loadReviews(){
    const { data, error } = await sb.from('reviews').select('id,customer,message,rating,photo,published,created_at').order('created_at', {ascending:false});
    reviews = error ? [] : (data || []);  // table absente tant que la migration n'est pas faite
  }
  function starsHtml(n){ const k = Math.max(1, Math.min(5, Number(n)||5)); return '★'.repeat(k) + '☆'.repeat(5-k); }
  function renderReviews(){
    const visible = reviews.filter(r=>r.published);
    document.getElementById('reviewsSection').style.display = visible.length ? '' : 'none';
    const row = document.getElementById('reviewsRow');
    row.innerHTML = visible.slice(0, 8).map(r=>`
      <div class="review-card">
        ${r.photo ? `<img src="${escapeHtml(r.photo)}" alt="Avis de ${escapeHtml(r.customer)}" loading="lazy">` : ''}
        <div class="review-body">
          <div class="review-stars" aria-label="${Number(r.rating)} sur 5">${starsHtml(r.rating)}</div>
          <div class="review-text">« ${escapeHtml(r.message)} »</div>
          <div class="review-name">— ${escapeHtml(r.customer)}</div>
        </div>
      </div>`).join('');
    row.querySelectorAll('img').forEach(img=> img.addEventListener('click', ()=> openLightbox(img.src, img.alt)));
  }
  function renderReviewsAdmin(){
    const list = document.getElementById('reviewsAdminList');
    if(!list) return;
    list.innerHTML = reviews.map(r=>`
      <div class="review-admin-row">
        ${r.photo ? `<img src="${escapeHtml(r.photo)}" alt="">` : ''}
        <span class="ra-text"><strong>${escapeHtml(r.customer)}</strong> — ${escapeHtml(r.message)}</span>
        <button class="btn-mini danger" data-del-review="${r.id}">Retirer</button>
      </div>`).join('') || '<div class="section-note">Aucun avis pour le moment.</div>';
    list.querySelectorAll('[data-del-review]').forEach(btn=> btn.addEventListener('click', async ()=>{
      if(!confirm('Retirer cet avis de la boutique ?')) return;
      const { error } = await sb.from('reviews').delete().eq('id', btn.dataset.delReview);
      if(error){ alert('Erreur : '+error.message); return; }
      await loadReviews(); renderReviews(); renderReviewsAdmin();
    }));
  }
  document.getElementById('addReviewBtn').addEventListener('click', async ()=>{
    const msg = document.getElementById('reviewMsg');
    const customer = document.getElementById('revName').value.trim();
    const message = document.getElementById('revMessage').value.trim();
    const rating = Number(document.getElementById('revRating').value) || 5;
    const file = document.getElementById('revPhoto').files[0];
    if(!customer || !message){ msg.textContent = 'Indiquez le prénom et le message de la cliente.'; return; }
    msg.textContent = 'Enregistrement…';
    let photo = null;
    try{ if(file) photo = await uploadProductPhoto(file, 'avis'); }
    catch(e){ msg.textContent = "La photo n'a pas pu être envoyée : " + (e.message||e); return; }
    const { error } = await sb.from('reviews').insert({customer, message, rating, photo});
    if(error){ msg.textContent = /reviews/.test(error.message||'') ? "Lancez d'abord la mise à jour Supabase (2026-10-22-avis-partage.sql)." : 'Erreur : '+error.message; return; }
    await logActivity(currentUser.name, 'a ajouté un avis de ' + customer);
    ['revName','revMessage','revPhoto'].forEach(id=> document.getElementById(id).value = '');
    msg.textContent = 'Avis ajouté ✓';
    await loadReviews(); renderReviews(); renderReviewsAdmin();
    setTimeout(()=> msg.textContent = '', 2500);
  });

  /* ---------- PHOTO DE PARTAGE (WhatsApp / Facebook) ---------- */
  function renderSharePreview(){
    const el = document.getElementById('sharePreview');
    if(!el) return;
    el.innerHTML = settings.share_image
      ? `<img src="${escapeHtml(settings.share_image)}" alt="Photo de partage">`
      : 'Actuellement : photo automatique (une de vos pièces).';
  }
  async function saveShareImage(url){
    const msg = document.getElementById('shareMsg');
    const { error } = await sb.from('settings').update({share_image: url}).eq('id', true);
    if(error){ msg.textContent = /share_image/.test(error.message||'') ? "Lancez d'abord la mise à jour Supabase (2026-10-22-avis-partage.sql)." : 'Erreur : '+error.message; return false; }
    await loadSettings();
    renderSharePreview();
    msg.textContent = url ? "Photo enregistrée ✓ (WhatsApp et Facebook peuvent garder l'ancienne image en mémoire quelques jours)" : 'Retour à la photo automatique ✓';
    return true;
  }
  document.getElementById('saveShareBtn').addEventListener('click', async ()=>{
    const file = document.getElementById('sharePhoto').files[0];
    const msg = document.getElementById('shareMsg');
    if(!file){ msg.textContent = 'Choisissez une photo.'; return; }
    msg.textContent = 'Envoi…';
    try{
      const url = await uploadProductPhoto(file, 'partage');
      if(await saveShareImage(url)) document.getElementById('sharePhoto').value = '';
    }catch(e){ msg.textContent = 'Erreur : ' + (e.message||e); }
  });
  document.getElementById('resetShareBtn').addEventListener('click', ()=> saveShareImage(null));

  /* ---------- COOKIES : CONSENTEMENT, MESURE ET PUBLICITÉ ----------
     Rien n'est chargé (pixel, Google, YouTube, Facebook) avant l'accord de la visiteuse.
     Catégories : stats (Google Analytics), ads (pixels Facebook/TikTok, Google Ads),
     media (vidéo YouTube, fil Facebook). Le choix est gardé dans le navigateur. */
  const CONSENT_KEY = 'joda_consent';
  const CONSENT_VERSION = 1;
  // Identifiants nettoyés : ils sont insérés dans des URL et des scripts.
  function trackingIds(){
    const clean = (v, re) => { const t = String(v||'').trim(); return re.test(t) ? t : ''; };
    return {
      fb: clean(settings.fb_pixel_id, /^\d{5,20}$/),
      tiktok: clean(settings.tiktok_pixel_id, /^[A-Z0-9]{8,30}$/i),
      ga: clean(settings.ga_id, /^G-[A-Z0-9]{4,20}$/i),
      gads: clean(settings.gads_id, /^AW-\d{5,15}$/i),
      gadsLabel: clean(settings.gads_label, /^[A-Za-z0-9_-]{4,40}$/)
    };
  }
  function youtubeId(url){
    const m = String(url||'').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
    return m ? m[1] : '';
  }
  function facebookPageUrl(){
    const fb = String(settings.facebook||'').trim();
    return settings.fb_feed && /^https:\/\/(www\.|m\.)?facebook\.com\//.test(fb) ? fb : '';
  }
  function consentNeeded(){
    const ids = trackingIds();
    return { stats: !!ids.ga, ads: !!(ids.fb || ids.tiktok || ids.gads), media: !!(youtubeId(settings.youtube_url) || facebookPageUrl()) };
  }
  function readConsent(){
    try{ const c = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null'); return c && c.v === CONSENT_VERSION ? c : null; }
    catch(e){ return null; }
  }
  let consent = {stats:false, ads:false, media:false};
  function saveConsent(c){
    consent = {stats:!!c.stats, ads:!!c.ads, media:!!c.media};
    try{ localStorage.setItem(CONSENT_KEY, JSON.stringify({v:CONSENT_VERSION, ts:Date.now(), ...consent})); }catch(e){ /* choix valable pour cette visite seulement */ }
  }
  function loadScript(src){
    const s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s);
  }
  const loaded = {};
  function applyConsent(){
    const ids = trackingIds();
    if(consent.ads && ids.fb && !loaded.fb){
      loaded.fb = true;
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
        s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', ids.fb); window.fbq('track', 'PageView');
    }
    if(consent.ads && ids.tiktok && !loaded.tiktok){
      loaded.tiktok = true;
      !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
        ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
        ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
        ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
        var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      }(window,document,'ttq');
      window.ttq.load(ids.tiktok); window.ttq.page();
    }
    const wantGa = consent.stats && ids.ga, wantAds = consent.ads && ids.gads;
    if((wantGa || wantAds) && !loaded.gtagLib){
      loaded.gtagLib = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){ window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(wantGa ? ids.ga : ids.gads));
    }
    if(wantGa && !loaded.ga){ loaded.ga = true; window.gtag('config', ids.ga); }
    if(wantAds && !loaded.gads){ loaded.gads = true; window.gtag('config', ids.gads); }
    renderSocialEmbeds();
  }
  // Envoie un événement aux outils acceptés : add_to_cart, begin_checkout, purchase.
  function trackEvent(name, data){
    const ids = trackingIds();
    const value = Math.round(Number(data.value)||0);
    const contents = (data.items||[]).map(it=>({id:String(it.id), quantity:Number(it.qty)||1}));
    try{
      if(loaded.fb && window.fbq){
        const fbName = {add_to_cart:'AddToCart', begin_checkout:'InitiateCheckout', purchase:'Purchase'}[name];
        window.fbq('track', fbName, {value, currency:'GNF', contents, content_type:'product'});
      }
      if(loaded.tiktok && window.ttq){
        const ttName = {add_to_cart:'AddToCart', begin_checkout:'InitiateCheckout', purchase:'CompletePayment'}[name];
        window.ttq.track(ttName, {value, currency:'GNF', contents:contents.map(c=>({content_id:c.id, quantity:c.quantity}))});
      }
      if(window.gtag && (loaded.ga || loaded.gads)){
        window.gtag('event', name, {value, currency:'GNF', transaction_id:data.orderId,
          items:(data.items||[]).map(it=>({item_id:String(it.id), item_name:it.name, price:Number(it.price)||0, quantity:Number(it.qty)||1}))});
        if(name==='purchase' && loaded.gads && ids.gadsLabel){
          window.gtag('event', 'conversion', {send_to:`${ids.gads}/${ids.gadsLabel}`, value, currency:'GNF', transaction_id:data.orderId});
        }
      }
    }catch(e){ console.error('trackEvent', e); }
  }
  function cartTrackingItems(){
    return Object.keys(cart).filter(k=>cart[k]>0).map(key=>{
      const {productId} = parseCartKey(key);
      const p = products.find(x=>x.id===productId) || {};
      return {id:productId, name:p.name||'', price:effectivePrice(p.price||0), qty:cart[key]};
    });
  }

  // Bandeau de consentement : affiché seulement si un outil est configuré et qu'aucun choix n'est fait.
  function showConsentBanner(force){
    const need = consentNeeded();
    const any = need.stats || need.ads || need.media;
    document.getElementById('manageCookies').style.display = any ? '' : 'none';
    if(!any) return;
    const banner = document.getElementById('consentBanner');
    document.getElementById('consentStatsRow').style.display = need.stats ? '' : 'none';
    document.getElementById('consentAdsRow').style.display = need.ads ? '' : 'none';
    document.getElementById('consentMediaRow').style.display = need.media ? '' : 'none';
    document.getElementById('consentStats').checked = consent.stats;
    document.getElementById('consentAds').checked = consent.ads;
    document.getElementById('consentMedia').checked = consent.media;
    banner.classList.toggle('detailed', !!force);
    banner.style.display = (force || !readConsent()) ? '' : 'none';
  }
  function closeConsent(c){
    saveConsent(c);
    document.getElementById('consentBanner').style.display = 'none';
    applyConsent();
  }
  document.getElementById('consentAccept').addEventListener('click', ()=> closeConsent({stats:true, ads:true, media:true}));
  document.getElementById('consentRefuse').addEventListener('click', ()=> closeConsent({stats:false, ads:false, media:false}));
  document.getElementById('consentCustomize').addEventListener('click', ()=> document.getElementById('consentBanner').classList.add('detailed'));
  document.getElementById('consentSave').addEventListener('click', ()=> closeConsent({
    stats: document.getElementById('consentStats').checked,
    ads: document.getElementById('consentAds').checked,
    media: document.getElementById('consentMedia').checked
  }));
  document.getElementById('manageCookies').addEventListener('click', ()=> showConsentBanner(true));
  function initConsent(){
    const saved = readConsent();
    if(saved) consent = {stats:!!saved.stats, ads:!!saved.ads, media:!!saved.media};
    showConsentBanner(false);
    applyConsent();
  }

  // « Suivez-nous » : vidéo YouTube et fil Facebook, affichés après accord « vidéos et réseaux sociaux ».
  function renderSocialEmbeds(){
    const section = document.getElementById('socialSection');
    const ytId = youtubeId(settings.youtube_url);
    const fbUrl = facebookPageUrl();
    section.style.display = (ytId || fbUrl) ? '' : 'none';
    if(!ytId && !fbUrl) return;
    const blocked = `<div class="embed-blocked">
        <p>Ce contenu est fourni par YouTube / Facebook, qui peuvent déposer des cookies.</p>
        <button type="button" class="btn-primary embed-allow">Afficher le contenu</button>
      </div>`;
    document.getElementById('ytEmbed').style.display = ytId ? '' : 'none';
    document.getElementById('fbEmbed').style.display = fbUrl ? '' : 'none';
    if(ytId) document.getElementById('ytEmbed').innerHTML = consent.media
      ? `<iframe src="https://www.youtube-nocookie.com/embed/${ytId}" title="Vidéo Joda Boutique" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      : blocked;
    if(fbUrl) document.getElementById('fbEmbed').innerHTML = consent.media
      ? `<iframe src="https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(fbUrl)}&tabs=timeline&width=340&height=480&small_header=true&adapt_container_width=true&hide_cover=false" title="Page Facebook Joda Boutique" loading="lazy" scrolling="no" allow="encrypted-media"></iframe>`
      : blocked;
    section.querySelectorAll('.embed-allow').forEach(btn=> btn.addEventListener('click', ()=> closeConsent({...consent, media:true})));
  }

  // Réglages > Mesure & publicité
  function renderTrackingSettings(){
    if(!document.getElementById('setFbPixel')) return;
    document.getElementById('setFbPixel').value = settings.fb_pixel_id || '';
    document.getElementById('setTiktokPixel').value = settings.tiktok_pixel_id || '';
    document.getElementById('setGaId').value = settings.ga_id || '';
    document.getElementById('setGadsId').value = settings.gads_id || '';
    document.getElementById('setGadsLabel').value = settings.gads_label || '';
    document.getElementById('setYoutube').value = settings.youtube_url || '';
    document.getElementById('setFbFeed').checked = !!settings.fb_feed;
  }
  document.getElementById('saveTrackingBtn').addEventListener('click', async ()=>{
    const msg = document.getElementById('trackingMsg');
    const v = id => document.getElementById(id).value.trim();
    const fields = {
      fb_pixel_id: v('setFbPixel').replace(/\D/g,'') || null,
      tiktok_pixel_id: v('setTiktokPixel').toUpperCase() || null,
      ga_id: v('setGaId').toUpperCase() || null,
      gads_id: v('setGadsId').toUpperCase() || null,
      gads_label: v('setGadsLabel') || null,
      youtube_url: v('setYoutube') || null,
      fb_feed: document.getElementById('setFbFeed').checked
    };
    if(fields.ga_id && !/^G-[A-Z0-9]{4,20}$/.test(fields.ga_id)){ msg.textContent = 'Identifiant Google Analytics invalide (format G-XXXXXXX).'; return; }
    if(fields.gads_id && !/^AW-\d{5,15}$/.test(fields.gads_id)){ msg.textContent = 'Identifiant Google Ads invalide (format AW-123456789).'; return; }
    if(fields.tiktok_pixel_id && !/^[A-Z0-9]{8,30}$/.test(fields.tiktok_pixel_id)){ msg.textContent = 'Identifiant du pixel TikTok invalide.'; return; }
    if(fields.youtube_url && !youtubeId(fields.youtube_url)){ msg.textContent = 'Lien YouTube non reconnu (collez le lien de la vidéo).'; return; }
    const { error } = await sb.from('settings').update(fields).eq('id', true);
    if(error){ msg.textContent = /column/.test(error.message||'') ? "Lancez d'abord la mise à jour Supabase (2026-10-23-mesure.sql)." : 'Erreur : '+error.message; return; }
    await loadSettings();
    await logActivity(currentUser.name, 'a mis à jour la mesure et la publicité');
    msg.textContent = 'Enregistré ✓ — les visiteuses verront le bandeau cookies à leur prochaine visite.';
    showConsentBanner(false); applyConsent();
    setTimeout(()=> msg.textContent = '', 4000);
  });

  async function handleAuthSession(){
    const { data:{ user } } = await sb.auth.getUser();
    if(!user){ currentUser = null; return; }
    const { data } = await sb.from('team_members').select('id,name,role').eq('auth_user_id', user.id).maybeSingle();
    currentUser = data || null;
    document.body.classList.toggle('team-logged', !!currentUser);
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
  // Blocs « Service client » et « WhatsApp » affichés en permanence dans l'en-tête.
  function renderHeadContacts(){
    const el = document.getElementById('headContacts');
    const num = waNumber();
    const phoneNum = (settings.phone||'').replace(/[^0-9]/g,'');
    let html = '';
    if(phoneNum){
      html += `<a class="head-item" href="tel:+${phoneNum}">
        <span class="hi-icon">${CALL_ICON}</span><span class="hi-text">Service client<small>+${phoneNum}</small></span></a>`;
    }
    if(num){
      html += `<a class="head-item wa" href="${waLink('Bonjour Joda Boutique, je souhaite commander.')}" target="_blank" rel="noopener">
        <span class="hi-icon">${WA_ICON}</span><span class="hi-text">WhatsApp<small>Commander</small></span></a>`;
    }
    const fbUrl = (settings.facebook||'').trim();
    if(fbUrl){
      html += `<a class="head-item fb" href="${escapeHtml(fbUrl)}" target="_blank" rel="noopener" title="Notre page Facebook">
        <span class="hi-icon">${FB_ICON}</span><span class="hi-text">Facebook<small>Notre page</small></span></a>`;
    }
    el.innerHTML = html;
    // Bouton flottant WhatsApp (remplace l'ancienne bulle de discussion).
    const fab = document.getElementById('waFab');
    fab.style.display = num ? '' : 'none';
    if(num) fab.href = waLink("Bonjour Joda Boutique, j'ai une question.");
  }
  // Pied de page : contacts (téléphone, WhatsApp, Facebook) et moyens de paiement acceptés.
  function renderFooter(){
    const num = waNumber();
    const phoneNum = (settings.phone||'').replace(/[^0-9]/g,'');
    const fbUrl = (settings.facebook||'').trim();
    let contacts = '';
    if(phoneNum) contacts += `<a class="f-link" href="tel:+${phoneNum}"><span class="f-ico">${CALL_ICON}</span>+${phoneNum}</a>`;
    if(num) contacts += `<a class="f-link wa" href="${waLink('Bonjour Joda Boutique !')}" target="_blank" rel="noopener"><span class="f-ico">${WA_ICON}</span>WhatsApp</a>`;
    if(fbUrl) contacts += `<a class="f-link fb" href="${escapeHtml(fbUrl)}" target="_blank" rel="noopener"><span class="f-ico">${FB_ICON}</span>Notre page Facebook</a>`;
    document.getElementById('footContacts').innerHTML = contacts || '<span class="f-sub">Bientôt disponible</span>';

    const omLogo = '<span class="om-logo">Orange<br>Money</span>';
    let pays = '';
    if(settings.online_payment) pays += `<div class="f-pay-item">${omLogo}<div>Paiement en ligne<small>Orange Money, validé sur votre téléphone</small></div></div>`;
    if(omNumber()) pays += `<div class="f-pay-item">${omLogo}<div>Transfert Orange Money<small>Au numéro de la boutique</small></div></div>`;
    pays += `<div class="f-pay-item">${document.querySelector('.pay-opt[data-pay="livraison"] .cash-logo').outerHTML}<div>À la livraison<small>Selon disponibilité</small></div></div>`;
    document.getElementById('footPayments').innerHTML = pays;
  }
  function renderContactBar(){
    renderHeadContacts();
    renderFooter();
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
    return `<div class="tag-card" id="prod-${p.id}">
      <button class="like-btn ${liked}" data-like="${p.id}" title="J'aime">♥${likeCount>0?`<span class="like-count">${likeCount}</span>`:''}</button>
      <button class="share-btn" data-share="${p.id}" title="Partager cette pièce">🔗</button>
      ${promoActive() ? `<span class="card-promo">-${settings.promo_percent}%</span>` : ''}
      ${media}
      <div class="cat">${escapeHtml(p.cat||'')}</div>
      <h3>${escapeHtml(p.name)}</h3>
      ${swatches}
      <div class="price-row ${promoActive()?'promo':''}">${priceHtml}</div>
      <div class="stock ${low?'low':''} ${outOfStock?'out':''}">${outOfStock ? 'Épuisé' : stockNum + ' en stock'}</div>
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
  function catOf(p){ return (p.cat && p.cat.trim()) || 'Autre'; }
  function matchesSearch(p, s){
    if(s.name && !String(p.name).toLowerCase().includes(s.name) && !catOf(p).toLowerCase().includes(s.name)) return false;
    const price = effectivePrice(p.price);
    if(s.min !== null && price < s.min) return false;
    if(s.max !== null && price > s.max) return false;
    return true;
  }
  function groupByCategory(list){
    const map = {};
    list.forEach(p=>{ const c = catOf(p); (map[c] = map[c] || []).push(p); });
    const toGroup = (name, items)=>{
      const withImg = items.find(p=>p.image);
      return {name, items, cover: withImg ? withImg.image : ''};
    };
    const ordered = [];
    categories.forEach(c=>{ if(map[c]){ ordered.push(toGroup(c, map[c])); delete map[c]; } });
    Object.keys(map).sort((a,b)=>a.localeCompare(b,'fr')).forEach(c=> ordered.push(toGroup(c, map[c])));
    return ordered;
  }
  function catCoverHtml(g){
    return g.cover
      ? `<img src="${g.cover}" alt="" loading="lazy">`
      : `<span class="cat-icon">${iconFor(g.name)}</span>`;
  }

  // Menus de catégories (barre de navigation, colonne de gauche, onglets, liste déroulante).
  function renderCategoryNav(groups){
    const promo = promoActive();
    const isActive = name => activeCat === name ? 'active' : '';
    document.getElementById('catNavLinks').innerHTML =
      `<button type="button" class="${isActive('')}" data-cat="">Accueil</button>`
      + groups.map(g=>`<button type="button" class="${isActive(g.name)}" data-cat="${escapeHtml(g.name)}">${escapeHtml(g.name)}</button>`).join('')
      + (promo ? `<button type="button" class="promo-link ${isActive('__promo')}" data-cat="__promo"><span class="pct">%</span> Promotions</button>` : '');

    document.getElementById('catSideList').innerHTML = groups.map(g=>`
      <button type="button" class="cat-side-item ${isActive(g.name)}" data-cat="${escapeHtml(g.name)}">
        <span class="csi-icon">${iconFor(g.name)}</span>
        <span class="csi-name">${escapeHtml(g.name)}</span>
        <span class="csi-count">${g.items.length}</span>
      </button>`).join('')
      + (promo ? `<button type="button" class="cat-side-item promo ${isActive('__promo')}" data-cat="__promo">
        <span class="csi-icon">${ICONS.promo}</span><span class="csi-name">Promotions</span><span class="csi-count">-${settings.promo_percent}%</span>
      </button>` : '');

    document.getElementById('catTabs').innerHTML =
      `<button type="button" class="${isActive('')}" data-cat="">Tous</button>`
      + groups.map(g=>`<button type="button" class="${isActive(g.name)}" data-cat="${escapeHtml(g.name)}">${escapeHtml(g.name)}</button>`).join('')
      + (promo ? `<button type="button" class="promo-link ${isActive('__promo')}" data-cat="__promo">Promotions</button>` : '');

    const sel = document.getElementById('searchCat');
    sel.innerHTML = '<option value="">Toutes catégories</option>'
      + groups.map(g=>`<option value="${escapeHtml(g.name)}">${escapeHtml(g.name)}</option>`).join('');
    sel.value = activeCat === '__promo' ? '' : activeCat;
  }

  function renderStore(){
    const grid = document.getElementById('productGrid');
    const visible = products.filter(isApproved);
    document.getElementById('heroStockCount').textContent = visible.reduce((s,p)=>s+Number(p.stock||0),0);
    const groups = groupByCategory(visible);
    if(activeCat && activeCat !== '__promo' && !groups.some(g=>g.name===activeCat)) activeCat = '';
    if(activeCat === '__promo' && !promoActive()) activeCat = '';
    renderCategoryNav(groups);

    const s = currentSearch();
    const searchActive = s.name !== '' || s.min !== null || s.max !== null;
    document.body.classList.toggle('searching', searchActive);
    const filtered = visible.filter(p=> matchesSearch(p, s) && (!activeCat || activeCat === '__promo' || catOf(p) === activeCat));

    const title = activeCat === '__promo' ? 'Promotions' : (activeCat || 'Nos produits phares');
    document.querySelector('#productsSection .section-title').textContent = searchActive ? 'Résultats de recherche' : title;
    document.getElementById('productCountNote').textContent =
      (searchActive || activeCat) ? (filtered.length + ' pièce' + (filtered.length>1?'s':'')) : (visible.length + ' pièces disponibles');

    if(visible.length === 0){
      grid.innerHTML = '<div class="loading">Aucune pièce pour le moment. Ajoutez-en depuis l\'espace équipe.</div>';
      return;
    }
    grid.innerHTML = filtered.length
      ? `<div class="grid">${filtered.map((p,i)=>productCardHtml(p,i)).join('')}</div>`
      : '<div class="loading">Aucun produit ne correspond à votre recherche.</div>';
    wireStoreButtons(grid);
  }

  function scrollToProducts(){
    const el = document.getElementById('productsSection');
    window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - document.querySelector('header.top').offsetHeight - 8, behavior:'smooth'});
  }
  function selectCategory(name){
    activeCat = name || '';
    document.getElementById('catSidebar').classList.remove('open');
    document.getElementById('allCatsBtn').setAttribute('aria-expanded', 'false');
    renderStore();
    scrollToProducts();
  }
  // Tous les liens de catégorie (menus, cercles, bannières) passent par data-cat.
  document.getElementById('storeView').parentElement.addEventListener('click', (e)=>{
    const el = e.target.closest('[data-cat]');
    if(!el) return;
    if(document.getElementById('storeView').style.display === 'none') return;
    selectCategory(el.getAttribute('data-cat'));
  });
  document.getElementById('allCatsBtn').addEventListener('click', ()=>{
    const side = document.getElementById('catSidebar');
    const open = side.classList.toggle('open');
    document.getElementById('allCatsBtn').setAttribute('aria-expanded', String(open));
    if(open) window.scrollTo({top:0, behavior:'smooth'});
  });

  // Ouvre la collection sur une pièce et fait défiler la page jusqu'à elle.
  function scrollToProduct(productId, variantId){
    const p = products.find(x=>x.id===productId);
    if(!p) return;
    if(variantId) selectedVariant[productId] = variantId;
    activeCat = '';
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
  document.getElementById('searchCat').addEventListener('change', (e)=> selectCategory(e.target.value));
  document.getElementById('searchForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    renderStore();
    scrollToProducts();
  });
  document.getElementById('clearSearch').addEventListener('click', ()=>{
    document.getElementById('searchName').value = '';
    document.getElementById('searchMin').value = '';
    document.getElementById('searchMax').value = '';
    activeCat = '';
    renderStore();
  });
  document.getElementById('seeAll').addEventListener('click', ()=> selectCategory(''));

  /* ---------- VITRINE DES CATÉGORIES (colonne de droite, cercles, bannières, bandeau de confiance) ---------- */
  function renderCategoryShowcase(){
    const groups = groupByCategory(products.filter(isApproved));
    const promo = promoActive();
    const tones = ['navy','wine','ink'];
    const card = (g, i, cls)=>`
      <button type="button" class="${cls} tone-${tones[i%3]}" data-cat="${escapeHtml(g.name)}">
        <span class="sp-text">
          <span class="sp-name">${escapeHtml(g.name)}</span>
          <span class="sp-sub">${g.items.length} pièce${g.items.length>1?'s':''} disponible${g.items.length>1?'s':''}</span>
          <span class="sp-cta">Voir la collection →</span>
        </span>
        <span class="sp-img">${catCoverHtml(g)}</span>
      </button>`;

    const side = document.getElementById('sidePromos');
    side.innerHTML = groups.slice(0,3).map((g,i)=>card(g,i,'side-promo')).join('');
    side.style.display = groups.length ? '' : 'none';

    document.getElementById('catCircles').innerHTML = groups.map(g=>`
      <button type="button" class="cat-circle" data-cat="${escapeHtml(g.name)}">
        <span class="cc-img">${catCoverHtml(g)}</span>
        <span class="cc-name">${escapeHtml(g.name)}</span>
      </button>`).join('')
      + (promo ? `<button type="button" class="cat-circle promo" data-cat="__promo">
        <span class="cc-img"><span class="cc-pct">%</span></span><span class="cc-name">Promotions</span>
      </button>` : '');

    // Bannières larges : les catégories suivantes (ou les premières s'il y en a peu).
    const bannerGroups = groups.length > 3 ? groups.slice(3,6) : groups.slice(0,3);
    document.getElementById('catBannersSection').style.display = bannerGroups.length && groups.length > 1 ? '' : 'none';
    document.getElementById('catBanners').innerHTML = bannerGroups.map((g,i)=>card(g,i,'cat-banner')).join('');

    renderTrustBar();
  }
  function renderTrustBar(){
    const phoneNum = (settings.phone||'').replace(/[^0-9]/g,'');
    const wa = waNumber();
    const om = (settings.orange_money||'').trim();
    const contact = phoneNum ? '+'+phoneNum : (wa ? 'WhatsApp +'+wa : 'Par message');
    const items = [
      {icon:'<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>', t:'Livraison partout en Guinée', s: deliveryActive() ? 'Selon votre quartier' : 'Confirmée par téléphone'},
      {icon:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" stroke-linejoin="round"/><path d="M8.5 12l2.5 2.5 4.5-5" stroke-linecap="round"/>', t:'Paiement facile', s: om ? 'Orange Money accepté' : 'Confirmé avec l\'équipe'},
      {icon:'<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" stroke-linejoin="round"/>', t:'Qualité garantie', s:'Pièces choisies à la main'},
      {icon:'<path d="M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-1v-6h3M4 13v4a2 2 0 002 2h1v-6H4" stroke-linejoin="round"/>', t:'Service client', s: contact},
      {icon:'<path d="M3 10l2-6h14l2 6M4 10v10h16V10M3 10h18M9 20v-6h6v6" stroke-linejoin="round"/>', t:'Notre boutique', s:'Conakry, Guinée'}
    ];
    document.getElementById('trustRow').innerHTML = items.map(it=>`
      <div class="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">${it.icon}</svg>
        <div><div class="ti-title">${it.t}</div><div class="ti-sub">${escapeHtml(it.s)}</div></div>
      </div>`).join('');
  }

  /* ---------- FEATURED CAROUSEL ---------- */
  let carouselTimer = null;
  let carouselItems = [];
  function buildCarouselItems(){
    const items = [];
    products.filter(isApproved).forEach(p=>{
      const pVariants = variantsFor(p.id);
      if(pVariants.length){
        pVariants.forEach(v=>{
          if(!v.image || Number(v.stock) <= 0) return;
          items.push({id:p.id, variantId:v.id, name:p.name, price:p.price, color:v.color, image:v.image});
        });
      } else if(p.image && Number(p.stock) > 0){
        items.push({id:p.id, variantId:null, name:p.name, price:p.price, color:null, image:p.image});
      }
    });
    return items;
  }
  const HERO_FEATURES = [
    ['<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" stroke-linejoin="round"/>', 'Qualité <br>garantie'],
    ['<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>', 'Livraison <br>partout en Guinée'],
    ['<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" stroke-linejoin="round"/><path d="M8.5 12l2.5 2.5 4.5-5" stroke-linecap="round"/>', 'Commande <br>rapide'],
    ['<path d="M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-1v-6h3M4 13v4a2 2 0 002 2h1v-6H4" stroke-linejoin="round"/>', 'Service <br>client']
  ];
  function heroSlideHtml(item){
    const features = HERO_FEATURES.map(([d,label])=>`<div class="hf"><span class="hf-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">${d}</svg></span><span>${label}</span></div>`).join('');
    const priceHtml = item ? (promoActive()
      ? `<span class="hs-price">${effectivePrice(item.price).toLocaleString('fr-FR')} GNF</span><span class="hs-old">${Number(item.price).toLocaleString('fr-FR')} GNF</span><span class="promo-badge">-${settings.promo_percent}%</span>`
      : `<span class="hs-price">${Number(item.price).toLocaleString('fr-FR')} GNF</span>`) : '';
    return `
      <div class="car-slide" ${item ? `data-pid="${item.id}" data-vid="${item.variantId||''}"` : ''}>
        <div class="hs-copy">
          <div class="hs-eyebrow">${promoActive() ? `Promotion -${settings.promo_percent}%` : 'Nouvelle collection'}</div>
          <div class="hs-title">Joda <br><span>Boutique</span></div>
          <div class="hs-lead">Bijoux, sacs et accessoires tendance à Conakry, livrés partout en Guinée.</div>
          <div class="hs-script">L'excellence dans la qualité</div>
          <div class="hs-features">${features}</div>
          <button type="button" class="hs-cta">${item ? 'Voir la pièce' : 'Découvrir'} <span>→</span></button>
        </div>
        <div class="hs-visual">
          ${item ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">
          <div class="hs-tag"><div class="hs-name">${escapeHtml(item.name)}${item.color ? ' — '+escapeHtml(item.color) : ''}</div>${priceHtml}</div>`
          : `<img class="hs-logo" src="${LOGO_SRC}" alt="Joda Boutique">`}
        </div>
      </div>`;
  }
  function renderCarousel(){
    const track = document.getElementById('carouselTrack');
    const dots = document.getElementById('carouselDots');
    carouselItems = buildCarouselItems();
    if(carouselTimer){ clearInterval(carouselTimer); carouselTimer = null; }
    track.innerHTML = carouselItems.length ? carouselItems.map(heroSlideHtml).join('') : heroSlideHtml(null);
    const multi = carouselItems.length > 1;
    document.getElementById('carPrev').style.display = multi ? '' : 'none';
    document.getElementById('carNext').style.display = multi ? '' : 'none';
    dots.innerHTML = multi ? carouselItems.slice(0, 12).map((item,i)=>`<button class="car-dot ${i===0?'active':''}" data-i="${i}" aria-label="Diapositive ${i+1}"></button>`).join('') : '';
    dots.querySelectorAll('.car-dot').forEach(d=>{
      d.addEventListener('click', ()=> goToSlide(Number(d.dataset.i)));
    });
    track.querySelectorAll('.car-slide').forEach(slide=>{
      slide.addEventListener('click', ()=>{
        if(slide.dataset.pid) scrollToProduct(slide.dataset.pid, slide.dataset.vid || null);
        else scrollToProducts();
      });
    });
    if(multi){
      carouselTimer = setInterval(()=>{
        const cur = currentSlideIndex();
        goToSlide((cur + 1) % carouselItems.length);
      }, 5000);
    }
  }
  function currentSlideIndex(){
    const track = document.getElementById('carouselTrack');
    if(!track.clientWidth) return 0;
    return Math.round(track.scrollLeft / track.clientWidth);
  }
  function goToSlide(i){
    const track = document.getElementById('carouselTrack');
    if(!track.children.length) return;
    track.scrollTo({left: i * track.clientWidth, behavior:'smooth'});
    document.querySelectorAll('.car-dot').forEach((d,idx)=>d.classList.toggle('active', idx===i));
  }
  document.getElementById('carPrev').addEventListener('click', ()=>{
    const cur = currentSlideIndex();
    goToSlide(cur > 0 ? cur-1 : carouselItems.length-1);
  });
  document.getElementById('carNext').addEventListener('click', ()=>{
    goToSlide((currentSlideIndex()+1) % carouselItems.length);
  });
  document.getElementById('carouselTrack').addEventListener('scroll', ()=>{
    const i = currentSlideIndex();
    document.querySelectorAll('.car-dot').forEach((d,idx)=>d.classList.toggle('active', idx===i));
  }, {passive:true});
  document.getElementById('carouselSection').addEventListener('mouseenter', ()=>{ if(carouselTimer){ clearInterval(carouselTimer); carouselTimer=null; } });
  document.getElementById('carouselSection').addEventListener('mouseleave', ()=>{
    if(carouselItems.length > 1 && !carouselTimer){
      carouselTimer = setInterval(()=>{ goToSlide((currentSlideIndex()+1) % carouselItems.length); }, 5000);
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
    trackEvent('add_to_cart', {value:effectivePrice(p.price), items:[{id:p.id, name:p.name, price:effectivePrice(p.price), qty:1}]});
  }

  // Le panier est gardé dans le navigateur pour survivre à un rechargement de page.
  const CART_KEY = 'joda_cart';
  function saveCart(){
    try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }catch(e){ /* stockage indisponible : panier en mémoire seulement */ }
  }
  function restoreCart(){
    let saved = {};
    try{ saved = JSON.parse(localStorage.getItem(CART_KEY) || '{}') || {}; }catch(e){ saved = {}; }
    cart = {};
    Object.entries(saved).forEach(([key, qty])=>{
      const {productId, variantId} = parseCartKey(key);
      const p = products.find(x=>x.id===productId && isApproved(x));
      if(!p) return;
      const stock = variantId ? Number((variants.find(v=>v.id===variantId)||{}).stock || 0) : Number(p.stock);
      const n = Math.min(Number(qty)||0, stock);
      if(n > 0) cart[key] = n;
    });
  }
  function renderCart(){
    saveCart();
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
    const payerPhone = document.getElementById('omPayerPhone').value.replace(/[^0-9]/g,'');
    const payRef = document.getElementById('omPayRef').value.trim();
    if(paymentMethod==='orange_money' && !payerPhone){ msg.textContent = "Merci d'indiquer le numéro Orange Money qui paie."; return; }
    const payLabel = paymentMethod==='orange_money'
      ? `Orange Money (n° ${payerPhone}${payRef ? ', réf. '+payRef : ', référence à envoyer'})`
      : paymentMethod==='en_ligne' ? 'Paiement en ligne Orange Money' : 'À la livraison';
    const items = keys.map(key=>{
      const {productId, variantId} = parseCartKey(key);
      return variantId ? {id:productId, qty:cart[key], variantId} : {id:productId, qty:cart[key]};
    });

    msg.textContent = 'Envoi en cours…';
    const trackedItems = cartTrackingItems();
    trackEvent('begin_checkout', {value: trackedItems.reduce((s,it)=>s+it.price*it.qty,0), items: trackedItems});
    let { data, error } = await sb.rpc('place_order', {p_customer:name, p_phone:phone, p_items:items, p_address:address, p_delivery_zone:deliveryZone,
      p_payment_method:paymentMethod, p_payment_phone:paymentMethod==='orange_money' ? payerPhone : null, p_payment_ref:payRef || null});
    if(error && error.code === 'PGRST202' && paymentMethod==='en_ligne'){
      msg.textContent = "Le paiement en ligne n'est pas encore disponible. Choisissez un autre mode de paiement.";
      return;
    }
    if(error && error.code === 'PGRST202'){
      // Base pas encore migrée : ancienne fonction, le paiement est noté dans l'adresse pour l'équipe.
      ({ data, error } = await sb.rpc('place_order', {p_customer:name, p_phone:phone, p_items:items,
        p_address:`${address} — Paiement : ${payLabel}`, p_delivery_zone:deliveryZone}));
    }
    if(error){
      msg.textContent = "La commande n'a pas pu être enregistrée (stock insuffisant ou erreur de connexion). Réessayez.";
      return;
    }
    await Promise.all([loadProducts(), loadVariants()]);
    cart = {};
    renderCart(); renderStore(); renderCarousel(); renderCategoryShowcase();
    if(currentUser){ await loadOrders(); renderLoggedArea(); }
    notifyTeam('new_order', data.id);
    trackEvent('purchase', {orderId: data.id, value: Number(data.total||0) + Number(data.deliveryFee||0), items: trackedItems});

    // Abonnement au suivi de commande (si la cliente l'a accepté).
    const optIn = document.getElementById('notifyOptIn');
    if(optIn && optIn.checked && pushSupported()){
      subscribeToPush(data.id, name).catch(e=>console.error('push opt-in', e));
    }

    if(paymentMethod==='en_ligne'){
      document.getElementById('custName').value=''; document.getElementById('custPhone').value=''; document.getElementById('custAddress').value=''; document.getElementById('custDeliveryZone').value='';
      msg.textContent = 'Commande enregistrée. Redirection vers Orange Money…';
      try{
        const res = await fetch('/.netlify/functions/pay-start', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({orderId: data.id})});
        const pay = await res.json();
        if(res.ok && pay.paymentUrl){ location.href = pay.paymentUrl; return; }
        console.error('pay-start', res.status, pay);
      }catch(e){ console.error('pay-start', e); }
      const wa = waLink(`Bonjour Joda Boutique, ma commande ${data.id} est enregistrée mais le paiement en ligne n'a pas fonctionné.`);
      msg.innerHTML = "Commande enregistrée, mais le paiement en ligne n'a pas pu démarrer. Notre équipe vous contacte pour le paiement."
        + (wa ? `<div class="checkout-wa"><a class="wa-btn" href="${wa}" target="_blank" rel="noopener">${WA_ICON} Nous écrire sur WhatsApp</a></div>` : '');
      return;
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
      + `%0APaiement : ${payLabel}`
      + `%0ANom : ${name}` + (phone ? `%0ATéléphone : ${phone}` : '') + (address ? `%0AAdresse : ${address}` : '');
    const waHref = waLink(decodeURIComponent(recap));
    const contactItems = buildContactItems(false);
    const orangeMoney = paymentMethod==='orange_money' ? omNumber() : '';
    msg.innerHTML = 'Commande envoyée ! Merci ' + escapeHtml(name) + '. Total à payer : ' + money(grandTotal) + '.'
      + (paymentMethod==='orange_money'
          ? (payRef ? ' Nous vérifions votre paiement Orange Money.' : ' Pensez à envoyer le paiement Orange Money puis la référence par WhatsApp.')
          : ' Vous paierez à la livraison.')
      + (orangeMoney && !payRef ? `<div class="checkout-om"><span class="om-label">Dépôt Orange Money</span><span class="om-number">${escapeHtml(orangeMoney)}</span><button type="button" class="btn-mini" id="copyOmBtn">Copier</button></div>` : '')
      + (waHref ? `<div class="checkout-wa"><a class="wa-btn" href="${waHref}" target="_blank" rel="noopener">${WA_ICON} Confirmer sur WhatsApp</a></div>` : '')
      + (contactItems ? `<p class="section-note" style="margin:12px 0 4px;">Vous pouvez aussi nous joindre directement :</p><div class="checkout-contact-list">${contactItems}</div>` : '');
    const copyOmBtn = document.getElementById('copyOmBtn');
    if(copyOmBtn) copyOmBtn.addEventListener('click', async ()=>{
      try{ await navigator.clipboard.writeText(orangeMoney); copyOmBtn.textContent = 'Copié ✓'; }
      catch(e){ prompt('Copiez ce numéro :', orangeMoney); }
    });
    document.getElementById('custName').value=''; document.getElementById('custPhone').value=''; document.getElementById('custAddress').value=''; document.getElementById('custDeliveryZone').value='';
    document.getElementById('omPayerPhone').value=''; document.getElementById('omPayRef').value='';
    setTimeout(()=>{ if(!waHref && !contactItems && !orangeMoney){ msg.textContent=''; closeDrawer(); } }, 4000);
  });

  /* ---------- NAV / VIEWS ---------- */
  function setView(view){
    document.getElementById('storeView').style.display = view==='store' ? '' : 'none';
    document.body.classList.toggle('view-admin', view==='admin');
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
    document.body.classList.remove('team-logged');
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
  // Seules les commandes traitées comptent dans les statistiques et les finances
  // (les nouvelles, en cours et annulées en sont exclues).
  function isCounted(o){ return o.status==='traitée'; }
  function soldQuantities(filterFn){
    const map = {};
    orders.forEach(o=>{
      if(!isCounted(o)) return;
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
      if(!isCounted(o)) return;
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
    const weekOrders = orders.filter(o=> o.ts && o.ts >= weekAgo && isCounted(o));
    const weekOffline = offlineSales.filter(o=> o.ts && o.ts >= weekAgo).reduce((s,o)=>s+Number(o.amount||0),0);
    const weekRevenue = weekOrders.reduce((s,o)=>s+Number(o.total||0),0) + weekOffline;
    const weekItems = weekOrders.reduce((s,o)=>s+o.items.reduce((x,it)=>x+it.qty,0),0);
    const totalStock = products.reduce((s,p)=>s+Number(p.stock||0),0);
    const curWeek = weekKey(now);
    const t = traffic[curWeek] || {visits:0, clicks:0};

    document.getElementById('statsTopGrid').innerHTML = `
      <div class="stat-card"><div class="num">${weekOrders.length}</div><div class="lbl">Commandes traitées (7 jours)</div></div>
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
    mineWeek.filter(isCounted).forEach(o=> o.items.forEach(it=>{ weekMap[it.name] = (weekMap[it.name]||0) + it.qty; }));
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
    const monthOrders = orders.filter(o=> o.ts && monthKey(o.ts)===mk && isCounted(o));
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
    const weekOrders = orders.filter(o=> o.ts>=start && o.ts<=end && isCounted(o));
    const onsiteRevenue = weekOrders.reduce((s,o)=>s+Number(o.total||0),0);
    const weekOffline = offlineSales.filter(o=> o.ts>=start && o.ts<=end);
    const offlineTotal = weekOffline.reduce((s,o)=>s+Number(o.amount||0),0);
    const revenue = onsiteRevenue + offlineTotal;
    const weekExpenses = expenses.filter(e=> e.ts>=start && e.ts<=end);
    const totalExp = weekExpenses.reduce((s,e)=>s+Number(e.amount),0);
    const itemsSold = weekOrders.reduce((s,o)=>s+o.items.reduce((x,it)=>x+it.qty,0),0);
    const totalCom = team.filter(t=>t.role==='assistant').reduce((sum,a)=>{
      const mine = assistantOrders(a.id, o=> o.ts>=start && o.ts<=end && isCounted(o));
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
      <div class="stat-card"><div class="num">${f.weekOrders.length}</div><div class="lbl">Commandes traitées</div></div>
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
    const mine = assistantOrders(currentUser.id, o=> o.ts>=start && o.ts<=end && isCounted(o));
    const treated = mine.filter(o=>o.status==='traitée');
    const sales = treated.reduce((s,o)=>s+o.total,0);
    const com = commissionOf(mine);
    const itemsSold = mine.reduce((s,o)=>s+o.items.reduce((x,it)=>x+it.qty,0),0);

    document.getElementById('myWeekRangeLabel').textContent = weekRangeLabel(refTs);
    document.getElementById('myWeekNextBtn').disabled = myWeekOffset >= 0;

    const netAfterCom = sales - com;
    grid.innerHTML = `
      <div class="stat-card"><div class="num">${mine.length}</div><div class="lbl">Commandes traitées</div></div>
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
      const wMine = assistantOrders(currentUser.id, o=> o.ts>=ws && o.ts<=we && isCounted(o));
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

  // Cumul « depuis toujours » : commandes en base + ventes hors site + résumé archivé.
  function renderCumulPanel(){
    const live = orders.filter(o=>o.ts && isCounted(o));
    const arch = salesArchive || {count:0, revenue:0, byAssistant:{}};
    const assistants = team.filter(t=>t.role==='assistant');
    const assistantRows = assistants.map(a=>{
      const treated = assistantOrders(a.id, o=>o.status==='traitée');
      const ar = (arch.byAssistant||{})[a.id] || {count:0, sales:0};
      const count = treated.length + Number(ar.count||0);
      const sales = treated.reduce((s,o)=>s+Number(o.total||0),0) + Number(ar.sales||0);
      const com = Math.round(sales*COMMISSION_RATE);
      return {name:a.name, count, sales, com, net: sales-com};
    });
    const sales = live.reduce((s,o)=>s+Number(o.total||0),0) + offlineSales.reduce((s,o)=>s+Number(o.amount||0),0) + Number(arch.revenue||0);
    const exp = expenses.reduce((s,e)=>s+Number(e.amount||0),0);
    const com = assistantRows.reduce((s,r)=>s+r.com,0);
    const net = sales - exp - com;
    const firstTs = Math.min(...[...live.map(o=>o.ts), ...offlineSales.map(o=>o.ts), ...expenses.map(e=>e.ts)]
      .map(t=>new Date(t).getTime()).filter(t=>!isNaN(t)), Date.now());
    document.getElementById('cumulSince').textContent = 'Depuis le ' + new Date(firstTs).toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'})
      + (arch.count ? ` · inclut ${arch.count} commande${arch.count>1?'s':''} archivée${arch.count>1?'s':''} (réinitialisation)` : '');
    document.getElementById('cumulGrid').innerHTML = `
      <div class="stat-card"><div class="num">${sales.toLocaleString('fr-FR')}</div><div class="lbl">Ventes totales (GNF)</div></div>
      <div class="stat-card"><div class="num">${exp.toLocaleString('fr-FR')}</div><div class="lbl">Dépenses totales (GNF)</div></div>
      <div class="stat-card"><div class="num">${com.toLocaleString('fr-FR')}</div><div class="lbl">Commissions totales (GNF)</div></div>
      <div class="stat-card net-highlight"><div class="num">${net.toLocaleString('fr-FR')}</div><div class="lbl">Résultat net cumulé (GNF)</div></div>
      <div class="stat-card"><div class="num">${(live.length + Number(arch.count||0)).toLocaleString('fr-FR')}</div><div class="lbl">Commandes au total</div></div>
    `;

    // Mois par mois, du plus ancien au plus récent, avec le net cumulé qui s'additionne.
    const months = new Set([...live.map(o=>monthKey(o.ts)), ...offlineSales.map(o=>monthKey(o.ts)), ...expenses.map(e=>monthKey(e.ts))]);
    let running = 0;
    let rowsHtml = '';
    const archSales = Number(arch.revenue||0);
    const archCom = Object.values(arch.byAssistant||{}).reduce((s,a)=>s+Math.round(Number(a.sales||0)*COMMISSION_RATE),0);
    if(archSales || archCom){
      running = archSales - archCom;
      rowsHtml += `<tr class="cumul-row-archive"><td>Avant réinitialisation</td><td>${money(archSales)}</td><td>—</td><td>${money(archCom)}</td><td>${money(running)}</td><td><strong>${money(running)}</strong></td></tr>`;
    }
    rowsHtml += [...months].sort().map(mk=>{
      const [y,m] = mk.split('-').map(Number);
      const f = monthFinancials(new Date(y, m-1, 15).getTime());
      const mCom = assistants.reduce((s,a)=>s+commissionOf(assistantOrders(a.id, o=>o.ts && monthKey(o.ts)===mk)),0);
      const mNet = f.revenue - f.totalExp - mCom;
      running += mNet;
      return `<tr><td>${monthLabel(new Date(y, m-1, 15))}</td><td>${money(f.revenue)}</td><td>${money(f.totalExp)}</td><td>${money(mCom)}</td>
        <td>${money(mNet)}</td><td style="color:${running<0?'var(--red)':'#1B7A3D'};font-weight:700;">${money(running)}</td></tr>`;
    }).join('');
    document.getElementById('cumulMonthsBody').innerHTML = rowsHtml || '<tr><td colspan="6">Aucune vente ni dépense pour l\'instant.</td></tr>';

    document.getElementById('cumulAssistantsBody').innerHTML = assistantRows.map(r=>`
      <tr><td>${escapeHtml(r.name)}</td><td>${r.count}</td><td>${money(r.sales)}</td>
        <td style="color:#1B7A3D;font-weight:600;">${money(r.com)}</td><td style="color:var(--wine);font-weight:600;">${money(r.net)}</td></tr>`).join('')
      || '<tr><td colspan="5">Aucune assistante.</td></tr>';
  }

  function renderFinancesTab(){
    renderCumulPanel();
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
      <div class="stat-card"><div class="num">${f.monthOrders.length}</div><div class="lbl">Commandes traitées du mois</div></div>
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
    const weekOrders = orders.filter(o=> o.ts && o.ts >= weekAgo && isCounted(o));
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
        renderProductsTab(); renderStore(); renderCarousel(); renderCategoryShowcase();
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
              renderProductsTab(); renderStore(); renderCarousel(); renderCategoryShowcase();
            }catch(e){ alert("La photo n'a pas pu être chargée."); }
          };
          input.click();
          return;
        }
        await loadProducts();
        renderProductsTab(); renderStore(); renderCarousel(); renderCategoryShowcase(); if(currentUser.role==='admin') renderOverview();
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
    renderProductsTab(); renderStore(); renderCarousel(); renderCategoryShowcase(); if(currentUser.role==='admin') renderOverview();
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
      const payName = {orange_money:'Orange Money', en_ligne:'En ligne', livraison:'Livraison'}[o.paymentMethod] || '';
      const payPill = !o.paymentMethod ? ''
        : o.paymentStatus==='reçu' ? `<br><span class="pay-pill paid">${payName} · payé ✓</span>`
        : o.paymentStatus==='échoué' ? `<br><span class="pay-pill failed">${payName} · échoué</span>`
        : o.paymentMethod==='orange_money' ? '<br><span class="pay-pill om">Orange Money · à vérifier</span>'
        : o.paymentMethod==='en_ligne' ? '<br><span class="pay-pill online">En ligne · en attente</span>'
        : '<br><span class="pay-pill cash">À la livraison</span>';
      const payLine = !o.paymentMethod ? ''
        : `<div><strong>Paiement :</strong> ${o.paymentMethod==='orange_money'
            ? `Orange Money — n° ${escapeHtml(o.paymentPhone||'—')}, réf. ${o.paymentRef ? escapeHtml(o.paymentRef) : 'non fournie'}`
            : o.paymentMethod==='en_ligne' ? `En ligne Orange Money${o.paymentRef ? ' — réf. '+escapeHtml(o.paymentRef) : ''}`
            : 'À la livraison (espèces)'} — ${o.paymentStatus==='reçu' ? '<strong style="color:#1B7A3D;">reçu ✓</strong>' : escapeHtml(o.paymentStatus||'en attente')}
            ${o.paymentStatus!=='reçu' && o.status!=='annulée' && (isAdmin || o.claimedBy===currentUser.id)
              ? `<button class="btn-mini" data-act="paid" data-id="${o.id}" style="margin-left:8px;">Marquer payé</button>` : ''}</div>`;
      const deliveryLine = o.deliveryZone
        ? `${escapeHtml(o.deliveryZone)}${o.deliveryFee ? ' — '+money(o.deliveryFee)+' (non compté dans les statistiques)' : ' (prix à convenir)'}`
        : 'Aucune';
      return `<tr>
        <td>${new Date(o.ts).toLocaleString('fr-FR')}</td>
        <td>${escapeHtml(o.customer)}${o.phone ? ' · '+escapeHtml(o.phone) : ''}</td>
        <td>${o.items.map(it=>escapeHtml(it.name)+(it.color?' ('+escapeHtml(it.color)+')':'')+' ×'+it.qty).join(', ')}</td>
        <td>${totalCell}${payPill}</td>
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
            ${payLine}
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
        } else if(btn.dataset.act==='paid'){
          const { error } = await sb.from('orders').update({payment_status:'reçu'}).eq('id', o.id);
          if(!error) await logActivity(currentUser.name, 'a confirmé le paiement de la commande de '+o.customer);
          else alert('Erreur : '+error.message);
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
    renderTrackingSettings();
    renderReviewsAdmin();
    renderSharePreview();
    document.getElementById('setWhatsapp').value = settings.whatsapp || '';
    document.getElementById('setPhone').value = settings.phone || '';
    document.getElementById('setFacebook').value = settings.facebook || '';
    document.getElementById('setOrangeMoney').value = settings.orange_money || '';
    document.getElementById('setOnlinePayment').checked = !!settings.online_payment;
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
    const online = document.getElementById('setOnlinePayment').checked;
    const { error } = await sb.from('settings').update({whatsapp: wa, phone: ph, facebook: fb, orange_money: om, online_payment: online}).eq('id', true);
    if(error){ msg.textContent = 'Erreur : '+error.message; return; }
    await loadSettings();
    msg.textContent = 'Coordonnées enregistrées.';
    renderContactBar(); renderPaymentOptions();
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
    renderStore(); renderCarousel(); renderCategoryShowcase(); renderCart(); renderPromoCountdown();
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
    renderProductsTab(); renderStore(); renderCarousel(); renderCategoryShowcase();
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
      const counted = orders.filter(isCounted);
      const newArchive = {
        count: (salesArchive.count||0) + counted.length,
        revenue: (salesArchive.revenue||0) + counted.reduce((s,o)=>s+Number(o.total||0),0),
        byProduct: Object.assign({}, salesArchive.byProduct||{})
      };
      counted.forEach(o=> (Array.isArray(o.items)?o.items:[]).forEach(it=>{
        newArchive.byProduct[it.name] = (newArchive.byProduct[it.name]||0) + Number(it.qty||0);
      }));
      const byAssistant = JSON.parse(JSON.stringify(salesArchive.byAssistant||{}));
      orders.filter(o=>o.status==='traitée' && o.claimedBy).forEach(o=>{
        const a = byAssistant[o.claimedBy] = byAssistant[o.claimedBy] || {count:0, sales:0};
        a.count += 1; a.sales += Number(o.total||0);
      });
      let { error: aErr } = await sb.from('sales_archive')
        .update({count:newArchive.count, revenue:newArchive.revenue, by_product:newArchive.byProduct, by_assistant:byAssistant}).eq('id', true);
      if(aErr && /by_assistant/.test(aErr.message||'')){
        // Base pas encore migrée (2026-10-22-cumul.sql) : on archive sans le détail par assistante.
        ({ error: aErr } = await sb.from('sales_archive')
          .update({count:newArchive.count, revenue:newArchive.revenue, by_product:newArchive.byProduct}).eq('id', true));
      }
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

  loadAll();
})();
