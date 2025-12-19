function mostrarMensaje() {
  const mensaje = document.getElementById("mensaje");
  if (!mensaje) return;
  mensaje.style.display = "block";
  mensaje.style.opacity = 0;
  mensaje.style.transform = "translateY(6px)";
  mensaje.style.transition = "opacity 350ms ease, transform 350ms ease";
  requestAnimationFrame(() => {
    mensaje.style.opacity = 1;
    mensaje.style.transform = "translateY(0)";
  });

  // pequeños corazones como celebración
  createFloatingHearts(10, 600);
}

/* Estrellas ligeras: menos frecuencia en móvil para rendimiento */
(function setupEstrellas() {
  const isMobile = window.innerWidth <= 520;
  const baseInterval = isMobile ? 900 : 400; // ms
  const maxStars = isMobile ? 5 : 10;

  let activeStars = 0;

  setInterval(() => {
    if (activeStars >= maxStars) return;
    activeStars++;
    const e = document.createElement("div");
    e.className = "estrella";
    e.innerHTML = Math.random() > 0.75 ? "✨" : "⭐";

    const left = Math.random() * (document.documentElement.clientWidth - 30);
    e.style.left = left + "px";

    const dur = (Math.random() * 3 + 3).toFixed(2);
    e.style.setProperty('--d', dur + "s");

    const size = Math.floor(Math.random() * 8) + (isMobile ? 14 : 16);
    e.style.fontSize = size + "px";

    document.body.appendChild(e);

    setTimeout(() => {
      e.remove();
      activeStars = Math.max(0, activeStars - 1);
    }, (parseFloat(dur) * 1000) + 600);

  }, baseInterval);
})();

// Crear corazones flotantes (usado al mostrar mensaje)
function createFloatingHearts(count = 8, duration = 1000) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.className = 'floating-heart';
      h.style.position = 'fixed';
      h.style.zIndex = 9999;
      h.style.left = (30 + Math.random() * 60) + '%';
      h.style.bottom = '20px';
      h.style.pointerEvents = 'none';
      h.style.fontSize = (12 + Math.random() * 12) + 'px';
      h.style.opacity = '1';
      h.innerText = Math.random() > 0.6 ? '💞' : '💕';
      document.body.appendChild(h);

      h.animate([
        { transform: `translateY(0) scale(0.9)`, opacity: 1 },
        { transform: `translateY(-120px) scale(1.2)`, opacity: 0 }
      ], {
        duration: duration + Math.random() * 700,
        easing: 'cubic-bezier(.2,.9,.2,1)'
      });

      setTimeout(() => h.remove(), duration + 800);
    }, i * 80);
  }
}