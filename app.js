/* ==========================================================================
   DEEPAK R // HYPER-SMOOTH SPA ROUTER, CURSOR & PHYSICS SIMULATION SUITE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CUSTOM CYBER CURSOR & MAGNETIC PHYSICS HOVER ---
    const cursorRing = document.getElementById('cyber-cursor');
    const cursorDot = document.getElementById('cyber-cursor-dot');

    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener('mousemove', (e) => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${mousePos.x}px`;
            cursorDot.style.top = `${mousePos.y}px`;
        }
    });

    function updateCursor() {
        if (cursorRing) {
            ringPos.x += (mousePos.x - ringPos.x) * 0.22;
            ringPos.y += (mousePos.y - ringPos.y) * 0.22;
            cursorRing.style.left = `${ringPos.x}px`;
            cursorRing.style.top = `${ringPos.y}px`;
        }
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover Target Reticle Scaling
    document.querySelectorAll('a, button, input, .magnetic-target').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hovering'));
    });

    // Magnetic Button Effect
    document.querySelectorAll('.magnetic-target').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${relX * 0.15}px, ${relY * 0.15}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
        });
    });


    // --- 2. WEB AUDIO API SYNTHESIZER ---
    class SciFiAudio {
        constructor() {
            this.ctx = null;
            this.enabled = true;
        }

        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        playHover() {
            if (!this.enabled) return;
            this.init();
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(550, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1100, this.ctx.currentTime + 0.04);
                
                gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.04);
            } catch (e) {}
        }

        playClick() {
            if (!this.enabled) return;
            this.init();
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(1500, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);

                gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.08);
            } catch (e) {}
        }

        playServo() {
            if (!this.enabled) return;
            this.init();
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, this.ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(450, this.ctx.currentTime + 0.1);

                gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.1);
            } catch (e) {}
        }

        playWipe() {
            if (!this.enabled) return;
            this.init();
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(300, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.18);

                gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.18);
            } catch (e) {}
        }
    }

    const audio = new SciFiAudio();

    document.querySelectorAll('[data-sound="hover"]').forEach(el => {
        el.addEventListener('mouseenter', () => audio.playHover());
    });
    document.querySelectorAll('[data-sound="click"]').forEach(el => {
        el.addEventListener('click', () => audio.playClick());
    });

    const audioToggleBtn = document.getElementById('audio-toggle');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            audio.enabled = !audio.enabled;
            audioToggleBtn.classList.toggle('active');
            audioToggleBtn.innerHTML = audio.enabled 
                ? '<i class="fa-solid fa-volume-high"></i>' 
                : '<i class="fa-solid fa-volume-xmark"></i>';
        });
    }


    // --- 3. DYNAMIC SPA ROUTER WITH SCI-FI PAGE WIPE ---
    const wipeOverlay = document.getElementById('page-transition-overlay');
    const wipeText = document.getElementById('wipe-text');

    function navigateToPage(targetPageId, updateHash = true) {
        const targetView = document.getElementById(`page-${targetPageId}`);
        if (!targetView) return;

        audio.playWipe();

        // Show Wipe Overlay
        if (wipeOverlay) {
            wipeText.innerText = `INITIALIZING MODULE // ${targetPageId.toUpperCase()}...`;
            wipeOverlay.classList.add('active');
        }

        setTimeout(() => {
            // Hide all pages & activate target
            document.querySelectorAll('.page-view').forEach(pv => pv.classList.remove('active'));
            targetView.classList.add('active');

            // Update Navigation active state
            document.querySelectorAll('.cyber-nav .nav-link').forEach(link => {
                link.classList.toggle('active', link.dataset.page === targetPageId);
            });

            // Trigger Reveal Animations
            triggerRevealAnimations();

            // Refit Active Canvases
            window.dispatchEvent(new Event('resize'));

            if (updateHash) {
                history.pushState(null, null, `#${targetPageId}`);
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (wipeOverlay) wipeOverlay.classList.remove('active');
        }, 220);
    }

    // Intercept SPA Links
    document.querySelectorAll('.spa-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.dataset.page;
            if (targetPage) navigateToPage(targetPage);
        });
    });

    // Handle Hash Navigation (e.g. #labs, #projects)
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.replace('#', '') || 'overview';
        navigateToPage(hash, false);
    });

    const initialHash = window.location.hash.replace('#', '') || 'overview';
    navigateToPage(initialHash, false);


    // --- 4. INTERSECTION OBSERVER SCROLL REVEAL ANIMATION ---
    function triggerRevealAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
    }
    triggerRevealAnimations();


    // --- 5. BACKGROUND PARTICLE CONSTELLATION ---
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        const bgCtx = bgCanvas.getContext('2d');
        let particles = [];

        function resizeBgCanvas() {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
        }
        resizeBgCanvas();
        window.addEventListener('resize', resizeBgCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * bgCanvas.width;
                this.y = Math.random() * bgCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.radius = Math.random() * 1.5 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > bgCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > bgCanvas.height) this.vy *= -1;
            }

            draw() {
                bgCtx.beginPath();
                bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                bgCtx.fillStyle = 'rgba(0, 240, 255, 0.45)';
                bgCtx.fill();
            }
        }

        for (let i = 0; i < 48; i++) particles.push(new Particle());

        function renderBg() {
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        bgCtx.beginPath();
                        bgCtx.moveTo(particles[i].x, particles[i].y);
                        bgCtx.lineTo(particles[j].x, particles[j].y);
                        bgCtx.strokeStyle = `rgba(0, 240, 255, ${0.18 * (1 - dist / 130)})`;
                        bgCtx.stroke();
                    }
                }
            }
            requestAnimationFrame(renderBg);
        }
        renderBg();
    }


    // --- 6. HERO PHYSICS ROBOTIC ARM ---
    const armCanvas = document.getElementById('hero-arm-canvas');
    if (armCanvas) {
        const armCtx = armCanvas.getContext('2d');

        function fitArmCanvas() {
            const rect = armCanvas.parentElement.getBoundingClientRect();
            armCanvas.width = rect.width;
            armCanvas.height = rect.height;
        }
        fitArmCanvas();
        window.addEventListener('resize', fitArmCanvas);

        const l1 = 120;
        const l2 = 100;
        
        let targetPos = { x: 140, y: -120 };
        let endEffectorPos = { x: 140, y: -120, vx: 0, vy: 0 };
        let currentAngles = { theta1: 0, theta2: 0 };

        let massRigidity = 0.22;
        let damping = 0.82;
        let plasmaSparks = [];

        armCanvas.addEventListener('mousemove', (e) => {
            const rect = armCanvas.getBoundingClientRect();
            targetPos.x = e.clientX - rect.left - armCanvas.width / 2;
            targetPos.y = e.clientY - rect.top - (armCanvas.height * 0.85);
            if (targetPos.y > 0) targetPos.y = 0; // Prevent targeting below base
            audio.playServo();

            if (Math.random() < 0.4) {
                plasmaSparks.push({
                    x: armCanvas.width / 2 + endEffectorPos.x,
                    y: armCanvas.height * 0.85 + endEffectorPos.y,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    life: 1.0
                });
            }
        });

        const impulseBtn = document.getElementById('arm-impulse-btn');
        if (impulseBtn) {
            impulseBtn.addEventListener('click', () => {
                endEffectorPos.vx += (Math.random() - 0.5) * 180;
                endEffectorPos.vy += (Math.random() - 0.5) * 180;
                audio.playClick();

                for (let i = 0; i < 20; i++) {
                    plasmaSparks.push({
                        x: armCanvas.width / 2 + endEffectorPos.x,
                        y: armCanvas.height * 0.85 + endEffectorPos.y,
                        vx: (Math.random() - 0.5) * 12,
                        vy: (Math.random() - 0.5) * 12,
                        life: 1.0
                    });
                }
            });
        }

        const armResetBtn = document.getElementById('arm-reset-btn');
        if (armResetBtn) {
            armResetBtn.addEventListener('click', () => {
                targetPos = { x: 140, y: -120 };
                endEffectorPos = { x: 140, y: -120, vx: 0, vy: 0 };
            });
        }

        function calculateIK(tx, ty) {
            const dist = Math.sqrt(tx * tx + ty * ty);
            const maxReach = l1 + l2 - 5;
            let x = tx;
            let y = ty;
            if (dist > maxReach) {
                x = (tx / dist) * maxReach;
                y = (ty / dist) * maxReach;
            }

            const D = (x * x + y * y - l1 * l1 - l2 * l2) / (2 * l1 * l2);
            const clampedD = Math.max(-1, Math.min(1, D));
            const theta2 = Math.atan2(-Math.sqrt(1 - clampedD * clampedD), clampedD);
            const theta1 = Math.atan2(y, x) - Math.atan2(l2 * Math.sin(theta2), l1 + l2 * Math.cos(theta2));

            return { theta1, theta2 };
        }

        function renderArmPhysics() {
            armCtx.clearRect(0, 0, armCanvas.width, armCanvas.height);

            const centerX = armCanvas.width / 2;
            const centerY = armCanvas.height * 0.85;

            const ax = (targetPos.x - endEffectorPos.x) * massRigidity;
            const ay = (targetPos.y - endEffectorPos.y) * massRigidity;

            endEffectorPos.vx = (endEffectorPos.vx + ax) * damping;
            endEffectorPos.vy = (endEffectorPos.vy + ay) * damping;

            endEffectorPos.x += endEffectorPos.vx;
            endEffectorPos.y += endEffectorPos.vy;
            
            if (endEffectorPos.y > 0) {
                endEffectorPos.y = 0;
                endEffectorPos.vy *= -0.5; // bounce off floor
            }

            const ik = calculateIK(endEffectorPos.x, endEffectorPos.y);
            currentAngles.theta1 += (ik.theta1 - currentAngles.theta1) * 0.3;
            currentAngles.theta2 += (ik.theta2 - currentAngles.theta2) * 0.3;

            const j0 = { x: centerX, y: centerY };
            const j1 = {
                x: j0.x + l1 * Math.cos(currentAngles.theta1),
                y: j0.y + l1 * Math.sin(currentAngles.theta1)
            };
            const j2 = {
                x: j1.x + l2 * Math.cos(currentAngles.theta1 + currentAngles.theta2),
                y: j1.y + l2 * Math.sin(currentAngles.theta1 + currentAngles.theta2)
            };

            // Grid
            armCtx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
            armCtx.lineWidth = 1;
            for (let x = 0; x < armCanvas.width; x += 30) {
                armCtx.beginPath();
                armCtx.moveTo(x, 0);
                armCtx.lineTo(x, armCanvas.height);
                armCtx.stroke();
            }

            // Spring Force Vector Lines
            armCtx.strokeStyle = 'rgba(255, 0, 127, 0.35)';
            armCtx.setLineDash([4, 4]);
            armCtx.beginPath();
            armCtx.moveTo(centerX + targetPos.x, centerY + targetPos.y);
            armCtx.lineTo(j2.x, j2.y);
            armCtx.stroke();
            armCtx.setLineDash([]);

            // Base
            armCtx.fillStyle = '#0a1226';
            armCtx.strokeStyle = '#00f0ff';
            armCtx.lineWidth = 2;
            armCtx.fillRect(centerX - 40, centerY, 80, 25);
            armCtx.strokeRect(centerX - 40, centerY, 80, 25);

            // Link 1
            armCtx.strokeStyle = '#00f0ff';
            armCtx.lineWidth = 14;
            armCtx.lineCap = 'round';
            armCtx.beginPath();
            armCtx.moveTo(j0.x, j0.y);
            armCtx.lineTo(j1.x, j1.y);
            armCtx.stroke();

            // Link 2
            armCtx.strokeStyle = '#ff007f';
            armCtx.lineWidth = 10;
            armCtx.beginPath();
            armCtx.moveTo(j1.x, j1.y);
            armCtx.lineTo(j2.x, j2.y);
            armCtx.stroke();

            // Joints
            [j0, j1, j2].forEach((j, idx) => {
                armCtx.fillStyle = idx === 2 ? '#00ff9d' : '#ffffff';
                armCtx.beginPath();
                armCtx.arc(j.x, j.y, 9, 0, Math.PI * 2);
                armCtx.fill();
            });

            // Target
            armCtx.strokeStyle = '#ffb800';
            armCtx.lineWidth = 1.5;
            armCtx.beginPath();
            armCtx.arc(centerX + targetPos.x, centerY + targetPos.y, 12, 0, Math.PI * 2);
            armCtx.stroke();

            // Sparks
            for (let i = plasmaSparks.length - 1; i >= 0; i--) {
                const s = plasmaSparks[i];
                s.x += s.vx;
                s.y += s.vy;
                s.life -= 0.03;
                if (s.life <= 0) {
                    plasmaSparks.splice(i, 1);
                    continue;
                }
                armCtx.fillStyle = `rgba(0, 255, 157, ${s.life})`;
                armCtx.beginPath();
                armCtx.arc(s.x, s.y, 2.5 * s.life, 0, Math.PI * 2);
                armCtx.fill();
            }

            const xyEl = document.getElementById('arm-xy');
            if (xyEl) xyEl.innerText = `${endEffectorPos.x.toFixed(1)}, ${(-endEffectorPos.y).toFixed(1)}`;
            const t1El = document.getElementById('arm-t1');
            if (t1El) t1El.innerText = `${(currentAngles.theta1 * (180/Math.PI)).toFixed(1)}°`;
            const t2El = document.getElementById('arm-t2');
            if (t2El) t2El.innerText = `${(currentAngles.theta2 * (180/Math.PI)).toFixed(1)}°`;

            requestAnimationFrame(renderArmPhysics);
        }
        renderArmPhysics();
    }


    // --- 7. LAB 1: SLAM LiDAR AMR ROVER ---
    const slamCanvas = document.getElementById('slam-canvas');
    if (slamCanvas) {
        const slamCtx = slamCanvas.getContext('2d');

        function fitSlamCanvas() {
            const rect = slamCanvas.parentElement.getBoundingClientRect();
            slamCanvas.width = rect.width;
            slamCanvas.height = rect.height;
        }
        fitSlamCanvas();
        window.addEventListener('resize', fitSlamCanvas);

        let robot = {
            x: 90, y: 90, angle: 0,
            vx: 0, vy: 0, omega: 0, friction: 0.88
        };
        let goalPos = { x: 320, y: 220 };
        let crates = [
            { x: 180, y: 60, w: 50, h: 140, vx: 0, vy: 0 },
            { x: 280, y: 190, w: 100, h: 45, vx: 0, vy: 0 }
        ];

        const genObsBtn = document.getElementById('gen-obstacles-btn');
        if (genObsBtn) {
            genObsBtn.addEventListener('click', () => {
                crates = [];
                for (let i = 0; i < 4; i++) {
                    crates.push({
                        x: Math.random() * (slamCanvas.width - 160) + 60,
                        y: Math.random() * (slamCanvas.height - 160) + 60,
                        w: Math.random() * 70 + 40,
                        h: Math.random() * 70 + 40,
                        vx: 0, vy: 0
                    });
                }
            });
        }

        const clearMapBtn = document.getElementById('clear-map-btn');
        if (clearMapBtn) clearMapBtn.addEventListener('click', () => crates = []);

        slamCanvas.addEventListener('click', (e) => {
            const rect = slamCanvas.getBoundingClientRect();
            goalPos.x = e.clientX - rect.left;
            goalPos.y = e.clientY - rect.top;
            audio.playClick();
        });

        function renderSlamPhysics() {
            slamCtx.clearRect(0, 0, slamCanvas.width, slamCanvas.height);

            // Grid
            slamCtx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
            slamCtx.lineWidth = 1;
            for (let x = 0; x < slamCanvas.width; x += 25) {
                slamCtx.beginPath();
                slamCtx.moveTo(x, 0);
                slamCtx.lineTo(x, slamCanvas.height);
                slamCtx.stroke();
            }

            // Crates Physics (Static)
            crates.forEach((c, idx) => {
                c.vx = 0;
                c.vy = 0;

                slamCtx.fillStyle = 'rgba(10, 18, 38, 0.9)';
                slamCtx.strokeStyle = '#00f0ff';
                slamCtx.lineWidth = 1.5;
                slamCtx.fillRect(c.x, c.y, c.w, c.h);
                slamCtx.strokeRect(c.x, c.y, c.w, c.h);
            });

            // Robot Navigation
            const dx = goalPos.x - robot.x;
            const dy = goalPos.y - robot.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const speedSlider = document.getElementById('robot-speed');
            const targetSpeed = speedSlider ? parseFloat(speedSlider.value) : 3.5;

            if (dist > 8) {
                // Potential field avoidance
                let attractiveX = (dx / dist) * 40;
                let attractiveY = (dy / dist) * 40;

                let repelX = 0;
                let repelY = 0;
                crates.forEach(c => {
                    let cx = c.x + c.w/2;
                    let cy = c.y + c.h/2;
                    let cdx = robot.x - cx;
                    let cdy = robot.y - cy;
                    let cdist = Math.sqrt(cdx*cdx + cdy*cdy);
                    let safeDist = 90;
                    if (cdist < safeDist) {
                        repelX += (cdx / cdist) * (safeDist - cdist) * 3.5;
                        repelY += (cdy / cdist) * (safeDist - cdist) * 3.5;
                    }
                });
                const targetAngle = Math.atan2(attractiveY + repelY, attractiveX + repelX);
                let angleDiff = targetAngle - robot.angle;
                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

                robot.omega += angleDiff * 0.08;
                robot.omega *= 0.75;
                robot.angle += robot.omega;

                robot.vx += Math.cos(robot.angle) * targetSpeed * 0.4;
                robot.vy += Math.sin(robot.angle) * targetSpeed * 0.4;
            }

            robot.vx *= robot.friction;
            robot.vy *= robot.friction;
            robot.x += robot.vx;
            robot.y += robot.vy;

            // Collisions
            // Bounds for robot
            if (robot.x - 14 < 0) { robot.x = 14; robot.vx *= -0.5; }
            if (robot.x + 14 > slamCanvas.width) { robot.x = slamCanvas.width - 14; robot.vx *= -0.5; }
            if (robot.y - 14 < 0) { robot.y = 14; robot.vy *= -0.5; }
            if (robot.y + 14 > slamCanvas.height) { robot.y = slamCanvas.height - 14; robot.vy *= -0.5; }

            crates.forEach(c => {
                let testX = robot.x;
                let testY = robot.y;
                if (robot.x < c.x) testX = c.x;
                else if (robot.x > c.x + c.w) testX = c.x + c.w;
                if (robot.y < c.y) testY = c.y;
                else if (robot.y > c.y + c.h) testY = c.y + c.h;

                let distX = robot.x - testX;
                let distY = robot.y - testY;
                let distance = Math.sqrt((distX * distX) + (distY * distY));

                if (robot.x >= c.x && robot.x <= c.x + c.w && robot.y >= c.y && robot.y <= c.y + c.h) {
                    // Robot center is inside the crate, push out to nearest edge
                    let distLeft = robot.x - c.x;
                    let distRight = (c.x + c.w) - robot.x;
                    let distTop = robot.y - c.y;
                    let distBottom = (c.y + c.h) - robot.y;
                    
                    let min = Math.min(distLeft, distRight, distTop, distBottom);
                    if (min === distLeft) { robot.x = c.x - 14.1; robot.vx *= -0.5; }
                    else if (min === distRight) { robot.x = c.x + c.w + 14.1; robot.vx *= -0.5; }
                    else if (min === distTop) { robot.y = c.y - 14.1; robot.vy *= -0.5; }
                    else if (min === distBottom) { robot.y = c.y + c.h + 14.1; robot.vy *= -0.5; }
                } else if (distance <= 14) {
                    // Penetration resolution
                    let overlap = 14 - distance;
                    let nx = distance > 0 ? distX / distance : 1;
                    let ny = distance > 0 ? distY / distance : 0;
                    
                    robot.x += nx * overlap;
                    robot.y += ny * overlap;

                    robot.vx *= -0.5;
                    robot.vy *= -0.5;
                }
            });

            // LiDAR Raycasting
            const rayCountEl = document.getElementById('lidar-count');
            const rayCount = rayCountEl ? parseInt(rayCountEl.value) : 36;
            slamCtx.strokeStyle = 'rgba(0, 255, 157, 0.35)';
            slamCtx.lineWidth = 1;

            for (let i = 0; i < rayCount; i++) {
                const rayAngle = robot.angle + (i / rayCount) * Math.PI * 2;
                let rayX = robot.x;
                let rayY = robot.y;

                for (let r = 0; r < 160; r += 4) {
                    rayX = robot.x + Math.cos(rayAngle) * r;
                    rayY = robot.y + Math.sin(rayAngle) * r;

                    let hit = false;
                    if (rayX < 0 || rayX > slamCanvas.width || rayY < 0 || rayY > slamCanvas.height) hit = true;
                    for (let c of crates) {
                        if (rayX >= c.x && rayX <= c.x + c.w && rayY >= c.y && rayY <= c.y + c.h) {
                            hit = true; break;
                        }
                    }
                    if (hit) {
                        slamCtx.fillStyle = '#00ff9d';
                        slamCtx.fillRect(rayX - 2, rayY - 2, 4, 4);
                        break;
                    }
                }

                slamCtx.beginPath();
                slamCtx.moveTo(robot.x, robot.y);
                slamCtx.lineTo(rayX, rayY);
                slamCtx.stroke();
            }

            // Goal
            slamCtx.fillStyle = '#ff007f';
            slamCtx.beginPath();
            slamCtx.arc(goalPos.x, goalPos.y, 8, 0, Math.PI * 2);
            slamCtx.fill();

            // AMR Robot Body
            slamCtx.fillStyle = '#00f0ff';
            slamCtx.beginPath();
            slamCtx.arc(robot.x, robot.y, 14, 0, Math.PI * 2);
            slamCtx.fill();

            // Stats
            const distEl = document.getElementById('slam-dist');
            if (distEl) distEl.innerText = `${(dist / 20).toFixed(2)} m`;
            const poseEl = document.getElementById('slam-pose');
            if (poseEl) poseEl.innerText = `${(robot.x / 10).toFixed(1)}, ${(robot.y / 10).toFixed(1)}, ${(robot.angle * (180 / Math.PI)).toFixed(0)}°`;

            requestAnimationFrame(renderSlamPhysics);
        }
        renderSlamPhysics();
    }


    // --- 8. LAB 2: NEURAL PERCEPTION & VISION ---
    const visionCanvas = document.getElementById('vision-canvas');
    if (visionCanvas) {
        const visionCtx = visionCanvas.getContext('2d');

        function fitVisionCanvas() {
            const rect = visionCanvas.parentElement.getBoundingClientRect();
            visionCanvas.width = rect.width;
            visionCanvas.height = rect.height;
        }
        fitVisionCanvas();
        window.addEventListener('resize', fitVisionCanvas);

        let visionMode = 'rgb';
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                visionMode = e.target.dataset.mode;
                const badge = document.getElementById('vision-mode-badge');
                if (badge) badge.innerText = `MODE: ${visionMode.toUpperCase()} PERCEPTION`;
            });
        });

        let rigidBodies = [
            { x: 100, y: 50, vx: 2.5, vy: 1.2, radius: 25, label: 'Robot Manipulator Joint', color: '#00f0ff', conf: '98.6' },
            { x: 260, y: 80, vx: -1.8, vy: 2.1, radius: 30, label: 'Human Worker (Safety)', color: '#ff007f', conf: '92.4' },
            { x: 180, y: 160, vx: 1.5, vy: -1.5, radius: 20, label: 'Target Payload Box', color: '#00ff9d', conf: '99.1' }
        ];

        function renderVisionPhysics() {
            visionCtx.clearRect(0, 0, visionCanvas.width, visionCanvas.height);

            if (visionMode === 'rgb') {
                visionCtx.fillStyle = '#030816';
                visionCtx.fillRect(0, 0, visionCanvas.width, visionCanvas.height);
            } else if (visionMode === 'depth') {
                const grad = visionCtx.createRadialGradient(visionCanvas.width / 2, visionCanvas.height / 2, 20, visionCanvas.width / 2, visionCanvas.height / 2, 250);
                grad.addColorStop(0, '#00f0ff');
                grad.addColorStop(0.5, '#001a33');
                grad.addColorStop(1, '#000000');
                visionCtx.fillStyle = grad;
                visionCtx.fillRect(0, 0, visionCanvas.width, visionCanvas.height);
            } else if (visionMode === 'thermal') {
                const grad = visionCtx.createLinearGradient(0, 0, visionCanvas.width, visionCanvas.height);
                grad.addColorStop(0, '#ff007f');
                grad.addColorStop(0.5, '#ffb800');
                grad.addColorStop(1, '#0b001a');
                visionCtx.fillStyle = grad;
                visionCtx.fillRect(0, 0, visionCanvas.width, visionCanvas.height);
            }

            rigidBodies.forEach((b, idx) => {
                b.vy += 0.15;
                b.x += b.vx;
                b.y += b.vy;

                if (b.x - b.radius < 0) { b.x = b.radius; b.vx *= -0.85; }
                if (b.x + b.radius > visionCanvas.width) { b.x = visionCanvas.width - b.radius; b.vx *= -0.85; }
                if (b.y - b.radius < 0) { b.y = b.radius; b.vy *= -0.85; }
                if (b.y + b.radius > visionCanvas.height) { b.y = visionCanvas.height - b.radius; b.vy *= -0.85; }

                // Circle-circle collisions
                for (let j = idx + 1; j < rigidBodies.length; j++) {
                    let b2 = rigidBodies[j];
                    let dx = b2.x - b.x;
                    let dy = b2.y - b.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    let minDist = b.radius + b2.radius;
                    if (dist < minDist && dist > 0.001) {
                        let overlap = minDist - dist;
                        let nx = dx / dist;
                        let ny = dy / dist;
                        
                        b.x -= nx * overlap * 0.5;
                        b.y -= ny * overlap * 0.5;
                        b2.x += nx * overlap * 0.5;
                        b2.y += ny * overlap * 0.5;
                        
                        let vDiffX = b.vx - b2.vx;
                        let vDiffY = b.vy - b2.vy;
                        let dot = vDiffX * nx + vDiffY * ny;
                        if (dot > 0) {
                            let impulse = dot * 0.9;
                            b.vx -= impulse * nx;
                            b.vy -= impulse * ny;
                            b2.vx += impulse * nx;
                            b2.vy += impulse * ny;
                        }
                    }
                }

                visionCtx.fillStyle = b.color;
                visionCtx.beginPath();
                visionCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                visionCtx.fill();

                const bx = b.x - b.radius - 8;
                const by = b.y - b.radius - 8;
                const bw = b.radius * 2 + 16;
                const bh = b.radius * 2 + 16;

                visionCtx.strokeStyle = b.color;
                visionCtx.lineWidth = 2;
                visionCtx.strokeRect(bx, by, bw, bh);

                visionCtx.fillStyle = b.color;
                visionCtx.fillRect(bx, by - 20, bw, 20);
                visionCtx.fillStyle = '#000';
                visionCtx.font = '10px Orbitron';
                visionCtx.fillText(`${b.label} [${b.conf}%]`, bx + 4, by - 6);
            });

            requestAnimationFrame(renderVisionPhysics);
        }
        renderVisionPhysics();
    }


    // --- 9. LAB 3: PID DYNAMICS ---
    const pidCanvas = document.getElementById('pid-canvas');
    if (pidCanvas) {
        const pidCtx = pidCanvas.getContext('2d');

        function fitPidCanvas() {
            const rect = pidCanvas.parentElement.getBoundingClientRect();
            pidCanvas.width = rect.width;
            pidCanvas.height = rect.height;
        }
        fitPidCanvas();
        window.addEventListener('resize', fitPidCanvas);

        let pidPoints = [];
        let targetSetpoint = 140;
        let massState = { x: 0, v: 0, a: 0, mass: 2.5, k: 4.0, c: 0.45 };
        let integral = 0;
        let lastError = 0;

        const kpSlider = document.getElementById('kp-slider');
        if (kpSlider) kpSlider.addEventListener('input', (e) => document.getElementById('kp-val').innerText = parseFloat(e.target.value).toFixed(2));
        const kiSlider = document.getElementById('ki-slider');
        if (kiSlider) kiSlider.addEventListener('input', (e) => document.getElementById('ki-val').innerText = parseFloat(e.target.value).toFixed(2));
        const kdSlider = document.getElementById('kd-slider');
        if (kdSlider) kdSlider.addEventListener('input', (e) => document.getElementById('kd-val').innerText = parseFloat(e.target.value).toFixed(2));

        const stepBtn = document.getElementById('step-input-btn');
        if (stepBtn) {
            stepBtn.addEventListener('click', () => {
                targetSetpoint = targetSetpoint === 140 ? 70 : 140;
                massState.v += (Math.random() - 0.5) * 40;
                audio.playClick();
            });
        }

        function renderPidPhysics() {
            pidCtx.clearRect(0, 0, pidCanvas.width, pidCanvas.height);

            const Kp = kpSlider ? parseFloat(kpSlider.value) : 1.8;
            const Ki = kiSlider ? parseFloat(kiSlider.value) : 0.2;
            const Kd = kdSlider ? parseFloat(kdSlider.value) : 0.65;

            const error = targetSetpoint - massState.x;
            integral += error * 0.04;
            const derivative = (error - lastError) / 0.04;
            const fControl = Kp * error + Ki * integral + Kd * derivative;
            lastError = error;

            // Clamp force to prevent extreme instability blowing up the graph
            let clampedFControl = Math.max(-1000, Math.min(1000, fControl));
            const fNet = clampedFControl - massState.c * massState.v;
            massState.a = fNet / massState.mass;
            massState.v += massState.a * 0.04;
            massState.x += massState.v * 0.04;

            pidPoints.push(massState.x);
            if (pidPoints.length > pidCanvas.width) pidPoints.shift();

            // Grid
            pidCtx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
            pidCtx.lineWidth = 1;
            for (let y = 0; y < pidCanvas.height; y += 30) {
                pidCtx.beginPath();
                pidCtx.moveTo(0, y);
                pidCtx.lineTo(pidCanvas.width, y);
                pidCtx.stroke();
            }

            // Setpoint Line
            pidCtx.strokeStyle = '#ff007f';
            pidCtx.setLineDash([5, 5]);
            pidCtx.beginPath();
            pidCtx.moveTo(0, pidCanvas.height - targetSetpoint);
            pidCtx.lineTo(pidCanvas.width, pidCanvas.height - targetSetpoint);
            pidCtx.stroke();
            pidCtx.setLineDash([]);

            // Oscilloscope Curve
            pidCtx.strokeStyle = '#00f0ff';
            pidCtx.lineWidth = 2.5;
            pidCtx.beginPath();
            for (let i = 0; i < pidPoints.length; i++) {
                const x = i;
                const y = pidCanvas.height - pidPoints[i];
                if (i === 0) pidCtx.moveTo(x, y);
                else pidCtx.lineTo(x, y);
            }
            pidCtx.stroke();

            // Sliding Mass Widget
            const mX = pidCanvas.width - 50;
            const mY = pidCanvas.height - massState.x;
            pidCtx.fillStyle = '#00ff9d';
            pidCtx.fillRect(mX - 15, mY - 15, 30, 30);
            pidCtx.strokeStyle = '#fff';
            pidCtx.strokeRect(mX - 15, mY - 15, 30, 30);

            requestAnimationFrame(renderPidPhysics);
        }
        renderPidPhysics();
    }


    // --- 10. LAB TABS ---
    document.querySelectorAll('.lab-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lab-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.lab-pane').forEach(p => p.classList.remove('active'));

            const tabId = btn.dataset.tab;
            btn.classList.add('active');
            const pane = document.getElementById(tabId);
            if (pane) pane.classList.add('active');
        });
    });


    // --- 11. PROJECT FILTERS & MODALS ---
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            document.querySelectorAll('.project-card').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const projectData = {
        'modal-sih': {
            title: 'Smart Traffic Management System (SIH 2025)',
            specs: [
                { k: 'Hackathon ID', v: 'SIH25050 (Smart India Hackathon)' },
                { k: 'Computer Vision', v: 'YOLOv8 + OpenCV Dynamic Count' },
                { k: 'Control Strategy', v: 'Density-adaptive traffic signal loop' },
                { k: 'Impact', v: 'Reduces junction idle time by up to 38%' }
            ],
            desc: 'Developed as part of SIH 2025 to tackle urban congestion. Analyzes real-time camera streams to dynamically allocate green light duration based on vehicle density per lane.'
        },
        'modal-yolo': {
            title: 'Real-Time Object Detection & Gesture Engine',
            specs: [
                { k: 'Detection Stack', v: 'YOLOv8 / YOLOv11 + MediaPipe' },
                { k: 'Inference Speed', v: '30+ FPS on edge micro-compute' },
                { k: 'Frameworks', v: 'Python, OpenCV, PyTorch' }
            ],
            desc: 'Optimized high-speed computer vision pipelines for real-time object tracking and hand-gesture recognition tailored for low-latency robotic operation.'
        },
        'modal-ros': {
            title: 'ROS / ROS 2 Autonomous Vehicle Navigation',
            specs: [
                { k: 'Middleware', v: 'ROS 2 Humble / Jazzy' },
                { k: 'SLAM Framework', v: '2D Occupancy Grid + LiDAR Raycasting' },
                { k: 'Path Planner', v: 'Nav2 Dijkstra / A* Global & Local Costmaps' }
            ],
            desc: 'Explored autonomous mobile vehicle navigation stack, configuring costmaps, SLAM mapping nodes, and sensor fusion for obstacle avoidance.'
        },
        'modal-esp': {
            title: 'Smart Mechatronics ESP8266 & Arduino Controller',
            specs: [
                { k: 'Microcontrollers', v: 'NodeMCU V3 ESP8266 + Arduino Uno' },
                { k: 'Wireless Protocol', v: 'Wi-Fi Web Server & MQTT Telemetry' },
                { k: 'Actuation', v: 'Servo & Stepper Motor Driver Interfacing' }
            ],
            desc: 'Hardware-software embedded integration enabling real-time sensor data transmission and remote robotic actuator control.'
        }
    };

    const modalOverlay = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');

    if (modalOverlay && modalBody) {
        document.querySelectorAll('.open-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalKey = btn.dataset.modal;
                const data = projectData[modalKey];
                if (!data) return;

                modalBody.innerHTML = `
                    <h2 style="font-family: var(--font-heading); color: var(--color-cyan); margin-bottom: 1rem;"><i class="fa-solid fa-microchip"></i> ${data.title}</h2>
                    <p style="margin-bottom: 1.5rem; color: var(--color-text-muted);">${data.desc}</p>
                    <h4 style="font-family: var(--font-heading); margin-bottom: 0.75rem;"><i class="fa-solid fa-list-check"></i> SYSTEM SPECIFICATIONS</h4>
                    <div style="display: grid; gap: 0.5rem; margin-bottom: 1.5rem;">
                        ${data.specs.map(s => `
                            <div style="display: flex; justify-content: space-between; background: rgba(0,240,255,0.05); padding: 0.5rem 0.8rem; border-left: 2px solid var(--color-cyan);">
                                <span style="color: var(--color-text-muted); font-size: 0.85rem;">${s.k}:</span>
                                <strong style="font-size: 0.85rem;">${s.v}</strong>
                            </div>
                        `).join('')}
                    </div>
                    <button class="cyber-btn btn-primary" onclick="document.getElementById('modal-container').classList.remove('active')">
                        <i class="fa-solid fa-check"></i> ACKNOWLEDGE SPEC
                    </button>
                `;
                modalOverlay.classList.add('active');
            });
        });

        const modalCloseBtn = document.getElementById('modal-close');
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove('active');
        });
    }


    // --- 12. TERMINAL CLI ---
    const cliOutput = document.getElementById('cli-output');
    const cliInput = document.getElementById('cli-input');
    const cliForm = document.getElementById('cli-form');

    if (cliOutput && cliInput && cliForm) {
        const cliCommands = {
            'help': 'Available commands: <span class="txt-cyan">whoami, education, experience, skills, projects, contact, ping, clear</span>',
            'whoami': 'Deepak R — B.E. Robotics & Automation Student (9.2 CGPA) at Dhaanish Ahmed College of Engineering (Anna University), Chennai, India.',
            'education': 'B.E. Robotics & Automation (May 2024 – May 2028), Anna University (DACE). CGPA: 9.2 / 10.0.',
            'experience': '[1] Machine Learning Intern @ Tamizhan Skills (RISE 3.0), [2] AI for Autonomous Systems Intern @ Tamizhan Skills (RISE 4.0), [3] Engineering Intern @ Chennai Port Authority.',
            'skills': 'Languages: Python, C/C++, SQL | Frameworks: ROS/ROS 2, TensorFlow, OpenCV, MediaPipe, YOLO | Hardware: ESP8266 NodeMCU, Arduino, Linux, Fusion 360.',
            'projects': '[1] Smart Traffic Management System (SIH 2025), [2] Real-Time Object Detection Engine, [3] ROS Autonomous Navigation Stack, [4] Smart Mechatronics Controller.',
            'contact': 'Email: <span class="txt-cyan">deepak121289@outlook.com</span> | Phone: <span class="txt-green">+91 63696 14424</span> | Location: Chennai, TN, India.',
            'ping': 'Pinging deepak.robotics.internal [127.0.0.1]: 64 bytes, <span class="txt-green">time=1.8ms</span>. TTL=64'
        };

        function appendCliLine(text, isUser = false) {
            const line = document.createElement('div');
            line.className = 'cli-line';
            if (isUser) {
                line.innerHTML = `<span class="cli-prompt">deepak@robotics:~$</span> ${text}`;
            } else {
                line.innerHTML = text;
            }
            cliOutput.appendChild(line);
            cliOutput.scrollTop = cliOutput.scrollHeight;
        }

        cliForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cmd = cliInput.value.trim().toLowerCase();
            if (!cmd) return;

            appendCliLine(cmd, true);
            cliInput.value = '';

            if (cmd === 'clear') {
                cliOutput.innerHTML = '';
            } else if (cliCommands[cmd]) {
                appendCliLine(cliCommands[cmd]);
            } else {
                appendCliLine(`<span style="color:#ff3366;">Command not recognized: '${cmd}'. Type 'help' for available menu.</span>`);
            }
            audio.playClick();
        });

        document.querySelectorAll('.cli-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const cmd = chip.dataset.cmd;
                cliInput.value = cmd;
                cliForm.dispatchEvent(new Event('submit'));
            });
        });
    }


    // --- 13. CONTACT FORM ---
    const contactForm = document.getElementById('cyber-contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.innerHTML = `<span class="txt-cyan"><i class="fa-solid fa-spinner fa-spin"></i> ENCRYPTING & BROADCASTING SIGNAL TO DEEPAK...</span>`;
            
            setTimeout(() => {
                formFeedback.innerHTML = `<span class="txt-green"><i class="fa-solid fa-circle-check"></i> TRANSMISSION SUCCESSFUL! DEEPAK R WILL RESPOND TO YOUR COMM CHANNEL SHORTLY.</span>`;
                contactForm.reset();
                audio.playClick();
            }, 1200);
        });
    }

});
