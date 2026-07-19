document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================================================
    // 1. MINIMALIST NAV TRANSITION
    // ==========================================================================
    const header = document.querySelector('.editorial-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll Links
    document.querySelectorAll(".nav-links a, .logo").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ==========================================================================
    // 2. SATISFYING ACCORDION PANELS MOUSE-DRIVEN SLIDER
    // ==========================================================================
    const panels = document.querySelectorAll('.accordion-panel');

    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            panels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
        });
    });

    // ==========================================================================
    // 3. PROZEDURAL INTERACTIVE VECTOR LOGIC (Das mathematische Liniennetz)
    // ==========================================================================
    const canvas = document.getElementById('interactive-vector-net');
    const ctx = canvas.getContext('2d');

    let mouse = { x: null, y: null, targetX: null, targetY: null };
    let time = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Maus-Tracking mit Dämpfung für weiche Bewegungen
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.targetX = null;
        mouse.targetY = null;
    });

    function drawVectorNet() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.004;

        // Seidenweiche Annäherung der Maus-Koordinaten (Lerp)
        if (mouse.targetX !== null) {
            if (mouse.x === null) { mouse.x = mouse.targetX; mouse.y = mouse.targetY; }
            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;
        } else {
            mouse.x = null; mouse.y = null;
        }

        const linesCount = 12; // Anzahl der eleganten Wellenlinien
        const step = canvas.height / (linesCount + 1);

        ctx.lineWidth = 1;

        for (let i = 1; i <= linesCount; i++) {
            ctx.beginPath();
            
            // Elegantes Farb-Fading für Tiefe im Raum
            const opacity = (1 - Math.abs(i - linesCount / 2) / (linesCount / 2)) * 0.25;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;

            const baseY = i * step;

            for (let x = 0; x <= canvas.width; x += 15) {
                // Mathematische Grundwelle
                let y = baseY + Math.sin(x * 0.002 + time + i) * 25;
                y += Math.cos(x * 0.001 - time * 0.5 + i) * 15;

                // INTERAKTIVER MAUS-MAGNET-EFFEKT
                if (mouse.x !== null) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 280) {
                        // Verzerrt die Wellen sanft um den Cursor herum
                        const force = (280 - distance) / 280;
                        y += (dy / distance) * force * 45;
                    }
                }

                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        requestAnimationFrame(drawVectorNet);
    }
    drawVectorNet();
});