/* ============================================
   FLAMES — The Classic Name Game
   Modular vanilla JS: algorithm + UI controller
   ============================================ */

(function () {
  'use strict';

  /* ---------- FLAMES Data ---------- */
  const CATEGORIES = {
    F: { name: 'Friends',    emoji: '🤝', desc: 'According to the traditional FLAMES game, your result is Friends.', tone: 'friends' },
    L: { name: 'Love',       emoji: '💕', desc: 'According to the traditional FLAMES game, your result is Love.',    tone: 'love' },
    A: { name: 'Affection',  emoji: '💛', desc: 'According to the traditional FLAMES game, your result is Affection.', tone: 'affection' },
    M: { name: 'Marriage',   emoji: '💍', desc: 'According to the traditional FLAMES game, your result is Marriage.', tone: 'marriage' },
    E: { name: 'Enemies',    emoji: '⚡', desc: 'According to the traditional FLAMES game, your result is Enemies.', tone: 'enemies' },
    S: { name: 'Siblings',   emoji: '👨‍👩‍👧', desc: 'According to the traditional FLAMES game, your result is Siblings.', tone: 'siblings' }
  };
  const FLAMES_ORDER = ['F', 'L', 'A', 'M', 'E', 'S'];

  /* ---------- Algorithm (pure functions) ---------- */

  // Normalize: trim, collapse spaces, strip non-letters, lowercase
  function normalizeName(raw) {
    if (typeof raw !== 'string') return '';
    return raw.trim().replace(/\s+/g, ' ').replace(/[^A-Za-z]/g, '').toLowerCase();
  }

  // Cancel common letters between two strings; returns {remaining1, remaining2, count}
  function cancelCommonLetters(name1, name2) {
    const a = name1.split('');
    const b = name2.split('');
    const remaining1 = [];
    const remaining2 = [];
    const usedB = new Array(b.length).fill(false);

    for (let i = 0; i < a.length; i++) {
      let matched = false;
      for (let j = 0; j < b.length; j++) {
        if (!usedB[j] && a[i] === b[j]) {
          usedB[j] = true;
          matched = true;
          break;
        }
      }
      if (!matched) remaining1.push(a[i]);
    }
    for (let j = 0; j < b.length; j++) {
      if (!usedB[j]) remaining2.push(b[j]);
    }
    return {
      remaining1,
      remaining2,
      count: remaining1.length + remaining2.length
    };
  }

  function calculateRemainingCount(name1, name2) {
    return cancelCommonLetters(name1, name2).count;
  }

  // Traditional FLAMES elimination using the count
  function calculateFlamesResult(count) {
    if (!Number.isFinite(count) || count <= 0) return null;
    let items = FLAMES_ORDER.slice();
    let index = 0;
    while (items.length > 1) {
      // Use 1-based counting: ((count - 1) % length) gives elimination index
      index = (index + count - 1) % items.length;
      items.splice(index, 1);
      // After elimination, counting continues from the next position
      if (index >= items.length) index = 0;
    }
    return items[0];
  }

  // High-level helper for the UI
  function computeFlames(raw1, raw2) {
    const n1 = normalizeName(raw1);
    const n2 = normalizeName(raw2);
    const { remaining1, remaining2, count } = cancelCommonLetters(n1, n2);
    const letter = calculateFlamesResult(count);
    return {
      name1: n1,
      name2: n2,
      remaining1,
      remaining2,
      count,
      letter,
      category: letter ? CATEGORIES[letter] : null
    };
  }

  /* ---------- Validation ---------- */
  function validateNames(raw1, raw2) {
    const errors = { name1: '', name2: '' };
    const n1 = (raw1 || '').trim();
    const n2 = (raw2 || '').trim();

    if (!n1) errors.name1 = 'Please enter your name.';
    else if (!/^[A-Za-z .'\-]+$/.test(raw1.trim())) errors.name1 = 'Use letters, spaces, hyphens, or apostrophes only.';
    else if (n1.replace(/\s+/g, '').length < 1) errors.name1 = 'Please enter at least one letter.';

    if (!n2) errors.name2 = 'Please enter their name.';
    else if (!/^[A-Za-z .'\-]+$/.test(raw2.trim())) errors.name2 = 'Use letters, spaces, hyphens, or apostrophes only.';
    else if (n2.replace(/\s+/g, '').length < 1) errors.name2 = 'Please enter at least one letter.';

    if (!errors.name1 && !errors.name2 &&
        n1.toLowerCase() === n2.toLowerCase()) {
      errors.name2 = 'Names must be different to play.';
    }

    return errors;
  }

  /* ---------- Screen routing ---------- */
  const screens = {
    hero: document.querySelector('[data-screen="hero"]'),
    input: document.querySelector('[data-screen="input"]'),
    calc: document.querySelector('[data-screen="calc"]'),
    result: document.querySelector('[data-screen="result"]'),
    how: document.querySelector('[data-screen="how"]')
  };
  const navButtons = document.querySelectorAll('.nav-btn');
  let currentScreen = 'hero';

  function showScreen(name) {
    if (!screens[name]) return;
    Object.entries(screens).forEach(([key, el]) => {
      if (!el) return;
      const active = key === name;
      el.classList.toggle('active', active);
      el.hidden = !active;
    });
    currentScreen = name;
    navButtons.forEach(b => b.classList.toggle('active', b.dataset.nav === name));
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  /* ---------- Calculation animation ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const calcStepsEl = document.getElementById('calcSteps');
  const flameLetters = document.querySelectorAll('.flame-letter');
  const skipBtn = document.getElementById('skipBtn');

  function appendStep(html) {
    const div = document.createElement('div');
    div.className = 'calc-step';
    div.innerHTML = html;
    calcStepsEl.appendChild(div);
  }

  function clearCalc() {
    calcStepsEl.innerHTML = '';
    flameLetters.forEach(l => {
      l.classList.remove('eliminated', 'highlight');
    });
    skipBtn.hidden = true;
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  // Returns a promise that resolves when user skips OR animation completes
  function runCalculation(result) {
    return new Promise(resolve => {
      clearCalc();
      const baseDelay = prefersReducedMotion ? 0 : 700;
      let resolved = false;
      let skipHandler = null;

      const finish = () => {
        if (resolved) return;
        resolved = true;
        if (skipHandler) skipBtn.removeEventListener('click', skipHandler);
        resolve();
      };
      skipHandler = () => finish();
      skipBtn.hidden = false;
      skipBtn.addEventListener('click', skipHandler);

      (async () => {
        if (prefersReducedMotion) {
          appendStep(`<strong>Step 1:</strong> Comparing names…`);
          appendStep(`<strong>Step 2:</strong> Remaining letters: <strong>${result.count}</strong>`);
          // Eliminate instantly
          const order = eliminateOrder(result.count);
          order.forEach((idx, step) => {
            const letter = FLAMES_ORDER[idx];
            const el = document.querySelector(`.flame-letter[data-key="${letter}"]`);
            if (el) { el.classList.add('eliminated'); }
          });
          const last = document.querySelector(`.flame-letter[data-key="${result.letter}"]`);
          if (last) last.classList.add('highlight');
          finish();
          return;
        }

        appendStep(`<strong>Step 1:</strong> Comparing names…`);
        await sleep(baseDelay);
        appendStep(`<strong>Step 2:</strong> Matching letters across both names…`);
        await sleep(baseDelay);

        const rem1Str = result.remaining1.join(' ').toUpperCase() || '—';
        const rem2Str = result.remaining2.join(' ').toUpperCase() || '—';
        appendStep(`<strong>Step 3:</strong> Remaining letters: <em>${rem1Str}</em> + <em>${rem2Str}</em>`);
        await sleep(baseDelay);
        appendStep(`<strong>Step 4:</strong> Total remaining: <strong>${result.count}</strong>`);
        await sleep(baseDelay);
        appendStep(`<strong>Step 5:</strong> Counting through F · L · A · M · E · S…`);
        await sleep(baseDelay * 0.6);

        // Elimination animation
        const order = eliminateOrder(result.count);
        for (let i = 0; i < order.length; i++) {
          if (resolved) break;
          const letter = FLAMES_ORDER[order[i]];
          const el = document.querySelector(`.flame-letter[data-key="${letter}"]`);
          if (el) el.classList.add('eliminated');
          await sleep(380);
        }
        const last = document.querySelector(`.flame-letter[data-key="${result.letter}"]`);
        if (last) last.classList.add('highlight');
        await sleep(300);
        finish();
      })();
    });
  }

  // Compute elimination order so the LAST survivor is `result.letter`.
  // We replay the same algorithm and record each removed index.
  function eliminateOrder(count) {
    const items = FLAMES_ORDER.slice();
    let index = 0;
    const removed = [];
    while (items.length > 1) {
      index = (index + count - 1) % items.length;
      removed.push(items[index]);
      items.splice(index, 1);
      if (index >= items.length) index = 0;
    }
    return removed;
  }

  /* ---------- Result rendering ---------- */
  const resultContainer = document.getElementById('resultContainer');
  const resultEmoji = document.getElementById('resultEmoji');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const copyFeedback = document.getElementById('copyFeedback');

  function renderResult(result) {
    resultContainer.classList.remove(
      'tone-friends', 'tone-love', 'tone-affection',
      'tone-marriage', 'tone-enemies', 'tone-siblings'
    );
    resultContainer.classList.add('tone-' + result.category.tone);

    resultEmoji.textContent = result.category.emoji;
    resultTitle.textContent = result.category.name;
    resultDesc.textContent = result.category.desc;

    copyFeedback.textContent = '';
    copyFeedback.classList.remove('show');
  }

  /* ---------- Copy / Share ---------- */
  function buildShareText(result) {
    return `🔥 We played FLAMES and got ${result.category.name.toUpperCase()}! ${result.category.emoji}\nJust for fun.`;
  }

  async function copyResult() {
    const result = currentResult;
    if (!result) return;
    const text = buildShareText(result);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showFeedback('Copied to clipboard ✓');
    } catch (err) {
      showFeedback('Could not copy. Try selecting manually.');
    }
  }

  async function shareResult() {
    const result = currentResult;
    if (!result) return;
    const text = buildShareText(result);
    const title = 'FLAMES — The Classic Name Game';
    if (navigator.share) {
      try {
        await navigator.share({ title, text });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    // Fallback to copy
    await copyResult();
  }

  function showFeedback(msg) {
    copyFeedback.textContent = msg;
    copyFeedback.classList.add('show');
    clearTimeout(showFeedback._t);
    showFeedback._t = setTimeout(() => {
      copyFeedback.classList.remove('show');
    }, 2500);
  }

  /* ---------- Form ---------- */
  const form = document.getElementById('nameForm');
  const input1 = document.getElementById('name1');
  const input2 = document.getElementById('name2');
  const err1 = document.getElementById('name1Error');
  const err2 = document.getElementById('name2Error');
  const card1 = input1.closest('.input-card');
  const card2 = input2.closest('.input-card');

  function setError(card, errEl, msg) {
    errEl.textContent = msg || '';
    errEl.classList.toggle('show', !!msg);
    card.classList.toggle('invalid', !!msg);
  }

  input1.addEventListener('input', () => setError(card1, err1, ''));
  input2.addEventListener('input', () => setError(card2, err2, ''));

  let currentResult = null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const raw1 = input1.value;
    const raw2 = input2.value;
    const errors = validateNames(raw1, raw2);
    setError(card1, err1, errors.name1);
    setError(card2, err2, errors.name2);
    if (errors.name1 || errors.name2) return;

    const result = computeFlames(raw1, raw2);
    if (!result.category) {
      setError(card2, err2, 'Could not determine a result. Try different names.');
      return;
    }
    currentResult = result;

    showScreen('calc');
    await runCalculation(result);
    renderResult(result);
    showScreen('result');
  });

  /* ---------- Action router ---------- */
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;

    switch (action) {
      case 'goto-input':
        showScreen('input');
        setTimeout(() => input1.focus(), 300);
        break;
      case 'goto-hero':
        showScreen('hero');
        break;
      case 'play-again':
        setError(card1, err1, '');
        setError(card2, err2, '');
        input1.value = '';
        input2.value = '';
        currentResult = null;
        showScreen('input');
        setTimeout(() => input1.focus(), 200);
        break;
      case 'copy-result':
        copyResult();
        break;
      case 'share-result':
        shareResult();
        break;
      case 'skip-animation':
        // skip handler in runCalculation picks this up via the button
        break;
      default:
        break;
    }
  });

  // Bottom nav
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const dest = btn.dataset.nav;
      if (!dest) return;
      if (dest === 'input' && currentScreen === 'calc') return; // don't break mid-anim
      showScreen(dest);
    });
  });

  /* ---------- PWA: register service worker ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').catch(() => {
        /* silent: app still works */
      });
    });
  }

  /* ---------- Expose for debugging ---------- */
  window.__FLAMES__ = {
    normalizeName, cancelCommonLetters, calculateRemainingCount,
    calculateFlamesResult, computeFlames, CATEGORIES
  };
})();
