const app = document.getElementById("app");
const pageTitle = document.getElementById("page-title");

/* =========================================================================
   データ・ストレージ
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

// テーマ
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

// アカウント
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

// 学習記録
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

// 挨拶とランク
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
   ナビゲーション
   ========================================================================= */
function renderNav(activeId) {
  const NAV = [
    { id:"home", label:"ホーム", icon:'<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>' },
    { id:"learn", label:"学習", icon:'<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0
