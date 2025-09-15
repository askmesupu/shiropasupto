/* script.js - helper functions for subpages */

/* TYPEWRITER: types 'text' into element with id elId */
function typeWriter(elId, text, speed = 35) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = "";
  el.style.borderRight = ".12em solid rgba(255,255,255,0.6)";
  let i = 0;
  function step() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else {
      el.style.borderRight = "none";
    }
  }
  step();
}

/* FLOATING "Shiropa" words - create many that move upwards */
function createFloatingShiropa(count = 80) {
  const container = document.getElementById("heart-container");
  if (!container) return;
  // spawn a batch
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.textContent = "Shiropa";
    span.className = "floating-word";
    const left = Math.random() * 100; // percent
    const size = 12 + Math.random() * 36;
    span.style.left = left + "%";
    span.style.fontSize = size + "px";
    span.style.top = (100 + Math.random() * 30) + "vh"; // start below viewport
    span.style.opacity = 0.8;
    // duration
    span.style.animationDuration = (8 + Math.random() * 12) + "s";
    // add random color tint subtle
    span.style.color = `rgba(255,255,255,${0.6 + Math.random() * 0.4})`;
    // put into DOM
    container.appendChild(span);
    // remove after animation to keep DOM small
    setTimeout(() => { span.remove(); }, 30000);
  }
  // keep spawning some
  setTimeout(() => createFloatingShiropa(30), 2000);
}

/* QUESTION PAGE SETUP
   yesImg, noImg = image urls to show on result.
   This makes No button evasive (on mouseenter / touchstart).
*/
function setupQuestionPage(yesImg, noImg) {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const result = document.getElementById("resultArea");
  if (!yesBtn || !noBtn || !result) return;

  // Yes -> show popup with happy image
  yesBtn.addEventListener("click", () => {
    result.innerHTML = `
      <div class="popup" role="status">
        <strong style="display:block; color:#006400;">I love you baby ❤️</strong>
        <img src="${yesImg}" alt="happy" style="width:220px; margin-top:10px; border-radius:10px;">
      </div>`;
  });

  // Helper to randomize position but keep visible
  function moveNoButtonRandomly() {
    const margin = 40;
    const w = window.innerWidth - margin;
    const h = window.innerHeight - margin;
    const left = Math.random() * Math.max(0, w - noBtn.offsetWidth);
    const top = Math.random() * Math.max(0, h - noBtn.offsetHeight);
    noBtn.style.position = "fixed";
    noBtn.style.left = (left + margin/2) + "px";
    noBtn.style.top = (top + 60) + "px";
  }

  // Evade on pointer events for desktop & mobile
  noBtn.addEventListener("mouseenter", moveNoButtonRandomly);
  noBtn.addEventListener("mousemove", (e) => {
    // small chance to move on mousemove too (prevents cursor trap)
    if (Math.random() > 0.85) moveNoButtonRandomly();
  });
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButtonRandomly();
  });

  // If user somehow clicks No, show sad image
  noBtn.addEventListener("click", () => {
    result.innerHTML = `
      <div class="popup" role="status">
        <strong style="display:block; color:#660000;">Oh... dudu is sad 😢</strong>
        <img src="${noImg}" alt="sad" style="width:190px; margin-top:10px; border-radius:10px;">
      </div>`;
  });
  }
