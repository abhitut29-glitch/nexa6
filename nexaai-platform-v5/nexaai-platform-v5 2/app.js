// - Navigation -
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const sec = document.getElementById('section-' + id);
  if (sec) sec.classList.add('active');
  const tab = document.getElementById('tab-' + id);
  if (tab) tab.classList.add('active');
  if (id === 'industries') { const t = document.getElementById('tab-industries'); if(t) t.classList.add('active'); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// - Product tabs -
const capIds = ['intelligence','decisions','security'];
document.querySelectorAll('.cap-tab').forEach((btn, i) => {
  btn.onclick = function() {
    document.querySelectorAll('.cap-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.cap-tab').forEach(t => t.classList.remove('active'));
    const el = document.getElementById('cap-' + capIds[i]);
    if (el) el.classList.add('active');
    this.classList.add('active');
  };
});

// - Industry tabs -
function showIndustry(id) {
  document.querySelectorAll('.ind-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.ind-tab').forEach(t => t.classList.remove('active'));
  const el = document.getElementById('ind-' + id);
  if (el) el.classList.add('active');
  const tab = document.getElementById('ind-tab-' + id);
  if (tab) tab.classList.add('active');
}

// - FAQ -
function toggleFaq(el) {
  var body = el.querySelector('.faq-body');
  var icon = el.querySelector('.faq-icon');
  var isOpen = body.style.display === 'block';
  body.style.display = isOpen ? 'none' : 'block';
  icon.textContent = isOpen ? '+' : '-';
  el.style.borderColor = isOpen ? 'var(--border)' : 'rgba(37,99,235,.35)';
}
document.querySelectorAll('.faq-item').forEach(function(item) {
  item.addEventListener('click', function() { toggleFaq(item); });
});

// - Resource filter buttons -
document.querySelectorAll('.res-filter-btn').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.res-filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  };
});

// - Hero Canvas Animation -
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], animId;
  const COUNT = 70, CONNECT_DIST = 130, NODE_R = 2.2;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function initNodes() {
    nodes = [];
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: NODE_R + Math.random() * 1.2,
        pulse: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.02
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.35;
          ctx.strokeStyle = `rgba(96,165,250,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    // nodes
    nodes.forEach(n => {
      n.pulse += n.speed;
      const glow = 0.55 + 0.45 * Math.sin(n.pulse);
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
      grad.addColorStop(0, `rgba(96,165,250,${glow})`);
      grad.addColorStop(1, 'rgba(96,165,250,0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(147,197,253,${glow * 0.9})`;
      ctx.fill();
      n.x += n.vx; n.y += n.vy;
      if (n.x < -10) n.x = W + 10;
      if (n.x > W + 10) n.x = -10;
      if (n.y < -10) n.y = H + 10;
      if (n.y > H + 10) n.y = -10;
    });
    animId = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(() => { resize(); if (nodes.length === 0) initNodes(); });
  ro.observe(canvas.parentElement);
  resize(); initNodes(); draw();
})();