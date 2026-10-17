// Simple client-side search using the bundled search-index.json
let searchIndex = [];

async function loadSearchIndex() {
  try {
    const res = await fetch('/search-index.json');
    searchIndex = await res.json();
  } catch (e) {
    console.error('Failed to load search index', e);
    searchIndex = [];
  }
}

function renderSearchResults(results) {
  const container = document.getElementById('search-results');
  if (!container) return;
  container.innerHTML = '';
  if (!results.length) {
    container.innerHTML = '<p>No results</p>';
    return;
  }
  const ul = document.createElement('ul');
  results.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.title + ' — ' + item.excerpt;
    a.addEventListener('click', (e) => { e.preventDefault(); window.fedyjOpen(item.url); });
    li.appendChild(a);
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

function doSearch(q) {
  if (!q) return renderSearchResults([]);
  const term = q.trim().toLowerCase();
  const results = searchIndex.filter(item => {
    return item.title.toLowerCase().includes(term) || item.excerpt.toLowerCase().includes(term) || (item.tags && item.tags.join(' ').includes(term));
  }).slice(0, 20);
  renderSearchResults(results);
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadSearchIndex();
  const input = document.getElementById('search-input');
  if (input) {
    input.addEventListener('input', (e) => doSearch(e.target.value));
  }
});
