// 年表示
document.getElementById("year").textContent = new Date().getFullYear();

const fortunes = [
  {
    rank: "🎯 大吉",
    message: "心が躍るような出来事が起こりそう！何事も結果良好の波に乗ってういます。",
  },
  {
    rank: "🌟 中吉",
    message: "人に優しくした分、自分に返ってくる。思いやりの気持ちを大切に！",
  },
  {
    rank: "🙂 吉",
    message: "コツコツ努力が実りそう！途中で諦めずに頑張ることが吉を呼びます。",
  },
  {
    rank: "🍀 小吉",
    message: "いつも当たり前だと思ってることに感謝してみよう。たくさんの『ありがとう』が、あなたの心を豊かにします。",
  },
  {
    rank: "🌈 末吉",
    message: "目に見えない努力が実を結ぶ日。何事にも真面目に取り込もう！",
  },
  {
    rank: "⚡ 凶(チャンス)",
    message: "静かな場所で好きな音楽を聴いて心を安定させよう。自律神経が乱れないように注意。",
  },
];

const colors = ["リアリティレッド", "スカイブルー", "ターコイズ", "オフホワイト", "サーモンピンク", "ゴールド"];
const items  = ["マグカップ", "家族の写真", "ノートパソコン", "漫画本", "リップクリーム", "キーホルダー"];
const actions = [
  "目を閉じて深呼吸を３回する",
  "ウォーキングをする",
  "15分間脳トレをする",
  "リンパマッサージをする",
  "好きな歌を歌う",
  "寝る前に楽しかったことを10個言う。",
];

const rankEl = document.getElementById("rank");
const messageEl = document.getElementById("message");
const colorEl = document.getElementById("color");
const itemEl = document.getElementById("item");
const actionEl = document.getElementById("action");
const drawBtn = document.getElementById("drawBtn");
const resetBtn = document.getElementById("resetBtn");
const confetti = document.getElementById("confetti");

// 乱数ヘルパー
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 引く処理
function draw() {
  // キーボード連打防止の軽い無効化
  drawBtn.disabled = true;
  setTimeout(() => (drawBtn.disabled = false), 400);

  const f = pick(fortunes);
  const c = pick(colors);
  const it = pick(items);
  const act = pick(actions);

  // 結果表示
  rankEl.textContent = f.rank;
  messageEl.textContent = f.message;
  colorEl.textContent = c;
  itemEl.textContent = it;
  actionEl.textContent = act;

  // 画面読み上げ向けにフォーカス移動
  rankEl.setAttribute("tabindex", "-1");
  rankEl.focus();

  // 紙吹雪のチラ見せ
  confetti.classList.add("show");
  setTimeout(() => confetti.classList.remove("show"), 900);

  // ローカル保存（任意）
  const payload = { f: f.rank, m: f.message, c, it, act, at: Date.now() };
  localStorage.setItem("axio-omikuji-last", JSON.stringify(payload));
}

// リセット
function reset() {
  rankEl.textContent = "—";
  messageEl.textContent = "ボタンを押してね";
  colorEl.textContent = "—";
  itemEl.textContent = "—";
  actionEl.textContent = "—";
  localStorage.removeItem("axio-omikuji-last");
}

// 前回の結果を復元（あれば）
(function restore() {
  const raw = localStorage.getItem("axio-omikuji-last");
  if (!raw) return;
  try {
    const { f, m, c, it, act } = JSON.parse(raw);
    rankEl.textContent = f;
    messageEl.textContent = m;
    colorEl.textContent = c;
    itemEl.textContent = it;
    actionEl.textContent = act;
  } catch {}
})();

drawBtn.addEventListener("click", draw);
resetBtn.addEventListener("click", reset);

// Enterで引ける
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    draw();
  }
});



