if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // fail silently; offline support is optional in local browsing
    });
  });
}

// Single-page navigation: load page <main> content via AJAX and update history
async function loadPage(href, addToHistory = true) {
  try {
    const res = await fetch(href, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Network response was not ok');
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newMain = doc.querySelector('main');
    const newTitle = doc.querySelector('title') ? doc.querySelector('title').innerText : document.title;
    if (newMain) {
      const main = document.querySelector('main');
      main.replaceWith(newMain);
      document.title = newTitle;
      if (addToHistory) history.pushState({ url: href }, newTitle, href);
      // typeset math if MathJax is present
      if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise();
    } else {
      // fallback to full navigation
      window.location.href = href;
    }
  } catch (e) {
    console.error('Failed to load page', e);
    window.location.href = href; // fallback
  }
}

// Intercept internal link clicks
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href) return;
  // only intercept same-origin relative links
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
  // allow ctrl/cmd clicks
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  loadPage(href);
});

// Handle browser navigation
window.addEventListener('popstate', (e) => {
  const url = (e.state && e.state.url) || window.location.pathname;
  loadPage(url, false);
});

// Basic search input handling (search.js will manage search UI), but expose helper to open page
window.fedyjOpen = function(path) { loadPage(path); };
