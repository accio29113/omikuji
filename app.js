// 年表示
document.getElementById("year").textContent = new Date().getFullYear();

const fortunes = [
  {
    rank: "🎯 大吉",
    message: "運が味方している時！願いが１つ叶う予感！",
  },
  {
    rank: "🌟 中吉",
    message: "努力が報われる時！このまま最後まで突っ走ろう！",
  },
  {
    rank: "🙂 吉",
    message: "良いことをした数だけ良いことがありそう！日常生活に活かしていこう！",
  },
  {
    rank: "🍀 小吉",
    message: "失ったまま手に入らなかったものが戻ってきそう！次は失わないようにね！",
  },
  {
    rank: "🌈 末吉",
    message: "人や動物に親切にすることで自分の運が開けるよ！",
  },
  {
    rank: "⚡ 凶(チャンス)",
    message: "ちょっとした誤解から信用を失うことがあるかも。日頃の言動に注意してみて！",
  },
];

const colors = ["ハワイアンブルー","さくらピンク","ワインレッド","スカッシュレモン","ゴールド","シルバー"];
const items  = ["推しアニメキャラのステッカー",
  "鈴",
  "植木鉢",
  "フライドポテト",
  "５円玉",
  "スケジュ帳ル帳"];
const actions = [
  "腹式呼吸を10回",
  "今日の感謝を３つ以上言う",
  "机の上を整理整頓する",
  "目を閉じてストレッチを３分",
  "落ちているゴミを拾う",
  "鏡で自分の笑顔を写す"
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




