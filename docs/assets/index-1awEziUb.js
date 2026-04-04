(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){return e.length===0?0:e.reduce((e,t)=>e+t,0)/e.length}function t(e){return e[0]}function n(e){if(e.length!==0)return e[e.length-1]}function r(e){return e.map(e=>e.name)}var i=[{name:`國文`,value:82},{name:`數學`,value:91},{name:`英文`,value:78},{name:`物理`,value:88}];function a(){let a=document.querySelector(`#app`);if(!a)return;let s=e(i.map(e=>e.value)),c=r(i),l=t(c),u=n(c);a.innerHTML=`
    <header class="top">
      <p class="chip">範例 4 · 陣列與泛型</p>
      <h1>成績光譜</h1>
      <p>
        資料為 <code>SubjectScore[]</code>；長條圖寬度依分數比例。下方統計用到
        <code>average(number[])</code> 與泛型 <code>firstItem&lt;T&gt;</code>。
      </p>
    </header>
    <div class="summary">
      <div class="stat">
        <span class="num">${s.toFixed(1)}</span>
        <span class="lbl">平均</span>
      </div>
      <div class="stat">
        <span class="num">${l??`—`}</span>
        <span class="lbl">firstItem&lt;string&gt;</span>
      </div>
      <div class="stat">
        <span class="num">${u??`—`}</span>
        <span class="lbl">lastItem&lt;string&gt;</span>
      </div>
    </div>
    <div class="chart" role="list">
      ${i.map(e=>`
        <div class="row" role="listitem">
          <span class="name">${o(e.name)}</span>
          <div class="bar-wrap" aria-hidden="true">
            <div class="bar" style="width:${e.value/100*100}%"></div>
          </div>
          <span class="val">${e.value}</span>
        </div>
      `).join(``)}
    </div>
    <p class="generic-demo">
      <code>readonly number[]</code> 可傳入 <code>average</code>（唯讀陣列與可變陣列在「讀取」情境常可互通）。
      試在程式碼中將 <code>data</code> 改為 <code>readonly SubjectScore[]</code> 並觀察型別檢查。
    </p>
  `}function o(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}a();