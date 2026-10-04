// 年表示
document.getElementById("year").textContent = new Date().getFullYear();

const fortunes = [
  {
    rank: "🎯 大吉",
    message: "願い事が何か１つ叶う日！",
  },
  {
    rank: "🌟 中吉",
    message: "良い言葉遣いが運気を運ぶ日！",
  },
  {
    rank: "🙂 吉",
    message: "部屋の掃除をすると運気が上がる！",
  },
  {
    rank: "🍀 小吉",
    message: "前向きな心で悩み事が１つ解決するかも！",
  },
  {
    rank: "🌈 末吉",
    message: "正直な自分でいることを心がける必要がありそう",
  },
  {
    rank: "⚡ 凶(チャンス)",
    message: "我慢が多い日。感情に波を立てず静かに過ごそう。",
  },
];

const colors = ["さくらピンク", "スカイブルー", "モスグリーン", "純白", "ゴールド", "ワインレッド"];
const items  = ["動物のぬいぐるみ", "もふもふクッション", "キーホルダー", "クレヨン", "新しいスケジュール帳", "キャラクターのシール"];
const actions = [
  "ラジオ体操をする",
  "鏡に向かって変顔3回",
  "筋トレ3分",
  "リンパマッサージ3分",
  "1円以上募金する",
  "ゴリラのものまね",
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
