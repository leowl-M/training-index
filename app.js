"use strict";

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;
const FAV_KEY = "woozy_favorites";
const SKEL_DELAY = 200; // ms di skeleton prima del render reale



// ─── ICONE SVG ───────────────────────────────────────────────────────────────
const ICONS = {
  Github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  Star: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.879l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.123 2.123 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.123 2.123 0 0 0 1.597-1.16z"/></svg>`,
  ArrowUpRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
};

// ─── PREFERITI (localStorage) ────────────────────────────────────────────────
let favorites = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));

function saveFavorites() {
  localStorage.setItem(FAV_KEY, JSON.stringify([...favorites]));
}

// ─── STATO ───────────────────────────────────────────────────────────────────
let state = {
  search: "",
  activeTag: "all",
  sortOrder: "added_desc",
  viewMode: "list",
  page: 1,
};

// ─── DOM ─────────────────────────────────────────────────────────────────────
const els = {
  search: document.getElementById("searchInput"),
  sort: document.getElementById("sortSelect"),
  btnGrid: document.getElementById("btnGrid"),
  btnList: document.getElementById("btnList"),
  tags: document.getElementById("tagsContainer"),
  grid: document.getElementById("gridContainer"),
  count: document.getElementById("projectCount"),
  loadMore: document.getElementById("loadMoreWrap"),
};

// ─── URL PARAMS ──────────────────────────────────────────────────────────────
function syncURL() {
  const p = new URLSearchParams();
  if (state.search) p.set("q", state.search);
  if (state.activeTag !== "all") p.set("tag", state.activeTag);
  if (state.sortOrder !== "added_desc") p.set("sort", state.sortOrder);
  // Default: list. Mettiamo il parametro solo se diverso dal default.
  if (state.viewMode !== "list") p.set("view", state.viewMode);
  const qs = p.toString();
  history.replaceState(null, "", qs ? "?" + qs : location.pathname);
}

function readURL() {
  const p = new URLSearchParams(location.search);
  if (p.has("q")) {
    state.search = p.get("q");
    els.search.value = state.search;
  }
  if (p.has("tag")) {
    state.activeTag = p.get("tag");
  }
  if (p.has("sort")) {
    state.sortOrder = p.get("sort");
    els.sort.value = state.sortOrder;
  }
  if (p.has("view")) {
    state.viewMode = p.get("view");
  }
}

// ─── FILTRI & SORT ───────────────────────────────────────────────────────────
function getFiltered() {
  let result = [...PROJECTS];

  if (state.activeTag === "favorites") {
    result = result.filter((p) => favorites.has(p.id));
  } else if (state.activeTag !== "all") {
    result = result.filter((p) => p.tags?.includes(state.activeTag));
  }

  if (state.search.trim()) {
    const q = state.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.status && p.status.toLowerCase().includes(q)),
    );
  }

  result.sort((a, b) => {
    if (state.sortOrder === "alpha") return a.title.localeCompare(b.title);
    if (state.sortOrder === "alpha_desc") return b.title.localeCompare(a.title);
    return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
  });

  return result;
}

// ─── SKELETON ────────────────────────────────────────────────────────────────
function showSkeletons(count = Math.min(PAGE_SIZE, 6)) {
  els.grid.innerHTML = Array.from(
    { length: count },
    () => `
    <div class="card skeleton-card" aria-hidden="true" role="presentation">
      <div class="skel skel-title"></div>
      <div class="skel skel-desc"></div>
      <div class="skel skel-desc short"></div>
      <div class="skel skel-footer"></div>
    </div>
  `,
  ).join("");
  els.loadMore.innerHTML = "";
}

// ─── RENDER TAGS ─────────────────────────────────────────────────────────────
function renderTags() {
  const tagsSet = new Set();
  PROJECTS.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
  const allTags = ["all", ...Array.from(tagsSet).sort()];
  if (favorites.size > 0) allTags.push("favorites");

  els.tags.innerHTML = allTags
    .map((tag) => {
      const isActive = state.activeTag === tag;
      const isFavTag = tag === "favorites";
      const label = tag === "all" ? "*" : isFavTag ? "♥ Preferiti" : tag;
      return `
      <button
        class="tag-btn ${isActive ? "active" : ""} ${isFavTag ? "fav-tag" : ""}"
        data-tag="${tag}"
        aria-pressed="${isActive}"
      >${label}</button>
    `;
    })
    .join("");
}

// ─── RENDER SINGOLA CARD ─────────────────────────────────────────────────────
function renderCard(p, index) {
  const tagsHtml = (p.tags || [])
    .map((t) => `<span class="card-tag">#${t}</span>`)
    .join("");
  const isFav = favorites.has(p.id);

  const repoHtml = p.repoHref
    ? `
    <a href="${p.repoHref}" target="_blank" rel="noopener noreferrer" class="github-link" aria-label="Sorgente di ${p.title} su GitHub" title="Sorgente su GitHub">
      ${ICONS.Github}
    </a>
  `
    : "";

  const statusBadge =
    p.status && p.status !== "stable"
      ? `
    <span class="status-badge status-${p.status}">${p.status}</span>
  `
      : "";

  const versionBadge = p.version
    ? `<span class="version-badge">v${p.version}</span>`
    : "";

  return `
    <article class="card animate-slide-up" style="animation-delay: ${index * 50}ms" role="listitem" data-href="${p.href}">
      <div class="card-content">
        <div class="card-header">
          <div class="card-header-actions">
            <button class="btn-favorite ${isFav ? "active" : ""}" data-fav="${p.id}" aria-pressed="${isFav}" aria-label="${isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}" title="Preferiti">${ICONS.Star}</button>
            ${repoHtml}
          </div>
        </div>
        <div class="text-content">
          <div class="card-title-row">
            <h3>${p.title}</h3>
            ${statusBadge}
          </div>
          <p>${p.desc}</p>
          <div class="card-meta">${versionBadge}</div>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-tags">${tagsHtml}</div>
        <a href="${p.href}" target="_blank" rel="noopener noreferrer" class="open-link" aria-label="Apri ${p.title} in una nuova scheda">
          Apri ${ICONS.ArrowUpRight}
        </a>
      </div>
    </article>
  `;
}

// ─── RENDER CARDS (con skeleton opzionale) ────────────────────────────────────
let skeletonTimer = null;

function renderCards(animate = false) {
  _doRenderCards(); // Mostra immediatamente le card reali ignorando gli skeleton
}

function _doRenderCards() {
  const all = getFiltered();
  const total = all.length;
  const paged = all.slice(0, state.page * PAGE_SIZE);

  els.count.textContent = `${total} Index(es)`;
  syncURL();

  // Empty state
  if (total === 0) {
    els.grid.innerHTML = `
      <div class="empty-state" role="status">
        <p>Nessun progetto corrisponde ai filtri selezionati.</p>
        <button id="resetBtn">Resetta ricerca</button>
      </div>
    `;
    els.loadMore.innerHTML = "";
    document
      .getElementById("resetBtn")
      ?.addEventListener("click", resetFilters);
    return;
  }

  // Cards
  els.grid.innerHTML = paged.map((p, i) => renderCard(p, i)).join("");

  // Load more button
  if (paged.length < total) {
    const remaining = total - paged.length;
    els.loadMore.innerHTML = `
      <button class="btn-load-more" id="loadMoreBtn" aria-label="Carica altri ${remaining} progetti">
        Carica altri (${remaining})
      </button>
    `;
    document.getElementById("loadMoreBtn")?.addEventListener("click", () => {
      state.page++;
      renderCards(); // no skeleton for load-more
    });
  } else {
    els.loadMore.innerHTML = "";
  }

  attachCardEvents();
  attachSpotlight();
}

// ─── RESET ────────────────────────────────────────────────────────────────────
function resetFilters() {
  state.search = "";
  state.activeTag = "all";
  state.page = 1;
  els.search.value = "";
  els.sort.value = state.sortOrder;
  render(true);
}

// ─── EVENTI CARD ─────────────────────────────────────────────────────────────
function attachCardEvents() {
  // Intera card cliccabile (escludendo link e bottoni nativi)
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      const href = card.dataset.href;
      if (href) window.open(href, "_blank", "noopener,noreferrer");
    });
  });

  // Bottoni preferiti
  document.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.fav;
      const adding = !favorites.has(id);
      if (adding) {
        favorites.add(id);
      } else {
        favorites.delete(id);
      }
      saveFavorites();

      btn.classList.toggle("active", adding);
      btn.setAttribute("aria-pressed", String(adding));
      btn.setAttribute(
        "aria-label",
        adding ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti",
      );

      // Aggiorna tag se siamo in vista preferiti
      renderTags();
      if (state.activeTag === "favorites" && !adding) renderCards(true);
    });
  });
}

// ─── SPOTLIGHT ───────────────────────────────────────────────────────────────
function attachSpotlight() {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
    });
  });
}

// ─── RENDER COMPLETO ─────────────────────────────────────────────────────────
function render(animate = false) {
  renderTags();
  renderCards(animate);

  const isGrid = state.viewMode === "grid";
  els.btnGrid.classList.toggle("active", isGrid);
  els.btnList.classList.toggle("active", !isGrid);
  els.btnGrid.setAttribute("aria-pressed", String(isGrid));
  els.btnList.setAttribute("aria-pressed", String(!isGrid));
  els.grid.classList.toggle("list-view", !isGrid);
}

// ─── EVENT LISTENERS ─────────────────────────────────────────────────────────
els.search.addEventListener("input", (e) => {
  state.search = e.target.value;
  state.page = 1;
  renderCards(true);
});

els.sort.addEventListener("change", (e) => {
  state.sortOrder = e.target.value;
  state.page = 1;
  renderCards(true);
});

els.tags.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tag]");
  if (!btn) return;
  state.activeTag = btn.dataset.tag;
  state.page = 1;
  render(true);
});

els.btnGrid.addEventListener("click", () => {
  if (state.viewMode !== "grid") {
    state.viewMode = "grid";
    render();
  }
});

els.btnList.addEventListener("click", () => {
  if (state.viewMode !== "list") {
    state.viewMode = "list";
    render();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== els.search) {
    e.preventDefault();
    els.search.focus();
  }
  if (e.key === "Escape" && document.activeElement === els.search) {
    els.search.blur();
  }
});

// ─── INIT ────────────────────────────────────────────────────────────────────
readURL();
render(true);

// Registra Service Worker per PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // Service worker non disponibile in locale — ignorato
    });
  });
}
