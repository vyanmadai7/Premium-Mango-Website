(function () {
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursorTrail');
    let mx = -300, my = -300;
    let cx = -300, cy = -300;
    let tx = -300, ty = -300;
    window.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });
    (function tickCursor() {
        cx += (mx - cx) * 0.18;
        cy += (my - cy) * 0.18;
        tx += (mx - tx) * 0.07;
        ty += (my - ty) * 0.07;
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
        cursorTrail.style.left = tx + 'px';
        cursorTrail.style.top = ty + 'px';
        requestAnimationFrame(tickCursor);
    })();
    const TOTAL = 80;
    const frames = new Array(TOTAL);
    let loaded = 0;
    let allReady = false;
    for (let i = 0; i < TOTAL; i++) {
        const img = new Image();
        img.src = `./frame/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`;
        img.onload = img.onerror = () => {
            loaded++;
            if (loaded === 1) {
                document.getElementById('sceneStats').classList.add('visible');
            }
            if (loaded === TOTAL) allReady = true;
        };
        frames[i] = img;
    }
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    let currentFrame = 0;
    let targetFrame = 0;
    function getProgress() {
        const spacer = document.querySelector('.scroll-spacer');
        const totalScroll = spacer.offsetHeight;
        return Math.min(1, Math.max(0, window.scrollY) / totalScroll);
    }
    const panels = document.querySelectorAll('.scene-panel');
    const progressBar = document.getElementById('progressBar');
    const scrollHint = document.getElementById('scrollHint');
    const nav = document.getElementById('nav');
    function updatePanels(progress) {
        panels.forEach(panel => {
            const start = parseFloat(panel.dataset.start);
            const end = parseFloat(panel.dataset.end);
            const isActive = progress >= start && progress <= end;
            const isPast = progress > end;
            panel.classList.toggle('active', isActive);
            panel.classList.toggle('exiting', !isActive && isPast);
        });
    }
    window.addEventListener('scroll', () => {
        const progress = getProgress();
        targetFrame = progress * (TOTAL - 1);
        progressBar.style.width = (progress * 100) + '%';
        scrollHint.classList.toggle('hidden', progress > 0.025);
        nav.classList.toggle('scrolled', window.scrollY > 50);
        updatePanels(progress);
    }, { passive: true });
    updatePanels(0);
    function drawFrame(index) {
        const img = frames[Math.round(index)];
        if (!img || !img.complete || !img.naturalWidth) return;
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    }
    function loop() {
        currentFrame += (targetFrame - currentFrame) * 0.09;
        const idx = Math.max(0, Math.min(TOTAL - 1, currentFrame));
        if (allReady) drawFrame(idx);
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const siblings = [...entry.target.parentElement.children];
            setTimeout(() => entry.target.classList.add('visible'),
                (siblings.indexOf(entry.target) % 4) * 90);
            revealObs.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.js-reveal').forEach(el => revealObs.observe(el));
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const orig = this.textContent;
            this.textContent = 'Added ✓';
            this.style.cssText = 'background:#d98f0e;border-color:#d98f0e;color:#fff';
            setTimeout(() => { this.textContent = orig; this.style.cssText = ''; }, 1800);
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (!t) return;
            e.preventDefault();
            t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();