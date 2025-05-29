// 倒數計時功能
function updateCountdown() {
  const examDate = new Date("2025-07-12T00:00:00");
  const now = new Date();
  const diff = examDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "考試已經結束！";
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

fetch("quotes.json")
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

const playlist = [
  "music/music1.mp3",
  "music/music2.mp3",
  "music/music3.mp3"
];

let current = 0;
let isPlaying = false;
let audio = new Audio(playlist[current]);

const button = document.getElementById("music-btn");

// 按下按鈕：播放或暫停
button.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    button.innerText = "🎶";
    isPlaying = true;
  } else {
    audio.pause();
    button.innerText = "⏸️";
    isPlaying = false;
  }
});

// 播放完自動播下一首
audio.addEventListener("ended", () => {
  current = (current + 1) % playlist.length;
  audio = new Audio(playlist[current]);
  if (isPlaying) {
    audio.play();
  }

  // 加上 event listener 讓下一首也能繼續輪播
  audio.addEventListener("ended", arguments.callee);
});

let testAudio = document.createElement("audio");
console.log(testAudio.canPlayType("audio/mpeg")); // 'probably' 或 'maybe' 表示支援
console.log(testAudio.canPlayType("audio/wav"));   // 某些瀏覽器會回傳空字串（不支援）
audio = new Audio(playlist[current]);
audio.onerror = function (e) {
  console.error("音訊載入錯誤：", e);
};
