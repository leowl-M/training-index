;(() => {
    // ——— Tema
    const LS_THEME_KEY = 'training.theme';
    const themeBtn = document.getElementById('themeToggle');
    const setTheme = (t) => {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(LS_THEME_KEY, t);
    };
    const currentTheme =
      localStorage.getItem(LS_THEME_KEY) ||
      (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(currentTheme);
    themeBtn?.addEventListener('click', () =>
      setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
    );
  
    // ——— Tool (link “Apri” puntano direttamente a GitHub Pages)
    const tools = [
      {
        id: 'collage',
        title: 'Training – Collage',
        desc: 'Strumento p5.js per creare collage dinamici.',
        tags: ['p5.js','immagini'],
        href: 'https://leowl-M.github.io/training-collage/',
        repoHref: 'https://github.com/leowl-M/training-collage',
        addedAt: '2025-06-20T10:00:00Z'
      },
      {
        id: 'blobtracking',
        title: 'Training – Blob Tracking',
        desc: 'Rilevamento e tracciamento di blob per esperimenti interattivi.',
        tags: ['p5.js','computer-vision'],
        href: 'https://leowl-M.github.io/training-blobtracking/',
        repoHref: 'https://github.com/leowl-M/training-blobtracking',
        addedAt: '2025-05-11T09:00:00Z'
      },
      {
        id: 'dithering',
        title: 'Training – Dithering',
        desc: 'Dither e posterizzazione per effetti grafici.',
        tags: ['p5.js','grafica'],
        href: 'https://leowl-M.github.io/training-dithering/',
        repoHref: 'https://github.com/leowl-M/training-dithering',
        addedAt: '2025-04-02T08:00:00Z'
      }
    ];
  
    // ——— Rendering
    const grid = document.getElementById('grid');
    const chipsWrap = document.getElementById('chips');
    const q = document.getElementById('q');
    const order = document.getElementById('order');
  
    let activeTag = 'all';
    const uniqTags = (list) => ['all', ...Array.from(new Set(list.flatMap(t => t.tags || [])))];
  
    function card(t){
      const repoBtn = t.repoHref
        ? `<a class="btn" href="${t.repoHref}" target="_blank" rel="noopener" aria-label="Apri repo GitHub">🐙 Repo</a>`
        : '';
      return `
        <article class="card">
          <h3>${t.title}</h3>
          <p>${t.desc || ''}</p>
          <div class="badgebar">${(t.tags || []).map(x => `<span class="badge">#${x}</span>`).join('')}</div>
          <div class="actions">
            <a class="btn primary" href="${t.href}" target="_blank" rel="noopener" aria-label="Apri ${t.title}">▶️ Apri</a>
            ${repoBtn}
          </div>
        </article>`;
    }
  
    function sortList(list){
      const mode = order.value;
      const arr = [...list];
      if(mode === 'alpha') arr.sort((a,b)=>a.title.localeCompare(b.title));
      else if(mode === 'alpha_desc') arr.sort((a,b)=>b.title.localeCompare(a.title));
      else arr.sort((a,b)=>new Date(b.addedAt||0)-new Date(a.addedAt||0));
      return arr;
    }
  
    function filterList(){
      const text = (q.value || '').trim().toLowerCase();
      let list = tools;
      if(activeTag !== 'all')
        list = list.filter(t => (t.tags || []).map(s => s.toLowerCase()).includes(activeTag.toLowerCase()));
      if(text)
        list = list.filter(t =>
          (t.title + " " + (t.desc || '') + " " + (t.tags || []).join(' '))
            .toLowerCase()
            .includes(text)
        );
      return sortList(list);
    }
  
    function render(){
      const tags = uniqTags(tools);
      chipsWrap.innerHTML = tags.map(tag =>
        `<button class="chip ${tag===activeTag?'active':''}" data-tag="${tag}">${tag}</button>`
      ).join('');
      grid.innerHTML = filterList().map(card).join('');
    }
  
    // ——— Eventi UI
    chipsWrap.addEventListener('click', (e)=>{
      const b = e.target.closest('.chip');
      if(!b) return;
      activeTag = b.dataset.tag;
      render();
    });
    q.addEventListener('input', debounce(()=>render(), 120));
    order.addEventListener('change', render);
    window.addEventListener('keydown', (e)=>{
      if(e.key === '/' && document.activeElement !== q){
        e.preventDefault(); q.focus();
      }
    });
  
    function debounce(fn,ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); } }
  
    // first paint
    render();
  })();
  