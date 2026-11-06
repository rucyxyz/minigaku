/* =========================================================================
   1. 学習データ
   ========================================================================= */
const CURRICULUM = {
  "小学生": {
    "算数": {
      "小1": ["10までのかず","いくつといくつ","たしざん(1)","ひきざん(1)","20までのかず","とけい(1)","3つの数の計算","たしざん(2)くり上がり","ひきざん(2)くり下がり","かたちづくり","大きいかず","なんじなんぷん","みずのかさ","1年のまとめ"],
      "小2": ["グラフとひょう","たし算の筆算","ひき算の筆算","長さのたんい(cm/mm)","3けたの数","水の量(L/dL/mL)","たし算とひき算の文章題","かけ算の準備","かけ算九九(1)","かけ算九九(2)","長方形と正方形","4けたの数","分数のはじまり","長さ(m)","たし算とひき算の工夫","どけい(午前/午後/時間)","2年のまとめ"],
      "小3": ["かけ算のきまりと筆算","わり算","時こくと時間","万の位と大きな数","長さ(km)","あまりのあるわり算","足し算と引き算の筆算","小数の仕組み","分数の仕組み","円と球","三角形と角","重さ(g/kg)","棒グラフと表","3年のまとめ"],
      "小4": ["大きい数の仕組み","割り算の筆算","角の大きさ（度）","１つの式と計算のきまり","折れ線グラフ","小数の足し算・引き算","小数の掛け算・割り算","面積","分数の大きさと計算","変わり方調べ","がい数","垂直・平行と四角形","直方体と立方体","4年のまとめ"],
      "小5": ["整数と小数の仕組み","体積","比例の関係","小数のかけ算","小数のわり算","合同な図形","図形の角の和","偶数と奇数・倍数と約数","分数の大きさと通分","分数のたし算・ひき算","平均の出し方","単位量あたりの大きさ","速さ・時間・道のり","割合とグラフ","円周と正多角形","角柱と円柱","5年のまとめ"],
      "小6": ["対称な図形","文字と式","分数のかけ算","分数のわり算","比の性質と利用","拡大図と縮図","円の面積","角柱と円柱の体積","およその面積と体積","並べ方と組み合わせ","データの活用","6年のまとめ"]
    },
    "理科": {
      "小3": ["身の回りの生物","チョウの育ち方","太陽と地面","風とゴムの力","光の性質","音の性質","物と重さ","電気の通り道"],
      "小4": ["季節と生き物","人の体のつくりと運動","空気と水の性質","月と星の動き","水の姿の変化","あたたかさと水の変化","電気の働き","天気の変化","金属・水・空気の温まり方","4年のまとめ"],
      "小5": ["天気の変化(1)","植物の発芽と成長","魚の誕生","ヒトの誕生","台風と気象","流れる水の働きと土地の変化","物の溶け方","振り子の運動"],
      "小6": ["物の燃え方と空気","ヒトの体のつくりと息","植物の体と水の通り道","生き物と環境","大地のつくりと変化","てこの規則性","電気の利用","月と太陽"]
    },
    "社会": {
      "小3": ["学校の周り","市の様子","店ではたらく人","工場ではたらく人","農家ではたらく人","火事からくらしを守る","事故や事件から守る","古い道具と昔のくらし"],
      "小4": ["ゴミの処理と利用","安全な水をつくる","自然災害からくらしを守る","郷土の伝統・文化","郷土を発展させた人々","県の様子","特色ある地域のくらし","4年のまとめ"],
      "小5": ["日本の国土と環境","水産業の盛んな地域","米づくりの盛んな地域","自動車工業の歩み","これからの工業生産と貿易","情報化した社会とくらし"],
      "小6": ["縄文から平安時代","鎌倉から江戸時代","明治維新から現代の日本","国の政治の仕組みと日本国憲法","震災復興と震災対策","世界の中の日本と国際協力"]
    },
    "漢字": {
      "小1": ["ひらがなの読み書き","カタカナの読み書き","かん字","ことばのきまり","おはなしのどっかい(1)","おはなしのどっかい(2)","せつめいする文章(1)","せつめいする文章(2)","うたと言葉","1年のまとめ"],
      "小2": ["かん字の読み書き","同じ部首の漢字","主語と述語","かたかなで書く言葉","反対の言葉・似た言葉","言葉のきまり","物語の読解(1)","物語の読解(2)","説明文の読解(1)","説明文の読解(2)","詩の味わい","伝統的な言葉","日記や作文のきまり","2年のまとめ"],
      "小3": ["漢字の読み書き","主語と述語","ローマ字","辞書の使い方","物語の読解","説明文の読解","詩・短歌","ことわざ・慣用句","言葉のきまり","3年のまとめ"],
      "小4": ["漢字の読み書き","部首と漢字の成り立ち","つなぎ言葉","修飾語","物語の読解","説明文の読解","慣用句・熟語","落語・昔の言葉","言葉のきまり","4年のまとめ"],
      "小5": ["漢字の読み書き","複合語・和語・漢語・外来語","敬語の決まり","事実と感想","物語の読解","説明文の読解","古典の世界","環境や社会に関する文章の読解","言葉のきまり","5年のまとめ"],
      "小6": ["漢字の読み書き","言葉の由来","文の組み立てと文章の構成","主張と事例の読み取り","物語の読解","説明文・論説文の読解","古典の世界","詩の表現と鑑賞","言葉のきまり","6年のまとめ"]
    }
  },
  "中学生": {
    "数学": {
      "中1": ["正の数・負の数","文字の式","一元一次方程式","比例と反比例","平面図形","空間図形","データの活用"],
      "中2": ["式の計算","連立方程式","1次関数","平行線と角・多角形","三角形と四角形の証明","確率","データの比較"],
      "中3": ["多項式の計算・因数分解","平方根","2次方程式","関数 y=ax²","図形と相似","円周角の定理","三平方の定理"]
    },
    "理科": {
      "中1": ["植物の分類","動物の仲間","身の回りの物質","水溶液の性質","状態変化","光の性質","音の性質","力の性質"],
      "中2": ["物質の成り立ち","化学変化と質量","生物と細胞","植物・動物の体の仕組み","気象の観測と天気の変化","前線と日本の天気","電流の性質","電流と磁界"],
      "中3": ["水溶液とイオン","化学変化と電池","生命の連続性","生物と環境","物体の運動と力","仕事とエネルギー","地球の自転・公転と星の動き","太陽系と宇宙"]
    },
    "社会": {
      "中1": ["世界の地域区分","世界の気候","世界の諸地域","日本の地形・気候","日本の諸地域","古代文明","飛鳥・奈良・平安","鎌倉・室町","安土桃山・江戸前期","世界の動きと近世日本"],
      "中2": ["日本の産業と人口","九州・中国四国・近畿地方","中部・関東・東北・北海道地方","欧米の進出と開国","明治維新と不平等条約改正","日清・日露戦争と近代産業","第一次世界大戦と大正デモクラシー","世界恐慌と第二次世界大戦","戦後の歩みと現代の日本","定期テスト地理歴史総合"],
      "中3": ["現代社会と私たちのくらし","日本国憲法と人権","民主政治と国会・内閣・裁判所","地方自治の仕組み","市場経済と価格","生産と労働・金融","政府の役割と社会保障","国際社会の課題","これからの地球社会と日本","定期テスト公民総合"]
    },
    "国語": {
      "中1": ["現代文の読解(説明文)","現代文の読解(小説)","古文・漢文の基礎","詩・短歌・俳句","漢字・語彙","文法","書記・敬語のきまり","1年のまとめ"],
      "中2": ["現代文の読解(説明文)","現代文の読解(小説)","古典の読解","短歌・俳句の鑑賞","漢字・四字熟語","文法","表現の工夫","2年のまとめ"],
      "中3": ["現代文の読解(論説文)","現代文の読解(小説・随筆)","古典の読解","近代の詩歌","漢字・類義語・対義語","文法","入試対策総合読解","3年のまとめ"]
    },
    "英語": {
      "中1": ["アルファベット・単語","be動詞","一般動詞","複数形と代名詞","助動詞(can)","命令文・疑問詞","現在進行形","過去形","単語・熟語","日常英会話"],
      "中2": ["過去進行形","未来の文","助動詞","不定詞","動名詞","比較","接続詞","ユニバーサル単語・熟語","長文読解","2年のまとめ"],
      "中3": ["現在完了形","受け身","心理を表す文・現在進行形","後置修飾","関係代名詞","仮定法","間接疑問文・重要構文","入試必須単語・熟語","長文読解","3年のまとめ"]
    }
  },
  "高校生": {
    "数学I": { "高1": ["数と式","集合と命題","2次関数","図形と計量","データの分析"] },
    "数学A": { "高1": ["場合の数と確率","図形の性質","整数の性質"] },
    "英語": { "高1": ["時制","助動詞","受動態","不定詞","動名詞・分詞","比較","関係詞","仮定法","否定・強調・倒置","英文法総合演習","高校必須英単語・熟語","長文読解演習"] },
    "物理基礎": { "高1": ["物体の運動","力と運動","仕事とエネルギー","熱","波","電気とエネルギー"] },
    "化学基礎": { "高1": ["物質の構成","物質の構成粒子","化学結合","物質量と化学反応式","酸と塩基の反応","酸化還元反応"] }
  }
};

// 問題データ（今回はデモ生成。次回以降、単元ごとの本物の四択問題に差し替え）
function generateQuestions(unitName) {
  const templates = [
    { q: `「${unitName}」について正しいものはどれですか？`, opts: ["選択肢A","選択肢B","選択肢C","選択肢D"], a: 0 },
    { q: `「${unitName}」を学ぶ上で重要なポイントはどれですか？`, opts: ["暗記","理解","無視","放置"], a: 1 },
    { q: `「${unitName}」の例として適切なものはどれですか？`, opts: ["例1","例2","例3","例4"], a: 2 },
    { q: `「${unitName}」に関する計算問題です。`, opts: ["1","2","3","4"], a: 3 },
    { q: `「${unitName}」の応用として正しいのはどれですか？`, opts: ["応用A","応用B","応用C","応用D"], a: 0 },
    { q: `「${unitName}」のまとめとして正しいものは？`, opts: ["まとめ1","まとめ2","まとめ3","まとめ4"], a: 1 },
    { q: `「${unitName}」で注意すべき点は？`, opts: ["注意1","注意2","注意3","注意4"], a: 2 },
    { q: `「${unitName}」の発展問題です。`, opts: ["発展A","発展B","発展C","発展D"], a: 0 },
    { q: `「${unitName}」の確認テストです。`, opts: ["確認1","確認2","確認3","確認4"], a: 1 },
    { q: `「${unitName}」の総まとめ問題です。`, opts: ["総まとめA","総まとめB","総まとめC","総まとめD"], a: 2 }
  ];
  return templates;
}

/* =========================================================================
   2. ストレージ
   ========================================================================= */
const KEYS = {
  THEME:"sf.theme", PROGRESS:"sf.progress", SESSIONS:"sf.sessions", USER:"sf.user", USERS:"sf.users",
  LAST:"sf.last", TODOS:"sf.todos"
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

/* アカウント */
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
  if (users[cur.email]) { users[cur.email].name = name; users[cur.email].bio = bio; save(KEYS.USERS, users); }
  setCurrentUser({ ...cur, name });
}

/* 挨拶（時間帯＋名前） */
function greetingBase() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "おはようございます。";
  if (hour >= 11 && hour < 18) return "こんにちは。";
  return "こんばんは。今日も一日お疲れ様です。";
}
function greetingWithName() {
  const user = getCurrentUser();
  const base = greetingBase();
  if (!user) return base;
  return `${user.name}さん、${base}`;
}

/* 連続学習日数から称号 */
function rankFromStreak(days) {
  if (days >= 100) return "👑 100日達成";
  if (days >= 30) return "💎 30日連続";
  if (days >= 14) return "🌟 14日連続";
  if (days >= 7) return "🔥 7日連続";
  if (days >= 3) return "🔥 3日連続";
  if (days >= 1) return "✨ 学習スタート";
  return "🌱 はじめの一歩";
}

/* 学習記録 */
function getProgress() { return load(KEYS.PROGRESS, {}); }
function setProgress(id, correct, total) {
  const p = getProgress();
  p[id] = { correct, total, ratio: total?correct/total:0, date:todayStr() };
  save(KEYS.PROGRESS, p);
}
function getSessions() { return load(KEYS.SESSIONS, []); }
function addSession(label, minutes) {
  if (minutes<=0) return;
  const arr = getSessions();
  arr.push({ date:todayStr(), label, minutes, ts:Date.now() });
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

/* 前回の続き */
function getLastStudy() { return load(KEYS.LAST, null); }
function setLastStudy(obj) { save(KEYS.LAST, obj); }

/* ToDo */
function getTodos() { return load(KEYS.TODOS, []); }
function saveTodos(arr) { save(KEYS.TODOS, arr); }

/* =========================================================================
   3. 画面描画
   ========================================================================= */
const app = document.getElementById("app");
const pageTitle = document.getElementById("page-title");

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
    renderNav("home"); pageTitle.textContent = "ホーム"; window.renderHomePage();
  } else if (pageId === "learn") {
    renderNav("learn"); pageTitle.textContent = "学習"; window.renderLearnIndex();
  } else if (pageId === "record") {
    renderNav("record"); pageTitle.textContent = "記録"; window.renderRecordPage();
  } else if (pageId === "profile") {
    renderNav(""); pageTitle.textContent = "プロフィール"; window.renderProfilePage();
  }
};

/* 達成率計算（全単元数・達成単元数） */
function allUnitCount() {
  return Object.values(CURRICULUM).reduce((a,stage)=>
    a+Object.values(stage).reduce((b,sub)=>
      b+Object.values(sub).reduce((c,grade)=>c+grade.length,0),0),0);
}
function doneUnitCount() {
  const p = getProgress();
  return Object.values(p).filter(r=>r.ratio>=0.8).length;
}

/* 円形プログレス */
function ringSvg(percent, size=64, stroke=6) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(100, Math.max(0, percent)) / 100);
  return `
    <svg class="ring-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="ring-bg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"></circle>
      <circle class="ring-fg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"
        stroke-dasharray="${c}" stroke-dashoffset="${offset}"></circle>
    </svg>
    <div class="ring-label">${Math.round(percent)}%</div>
  `;
}

/* ホーム */
window.renderHomePage = () => {
  const tMin = todayMinutes();
  const s = streak();
  const total = allUnitCount();
  const done = doneUnitCount();
  const percent = total ? (done/total)*100 : 0;
  const last = getLastStudy();
  const badge = rankFromStreak(s);

  app.innerHTML = `
    <h1 style="display:flex; align-items:center; flex-wrap:wrap;">
      <span class="rank-badge">${badge}</span>
      <span>${esc(greetingWithName())}</span>
    </h1>
    <p class="page-desc">今日も少しずつ、学習を進めましょう。</p>

    <div class="stat-grid">
      <div class="stat-card"><div class="label">今日の学習</div><div class="value">${fmtMin(tMin)}</div></div>
      <div class="stat-card"><div class="label">連続学習</div><div class="value">${s}<small style="font-size:16px; font-weight:400; margin-left:4px;">日</small></div></div>
      <div class="stat-card achievement">
        <div class="ring-wrap">${ringSvg(percent)}</div>
        <div class="achievement-text">
          <div class="label">達成単元</div>
          <div class="value">${done}<small style="font-size:16px; font-weight:400; margin-left:4px;"> / ${total}</small></div>
        </div>
      </div>
    </div>

    <div style="margin-top:40px;">
      <button class="btn btn-primary" onclick="window.navigateTo('learn')">学習をはじめる</button>
    </div>

    <div class="resume-card">
      <div class="resume-left">
        <div class="resume-label">前回の続き</div>
        ${last
          ? `<div class="resume-title">${esc(last.unit)}</div>
             <div class="resume-meta">${esc(last.subject||"")}${last.rate!=null?` ・ 前回 ${last.rate}%`:""}</div>`
          : `<div class="resume-title muted">まだ学習履歴がありません</div>
             <div class="resume-meta">「学習をはじめる」から最初の単元を選びましょう</div>`}
      </div>
      ${last
        ? `<button class="btn btn-primary resume-btn" onclick="window.renderQuizPage('${esc(last.unit)}','${esc(last.subject||"")}')">再開する</button>`
        : `<button class="btn resume-btn" onclick="window.navigateTo('learn')">単元を選ぶ</button>`}
    </div>

    <div class="todo-section">
      <h2>今日やること</h2>
      <div class="todo-card">
        <div class="todo-input-row">
          <input class="todo-input" id="todo-input" placeholder="例：宿題のプリントをやる / 明日のテスト勉強">
          <button class="todo-add" onclick="window.addTodo()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14M5 12h14"/></svg>
            追加
          </button>
        </div>
        <ul class="todo-list" id="todo-list"></ul>
      </div>
    </div>
  `;

  document.getElementById("todo-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") window.addTodo();
  });
  window.renderTodos();
};

window.renderTodos = () => {
  const list = document.getElementById("todo-list");
  if (!list) return;
  const todos = getTodos();
  if (!todos.length) {
    list.innerHTML = `<li class="todo-empty">今日やることを追加してみましょう。</li>`;
    return;
  }
  list.innerHTML = todos.map((t, i) => `
    <li class="todo-item ${t.done?'done':''}">
      <button class="todo-check" onclick="window.toggleTodo(${i})">${t.done?'✓':''}</button>
      <span class="todo-text">${esc(t.text)}</span>
      <button class="todo-del" onclick="window.deleteTodo(${i})">×</button>
    </li>
  `).join("");
};
window.addTodo = () => {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (!text) return;
  const todos = getTodos();
  todos.push({ text, done:false, date: todayStr() });
  saveTodos(todos);
  input.value = "";
  window.renderTodos();
};
window.toggleTodo = (i) => {
  const todos = getTodos();
  todos[i].done = !todos[i].done;
  saveTodos(todos);
  window.renderTodos();
};
window.deleteTodo = (i) => {
  const todos = getTodos();
  todos.splice(i,1);
  saveTodos(todos);
  window.renderTodos();
};

/* 学習トップ */
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
        <a class="eboard-subject" onclick="window.renderSubjectPage('${stage}','${subject}')">
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

/* 教科ページ */
window.renderSubjectPage = (stage, subject) => {
  pageTitle.textContent = subject;
  const subjectData = CURRICULUM[stage][subject];
  const grades = Object.keys(subjectData);
  const activeGrade = grades[0];

  const p = getProgress();
  const allUnits = grades.flatMap(g => subjectData[g]);
  const doneCount = allUnits.filter(u => p[u] && p[u].ratio >= 0.8).length;
  const rate = allUnits.length ? Math.round(doneCount/allUnits.length*100) : 0;

  app.innerHTML = `
    <div class="unit-header">
      <span onclick="window.navigateTo('learn')">教科一覧</span> &nbsp;/&nbsp; ${esc(subject)}
    </div>
    <div class="unit-layout">
      <div class="unit-sidebar">
        <div class="unit-sidebar-title">${esc(subject)}</div>
        <div class="progress-ring">${rate}%</div>
      </div>
      <div class="unit-main">
        <div class="unit-tabs" id="unit-tabs">
          ${grades.map(g => `<div class="unit-tab ${g===activeGrade?'active':''}" onclick="window.switchGrade(this,'${stage}','${subject}','${g}')">${g}</div>`).join("")}
        </div>
        <ul class="unit-list" id="unit-list"></ul>
      </div>
    </div>
  `;
  window.drawUnits(stage, subject, activeGrade);
};

window.switchGrade = (el, stage, subject, grade) => {
  document.querySelectorAll(".unit-tab").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
  window.drawUnits(stage, subject, grade);
};

window.drawUnits = (stage, subject, grade) => {
  const units = CURRICULUM[stage][subject][grade] || [];
  const p = getProgress();
  const list = document.getElementById("unit-list");
  list.innerHTML = units.map((u, i) => {
    const r = p[u];
    const rate = r ? Math.round(r.ratio*100) : null;
    const done = rate != null && rate >= 80;
    return `
      <li>
        <div class="unit-item" onclick="window.renderQuizPage('${esc(u)}','${esc(subject)}')">
          <div class="unit-icon ${done?'done':''}">${done?'✓':i+1}</div>
          <div class="unit-text">${esc(u)}</div>
          <div class="unit-rate">${rate!=null?`${rate}%`:"—"}</div>
        </div>
      </li>
    `;
  }).join("");
};

/* クイズ */
window.renderQuizPage = (unitTitle, subject) => {
  pageTitle.textContent = unitTitle;
  const questions = generateQuestions(unitTitle);
  let currentQ = 0;
  let selected = null;
  let answers = [];
  let startTime = Date.now();

  function draw() {
    if (currentQ >= questions.length) {
      const correct = answers.filter(a => a === true).length;
      const total = questions.length;
      const rate = Math.round((correct/total)*100);
      setProgress(unitTitle, correct, total);
      addSession(unitTitle, Math.max(1, Math.round((Date.now()-startTime)/60000)));
      setLastStudy({ unit: unitTitle, subject: subject || "", rate });

      app.innerHTML = `
        <div style="max-width:640px; margin:0 auto;">
          <div style="text-align:center; padding:48px 0; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); box-shadow:0 4px 20px rgba(0,0,0,0.05);">
            <h1 style="font-size:40px; margin-bottom:16px;">${correct} <span style="font-size:24px;color:var(--text-muted)">/ ${total}</span></h1>
            <p style="font-size:18px; font-weight:600; color:var(--text-muted); margin-bottom:48px;">正答率: ${rate}%</p>
            <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="window.navigateTo('learn')">次の単元へ</button>
              <button class="btn" onclick="window.renderQuizPage('${esc(unitTitle)}','${esc(subject||"")}')">もう一度</button>
              <button class="btn" onclick="window.navigateTo('home')">ホームへ</button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const q = questions[currentQ];
    const progressPercent = (currentQ/questions.length)*100;
    const correctCount = answers.filter(a => a === true).length;
    const accuracy = answers.length > 0 ? Math.round((correctCount/answers.length)*100) : 0;

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
            <div class="quiz-track"><div class="quiz-fill" style="width:${progressPercent}%"></div></div>
            <div class="quiz-stat">${currentQ+1}/${questions.length}</div>
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
              return `<button class="${cls}" onclick="window._sel(${i})" ${selected!==null?"disabled":""}>${esc(opt)}</button>`;
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
      setTimeout(() => { currentQ++; selected = null; draw(); }, 800);
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
          <div class="memo-canvas-wrap"><canvas class="memo-canvas" id="memo-canvas"></canvas></div>
          <div class="memo-tools">
            <button class="memo-tool active" id="tool-pen" onclick="window._setTool('pen')">
              <svg viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>ペン
            </button>
            <button class="memo-tool" id="tool-eraser" onclick="window._setTool('eraser')">
              <svg viewBox="0 0 24 24"><path d="M20 20H7L3 16l9-9 8 8-2 2z"></path><path d="M6 11l9 9"></path></svg>消しゴム
            </button>
            <button class="memo-tool" onclick="window._memoUndo()">
              <svg viewBox="0 0 24 24"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>戻る
            </button>
            <button class="memo-tool" onclick="window._memoRedo()">
              <svg viewBox="0 0 24 24"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>進む
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

/* メモ */
let canvas, ctx, isDrawing = false, currentTool = 'pen';
let strokes = [], currentStroke = [], redoStack = [];
window._initCanvas = () => {
  canvas = document.getElementById("memo-canvas");
  ctx = canvas.getContext("2d");
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width; canvas.height = rect.height;
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);
  canvas.addEventListener("touchstart", (e)=>{e.preventDefault();startDrawing(e.touches[0]);},{passive:false});
  canvas.addEventListener("touchmove", (e)=>{e.preventDefault();draw(e.touches[0]);},{passive:false});
  canvas.addEventListener("touchend", stopDrawing);
};
function getPos(e){ const r=canvas.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; }
function startDrawing(e){
  isDrawing=true; const pos=getPos(e);
  currentStroke=[{x:pos.x,y:pos.y,tool:currentTool}];
  ctx.beginPath(); ctx.moveTo(pos.x,pos.y);
  if(currentTool==='eraser'){ ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(); ctx.lineWidth=24; }
  else { ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--text').trim(); ctx.lineWidth=3; }
  redoStack=[];
}
function draw(e){
  if(!isDrawing) return;
  const pos=getPos(e); currentStroke.push({x:pos.x,y:pos.y,tool:currentTool});
  ctx.lineTo(pos.x,pos.y); ctx.stroke();
}
function stopDrawing(){ if(!isDrawing) return; isDrawing=false; ctx.closePath(); strokes.push(currentStroke); currentStroke=[]; }
window._setTool = (tool) => {
  currentTool = tool;
  document.getElementById("tool-pen").classList.toggle("active", tool==='pen');
  document.getElementById("tool-eraser").classList.toggle("active", tool==='eraser');
};
window._clearMemo = () => { ctx.clearRect(0,0,canvas.width,canvas.height); strokes=[]; redoStack=[]; };
window._memoUndo = () => { if(!strokes.length) return; redoStack.push(strokes.pop()); redrawCanvas(); };
window._memoRedo = () => { if(!redoStack.length) return; strokes.push(redoStack.pop()); redrawCanvas(); };
function redrawCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  strokes.forEach(stroke=>{
    ctx.beginPath(); ctx.moveTo(stroke[0].x,stroke[0].y);
    if(stroke[0].tool==='eraser'){ ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(); ctx.lineWidth=24; }
    else { ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--text').trim(); ctx.lineWidth=3; }
    stroke.forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke();
  });
}

/* 記録 */
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

  // 最近の履歴（日付・教科・単元・正答率）
  const p = getProgress();
  const history = Object.entries(p)
    .sort((a,b)=> (b[1].date||"").localeCompare(a[1].date||""))
    .slice(0,10)
    .map(([unit, r]) => ({ unit, subject:"", rate: Math.round((r.ratio||0)*100), date: r.date }));

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
      <div class="chart-y">${[4,3,2,1,0].map(v=>`<span>${v===0?'0分':v+'時間'}</span>`).join("")}</div>
      <div class="chart-area">
        <div class="chart-grid">${[0,1,2,3,4].map(()=>`<div class="chart-line"></div>`).join("")}</div>
        <div class="chart-bars">
          ${week.map(w=>`<div class="chart-bar" title="${fmtMin(w.min)}"><div class="chart-fill" style="height:${(w.min/(4*60))*100}%"></div></div>`).join("")}
        </div>
      </div>
    </div>
    <div class="chart-x">${week.map(w=>`<div class="chart-x-label">${w.date.slice(5).replace("-","/")}<br>${w.dow}</div>`).join("")}</div>

    <h2 style="margin-top:48px;">タイマー</h2>
    <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:32px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
      <div style="font-size:56px; font-weight:700; font-variant-numeric:tabular-nums; margin-bottom:32px; letter-spacing:0.05em;" id="timer-display">00:00</div>
      <div style="display:flex; gap:16px; justify-content:center;">
        <button class="btn btn-primary" id="timer-toggle">開始</button>
        <button class="btn" id="timer-reset">リセット</button>
        <button class="btn" id="timer-save">記録</button>
      </div>
    </div>

    <h2 style="margin-top:48px;">最近の学習履歴</h2>
    <div class="history-list">
      ${history.length ? history.map(r=>`
        <div class="history-row">
          <div class="history-date">${esc(r.date||"")}</div>
          <div class="history-subject">${esc(r.subject||"—")}</div>
          <div class="history-unit">${esc(r.unit)}</div>
          <div class="history-rate">
            <div class="history-bar"><div class="history-bar-fill" style="width:${r.rate}%"></div></div>
            <div class="history-rate-num">${r.rate}%</div>
          </div>
        </div>
      `).join("") : `<div style="padding:24px; color:var(--text-muted);">履歴がありません。</div>`}
    </div>
  `;

  let timerInterval=null, timerSeconds=0, timerRunning=false;
  const display=document.getElementById("timer-display");
  const toggleBtn=document.getElementById("timer-toggle");
  function updateDisplay(){
    const m=String(Math.floor(timerSeconds/60)).padStart(2,"0");
    const sec=String(timerSeconds%60).padStart(2,"0");
    if(display) display.textContent=`${m}:${sec}`;
  }
  updateDisplay();
  toggleBtn.textContent = timerRunning ? "一時停止" : (timerSeconds>0?"再開":"開始");
  toggleBtn.onclick = () => {
    if(timerRunning){ timerRunning=false; clearInterval(timerInterval); toggleBtn.textContent="再開"; }
    else { timerRunning=true; timerInterval=setInterval(()=>{timerSeconds++;updateDisplay();},1000); toggleBtn.textContent="一時停止"; }
  };
  document.getElementById("timer-reset").onclick = () => {
    timerRunning=false; clearInterval(timerInterval); timerSeconds=0; updateDisplay(); toggleBtn.textContent="開始";
  };
  document.getElementById("timer-save").onclick = () => {
    const min=Math.round(timerSeconds/60);
    if(min>0){
      addSession("タイマー学習",min);
      timerSeconds=0; updateDisplay(); toggleBtn.textContent="開始";
      timerRunning=false; clearInterval(timerInterval);
      window.renderRecordPage();
    } else { alert("1分以上計測してください。"); }
  };
};

/* プロフィール */
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
    <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:32px; max-width:560px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
      <div class="profile-header">
        <div class="profile-avatar">${av}</div>
        <div>
          <div style="font-size:24px; font-weight:700; margin-bottom:4px;">${esc(user.name)}</div>
          <div class="muted" style="font-size:14px;">${esc(user.email)}</div>
        </div>
      </div>
      <div class="form-group">
        <label>ユーザー名</label>
        <input type="text" id="pf-name" value="${esc(user.name)}">
      </div>
      <div class="form-group" style="margin-top:20px;">
        <label>自己紹介</label>
        <textarea id="pf-bio" rows="4" style="resize:vertical;">${esc(bio)}</textarea>
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
    logout(); renderAuthButtons(); renderSidebarFooter(); window.navigateTo("home");
  };
};

/* 認証モーダル */
window.openLogin = () => {
  showModal(`
    <h3 style="margin-bottom:24px; font-size:20px; font-weight:700;">ログイン</h3>
    <div class="form-group" style="margin-bottom:20px;"><label>メールアドレス</label><input type="email" id="lg-email"></div>
    <div class="form-group" style="margin-bottom:24px;"><label>パスワード</label><input type="password" id="lg-pass"></div>
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
    <div class="form-group" style="margin-bottom:20px;"><label>ユーザー名</label><input type="text" id="rg-name"></div>
    <div class="form-group" style="margin-bottom:20px;"><label>メールアドレス</label><input type="email" id="rg-email"></div>
    <div class="form-group" style="margin-bottom:20px;"><label>パスワード</label><input type="password" id="rg-pass"></div>
    <div class="form-group" style="margin-bottom:24px;"><label>パスワード（確認）</label><input type="password" id="rg-pass-confirm"></div>
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
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(name)) { alert("ユーザー名は英数字とアンダーバー(_)のみ、3文字以上20文字以内で入力してください。"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("メールアドレスの形式が正しくありません。"); return; }
    if (pass.length < 6) { alert("パスワードは6文字以上にしてください。"); return; }
    if (pass !== passConfirm) { alert("パスワードが一致しません。"); return; }
    const r = registerUser(email, pass, name);
    if (!r.ok) { alert(r.msg); return; }
    window.closeModal(); renderAuthButtons(); renderSidebarFooter(); window.navigateTo("home");
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

renderAuthButtons();
renderSidebarFooter();
window.navigateTo("home");
