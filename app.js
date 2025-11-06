// 年表示
document.getElementById("year").textContent = new Date().getFullYear();

const fortunes = [
  {
    rank: "🎯 大吉",
    message: "良い波がきています。今まで苦しかったことも解決に向かって気持ちが晴れてくるでしょう。",
  },
  {
    rank: "🌟 中吉",
    message: "苦手なことにもチャレンジしてみよう。努力が報われる時が必ず訪れます。",
  },
  {
    rank: "🙂 吉",
    message: "相手のことを考えて動くことを忘れずに。思いやりの心があなたを救うでしょう。",
  },
  {
    rank: "🍀 小吉",
    message: "小さな成果を確実に積み上げていく時。忍耐も必要。",
  },
  {
    rank: "🌈 末吉",
    message: "気持ちを落ち着けて、じっくり物事を考えると答えが見えてくる。",
  },
  {
    rank: "⚡ 凶(チャンス)",
    message: "自分自身を振り返ってみる時。そうすることで運気は上がる。",
  },
];

const colors = ["ブラック", "ホワイト", "パープル", "オレンジ", "ブラウン", "レッド"];
const items  = ["ふかふか毛布", "もふもふスリッパ", "ジャージ", "薬用リップ", "3色ボールペン", "500円玉"];
const actions = [
  "1人でのんびり過ごす時間を確保する",
  "苦手な人にも笑顔で挨拶する",
  "空を見上げて雲の流れを観察する",
  "3分間ストレッチをする",
  "1日1回、感謝した出来事を紙に書く",
  "1分間、目を閉じて瞑想する",
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

