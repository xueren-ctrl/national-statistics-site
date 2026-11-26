// America by the Numbers — router and interactions. Hash routing, no build.

import { homeView, topicView, statesView, stateView, compareView, searchView, sourcesView, notFoundView } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav-links');

let stateSort = 'pop';
let stateQuery = '';

function setActiveNav(route) {
  if (!nav) return;
  nav.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === route || (route.startsWith('#/topic') && href === '#/topics'));
  });
}

function render() {
  const hash = window.location.hash || '#/';
  const [path, queryString] = hash.slice(2).split('?');
  const parts = path.split('/').filter(Boolean);
  let html;
  let route = '#/';
  if (parts.length === 0) {
    html = homeView();
  } else if (parts[0] === 'topic' && parts[1]) {
    html = topicView(parts[1]);
    route = '#/topics';
  } else if (parts[0] === 'states') {
    html = statesView(stateSort, stateQuery);
    route = '#/states';
  } else if (parts[0] === 'state' && parts[1]) {
    html = stateView(parts[1]);
    route = '#/states';
  } else if (parts[0] === 'compare') {
    const params = new URLSearchParams(queryString || '');
    html = compareView(params.get('a') || 'CA', params.get('b') || 'TX');
    route = '#/states';
  } else if (parts[0] === 'search') {
    const params = new URLSearchParams(queryString || '');
    html = searchView(params.get('q') || '');
    route = '#/';
  } else if (parts[0] === 'sources') {
    html = sourcesView();
    route = '#/';
  } else {
    html = notFoundView();
  }
  app.innerHTML = html;
  setActiveNav(route);
  wirePage();
  window.scrollTo(0, 0);
}

function wirePage() {
  // State table: live search + sort buttons.
  const search = document.getElementById('state-search');
  if (search) {
    search.addEventListener('input', () => {
      stateQuery = search.value;
      const fresh = statesView(stateSort, stateQuery);
      app.innerHTML = fresh;
      const again = document.getElementById('state-search');
      if (again) {
        again.focus();
        again.setSelectionRange(again.value.length, again.value.length);
      }
      wirePage();
    });
    document.querySelectorAll('.sort-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        stateSort = btn.dataset.sort;
        app.innerHTML = statesView(stateSort, stateQuery);
        wirePage();
      });
    });
  }
  // Compare page: changing either select re-renders with new pair.
  const cmpA = document.getElementById('cmp-a');
  const cmpB = document.getElementById('cmp-b');
  if (cmpA && cmpB) {
    const go = () => {
      window.location.hash = `#/compare?a=${cmpA.value}&b=${cmpB.value}`;
    };
    cmpA.addEventListener('change', go);
    cmpB.addEventListener('change', go);
  }
}

// Header search: Enter jumps to the search page.
const headerSearch = document.getElementById('header-search');
if (headerSearch) {
  headerSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && headerSearch.value.trim()) {
      window.location.hash = '#/search?q=' + encodeURIComponent(headerSearch.value.trim());
    }
  });
}

// Mobile nav toggle.
const navToggle = document.getElementById('nav-toggle');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Dark mode, persisted in localStorage.
const themeBtn = document.getElementById('theme-toggle');
function applyTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  if (themeBtn) themeBtn.textContent = dark ? '☀️ Light' : '🌙 Dark';
  try { localStorage.setItem('abn-theme', dark ? 'dark' : 'light'); } catch (e) { /* private mode */ }
}
let savedTheme = 'light';
try { savedTheme = localStorage.getItem('abn-theme') || 'light'; } catch (e) { /* private mode */ }
applyTheme(savedTheme === 'dark');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme !== 'dark');
  });
}

// Screenshot mode for deterministic captures: ?shot=home|topic|states|phone
// renders one view without waiting for fonts or interaction.
const shot = new URLSearchParams(window.location.search).get('shot');
if (shot) {
  const map = { home: '#/', topic: '#/topic/economy', states: '#/states', phone: '#/' };
  if (map[shot] && window.location.hash !== map[shot]) window.location.hash = map[shot];
}

window.addEventListener('hashchange', render);
render();
