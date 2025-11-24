// 年表示
document.getElementById("year").textContent = new Date().getFullYear();

const fortunes = [
  {
    rank: "🎯 大吉",
    message: "なんだか今日は風が味方してくれてる！やりたいこと、思い切ってやってみて。びっくりするほどスイスイ進む！",
  },
  {
    rank: "🌟 中吉",
    message: "いい流れ来てます。焦らず、ひとつずつこなしたら想像以上の良い結果がついてくる。肩の力抜いていこう！",
  },
  {
    rank: "🙂 吉",
    message: "静かに運が上がっている最中。ちょっとの工夫が大きな成果につながるので、今日は“プラスひと手間”を心がけてみて。",
  },
  {
    rank: "🍀 小吉",
    message: "平和でいい日。周りの人に優しくしていたら、そのまま自分にも返ってくる。のんびり行こう。",
  },
  {
    rank: "🌈 末吉",
    message: "まあまあだけど悪くはない日。気持ちの切り替えが鍵！深呼吸ひとつで運気が少し上がるので試してみて。",
  },
  {
    rank: "⚡ 凶(チャンス)",
    message: "今日はちょっと波があるんかも。でも、ここが伸びしろ！失敗の中にヒントがたくさん隠れているので、しっかり拾ったら明日は大逆転！",
  },
];

const colors = ["いちごみるくピンク","ふわふわミントグリーン","ゆめかわラベンダー","きらきらレモンイエロー","そよかぜスカイブルー","ときめきルビーレッド"];
const items  = ["にゃんこチャーム",
  "きらきらキャンディ",
  "ふわふわ雲のキーホルダー",
  "ハートのメモパッド",
  "ほっこりマグカップ",
  "おほしさまステッカー"];
const actions = [
  "深呼吸をして気持ちをととのえる",
  "今日の自分をほめちぎる（声に出したらなお良し）",
  "にゃんこの動画を30秒だけ見る",
  "肩をぐるぐる回してリセットする",
  "好きな飲み物をゆっくり味わう",
  "誰も見てないとこでちょっとだけガッツポーズする"
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



