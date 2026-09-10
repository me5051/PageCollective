/* ===================================================================
   THE PAGE COLLECTIVE — app logic (vanilla JS)
=================================================================== */

/* -------------------------------------------------------------
   SEED DATA
------------------------------------------------------------- */

const BADGES = {
  pageTurner: { label: "Page Turner", icon: "🏅", desc: "Finished 5+ books with the club" },
  consistent: { label: "Consistent Reader", icon: "🔥", desc: "Attended 5 meetings in a row" },
  discussion: { label: "Discussion Master", icon: "🎤", desc: "Led 3+ discussions" },
  mvp: { label: "Book Club MVP", icon: "⭐", desc: "Top points this quarter" },
  newChapter: { label: "New Chapter", icon: "🌱", desc: "Welcome to the collective" },
};

let members = [
  { id: 1, name: "Sage Supreme", role: "President", joined: "2024-07-18", points: 300, booksCompleted: 2, progress: { percent: 84, chapter: 1, pages: 2, totalPages: 166 }, badges: ["pageTurner", "consistent", "mvp"] },
  { id: 2, name: "Kwechi", role: "Vice President", joined: "2024-07-18", points: 300, booksCompleted: 2, progress: { percent: 91, chapter: 1, pages: 2, totalPages: 166 }, badges: ["pageTurner", "discussion"] },
  { id: 3, name: "Miran Chinemerem", role: "Accountant", joined: "2024-07-18", points: 300, booksCompleted: 2, progress: { percent: 63, chapter: 1, pages: 2, totalPages: 166 }, badges: ["consistent"] },
  { id: 4, name: "Daniella", role: "Photographer", joined: "2024-07-18", points: 300, booksCompleted: 2, progress: { percent: 55, chapter: 1, pages: 2, totalPages: 166 }, badges: [] },
  { id: 5, name: "Bhig Vic", role: "Content Chemist", joined: "2025-07-18", points: 300, booksCompleted: 2, progress: { percent: 40, chapter: 1, pages: 2, totalPages: 166 }, badges: [] },
  { id: 6, name: "Ray", role: "Social Media Manager", joined: "2025-07-18", points: 300, booksCompleted: 2, progress: { percent: 22, chapter: 1, pages: 2, totalPages: 166 }, badges: ["pageTurner"] },
  { id: 7, name: "Victor William", role: "Member", joined: "2025-07-18", points: 300, booksCompleted: 2, progress: { percent: 30, chapter: 1, pages: 2, totalPages: 166 }, badges: [] },
  { id: 8, name: "Caspar", role: "Member", joined: "2026-07-18", points: 300, booksCompleted: 2, progress: { percent: 10, chapter: 1, pages: 2, totalPages: 166 }, badges: ["newChapter"] },
  { id: 9, name: "Smile Socials", role: "Member", joined: "2026-07-18", points: 300, booksCompleted: 2, progress: { percent: 10, chapter: 1, pages: 2, totalPages: 166 }, badges: ["newChapter"] },
  { id: 10, name: "Louis Malachi", role: "Member", joined: "2026-07-18", points: 300, booksCompleted: 2, progress: { percent: 10, chapter: 1, pages: 2, totalPages: 166 }, badges: ["newChapter"] },
  { id: 11, name: "Mmesoma", role: "Member", joined: "2026-07-18", points: 300, booksCompleted: 2, progress: { percent: 10, chapter: 1, pages: 2, totalPages: 166 }, badges: ["newChapter"] },
  { id: 12, name: "Ozioma", role: "Member", joined: "2026-07-18", points: 300, booksCompleted: 2, progress: { percent: 10, chapter: 1, pages: 2, totalPages: 166 }, badges: ["newChapter"] },
  { id: 13, name: "Dj Danilo", role: "Member", joined: "2026-07-18", points: 300, booksCompleted: 2, progress: { percent: 10, chapter: 1, pages: 2, totalPages: 166 }, badges: ["newChapter"] },
];

const currentBook = {
  title: "The Beautiful Ones Are Not Yet Born",
  author: "Ayi Kwei Armah",
  totalPages: 166,
  totalChapters: 13,
  startDate: "2026-09-05",
  targetDate: "2026-09-19",
  spineColor: "#8B3A3A",
  cover: "cover-beautiful-ones.jpg",
  pdfLink: null,
};

const pastBooks = [
  { title: "The Atomic Habits", author: "James Clear", finished: "2026-08-08", rating: 4.6, spineColor: "#4A6B4E", cover: "cover-atomic-habits.jpg", pdfLink: null },
  { title: "The Alchemist", author: "Paulo Coelho", finished: "2026-08-29", rating: 4.8, spineColor: "#8B5E2C", cover: "cover-alchemist.jpg", pdfLink: null },
];

let meetings = [
  {
    id: 1, date: "2026-09-12", time: "12:00 PM", topic: "The Beautiful Ones Are Not Yet Born — Part 2 discussion", upcoming: true,
    status: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null, 11: null, 12: null, 13: null },
  },
  {
    id: 2, date: "2026-08-08", time: "6:00 PM", topic: "Atomic Habits — Finished", upcoming: false,
    status: { 1: "present", 2: "present", 3: "present", 4: "excused", 5: "present", 6: "absent", 7: "present", 8: "present", 9: null, 10: null, 11: null, 12: null, 13: null },
  },
  {
    id: 3, date: "2026-08-29", time: "6:00 PM", topic: "The Alchemist — Finished", upcoming: false,
    status: { 1: "present", 2: "present", 3: "present", 4: "present", 5: "excused", 6: "present", 7: "absent", 8: null, 9: null, 10: null, 11: null, 12: null, 13: null },
  },
  {
    id: 4, date: "2026-07-18", time: "6:00 PM", topic: "The Page Collective — Kickoff", upcoming: false,
    status: { 1: "present", 2: "present", 3: "absent", 4: "present", 5: "present", 6: "excused", 7: "present", 8: null, 9: null, 10: null, 11: null, 12: null, 13: null },
  },
];

const announcements = [
  { date: "2026-09-01", text: "HAPPY NEW MONTH!" },
  { date: "2026-09-03", text: "Welcome to September! First meeting attended." },
  { date: "2026-09-05", text: "Venue for this today moved to Whyte View Hotel — same time." },
];

const activities = [
  { date: "Anticipate", title: "Book Chow - TPC x ChowDown" },
  { date: "Anticipate", title: "Book Chow - TPC x ChowDown" },
];

const SPINE_PALETTE = ["#8B3A3A", "#4A6B4E", "#8B5E2C", "#5C4A8B", "#2C5E7A", "#7A5C3B"];

// Admin-controlled dashboard highlight. memberId null = auto-pick (newest badge earner / newest member).
let highlight = { memberId: null, note: "" };

// Next-book poll. Each option's votes array holds member IDs who voted for it.
let poll = { active: false, question: "Vote for our next book!", options: [] };

// Pristine copy of the seed data, captured before any edits — used by the admin "reset" action.
const SEED_DATA = JSON.parse(JSON.stringify({ members, currentBook, pastBooks, meetings, announcements, activities, highlight, poll }));

const STATUS_META = {
  present: { label: "Present", cls: "active-present" },
  absent: { label: "Absent", cls: "active-absent" },
  excused: { label: "Excused", cls: "active-excused" },
};

const TABS = [
  { id: "dashboard", label: "Home", icon: "home" },
  { id: "members", label: "Members", icon: "users" },
  { id: "reading", label: "Reading", icon: "book-open" },
  { id: "attendance", label: "Attendance", icon: "calendar-check" },
  { id: "points", label: "Points", icon: "trophy" },
  { id: "admin", label: "Admin", icon: "shield" },
];

// Change this to whatever PIN you like. Note: since this is a static site with
// no backend, this is a basic deterrent, not real security — anyone who opens
// this file in a text editor can see it. Treat it like a "staff only" sign, not a lock.
const ADMIN_PIN = "2468";

// Firebase project config — from Firebase console → Project settings → Your apps.
const firebaseConfig = {
  apiKey: "AIzaSyA-tDnKpn3ORBVb9DozYyANQMc5jPl4bIg",
  authDomain: "thepagecollective-c3223.firebaseapp.com",
  projectId: "thepagecollective-c3223",
  storageBucket: "thepagecollective-c3223.firebasestorage.app",
  messagingSenderId: "134967577675",
  appId: "1:134967577675:web:efc68c8415a9e2f01cd1ce",
  measurementId: "G-RRLHHRQYPX",
};
let db = null;
let stateDocRef = null;
try {
  if (typeof firebase === "undefined") throw new Error("Firebase SDK did not load (check your internet connection or the script tags in index.html)");
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  stateDocRef = db.collection("pageCollective").doc("state");
} catch (e) {
  console.error("Firebase unavailable — running on local sample data only, changes won't sync:", e);
}

/* -------------------------------------------------------------
   APP STATE
------------------------------------------------------------- */

let currentUserName = null;
let activeTab = "dashboard";
let openMeetingId = meetings[0].id;
let selectedMemberId = null;
let adminUnlocked = false;
let adminPinError = false;
let showFinishBookForm = false;

/* -------------------------------------------------------------
   PERSISTENCE (Firebase Firestore — shared live across all devices)
------------------------------------------------------------- */

// True while we're applying data that just arrived from Firestore, so we
// don't immediately re-save it and cause a feedback loop.
let isApplyingRemoteUpdate = false;

function applyRemoteData(data) {
  isApplyingRemoteUpdate = true;
  if (data.members) { members.length = 0; members.push(...data.members); }
  if (data.meetings) { meetings.length = 0; meetings.push(...data.meetings); }
  if (data.currentBook) Object.assign(currentBook, data.currentBook);
  if (data.pastBooks) { pastBooks.length = 0; pastBooks.push(...data.pastBooks); }
  if (data.announcements) { announcements.length = 0; announcements.push(...data.announcements); }
  if (data.activities) { activities.length = 0; activities.push(...data.activities); }
  if (data.highlight) Object.assign(highlight, data.highlight);
  if (data.poll) Object.assign(poll, data.poll);
  isApplyingRemoteUpdate = false;
  render();
}

// Subscribes to the shared document — fires immediately with current data,
// then again automatically whenever any device saves a change.
function subscribeToState() {
  if (!stateDocRef) return; // Firebase failed to initialize — stay on local sample data
  stateDocRef.onSnapshot(
    (snap) => {
      if (snap.exists) applyRemoteData(snap.data());
      // If it doesn't exist yet, nobody has saved anything to Firestore
      // yet — keep showing the sample data baked into this file until
      // the first admin edit creates the shared document.
    },
    (err) => {
      console.error("Could not sync club data from Firebase:", err);
    }
  );
}

function saveState() {
  if (isApplyingRemoteUpdate) return; // don't re-save data we just received
  if (!stateDocRef) return; // Firebase unavailable — edits stay local to this tab only
  stateDocRef
    .set({ members, meetings, currentBook, pastBooks, announcements, activities, highlight, poll })
    .catch((e) => console.error("Could not save club data to Firebase:", e));
}

function resetAllData() {
  if (!window.confirm("Reset all club data back to the sample defaults? This can't be undone.")) return;
  const fresh = JSON.parse(JSON.stringify(SEED_DATA));
  members.length = 0; members.push(...fresh.members);
  meetings.length = 0; meetings.push(...fresh.meetings);
  Object.assign(currentBook, fresh.currentBook);
  pastBooks.length = 0; pastBooks.push(...fresh.pastBooks);
  announcements.length = 0; announcements.push(...fresh.announcements);
  activities.length = 0; activities.push(...fresh.activities);
  Object.assign(highlight, fresh.highlight);
  Object.assign(poll, fresh.poll);
  openMeetingId = meetings[0].id;
  saveState();
  render();
}

/* -------------------------------------------------------------
   HELPERS
------------------------------------------------------------- */

function initials(name) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

function fmtDate(d) {
  const parsed = new Date(d + "T00:00:00");
  if (isNaN(parsed.getTime())) return d; // not a real date (e.g. a placeholder like "Anticipate") — show it as-is
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function hueForName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

function attendancePct(memberId) {
  const relevant = meetings.filter((m) => m.status[memberId] !== null && m.status[memberId] !== undefined);
  if (relevant.length === 0) return null;
  const present = relevant.filter((m) => m.status[memberId] === "present").length;
  return Math.round((present / relevant.length) * 100);
}

function findMember(id) {
  return members.find((m) => m.id === id);
}

function findYou() {
  if (!currentUserName) return null;
  return members.find((m) => m.name.toLowerCase() === currentUserName.toLowerCase()) || null;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* -------------------------------------------------------------
   SMALL COMPONENT RENDERERS (return HTML strings)
------------------------------------------------------------- */

function avatarHtml(name, size, photo) {
  if (photo) {
    return `<div class="avatar" style="width:${size}px;height:${size}px;overflow:hidden;padding:0"><img src="${photo}" alt="${escapeHtml(name)}" style="width:100%;height:100%;object-fit:cover;display:block" /></div>`;
  }
  const hue = hueForName(name);
  const fontSize = Math.round(size * 0.38);
  return `<div class="avatar" style="width:${size}px;height:${size}px;font-size:${fontSize}px;background:hsl(${hue},32%,30%)">${initials(name)}</div>`;
}

function bookSpineHtml(title, author, color, width, height, small, cover) {
  if (cover) {
    return `
      <div style="width:${width}px;height:${height}px;border-radius:3px 7px 7px 3px;box-shadow:0 6px 16px rgba(0,0,0,0.35);flex-shrink:0;overflow:hidden">
        <img src="${cover}" alt="${escapeHtml(title)} cover" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>`;
  }
  const pad = small ? "10px 8px" : "14px 10px";
  const titleSize = small ? "12px" : "15px";
  const authorSize = small ? "9px" : "10.5px";
  return `
    <div class="book-spine" style="width:${width}px;height:${height}px;padding:${pad};background:linear-gradient(155deg, ${color}, ${color}dd)">
      <div class="title" style="font-size:${titleSize}">${escapeHtml(title)}</div>
      <div class="author" style="font-size:${authorSize}">${escapeHtml(author)}</div>
    </div>`;
}

function sectionLabelHtml(icon, text) {
  return `<div class="section-label"><i data-lucide="${icon}"></i><h2>${text}</h2></div>`;
}

function progressBarHtml(percent, opts) {
  opts = opts || {};
  const sizeCls = opts.size ? ` ${opts.size}` : "";
  const fillCls = opts.color === "sage" ? " sage" : "";
  return `<div class="progress-bar${sizeCls}"><div class="progress-bar-fill${fillCls}" style="width:${percent}%"></div></div>`;
}

function pillHtml(text, color) {
  return `<span class="pill" style="background:${color}22;color:${color};border:1px solid ${color}44">${text}</span>`;
}

/* -------------------------------------------------------------
   LOGIN VIEW
------------------------------------------------------------- */

function renderLogin() {
  return `
    <div class="login-screen">
      <div class="login-card">
        <div class="logo-circle"><img src="logo.jpg" alt="The Page Collective" /></div>
        <h1 class="serif">The Page Collective</h1>
        <p class="tagline">READ · CONNECT · GROW</p>
        <p class="sub">A shared reading room for our club. Enter your name to step in.</p>
        <input id="nameInput" type="text" placeholder="Your name" autocomplete="off" />
        <button class="primary" id="enterBtn">Enter the collective</button>
        <p class="note">Single shared entry for now, individual accounts coming later.</p>
      </div>
    </div>`;
}

/* -------------------------------------------------------------
   DASHBOARD
------------------------------------------------------------- */

function renderDashboard() {
  const nextMeeting = meetings.find((m) => m.upcoming);
  const avgProgress = Math.round(members.reduce((s, m) => s + m.progress.percent, 0) / members.length);
  const totalBooksThisYear = pastBooks.length + 1;
  const totalPagesRead = pastBooks.length * 380 + members.reduce((s, m) => s + m.progress.pages, 0) / members.length;
  const avgAttendance = Math.round(members.reduce((s, m) => s + (attendancePct(m.id) || 0), 0) / members.length);
  const autoHighlight =
    members.find((m) => m.badges.length > 0 && m.badges[m.badges.length - 1] === "newChapter") ||
    [...members].sort((a, b) => new Date(b.joined) - new Date(a.joined))[0];
  const manualHighlight = highlight.memberId ? findMember(highlight.memberId) : null;
  const featuredMember = manualHighlight || autoHighlight;
  const featuredSub = manualHighlight
    ? (highlight.note.trim() || "Featured by the admins")
    : (autoHighlight && autoHighlight.badges.includes("newChapter") ? 'Just earned "New Chapter" 🌱' : "Newest member of the collective");

  return `
    <div class="list-gap-lg">
      <div>
        <h1 class="dashboard-title">Welcome back, ${escapeHtml(currentUserName.split(" ")[0])}</h1>
        <p class="dashboard-sub">Here's what's happening in the collective.</p>
      </div>

      <div class="list-gap">
        <div class="card">
          <div style="display:flex;gap:14px">
            ${bookSpineHtml(currentBook.title, currentBook.author, currentBook.spineColor, 92, 132, false, currentBook.cover)}
            <div style="flex:1;min-width:0">
              <div class="eyebrow">CURRENTLY READING</div>
              <div class="serif" style="font-size:17px;color:var(--parchment);font-weight:600;margin-bottom:2px">${escapeHtml(currentBook.title)}</div>
              <div style="font-size:12.5px;color:var(--sage);margin-bottom:10px">${escapeHtml(currentBook.author)}</div>
              ${progressBarHtml(avgProgress)}
              <div class="flex-between" style="margin-top:6px;font-size:11.5px;color:rgba(239,230,211,0.6)">
                <span>Club average: ${avgProgress}%</span>
                <span>Target ${fmtDate(currentBook.targetDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="display:flex;align-items:flex-start;gap:12px">
            <div class="icon-round"><i data-lucide="calendar-check" style="width:20px;height:20px;color:var(--brass)"></i></div>
            <div>
              <div class="eyebrow" style="margin-bottom:3px">NEXT MEETING</div>
              ${nextMeeting ? `
                <div class="serif" style="font-size:16px;color:var(--parchment);font-weight:600">${fmtDate(nextMeeting.date)} · ${nextMeeting.time}</div>
                <div style="font-size:12.5px;color:var(--sage);margin-top:2px">${escapeHtml(nextMeeting.topic)}</div>
              ` : `<div style="color:var(--sage);font-size:13px">Nothing scheduled yet.</div>`}
            </div>
          </div>
        </div>
      </div>

      <div>
        ${sectionLabelHtml("trending-up", "Club statistics")}
        <div class="stat-grid">
          <div class="card center" style="padding:14px"><div class="stat-value">${members.length}</div><div class="stat-label">Members</div></div>
          <div class="card center" style="padding:14px"><div class="stat-value">${totalBooksThisYear}</div><div class="stat-label">Books this year</div></div>
          <div class="card center" style="padding:14px"><div class="stat-value">${avgAttendance}%</div><div class="stat-label">Avg attendance</div></div>
          <div class="card center" style="padding:14px"><div class="stat-value">${Math.round(totalPagesRead).toLocaleString()}</div><div class="stat-label">Pages logged</div></div>
        </div>
      </div>

      <div>
        ${sectionLabelHtml("star", "Upcoming activities")}
        <div class="list-gap">
          ${activities.map((a) => `
            <div class="card tight upcoming-row">
              <span class="upcoming-title">${escapeHtml(a.title)}</span>
              <span class="upcoming-date">${fmtDate(a.date)}</span>
            </div>`).join("")}
        </div>
      </div>

      <div>
        ${sectionLabelHtml("bell", "Recent announcements")}
        <div class="list-gap">
          ${announcements.map((a) => `
            <div class="card tight">
              <div class="announcement-date">${fmtDate(a.date)}</div>
              <div class="announcement-text">${escapeHtml(a.text)}</div>
            </div>`).join("")}
        </div>
      </div>

      <div>
        ${sectionLabelHtml("award", "Member highlight")}
        ${featuredMember ? `
        <div class="card">
          <div class="highlight-row" data-goto-tab="members">
            ${avatarHtml(featuredMember.name, 44, featuredMember.photo)}
            <div style="flex:1">
              <div class="highlight-name">${escapeHtml(featuredMember.name)}</div>
              <div class="highlight-sub">${escapeHtml(featuredSub)}</div>
            </div>
            <div class="highlight-chevron"><i data-lucide="chevron-right"></i></div>
          </div>
        </div>` : `<div class="card" style="color:var(--sage);font-size:13px">Add a member to see highlights here.</div>`}
      </div>
    </div>`;
}

/* -------------------------------------------------------------
   MEMBERS
------------------------------------------------------------- */

function renderMembers() {
  const rows = members.map((m) => {
    const isYou = m.name.toLowerCase() === currentUserName.toLowerCase();
    const pct = attendancePct(m.id);
    return `
      <div class="card tight member-row" data-open-member="${m.id}">
        ${avatarHtml(m.name, 42, m.photo)}
        <div style="flex:1;min-width:0">
          <div class="member-name-line">
            <span class="member-name">${escapeHtml(m.name)}</span>
            ${isYou ? `<span class="you-tag">YOU</span>` : ""}
            ${isYou ? `<i data-lucide="pencil" data-rename-self="${m.id}" style="width:13px;height:13px;color:var(--sage);cursor:pointer"></i>` : ""}
          </div>
          <div class="member-role">${escapeHtml(m.role)}</div>
        </div>
        <div>
          <div class="member-points">${m.points} pts</div>
          <div class="member-sub">${pct !== null ? `${pct}% attendance` : "no record"}</div>
        </div>
      </div>`;
  }).join("");

  return `
    <div>
      ${sectionLabelHtml("users", `Members (${members.length})`)}
      <div class="list-gap">${rows}</div>
    </div>`;
}

function renderMemberModal(member) {
  const pct = attendancePct(member.id);
  const isYou = member.name.toLowerCase() === currentUserName.toLowerCase();
  const badgesHtml = member.badges.length === 0
    ? `<div style="font-size:12.5px;color:var(--sage)">None yet — plenty of chapters to go.</div>`
    : `<div style="display:flex;flex-wrap:wrap;gap:8px">${member.badges.map((b) => pillHtml(`${BADGES[b].icon} ${BADGES[b].label}`, "#C08830")).join("")}</div>`;

  return `
    <div class="modal-close-row" data-close-modal><i data-lucide="x"></i></div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
      ${avatarHtml(member.name, 58, member.photo)}
      <div>
        <div class="serif" style="font-size:20px;font-weight:600;color:var(--parchment)">
          ${escapeHtml(member.name)} ${isYou ? `<span style="font-size:11px;color:var(--brass)">· You</span>` : ""}
          ${isYou ? `<i data-lucide="pencil" data-rename-self="${member.id}" style="width:14px;height:14px;color:var(--sage);cursor:pointer;margin-left:6px;vertical-align:middle"></i>` : ""}
        </div>
        <div style="font-size:12.5px;color:var(--sage)">${escapeHtml(member.role)}</div>
      </div>
    </div>

    <div class="stat-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
      <div class="card center" style="padding:10px"><div class="serif" style="font-size:17px;color:var(--parchment);font-weight:600">${member.points}</div><div style="font-size:10.5px;color:var(--sage)">Points</div></div>
      <div class="card center" style="padding:10px"><div class="serif" style="font-size:17px;color:var(--parchment);font-weight:600">${member.booksCompleted}</div><div style="font-size:10.5px;color:var(--sage)">Books read</div></div>
      <div class="card center" style="padding:10px"><div class="serif" style="font-size:17px;color:var(--parchment);font-weight:600">${pct !== null ? pct + "%" : "—"}</div><div style="font-size:10.5px;color:var(--sage)">Attendance</div></div>
    </div>

    <div style="margin-bottom:18px">
      <div class="eyebrow" style="margin-bottom:6px">CURRENT PROGRESS — ${currentBook.title.toUpperCase()}</div>
      ${progressBarHtml(member.progress.percent)}
      <div style="font-size:12px;color:var(--sage);margin-top:5px">
        Chapter ${member.progress.chapter} · ${member.progress.pages}/${member.progress.totalPages} pages · ${member.progress.percent}%
      </div>
    </div>

    <div style="margin-bottom:18px">
      <div class="eyebrow" style="margin-bottom:8px">BADGES</div>
      ${badgesHtml}
    </div>

    <div style="font-size:11.5px;color:rgba(239,230,211,0.45)">Member since ${fmtDate(member.joined)}</div>
  `;
}

/* -------------------------------------------------------------
   READING TRACKER
------------------------------------------------------------- */

function renderReadingTracker() {
  const you = findYou();

  const yourSection = you ? `
    <div>
      ${sectionLabelHtml("feather", "Your progress")}
      <div class="card">
        <div style="margin-bottom:12px">
          ${progressBarHtml(you.progress.percent, { size: "thick" })}
          <div style="font-size:12.5px;color:var(--sage);margin-top:6px">
            ${you.progress.percent}% · Chapter ${you.progress.chapter} · ${you.progress.pages}/${you.progress.totalPages} pages
          </div>
        </div>
        <div style="display:flex;gap:10px">
          <div class="step-label">CHAPTER
            <div class="step-input">
              <button class="step-btn" data-step="chapter" data-dir="-1"><i data-lucide="minus"></i></button>
              <div class="step-value">${you.progress.chapter}</div>
              <button class="step-btn" data-step="chapter" data-dir="1"><i data-lucide="plus"></i></button>
            </div>
          </div>
          <div class="step-label">PAGES READ
            <div class="step-input">
              <button class="step-btn" data-step="pages" data-dir="-1"><i data-lucide="minus"></i></button>
              <div class="step-value">${you.progress.pages}</div>
              <button class="step-btn" data-step="pages" data-dir="1"><i data-lucide="plus"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>` : "";

  const clubRows = [...members].sort((a, b) => b.progress.percent - a.progress.percent).map((m) => `
    <div class="card tight">
      <div class="flex-between" style="margin-bottom:6px">
        <span style="font-size:13px;color:var(--parchment)">${escapeHtml(m.name)}</span>
        <span style="font-size:12px;color:var(--sage)">Ch. ${m.progress.chapter} · ${m.progress.percent}%</span>
      </div>
      ${progressBarHtml(m.progress.percent, { size: "thin" })}
    </div>`).join("");

  const historyItems = pastBooks.map((b) => `
    <div class="history-item">
      ${bookSpineHtml(b.title, b.author, b.spineColor, 80, 116, true, b.cover)}
      <div class="history-rating"><i data-lucide="star" fill="#C08830"></i> ${b.rating}</div>
      ${b.pdfLink ? `<a href="${b.pdfLink}" target="_blank" rel="noopener" style="font-size:10px;color:var(--brass);text-decoration:none">Read PDF</a>` : ""}
    </div>`).join("");

  
  const pollSection = poll.active ? `
    <div>
      ${sectionLabelHtml("check-square", "Vote for the next book")}
      <div class="card">
        <div style="font-family:'Fraunces', serif;font-size:15px;color:var(--parchment);font-weight:600;margin-bottom:12px">${escapeHtml(poll.question)}</div>
        ${poll.options.length === 0 ? `<p style="font-size:12.5px;color:var(--sage)">No options yet — check back soon.</p>` : poll.options.map((opt) => {
          const totalVotes = poll.options.reduce((s, o) => s + o.votes.length, 0);
          const pct = totalVotes ? Math.round((opt.votes.length / totalVotes) * 100) : 0;
          const yourVote = you && opt.votes.includes(you.id);
          return `
            <div style="margin-bottom:12px;${you ? "cursor:pointer" : ""}" ${you ? `data-vote-option="${opt.id}"` : ""}>
              <div class="flex-between" style="margin-bottom:4px">
                <span style="font-size:13px;color:${yourVote ? "var(--brass)" : "var(--parchment)"};font-weight:${yourVote ? "600" : "400"}">${yourVote ? "✓ " : ""}${escapeHtml(opt.title)}</span>
                <span style="font-size:11.5px;color:var(--sage)">${opt.votes.length} vote${opt.votes.length === 1 ? "" : "s"} · ${pct}%</span>
              </div>
              <div style="font-size:11px;color:var(--sage);margin-bottom:5px">${escapeHtml(opt.author)}</div>
              ${progressBarHtml(pct, { size: "thin" })}
            </div>`;
        }).join("")}
        ${!you && poll.options.length > 0 ? `<p style="font-size:11.5px;color:rgba(239,230,211,0.4);margin-top:4px">Log in with your member name to vote.</p>` : ""}
      </div>
    </div>` : "";

  return `
    <div class="list-gap-lg">
      <div>
        ${sectionLabelHtml("book-open", "Currently reading")}
        <div class="card">
          <div style="display:flex;gap:16px">
            ${bookSpineHtml(currentBook.title, currentBook.author, currentBook.spineColor, 100, 144, false, currentBook.cover)}
            <div style="flex:1">
              <div class="serif" style="font-size:18px;color:var(--parchment);font-weight:600">${escapeHtml(currentBook.title)}</div>
              <div style="font-size:13px;color:var(--sage);margin-bottom:8px">${escapeHtml(currentBook.author)}</div>
              <div style="font-size:12px;color:rgba(239,230,211,0.6);line-height:1.7">
                ${currentBook.totalPages} pages · ${currentBook.totalChapters} chapters<br />
                Started ${fmtDate(currentBook.startDate)} · Target ${fmtDate(currentBook.targetDate)}
              </div>
              ${currentBook.pdfLink ? `<a href="${currentBook.pdfLink}" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px;font-size:12px;color:var(--brass)">📄 Read the PDF</a>` : ""}
            </div>
          </div>
        </div>
      </div>

      ${pollSection}

      ${yourSection}

      <div>
        ${sectionLabelHtml("users", "Club progress")}
        <div class="list-gap">${clubRows}</div>
      </div>

      <div>
        ${sectionLabelHtml("clock", "Reading history")}
        <div class="history-scroll">${historyItems}</div>
      </div>
    </div>`;
}

/* -------------------------------------------------------------
   ATTENDANCE
------------------------------------------------------------- */

function renderAttendance() {
  const meetingCards = meetings.map((mt) => {
    const isOpen = openMeetingId === mt.id;
    const marked = Object.values(mt.status).filter((s) => s !== null).length;
    const bodyHtml = isOpen ? `
      <div class="meeting-body">
        <div class="meeting-marked">${marked}/${members.length} marked${!adminUnlocked ? " · admins only can edit" : ""}</div>
        ${members.map((m) => `
          <div class="attendee-row">
            ${avatarHtml(m.name, 30, m.photo)}
            <span class="attendee-name">${escapeHtml(m.name)}</span>
            <div class="status-btns">
              ${["present", "absent", "excused"].map((s) => {
                const active = mt.status[m.id] === s;
                if (adminUnlocked) {
                  return `<button class="status-btn${active ? " " + STATUS_META[s].cls : ""}" data-status-btn data-meeting="${mt.id}" data-member="${m.id}" data-status="${s}">${STATUS_META[s].label}</button>`;
                }
                return active ? `<span class="status-btn ${STATUS_META[s].cls}" style="cursor:default">${STATUS_META[s].label}</span>` : "";
              }).join("") || (adminUnlocked ? "" : `<span style="font-size:10.5px;color:rgba(239,230,211,0.35)">Not marked</span>`)}
            </div>
          </div>`).join("")}
      </div>` : "";

    return `
      <div class="card" style="padding:0;overflow:hidden">
        <div class="meeting-head${isOpen ? " open" : ""}" data-meeting-toggle="${mt.id}">
          <div>
            <div class="meeting-date">${fmtDate(mt.date)} ${mt.upcoming ? pillHtml("Upcoming", "#C08830") : ""}</div>
            <div class="meeting-topic">${escapeHtml(mt.topic)}</div>
          </div>
          <i data-lucide="chevron-right"></i>
        </div>
        ${bodyHtml}
      </div>`;
  }).join("");

  const recordRows = [...members].sort((a, b) => (attendancePct(b.id) || 0) - (attendancePct(a.id) || 0)).map((m) => {
    const pct = attendancePct(m.id);
    return `
      <div class="card tight">
        <div class="flex-between" style="margin-bottom:6px">
          <span style="font-size:13px;color:var(--parchment)">${escapeHtml(m.name)}</span>
          <span style="font-size:12px;color:var(--sage)">${pct !== null ? pct + "%" : "no record"}</span>
        </div>
        ${progressBarHtml(pct || 0, { size: "thin", color: "sage" })}
      </div>`;
  }).join("");

  return `
    <div class="list-gap-lg">
      ${!adminUnlocked ? `<p style="font-size:12px;color:var(--sage);margin:0">Attendance is marked by admins. This view is read-only.</p>` : ""}
      <div>
        ${sectionLabelHtml("calendar-check", "Meetings")}
        <div class="list-gap">${meetingCards}</div>
      </div>
      <div>
        ${sectionLabelHtml("trending-up", "Attendance record")}
        <div class="list-gap">${recordRows}</div>
      </div>
    </div>`;
}

/* -------------------------------------------------------------
   POINTS & ACHIEVEMENTS
------------------------------------------------------------- */

function renderPointsAchievements() {
  const ranked = [...members].sort((a, b) => b.points - a.points);

  const leaderRows = ranked.map((m, i) => `
    <div class="card tight leader-row">
      <div class="leader-rank${i === 0 ? " first" : ""}">${i + 1}</div>
      ${avatarHtml(m.name, 38, m.photo)}
      <div style="flex:1">
        <div class="member-name">${escapeHtml(m.name)}</div>
        <div class="leader-badges">${m.badges.map((b) => `<span>${BADGES[b].icon}</span>`).join("")}</div>
      </div>
      ${i === 0 ? `<div class="crown-icon"><i data-lucide="crown"></i></div>` : ""}
      <div class="leader-points">${m.points}</div>
    </div>`).join("");

  const badgeCards = Object.entries(BADGES).map(([key, b]) => {
    const holders = members.filter((m) => m.badges.includes(key));
    const holdersHtml = holders.length === 0
      ? `<span class="badge-none">Not yet earned</span>`
      : holders.map((h) => avatarHtml(h.name, 24, h.photo)).join("");
    return `
      <div class="card center">
        <div class="badge-icon">${b.icon}</div>
        <div class="badge-name">${b.label}</div>
        <div class="badge-desc">${b.desc}</div>
        <div class="badge-holders">${holdersHtml}</div>
      </div>`;
  }).join("");

  const pointsRules = [
    ["Attending a meeting", "+20"],
    ["Completing a book", "+100"],
    ["Participating in discussion", "+15"],
    ["Leading a session", "+50"],
    ["Taking part in an activity", "+25"],
    ["Completing a reading challenge", "+75"],
  ].map(([label, pts]) => `<div class="points-row"><span style="color:var(--parchment)">${label}</span><span class="pts">${pts}</span></div>`).join("");

  return `
    <div class="list-gap-lg">
      <div>
        ${sectionLabelHtml("trophy", "Leaderboard")}
        <div class="list-gap">${leaderRows}</div>
      </div>
      <div>
        ${sectionLabelHtml("award", "Badges")}
        <div class="badge-grid">${badgeCards}</div>
      </div>
      <div>
        ${sectionLabelHtml("mic-2", "How points are earned")}
        <div class="card">${pointsRules}</div>
      </div>
    </div>`;
}

/* -------------------------------------------------------------
   ADMIN
------------------------------------------------------------- */

function renderAdminGate() {
  const errorHtml = adminPinError
    ? `<div style="color:var(--wine);font-size:12.5px;margin-bottom:10px">Incorrect PIN. Try again.</div>`
    : "";
  return `
    <div style="max-width:320px;margin:40px auto;text-align:center">
      <i data-lucide="shield" style="width:28px;height:28px;color:var(--brass)"></i>
      <h2 class="serif" style="font-size:19px;color:var(--parchment);margin:12px 0 6px">Admin access</h2>
      <p style="font-size:13px;color:var(--sage);margin-bottom:16px">Enter the admin PIN to manage club data.</p>
      ${errorHtml}
      <input id="adminPinInput" type="password" inputmode="numeric" placeholder="PIN" autocomplete="off"
        class="admin-input" style="text-align:center;letter-spacing:0.3em;margin-bottom:12px;padding:12px" />
      <button class="primary" id="adminUnlockBtn" style="width:100%;padding:12px 14px;border-radius:8px;border:none;background:var(--brass);color:#1B140A;font-weight:600;font-size:15px">Unlock</button>
    </div>`;
}

function renderAdminPanel() {
  const memberRows = members.map((m) => `
    <div class="card" style="margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        ${avatarHtml(m.name, 34, m.photo)}
        <div style="flex:1;min-width:0">
          <div class="member-name">${escapeHtml(m.name)}</div>
          <div class="member-role">${escapeHtml(m.role)}</div>
        </div>
        <button class="icon-btn" data-admin-remove-member="${m.id}" title="Remove member"><i data-lucide="trash-2"></i></button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <label class="step-label">NAME<input type="text" id="admin-name-${m.id}" value="${escapeHtml(m.name)}" class="admin-input" style="margin-top:4px" /></label>
        <label class="step-label">ROLE<input type="text" id="admin-role-${m.id}" value="${escapeHtml(m.role)}" class="admin-input" style="margin-top:4px" /></label>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <label class="step-label">POINTS<input type="number" id="admin-points-${m.id}" value="${m.points}" class="admin-input" style="margin-top:4px" /></label>
        <label class="step-label">BOOKS READ<input type="number" id="admin-books-${m.id}" value="${m.booksCompleted}" class="admin-input" style="margin-top:4px" /></label>
        <label class="step-label">CHAPTER<input type="number" id="admin-chapter-${m.id}" value="${m.progress.chapter}" class="admin-input" style="margin-top:4px" /></label>
        <label class="step-label">PAGES<input type="number" id="admin-pages-${m.id}" value="${m.progress.pages}" class="admin-input" style="margin-top:4px" /></label>
      </div>
      <input type="text" id="admin-photo-${m.id}" value="${escapeHtml(m.photo || "")}" placeholder="Photo URL (optional)" class="admin-input" style="margin-bottom:10px" />
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
        ${Object.entries(BADGES).map(([key, b]) => {
          const active = m.badges.includes(key);
          return `<button class="status-btn${active ? " badge-active" : ""}" data-admin-toggle-badge="${m.id}:${key}" title="${active ? "Click to remove this badge" : "Click to award this badge"}">${active ? "✓ " : ""}${b.icon} ${b.label}</button>`;
        }).join("")}
      </div>
      <button class="primary" style="width:100%;padding:9px;font-size:13px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600" data-admin-save-member="${m.id}">Save changes</button>
    </div>`).join("");

  const addMemberForm = `
    <div class="card">
      <div class="eyebrow" style="margin-bottom:8px">ADD MEMBER</div>
      <input id="admin-new-member-name" type="text" placeholder="Full name" class="admin-input" style="margin-bottom:8px" />
      <input id="admin-new-member-role" type="text" placeholder="Role (e.g. Member)" class="admin-input" style="margin-bottom:8px" />
      <button class="primary" style="width:100%;padding:10px;font-size:13.5px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600" data-admin-add-member>Add member</button>
    </div>`;

  const bookSection = `
    <div class="card">
      <div class="eyebrow" style="margin-bottom:8px">CURRENT BOOK</div>
      <input id="admin-book-title" type="text" value="${escapeHtml(currentBook.title)}" placeholder="Title" class="admin-input" style="margin-bottom:8px" />
      <input id="admin-book-author" type="text" value="${escapeHtml(currentBook.author)}" placeholder="Author" class="admin-input" style="margin-bottom:8px" />
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <input id="admin-book-pages" type="number" value="${currentBook.totalPages}" placeholder="Total pages" class="admin-input" />
        <input id="admin-book-chapters" type="number" value="${currentBook.totalChapters}" placeholder="Total chapters" class="admin-input" />
        <input id="admin-book-start" type="date" value="${currentBook.startDate}" class="admin-input" />
        <input id="admin-book-target" type="date" value="${currentBook.targetDate}" class="admin-input" />
      </div>
      <input id="admin-book-cover" type="text" value="${escapeHtml(currentBook.cover || "")}" placeholder="Cover image URL or filename (optional)" class="admin-input" style="margin-bottom:8px" />
      <input id="admin-book-pdf" type="text" value="${escapeHtml(currentBook.pdfLink || "")}" placeholder="PDF/reading link (optional — only share material you have rights to)" class="admin-input" style="margin-bottom:8px" />
      <button class="primary" style="width:100%;padding:10px;font-size:13.5px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600;margin-bottom:10px" data-admin-save-book>Save book details</button>
      <button style="width:100%;padding:9px;border-radius:6px;border:1px solid rgba(239,230,211,0.15);background:transparent;color:var(--sage);font-size:12.5px" data-admin-toggle-finish>${showFinishBookForm ? "Cancel" : "Finish this book & start a new one"}</button>
      ${showFinishBookForm ? `
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(239,230,211,0.08)">
          <div class="eyebrow" style="margin-bottom:8px">RATE THIS BOOK & START THE NEXT</div>
          <input id="admin-finish-rating" type="number" min="1" max="5" step="0.1" placeholder="Rating for current book (1-5)" class="admin-input" style="margin-bottom:8px" />
          <input id="admin-next-title" type="text" placeholder="Next book title" class="admin-input" style="margin-bottom:8px" />
          <input id="admin-next-author" type="text" placeholder="Next book author" class="admin-input" style="margin-bottom:8px" />
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
            <input id="admin-next-pages" type="number" placeholder="Total pages" class="admin-input" />
            <input id="admin-next-chapters" type="number" placeholder="Total chapters" class="admin-input" />
            <input id="admin-next-start" type="date" class="admin-input" />
            <input id="admin-next-target" type="date" class="admin-input" />
          </div>
          <input id="admin-next-cover" type="text" placeholder="Cover image URL or filename (optional)" class="admin-input" style="margin-bottom:8px" />
          <input id="admin-next-pdf" type="text" placeholder="PDF/reading link (optional)" class="admin-input" style="margin-bottom:8px" />
          <button class="primary" style="width:100%;padding:10px;font-size:13.5px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600" data-admin-confirm-finish>Archive & start new book</button>
        </div>` : ""}
    </div>`;

  const pastBookRows = pastBooks.map((b, i) => `
    <div class="card tight" style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px">
        <div style="min-width:0">
          <div style="font-size:13px;color:var(--parchment)">${escapeHtml(b.title)}</div>
          <div style="font-size:11.5px;color:var(--sage)">${escapeHtml(b.author)} · finished ${fmtDate(b.finished)} · ${b.rating}★</div>
        </div>
        <button class="icon-btn" data-admin-delete-pastbook="${i}"><i data-lucide="trash-2"></i></button>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:6px">
        <input type="text" id="admin-pastbook-cover-${i}" value="${escapeHtml(b.cover || "")}" placeholder="Cover image URL or filename (optional)" class="admin-input" style="flex:1" />
      </div>
      <div style="display:flex;gap:6px">
        <input type="text" id="admin-pastbook-pdf-${i}" value="${escapeHtml(b.pdfLink || "")}" placeholder="PDF/reading link (optional)" class="admin-input" style="flex:1" />
        <button class="icon-btn" data-admin-save-pastbook-cover="${i}" title="Save" style="border:1px solid rgba(239,230,211,0.15);border-radius:6px;padding:0 10px"><i data-lucide="check"></i></button>
      </div>
    </div>`).join("") || `<p style="font-size:12.5px;color:var(--sage)">No past books yet.</p>`;

  const addPastBookForm = `
    <div class="card">
      <div class="eyebrow" style="margin-bottom:8px">ADD PAST BOOK MANUALLY</div>
      <input id="admin-pastbook-title" type="text" placeholder="Title" class="admin-input" style="margin-bottom:8px" />
      <input id="admin-pastbook-author" type="text" placeholder="Author" class="admin-input" style="margin-bottom:8px" />
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <input id="admin-pastbook-finished" type="date" class="admin-input" />
        <input id="admin-pastbook-rating" type="number" min="1" max="5" step="0.1" placeholder="Rating" class="admin-input" />
      </div>
      <input id="admin-pastbook-cover" type="text" placeholder="Cover image URL or filename (optional)" class="admin-input" style="margin-bottom:8px" />
      <input id="admin-pastbook-pdf" type="text" placeholder="PDF/reading link (optional)" class="admin-input" style="margin-bottom:8px" />
      <button class="primary" style="width:100%;padding:10px;font-size:13.5px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600" data-admin-add-pastbook>Add to reading history</button>
    </div>`;

  const meetingRows = meetings.map((mt) => `
    <div class="card tight" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:10px">
      <div style="min-width:0">
        <div style="font-size:13px;color:var(--parchment)">${fmtDate(mt.date)} · ${escapeHtml(mt.time)}${mt.upcoming ? " " + pillHtml("Upcoming", "#C08830") : ""}</div>
        <div style="font-size:11.5px;color:var(--sage)">${escapeHtml(mt.topic)}</div>
      </div>
      <button class="icon-btn" data-admin-delete-meeting="${mt.id}"><i data-lucide="trash-2"></i></button>
    </div>`).join("");

  const addMeetingForm = `
    <div class="card">
      <div class="eyebrow" style="margin-bottom:8px">ADD MEETING</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <input id="admin-meeting-date" type="date" class="admin-input" />
        <input id="admin-meeting-time" type="text" placeholder="e.g. 6:00 PM" class="admin-input" />
      </div>
      <input id="admin-meeting-topic" type="text" placeholder="Topic" class="admin-input" style="margin-bottom:8px" />
      <label style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--sage);margin-bottom:10px">
        <input id="admin-meeting-upcoming" type="checkbox" /> Mark as the upcoming meeting
      </label>
      <button class="primary" style="width:100%;padding:10px;font-size:13.5px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600" data-admin-add-meeting>Add meeting</button>
    </div>`;

  const announcementRows = announcements.map((a, i) => `
    <div class="card tight" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:10px">
      <div style="min-width:0"><div class="announcement-date">${fmtDate(a.date)}</div><div class="announcement-text">${escapeHtml(a.text)}</div></div>
      <button class="icon-btn" data-admin-delete-announcement="${i}"><i data-lucide="trash-2"></i></button>
    </div>`).join("");

  const addAnnouncementForm = `
    <div class="card">
      <div class="eyebrow" style="margin-bottom:8px">POST ANNOUNCEMENT</div>
      <input id="admin-announcement-text" type="text" placeholder="What's the update?" class="admin-input" style="margin-bottom:8px" />
      <button class="primary" style="width:100%;padding:10px;font-size:13.5px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600" data-admin-add-announcement>Post</button>
    </div>`;

  const activityRows = activities.map((a, i) => `
    <div class="card tight" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:10px">
      <span class="upcoming-title">${escapeHtml(a.title)}</span>
      <div style="display:flex;align-items:center;gap:10px">
        <span class="upcoming-date">${fmtDate(a.date)}</span>
        <button class="icon-btn" data-admin-delete-activity="${i}"><i data-lucide="trash-2"></i></button>
      </div>
    </div>`).join("");

  const addActivityForm = `
    <div class="card">
      <div class="eyebrow" style="margin-bottom:8px">ADD ACTIVITY</div>
      <input id="admin-activity-title" type="text" placeholder="Activity title" class="admin-input" style="margin-bottom:8px" />
      <input id="admin-activity-date" type="date" class="admin-input" style="margin-bottom:8px" />
      <button class="primary" style="width:100%;padding:10px;font-size:13.5px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600" data-admin-add-activity>Add activity</button>
    </div>`;

  const highlightSection = `
    <div class="card">
      <label class="step-label">FEATURED MEMBER
        <select id="admin-highlight-member" class="admin-input" style="margin-top:4px">
          <option value="">Automatic (newest badge / newest member)</option>
          ${members.map((m) => `<option value="${m.id}"${highlight.memberId === m.id ? " selected" : ""}>${escapeHtml(m.name)}</option>`).join("")}
        </select>
      </label>
      <label class="step-label" style="display:block;margin-top:10px">CUSTOM MESSAGE (optional)
        <input id="admin-highlight-note" type="text" value="${escapeHtml(highlight.note || "")}" placeholder="e.g. Read 3 books this month!" class="admin-input" style="margin-top:4px" />
      </label>
      <button class="primary" style="width:100%;padding:10px;font-size:13.5px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600;margin-top:10px" data-admin-save-highlight>Save highlight</button>
    </div>`;

  const pollOptionRows = poll.options.map((opt) => `
    <div class="card tight" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:10px">
      <div style="min-width:0">
        <div style="font-size:13px;color:var(--parchment)">${escapeHtml(opt.title)}</div>
        <div style="font-size:11.5px;color:var(--sage)">${escapeHtml(opt.author)} · ${opt.votes.length} vote${opt.votes.length === 1 ? "" : "s"}</div>
      </div>
      <button class="icon-btn" data-admin-delete-poll-option="${opt.id}"><i data-lucide="trash-2"></i></button>
    </div>`).join("") || `<p style="font-size:12.5px;color:var(--sage)">No options yet.</p>`;

  const pollSection = `
    <div class="card" style="margin-bottom:10px">
      <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--parchment);margin-bottom:10px">
        <input type="checkbox" id="admin-poll-active" ${poll.active ? "checked" : ""} /> Poll is live (members can see and vote)
      </label>
      <input id="admin-poll-question" type="text" value="${escapeHtml(poll.question)}" placeholder="Poll question" class="admin-input" style="margin-bottom:8px" />
      <button class="primary" style="width:100%;padding:9px;font-size:13px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600" data-admin-save-poll-settings>Save poll settings</button>
    </div>
    <div class="list-gap">${pollOptionRows}</div>
    <div class="card" style="margin-top:8px">
      <div class="eyebrow" style="margin-bottom:8px">ADD OPTION</div>
      <input id="admin-poll-option-title" type="text" placeholder="Book title" class="admin-input" style="margin-bottom:8px" />
      <input id="admin-poll-option-author" type="text" placeholder="Author" class="admin-input" style="margin-bottom:8px" />
      <button class="primary" style="width:100%;padding:10px;font-size:13.5px;border-radius:6px;border:none;background:var(--brass);color:#1B140A;font-weight:600" data-admin-add-poll-option>Add option</button>
    </div>
    <button style="width:100%;padding:9px;margin-top:8px;border-radius:6px;border:1px solid rgba(239,230,211,0.15);background:transparent;color:var(--sage);font-size:12.5px" data-admin-reset-poll-votes>Reset all votes</button>`;

  const dangerZone = `
    <div class="card" style="border-color:rgba(139,58,58,0.4)">
      <div class="eyebrow" style="color:var(--wine);margin-bottom:8px">DANGER ZONE</div>
      <p style="font-size:12px;color:var(--sage);margin-bottom:10px">Wipe all saved changes on this device and go back to the original sample data.</p>
      <button style="width:100%;padding:10px;border-radius:6px;border:1px solid var(--wine);background:rgba(139,58,58,0.15);color:var(--wine);font-weight:600;font-size:13px" data-admin-reset>Reset all data to sample defaults</button>
    </div>`;

  return `
    <div class="list-gap-lg">
      <div class="flex-between">
        <p style="font-size:12px;color:var(--sage);margin:0">Changes here save to this browser automatically.</p>
        <button class="icon-btn" data-admin-lock style="display:flex;align-items:center;gap:5px;font-size:11.5px;color:var(--sage)"><i data-lucide="lock"></i> Lock</button>
      </div>

      <div>
        ${sectionLabelHtml("users", "Manage members")}
        <div class="list-gap">${memberRows}</div>
        ${addMemberForm}
      </div>

      <div>
        ${sectionLabelHtml("award", "Dashboard highlight")}
        ${highlightSection}
      </div>

      <div>
        ${sectionLabelHtml("check-square", "Next-book poll")}
        ${pollSection}
      </div>

      <div>
        ${sectionLabelHtml("book-open", "Manage current book")}
        ${bookSection}
      </div>

      <div>
        ${sectionLabelHtml("clock", "Manage reading history")}
        <div class="list-gap">${pastBookRows}</div>
        ${addPastBookForm}
      </div>

      <div>
        ${sectionLabelHtml("calendar-check", "Manage meetings")}
        <div class="list-gap">${meetingRows}</div>
        ${addMeetingForm}
      </div>

      <div>
        ${sectionLabelHtml("bell", "Manage announcements")}
        <div class="list-gap">${announcementRows}</div>
        ${addAnnouncementForm}
      </div>

      <div>
        ${sectionLabelHtml("star", "Manage activities")}
        <div class="list-gap">${activityRows}</div>
        ${addActivityForm}
      </div>

      ${dangerZone}
    </div>`;
}

/* -------------------------------------------------------------
   SHELL / NAV
------------------------------------------------------------- */

function renderShell() {
  const navButtons = TABS.map((t) => `
    <button class="nav-btn${activeTab === t.id ? " active" : ""}" data-tab="${t.id}">
      <i data-lucide="${t.icon}"></i>
      <span>${t.label}</span>
    </button>`).join("");

  return `
    <div class="shell">
      <header class="app-header">
        <div class="brand">
          <div class="brand-mark"><img src="logo.jpg" alt="" /></div>
          <span>The Page Collective</span>
        </div>
        <button class="icon-btn" id="logoutBtn"><i data-lucide="log-out"></i></button>
      </header>
      <main class="main-content" id="mainContent"></main>
      <nav class="bottom-nav">${navButtons}</nav>
    </div>`;
}

function renderTabContent() {
  switch (activeTab) {
    case "dashboard": return renderDashboard();
    case "members": return renderMembers();
    case "reading": return renderReadingTracker();
    case "attendance": return renderAttendance();
    case "points": return renderPointsAchievements();
    case "admin": return adminUnlocked ? renderAdminPanel() : renderAdminGate();
    default: return "";
  }
}

/* -------------------------------------------------------------
   MAIN RENDER
------------------------------------------------------------- */

function render() {
  const app = document.getElementById("app");
  try {
    if (!currentUserName) {
      app.innerHTML = renderLogin();
    } else {
      app.innerHTML = renderShell();
      document.getElementById("mainContent").innerHTML = renderTabContent();
    }
    renderModal();
  } catch (err) {
    console.error("Render error:", err);
    const main = document.getElementById("mainContent");
    const target = main || app;
    if (target) {
      target.innerHTML = `<div style="padding:20px;color:#F2EEE3;font-family:sans-serif">
        <strong>Something broke while rendering this screen.</strong><br/><br/>
        <span style="color:#87A896;font-size:12px">${escapeHtml(err.message)}</span><br/><br/>
        <span style="color:#87A896;font-size:12px">Open the browser console (F12) for the full error.</span>
      </div>`;
    }
  }
  try {
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    console.error("Icon render error:", err);
  }
}

function renderModal() {
  const overlay = document.getElementById("memberModalOverlay");
  const sheet = document.getElementById("memberModalSheet");
  if (selectedMemberId === null) {
    overlay.classList.add("hidden");
    sheet.innerHTML = "";
    return;
  }
  const member = findMember(selectedMemberId);
  if (!member) {
    overlay.classList.add("hidden");
    return;
  }
  overlay.classList.remove("hidden");
  sheet.innerHTML = renderMemberModal(member);
  if (window.lucide) lucide.createIcons();
}

/* -------------------------------------------------------------
   ACTIONS
------------------------------------------------------------- */

function attemptLogin() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) return;
  currentUserName = name;
  activeTab = "dashboard";
  render();
}

function renameSelf(id) {
  const m = findMember(id);
  if (!m) return;
  const newName = window.prompt("Edit your name:", m.name);
  if (newName === null) return; // cancelled
  const trimmed = newName.trim();
  if (!trimmed || trimmed === m.name) return;
  const duplicate = members.find((x) => x.id !== id && x.name.toLowerCase() === trimmed.toLowerCase());
  if (duplicate) {
    window.alert(`${duplicate.name} already has that name — pick a different one.`);
    return;
  }
  m.name = trimmed;
  currentUserName = trimmed; // keep "you" matching correct after the rename
  saveState();
  render();
}

function logout() {
  currentUserName = null;
  render();
}

function setTab(tab) {
  activeTab = tab;
  render();
}

function openMemberModal(id) {
  selectedMemberId = id;
  renderModal();
}

function closeMemberModal() {
  selectedMemberId = null;
  renderModal();
}

function toggleMeeting(id) {
  openMeetingId = openMeetingId === id ? null : id;
  render();
}

function setAttendance(meetingId, memberId, status) {
  const mt = meetings.find((m) => m.id === meetingId);
  if (!mt) return;
  const current = mt.status[memberId];
  mt.status[memberId] = current === status ? null : status;
  saveState();
  render();
}

function stepProgress(field, direction) {
  const you = findYou();
  if (!you) return;
  const step = field === "pages" ? 10 : 1;
  const max = field === "pages" ? currentBook.totalPages : currentBook.totalChapters;
  let value = you.progress[field] + direction * step;
  value = Math.max(0, Math.min(max, value));
  you.progress[field] = value;
  const base = field === "chapter" ? value / currentBook.totalChapters : you.progress.pages / currentBook.totalPages;
  you.progress.percent = Math.min(100, Math.round(base * 100));
  saveState();
  render();
}

function voteForOption(optionId) {
  const you = findYou();
  if (!you) return;
  poll.options.forEach((opt) => {
    const idx = opt.votes.indexOf(you.id);
    if (idx !== -1) opt.votes.splice(idx, 1);
  });
  const target = poll.options.find((o) => o.id === optionId);
  if (target) target.votes.push(you.id);
  saveState();
  render();
}

/* -------------------------------------------------------------
   ADMIN ACTIONS
------------------------------------------------------------- */

function attemptAdminUnlock() {
  const input = document.getElementById("adminPinInput");
  if (!input) return;
  if (input.value === ADMIN_PIN) {
    adminUnlocked = true;
    adminPinError = false;
  } else {
    adminPinError = true;
  }
  render();
}

function lockAdmin() {
  adminUnlocked = false;
  showFinishBookForm = false;
  render();
}

function recomputePercent(progress) {
  const chapterRatio = currentBook.totalChapters ? progress.chapter / currentBook.totalChapters : 0;
  const pageRatio = currentBook.totalPages ? progress.pages / currentBook.totalPages : 0;
  progress.percent = Math.max(0, Math.min(100, Math.round(((chapterRatio + pageRatio) / 2) * 100)));
}

function saveMemberEdits(id) {
  const m = findMember(id);
  if (!m) return;
  const nameInput = document.getElementById(`admin-name-${id}`);
  const roleInput = document.getElementById(`admin-role-${id}`);
  const points = document.getElementById(`admin-points-${id}`);
  const books = document.getElementById(`admin-books-${id}`);
  const chapter = document.getElementById(`admin-chapter-${id}`);
  const pages = document.getElementById(`admin-pages-${id}`);
  const photo = document.getElementById(`admin-photo-${id}`);
  const oldName = m.name;
  const newName = nameInput.value.trim();
  if (newName && newName !== oldName) {
    const duplicate = members.find((x) => x.id !== id && x.name.toLowerCase() === newName.toLowerCase());
    if (duplicate) {
      window.alert(`${duplicate.name} already has that name — pick a different one.`);
    } else {
      m.name = newName;
    }
  }
  const newRole = roleInput.value.trim();
  if (newRole) m.role = newRole;
  m.points = Math.max(0, Number(points.value) || 0);
  m.booksCompleted = Math.max(0, Number(books.value) || 0);
  m.progress.chapter = Math.max(0, Math.min(currentBook.totalChapters, Number(chapter.value) || 0));
  m.progress.pages = Math.max(0, Math.min(currentBook.totalPages, Number(pages.value) || 0));
  m.photo = photo.value.trim() || null;
  recomputePercent(m.progress);
  // if the admin just renamed whoever is currently logged in on this device, keep "you" matching correct
  if (currentUserName && oldName.toLowerCase() === currentUserName.toLowerCase() && m.name !== oldName) {
    currentUserName = m.name;
  }
  saveState();
  render();
}

function toggleBadge(id, key) {
  const m = findMember(id);
  if (!m || !BADGES[key]) return;
  const idx = m.badges.indexOf(key);
  if (idx === -1) m.badges.push(key);
  else m.badges.splice(idx, 1);
  saveState();
  render();
}

function removeMember(id) {
  const m = findMember(id);
  if (!m) return;
  if (!window.confirm(`Remove ${m.name} from the club?`)) return;
  members.splice(members.findIndex((x) => x.id === id), 1);
  meetings.forEach((mt) => { delete mt.status[id]; });
  if (selectedMemberId === id) selectedMemberId = null;
  if (highlight.memberId === id) highlight.memberId = null;
  poll.options.forEach((opt) => {
    const idx = opt.votes.indexOf(id);
    if (idx !== -1) opt.votes.splice(idx, 1);
  });
  saveState();
  render();
}

function saveHighlight() {
  const select = document.getElementById("admin-highlight-member");
  const noteInput = document.getElementById("admin-highlight-note");
  highlight.memberId = select.value ? Number(select.value) : null;
  highlight.note = noteInput.value.trim();
  saveState();
  render();
}

function savePollSettings() {
  const activeCheckbox = document.getElementById("admin-poll-active");
  const questionInput = document.getElementById("admin-poll-question");
  poll.active = activeCheckbox.checked;
  poll.question = questionInput.value.trim() || "Vote for our next book!";
  saveState();
  render();
}

function addPollOption() {
  const titleInput = document.getElementById("admin-poll-option-title");
  const authorInput = document.getElementById("admin-poll-option-author");
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (!title || !author) return;
  const newId = poll.options.length ? Math.max(...poll.options.map((o) => o.id)) + 1 : 1;
  poll.options.push({ id: newId, title, author, votes: [] });
  titleInput.value = "";
  authorInput.value = "";
  saveState();
  render();
}

function deletePollOption(id) {
  const idx = poll.options.findIndex((o) => o.id === id);
  if (idx === -1) return;
  poll.options.splice(idx, 1);
  saveState();
  render();
}

function resetPollVotes() {
  if (!window.confirm("Clear all votes? Options stay, but every vote count resets to zero.")) return;
  poll.options.forEach((o) => { o.votes = []; });
  saveState();
  render();
}

function addMember() {
  const nameInput = document.getElementById("admin-new-member-name");
  const roleInput = document.getElementById("admin-new-member-role");
  const name = nameInput.value.trim();
  if (!name) return;
  const role = roleInput.value.trim() || "Member";
  const newId = members.length ? Math.max(...members.map((m) => m.id)) + 1 : 1;
  members.push({
    id: newId, name, role,
    joined: new Date().toISOString().slice(0, 10),
    points: 0, booksCompleted: 0,
    progress: { percent: 0, chapter: 0, pages: 0, totalPages: currentBook.totalPages },
    badges: ["newChapter"],
    photo: null,
  });
  nameInput.value = "";
  roleInput.value = "";
  saveState();
  render();
}

function saveBookDetails() {
  const title = document.getElementById("admin-book-title").value.trim();
  const author = document.getElementById("admin-book-author").value.trim();
  const totalPages = Math.max(1, Number(document.getElementById("admin-book-pages").value) || currentBook.totalPages);
  const totalChapters = Math.max(1, Number(document.getElementById("admin-book-chapters").value) || currentBook.totalChapters);
  const startDate = document.getElementById("admin-book-start").value || currentBook.startDate;
  const targetDate = document.getElementById("admin-book-target").value || currentBook.targetDate;
  const cover = document.getElementById("admin-book-cover").value.trim() || null;
  const pdfLink = document.getElementById("admin-book-pdf").value.trim() || null;
  if (!title || !author) return;
  Object.assign(currentBook, { title, author, totalPages, totalChapters, startDate, targetDate, cover, pdfLink });
  members.forEach((m) => {
    m.progress.totalPages = totalPages;
    m.progress.chapter = Math.min(m.progress.chapter, totalChapters);
    m.progress.pages = Math.min(m.progress.pages, totalPages);
    recomputePercent(m.progress);
  });
  saveState();
  render();
}

function toggleFinishBookForm() {
  showFinishBookForm = !showFinishBookForm;
  render();
}

function deletePastBook(index) {
  pastBooks.splice(index, 1);
  saveState();
  render();
}

function addPastBookManually() {
  const title = document.getElementById("admin-pastbook-title").value.trim();
  const author = document.getElementById("admin-pastbook-author").value.trim();
  const finished = document.getElementById("admin-pastbook-finished").value;
  const rating = parseFloat(document.getElementById("admin-pastbook-rating").value);
  const cover = document.getElementById("admin-pastbook-cover").value.trim() || null;
  const pdfLink = document.getElementById("admin-pastbook-pdf").value.trim() || null;
  if (!title || !author || !finished) return;
  pastBooks.unshift({
    title, author, finished,
    rating: isNaN(rating) ? 0 : rating,
    spineColor: SPINE_PALETTE[pastBooks.length % SPINE_PALETTE.length],
    cover, pdfLink,
  });
  saveState();
  render();
}

function savePastBookCover(index) {
  const book = pastBooks[index];
  if (!book) return;
  const coverInput = document.getElementById(`admin-pastbook-cover-${index}`);
  const pdfInput = document.getElementById(`admin-pastbook-pdf-${index}`);
  book.cover = coverInput.value.trim() || null;
  book.pdfLink = pdfInput.value.trim() || null;
  saveState();
  render();
}

function confirmFinishBook() {
  const rating = parseFloat(document.getElementById("admin-finish-rating").value);
  const title = document.getElementById("admin-next-title").value.trim();
  const author = document.getElementById("admin-next-author").value.trim();
  const totalPages = Math.max(1, Number(document.getElementById("admin-next-pages").value) || 0);
  const totalChapters = Math.max(1, Number(document.getElementById("admin-next-chapters").value) || 0);
  const startDate = document.getElementById("admin-next-start").value;
  const targetDate = document.getElementById("admin-next-target").value;
  const nextCover = document.getElementById("admin-next-cover").value.trim() || null;
  const nextPdf = document.getElementById("admin-next-pdf").value.trim() || null;
  if (!title || !author || !totalPages || !totalChapters || !startDate || !targetDate) {
    window.alert("Please fill in every field for the next book before continuing.");
    return;
  }
  pastBooks.unshift({
    title: currentBook.title, author: currentBook.author,
    finished: new Date().toISOString().slice(0, 10),
    rating: isNaN(rating) ? 0 : rating,
    spineColor: currentBook.spineColor,
    cover: currentBook.cover || null,
    pdfLink: currentBook.pdfLink || null,
  });
  Object.assign(currentBook, {
    title, author, totalPages, totalChapters, startDate, targetDate,
    spineColor: SPINE_PALETTE[pastBooks.length % SPINE_PALETTE.length],
    cover: nextCover,
    pdfLink: nextPdf,
  });
  members.forEach((m) => {
    m.booksCompleted += 1;
    m.progress = { percent: 0, chapter: 0, pages: 0, totalPages };
  });
  showFinishBookForm = false;
  saveState();
  render();
}

function deleteMeeting(id) {
  const idx = meetings.findIndex((m) => m.id === id);
  if (idx === -1) return;
  if (!window.confirm("Delete this meeting and its attendance record?")) return;
  meetings.splice(idx, 1);
  if (openMeetingId === id) openMeetingId = meetings.length ? meetings[0].id : null;
  saveState();
  render();
}

function addMeeting() {
  const date = document.getElementById("admin-meeting-date").value;
  const time = document.getElementById("admin-meeting-time").value.trim();
  const topic = document.getElementById("admin-meeting-topic").value.trim();
  const upcoming = document.getElementById("admin-meeting-upcoming").checked;
  if (!date || !time || !topic) return;
  if (upcoming) meetings.forEach((m) => { m.upcoming = false; });
  const newId = meetings.length ? Math.max(...meetings.map((m) => m.id)) + 1 : 1;
  const status = {};
  members.forEach((m) => { status[m.id] = null; });
  meetings.push({ id: newId, date, time, topic, upcoming, status });
  meetings.sort((a, b) => new Date(b.date) - new Date(a.date));
  saveState();
  render();
}

function deleteAnnouncement(index) {
  announcements.splice(index, 1);
  saveState();
  render();
}

function addAnnouncement() {
  const input = document.getElementById("admin-announcement-text");
  const text = input.value.trim();
  if (!text) return;
  announcements.unshift({ date: new Date().toISOString().slice(0, 10), text });
  saveState();
  render();
}

function deleteActivity(index) {
  activities.splice(index, 1);
  saveState();
  render();
}

function addActivity() {
  const titleInput = document.getElementById("admin-activity-title");
  const dateInput = document.getElementById("admin-activity-date");
  const title = titleInput.value.trim();
  const date = dateInput.value;
  if (!title || !date) return;
  activities.push({ title, date });
  activities.sort((a, b) => new Date(a.date) - new Date(b.date));
  saveState();
  render();
}

/* -------------------------------------------------------------
   EVENT DELEGATION
------------------------------------------------------------- */

document.addEventListener("click", (e) => {
  const enterBtn = e.target.closest("#enterBtn");
  if (enterBtn) { attemptLogin(); return; }

  const logoutBtn = e.target.closest("#logoutBtn");
  if (logoutBtn) { logout(); return; }

  const tabBtn = e.target.closest("[data-tab]");
  if (tabBtn) { setTab(tabBtn.dataset.tab); return; }

  const gotoTab = e.target.closest("[data-goto-tab]");
  if (gotoTab) { setTab(gotoTab.dataset.gotoTab); return; }

  const renameSelfBtn = e.target.closest("[data-rename-self]");
  if (renameSelfBtn) { renameSelf(Number(renameSelfBtn.dataset.renameSelf)); return; }

  const memberRow = e.target.closest("[data-open-member]");
  if (memberRow) { openMemberModal(Number(memberRow.dataset.openMember)); return; }

  const closeModal = e.target.closest("[data-close-modal]");
  if (closeModal && (e.target.id === "memberModalOverlay" || closeModal.id === "memberModalOverlay" || closeModal.hasAttribute("data-close-modal"))) {
    // only close if the click was on the overlay itself or the explicit close icon, not inside the sheet content
    if (e.target === document.getElementById("memberModalOverlay") || e.target.closest(".modal-close-row")) {
      closeMemberModal();
      return;
    }
  }

  const meetingToggle = e.target.closest("[data-meeting-toggle]");
  if (meetingToggle) { toggleMeeting(Number(meetingToggle.dataset.meetingToggle)); return; }

  const statusBtn = e.target.closest("[data-status-btn]");
  if (statusBtn) {
    setAttendance(Number(statusBtn.dataset.meeting), Number(statusBtn.dataset.member), statusBtn.dataset.status);
    return;
  }

  const stepBtn = e.target.closest("[data-step]");
  if (stepBtn) {
    stepProgress(stepBtn.dataset.step, Number(stepBtn.dataset.dir));
    return;
  }

  const voteBtn = e.target.closest("[data-vote-option]");
  if (voteBtn) { voteForOption(Number(voteBtn.dataset.voteOption)); return; }

  const adminUnlockBtn = e.target.closest("#adminUnlockBtn");
  if (adminUnlockBtn) { attemptAdminUnlock(); return; }

  const adminLockBtn = e.target.closest("[data-admin-lock]");
  if (adminLockBtn) { lockAdmin(); return; }

  const saveMemberBtn = e.target.closest("[data-admin-save-member]");
  if (saveMemberBtn) { saveMemberEdits(Number(saveMemberBtn.dataset.adminSaveMember)); return; }

  const removeMemberBtn = e.target.closest("[data-admin-remove-member]");
  if (removeMemberBtn) { removeMember(Number(removeMemberBtn.dataset.adminRemoveMember)); return; }

  const addMemberBtn = e.target.closest("[data-admin-add-member]");
  if (addMemberBtn) { addMember(); return; }

  const saveHighlightBtn = e.target.closest("[data-admin-save-highlight]");
  if (saveHighlightBtn) { saveHighlight(); return; }

  const savePollSettingsBtn = e.target.closest("[data-admin-save-poll-settings]");
  if (savePollSettingsBtn) { savePollSettings(); return; }

  const addPollOptionBtn = e.target.closest("[data-admin-add-poll-option]");
  if (addPollOptionBtn) { addPollOption(); return; }

  const deletePollOptionBtn = e.target.closest("[data-admin-delete-poll-option]");
  if (deletePollOptionBtn) { deletePollOption(Number(deletePollOptionBtn.dataset.adminDeletePollOption)); return; }

  const resetPollVotesBtn = e.target.closest("[data-admin-reset-poll-votes]");
  if (resetPollVotesBtn) { resetPollVotes(); return; }


  const toggleBadgeBtn = e.target.closest("[data-admin-toggle-badge]");
  if (toggleBadgeBtn) {
    const [memberId, key] = toggleBadgeBtn.dataset.adminToggleBadge.split(":");
    toggleBadge(Number(memberId), key);
    return;
  }

  const saveBookBtn = e.target.closest("[data-admin-save-book]");
  if (saveBookBtn) { saveBookDetails(); return; }

  const toggleFinishBtn = e.target.closest("[data-admin-toggle-finish]");
  if (toggleFinishBtn) { toggleFinishBookForm(); return; }

  const deletePastBookBtn = e.target.closest("[data-admin-delete-pastbook]");
  if (deletePastBookBtn) { deletePastBook(Number(deletePastBookBtn.dataset.adminDeletePastbook)); return; }

  const saveCoverBtn = e.target.closest("[data-admin-save-pastbook-cover]");
  if (saveCoverBtn) { savePastBookCover(Number(saveCoverBtn.dataset.adminSavePastbookCover)); return; }

  const addPastBookBtn = e.target.closest("[data-admin-add-pastbook]");
  if (addPastBookBtn) { addPastBookManually(); return; }

  const confirmFinishBtn = e.target.closest("[data-admin-confirm-finish]");
  if (confirmFinishBtn) { confirmFinishBook(); return; }

  const deleteMeetingBtn = e.target.closest("[data-admin-delete-meeting]");
  if (deleteMeetingBtn) { deleteMeeting(Number(deleteMeetingBtn.dataset.adminDeleteMeeting)); return; }

  const addMeetingBtn = e.target.closest("[data-admin-add-meeting]");
  if (addMeetingBtn) { addMeeting(); return; }

  const deleteAnnouncementBtn = e.target.closest("[data-admin-delete-announcement]");
  if (deleteAnnouncementBtn) { deleteAnnouncement(Number(deleteAnnouncementBtn.dataset.adminDeleteAnnouncement)); return; }

  const addAnnouncementBtn = e.target.closest("[data-admin-add-announcement]");
  if (addAnnouncementBtn) { addAnnouncement(); return; }

  const deleteActivityBtn = e.target.closest("[data-admin-delete-activity]");
  if (deleteActivityBtn) { deleteActivity(Number(deleteActivityBtn.dataset.adminDeleteActivity)); return; }

  const addActivityBtn = e.target.closest("[data-admin-add-activity]");
  if (addActivityBtn) { addActivity(); return; }

  const resetBtn = e.target.closest("[data-admin-reset]");
  if (resetBtn) { resetAllData(); return; }
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (e.target.id === "adminPinInput") attemptAdminUnlock();
  if (e.target.id === "nameInput") attemptLogin();
});

/* -------------------------------------------------------------
   INIT
------------------------------------------------------------- */

render();
subscribeToState();
