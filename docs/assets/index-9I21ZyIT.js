(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){return`durationMin`in e}function t(e){let t=e.filter(e=>e.year!==void 0).length;return`共 ${e.length} 本，其中 ${t} 本有標示出版年。`}var n=[{isbn:`978-986-123-001`,title:`海邊的卡夫卡`,author:`村上春樹`,year:2003},{isbn:`978-986-456-002`,title:`設計模式`,author:`Gang of Four`,year:1994},{isbn:`978-986-789-003`,title:`深夜食堂有聲書`,author:`安倍夜郎`,durationMin:420}];function r(t){let n=t.year===void 0?``:`<p class="year">${t.year} 年出版</p>`,r=e(t)?`<p class="year">有聲書 · ${t.durationMin} 分鐘</p>`:``;return`
    <article class="book-card">
      <span class="spine" aria-hidden="true"></span>
      <h2 class="title">${i(t.title)}</h2>
      <p class="author">${i(t.author)}</p>
      ${n}
      ${r}
      <p class="isbn">ISBN ${i(t.isbn)}</p>
    </article>
  `}function i(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}function a(){let e=document.querySelector(`#app`);if(!e)return;let i=n.map(e=>({isbn:e.isbn,title:e.title,author:e.author,year:e.year}));e.innerHTML=`
    <header class="shelf-header">
      <p class="ribbon">範例 3 · interface 與 type</p>
      <h1>閱讀清單</h1>
      <p>每張卡對應一個符合 <code>interface Book</code> 的物件；含 <code>readonly</code>、選用 <code>year?</code>，以及擴充 <code>Audiobook</code>。</p>
    </header>
    <div class="book-grid" role="list">
      ${n.map(e=>r(e)).join(``)}
    </div>
    <p class="stats">${t(i)}</p>
  `}a();