// Navigation
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  var sec = document.getElementById('section-' + id);
  if (sec) sec.classList.add('active');
  var tab = document.getElementById('tab-' + id);
  if (tab) tab.classList.add('active');
  if (id === 'industries') { var it = document.getElementById('tab-industries'); if(it) it.classList.add('active'); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Product tabs
var capIds = ['intelligence','decisions','security'];
document.querySelectorAll('.cap-tab').forEach(function(btn, i) {
  btn.onclick = function() {
    document.querySelectorAll('.cap-content').forEach(function(c){ c.classList.remove('active'); });
    document.querySelectorAll('.cap-tab').forEach(function(t){ t.classList.remove('active'); });
    var el = document.getElementById('cap-' + capIds[i]); if (el) el.classList.add('active');
    btn.classList.add('active');
  };
});

// Industry tabs
function showIndustry(id) {
  document.querySelectorAll('.ind-content').forEach(function(c){ c.classList.remove('active'); });
  document.querySelectorAll('.ind-tab').forEach(function(t){ t.classList.remove('active'); });
  var el = document.getElementById('ind-' + id); if (el) el.classList.add('active');
  var tab = document.getElementById('ind-tab-' + id); if (tab) tab.classList.add('active');
}

// FAQ
function toggleFaq(el) {
  var body = el.querySelector('.faq-body');
  var icon = el.querySelector('.faq-icon');
  var isOpen = body.style.display === 'block';
  body.style.display = isOpen ? 'none' : 'block';
  icon.textContent = isOpen ? '+' : '−';
  el.style.borderColor = isOpen ? 'var(--border)' : 'rgba(37,99,235,.35)';
}

// Resource filter
document.querySelectorAll('.res-filter-btn').forEach(function(btn) {
  btn.onclick = function() {
    document.querySelectorAll('.res-filter-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
  };
});

// Hero Video Sequence — crossfade through 4 videos
(function() {
  var srcs = ['video1.mp4','video2.mp4','video3.mp4','video4.mp4'];
  var vA = document.getElementById('hv-a');
  var vB = document.getElementById('hv-b');
  if (!vA || !vB) return;

  var cur   = 0;
  var front = vA;
  var back  = vB;

  function preload(idx) {
    back.src = srcs[idx % srcs.length];
    back.load();
  }

  function crossfade() {
    cur = (cur + 1) % srcs.length;
    back.style.opacity  = '1';
    front.style.opacity = '0';
    back.play().catch(function(){});
    var pf = front, pb = back;
    setTimeout(function() {
      pf.pause();
      front = pb; back = pf;
      preload((cur + 1) % srcs.length);
      watchEnd(front);
    }, 1600);
  }

  function watchEnd(player) {
    function onUpdate() {
      if (player.duration > 0 && player.currentTime >= player.duration - 1.6) {
        player.removeEventListener('timeupdate', onUpdate);
        player.removeEventListener('ended', onEnded);
        crossfade();
      }
    }
    function onEnded() {
      player.removeEventListener('timeupdate', onUpdate);
      player.removeEventListener('ended', onEnded);
      crossfade();
    }
    player.addEventListener('timeupdate', onUpdate);
    player.addEventListener('ended', onEnded);
  }

  preload(1);
  vA.play().catch(function(){});
  watchEnd(vA);
})();
