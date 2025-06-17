// 倒數計時功能
function updateCountdown() {
  const examDate = new Date("2026-01-17T00:00:00");
  const now = new Date();
  const diff = examDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "加油！祝你能進入心目中的好大學以及好科系❤️";
    clearInterval(timer); // ✅ 停止倒數
    return;
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const text = `${days} 天 ${hours} 小時 ${minutes} 分 ${seconds} 秒`;
  document.getElementById("countdown").innerText = text;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 語錄載入功能
let quotes = [];

fetch("../js/quotes.json")
  .then(response => response.json())
  .then(data => {
    quotes = data;
    loadRandomQuote();
  })
  .catch(error => {
    console.error("載入語錄失敗：", error);
  });

function loadRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").innerText = quotes[randomIndex];
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}