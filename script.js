
async function init(){
  const data = await fetch('content.json').then(r=>r.json());
  document.title = data.site.title;
  document.querySelector('meta[name="description"]').setAttribute('content', data.site.description);
  document.querySelector('meta[name="keywords"]').setAttribute('content', data.site.keywords.join(', '));
  const waUrl = `https://wa.me/${data.site.whatsapp}?text=${encodeURIComponent('السلام علیکم! مجھے مدرسہ عربیہ دارالعلوم / جامع مسجد توحیدیہ کے بارے میں معلومات درکار ہیں۔')}`;
  document.getElementById('waTop').href = waUrl;
  document.getElementById('waFloat').href = waUrl;
  document.getElementById('jamiat').textContent = data.site.jamiat;
  document.getElementById('madrasaName').textContent = data.site.header_title;
  document.getElementById('mosqueName').textContent = data.site.header_subtitle;
  document.getElementById('manager').textContent = data.site.manager;
  document.getElementById('imam').textContent = data.site.imam;
  document.getElementById('address').textContent = data.site.address;
  document.getElementById('aboutBody').innerHTML = data.about.map(p=>`<p>${p}</p>`).join('');
  document.getElementById('renoTitle').textContent = data.renovation.title;
  document.getElementById('renoBody').innerHTML = data.renovation.body.map(p=>`<p>${p}</p>`).join('');
  document.getElementById('renoQuote').textContent = data.renovation.quote;
  document.getElementById('gallery').innerHTML = data.gallery.map(item=>`
    <article class="gallery-card">
      <div class="thumb"><img src="${item.image}" alt="${item.title}"></div>
      <div class="content"><h4>${item.title}</h4><p>${item.caption}</p></div>
    </article>`).join('');
  document.getElementById('videos').innerHTML = data.videos.map(v=>`
    <article class="video-card">
      <video controls muted playsinline preload="metadata" poster="${v.poster}">
        <source src="${v.file}" type="video/mp4">
      </video>
      <div class="content"><h4>${v.title}</h4><p>ویڈیو کو صاف انداز میں شامل کیا گیا ہے۔</p></div>
    </article>`).join('');
  document.getElementById('mapLink').href = data.site.map;
  document.getElementById('mapFrame').src = data.site.map_embed;
  document.getElementById('siteDesc').textContent = data.site.description;
  document.getElementById('footerName').textContent = data.site.title;
  document.getElementById('footerAddress').textContent = data.site.address;
}
init();
