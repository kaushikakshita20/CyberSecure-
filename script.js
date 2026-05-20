    /* ─────────────────────────────────────────
       SECTION 1 – DATA
       All the content stored in simple arrays.
    ───────────────────────────────────────── */
    // Threats array – each threat is an object with properties
    var threats = [
      {
        icon: "🎣",
        name: "Phishing",
        desc: "Fake emails or messages that trick you into giving away your password or personal info.",
        tip:  "Always check the sender's email address. Never click links you weren't expecting.",
        tag:  "critical",
        tagClass: "tag-critical"
      },
      {
        icon: "🔒",
        name: "Ransomware",
        desc: "Malware that locks your files and demands money to unlock them.",
        tip:  "Keep regular backups and never open attachments from unknown senders.",
        tag:  "critical",
        tagClass: "tag-critical"
      },
      {
        icon: "🕷",
        name: "SQL Injection",
        desc: "Hackers type special code into a website's input box to steal data from its database.",
        tip:  "Developers must validate all user input. Use prepared statements.",
        tag:  "high",
        tagClass: "tag-high"
      },
      {
        icon: "💣",
        name: "DDoS Attack",
        desc: "Sending millions of fake requests to a website to crash it and make it unavailable.",
        tip:  "Website owners should use DDoS protection services like Cloudflare.",
        tag:  "high",
        tagClass: "tag-high"
      },
      {
        icon: "🧩",
        name: "Social Engineering",
        desc: "Tricking people into giving information by pretending to be someone trustworthy.",
        tip:  "Always verify who you are talking to. Real IT staff never ask for your password.",
        tag:  "medium",
        tagClass: "tag-medium"
      },
      {
        icon: "🔑",
        name: "Credential Stuffing",
        desc: "Using leaked username/password pairs from old breaches to break into other accounts.",
        tip:  "Use a unique password for every website. A password manager helps.",
        tag:  "medium",
        tagClass: "tag-medium"
      },
      {
        icon: "👁",
        name: "Keylogger",
        desc: "Hidden software that records every key you type, stealing passwords and messages.",
        tip:  "Use antivirus software and avoid installing apps from unknown sources.",
        tag:  "high",
        tagClass: "tag-high"
      },
      {
        icon: "🔓",
        name: "Brute Force",
        desc: "Trying thousands of password combinations automatically until the right one is found.",
        tip:  "Use long passwords. Enable account lockout after several failed attempts.",
        tag:  "low",
        tagClass: "tag-low"
      }
    ];
    // Security tips array
    var tipsList = [
      { title: "Never Share Your OTP",      body: "A One-Time Password (OTP) is sent to you alone. No real bank or company will ever call and ask for it. If someone does — it's a scam." },
      { title: "Check Links Before Clicking", body: "Hover your mouse over a link to see the real address at the bottom of your browser. If it looks odd or doesn't match the website name — don't click." },
      { title: "Use Long Passphrases",      body: "A passphrase like <strong>Mango-River-Blue-77</strong> is long, easy to remember, and much harder to crack than 'P@ss1'. Length beats complexity." },
      { title: "Enable Auto-Lock",          body: "Set your phone and laptop to lock automatically after 1–2 minutes of inactivity. It takes 2 seconds to enable and protects you if you forget your device." },
      { title: "Update Everything Regularly", body: "Most hacks exploit old, known vulnerabilities. Enable auto-updates so you're always protected without thinking about it." },
      { title: "Check HaveIBeenPwned",      body: "Visit <strong>haveibeenpwned.com</strong> and enter your email. It will tell you if your password was leaked in any known data breach — for free." },
      { title: "VPN on Public Wi-Fi",       body: "Coffee shop Wi-Fi can be monitored. A VPN (Virtual Private Network) encrypts your traffic so no one on the same network can spy on you." },
      { title: "Verify Before You Trust",   body: "If someone calls or emails claiming to be IT support, your bank, or a family member in trouble — hang up and call them back on a number you know is real." }
    ];
    /* ─────────────────────────────────────────
       SECTION 2 – PAGE SWITCHING
       Simple function using a for loop
    ───────────────────────────────────────── */
    function openPage(pageId, clickedBtn) {
      // Get all pages and hide them
      var pages = document.querySelectorAll('.page');
      for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
      }

      // Show the chosen page
      document.getElementById(pageId).classList.add('active');

      // Remove 'active' class from all nav buttons
      var navBtns = document.querySelectorAll('.nav-btn');
      for (var j = 0; j < navBtns.length; j++) {
        navBtns[j].classList.remove('active');
      }

      // Highlight the clicked button (if there is one)
      if (clickedBtn !== null) {
        clickedBtn.classList.add('active');
      }

      // Scroll back to top
      window.scrollTo(0, 0);
    }
    /* ─────────────────────────────────────────
       SECTION 3 – LIGHT / DARK MODE
       Uses localStorage to remember choice
    ───────────────────────────────────────── */
    function toggleMode() {
      // Toggle the 'light' class on body
      document.body.classList.toggle('light');

      // Change the button emoji
      var btn = document.getElementById('modeBtn');
      if (document.body.classList.contains('light')) {
        btn.textContent = '🌙';
        localStorage.setItem('mode', 'light');
      } else {
        btn.textContent = '☀️';
        localStorage.setItem('mode', 'dark');
      }
    }

    // On page load, check if the user previously chose light mode
    if (localStorage.getItem('mode') === 'light') {
      document.body.classList.add('light');
      document.getElementById('modeBtn').textContent = '🌙';
    }

    /* ─────────────────────────────────────────
       SECTION 4 – ATTACK COUNTER ANIMATION
       Uses setInterval to count up
    ───────────────────────────────────────── */

    var countEl  = document.getElementById('attack-count');
    var count    = 0;
    var target   = 3500000;
    var timer = setInterval(function() {
      count = count + 60000;           // add 60,000 each tick
      if (count >= target) {
        count = target;
        clearInterval(timer);          // stop when we reach the target
      }
      countEl.textContent = count.toLocaleString();
    }, 30);
    /* ─────────────────────────────────────────
       SECTION 5 – BUILD THREAT CARDS
       Uses a for loop to create HTML cards
    ───────────────────────────────────────── */
    var threatContainer = document.getElementById('threat-cards');
    for (var t = 0; t < threats.length; t++) {
      var threat = threats[t];
      // Create a div element for the card
      var card = document.createElement('div');
      card.className = 'card';
      // Set the inner HTML using a template string
      card.innerHTML =
        '<h3>' + threat.icon + ' ' + threat.name + '</h3>' +
        '<p>' + threat.desc + '</p>' +
        '<p style="margin-top:10px; color: var(--accent); font-size:0.88rem;">💡 ' + threat.tip + '</p>' +
        '<span class="tag ' + threat.tagClass + '">' + threat.tag + '</span>';

      // Add the card to the page
      threatContainer.appendChild(card);
    }
    /* ─────────────────────────────────────────
       SECTION 6 – PASSWORD STRENGTH CHECKER
       Uses if / else if statements
    ───────────────────────────────────────── */
    function checkStrength() {
      var pwd  = document.getElementById('pwd').value;
      var fill = document.getElementById('strength-fill');
      var text = document.getElementById('strength-text');
      var tips = document.getElementById('pwd-tips');
      // If the field is empty, reset everything
      if (pwd === '') {
        fill.style.width = '0%';
        fill.style.backgroundColor = '';
        text.textContent = '—';
        tips.textContent = '';
        return;
      }
      // Count how many rules the password passes
      var score = 0;
      var missing = [];
      if (pwd.length >= 8)  { score++; } else { missing.push('at least 8 characters'); }
      if (pwd.length >= 12) { score++; } else { missing.push('12+ characters'); }
      if (/[A-Z]/.test(pwd)) { score++; } else { missing.push('an uppercase letter'); }
      if (/[a-z]/.test(pwd)) { score++; } else { missing.push('a lowercase letter'); }
      if (/[0-9]/.test(pwd)) { score++; } else { missing.push('a number'); }
      if (/[^A-Za-z0-9]/.test(pwd)) { score++; } else { missing.push('a symbol like !@#'); }
      // Set colour and label based on score
      if (score <= 2) {
        fill.style.width = '25%';
        fill.style.backgroundColor = '#ff4466';
        text.textContent = '❌ Very Weak';
      } else if (score === 3) {
        fill.style.width = '45%';
        fill.style.backgroundColor = '#ff9500';
        text.textContent = '⚠ Weak';
      } else if (score === 4) {
        fill.style.width = '65%';
        fill.style.backgroundColor = '#ffc94a';
        text.textContent = '🔶 Fair';
      } else if (score === 5) {
        fill.style.width = '80%';
        fill.style.backgroundColor = '#00b4ff';
        text.textContent = '👍 Good';
      } else {
        fill.style.width = '100%';
        fill.style.backgroundColor = '#00ff82';
        text.textContent = '✅ Strong!';
      }
      // Show which rules are missing
      if (missing.length > 0) {
        tips.textContent = 'Add: ' + missing.join(', ');
      } else {
        tips.textContent = 'Great password!';
        tips.style.color = '#00ff82';
      }
    }
    /* ─────────────────────────────────────────
       SECTION 7 – PASSWORD GENERATOR
       Uses Math.random and a for loop
    ───────────────────────────────────────── */
    function generatePwd() {
      var length  = document.getElementById('pwd-len').value;
      var chars   = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      var result  = '';
      // Pick random characters one by one
      for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * chars.length);
        result = result + chars[randomIndex];
      }
      var output = document.getElementById('gen-output');
      output.style.display = 'block';
      output.innerHTML = result +
        ' &nbsp;<button onclick="copyText(\'' + result + '\', this)" ' +
        'style="background:none;border:1px solid var(--accent);color:var(--accent);padding:4px 10px;border-radius:6px;cursor:pointer;font-size:0.8rem;">Copy</button>';
    }
    function copyText(text, btn) {
      navigator.clipboard.writeText(text);
      btn.textContent = 'Copied!';
    }
    /* ─────────────────────────────────────────
       SECTION 8 – URL SAFETY CHECKER
       Uses if statements and string methods
    ───────────────────────────────────────── */
    function checkURL() {
      var url    = document.getElementById('url-input').value.trim();
      var output = document.getElementById('url-output');
      output.style.display = 'block';
      if (url === '') {
        output.textContent = 'Please enter a URL.';
        return;
      }
      var warnings = [];
      var safe     = [];
      // Check 1: Does it start with https?
      if (url.indexOf('https://') === 0) {
        safe.push('✅ Uses HTTPS (secure connection)');
      } else {
        warnings.push('❌ No HTTPS — connection may not be secure');
      }
      // Check 2: Does it contain an IP address instead of a domain?
      if (/\d+\.\d+\.\d+\.\d+/.test(url)) {
        warnings.push('⚠ IP address in URL — suspicious');
      }
      // Check 3: Very long URL?
      if (url.length > 100) {
        warnings.push('⚠ Very long URL — could be hiding the real destination');
      }
      // Check 4: Sensitive keywords?
      if (/login|verify|account|confirm|update|secure/.test(url)) {
        warnings.push('⚠ Contains sensitive words — check carefully');
      }
      // Check 5: URL shortener?
      if (/bit\.ly|tinyurl|t\.co|goo\.gl/.test(url)) {
        warnings.push('⚠ URL shortener detected — real destination is hidden');
      }
      // Build the result message
      var all = safe.concat(warnings);
      output.innerHTML = all.join('<br>');
      if (warnings.length === 0) {
        output.style.color = '#00ff82';
      } else if (warnings.length === 1) {
        output.style.color = '#ffc94a';
      } else {
        output.style.color = '#ff4466';
      }
    }
    /* ─────────────────────────────────────────
       SECTION 9 – BROWSER INFO
       Uses the navigator and screen objects
    ───────────────────────────────────────── */
    function showBrowserInfo() {
      var output = document.getElementById('browser-output');
      output.style.display = 'block';
      output.style.color   = 'var(--accent)';
      output.innerHTML =
        '<b>Platform:</b> '      + navigator.platform       + '<br>' +
        '<b>Language:</b> '      + navigator.language       + '<br>' +
        '<b>Cookies on?</b> '   + navigator.cookieEnabled  + '<br>' +
        '<b>Online?</b> '        + navigator.onLine         + '<br>' +
        '<b>Screen size:</b> '   + screen.width + ' × ' + screen.height + '<br>' +
        '<b>Timezone:</b> '      + Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    /* ─────────────────────────────────────────
       SECTION 10 – BUILD TIPS
       Simple for loop to display tip cards
    ───────────────────────────────────────── */
    var tipsContainer = document.getElementById('tips-list');
    for (var k = 0; k < tipsList.length; k++) {
      var tip = tipsList[k];
      var tipDiv = document.createElement('div');
      tipDiv.className = 'tip-card';
      tipDiv.innerHTML =
        '<strong>' + tip.title + '</strong>' +
        '<p>' + tip.body + '</p>';
      tipsContainer.appendChild(tipDiv);
    }
