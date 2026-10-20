/* moc-enhance.js —— 无双大蛇 ChronicleS 事典化重构 */
(function () {
  'use strict';
  if (window.MOC_ENHANCED) return;
  window.MOC_ENHANCED = true;

  // 1. 立即获取或创建遮罩层
  var veil = document.getElementById('moc-preload-veil');
  if (!veil) {
    veil = document.createElement('div');
    veil.id = 'moc-preload-veil';
    veil.style.cssText = 'position:fixed;inset:0;background:#050508;z-index:2147483647;display:flex;align-items:center;justify-content:center;color:#e8c878;font-family:sans-serif;font-size:14px;letter-spacing:0.5em;transition:opacity 0.4s ease;';
    veil.textContent = 'L O A D I N G';
    (document.body || document.documentElement).appendChild(veil);
  }

  function hideVeil() {
    if (!veil || !veil.parentNode) return;
    veil.style.opacity = '0';
    setTimeout(function () {
      if (veil && veil.parentNode) veil.parentNode.removeChild(veil);
    }, 400);
  }

  const CSS = `
  /* ============ 全局与滚动条锁定 ============ */
  * { box-sizing: border-box; }
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    height: 100vh !important;
    overflow: hidden !important;
    background: #0a0a0d !important;
    color: #dcdce4 !important;
    font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif !important;
    font-size: 17px !important;
    line-height: 1.95 !important;
    letter-spacing: 0.02em;
    -webkit-font-smoothing: antialiased;
  }
  body > .box2 {
    height: 100vh !important;
    overflow: hidden !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
  }

  /* ============ 着陆区（底层） ============ */
  .moc-landing {
    position: absolute;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    z-index: 1;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    background: #050508;
  }
  .moc-landing-bg {
    position: absolute; inset: 0; z-index: 0;
  }
  .moc-landing-bg img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.35) blur(1.5px);
    transform: scale(1.08);
    animation: mocSlowZoom 20s ease-in-out infinite alternate;
  }
  @keyframes mocSlowZoom {
    from { transform: scale(1.05); }
    to   { transform: scale(1.15); }
  }
  .moc-landing-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 80%),
                linear-gradient(180deg, transparent 0%, #0a0a0d 100%);
  }
  .moc-landing-content {
    position: relative; z-index: 2;
    height: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 40px 20px;
  }
  .moc-landing-eyebrow {
    font-size: 15px; font-weight: 600; letter-spacing: 0.42em;
    color: #e0c080; margin-bottom: 26px; opacity: 0.95;
    text-shadow: 0 0 12px rgba(224, 192, 128, 0.3);
  }
  .moc-landing-title {
    margin: 0 0 24px;
    font-family: "Noto Serif SC", "STZhongsong", "华文中宋", serif;
    font-size: clamp(42px, 8vw, 96px);
    font-weight: 900; letter-spacing: 0.06em;
    background: linear-gradient(180deg, #ffffff 0%, #e8d0a0 60%, #c9a14a 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 40px rgba(201, 161, 74, 0.35), 0 0 80px rgba(180, 50, 50, 0.25);
    line-height: 1.05;
  }
  .moc-landing-title span {
    display: block;
    font-family: "Noto Serif SC", "STZhongsong", "华文中宋", serif;
    font-size: 0.42em; font-weight: 900; letter-spacing: 0.85em;
    margin-top: 28px; margin-right: -0.85em;
    background: none; -webkit-text-fill-color: #e8c878; color: #e8c878;
    text-shadow: 0 0 24px rgba(232, 200, 120, 0.45), 0 0 60px rgba(201, 161, 74, 0.25);
  }
  .moc-landing-meta {
    color: #a0a0ab; font-size: 15px; letter-spacing: 0.22em; margin-bottom: 60px;
  }
  .moc-scroll-hint {
    color: #e0c080; font-size: 14px; letter-spacing: 0.25em;
    display: flex; flex-direction: column; align-items: center; gap: 14px; opacity: 0.9;
  }
  .moc-scroll-hint .moc-arrow {
    font-size: 20px; animation: mocBounce 1.8s ease-in-out infinite;
  }
  @keyframes mocBounce {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(10px); }
  }

  /* ============ 主布局（顶层，推拉式） ============ */
  .moc-app {
    position: absolute; top: 0; left: 0;
    width: 100vw; height: 100vh;
    display: flex; z-index: 10;
    background: #0a0a0d;
    transform: translateY(100vh);
    transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
  }
  .moc-app.active {
    transform: translateY(0);
  }

  /* ============ 侧边栏 ============ */
  .moc-sidebar {
    width: 340px;
    height: calc(100vh - 76px);
    background: linear-gradient(180deg, #131318 0%, #0d0d12 100%);
    border-right: 1px solid #1e1e26;
    display: flex; flex-direction: column; flex-shrink: 0;
  }
  .moc-sb-head {
    padding: 24px 22px 18px;
    border-bottom: 1px solid #1e1e26; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(201,161,74,0.08), transparent);
    cursor: pointer; transition: background 0.2s;
  }
  .moc-sb-head:hover { background: linear-gradient(135deg, rgba(201,161,74,0.15), transparent); }
  .moc-sb-brand {
    font-family: "Noto Serif SC", "STZhongsong", "华文中宋", serif;
    font-size: 20px; font-weight: 900; color: #e8c878; letter-spacing: 0.12em;
    text-shadow: 0 0 12px rgba(232, 200, 120, 0.25);
  }
  .moc-sb-sub {
    font-size: 15px; color: #b0b0bd; letter-spacing: 0.2em; font-weight: 500;
    font-family: "Noto Serif SC", "STZhongsong", "华文中宋", serif;
  }
  .moc-sb-tree {
    flex: 1; overflow-y: auto; padding: 14px 12px;
    scrollbar-width: thin; scrollbar-color: #2a2a35 transparent;
  }
  .moc-sb-tree::-webkit-scrollbar { width: 6px; }
  .moc-sb-tree::-webkit-scrollbar-thumb { background: #2a2a35; border-radius: 3px; }
  .moc-sb-tree::-webkit-scrollbar-thumb:hover { background: #c9a14a; }

  /* ============ “部”的折叠动画（0.25s 干脆利落） ============ */
  .moc-sb-section { 
    display: grid;
    grid-template-rows: auto 1fr;
    transition: grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1); /* 如果想更快可改成 0.15s */
    margin-bottom: 6px; 
  }
  .moc-sb-section.collapsed { 
    grid-template-rows: auto 0fr;
  }
  
  .moc-sb-section-head {
    display: flex; align-items: center; gap: 10px; padding: 12px 14px;
    background: #17171e; border-left: 3px solid #c9a14a; border-radius: 3px;
    cursor: pointer; user-select: none; transition: background 0.15s;
  }
  .moc-sb-section-head:hover { background: #1f1f28; }
  .moc-sb-num {
    color: #f0d090; font-weight: 900; font-size: 17px; letter-spacing: 0.05em;
    text-shadow: 0 0 8px rgba(240, 208, 144, 0.25);
  }
  .moc-sb-sub2 {
    color: #b0b0bd; font-size: 15px; flex: 1; letter-spacing: 0.04em; font-weight: 500;
  }
  
  .moc-sb-toggle { 
    color: #888; font-size: 16px;
    transition: transform 0.25s ease; 
  }
  .moc-sb-section.collapsed .moc-sb-toggle { 
    transform: rotate(-90deg); 
  }

  .moc-sb-chapters {
    overflow: hidden;
    min-height: 0;
  }
  .moc-sb-chapters-inner {
    padding: 2px 0 6px; margin-left: 14px; border-left: 1px dashed #2a2a35;
    transition: opacity 0.2s ease;
  }
  .moc-sb-section.collapsed .moc-sb-chapters-inner {
    opacity: 0;
  }

  /* ============ 章节组（0.25s 干脆利落） ============ */
  .moc-sb-chapter-group { 
    display: grid;
    grid-template-rows: auto 0fr;
    transition: grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1); /* 如果想更快可改成 0.15s */
    margin-bottom: 2px;
  }
  .moc-sb-chapter-group.expanded {
    grid-template-rows: auto 1fr;
  }
  .moc-sb-chapter-head {
    display: flex; align-items: center; justify-content: space-between;
  }
  .moc-sb-chapter {
    flex: 1;
    display: block; width: 100%; text-align: left;
    background: transparent; border: none; color: #c8c8d4;
    padding: 9px 14px; font-size: 14px; font-weight: 500;
    cursor: pointer; border-radius: 3px; transition: all 0.15s; line-height: 1.4;
  }
  .moc-sb-chapter:hover { color: #e8c878; }
  .moc-sb-chapter.active { color: #e8c878; }
  
  .moc-sb-chapter-toggle {
    padding: 8px 16px; 
    color: #888; 
    font-size: 16px; 
    cursor: pointer; 
    transition: transform 0.25s ease;
    transform: rotate(-90deg);
  }
  .moc-sb-chapter-group.expanded .moc-sb-chapter-toggle {
    transform: rotate(0deg);
  }
  
  .moc-sb-subchapters {
    overflow: hidden;
    min-height: 0;
    padding-bottom: 4px;
  }

  /* ============ 小节 ============ */
  .moc-sb-subchapter {
    display: block; width: 100%; text-align: left;
    background: transparent; border: none; color: #a8a8b8;
    padding: 6px 12px 6px 20px; font-size: 13.5px; font-weight: 500;
    cursor: pointer; border-radius: 3px; transition: all 0.15s; line-height: 1.45;
    font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif !important;
  }
  .moc-sb-subchapter:hover { color: #e8c878; }
  
  .moc-sb-subchapter.active {
    color: #e8c878;
    background: rgba(201,161,74,0.08);
    border-left: 2px solid #c9a14a;
    padding-left: 18px;
  }

  /* 阅读进度条 */
  .moc-sb-progress {
    height: 4px;
    background: #1e1e26;
    width: 100%;
    flex-shrink: 0;
  }
  .moc-sb-progress-bar {
    height: 100%;
    background: #c9a14a;
    width: 0%;
    transition: width 0.2s linear;
  }

  .moc-sb-foot {
    padding: 14px 20px; border-top: 1px solid #1e1e26; flex-shrink: 0;
    font-size: 11px; color: #6a6a75; background: #0d0d12;
  }
  .moc-sb-credit { margin-bottom: 6px; letter-spacing: 0.05em; font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif !important;}
  .moc-sb-link { color: #c9a14a; text-decoration: none; font-size: 11.5px; }
  .moc-sb-link:hover { text-decoration: underline; }

  /* ============ 内容区 ============ */
  .moc-content {
    flex: 1; height: calc(100vh - 76px);
    overflow-y: auto; overflow-x: hidden;
    padding: 44px 64px 40px;
    background: #0a0a0d; scrollbar-width: thin; scrollbar-color: #2a2a35 #0a0a0d;
    position: relative;
  }
  .moc-content::-webkit-scrollbar { width: 10px; }
  .moc-content::-webkit-scrollbar-track { background: #0a0a0d; }
  .moc-content::-webkit-scrollbar-thumb {
    background: #2a2a35; border-radius: 5px; border: 2px solid #0a0a0d;
  }
  .moc-content::-webkit-scrollbar-thumb:hover { background: #c9a14a; }

  .moc-content > .a, .moc-content > .b, .moc-content > .c, .moc-content > .d,
  .moc-content > .e, .moc-content > .f, .moc-content > .g, .moc-content > .h,
  .moc-content > .help { display: none; }

  /* ============ 核心：强制抹平大节高度差 ============ */
  .moc-content > div[class] {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }
  .moc-content .headclass {
    margin-top: 0 !important;
    padding-top: 0 !important;
    scroll-margin-top: 24px;
  }
  .moc-content .headtitle {
    margin-top: 0 !important;
  }

  .moc-content .headclass { margin-bottom: 40px; }
  .moc-content .headtitle {
    color: #e8d0a0 !important;
    font-family: "Noto Serif SC", "STZhongsong", "华文中宋", serif !important;
    font-size: 26px !important; font-weight: 700; letter-spacing: 0.08em; line-height: 1.6;
    margin: 0 0 20px 0 !important; padding-bottom: 12px; border-bottom: 1px solid #1e1e26;
  }
  .moc-content .headtitle center { color: #e8c878; font-size: 1.1em; font-weight: 700; }
  .moc-content .headtitle img { max-width: 90px; vertical-align: middle; margin: 8px 6px; filter: drop-shadow(0 0 8px rgba(201,161,74,0.4)); }
  .moc-content .headline { display: none !important; }

  .moc-content .rootbox {
    background: linear-gradient(180deg, #111118 0%, #0e0e14 100%);
    border-radius: 6px; padding: 22px 26px; margin-bottom: 18px;
    border-left: 3px solid #2a2a35; transition: border-color 0.2s, transform 0.2s;
    scroll-margin-top: 24px;
  }
  .moc-content .rootbox:hover { border-left-color: #c9a14a; transform: translateX(2px); }
  .moc-content .roottitle {
    color: #e8d0a0; font-family: "Noto Serif SC", "STZhongsong", "华文中宋", serif;
    font-size: 18px; font-weight: 700; letter-spacing: 0.06em;
    margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px dashed #2a2a35; cursor: default;
  }
  .moc-content .arrow { display: none !important; }
  .moc-content .rootcontent {
    display: block !important; color: #d8d8e0;
    line-height: 2.05; font-size: 16.5px; letter-spacing: 0.03em;
    font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif !important;
  }
  .moc-content .tit {
    color: #d8b560; font-size: 15px; font-weight: 600; letter-spacing: 0.05em;
    display: block; margin-top: 14px; margin-bottom: 6px;
    font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif !important;
  }
  .moc-content .tit i { font-style: normal; }
  .moc-content .tit b { font-weight: 700; }
  .moc-content center {
    display: block; text-align: center; color: #e0c080; margin: 14px 0; line-height: 1.9;
  }
  .moc-content audio { display: none !important; }

  /* ============ 播放器 ============ */
  .moc-player {
    position: fixed; bottom: 0; right: 0; left: 0;
    height: 76px;
    background: rgba(10, 10, 13, 0.92);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid #1e1e26; z-index: 100;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
  }

  .moc-player-main {
    display: flex; align-items: center; gap: 14px; padding: 10px 22px; height: 100%;
  }
  .moc-pl-btn {
    background: transparent; border: 1px solid #2a2a35; color: #c9a14a;
    width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 13px; transition: all 0.15s; flex-shrink: 0;
  }
  .moc-pl-btn:hover { background: #c9a14a; color: #0a0a0d; border-color: #c9a14a; }
  .moc-pl-play {
    width: 46px; height: 46px; font-size: 15px;
    background: linear-gradient(135deg, #c9a14a, #a07a2a);
    color: #0a0a0d; border-color: #c9a14a;
  }
  .moc-pl-play:hover { background: linear-gradient(135deg, #e0c080, #c9a14a); }
  .moc-pl-info { flex: 1; min-width: 0; }
  .moc-pl-title {
    color: #e8c878; font-size: 14px; margin-bottom: 6px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif !important;
  }
  .moc-pl-progress {
    height: 4px; background: #22222c; border-radius: 2px; cursor: pointer; overflow: hidden;
  }
  .moc-pl-fill {
    height: 100%; width: 0%; background: linear-gradient(90deg, #a07a2a, #e0c080);
    border-radius: 2px; transition: width 0.1s linear;
  }
  .moc-pl-time {
    color: #888; font-size: 11.5px; font-family: "SF Mono", Consolas, monospace;
    flex-shrink: 0; min-width: 92px; text-align: right;
  }
  .moc-pl-volume {
    display: flex; align-items: center; gap: 8px; flex-shrink: 0;
    margin-left: 4px; padding-left: 14px; border-left: 1px solid #1e1e26;
  }
  .moc-pl-volslider {
    width: 90px; height: 4px; -webkit-appearance: none; appearance: none;
    background: #22222c; border-radius: 2px; outline: none; cursor: pointer;
  }
  .moc-pl-volslider:hover { background: #2a2a35; }
  .moc-pl-volslider::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none; width: 12px; height: 12px;
    border-radius: 50%; background: #e0c080; cursor: pointer;
    box-shadow: 0 0 6px rgba(224, 192, 128, 0.5);
  }
  .moc-pl-volslider::-moz-range-thumb {
    width: 12px; height: 12px; border-radius: 50%; background: #e0c080; border: none;
  }
  .moc-pl-list {
    display: none; background: rgba(5, 5, 8, 0.95); border-top: 1px solid #1e1e26;
    max-height: 320px; overflow-y: auto; padding: 8px;
    position: absolute; bottom: 76px; left: 0; right: 0;
  }
  .moc-player.moc-pl-list-open .moc-pl-list { display: block; }
  .moc-pl-item {
    display: block; width: 100%; text-align: left; background: transparent;
    border: none; color: #c8c8d4; padding: 9px 14px; font-size: 14px;
    cursor: pointer; border-radius: 3px; transition: all 0.15s;
    font-family: "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif !important;
  }
  .moc-pl-item:hover { background: #1e1e26; color: #e8c878; }
  .moc-pl-item.active {
    color: #e8c878; background: rgba(201,161,74,0.1);
    border-left: 2px solid #c9a14a; padding-left: 12px;
  }

  /* ============ 移动端 ============ */
  .moc-mobile-toggle {
    display: none; position: fixed; top: 14px; left: 14px; z-index: 200;
    background: linear-gradient(135deg, #c9a14a, #a07a2a); color: #0a0a0d;
    border: none; width: 44px; height: 44px; border-radius: 50%;
    font-size: 18px; cursor: pointer; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 900px) {
    .moc-sidebar {
      position: fixed; top: 0; left: 0; transform: translateX(-100%);
      z-index: 150; box-shadow: 4px 0 24px rgba(0, 0, 0, 0.6); transition: transform 0.3s ease;
      height: calc(100vh - 76px);
    }
    .moc-sidebar.open { transform: translateX(0); }
    .moc-mobile-toggle { display: flex; align-items: center; justify-content: center; }
    .moc-content { padding: 70px 20px 30px; }
    .moc-pl-time { display: none; }
    .moc-pl-prev, .moc-pl-next { display: none; }
    .moc-pl-volslider { width: 60px; }
  }
  @media (max-width: 600px) {
    .moc-content { padding: 60px 12px 30px; }
    .moc-content .rootbox { padding: 16px; }
    .moc-content .headtitle { font-size: 20px !important; }
    .moc-player-main { padding: 8px 12px; gap: 10px; }
    .moc-pl-volume { display: none; }
  }

  .backtotop { display: none !important; }
  `;

  function injectCSS() {
    if (document.getElementById('moc-style')) return;
    const s = document.createElement('style');
    s.id = 'moc-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (children) for (const c of children) {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else e.appendChild(c);
    }
    return e;
  }

  const STATE = {
    box: null,
    sidebar: null,
    content: null,
    tree: null,
    chapters: new Map(),
    parts: [],
    player: null,
    progressBar: null,
    app: null,
    chapterList: [],
    currentChapterIndex: 0,
    totalChapters: 0,
    scrollRequest: null
  };

  function updateProgressBar() {
    if (!STATE.progressBar || !STATE.content) return;
    if (STATE.totalChapters === 0) {
      STATE.progressBar.style.width = '0%';
      return;
    }
    const maxScroll = STATE.content.scrollHeight - STATE.content.clientHeight;
    let localProgress = maxScroll > 0 ? (STATE.content.scrollTop / maxScroll) : 0;
    
    if (localProgress < 0) localProgress = 0;
    if (localProgress > 1) localProgress = 1;

    const globalProgress = (STATE.currentChapterIndex + localProgress) / STATE.totalChapters;
    STATE.progressBar.style.width = (globalProgress * 100) + '%';
  }

  function buildLanding(box) {
    const articleBox = box.querySelector(':scope > .articlebox');
    const landing = el('section', { class: 'moc-landing', html: `
      <div class="moc-landing-bg">
        <img src="src/wp1.png" alt="无双大蛇 ChronicleS">
      </div>
      <div class="moc-landing-overlay"></div>
      <div class="moc-landing-content">
        <div class="moc-landing-eyebrow">KOEI TECMO 呈献<br>群星汇聚 · 经典之作</div>
        <h1 class="moc-landing-title">无双大蛇<span>ChronicleS</span></h1>
        <div class="moc-landing-meta">全剧情事典 · 系列全收录</div>
        <div class="moc-scroll-hint">
          <span>E N T E R</span>
          <span class="moc-arrow">▼</span>
        </div>
      </div>
    `});

    if (articleBox) articleBox.replaceWith(landing);
    else box.insertBefore(landing, box.firstChild);

    let isHidden = false;

    function goToApp() {
      if (isHidden) return;
      isHidden = true;
      STATE.app.classList.add('active');
      document.body.classList.add('app-active');
    }

    window.mocGoToLanding = function() {
      if (!isHidden) return;
      isHidden = false;
      STATE.app.classList.remove('active');
      document.body.classList.remove('app-active');
    };

    landing.addEventListener('click', goToApp);

    document.addEventListener('wheel', function (e) {
      if (e.deltaY > 0 && !isHidden) {
        e.preventDefault();
        goToApp();
      }
    }, { passive: false, capture: true });

    let touchStartY = null;
    document.addEventListener('touchstart', function (e) {
      if (!isHidden) touchStartY = e.touches[0].clientY;
    }, { passive: true, capture: true });
    document.addEventListener('touchmove', function (e) {
      if (touchStartY === null) return;
      if (touchStartY - e.touches[0].clientY > 40) {
        e.preventDefault();
        touchStartY = null;
        goToApp();
      }
    }, { passive: false, capture: true });

    let mouseStartY = null;
    landing.addEventListener('mousedown', function (e) { mouseStartY = e.clientY; });
    document.addEventListener('mousemove', function (e) {
      if (mouseStartY !== null && mouseStartY - e.clientY > 40) {
        mouseStartY = null;
        goToApp();
      }
    });
    document.addEventListener('mouseup', function () { mouseStartY = null; });

    document.addEventListener('keydown', function (e) {
      if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].indexOf(e.key) >= 0 && !isHidden) {
        e.preventDefault();
        goToApp();
      }
    });
  }

  const PART_KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'help'];
  const PART_INFO = {
    a:    ['第一部', '魔王爆诞'], b:    ['第二部', '异界争乱'],
    c:    ['第三部', '魔王再临'], d:    ['第四部', '妖蛇袭来'],
    e:    ['第五部', '歼灭妖蛇'], f:    ['第六部', '神镜世界'],
    g:    ['第七部', '异界再临'], h:    ['第八部', '诸神黄昏'],
    help: ['导引',   '指南与资料'],
  };

  function buildApp(box) {
    const app = el('div', { class: 'moc-app' });
    STATE.app = app;

    const sidebar = el('aside', { class: 'moc-sidebar', html: `
      <div class="moc-sb-head" title="返回首页">
        <div class="moc-sb-brand">无双大蛇</div>
        <div class="moc-sb-sub">ChronicleS · 事典</div>
      </div>
      <nav class="moc-sb-tree"></nav>
      <div class="moc-sb-progress"><div class="moc-sb-progress-bar" id="moc-progress-bar"></div></div>
      <div class="moc-sb-foot">
        <div class="moc-sb-credit">v1.6-enhanced · Edit by Nanasi Yupzhou</div>
        <a href="https://yupzhou.github.io/JPRoots/" target="_blank" class="moc-sb-link" style="display:none;">JPRoots 日琉语之道 ↗</a>
      </div>
    `});

    sidebar.querySelector('.moc-sb-head').addEventListener('click', function() {
      if (window.mocGoToLanding) window.mocGoToLanding();
    });

    const tree = sidebar.querySelector('.moc-sb-tree');
    STATE.sidebar = sidebar;
    STATE.tree = tree;
    STATE.progressBar = sidebar.querySelector('.moc-sb-progress-bar');

    const content = el('main', { class: 'moc-content' });
    STATE.content = content;

    content.addEventListener('scroll', function() {
      if (STATE.scrollRequest) return;
      STATE.scrollRequest = window.requestAnimationFrame(function() {
        updateProgressBar();
        STATE.scrollRequest = null;
      });
    });

    let chapterCount = 0;
    PART_KEYS.forEach(function (key) {
      const partEl = box.querySelector(':scope > .' + key);
      if (!partEl) return;

      STATE.parts.push(partEl);
      content.appendChild(partEl);

      partEl.querySelectorAll(':scope > br').forEach(function(br) { br.remove(); });

      const info = PART_INFO[key] || [key, ''];
      const section = el('div', { class: 'moc-sb-section collapsed', html: `
        <div class="moc-sb-section-head">
          <span class="moc-sb-num">${info[0]}</span>
          <span class="moc-sb-sub2">${info[1]}</span>
          <span class="moc-sb-toggle">▾</span>
        </div>
        <div class="moc-sb-chapters">
          <div class="moc-sb-chapters-inner"></div>
        </div>
      `});
      const chWrap = section.querySelector('.moc-sb-chapters-inner');

      section.querySelector('.moc-sb-section-head').addEventListener('click', function () {
        section.classList.toggle('collapsed');
      });

      partEl.querySelectorAll('.headclass').forEach(function (hc) {
        hc.querySelectorAll(':scope > br').forEach(function(br) { br.remove(); });

        const titleEl = hc.querySelector('.headtitle');
        if (!titleEl) return;

        let raw = titleEl.innerHTML || '';
        let title = '';
        const arrowSplit = raw.split('▶');
        if (arrowSplit.length > 1) {
          title = arrowSplit[arrowSplit.length - 1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        }
        if (!title) title = titleEl.textContent.replace(/\s+/g, ' ').trim().slice(0, 40);
        if (!title) title = '章节 ' + (++chapterCount);

        title = title.replace(/\s+/g, '\u3000');

        const chId = 'moc-ch-' + (++chapterCount);
        hc.setAttribute('data-moc-ch', chId);
        STATE.chapters.set(chId, { partEl: partEl, hc: hc });

        const chGroup = el('div', { class: 'moc-sb-chapter-group' });
        const chHead = el('div', { class: 'moc-sb-chapter-head' });
        const chBtn = el('button', { class: 'moc-sb-chapter', text: title, 'data-moc-ch': chId });
        const chToggle = el('span', { class: 'moc-sb-chapter-toggle', html: '▾' });
        const subWrap = el('div', { class: 'moc-sb-subchapters' });

        chBtn.addEventListener('click', function (e) {
          e.preventDefault(); e.stopPropagation();
          chGroup.classList.toggle('expanded');
          showChapter(chId);
        });

        chToggle.addEventListener('click', function (e) {
          e.preventDefault(); e.stopPropagation();
          chGroup.classList.toggle('expanded');
        });

        chHead.appendChild(chBtn);
        chHead.appendChild(chToggle);
        chGroup.appendChild(chHead);
        chGroup.appendChild(subWrap);
        chWrap.appendChild(chGroup);

        let subIdx = 0;
        hc.querySelectorAll('.rootbox').forEach(function (rb) {
          const rt = rb.querySelector('.roottitle');
          if (!rt) return;
          let subTitle = rt.textContent.replace(/[▸▼▶◆]/g, '').trim();
          if (!subTitle) subTitle = '小节 ' + (++subIdx);

          const subId = 'moc-sub-' + chapterCount + '-' + (++subIdx);
          rb.setAttribute('data-moc-sub', subId);

          const subBtn = el('button', { class: 'moc-sb-subchapter', text: subTitle, 'data-moc-sub-id': subId });
          subBtn.addEventListener('click', function (e) {
            e.preventDefault(); e.stopPropagation();
            showChapter(chId, subId);
          });
          subWrap.appendChild(subBtn);
        });
      });

      tree.appendChild(section);
    });

    STATE.totalChapters = STATE.chapters.size;
    STATE.chapterList = Array.from(STATE.chapters.keys());

    app.appendChild(sidebar);
    app.appendChild(content);
    box.appendChild(app);

    const mobileToggle = el('button', { class: 'moc-mobile-toggle', text: '☰' });
    mobileToggle.addEventListener('click', function () { sidebar.classList.toggle('open'); });
    box.appendChild(mobileToggle);

    content.addEventListener('click', function () {
      if (window.innerWidth < 900) sidebar.classList.remove('open');
    });
  }

  function showChapter(chId, subId, noScroll) {
    STATE.parts.forEach(function (p) { p.style.display = 'none'; });

    const entry = STATE.chapters.get(chId);
    if (!entry) return;

    entry.partEl.style.display = 'block';
    entry.partEl.querySelectorAll('.headclass').forEach(function (h) {
      h.style.display = (h === entry.hc) ? 'block' : 'none';
    });

    entry.hc.querySelectorAll('.rootcontent').forEach(function (rc) {
      rc.style.display = 'block';
    });

    // 更新侧边栏高亮
    document.querySelectorAll('.moc-sb-chapter').forEach(function (b) {
      b.classList.remove('active');
    });
    document.querySelectorAll('.moc-sb-subchapter').forEach(function (b) {
      b.classList.remove('active');
    });

    const activeChBtn = document.querySelector('.moc-sb-chapter[data-moc-ch="' + chId + '"]');
    if (activeChBtn) {
      activeChBtn.classList.add('active');
      const section = activeChBtn.closest('.moc-sb-section');
      if (section) section.classList.remove('collapsed');
    }

    if (subId) {
      const activeSubBtn = document.querySelector('.moc-sb-subchapter[data-moc-sub-id="' + subId + '"]');
      if (activeSubBtn) activeSubBtn.classList.add('active');
    }

    if (window.innerWidth < 900 && STATE.sidebar) {
      STATE.sidebar.classList.remove('open');
    }

    STATE.currentChapterIndex = STATE.chapterList.indexOf(chId);
    if (STATE.currentChapterIndex === -1) STATE.currentChapterIndex = 0;

    if (noScroll) return;

    let target = entry.hc;
    if (subId) {
      const subTarget = entry.hc.querySelector('[data-moc-sub="' + subId + '"]');
      if (subTarget) target = subTarget;
    }

    if (target) {
      // 强制重排，确保高度计算正确
      void target.offsetHeight;
      // 延迟一帧，用原生平滑锚点定位，配合 CSS 的 scroll-margin-top
      requestAnimationFrame(function() {
        try {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (e) {
          target.scrollIntoView(true);
        }
      });
    }

    updateProgressBar();
  }

  function showFirstChapter() {
    if (STATE.chapters.size === 0) return;
    const firstId = STATE.chapters.keys().next().value;
    // 如果是初始化，不需要展开左侧导航，只需显示正文
    showChapter(firstId, null, true);
  }

  function buildPlayer(box) {
    const tracks = [];
    const seen = new Set();

    document.querySelectorAll('audio').forEach(function (audio) {
      const sourceEl = audio.querySelector('source');
      let src = sourceEl ? (sourceEl.getAttribute('src') || '').trim() : '';
      if (!src) src = (audio.getAttribute('src') || '').trim();
      if (!src || seen.has(src)) return;
      seen.add(src);

      let title = '';
      let node = audio.previousSibling;
      while (node) {
        if (node.nodeType === 3) {
          const t = node.textContent.replace(/^[♪\s]+/, '').trim();
          if (t) { title = t; break; }
        } else if (node.nodeType === 1 && node.tagName !== 'BR') {
          const t = node.textContent.replace(/^[♪\s]+/, '').trim();
          if (t) { title = t; break; }
        }
        node = node.previousSibling;
      }
      if (!title) title = src.split('/').pop().replace(/\.[^.]+$/, '');
      tracks.push({ title: title, src: src });
    });

    if (tracks.length === 0) return;

    const wrap = el('div', { class: 'moc-player', html: `
      <div class="moc-player-main">
        <button class="moc-pl-btn moc-pl-prev" title="上一首">⏮</button>
        <button class="moc-pl-btn moc-pl-play" title="播放">▶</button>
        <button class="moc-pl-btn moc-pl-next" title="下一首">⏭</button>
        <div class="moc-pl-info">
          <div class="moc-pl-title">选择曲目</div>
          <div class="moc-pl-progress" tabindex="0"><div class="moc-pl-fill"></div></div>
        </div>
        <div class="moc-pl-time">0:00 / 0:00</div>
        <div class="moc-pl-volume">
          <button class="moc-pl-btn moc-pl-volbtn" title="静音">🔊</button>
          <input type="range" class="moc-pl-volslider" min="0" max="1" step="0.01" value="0.7" title="音量">
        </div>
        <button class="moc-pl-btn moc-pl-toggle" title="播放列表">☰</button>
      </div>
      <div class="moc-pl-list"></div>
    `});

    const audioEl = new Audio();
    audioEl.preload = 'none';
    audioEl.volume = 0.7;
    let idx = -1;

    const $play   = wrap.querySelector('.moc-pl-play');
    const $title  = wrap.querySelector('.moc-pl-title');
    const $fill   = wrap.querySelector('.moc-pl-fill');
    const $prog   = wrap.querySelector('.moc-pl-progress');
    const $time   = wrap.querySelector('.moc-pl-time');
    const $list   = wrap.querySelector('.moc-pl-list');
    const $volBtn = wrap.querySelector('.moc-pl-volbtn');
    const $volSld = wrap.querySelector('.moc-pl-volslider');

    tracks.forEach(function (t, i) {
      const it = el('button', { class: 'moc-pl-item', text: t.title });
      it.addEventListener('click', function () { play(i); });
      $list.appendChild(it);
    });

    function updateVolIcon() {
      const v = audioEl.volume;
      if (v === 0) $volBtn.textContent = '🔇';
      else if (v < 0.4) $volBtn.textContent = '🔉';
      else $volBtn.textContent = '🔊';
    }
    updateVolIcon();

    $volSld.addEventListener('input', function () {
      const v = parseFloat($volSld.value);
      audioEl.volume = v;
      audioEl.muted = v === 0;
      updateVolIcon();
    });

    $volBtn.addEventListener('click', function () {
      if (audioEl.volume > 0) {
        wrap.dataset.prevVol = audioEl.volume;
        audioEl.volume = 0;
        audioEl.muted = true;
        $volSld.value = 0;
      } else {
        const prev = parseFloat(wrap.dataset.prevVol || '0.7') || 0.7;
        audioEl.volume = prev;
        audioEl.muted = false;
        $volSld.value = prev;
      }
      updateVolIcon();
    });

    function play(i) {
      if (i < 0 || i >= tracks.length) return;
      idx = i;
      audioEl.src = tracks[i].src;
      audioEl.play().catch(function () {});
      $title.textContent = tracks[i].title;
      $play.textContent = '⏸';
      $list.querySelectorAll('.moc-pl-item').forEach(function (el, k) {
        el.classList.toggle('active', k === i);
      });
    }

    $play.addEventListener('click', function () {
      if (!audioEl.src) { play(0); return; }
      if (audioEl.paused) { audioEl.play().catch(function () {}); $play.textContent = '⏸'; }
      else { audioEl.pause(); $play.textContent = '▶'; }
    });

    wrap.querySelector('.moc-pl-prev').addEventListener('click', function () {
      play(idx < 0 ? tracks.length - 1 : (idx - 1 + tracks.length) % tracks.length);
    });
    wrap.querySelector('.moc-pl-next').addEventListener('click', function () {
      play((idx + 1) % tracks.length);
    });
    wrap.querySelector('.moc-pl-toggle').addEventListener('click', function () {
      wrap.classList.toggle('moc-pl-list-open');
    });

    audioEl.addEventListener('timeupdate', function () {
      const d = audioEl.duration || 0;
      const c = audioEl.currentTime || 0;
      $fill.style.width = d ? (c / d * 100) + '%' : '0%';
      $time.textContent = fmt(c) + ' / ' + fmt(d);
    });
    audioEl.addEventListener('ended', function () { play((idx + 1) % tracks.length); });
    audioEl.addEventListener('play', function () { $play.textContent = '⏸'; });
    audioEl.addEventListener('pause', function () { $play.textContent = '▶'; });
    audioEl.addEventListener('volumechange', updateVolIcon);

    $prog.addEventListener('click', function (e) {
      if (!audioEl.duration) return;
      const r = $prog.getBoundingClientRect();
      audioEl.currentTime = ((e.clientX - r.left) / r.width) * audioEl.duration;
    });

    function fmt(s) {
      s = Math.max(0, Math.floor(s || 0));
      return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    }

    box.appendChild(wrap);
    STATE.player = wrap;
  }

  function boot() {
    injectCSS();

    const box = document.querySelector('body > .box2');
    if (!box) { console.warn('[MOC] 找不到 .box2'); hideVeil(); return; }
    STATE.box = box;

    box.querySelectorAll(':scope > .navbar, :scope > nav.navbar').forEach(function (n) { n.remove(); });
    box.querySelectorAll('.backtotop').forEach(function (b) {
      const p = b.parentElement;
      b.remove();
      if (p && p !== box && !p.textContent.trim() && p.children.length === 0) p.remove();
    });

    buildLanding(box);
    buildApp(box);
    buildPlayer(box);
    showFirstChapter();

    requestAnimationFrame(function () {
      requestAnimationFrame(hideVeil);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    setTimeout(boot, 0);
  }
})();