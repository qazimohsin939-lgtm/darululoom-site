
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const content = window.SITE_CONTENT;

  const byId = (id) => document.getElementById(id);

  function setMeta(){
    document.title = content.meta.siteTitle;
    $('meta[name="description"]').setAttribute('content', content.meta.description);
    $('meta[name="keywords"]').setAttribute('content', content.meta.keywords.join(', '));
    $('#canonical').setAttribute('href', content.meta.canonicalUrl || location.href);
    $('#ogTitle').setAttribute('content', content.meta.siteTitle);
    $('#ogDesc').setAttribute('content', content.meta.description);
    $('#twTitle').setAttribute('content', content.meta.siteTitle);
    $('#twDesc').setAttribute('content', content.meta.description);
    $('#structuredData').textContent = JSON.stringify({
      "@context":"https://schema.org",
      "@type":"Organization",
      "name": content.org.madrasaName + " - " + content.org.mosqueName,
      "description": content.meta.description,
      "address": {
        "@type":"PostalAddress",
        "streetAddress": content.org.address,
        "addressLocality":"Kallur Kot",
        "addressRegion":"Punjab",
        "addressCountry":"PK"
      },
      "telephone": content.contact.phone,
      "url": content.meta.canonicalUrl,
      "logo": "assets/logo.jpg",
      "sameAs": [content.meta.mapSearchUrl]
    }, null, 2);
  }

  function setText(){
    byId('jamiat').textContent = content.org.jamiat;
    byId('brandTitle').textContent = content.org.madrasaName;
    byId('brandSub').textContent = content.org.mosqueName + " | " + content.org.address;
    byId('heroBadge').textContent = content.intro.badge;
    byId('heroTitle').textContent = content.intro.title;
    byId('heroSub').textContent = content.intro.subtitle;
    byId('aboutHeading').textContent = content.about.heading;
    byId('founderLine').textContent = content.org.founder;
    byId('managerLine').textContent = content.org.manager;
    byId('imamLine').textContent = content.org.imam;
    byId('contactPhone').textContent = content.contact.phone;
    byId('contactAddress').textContent = content.org.address;
    byId('contactMap').href = content.meta.mapSearchUrl;
    byId('mapFrame').src = content.meta.mapEmbedUrl;
    byId('footerName').textContent = content.org.madrasaName + " | " + content.org.mosqueName;
    byId('footerAddress').textContent = content.org.address;
    const waMsg = encodeURIComponent(content.contact.whatsappText || content.meta.description);
    const waHref = `https://wa.me/${content.meta.whatsappNumber}?text=${waMsg}`;
    byId('waBtn').href = waHref;
    byId('waFloat').href = waHref;
    byId('adminLink').href = 'admin.html';
  }

  function renderHighlights(){
    byId('heroHighlights').innerHTML = content.intro.highlights.map(t => `<li>${t}</li>`).join('');
  }

  function renderAbout(){
    byId('aboutBody').innerHTML = content.about.paragraphs.map(p => `<p>${p}</p>`).join('');
  }

  function renderPeople(){
    byId('people').innerHTML = content.people.map(p => `
      <div class="person">
        <small>${p.title}</small>
        <h4 style="margin:6px 0 5px">${p.name}</h4>
        <div style="color:#4f5e55">${p.detail}</div>
      </div>
    `).join('');
  }

  function renderBooks(items){
    byId('booksGrid').innerHTML = items.map(b => `
      <article class="book-card">
        <div class="thumb"><img src="${b.image}" alt="${b.title}"></div>
        <div class="content">
          <span class="badge">${b.category}</span>
          <h4>${b.title}</h4>
          <p><strong>مصنف:</strong> ${b.author}</p>
          <p style="color:#56665b">${b.summary}</p>
          <a class="btn btn-primary" href="${b.file}" target="_blank" rel="noopener">مزید / ڈاؤن لوڈ</a>
        </div>
      </article>
    `).join('');
  }

  function renderMedia(type){
    const map = { bayanat:'بیانات', tilawat:'تلاوت', hamdnaat:'حمد و نعت' };
    const items = content.media[type];
    byId('mediaTitle').textContent = map[type];
    byId('mediaGrid').innerHTML = items.map(m => `
      <article class="media-card">
        <div class="content">
          <span class="badge">${m.type === 'video' ? 'Video' : 'Audio'}</span>
          <h4>${m.title}</h4>
          <p><strong>پیشکش:</strong> ${m.speaker}</p>
          <a class="btn btn-secondary" href="${m.url}" target="_blank" rel="noopener">سنیں / دیکھیں</a>
        </div>
      </article>
    `).join('');
  }

  function renderGallery(){
    byId('galleryGrid').innerHTML = content.gallery.map(g => `
      <article class="gallery-card">
        <div class="thumb"><img src="${g.image}" alt="${g.title}"></div>
        <div class="content">
          <h4>${g.title}</h4>
          <p style="color:#56665b">${g.caption}</p>
        </div>
      </article>
    `).join('');
  }

  function renderTimeline(){
    const items = [
      {year:"1903", text:"حضرت مولانا قاضی عبدالرحمن رحمۃ اللہ علیہ کی ولادت"},
      {year:"ابتدائی", text:"مندہ خیل اور واں بھچراں میں ابتدائی و متوسط تعلیم"},
      {year:"دورۂ حدیث", text:"مظاہر العلوم سہارنپور میں حضرت مولانا زکریا کاندھلوی رحمۃ اللہ علیہ سے تکمیل"},
      {year:"بعد از فراغت", text:"سراج العلوم سرگودھا اور پھر انجمن حمایت اسلام لاہور میں خدمات"},
      {year:"1383ھ / 1983", text:"کلورکوٹ میں مدرسہ عربیہ دارالعلوم کا قیام"},
      {year:"موجودہ", text:"مہتمم قاضی مسعود الحسن اور امام مسجد مولانا حافظ معراج الدین کی خدمات"}
    ];
    byId('timeline').innerHTML = items.map(i => `
      <div class="item">
        <div class="year">${i.year}</div>
        <div class="card" style="padding:15px">${i.text}</div>
      </div>
    `).join('');
  }

  function setupBookSearch(){
    const search = byId('bookSearch');
    const category = byId('bookCategory');
    const categories = ['تمام', ...new Set(content.books.map(b => b.category))];
    category.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
    const apply = () => {
      let items = content.books.slice();
      const q = search.value.trim().toLowerCase();
      const cat = category.value;
      if (cat !== 'تمام') items = items.filter(b => b.category === cat);
      if (q) items = items.filter(b =>
        [b.title,b.author,b.category,b.summary].join(' ').toLowerCase().includes(q)
      );
      renderBooks(items);
    };
    search.addEventListener('input', apply);
    category.addEventListener('change', apply);
    apply();
  }

  function setupMediaTabs(){
    $$('.media-tabs button').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.media-tabs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMedia(btn.dataset.tab);
      });
    });
    $('.media-tabs button').classList.add('active');
    renderMedia('bayanat');
  }

  setMeta();
  setText();
  renderHighlights();
  renderAbout();
  renderPeople();
  renderGallery();
  renderTimeline();
  setupBookSearch();
  setupMediaTabs();
})();
