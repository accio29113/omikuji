// 年表示
document.getElementById("year").textContent = new Date().getFullYear();

const fortunes = [
  {
    rank: "🎯 大吉",
    message: "謙虚さと自信を兼ね備えて何事も挑戦してみましょう！良い結果が期待できます！",
  },
  {
    rank: "🌟 中吉",
    message: "散歩やウォーキングなど、軽い運動をすると何かいいこと起こりそう！",
  },
  {
    rank: "🙂 吉",
    message: "当たり前のことに感謝する気持ちが幸せを呼んでくれる日！",
  },
  {
    rank: "🍀 小吉",
    message: "区別も差別もなく人に優しい気持ちで接することが今日のあなたに吉を運んでくれます。",
  },
  {
    rank: "🌈 末吉",
    message: "迷うことはしない方が吉。静かに過ごす日も必要。",
  },
  {
    rank: "⚡ 凶(チャンス)",
    message: "誤解されやすい１日になりそう。誤解を解くより行動で示そう！",
  },
];

const colors = ["グレー", "さくらピンク", "オフホワイト", "ベージュ", "ワインレッド", "スカイブルー"];
const items  = ["シャワースリッパ", "クッション", "マスク", "マグカップ", "長財布", "お守り"];
const actions = [
  "泣ける映画を観る",
  "嫌いな人の良いところを３つ言う",
  "最近あった嬉しい話を人に伝える",
  "腹式呼吸でストレッチをする",
  "15分間半身浴または足浴をする",
  "ウオーキングをする",
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
