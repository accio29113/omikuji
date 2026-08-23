// 年表示
document.getElementById("year").textContent = new Date().getFullYear();

const fortunes = [
  {
    rank: "🎯 大吉",
    message: "何をやってもうまくいく！嬉しいことが続きます！",
  },
  {
    rank: "🌟 中吉",
    message: "良い行いが全て自分に返ってきます！",
  },
  {
    rank: "🙂 吉",
    message: "平和な時間を感じることが日が増えるかも！",
  },
  {
    rank: "🍀 小吉",
    message: "笑顔でいることが幸を呼ぶ日！",
  },
  {
    rank: "🌈 末吉",
    message: "集中力が薄れそう。小さなミスに気を付けて！",
  },
  {
    rank: "⚡ 凶(チャンス)",
    message: "良かれと思ったことが裏目に出るかも。言動は慎重に！",
  },
];

const colors = ["サーモンピンク", "ターコイズブルー", "エメラルドグリーン", "漆黒", "ネイビー", "シルバー"];
const items  = ["抱き枕", "ビーチサンダル", "ヘアーオイル", "ノートパソコン", "手作りバッグ", "つまようじ"];
const actions = [
  "窓を開けて5分間空気の入れ替えをする",
  "近所のゴミを拾う",
  "5分間ストレッチをする",
  "エアコンのフィルター掃除をする",
  "1日1回は野菜を食べる",
  "寝る前に1曲歌を歌う",
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
