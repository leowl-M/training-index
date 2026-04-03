    const PROJECTS = [
      {
        id: 'flowerpixel',
        title: 'Flower Pixel',
        desc: 'Pattern da immagine con jitter, contrasto e palette. Ottimo per effetti glitch e dithering artistico.',
        tags: ['p5.js'],
        href: 'https://leowl-m.github.io/training-flowerpixel/',
        repoHref: 'https://github.com/leowl-M/training-flowerpixel',
        addedAt: '2025-07-02T08:00:00Z',
        iconName: 'Code2'
      },
      {
        id: 'collage',
        title: 'Collage Dinamico',
        desc: 'Strumento p5.js per creare collage dinamici sovrapponendo forme e immagini con blend modes.',
        tags: ['p5.js'],
        href: 'https://leowl-M.github.io/training-collage/',
        addedAt: '2025-06-20T10:00:00Z',
        iconName: 'Code2'
      },
      {
        id: 'blobtracking',
        title: 'Blob Tracking',
        desc: 'Rilevamento e tracciamento di blob in tempo reale usando la webcam e algoritmi di computer vision.',
        tags: ['p5.js'],
        href: 'https://leowl-M.github.io/training-blobtracking/',
        addedAt: '2025-05-11T09:00:00Z',
        iconName: 'Code2'
      },
      {
        id: 'dithering',
        title: 'Dithering & Posterize',
        desc: 'Esplorazione di algoritmi di dithering (Floyd-Steinberg, ecc.) e posterizzazione su immagini.',
        tags: ['p5.js'],
        href: 'https://leowl-M.github.io/training-dithering/',
        addedAt: '2025-04-02T08:00:00Z',
        iconName: 'Code2'
      },
      {
        id: 'gravity',
        title: 'Gravity',
        desc: 'Strumento per creare simulazioni fisiche interattive con immagini personalizzate.',
        tags: ['p5.js'],
        href: 'https://leowl-m.github.io/training-gravity/',
        addedAt: '2026-04-04T21:30:00Z',
        iconName: 'Code2'
      }, 
      {
        id: 'articleimage',
        title: 'Article Image',
        desc: 'Generatore di immagini per articoli di blog.',
        tags: ['p5.js'],
        href: 'https://leowl-m.github.io/article-image/',
        addedAt: '2025-04-02T08:00:00Z',
        iconName: 'Code2'
      }, 
      {
        id: 'officinaditheris',
        title: 'Officina Ditheris',
        desc: 'Strumento avanzato per creativi che trasforma le immagini digitali usando il dithering..',
        tags: ['Figma'],
        href: 'https://www.figma.com/community/plugin/1556657188945716249/officina-ditheris',
        addedAt: '2026-04-04T21:30:00Z',
        iconName: 'Palette'
      }, 
      {
        id: 'modulink',
        title: 'Modulink',
        desc: 'Strumento per Figma che automatizza l\'organizzazione dei link.',
        tags: ['Figma'],
        href: 'https://www.figma.com/community/plugin/1556657188945716249/officina-ditheris',
        addedAt: '2026-04-04T21:30:00Z',
        iconName: 'Palette'
      }
    ];

    // --- DIZIONARIO ICONE SVG ---
    const ICONS = {
      Palette: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
      Layers: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>`,
      Cpu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
      Code2: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
      Github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
      ArrowUpRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`
    };

    // --- STATO DELL'APP ---
    let state = {
      search: '',
      activeTag: 'all',
      sortOrder: 'added_desc',
      viewMode: 'grid'
    };

    // --- ELEMENTI DOM ---
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const btnGrid = document.getElementById('btnGrid');
    const btnList = document.getElementById('btnList');
    const tagsContainer = document.getElementById('tagsContainer');
    const gridContainer = document.getElementById('gridContainer');
    const projectCount = document.getElementById('projectCount');

    // --- LOGICA DI FILTERING & SORTING ---
    function getFilteredAndSortedProjects() {
      let result = [...PROJECTS];

      if (state.activeTag !== 'all') {
        result = result.filter(p => p.tags && p.tags.includes(state.activeTag));
      }

      if (state.search.trim() !== '') {
        const q = state.search.toLowerCase();
        result = result.filter(p => 
          p.title.toLowerCase().includes(q) || 
          (p.desc && p.desc.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
        );
      }

      result.sort((a, b) => {
        if (state.sortOrder === 'alpha') return a.title.localeCompare(b.title);
        if (state.sortOrder === 'alpha_desc') return b.title.localeCompare(a.title);
        return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
      });

      return result;
    }

    // --- RENDER ---
    function renderTags() {
      // Estrai tag univoci e ordinali
      const tagsSet = new Set();
      PROJECTS.forEach(p => p.tags && p.tags.forEach(t => tagsSet.add(t)));
      const allTags = ['all', ...Array.from(tagsSet).sort()];

      tagsContainer.innerHTML = allTags.map(tag => {
        const isActive = state.activeTag === tag;
        const label = tag === 'all' ? '*' : tag;
        return `<button class="tag-btn ${isActive ? 'active' : ''}" data-tag="${tag}">${label}</button>`;
      }).join('');
    }

    function renderCards() {
      const projects = getFilteredAndSortedProjects();
      projectCount.textContent = `${projects.length} Index(es)`;

      if (projects.length === 0) {
        gridContainer.innerHTML = `
          <div class="empty-state">
            <p>Nessun progetto corrisponde ai filtri selezionati.</p>
            <button id="resetBtn">Resetta ricerca</button>
          </div>
        `;
        document.getElementById('resetBtn').addEventListener('click', () => {
          state.search = '';
          state.activeTag = 'all';
          searchInput.value = '';
          render();
        });
        return;
      }

      gridContainer.innerHTML = projects.map((p, index) => {
        const tagsHtml = (p.tags || []).map(t => `<span class="card-tag">#${t}</span>`).join('');
        const repoHtml = p.repoHref ? `
          <a href="${p.repoHref}" target="_blank" rel="noopener noreferrer" class="github-link" title="Sorgente su GitHub">
            ${ICONS.Github}
          </a>
        ` : '';

        return `
          <article class="card animate-slide-up" style="animation-delay: ${index * 50}ms">
            <div class="card-content">
              <div class="card-header">
                <div class="card-icon">${ICONS[p.iconName] || ICONS.Code2}</div>
                ${repoHtml}
              </div>
              <div class="text-content">
                <h3>${p.title}</h3>
                <p class="${state.viewMode === 'grid' ? 'line-clamp' : ''}">${p.desc}</p>
              </div>
            </div>
            <div class="card-footer">
              <div class="card-tags">${tagsHtml}</div>
              <a href="${p.href}" target="_blank" rel="noopener noreferrer" class="open-link">
                Apri ${ICONS.ArrowUpRight}
              </a>
            </div>
          </article>
        `;
      }).join('');

      attachSpotlightEffect();
    }

    function render() {
      renderTags();
      renderCards();
      
      // Update View Toggles UI
      if(state.viewMode === 'grid') {
        btnGrid.classList.add('active');
        btnList.classList.remove('active');
        gridContainer.classList.remove('list-view');
      } else {
        btnList.classList.add('active');
        btnGrid.classList.remove('active');
        gridContainer.classList.add('list-view');
      }
    }

    // --- EFFETTO SPOTLIGHT (MOUSE TRACKING) ---
    function attachSpotlightEffect() {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
      });
    }

    // --- EVENT LISTENERS ---
    searchInput.addEventListener('input', (e) => {
      state.search = e.target.value;
      renderCards();
    });

    sortSelect.addEventListener('change', (e) => {
      state.sortOrder = e.target.value;
      renderCards();
    });

    tagsContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        state.activeTag = e.target.dataset.tag;
        render(); // render tutto per aggiornare le classi active sui bottoni
      }
    });

    btnGrid.addEventListener('click', () => {
      if (state.viewMode !== 'grid') {
        state.viewMode = 'grid';
        render();
      }
    });

    btnList.addEventListener('click', () => {
      if (state.viewMode !== 'list') {
        state.viewMode = 'list';
        render();
      }
    });

    // Scorciatoia da tastiera per la ricerca
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });

    // --- INIT ---
    render();