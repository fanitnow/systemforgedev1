/**
 * SystemForge AI — Multi-Agent Chat Widget
 * Embed with: <script src="sf-chat-widget.js"></script>
 * Add anywhere in your HTML before </body>
 */
(function() {
  'use strict';

  // ── INJECT FONTS ───────────────────────────────────────────
  if (!document.getElementById('sf-fonts')) {
    const link = document.createElement('link');
    link.id = 'sf-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap';
    document.head.appendChild(link);
  }

  // ── INJECT STYLES ──────────────────────────────────────────
  const STYLES = `
#sf-widget-launcher{position:fixed;bottom:28px;right:28px;z-index:99998;display:flex;flex-direction:column;align-items:flex-end;gap:10px;}
#sf-widget-btn{width:58px;height:58px;background:#C9A84C;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.25s;box-shadow:0 8px 32px rgba(201,168,76,0.4);position:relative;}
#sf-widget-btn:hover{background:#E8C96A;transform:translateY(-2px);}
#sf-widget-btn svg{transition:all 0.2s;position:absolute;}
#sf-widget-btn .sf-chat-ico{opacity:1;transform:scale(1);}
#sf-widget-btn .sf-close-ico{opacity:0;transform:scale(0.5);}
#sf-widget-btn.open .sf-chat-ico{opacity:0;transform:scale(0.5);}
#sf-widget-btn.open .sf-close-ico{opacity:1;transform:scale(1);}
.sf-pulse{position:absolute;top:-3px;right:-3px;width:13px;height:13px;background:#4CAF78;border-radius:50%;border:2px solid #0A0A0A;}
.sf-pulse::after{content:'';position:absolute;inset:-3px;border-radius:50%;background:#4CAF78;animation:sfPulse 2s infinite;opacity:0.4;}
@keyframes sfPulse{0%{transform:scale(1);opacity:0.4;}100%{transform:scale(1.8);opacity:0;}}
.sf-notif{position:absolute;top:-5px;right:-5px;background:#FF4444;color:#fff;font-size:9px;font-weight:800;font-family:'Syne',sans-serif;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #0A0A0A;}
.sf-teaser{background:#161616;border:1px solid #242424;padding:10px 16px;font-family:'DM Sans',sans-serif;font-size:12px;color:#F5F0E8;max-width:200px;text-align:right;line-height:1.4;animation:sfBubble 0.4s ease both;}
@keyframes sfBubble{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
.sf-teaser-title{font-family:'Syne',sans-serif;font-weight:700;font-size:11px;color:#C9A84C;margin-bottom:2px;}
#sf-widget-win{position:fixed;bottom:104px;right:28px;z-index:99997;width:390px;height:580px;background:#0f0f0f;border:1px solid #242424;display:flex;flex-direction:column;overflow:hidden;transform:scale(0.9) translateY(20px);opacity:0;pointer-events:none;transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);transform-origin:bottom right;}
#sf-widget-win.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
.sf-hdr{padding:14px 18px;border-bottom:1px solid #242424;display:flex;align-items:center;gap:10px;background:#161616;flex-shrink:0;}
.sf-av{width:38px;height:38px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:11px;position:relative;}
.sf-av-status{position:absolute;bottom:-1px;right:-1px;width:9px;height:9px;border-radius:50%;border:2px solid #161616;background:#4CAF78;}
.sf-hdr-info{flex:1;min-width:0;}
.sf-hdr-name{font-family:'Syne',sans-serif;font-weight:700;font-size:13px;display:flex;align-items:center;gap:6px;}
.sf-badge{font-size:9px;font-weight:700;padding:2px 7px;letter-spacing:.07em;text-transform:uppercase;}
.sf-hdr-role{font-size:11px;color:#888;margin-top:1px;}
.sf-hdr-close{background:none;border:none;cursor:pointer;padding:4px;color:#666;transition:color 0.2s;display:flex;}
.sf-hdr-close:hover{color:#F5F0E8;}
.sf-pills{display:flex;gap:1px;padding:6px 10px;background:#0A0A0A;border-bottom:1px solid #242424;flex-shrink:0;overflow-x:auto;scrollbar-width:none;}
.sf-pills::-webkit-scrollbar{display:none;}
.sf-pill{display:flex;align-items:center;gap:4px;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;border:1px solid transparent;transition:all 0.15s;white-space:nowrap;background:none;color:#666;font-family:'DM Sans',sans-serif;}
.sf-pill:hover{color:#999;background:#161616;}
.sf-pill.active{color:#F5F0E8;}
.sf-pdot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.sf-msgs{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;scrollbar-color:#242424 transparent;}
.sf-msgs::-webkit-scrollbar{width:3px;}
.sf-msgs::-webkit-scrollbar-thumb{background:#242424;}
.sf-msg-row{display:flex;align-items:flex-end;gap:6px;}
.sf-msg-row.user{flex-direction:row-reverse;}
.sf-av-sm{width:26px;height:26px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:9px;}
.sf-bubble{max-width:78%;padding:9px 13px;font-family:'DM Sans',sans-serif;font-size:12px;line-height:1.6;}
.sf-bubble.ai{background:#1c1c1c;border:1px solid #2e2e2e;border-bottom-left-radius:2px;}
.sf-bubble.user{background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.2);border-bottom-right-radius:2px;color:#F5F0E8;}
.sf-bubble strong{color:#C9A84C;}
.sf-ts{font-size:10px;color:#555;padding:0 4px;}
.sf-ts.r{text-align:right;}
.sf-msg-grp{display:flex;flex-direction:column;gap:3px;}
.sf-typing{background:#1c1c1c;border:1px solid #2e2e2e;padding:10px 14px;display:flex;align-items:center;gap:4px;width:fit-content;}
.sf-tdot{width:5px;height:5px;border-radius:50%;background:#555;animation:sfTd 1.2s infinite;}
.sf-tdot:nth-child(2){animation-delay:.2s;}
.sf-tdot:nth-child(3){animation-delay:.4s;}
@keyframes sfTd{0%,60%,100%{transform:translateY(0);background:#555;}30%{transform:translateY(-5px);background:#C9A84C;}}
.sf-qrs{display:flex;flex-wrap:wrap;gap:5px;padding:0 14px 10px;flex-shrink:0;}
.sf-qr{background:none;border:1px solid #2e2e2e;color:#888;font-size:11px;padding:5px 10px;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;text-align:left;}
.sf-qr:hover{border-color:#C9A84C;color:#C9A84C;background:rgba(201,168,76,0.06);}
.sf-inp-area{border-top:1px solid #242424;background:#161616;flex-shrink:0;}
.sf-inp-row{display:flex;align-items:flex-end;gap:6px;padding:10px 12px;}
.sf-inp{flex:1;background:#0A0A0A;border:1px solid #242424;color:#F5F0E8;padding:8px 12px;font-family:'DM Sans',sans-serif;font-size:12px;outline:none;resize:none;min-height:36px;max-height:80px;line-height:1.5;transition:border-color 0.2s;}
.sf-inp:focus{border-color:#C9A84C;}
.sf-inp::placeholder{color:#444;}
.sf-send{background:#C9A84C;color:#0A0A0A;border:none;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background 0.2s;}
.sf-send:hover{background:#E8C96A;}
.sf-send:disabled{opacity:0.4;cursor:not-allowed;}
.sf-foot{padding:0 12px 8px;font-size:10px;color:#444;display:flex;align-items:center;gap:4px;}
.sf-foot span{color:#C9A84C;}
.sf-handoff{padding:10px 14px;margin:2px 0;font-family:'DM Sans',sans-serif;font-size:11px;border-left:2px solid;}
.sf-handoff-title{font-family:'Syne',sans-serif;font-weight:700;font-size:11px;margin-bottom:2px;}
@keyframes sfFadeUp{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
.sf-fade{animation:sfFadeUp 0.25s ease both;}
@media(max-width:480px){#sf-widget-win{width:calc(100vw - 16px);right:8px;bottom:86px;height:calc(100vh - 106px);}#sf-widget-launcher{right:14px;bottom:14px;}}
`;

  if (!document.getElementById('sf-widget-styles')) {
    const style = document.createElement('style');
    style.id = 'sf-widget-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  // ── AGENT CONFIG ───────────────────────────────────────────
  const AGENTS = {
    forge:   { name:'Forge',   role:'Sales Qualifier',     badge:'Sales',    color:'#C9A84C', initials:'FG', bgColor:'rgba(201,168,76,0.15)',  badgeBg:'rgba(201,168,76,0.12)', badgeColor:'#C9A84C', dotColor:'#C9A84C' },
    scout:   { name:'Scout',   role:'Audit Specialist',    badge:'Audit',    color:'#5B8DEF', initials:'SC', bgColor:'rgba(91,141,239,0.15)',  badgeBg:'rgba(91,141,239,0.12)', badgeColor:'#5B8DEF', dotColor:'#5B8DEF' },
    builder: { name:'Builder', role:'Client Onboarding',   badge:'Client',   color:'#4CAF78', initials:'BD', bgColor:'rgba(76,175,120,0.15)',  badgeBg:'rgba(76,175,120,0.12)', badgeColor:'#4CAF78', dotColor:'#4CAF78' },
    guard:   { name:'Guard',   role:'Support & Billing',   badge:'Support',  color:'#FF4444', initials:'GD', bgColor:'rgba(255,68,68,0.15)',   badgeBg:'rgba(255,68,68,0.12)',  badgeColor:'#FF4444', dotColor:'#FF4444' },
    closer:  { name:'Closer',  role:'Sales Recovery',      badge:'Re-Engage',color:'#9B72F7', initials:'CL', bgColor:'rgba(155,114,247,0.15)', badgeBg:'rgba(155,114,247,0.12)',badgeColor:'#9B72F7', dotColor:'#9B72F7' }
  };

  const SYSTEMS = {
    forge: `You are Forge, the primary sales qualifier for SystemForge AI — "Built in 48 hours. Running forever." Be sharp, direct, warm. Max 3 sentences. Ask ONE question at a time. SystemForge AI fixes broken business systems in 48 hours. Tiers: $97 Audit Report, $750 System Starter (48-72hr build), $2,500 Full Build (5-7 days). Target: barbershops, salons, trainers, contractors, coaches, real estate. Route with tags: [ROUTE:scout] for free audit, [ROUTE:builder] for existing clients, [ROUTE:guard] for complaints/refunds, [ROUTE:closer] for warm leads who hesitated.`,
    scout: `You are Scout, business audit specialist for SystemForge AI. Ask ONE question at a time from this sequence: 1) Business type 2) How they get customers 3) Lead capture process 4) Follow-up system 5) Client onboarding 6) Most manual/chaotic part 7) Current tools. After 5+ answers, give a MINI AUDIT REPORT: 3 specific gaps, monthly revenue leak estimate (specific dollar range), recommended tier. End: "Ready to fix this now?" Max 3 sentences per message. [ROUTE:forge] when ready to buy.`,
    builder: `You are Builder, client success specialist for SystemForge AI. Handle build status questions, intake clarifications, post-delivery support, and handoff scheduling. Tier 1: 24hr delivery. Tier 2: 48-72hr. Tier 3: 5-7 days. Be warm, specific, reassuring. VIP treatment for paying clients. [ROUTE:guard] for billing issues. Max 4 sentences.`,
    guard: `You are Guard, support specialist for SystemForge AI. Handle complaints, refunds, billing calmly and professionally. Refund policy: full refund if we miss delivery window; no refund after delivery + handoff call. Acknowledge frustration first. Always offer a concrete next step. Escalation: "I'm flagging this for the owner — you'll hear back within 2 hours." support@systemforgeai.com. Max 4 sentences.`,
    closer: `You are Closer, sales recovery specialist for SystemForge AI. Re-engage warm leads who hesitated. Ask ONE direct question: "What made you hesitate?" Handle objections: price → "You're losing more than this monthly"; timing → "Your systems leak money every day"; uncertainty → reference their specific audit results. Offer: "$97 audit applies as credit toward $750 build." [ROUTE:forge] when ready to buy. Max 3 sentences. Confident, direct, no pressure tactics.`
  };

  const GREETINGS = {
    forge:   `Hey — I'm **Forge**, your SystemForge AI assistant.\n\nQuick question: **what type of business do you run?** I want to point you to exactly the right resource right away.`,
    scout:   `I'm **Scout** — I diagnose business system gaps.\n\nI'll ask 7 targeted questions and show you **exactly where your business is leaking money** with a specific dollar estimate.\n\n**What type of business do you run?**`,
    builder: `Hey! I'm **Builder** — here to support you through your SystemForge build.\n\nI can help with build status, intake questions, post-delivery support, or scheduling your handoff call.\n\n**What do you need today?**`,
    guard:   `I'm **Guard** — I handle support, billing, and any issues you're experiencing.\n\nI take every concern seriously and I'm here to make it right.\n\n**What's going on?** Tell me exactly what happened.`,
    closer:  `Hey — I'm **Closer**. I know you've been thinking about SystemForge AI.\n\nI'm not here to pitch you — I want to understand what's in the way.\n\n**What's the one thing that made you hesitate?**`
  };

  const QUICK_REPLIES = {
    forge:   ['I run a barbershop/salon','Personal trainer / gym','Real estate agent','Contractor / trades','Consulting / coaching'],
    scout:   ['Barbershop / Salon','Personal Training','Real Estate','Contractor','Restaurant','Coaching'],
    builder: ['When will my build be ready?','Questions about my intake','How do I use my new system?','Reschedule my handoff call'],
    guard:   ['I want a refund','My build is late','Billing question','Talk to the owner'],
    closer:  ['Price is too high','Not sure it works for my biz','Need to think more','Start with the $97 audit']
  };

  // ── STATE ──────────────────────────────────────────────────
  const state = {
    open: false,
    agent: 'forge',
    convos: { forge:[], scout:[], builder:[], guard:[], closer:[] },
    greeted: { forge:false, scout:false, builder:false, guard:false, closer:false },
    typing: false
  };

  // ── BUILD DOM ──────────────────────────────────────────────
  function buildWidget() {
    // Launcher
    const launcher = document.createElement('div');
    launcher.id = 'sf-widget-launcher';
    launcher.innerHTML = `
      <div id="sf-teaser-bubble" style="display:none">
        <div class="sf-teaser">
          <div class="sf-teaser-title">Built in 48 hours. Running forever.</div>
          Is your business leaking money? Let's find out.
        </div>
      </div>
      <button id="sf-widget-btn" onclick="window._sfWidget.toggle()">
        <div class="sf-pulse"></div>
        <div class="sf-notif" id="sf-notif">1</div>
        <svg class="sf-chat-ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" stroke-width="2" stroke-linecap="square">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg class="sf-close-ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" stroke-width="2.5" stroke-linecap="square">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>`;
    document.body.appendChild(launcher);

    // Window
    const win = document.createElement('div');
    win.id = 'sf-widget-win';
    win.innerHTML = `
      <div class="sf-hdr" id="sf-hdr">
        <div class="sf-av" id="sf-av" style="background:rgba(201,168,76,0.15)">
          <svg width="26" height="26" viewBox="0 0 44 44" fill="none"><rect x="2" y="2" width="40" height="40" stroke="#C9A84C" stroke-width="1.5"/><path d="M10 32 L10 18 L22 12 L34 18 L34 32" stroke="#C9A84C" stroke-width="2" fill="none"/><path d="M10 32 L34 32" stroke="#C9A84C" stroke-width="2"/><rect x="8" y="30" width="28" height="4" fill="#C9A84C"/></svg>
          <div class="sf-av-status"></div>
        </div>
        <div class="sf-hdr-info">
          <div class="sf-hdr-name" id="sf-hdr-name">
            Forge <span class="sf-badge" id="sf-badge" style="background:rgba(201,168,76,0.12);color:#C9A84C;border-radius:2px">Sales</span>
          </div>
          <div class="sf-hdr-role" id="sf-hdr-role">SystemForge AI · Online now</div>
        </div>
        <button class="sf-hdr-close" onclick="window._sfWidget.toggle()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="sf-pills" id="sf-pills"></div>
      <div class="sf-msgs" id="sf-msgs"></div>
      <div class="sf-qrs" id="sf-qrs"></div>
      <div class="sf-inp-area">
        <div class="sf-inp-row">
          <textarea class="sf-inp" id="sf-inp" placeholder="Type your message..." rows="1"
            onkeydown="window._sfWidget.handleKey(event)"
            oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,80)+'px'"></textarea>
          <button class="sf-send" id="sf-send" onclick="window._sfWidget.send()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div class="sf-foot">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Secured by <span>SystemForge AI</span> · Powered by Claude
        </div>
      </div>`;
    document.body.appendChild(win);

    buildPills();
  }

  function buildPills() {
    const pills = document.getElementById('sf-pills');
    pills.innerHTML = '';
    Object.entries(AGENTS).forEach(([key, agent]) => {
      const btn = document.createElement('button');
      btn.className = `sf-pill${key === state.agent ? ' active' : ''}`;
      btn.id = `sf-pill-${key}`;
      btn.innerHTML = `<span class="sf-pdot" style="background:${agent.dotColor}"></span>${agent.name}`;
      btn.onclick = () => window._sfWidget.switchTo(key, true);
      pills.appendChild(btn);
    });
  }

  // ── PUBLIC API ─────────────────────────────────────────────
  window._sfWidget = {
    toggle() {
      state.open = !state.open;
      document.getElementById('sf-widget-win').classList.toggle('open', state.open);
      document.getElementById('sf-widget-btn').classList.toggle('open', state.open);
      document.getElementById('sf-notif').style.display = 'none';
      document.getElementById('sf-teaser-bubble').style.display = 'none';
      if (state.open) {
        if (!state.greeted[state.agent]) greet(state.agent);
        setTimeout(() => document.getElementById('sf-inp').focus(), 300);
      }
    },

    switchTo(key, fromClick) {
      const prev = state.agent;
      state.agent = key;
      document.querySelectorAll('.sf-pill').forEach(p => p.classList.remove('active'));
      const pill = document.getElementById(`sf-pill-${key}`);
      if (pill) pill.classList.add('active');
      updateHeader(key);
      renderMsgs();
      if (fromClick && prev !== key) {
        if (!state.greeted[key]) {
          addHandoff(key);
          greet(key);
        }
      }
      scrollDown();
    },

    send() {
      const inp = document.getElementById('sf-inp');
      const text = inp.value.trim();
      if (!text || state.typing) return;
      inp.value = '';
      inp.style.height = 'auto';
      document.getElementById('sf-send').disabled = true;
      document.getElementById('sf-qrs').innerHTML = '';
      pushMsg(state.agent, { role:'user', content:text, ts:now() });
      renderMsgs();
      scrollDown();
      state.typing = true;
      showTyping();
      callClaude(state.agent, text).then(reply => {
        removeTyping();
        const routeMatch = reply.match(/\[ROUTE:(\w+)\]/);
        const clean = reply.replace(/\[ROUTE:\w+\]/g,'').trim();
        pushMsg(state.agent, { role:'assistant', content:clean, agent:state.agent, ts:now() });
        if (routeMatch && AGENTS[routeMatch[1]]) {
          const target = routeMatch[1];
          setTimeout(() => {
            window._sfWidget.switchTo(target, false);
            addHandoff(target);
            greet(target);
          }, 1000);
        }
        renderMsgs();
        showQRs(contextReplies(state.agent, clean));
        scrollDown();
        state.typing = false;
        document.getElementById('sf-send').disabled = false;
        document.getElementById('sf-inp').focus();
      }).catch(() => {
        removeTyping();
        pushMsg(state.agent, { role:'assistant', content:'Something went wrong — please try again.', agent:state.agent, ts:now() });
        renderMsgs();
        state.typing = false;
        document.getElementById('sf-send').disabled = false;
      });
    },

    handleKey(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); window._sfWidget.send(); }
    }
  };

  // ── INTERNALS ──────────────────────────────────────────────
  function updateHeader(key) {
    const a = AGENTS[key];
    document.getElementById('sf-av').style.background = a.bgColor;
    document.getElementById('sf-hdr-name').innerHTML = `${a.name} <span class="sf-badge" style="background:${a.badgeBg};color:${a.badgeColor};border-radius:2px">${a.badge}</span>`;
    document.getElementById('sf-hdr-role').textContent = a.role + ' · Online now';
  }

  function greet(key) {
    state.greeted[key] = true;
    const a = AGENTS[key];
    showTyping();
    setTimeout(() => {
      removeTyping();
      pushMsg(key, { role:'assistant', content:GREETINGS[key], agent:key, ts:now() });
      renderMsgs();
      showQRs(QUICK_REPLIES[key]);
      scrollDown();
    }, 800 + Math.random() * 500);
  }

  function addHandoff(key) {
    const a = AGENTS[key];
    state.convos[key].push({ type:'handoff', color:a.color, text:`Connected with **${a.name}** — ${a.role}` });
  }

  function pushMsg(key, msg) {
    state.convos[key].push(msg);
  }

  function renderMsgs() {
    const container = document.getElementById('sf-msgs');
    container.innerHTML = '';
    state.convos[state.agent].forEach((msg, i) => {
      if (msg.type === 'handoff') {
        const el = document.createElement('div');
        el.className = 'sf-handoff sf-fade';
        el.style.cssText = `border-color:${msg.color};background:${msg.color}18;`;
        el.innerHTML = `<div class="sf-handoff-title" style="color:${msg.color}">Agent Handoff</div><div style="color:#888;font-size:11px">${fmt(msg.text)}</div>`;
        container.appendChild(el);
        return;
      }
      const isUser = msg.role === 'user';
      const a = AGENTS[msg.agent || state.agent];
      const row = document.createElement('div');
      row.className = `sf-msg-row${isUser?' user':''} sf-fade`;
      if (!isUser) {
        const av = document.createElement('div');
        av.className = 'sf-av-sm';
        av.style.cssText = `background:${a.bgColor};color:${a.color};`;
        av.textContent = a.initials;
        row.appendChild(av);
      }
      const bub = document.createElement('div');
      bub.className = `sf-bubble${isUser?' user':' ai'}`;
      bub.innerHTML = fmt(msg.content);
      row.appendChild(bub);
      const ts = document.createElement('div');
      ts.className = `sf-ts${isUser?' r':''}`;
      ts.style.paddingLeft = isUser?'0':'32px';
      ts.textContent = msg.ts||'';
      const grp = document.createElement('div');
      grp.className = 'sf-msg-grp';
      grp.appendChild(row);
      grp.appendChild(ts);
      container.appendChild(grp);
    });
  }

  function showTyping() {
    const a = AGENTS[state.agent];
    const container = document.getElementById('sf-msgs');
    const row = document.createElement('div');
    row.className = 'sf-msg-row sf-fade';
    row.id = 'sf-typing-row';
    const av = document.createElement('div');
    av.className = 'sf-av-sm';
    av.style.cssText = `background:${a.bgColor};color:${a.color};`;
    av.textContent = a.initials;
    row.appendChild(av);
    const bub = document.createElement('div');
    bub.className = 'sf-typing';
    bub.innerHTML = '<div class="sf-tdot"></div><div class="sf-tdot"></div><div class="sf-tdot"></div>';
    row.appendChild(bub);
    container.appendChild(row);
    scrollDown();
  }

  function removeTyping() {
    const el = document.getElementById('sf-typing-row');
    if (el) el.remove();
  }

  function showQRs(replies) {
    const container = document.getElementById('sf-qrs');
    container.innerHTML = '';
    if (!replies) return;
    replies.slice(0,5).forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'sf-qr';
      btn.textContent = r;
      btn.onclick = () => {
        document.getElementById('sf-inp').value = r;
        window._sfWidget.send();
      };
      container.appendChild(btn);
    });
  }

  function contextReplies(agentKey, msg) {
    const l = msg.toLowerCase();
    if (l.includes('price')||l.includes('cost')||l.includes('how much')) return ['Tell me about $97 report','What\'s in the $750 package','Full build details','Start with audit'];
    if (l.includes('audit')||l.includes('free')) return ['Yes, run my audit','How long does it take?','What will I learn?'];
    if (l.includes('refund')||l.includes('complaint')) return ['Request a refund','Build wasn\'t delivered','Speak to the owner'];
    if (l.includes('build')||l.includes('deliver')) return ['Check build status','Reschedule handoff call','Questions about my system'];
    return ['How do I get started?','What does this cost?','I want the free audit','I\'m an existing client'];
  }

  async function callClaude(agentKey, userMsg) {
    const history = state.convos[agentKey]
      .filter(m => m.role==='user'||m.role==='assistant')
      .map(m => ({role:m.role, content:m.content}));
    const res = await fetch('/api/claude', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:800, system:SYSTEMS[agentKey], messages:history })
    });
    const data = await res.json();
    return data.content?.map(b=>b.text||'').join('')||'Sorry, something went wrong.';
  }

  function fmt(text) {
    return text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>').replace(/\n\n/g,'</p><p style="margin-top:6px">').replace(/\n/g,'<br>');
  }

  function scrollDown() {
    const el = document.getElementById('sf-msgs');
    if (el) setTimeout(() => el.scrollTop = el.scrollHeight, 50);
  }

  function now() {
    return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  }

  // ── INIT ───────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }

  // Show teaser bubble after 4 seconds
  setTimeout(() => {
    const b = document.getElementById('sf-teaser-bubble');
    if (b && !state.open) b.style.display = 'block';
  }, 4000);
  setTimeout(() => {
    const b = document.getElementById('sf-teaser-bubble');
    if (b) b.style.display = 'none';
  }, 14000);

})();

// ═══════════════════════════════════════════════════════════════
// DATA PIPELINE CAPTURE LAYER
// Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY below
// ═══════════════════════════════════════════════════════════════

window._sfPipeline = (function() {
  const URL  = 'YOUR_SUPABASE_URL';
  const KEY  = 'YOUR_SUPABASE_ANON_KEY';
  const SID  = 'sf_' + Date.now() + '_' + Math.random().toString(36).substr(2,6);
  let   LID  = null; // lead_id assigned after first lead insert
  let   CSID = null; // chat_session row ID

  async function save(table, data) {
    if (URL === 'YOUR_SUPABASE_URL') return null;
    try {
      const res = await fetch(`${URL}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          'apikey': KEY, 'Authorization': `Bearer ${KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
      });
      const rows = await res.json();
      return Array.isArray(rows) ? rows[0] : rows;
    } catch(e) { console.warn('SF Pipeline:', table, e); return null; }
  }

  async function update(table, id, data) {
    if (URL === 'YOUR_SUPABASE_URL') return;
    try {
      await fetch(`${URL}/rest/v1/${table}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'apikey': KEY, 'Authorization': `Bearer ${KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch(e) { console.warn('SF Pipeline update:', table, e); }
  }

  return {
    sessionId: () => SID,

    // Called on page load — tracks every visitor
    trackPageView: async function(page) {
      save('page_events', {
        session_id: SID, event_type: 'page_view',
        page: page || window.location.pathname,
        detail: document.referrer || 'direct'
      });
    },

    // Called when chat window opens
    startChatSession: async function() {
      const row = await save('chat_sessions', {
        session_id: SID,
        current_agent: 'forge',
        agents_visited: ['forge'],
        source_url: window.location.href,
        referrer: document.referrer || 'direct',
        device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
      });
      if (row) CSID = row.id;
      save('page_events', { session_id: SID, event_type: 'chat_open', page: window.location.pathname });
    },

    // Called when Forge extracts business type or routes to another agent
    saveForgeConversation: async function(messages, businessType, intent, routedTo) {
      // Upsert lead record
      if (!LID) {
        const lead = await save('leads', {
          session_id: SID, business_type: businessType,
          lead_source: document.referrer?.includes('instagram') ? 'instagram' :
                       document.referrer?.includes('google') ? 'google' : 'organic',
          last_agent: 'forge', status: 'new'
        });
        if (lead) LID = lead.id;
      }
      save('forge_conversations', {
        session_id: SID, lead_id: LID,
        messages: messages, business_type: businessType,
        visitor_intent: intent, routed_to: routedTo,
        routed_at: routedTo ? new Date().toISOString() : null,
        source_url: window.location.href, referrer: document.referrer
      });
      if (routedTo) {
        save('agent_handoffs', {
          session_id: SID, lead_id: LID,
          from_agent: 'forge', to_agent: routedTo,
          reason: `intent_detected_${intent}`
        });
      }
    },

    // Called when Scout starts the audit questions
    startAuditSession: async function() {
      const row = await save('audit_sessions', {
        session_id: SID, lead_id: LID,
        source_agent: 'forge', questions_asked: 0
      });
      return row ? row.id : null;
    },

    // Called when Scout generates a complete report
    saveAuditReport: async function(auditSessionId, data) {
      const { businessType, businessName, qAndA, gaps, leakLow, leakHigh, tier, messages } = data;
      const row = await save('audit_reports', {
        session_id: SID, lead_id: LID,
        audit_session_id: auditSessionId,
        business_type: businessType, business_name: businessName,
        q_and_a: qAndA, full_conversation: messages,
        identified_gaps: gaps,
        revenue_leak_low: leakLow, revenue_leak_high: leakHigh,
        recommended_tier: tier, report_shown: true
      });
      // Update lead intent score based on audit
      if (LID) update('leads', LID, { status: 'warm', last_agent: 'scout', intent_score: 7 });
      return row ? row.id : null;
    },

    // Called when audit CTA is clicked
    trackAuditCTA: async function(auditReportId) {
      if (auditReportId) update('audit_reports', auditReportId, { cta_clicked: true });
      if (LID) update('leads', LID, { status: 'hot', intent_score: 9 });
      save('page_events', { session_id: SID, lead_id: LID, event_type: 'cta_click', page: 'audit', detail: 'audit_report_cta' });
    },

    // Called when Builder agent starts with a paid client
    saveBuilderConversation: async function(clientId, messages, topic) {
      save('builder_conversations', {
        session_id: SID, client_id: clientId,
        messages: messages, topic: topic || 'general'
      });
    },

    // Called when Guard opens a support ticket
    openSupportTicket: async function(issueType, severity, description, messages, clientId) {
      const row = await save('support_tickets', {
        session_id: SID,
        client_id: clientId || null,
        lead_id: LID || null,
        issue_type: issueType,
        severity: severity || 'medium',
        description: description,
        conversation: messages,
        owner_notified: severity === 'high' || severity === 'critical'
      });
      if (LID) update('leads', LID, { last_agent: 'guard' });
      return row ? row.id : null;
    },

    // Called when Closer logs an objection and outcome
    saveCloserOutcome: async function(auditReportId, objectionType, objectionText, responseGiven, conversation, outcome) {
      const row = await save('closer_outcomes', {
        session_id: SID, lead_id: LID,
        audit_report_id: auditReportId,
        objection_type: objectionType,
        objection_text: objectionText,
        response_given: responseGiven,
        conversation: conversation,
        outcome: outcome || 'pending'
      });
      if (LID) update('leads', LID, {
        last_agent: 'closer',
        status: outcome === 'won' ? 'converted' : outcome === 'lost' ? 'lost' : 'warm'
      });
      return row ? row.id : null;
    },

    // Called on agent switch — updates session record
    trackAgentSwitch: async function(fromAgent, toAgent, triggerMsg) {
      if (CSID) update('chat_sessions', CSID, { current_agent: toAgent });
      save('agent_handoffs', {
        session_id: SID, lead_id: LID,
        from_agent: fromAgent, to_agent: toAgent,
        trigger_message: triggerMsg ? triggerMsg.substring(0, 200) : null
      });
    },

    // Expose session + lead IDs for cross-page linking
    getIds: () => ({ sessionId: SID, leadId: LID }),
    setLeadId: (id) => { LID = id; }
  };
})();

// Auto-track page view on load
window._sfPipeline.trackPageView();
