const app = document.getElementById("app");
const pageTitle = document.getElementById("page-title");

/* =========================================================================
   1. 学習データ（全単元・全問題）
   ========================================================================= */
const CURRICULUM = {
  "小学生": {
    "算数": {
      "小1": [
        { title: "10までのかず", questions: [
          { q: "「7」は「5」よりいくつ大きい？", opts: ["1", "2", "3", "4"], a: 1, exp: "7 - 5 = 2 です。" },
          { q: "「4 + 4」はいくつ？", opts: ["6", "7", "8", "9"], a: 2, exp: "4 + 4 = 8 です。" },
          { q: "「9 - 3」はいくつ？", opts: ["5", "6", "7", "8"], a: 1, exp: "9 - 3 = 6 です。" },
          { q: "「2 + 7」はいくつ？", opts: ["8", "9", "10", "11"], a: 1, exp: "2 + 7 = 9 です。" },
          { q: "「5 - 5」はいくつ？", opts: ["0", "1", "2", "5"], a: 0, exp: "5 - 5 = 0 です。" },
          { q: "「10 - 5」はいくつ？", opts: ["4", "5", "6", "7"], a: 1, exp: "10 - 5 = 5 です。" },
          { q: "「3 + 6」はいくつ？", opts: ["8", "9", "10", "11"], a: 1, exp: "3 + 6 = 9 です。" },
          { q: "「8 - 4」はいくつ？", opts: ["3", "4", "5", "6"], a: 1, exp: "8 - 4 = 4 です。" },
          { q: "「1 + 1」はいくつ？", opts: ["1", "2", "3", "4"], a: 1, exp: "1 + 1 = 2 です。" },
          { q: "「10 - 1」はいくつ？", opts: ["8", "9", "10", "11"], a: 1, exp: "10 - 1 = 9 です。" }
        ]},
        { title: "いくつといくつ", questions: [
          { q: "5は2とあといくつ？", opts: ["2", "3", "4", "5"], a: 1, exp: "5は2と3に分けられます。" },
          { q: "10は4とあといくつ？", opts: ["5", "6", "7", "8"], a: 1, exp: "10は4と6に分けられます。" },
          { q: "6は1とあといくつ？", opts: ["4", "5", "6", "7"], a: 1, exp: "6は1と5に分けられます。" },
          { q: "7は3とあといくつ？", opts: ["3", "4", "5", "6"], a: 1, exp: "7は3と4に分けられます。" },
          { q: "8は5とあといくつ？", opts: ["2", "3", "4", "5"], a: 1, exp: "8は5と3に分けられます。" },
          { q: "9は4とあといくつ？", opts: ["4", "5", "6", "7"], a: 1, exp: "9は4と5に分けられます。" },
          { q: "3は1とあといくつ？", opts: ["1", "2", "3", "4"], a: 1, exp: "3は1と2に分けられます。" },
          { q: "4は2とあといくつ？", opts: ["1", "2", "3", "4"], a: 1, exp: "4は2と2に分けられます。" },
          { q: "10は7とあといくつ？", opts: ["2", "3", "4", "5"], a: 1, exp: "10は7と3に分けられます。" },
          { q: "2は1とあといくつ？", opts: ["0", "1", "2", "3"], a: 1, exp: "2は1と1に分けられます。" }
        ]}
      ],
      "小2": [
        { title: "かけ算", questions: [
          { q: "2 × 3 は？", opts: ["4", "5", "6", "7"], a: 2, exp: "2×3=6です。" },
          { q: "4 × 2 は？", opts: ["6", "7", "8", "9"], a: 2, exp: "4×2=8です。" },
          { q: "3 × 3 は？", opts: ["6", "7", "8", "9"], a: 3, exp: "3×3=9です。" },
          { q: "5 × 2 は？", opts: ["8", "9", "10", "11"], a: 2, exp: "5×2=10です。" },
          { q: "6 × 2 は？", opts: ["10", "11", "12", "13"], a: 2, exp: "6×2=12です。" },
          { q: "7 × 2 は？", opts: ["12", "13", "14", "15"], a: 2, exp: "7×2=14です。" },
          { q: "8 × 2 は？", opts: ["14", "15", "16", "17"], a: 2, exp: "8×2=16です。" },
          { q: "9 × 2 は？", opts: ["16", "17", "18", "19"], a: 2, exp: "9×2=18です。" },
          { q: "2 × 2 は？", opts: ["2", "3", "4", "5"], a: 2, exp: "2×2=4です。" },
          { q: "1 × 2 は？", opts: ["1", "2", "3", "4"], a: 1, exp: "1×2=2です。" }
        ]}
      ],
      "小3": [
        { title: "かけ算の筆算", questions: [
          { q: "12 × 3 は？", opts: ["26", "36", "46", "56"], a: 1, exp: "10×3=30, 2×3=6, 30+6=36です。" },
          { q: "23 × 2 は？", opts: ["36", "46", "56", "66"], a: 1, exp: "20×2=40, 3×2=6, 40+6=46です。" },
          { q: "14 × 5 は？", opts: ["60", "70", "80", "90"], a: 1, exp: "10×5=50, 4×5=20, 50+20=70です。" },
          { q: "21 × 4 は？", opts: ["64", "74", "84", "94"], a: 2, exp: "20×4=80, 1×4=4, 80+4=84です。" },
          { q: "32 × 3 は？", opts: ["86", "96", "106", "116"], a: 1, exp: "30×3=90, 2×3=6, 90+6=96です。" },
          { q: "15 × 3 は？", opts: ["35", "45", "55", "65"], a: 1, exp: "10×3=30, 5×3=15, 30+15=45です。" },
          { q: "24 × 2 は？", opts: ["38", "48", "58", "68"], a: 1, exp: "20×2=40, 4×2=8, 40+8=48です。" },
          { q: "13 × 3 は？", opts: ["29", "39", "49", "59"], a: 1, exp: "10×3=30, 3×3=9, 30+9=39です。" },
          { q: "41 × 2 は？", opts: ["72", "82", "92", "102"], a: 1, exp: "40×2=80, 1×2=2, 80+2=82です。" },
          { q: "22 × 4 は？", opts: ["78", "88", "98", "108"], a: 1, exp: "20×4=80, 2×4=8, 80+8=88です。" }
        ]}
      ]
    },
    "理科": {
      "小3": [
        { title: "身の回りの生物", questions: [
          { q: "植物が育つために必要なものは？", opts: ["水と光", "水だけ", "光だけ", "空気だけ"], a: 0, exp: "植物は水と光などが必要です。" },
          { q: "昆虫の体はいくつの部分に分かれている？", opts: ["2つ", "3つ", "4つ", "5つ"], a: 1, exp: "頭・胸・腹の3つに分かれています。" },
          { q: "チョウは何になる？", opts: ["幼虫", "さなぎ", "成虫", "卵"], a: 2, exp: "幼虫からさなぎを経て成虫になります。" },
          { q: "植物が光合成で作るものは？", opts: ["酸素と糖", "二酸化炭素と水", "窒素と水素", "タンパク質"], a: 0, exp: "光合成では酸素と糖が作られます。" },
          { q: "動物の呼吸で出す気体は？", opts: ["酸素", "二酸化炭素", "窒素", "水素"], a: 1, exp: "呼吸では二酸化炭素を出します。" },
          { q: "植物の根の役割は？", opts: ["水を吸収する", "光合成をする", "呼吸をする", "種を作る"], a: 0, exp: "根は水や養分を吸収します。" },
          { q: "昆虫の足は何本？", opts: ["4本", "6本", "8本", "10本"], a: 1, exp: "昆虫は6本足です。" },
          { q: "種子が発芽するために必要なものは？", opts: ["水と空気", "光と水", "土だけ", "肥料だけ"], a: 0, exp: "発芽には水と空気、適度な温度が必要です。" },
          { q: "植物の葉の役割は？", opts: ["光合成", "水の吸収", "体を支える", "種を作る"], a: 0, exp: "葉は光合成を行います。" },
          { q: "食物連鎖の始まりは？", opts: ["植物", "動物", "菌類", "細菌"], a: 0, exp: "植物が食物連鎖の始まりです。" }
        ]}
      ]
    },
    "社会": {
      "小3": [
        { title: "地図記号", questions: [
          { q: "「〒」の地図記号は何を表す？", opts: ["学校", "郵便局", "交番", "病院"], a: 1, exp: "〒は郵便局を表します。" },
          { q: "「文」の地図記号は何を表す？", opts: ["学校", "郵便局", "交番", "病院"], a: 0, exp: "文は学校を表します。" },
          { q: "「交」の地図記号は何を表す？", opts: ["学校", "郵便局", "交番", "病院"], a: 2, exp: "交は交番を表します。" },
          { q: "「十」の地図記号は何を表す？", opts: ["学校", "病院", "交番", "神社"], a: 1, exp: "十は病院を表します。" },
          { q: "「卍」の地図記号は何を表す？", opts: ["寺", "神社", "学校", "病院"], a: 0, exp: "卍は寺を表します。" },
          { q: "「⛩」の地図記号は何を表す？", opts: ["寺", "神社", "学校", "病院"], a: 1, exp: "鳥居の記号は神社を表します。" },
          { q: "「田」の地図記号は何を表す？", opts: ["田んぼ", "畑", "果樹園", "茶畑"], a: 0, exp: "田は田んぼを表します。" },
          { q: "「畑」の地図記号は何を表す？", opts: ["田んぼ", "畑", "果樹園", "茶畑"], a: 1, exp: "畑は畑を表します。" },
          { q: "「果」の地図記号は何を表す？", opts: ["田んぼ", "畑", "果樹園", "茶畑"], a: 2, exp: "果は果樹園を表します。" },
          { q: "「茶」の地図記号は何を表す？", opts: ["田んぼ", "畑", "果樹園", "茶畑"], a: 3, exp: "茶は茶畑を表します。" }
        ]}
      ]
    }
  },
  "中学生": {
    "数学": {
      "中1": [
        { title: "正の数・負の数", questions: [
          { q: "-3 + 5 は？", opts: ["-8", "-2", "2", "8"], a: 2, exp: "-3に5を足すと2になります。" },
          { q: "(-2) × 3 は？", opts: ["-6", "-5", "5", "6"], a: 0, exp: "負の数と正の数の積は負になります。" },
          { q: "-4 - (-2) は？", opts: ["-6", "-2", "2", "6"], a: 1, exp: "-4から-2を引くので、-4+2=-2になります。" },
          { q: "(-5) × (-2) は？", opts: ["-10", "-7", "7", "10"], a: 3, exp: "負の数と負の数の積は正になります。" },
          { q: "-8 + 3 は？", opts: ["-11", "-5", "5", "11"], a: 1, exp: "-8に3を足すと-5になります。" },
          { q: "0 - 5 は？", opts: ["-5", "0", "5", "10"], a: 0, exp: "0から5を引くと-5になります。" },
          { q: "-6 ÷ 2 は？", opts: ["-3", "-4", "3", "4"], a: 0, exp: "負の数を正の数で割ると負になります。" },
          { q: "-12 ÷ (-4) は？", opts: ["-3", "-4", "3", "4"], a: 2, exp: "負の数を負の数で割ると正になります。" },
          { q: "-1 + 1 は？", opts: ["-2", "-1", "0", "1"], a: 2, exp: "-1に1を足すと0になります。" },
          { q: "(-3) × (-3) は？", opts: ["-9", "-6", "6", "9"], a: 3, exp: "負の数同士の積は正になります。" }
        ]}
      ],
      "中2": [
        { title: "連立方程式", questions: [
          { q: "x+y=5, x-y=1 の解は？", opts: ["x=2, y=3", "x=3, y=2", "x=4, y=1", "x=1, y=4"], a: 1, exp: "2式を足すと2x=6よりx=3, y=2です。" },
          { q: "x+y=7, x-y=3 の解は？", opts: ["x=5, y=2", "x=2, y=5", "x=4, y=3", "x=3, y=4"], a: 0, exp: "2式を足すと2x=10よりx=5, y=2です。" },
          { q: "2x+y=8, x+y=5 の解は？", opts: ["x=3, y=2", "x=2, y=3", "x=4, y=1", "x=1, y=4"], a: 0, exp: "引き算するとx=3, y=2です。" },
          { q: "x+2y=6, x-y=0 の解は？", opts: ["x=2, y=2", "x=3, y=3", "x=4, y=4", "x=1, y=1"], a: 0, exp: "x=yを代入すると3y=6よりy=2, x=2です。" },
          { q: "3x+y=10, x+y=6 の解は？", opts: ["x=2, y=4", "x=4, y=2", "x=3, y=3", "x=5, y=1"], a: 0, exp: "引き算すると2x=4よりx=2, y=4です。" },
          { q: "2x+3y=12, x+3y=9 の解は？", opts: ["x=3, y=2", "x=2, y=3", "x=4, y=1", "x=1, y=4"], a: 0, exp: "引き算するとx=3, y=2です。" },
          { q: "x-y=4, 2x+y=5 の解は？", opts: ["x=3, y=-1", "x=-1, y=3", "x=2, y=-2", "x=-2, y=2"], a: 0, exp: "足すと3x=9よりx=3, y=-1です。" },
          { q: "x+2y=5, 2x-y=5 の解は？", opts: ["x=3, y=1", "x=1, y=3", "x=2, y=2", "x=4, y=0"], a: 0, exp: "連立を解くとx=3, y=1です。" },
          { q: "3x+2y=13, x+2y=7 の解は？", opts: ["x=3, y=2", "x=2, y=3", "x=1, y=4", "x=4, y=1"], a: 0, exp: "引き算すると2x=6よりx=3, y=2です。" },
          { q: "2x+y=7, x+y=4 の解は？", opts: ["x=3, y=1", "x=1, y=3", "x=2, y=2", "x=4, y=0"], a: 0, exp: "引き算するとx=3, y=1です。" }
        ]}
      ]
    }
  },
  "高校生": {
    "数学I": {
      "高1": [
        { title: "数と式", questions: [
          { q: "x² - 9 を因数分解すると？", opts: ["(x+3)(x+3)", "(x-3)(x-3)", "(x+3)(x-3)", "x(x-9)"], a: 2, exp: "二乗の差の公式 a²-b²=(a+b)(a-b) を使います。" },
          { q: "(x+2)² を展開すると？", opts: ["x²+4", "x²+2x+4", "x²+4x+4", "x²+4x+2"], a: 2, exp: "(a+b)² = a²+2ab+b² です。" },
          { q: "√18 を簡単にすると？", opts: ["2√3", "3√2", "4√2", "6√3"], a: 1, exp: "√18 = √(9×2) = 3√2 です。" },
          { q: "√2 × √8 は？", opts: ["2", "4", "8", "16"], a: 1, exp: "√(2×8) = √16 = 4 です。" },
          { q: "| -5 | は？", opts: ["-5", "0", "5", "10"], a: 2, exp: "絶対値は符号を除いた値なので5です。" },
          { q: "2x + 3x は？", opts: ["5x", "6x", "5x²", "6x²"], a: 0, exp: "同類項をまとめると5xになります。" },
          { q: "3x × 2 は？", opts: ["5x", "6x", "6x²", "5x²"], a: 1, exp: "3x×2=6xです。" },
          { q: "2x² × 3x は？", opts: ["5x³", "6x³", "6x²", "5x²"], a: 1, exp: "係数2×3=6, x²×x=x³なので6x³です。" },
          { q: "(x-1)(x+2) を展開すると？", opts: ["x²+x-2", "x²-x-2", "x²+x+2", "x²-x+2"], a: 0, exp: "x²+2x-x-2 = x²+x-2です。" },
          { q: "x² + 5x + 6 を因数分解すると？", opts: ["(x+1)(x+6)", "(x+2)(x+3)", "(x-2)(x-3)", "(x-1)(x-6)"], a: 1, exp: "足して5、掛けて6になる組み合わせは2と3です。" }
        ]}
      ]
    }
  }
};

/* =========================================================================
   2. ストレージ・アカウント
   ========================================================================= */
const KEYS = { 
  THEME:"sf.theme", PROGRESS:"sf.progress", SESSIONS:"sf.sessions", 
  USER:"sf.user", USERS:"sf.users", TODOS:"sf.todos", LAST_QUIZ:"sf.last_quiz" 
};

function load(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
function todayStr() { return new Date().toISOString().slice(0,10); }
function fmtMin(m) { if (m<60) return m+"分"; const h=Math.floor(m/60), r=m%60; return r?`${h}時間${r}分`:`${h}時間`; }
function esc(s) { return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function initTheme() {
  const saved = load(KEYS.THEME, null);
  const t = saved || (matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  document.documentElement.setAttribute("data-theme", t);
}
initTheme();
document.getElementById("theme-btn").onclick = () => {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  save(KEYS.THEME, next);
};

function getCurrentUser() { return load(KEYS.USER, null); }
function setCurrentUser(u) { save(KEYS.USER, u); }
function getUsers() { return load(KEYS.USERS, {}); }
function registerUser(email, password, name) {
  const users = getUsers();
  if (users[email]) return { ok:false, msg:"このメールアドレスは既に登録されています。" };
  users[email] = { email, password, name, bio:"", createdAt:Date.now() };
  save(KEYS.USERS, users);
  setCurrentUser({ email, name });
  return { ok:true };
}
function loginUser(email, password) {
  const users = getUsers();
  if (!users[email] || users[email].password !== password) return { ok:false, msg:"メールアドレスまたはパスワードが違います。" };
  setCurrentUser({ email, name:users[email].name });
  return { ok:true };
}
function logout() { localStorage.removeItem(KEYS.USER); }
function updateProfile(name, bio) {
  const cur = getCurrentUser(); if (!cur) return;
  const users = getUsers();
  if (users[cur.email]) {
    users[cur.email].name = name;
    users[cur.email].bio = bio;
    save(KEYS.USERS, users);
  }
  setCurrentUser({ ...cur, name });
}

function getProgress() { return load(KEYS.PROGRESS, {}); }
function setProgress(id, correct, total) {
  const p = getProgress();
  p[id] = { correct, total, ratio: total?correct/total:0, date:todayStr() };
  save(KEYS.PROGRESS, p);
}
function getSessions() { return load(KEYS.SESSIONS, []); }
function addSession(label, subject, minutes) {
  if (minutes<=0) return;
  const arr = getSessions();
  arr.push({ date:todayStr(), label, subject, minutes, ts:Date.now() });
  save(KEYS.SESSIONS, arr);
}
function totalMinutes() { return getSessions().reduce((a,b)=>a+b.minutes,0); }
function todayMinutes() { return getSessions().filter(s=>s.date===todayStr()).reduce((a,b)=>a+b.minutes,0); }
function monthMinutes() { const m=todayStr().slice(0,7); return getSessions().filter(s=>s.date.slice(0,7)===m).reduce((a,b)=>a+b.minutes,0); }
function streak() {
  const dates = new Set(getSessions().map(s=>s.date));
  let count = 0; const d = new Date();
  while (true) {
    const ds = d.toISOString().slice(0,10);
    if (dates.has(ds)) { count++; d.setDate(d.getDate()-1); } else break;
  }
  return count;
}

function getGreetingText() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "おはようございます。";
  if (hour >= 11 && hour < 18) return "こんにちは。";
  return "こんばんは。今日も一日お疲れ様です。";
}
function getFullGreeting() {
  const user = getCurrentUser();
  const timeGreeting = getGreetingText();
  if (user && user.name) return `${user.name}さん、${timeGreeting}`;
  return timeGreeting;
}
function getRankBadge() {
  const s = streak();
  if (s >= 30) return "🔥 30日連続 マスター";
  if (s >= 14) return "🔥 14日連続 エキスパート";
  if (s >= 7) return "🔥 7日連続 ベテラン";
  if (s >= 3) return "🔥 3日連続 チャレンジャー";
  return "";
}

/* =========================================================================
   3. ナビゲーション
   ========================================================================= */
function renderNav(activeId) {
  const NAV = [
    { id:"home", label:"ホーム", icon:'<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>' },
    { id:"learn", label:"学習", icon:'<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>' },
    { id:"record", label:"記録", icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' }
  ];
  document.getElementById("nav").innerHTML = NAV.map(n =>
    `<a class="nav-item ${n.id===activeId?'active':''}" onclick="window.navigateTo('${n.id}')">${n.icon}<span>${n.label}</span></a>`
  ).join("");
}

function renderAuthButtons() {
  const user = getCurrentUser();
  const el = document.getElementById("auth-buttons");
  if (user) {
    el.innerHTML = `<span class="muted" style="font-size:14px; font-weight:600;">${esc(user.name)}</span>`;
  } else {
    el.innerHTML = `
      <button class="auth-btn" onclick="openLogin()">ログイン</button>
      <button class="auth-btn primary" onclick="openRegister()">会員登録</button>
    `;
  }
}

function renderSidebarFooter() {
  const el = document.getElementById("sidebar-footer");
  el.innerHTML = `
    <a class="nav-item" onclick="window.navigateTo('profile')">
      <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      <span>プロフィール</span>
    </a>`;
}

document.getElementById("menu-btn").onclick = () => document.getElementById("sidebar").classList.toggle("open");

window.navigateTo = (pageId) => {
  document.getElementById("sidebar").classList.remove("open");
  window.scrollTo(0,0);
  if (pageId === "home") {
    renderNav("home");
    pageTitle.textContent = "ホーム";
    window.renderHomePage();
  } else if (pageId === "learn") {
    renderNav("learn");
    pageTitle.textContent = "学習";
    window.renderLearnIndex();
  } else if (pageId === "record") {
    renderNav("record");
    pageTitle.textContent = "記録";
    window.renderRecordPage();
  } else if (pageId === "profile") {
    renderNav("");
    pageTitle.textContent = "プロフィール";
    window.renderProfilePage();
  }
};

/* =========================================================================
   4. 画面描画：ホーム
   ========================================================================= */
window.renderHomePage = () => {
  const tMin = todayMinutes();
  const s = streak();
  const p = getProgress();
  
  let totalUnits = 0;
  for (const stage of Object.values(CURRICULUM)) {
    for (const subject of Object.values(stage)) {
      for (const gradeUnits of Object.values(subject)) {
        totalUnits += gradeUnits.length;
      }
    }
  }
  const doneUnits = Object.values(p).filter(r=>r.ratio>=0.8).length;
  const percent = totalUnits ? Math.round((doneUnits / totalUnits) * 100) : 0;
  
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;

  const lastQuiz = load(KEYS.LAST_QUIZ, null);
  const resumeBtnHtml = lastQuiz ? `
    <button class="btn-resume" onclick="window.renderQuizPage('${esc(lastQuiz.title)}', '${lastQuiz.stage}', '${lastQuiz.subject}', '${lastQuiz.grade}', ${lastQuiz.index})">
      <div class="title">前回の続き</div>
      <div class="desc">${esc(lastQuiz.title)}</div>
    </button>
  ` : "";

  const greetingText = getFullGreeting();
  const badge = getRankBadge();
  const badgeHtml = badge ? `<div class="badge">${badge}</div>` : "";

  const todos = load(KEYS.TODOS, []);
  const todoHtml = todos.map((t, i) => `
    <div class="checklist-item">
      <input type="checkbox" id="todo-${i}" ${t.done ? 'checked' : ''} onchange="window.toggleTodo(${i})">
      <label for="todo-${i}">${esc(t.text)}</label>
      <button class="delete-btn" onclick="window.deleteTodo(${i})">×</button>
    </div>
  `).join("");

  app.innerHTML = `
    <div class="home-header">
      <div class="greeting-wrap">
        <h1>${esc(greetingText)}</h1>
        ${badgeHtml}
      </div>
    </div>
    <p class="page-desc">今日も少しずつ、学習を進めましょう。</p>
    
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-info">
          <div class="label">今日の学習</div>
          <div class="value">${fmtMin(tMin)}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <div class="label">連続学習</div>
          <div class="value">${s}<small style="font-size:16px; font-weight:400; margin-left:4px;">日</small></div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <div class="label">達成単元</div>
          <div class="value">${doneUnits}<small style="font-size:16px; font-weight:400; margin-left:4px;"> / ${totalUnits}</small></div>
        </div>
        <div class="progress-circle-wrap">
          <svg>
            <circle class="bg" cx="30" cy="30" r="${radius}"></circle>
            <circle class="bar" cx="30" cy="30" r="${radius}" stroke-dasharray="${strokeDasharray}"></circle>
          </svg>
          <div class="progress-circle-text">${percent}%</div>
        </div>
      </div>
    </div>

    <div class="action-area">
      <button class="btn btn-primary btn-large" onclick="window.navigateTo('learn')">学習をはじめる</button>
      ${resumeBtnHtml}
    </div>

    <div class="checklist">
      <div class="checklist-header">
        <div class="checklist-title">今日やること</div>
      </div>
      <div class="checklist-input-wrap">
        <input type="text" class="checklist-input" id="todo-input" placeholder="例：宿題のプリントをやる">
        <button class="checklist-add-btn" onclick="window.addTodo()">＋</button>
      </div>
      <div id="todo-list">
        ${todoHtml || '<p class="muted" style="font-size:14px; text-align:center; padding:16px 0;">今日の目標を追加しましょう</p>'}
      </div>
    </div>
  `;
};

window.addTodo = () => {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (!text) return;
  const todos = load(KEYS.TODOS, []);
  todos.push({ text, done: false });
  save(KEYS.TODOS, todos);
  input.value = "";
  window.renderHomePage();
};

window.toggleTodo = (i) => {
  const todos = load(KEYS.TODOS, []);
  todos[i].done = !todos[i].done;
  save(KEYS.TODOS, todos);
  window.renderHomePage();
};

window.deleteTodo = (i) => {
  const todos = load(KEYS.TODOS, []);
  todos.splice(i, 1);
  save(KEYS.TODOS, todos);
  window.renderHomePage();
};

/* =========================================================================
   5. 画面描画：学習
   ========================================================================= */
window.renderLearnIndex = () => {
  let html = `<div class="eboard-header">教科の一覧</div><div class="eboard-columns">`;
  for (const [stage, subjects] of Object.entries(CURRICULUM)) {
    html += `<div class="eboard-col"><div class="eboard-col-title">${stage}</div>`;
    for (const [subject, grades] of Object.entries(subjects)) {
      let unitCount = 0;
      for (const gradeUnits of Object.values(grades)) unitCount += gradeUnits.length;

      let color = "#228be6";
      if (subject === "理科") color = "#40c057";
      if (subject === "社会") color = "#fab005";
      if (subject === "国語" || subject === "漢字") color = "#fa5252";
      if (subject === "英語") color = "#fd7e14";

      html += `
        <a class="eboard-subject" onclick="window.renderSubjectPage('${stage}', '${subject}')">
          <div class="eboard-bar" style="background:${color}"></div>
          <div class="eboard-subject-info">
            <div class="eboard-subject-name">${subject}</div>
            <div class="eboard-subject-meta">${unitCount}単元</div>
          </div>
        </a>
      `;
    }
    html += `</div>`;
  }
  html += `</div>`;
  app.innerHTML = html;
};

window.renderSubjectPage = (stage, subject) => {
  pageTitle.textContent = subject;
  const subjectData = CURRICULUM[stage][subject];
  const grades = Object.keys(subjectData);
  const activeGrade = grades[0];

  const p = getProgress();
  let totalUnits = 0;
  let doneUnits = 0;
  for (const g of grades) {
    for (const u of subjectData[g]) {
      totalUnits++;
      if (p[u.title] && p[u.title].ratio >= 0.8) doneUnits++;
    }
  }
  const percent = totalUnits ? Math.round((doneUnits / totalUnits) * 100) : 0;

  let html = `
    <div class="unit-header">
      <span onclick="window.navigateTo('learn')">教科一覧</span> &nbsp;/&nbsp; ${esc(subject)}
    </div>
    <div class="unit-layout">
      <div class="unit-sidebar">
        <div class="unit-sidebar-title">${esc(subject)}</div>
        <div class="progress-ring">${percent}%</div>
      </div>
      <div class="unit-main">
        <div class="unit-tabs" id="unit-tabs">
          ${grades.map(g => `<div class="unit-tab ${g===activeGrade?'active':''}" onclick="window.switchGrade(this, '${stage}', '${subject}', '${g}')">${g}</div>`).join("")}
        </div>
        <ul class="unit-list" id="unit-list"></ul>
      </div>
    </div>
  `;
  app.innerHTML = html;
  window.drawUnits(stage, subject, activeGrade);
};

window.switchGrade = (el, stage, subject, grade) => {
  document.querySelectorAll(".unit-tab").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
  window.drawUnits(stage, subject, grade);
};

window.drawUnits = (stage, subject, grade) => {
  const units = CURRICULUM[stage][subject][grade] || [];
  const list = document.getElementById("unit-list");
  list.innerHTML = units.map((u, i) => `
    <li>
      <div class="unit-item" onclick="window.renderQuizPage('${esc(u.title)}', '${stage}', '${subject}', '${grade}', ${i})">
        <div class="unit-icon">${i + 1}</div>
        <div class="unit-text">${esc(u.title)}</div>
      </div>
    </li>
  `).join("");
};

/* =========================================================================
   6. 画面描画：クイズ
   ========================================================================= */
window.renderQuizPage = (unitTitle, stage, subject, grade, unitIndex) => {
  pageTitle.textContent = unitTitle;
  const unitData = CURRICULUM[stage][subject][grade][unitIndex];
  const questions = unitData.questions;
  
  save(KEYS.LAST_QUIZ, { title: unitTitle, stage, subject, grade, index: unitIndex });

  let currentQ = 0;
  let selected = null;
  let answers = [];
  let startTime = Date.now();

  function draw() {
    if (currentQ >= questions.length) {
      const correct = answers.filter(a => a === true).length;
      const total = questions.length;
      const rate = Math.round((correct / total) * 100);
      setProgress(unitTitle, correct, total);
      addSession(unitTitle, subject, Math.max(1, Math.round((Date.now()-startTime)/60000)));

      app.innerHTML = `
        <div style="max-width: 640px; margin: 0 auto;">
          <div style="text-align:center; padding: 48px 0; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <h1 style="font-size: 40px; margin-bottom: 16px;">${correct} <span style="font-size:24px;color:var(--text-muted)">/ ${total}</span></h1>
            <p style="font-size: 18px; font-weight: 600; color: var(--text-muted); margin-bottom: 48px;">正答率: ${rate}%</p>
            <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="window.navigateTo('learn')">次の単元へ</button>
              <button class="btn" onclick="window.renderQuizPage('${esc(unitTitle)}', '${stage}', '${subject}', '${grade}', ${unitIndex})">もう一度</button>
              <button class="btn" onclick="window.navigateTo('learn')">メニューへ</button>
              <button class="btn" style="color:var(--red); border-color:var(--red);" onclick="alert('間違えた問題の復習画面（デモ）')">間違えた問題を確認</button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const q = questions[currentQ];
    const progressPercent = (currentQ / questions.length) * 100;
    const correctCount = answers.filter(a => a === true).length;
    const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

    app.innerHTML = `
      <div class="quiz-wrapper">
        <div class="unit-header">
          <span onclick="window.navigateTo('learn')">教科一覧</span> &nbsp;/&nbsp; ${esc(unitTitle)}
        </div>
        <div class="quiz-container">
          <div class="quiz-header">
            <button class="quiz-close" onclick="window.navigateTo('learn')">×</button>
            <div class="quiz-title">${esc(unitTitle)}</div>
            <div style="width:24px;"></div>
          </div>
          
          <div class="quiz-progress-bar">
            <div class="quiz-track">
              <div class="quiz-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="quiz-stat">${currentQ + 1}/${questions.length}</div>
            <div class="quiz-stat">正答率:${accuracy}%</div>
          </div>

          <div class="quiz-question-area">
            <div class="quiz-q-text">${esc(q.q)}</div>
            <button class="memo-btn" onclick="window._openMemo()">
              <svg viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              <span>Memo</span>
            </button>
          </div>

          <div class="quiz-options">
            ${q.opts.map((opt, i) => {
              let cls = "quiz-opt";
              if (selected !== null) {
                if (i === q.a) cls += " correct";
                else if (i === selected) cls += " wrong";
              }
              return `<button class="${cls}" onclick="window._sel(${i})" ${selected !== null ? "disabled" : ""}>${esc(opt)}</button>`;
            }).join("")}
          </div>
        </div>
      </div>
    `;

    window._sel = (i) => {
      if (selected !== null) return;
      selected = i;
      answers[currentQ] = (i === q.a);
      draw();
      setTimeout(() => {
        currentQ++;
        selected = null;
        draw();
      }, 800);
    };

    window._openMemo = () => {
      const overlay = document.createElement("div");
      overlay.className = "modal-overlay open";
      overlay.id = "memo-modal";
      overlay.innerHTML = `
        <div class="memo-modal">
          <div class="memo-header">
            <div class="memo-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              メモ
            </div>
            <div class="memo-actions">
              <button class="memo-btn-text" onclick="window._clearMemo()">消す</button>
              <button class="memo-btn-close" onclick="window._closeMemo()">閉じる</button>
            </div>
          </div>
          <div class="memo-canvas-wrap">
            <canvas class="memo-canvas" id="memo-canvas"></canvas>
          </div>
          <div class="memo-tools">
            <button class="memo-tool active" id="tool-pen" onclick="window._setTool('pen')">
              <svg viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              ペン
            </button>
            <button class="memo-tool" id="tool-eraser" onclick="window._setTool('eraser')">
              <svg viewBox="0 0 24 24"><path d="M20 20H7L3 16l9-9 8 8-2 2z"></path><path d="M6 11l9 9"></path></svg>
              消しゴム
            </button>
            <button class="memo-tool" onclick="window._memoUndo()">
              <svg viewBox="0 0 24 24"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
              戻る
            </button>
            <button class="memo-tool" onclick="window._memoRedo()">
              <svg viewBox="0 0 24 24"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
              進む
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      window._initCanvas();
    };

    window._closeMemo = () => {
      const modal = document.getElementById("memo-modal");
      if (modal) modal.remove();
    };
  }
  draw();
};

/* =========================================================================
   7. メモ機能
   ========================================================================= */
let canvas, ctx, isDrawing = false, currentTool = 'pen';
let strokes = [], currentStroke = [];
let redoStack = [];

window._initCanvas = () => {
  canvas = document.getElementById("memo-canvas");
  ctx = canvas.getContext("2d");
  
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);
  
  canvas.addEventListener("touchstart", (e) => { e.preventDefault(); startDrawing(e.touches[0]); }, { passive: false });
  canvas.addEventListener("touchmove", (e) => { e.preventDefault(); draw(e.touches[0]); }, { passive: false });
  canvas.addEventListener("touchend", stopDrawing);
};

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function startDrawing(e) {
  isDrawing = true;
  const pos = getPos(e);
  currentStroke = [{ x: pos.x, y: pos.y, tool: currentTool }];
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  if (currentTool === 'eraser') {
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    ctx.lineWidth = 24;
  } else {
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
    ctx.lineWidth = 3;
  }
  redoStack = [];
}

function draw(e) {
  if (!isDrawing) return;
  const pos = getPos(e);
  currentStroke.push({ x: pos.x, y: pos.y, tool: currentTool });
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;
  ctx.closePath();
  strokes.push(currentStroke);
  currentStroke = [];
}

window._setTool = (tool) => {
  currentTool = tool;
  document.getElementById("tool-pen").classList.toggle("active", tool === 'pen');
  document.getElementById("tool-eraser").classList.toggle("active", tool === 'eraser');
};

window._clearMemo = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes = [];
  redoStack = [];
};

window._memoUndo = () => {
  if (strokes.length === 0) return;
  const lastStroke = strokes.pop();
  redoStack.push(lastStroke);
  redrawCanvas();
};

window._memoRedo = () => {
  if (redoStack.length === 0) return;
  const stroke = redoStack.pop();
  strokes.push(stroke);
  redrawCanvas();
};

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes.forEach(stroke => {
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    if (stroke[0].tool === 'eraser') {
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
      ctx.lineWidth = 24;
    } else {
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
      ctx.lineWidth = 3;
    }
    stroke.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  });
}

/* =========================================================================
   8. 画面描画：記録
   ========================================================================= */
window.renderRecordPage = () => {
  const sessions = getSessions();
  const tMin = todayMinutes();
  const mMin = monthMinutes();
  const s = streak();
  const total = totalMinutes();

  const week = [];
  for (let i=6;i>=0;i--) {
    const d = new Date(Date.now()-i*86400000).toISOString().slice(0,10);
    const m = sessions.filter(x=>x.date===d).reduce((a,b)=>a+b.minutes,0);
    const dayNames = ["日","月","火","水","木","金","土"];
    const dow = dayNames[new Date(d).getDay()];
    week.push({ date:d, min:m, dow });
  }
  const maxMin = Math.max(1, ...week.map(w=>w.min));
  const yMax = Math.max(60, Math.ceil(maxMin/60)*60);

  const recent = sessions.slice().sort((a,b)=>b.ts-a.ts).slice(0,10);

  app.innerHTML = `
    <h1>記録</h1>
    <p class="page-desc">学習の積み重ねを確認しましょう。</p>

    <div class="stat-grid" style="margin-bottom:48px;">
      <div class="stat-card"><div class="label">今日</div><div class="value">${fmtMin(tMin)}</div></div>
      <div class="stat-card"><div class="label">今月</div><div class="value">${fmtMin(mMin)}</div></div>
      <div class="stat-card"><div class="label">連続</div><div class="value">${s}<small style="font-size:16px; font-weight:400; margin-left:4px;">日</small></div></div>
      <div class="stat-card"><div class="label">総学習時間</div><div class="value">${fmtMin(total)}</div></div>
    </div>

    <h2>直近7日間</h2>
    <div class="chart-wrap">
      <div class="chart-y">
        ${[4,3,2,1,0].map(v=>`<span>${v===0?'0分':v+'時間'}</span>`).join("")}
      </div>
      <div class="chart-area">
        <div class="chart-grid">
          ${[0,1,2,3,4].map(()=>`<div class="chart-line"></div>`).join("")}
        </div>
        <div class="chart-bars">
          ${week.map(w => `<div class="chart-bar" title="${fmtMin(w.min)}"><div class="chart-fill" style="height:${(w.min / (yMax)) * 100}%"></div></div>`).join("")}
        </div>
      </div>
    </div>
    <div class="chart-x">
      ${week.map(w=>`<div class="chart-x-label">${w.date.slice(5).replace("-","/")}<br>${w.dow}</div>`).join("")}
    </div>

    <h2 style="margin-top:48px;">最近の学習履歴</h2>
    <div class="history-list">
      ${recent.map(r => {
        const progress = getProgress()[r.label];
        const rate = progress ? Math.round(progress.ratio * 100) : 0;
        return `
          <div class="history-row">
            <div class="history-date">${r.date.slice(5).replace("-","/")}</div>
            <div class="history-subject">${esc(r.subject || "その他")}</div>
            <div class="history-unit">${esc(r.label)}</div>
            <div class="history-bar-wrap">
              <div class="history-bar-fill" style="width:${rate}%"></div>
            </div>
            <div class="history-rate">${rate}%</div>
          </div>
        `;
      }).join("") || '<div style="padding:24px; color:var(--text-muted);">履歴がありません。</div>'}
    </div>

    <h2 style="margin-top:48px;">タイマー</h2>
    <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:32px; text-align:center; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <div style="font-size: 56px; font-weight: 700; font-variant-numeric: tabular-nums; margin-bottom: 32px; letter-spacing: 0.05em;" id="timer-display">00:00</div>
      <div style="display: flex; gap: 16px; justify-content: center;">
        <button class="btn btn-primary" id="timer-toggle">開始</button>
        <button class="btn" id="timer-reset">リセット</button>
        <button class="btn" id="timer-save">記録</button>
      </div>
    </div>
  `;

  let timerInterval = null, timerSeconds = 0, timerRunning = false;
  const display = document.getElementById("timer-display");
  const toggleBtn = document.getElementById("timer-toggle");
  function updateDisplay() {
    const m = String(Math.floor(timerSeconds/60)).padStart(2,"0");
    const sec = String(timerSeconds%60).padStart(2,"0");
    if (display) display.textContent = `${m}:${sec}`;
  }
  updateDisplay();
  if (timerRunning) { toggleBtn.textContent = "一時停止"; } else { toggleBtn.textContent = timerSeconds > 0 ? "再開" : "開始"; }

  toggleBtn.onclick = () => {
    if (timerRunning) {
      timerRunning = false;
      clearInterval(timerInterval);
      toggleBtn.textContent = "再開";
    } else {
      timerRunning = true;
      timerInterval = setInterval(() => { timerSeconds++; updateDisplay(); }, 1000);
      toggleBtn.textContent = "一時停止";
    }
  };
  document.getElementById("timer-reset").onclick = () => {
    timerRunning = false;
    clearInterval(timerInterval);
    timerSeconds = 0;
    updateDisplay();
    toggleBtn.textContent = "開始";
  };
  document.getElementById("timer-save").onclick = () => {
    const min = Math.round(timerSeconds/60);
    if (min > 0) {
      addSession("タイマー学習", "タイマー", min);
      timerSeconds = 0;
      updateDisplay();
      toggleBtn.textContent = "開始";
      timerRunning = false;
      clearInterval(timerInterval);
      window.renderRecordPage();
    } else {
      alert("1分以上計測してください。");
    }
  };
};

/* =========================================================================
   9. 画面描画：プロフィール
   ========================================================================= */
window.renderProfilePage = () => {
  const user = getCurrentUser();
  if (!user) {
    app.innerHTML = `
      <h1>プロフィール</h1>
      <p class="page-desc">アカウントを登録すると、プロフィールを設定できます。</p>
      <div style="display:flex; gap:16px;">
        <button class="btn btn-primary" onclick="openRegister()">会員登録</button>
        <button class="btn" onclick="openLogin()">ログイン</button>
      </div>
    `;
    return;
  }
  const users = getUsers();
  const u = users[user.email];
  const bio = u?.bio || "";
  const av = user.name ? user.name.charAt(0).toUpperCase() : "?";
  
  app.innerHTML = `
    <h1>プロフィール</h1>
    <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:32px; max-width:560px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <div class="profile-header">
        <div class="profile-avatar">${av}</div>
        <div>
          <div style="font-size:24px; font-weight:700; margin-bottom:4px;">${esc(user.name)}</div>
          <div class="muted" style="font-size:14px;">${esc(user.email)}</div>
        </div>
      </div>
      <div class="form-group">
        <label>ユーザー名</label>
        <input type="text" id="pf-name" value="${esc(user.name)}" style="width:100%; padding:12px; border:1px solid var(--border); border-radius:8px; font-family:inherit; font-size:15px; background:var(--bg); color:var(--text);">
      </div>
      <div class="form-group" style="margin-top:20px;">
        <label>自己紹介</label>
        <textarea id="pf-bio" rows="4" style="width:100%; padding:12px; border:1px solid var(--border); border-radius:8px; font-family:inherit; font-size:15px; background:var(--bg); color:var(--text); resize:vertical;">${esc(bio)}</textarea>
      </div>
      <div style="display:flex; gap:16px; margin-top:32px;">
        <button class="btn btn-primary" style="flex:1;" onclick="window.saveProfile()">保存</button>
        <button class="btn" style="flex:1;" onclick="window.doLogout()">ログアウト</button>
      </div>
    </div>
  `;

  window.saveProfile = () => {
    const name = document.getElementById("pf-name").value.trim();
    const bio = document.getElementById("pf-bio").value.trim();
    if (!name) { alert("名前を入力してください"); return; }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(name)) {
      alert("ユーザー名は英数字とアンダーバー(_)のみ、3文字以上20文字以内で入力してください。");
      return;
    }
    updateProfile(name, bio);
    renderAuthButtons();
    alert("プロフィールを更新しました。");
    window.renderProfilePage();
  };

  window.doLogout = () => {
    if (!confirm("ログアウトしますか？")) return;
    logout();
    renderAuthButtons();
    renderSidebarFooter();
    window.navigateTo("home");
  };
};

window.openLogin = () => {
  showModal(`
    <h3 style="margin-bottom:24px; font-size:20px; font-weight:700;">ログイン</h3>
    <div class="form-group" style="margin-bottom:20px;"><label style="display:block; font-size:14px; font-weight:600; margin-bottom:8px; color:var(--text-muted);">メールアドレス</label><input type="email" id="lg-email" style="width:100%; padding:12px; border:1px solid var(--border); border-radius:8px; font-family:inherit; font-size:15px; background:var(--bg); color:var(--text);"></div>
    <div class="form-group" style="margin-bottom:24px;"><label style="display:block; font-size:14px; font-weight:600; margin-bottom:8px; color:var(--text-muted);">パスワード</label><input type="password" id="lg-pass" style="width:100%; padding:12px; border:1px solid var(--border); border-radius:8px; font-family:inherit; font-size:15px; background:var(--bg); color:var(--text);"></div>
    <div style="display:flex; gap:12px; justify-content:flex-end;">
      <button class="btn" onclick="window.closeModal()">キャンセル</button>
      <button class="btn btn-primary" onclick="window.doLogin()">ログイン</button>
    </div>
  `);
  window.doLogin = () => {
    const email = document.getElementById("lg-email").value.trim();
    const pass = document.getElementById("lg-pass").value;
    if (!email || !pass) { alert("メールアドレスとパスワードを入力してください。"); return; }
    const r = loginUser(email, pass);
    if (!r.ok) { alert(r.msg); return; }
    window.closeModal(); renderAuthButtons(); renderSidebarFooter(); window.navigateTo("home");
  };
};

window.openRegister = () => {
  showModal(`
    <h3 style="margin-bottom:24px; font-size:20px; font-weight:700;">会員登録</h3>
    <div class="form-group" style="margin-bottom:20px;"><label style="display:block; font-size:14px; font-weight:600; margin-bottom:8px; color:var(--text-muted);">ユーザー名</label><input type="text" id="rg-name" style="width:100%; padding:12px; border:1px solid var(--border); border-radius:8px; font-family:inherit; font-size:15px; background:var(--bg); color:var(--text);"></div>
    <div class="form-group" style="margin-bottom:20px;"><label style="display:block; font-size:14px; font-weight:600; margin-bottom:8px; color:var(--text-muted);">メールアドレス</label><input type="email" id="rg-email" style="width:100%; padding:12px; border:1px solid var(--border); border-radius:8px; font-family:inherit; font-size:15px; background:var(--bg); color:var(--text);"></div>
    <div class="form-group" style="margin-bottom:20px;"><label style="display:block; font-size:14px; font-weight:600; margin-bottom:8px; color:var(--text-muted);">パスワード</label><input type="password" id="rg-pass" style="width:100%; padding:12px; border:1px solid var(--border); border-radius:8px; font-family:inherit; font-size:15px; background:var(--bg); color:var(--text);"></div>
    <div class="form-group" style="margin-bottom:24px;"><label style="display:block; font-size:14px; font-weight:600; margin-bottom:8px; color:var(--text-muted);">パスワード（確認）</label><input type="password" id="rg-pass-confirm" style="width:100%; padding:12px; border:1px solid var(--border); border-radius:8px; font-family:inherit; font-size:15px; background:var(--bg); color:var(--text);"></div>
    <div style="display:flex; gap:12px; justify-content:flex-end;">
      <button class="btn" onclick="window.closeModal()">キャンセル</button>
      <button class="btn btn-primary" onclick="window.doRegister()">登録</button>
    </div>
  `);
  window.doRegister = () => {
    const name = document.getElementById("rg-name").value.trim();
    const email = document.getElementById("rg-email").value.trim();
    const pass = document.getElementById("rg-pass").value;
    const passConfirm = document.getElementById("rg-pass-confirm").value;
    
    if (!name || !email || !pass || !passConfirm) { alert("全ての項目を入力してください。"); return; }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(name)) {
      alert("ユーザー名は英数字とアンダーバー(_)のみ、3文字以上20文字以内で入力してください。");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("メールアドレスの形式が正しくありません。"); return; }
    if (pass.length < 6) { alert("パスワードは6文字以上にしてください。"); return; }
    if (pass !== passConfirm) { alert("パスワードが一致しません。"); return; }
    
    const r = registerUser(email, pass, name);
    if (!r.ok) { alert(r.msg); return; }
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    
    alert(`【メールアドレス認証】\nあなたのメールアドレス (${email}) に確認コードを送信しました。\n\n確認コード: ${code}`);
    
    showModal(`
      <h3 style="margin-bottom:24px; font-size:20px; font-weight:700;">メールアドレス認証</h3>
      <p class="muted" style="font-size:14px; margin-bottom:20px; text-align:center;">6桁の英数字を入力してください。</p>
      <div class="form-group" style="margin-bottom:24px;"><input type="text" id="verify-code" placeholder="XXXXXX" style="width:100%; padding:16px; border:1px solid var(--border); border-radius:8px; font-family:inherit; font-size:24px; text-align:center; letter-spacing:8px; background:var(--bg); color:var(--text);"></div>
      <div style="display:flex; justify-content:center;">
        <button class="btn btn-primary" onclick="window.doVerify('${code}')" style="width:100%;">認証する</button>
      </div>
    `);
    
    window.doVerify = (expectedCode) => {
      const input = document.getElementById("verify-code").value.trim();
      if (input.toUpperCase() === expectedCode) {
        alert("認証が完了しました！");
        window.closeModal();
        renderAuthButtons();
        renderSidebarFooter();
        window.navigateTo("home");
      } else {
        alert("認証コードが違います。");
      }
    };
  };
};

function showModal(innerHtml) {
  let overlay = document.getElementById("modal-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "modal-overlay";
    overlay.innerHTML = `<div class="modal-content" id="modal-content" style="background:var(--surface); padding:32px; border-radius:16px; width:100%; max-width:480px; box-shadow:0 24px 48px rgba(0,0,0,0.2);"></div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", e => { if (e.target === overlay) window.closeModal(); });
  }
  document.getElementById("modal-content").innerHTML = innerHtml;
  overlay.classList.add("open");
}
window.closeModal = () => {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.classList.remove("open");
};

/* =========================================================================
   10. 初期化
   ========================================================================= */
renderAuthButtons();
renderSidebarFooter();
window.navigateTo("home");
