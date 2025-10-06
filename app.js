// 年表示
document.getElementById("year").textContent = new Date().getFullYear();

const fortunes = [
  {
    rank: "🎯 大吉",
    message: "いい波がきてます！思い切って一歩踏み出したら、想像以上にいい結果になりそう！",
  },
  {
    rank: "🌟 中吉",
    message: "落ち着いて丁寧にいけば、ちゃんと実る。人の優しさに助けられる日。",
  },
  {
    rank: "🙂 吉",
    message: "肩の力を抜いたら、うまく回りだす。小さな良いことが重なりそうな予感！",
  },
  {
    rank: "🍀 小吉",
    message: "地味でも積み上げることが最強へのカギ。コツコツ努力が未来のドヤ顔を作ってくれる。",
  },
  {
    rank: "🌈 末吉",
    message: "焦らなくてOK。準備が整ったら、チャンスはちゃんと訪れます。",
  },
  {
    rank: "⚡ 凶(チャンス)",
    message: "無理をしないのが勝ちへの一歩。計画見直しで逆転できる。寝たらだいたい元気出るよ。",
  },
];

const colors = ["さくらピンク", "ミントグリーン", "ラベンダー", "ネイビー", "レモンイエロー", "コーラル","オレンジ","オフホワイト"];
const items  = ["お気に入りペン", "水筒", "イヤホン", "ふわふわ靴下", "ノート", "ハンドクリーム","薬用リップ","ハンドタオル"];
const actions = [
  "2分だけ深呼吸する",
  "『ありがとう』を1回多めに言う",
  "机の上を30秒だけ片付ける",
  "空を1分見る",
  "背伸びして肩回し",
  "今日の良かったことを1つメモ",
  "好きな人の顔を思い浮かべる",
  "鏡の前で笑顔をつくる",
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

