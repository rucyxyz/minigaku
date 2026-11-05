const app = document.getElementById("app");
const pageTitle = document.getElementById("page-title");

const KEYS = { THEME:"sf.theme", PROGRESS:"sf.progress", SESSIONS:"sf.sessions", USER:"sf.user", USERS:"sf.users", TODOS:"sf.todos", LAST_QUIZ:"sf.last_quiz" };
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
  if (pageId === "home") { renderNav("home"); pageTitle.textContent = "ホーム"; window.renderHomePage(); }
  else if (pageId === "learn") { renderNav("learn"); pageTitle.textContent = "学習"; window.renderLearnIndex(); }
  else if (pageId === "record") { renderNav("record"); pageTitle.textContent = "記録"; window.renderRecordPage(); }
  else if (pageId === "profile") { renderNav(""); pageTitle.textContent = "プロフィール"; window.renderProfilePage(); }
};

window.renderHomePage = () => {
  const tMin = todayMinutes();
  const s = streak();
  const p = getProgress();
  let totalUnits = 0;
  for (const stage of Object.values(CURRICULUM)) {
    for (const subject of Object.values(stage)) {
      for (const gradeUnits of Object.values(subject)) totalUnits += gradeUnits.length;
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
      <div class="stat-card"><div class="stat-info"><div class="label">今日の学習</div><div class="value">${fmtMin(tMin)}</div></div></div>
      <div class="stat-card"><div class="stat-info"><div class="label">連続学習</div><div class="value">${s}<small style="font-size:16px; font-weight:400; margin-left:4px;">日</small></div></div></div>
      <div class="stat-card">
        <div class="stat-info"><div class="label">達成単元</div><div class="value">${doneUnits}<small style="font-size:16px; font-weight:400; margin-left:4px;"> / ${totalUnits}</small></div></div>
        <div class="progress-circle-wrap">
          <svg><circle class="bg" cx="30" cy="30" r="${radius}"></circle><circle class="bar" cx="30" cy="30" r="${radius}" stroke-dasharray="${strokeDasharray}"></circle></svg>
          <div class="progress-circle-text">${percent}%</div>
        </div>
      </div>
    </div>

    <div class="action-area">
      <button class="btn btn-primary btn-large" onclick="window.navigateTo('learn')">学習をはじめる</button>
      ${resumeBtnHtml}
    </div>

    <div class="checklist">
      <div class="checklist-header"><div class="checklist-title">今日やること</div></div>
      <div class="checklist-input-wrap">
        <input type="text" class="checklist-input" id="todo-input" placeholder="例：宿題のプリントをやる">
        <button class="checklist-add-btn" onclick="window.addTodo()">＋</button>
      </div>
      <div id="todo-list">${todoHtml || '<p class="muted" style="font-size:14px; text-align:center; padding:16px 0;">今日の目標を追加しましょう</p>'}</div>
    </div>
  `;
};

window.addTodo = () => {
  const input = document.getElementById("todo-input"); const text = input.value.trim(); if (!text) return;
  const todos = load(KEYS.TODOS, []); todos.push({ text, done: false }); save(KEYS.TODOS, todos); input.value = ""; window.renderHomePage();
};
window.toggleTodo = (i) => { const todos = load(KEYS.TODOS, []); todos[i].done = !todos[i].done; save(KEYS.TODOS, todos); window.renderHomePage(); };
window.deleteTodo = (i) => { const todos = load(KEYS.TODOS, []); todos.splice(i, 1); save(KEYS.TODOS, todos); window.renderHomePage(); };

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
  let totalUnits = 0, doneUnits = 0;
  for (const g of grades) {
    for (const u of subjectData[g]) {
      totalUnits++;
      if (p[u.title] && p[u.title].ratio >= 0.8) doneUnits++;
    }
  }
  const percent = totalUnits ? Math.round((doneUnits / totalUnits) * 100) : 0;

  let html = `
    <div class="unit-header"><span onclick="window.navigateTo('learn')">教科一覧</span> &nbsp;/&nbsp; ${esc(subject)}</div>
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

window.renderQuizPage = (unitTitle, stage, subject, grade, unitIndex) => {
  pageTitle.textContent = unitTitle;
  const unitData = CURRICULUM[stage][subject][grade][unitIndex];
  const questions = unitData.questions;
  save(KEYS.LAST_QUIZ, { title: unitTitle, stage, subject, grade, index: unitIndex });

  let currentQ = 0, selected = null, answers = [], startTime = Date.now();

  function draw() {
    if (currentQ >= questions.length) {
      const correct = answers.filter(a => a === true).length;
      const total = questions.length;
      const rate = Math.round((correct / total) * 100);
      setProgress(unitTitle, correct, total);
      addSession(unitTitle, subject, Math.max(1, Math.round((Date.now() - startTime) / 60000)));

      app.innerHTML = `
        <div style="max-width: 640px; margin: 0 auto;">
          <div style="text-align:center; padding: 48px 0; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <h1 style="font-size: 40px; margin-bottom: 16px;">${correct} <span style="font-size:24px;color:var(--text-muted)">/ ${total}</span></h1>
            <p style="font-size: 18px; font-weight: 600; color: var(--text-muted); margin-bottom: 48px;">正答率: ${rate}%</p>
            <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="window.navigateTo('learn')">次の単元へ</button>
              <button class="btn" onclick="window.renderQuizPage('${esc(unitTitle)}', '${stage}', '${subject}', '${grade}', ${unitIndex})">もう一度</button>
              <button class="btn" onclick="window.navigateTo('learn')">メニューへ</button>
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
        <div class="unit-header"><span onclick="window.navigateTo('learn')">教科一覧</span> &nbsp;/&nbsp; ${esc(unitTitle)}</div>
        <div class="quiz-container">
          <div class="quiz-header">
            <button class="quiz-close" onclick="window.navigateTo('learn')">×</button>
            <div class="quiz-title">${esc(unitTitle)}</div>
            <div style="width:24px;"></div>
          </div>
          <div class="quiz-progress-bar">
            <div class="quiz-track"><div class="quiz-fill" style="width: ${progressPercent}%"></div></div>
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

    window._closeMemo = () => { const modal = document.getElementById("memo-modal"); if (modal) modal.remove(); };
  }
  draw();
};

let canvas, ctx, isDrawing = false, currentTool = 'pen';
let strokes = [], currentStroke = [], redoStack = [];

window._initCanvas = () => {
  canvas = document.getElementById("memo-canvas");
  ctx = canvas.getContext("2d");
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  ctx.lineCap = "round"; ctx.lineJoin = "round";
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
  ctx.beginPath(); ctx.moveTo(pos.x, pos.y);
  if (currentTool === 'eraser') {
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(); ctx.lineWidth = 24;
  } else {
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim(); ctx.lineWidth = 3;
  }
  redoStack = [];
}

function draw(e) {
  if (!isDrawing) return;
  const pos = getPos(e);
  currentStroke.push({ x: pos.x, y: pos.y, tool: currentTool });
  ctx.lineTo(pos.x, pos.y); ctx.stroke();
}

function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false; ctx.closePath(); strokes.push(currentStroke); currentStroke = [];
}

window._setTool = (tool) => {
  currentTool = tool;
  document.getElementById("tool-pen").classList.toggle("active", tool === 'pen');
  document.getElementById("tool-eraser").classList.toggle("active", tool === 'eraser');
};

window._clearMemo = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); strokes = []; redoStack = []; };
window._memoUndo = () => { if (strokes.length === 0) return; const last = strokes.pop(); redoStack.push(last); redrawCanvas(); };
window._memoRedo = () => { if (redoStack.length === 0) return; const s = redoStack.pop(); strokes.push(s); redrawCanvas(); };

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes.forEach(stroke => {
    ctx.beginPath(); ctx.moveTo(stroke[0].x, stroke[0].y);
    if (stroke[0].tool === 'eraser') {
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(); ctx.lineWidth = 24;
    } else {
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim(); ctx.lineWidth = 3;
    }
    stroke.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  });
}

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
        <div class="chart-grid">${[0,1,2,3,4].map(()=>`<div class="chart-line"></div>`).join("")}</div>
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
            <div class="history-bar-wrap"><div class="history-bar-fill" style="width:${rate}%"></div></div>
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
    if (timerRunning) { timerRunning = false; clearInterval(timerInterval); toggleBtn.textContent = "再開"; }
    else { timerRunning = true; timerInterval = setInterval(() => { timerSeconds++; updateDisplay(); }, 1000); toggleBtn.textContent = "一時停止"; }
  };
  document.getElementById("timer-reset").onclick = () => { timerRunning = false; clearInterval(timerInterval); timerSeconds = 0; updateDisplay(); toggleBtn.textContent = "開始"; };
  document.getElementById("timer-save").onclick = () => {
    const min = Math.round(timerSeconds/60);
    if (min > 0) { addSession("タイマー学習", "タイマー", min); timerSeconds = 0; updateDisplay(); toggleBtn.textContent = "開始"; timerRunning = false; clearInterval(timerInterval); window.renderRecordPage(); }
    else { alert("1分以上計測してください。"); }
  };
};

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
    logout(); renderAuthButtons(); renderSidebarFooter(); window.navigateTo("home");
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

renderAuthButtons();
renderSidebarFooter();
window.navigateTo("home");
