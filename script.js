document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Smooth Navigation Scroll
    document.querySelectorAll("nav ul li a").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            window.scrollTo({
                top: target.offsetTop,
                behavior: "smooth"
            });
        });
    });

    // 2. Optimierter, zentrierter und verlangsamter Liquid Glass Blob
    const canvas = document.getElementById('liquid-glass-blob');
    const ctx = canvas.getContext('2d');
    let time = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawLiquidBlob() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        time += 0.007; 

        // Absolut zentriert auf dem Bildschirm
        const centerX = canvas.width * 0.5;
        const centerY = canvas.height * 0.5;
        
        // Dynamischer Radius mit Mindestgröße (verhindert das komplette Verschwinden bei schmalem Browser)
        let computedRadius = Math.min(canvas.width, canvas.height) * 0.35;
        if (computedRadius < 200) {
            computedRadius = 200; // Feste Mindestgröße für schmale Fenster
        }
        const baseRadius = computedRadius;
        ctx.save();
        ctx.beginPath();

        // 360-Grad-Berechnung der flüssigen Wellen-Vektoren
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.02) {
            let offset = Math.sin(angle * 3 + time) * 30;
            offset += Math.cos(angle * 2 - time * 1.5) * 18;
            offset += Math.sin(angle * 5 + time * 0.8) * 10;

            const r = baseRadius + offset;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;

            if (angle === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();

        // Flüssiges Farb-Gradiant perfekt auf das Zentrum abgestimmt
        const gradient = ctx.createRadialGradient(centerX, centerY, baseRadius * 0.2, centerX, centerY, baseRadius * 1.3);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');   /* Soft Violett */
        gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.22)'); /* Cyber Blue */
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');       /* Sanft auslaufend */

        ctx.fillStyle = gradient;
        ctx.fill();

        // Die leuchtende Glaskante (Neon Cyan-Blau)
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
        ctx.shadowBlur = 40;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.5)'; // Subtilerer Glow im Dunkeln
        ctx.stroke();
        
        ctx.restore();

        requestAnimationFrame(drawLiquidBlob);
    }

    drawLiquidBlob();
});