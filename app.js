// 年表示
document.getElementById("year").textContent = new Date().getFullYear();

const fortunes = [
  {
    rank: "🎯 大吉",
    message: "これまでの努力が報われる時。成功体験が増える予感。",
  },
  {
    rank: "🌟 中吉",
    message: "健康な食事を心がけよう。身も心も健康で過ごせる時。",
  },
  {
    rank: "🙂 吉",
    message: "苦手なことにも挑戦してみよう。スキルアップできる時。",
  },
  {
    rank: "🍀 小吉",
    message: "当たり前のことに感謝する気持ちを忘れずに。小さな幸せは大きな幸せの種。",
  },
  {
    rank: "🌈 末吉",
    message: "対人関係は公平に接することが大事。周囲からの評価が上がります。",
  },
  {
    rank: "⚡ 凶(チャンス)",
    message: "謙虚さと優しさを意識しよう。気持ちに余裕をもって運気を上げていこう。",
  },
];

const colors = ["さくらピンク", "アイボリー", "シルバー", "レモンイエロー", "若草色", "ターコイズブルー"];
const items  = ["めがね", "観葉植物", "加湿器", "ブランケット", "ホワイトボード", "ウエットティッシュ"];
const actions = [
  "15分だけ昼寝する",
  "机の上を整理する",
  "ホットドリンクを飲む",
  "1日の中で嬉しかったことベスト３を紙に書く",
  "絵本を読む",
  "鏡の前で笑顔を作る",
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


