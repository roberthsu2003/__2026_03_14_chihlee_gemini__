(function () {
  /*
   * 這是一個立即執行函式，用來建立獨立的作用域。
   * 這樣可以把計數器用到的變數和函式包在內部，避免影響全域環境。
   */
  var count = 0;

  /*
   * valueEl 會取得顯示數字的元素，btn 會取得用來增加計數的按鈕。
   * 後續程式會透過這兩個節點更新畫面並綁定點擊事件。
   */
  var valueEl = document.getElementById("value");
  var btn = document.getElementById("increment");

  /*
   * render 負責把目前的 count 顯示到頁面上。
   * 如果成功找到 valueEl，就把 count 轉成字串後更新到文字內容中。
   */
  function render() {
    if (valueEl) valueEl.textContent = String(count);
  }

  /*
   * 這裡先檢查按鈕是否存在，避免元素不存在時呼叫 addEventListener 發生錯誤。
   * 當按鈕被點擊時，count 會加一，然後重新呼叫 render，讓畫面上的數字同步更新。
   */
  if (btn) {
    btn.addEventListener("click", function () {
      count += 1;
      render();
    });
  }

  /*
   * 程式一開始先執行一次 render，讓畫面顯示初始值 0。
   */
  render();
})();