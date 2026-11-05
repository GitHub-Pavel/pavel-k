const config = {
  fps: 60,
  works: {
      offset: {
          top: 0,
          bottom: window.innerHeight / 2.5
      },
      slide: {
          distance: 0.05,  // how far the image starts from its final spot, share of viewport width
          start: 1,        // image top at this share of viewport height = animation starts (1 = bottom edge)
          end: 0.45,       // image top at this share of viewport height = fully in place
          ease: 0.5        // smoothing per frame at 60fps, lower = floatier (1 = no smoothing)
      }
  },
  header: {
    filledOffset: 50
  },
  about: {
    photo: {
      trigger: 0.8,       // starts when the photo's top reaches this share of viewport height
      count: 4500,        // approx. number of particles
      spread: 900,        // ms, how long particles keep launching (stagger)
      duration: 1000,     // ms, flight time of a single particle
      scatter: 1.1,       // start distance, in photo sizes
      swirl: 0.35,        // curve of the flight path (0 = straight lines)
      size: 0.62,         // particle size relative to grid step
      fadeToPhoto: 300,   // ms, crossfade from particles to the real photo
      fadeLead: 800,      // ms, how much EARLIER the photo starts appearing
      grayscale: 0.9      // keep equal to the grayscale() of .about__photo img in CSS
    }
  },
  hero: {
    photo: {
      follow: 0.3,    // how far it trails the scroll (0 = scrolls normally, 1 = stays fixed on screen)
      fadeStart: 0.4, // share of hero height scrolled before it starts fading (it just follows until then)
      fadeEnd: 0.8,   // share of hero height at which it is fully gone
      ease: 0.5      // smoothing per frame at 60fps, lower = floatier (1 = no smoothing)
    },
    intro: {
      enabled: true,
      count: 7000,        // approx. number of particles
      delay: 0,         // ms before it starts
      spread: 1000,       // ms, how long particles keep launching (stagger)
      duration: 1000,     // ms, flight time of a single particle
      scatter: 1.1,       // start distance, in photo sizes
      swirl: 0.35,        // curve of the flight path (0 = straight lines)
      size: 0.62,         // particle size relative to grid step
      fadeToPhoto: 300,   // ms, crossfade from particles to the real photo
      fadeLead: 1000,      // ms, how much EARLIER the photo starts appearing (before particles finish)
      zIndex: -1           // raise if the particles hide behind something
    },
    background: {
      // number of dot columns / rows across the hero
      size: {
        width: window.innerWidth / 14,
        height: window.innerHeight / 20,
      },
      minCell: 20,              // px, fewer dots on small screens
      dot: {
        radius: 1.2,            // px
        alpha: 0.09,
        color: '#000000',
        breathe: 2.8            // radius change while "breathing", px
      },
      breatheSpeed: 0.005,     // lower = slower
      textFade: {               // quiet zone behind the name
        x: 0.3,                 // centre, share of hero width
        y: 0.45,                // centre, share of hero height
        radius: 0.0001,            // share of hero width
        strength: 0.001          // 0..1, how much dots fade there
      },
      cursor: {
        radius: 200,            // px
        push: 36,               // px, how far dots are pushed away
        ring: 1.6,              // extra dot radius on the ring
        ease: 1              // 0..1, cursor smoothing
      }
    }
  }
}


const easeInOutPercentage = (percentage, maxPercentage = 100) => {
    const t = Math.min(Math.max(percentage / maxPercentage, 0), 1);

    const easedValue = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    return easedValue * maxPercentage;
};


const moveWorkBackgroundImage = (img) => {
    const parent = img.parentNode;
    if (!parent) return;

    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    const rect = parent.getBoundingClientRect();
    const parentTopDoc = rect.top + scrollTop;
    const parentHeight = parent.offsetHeight;
    const imgHeight = img.offsetHeight;

    const maxPercentage = imgHeight > parentHeight
        ? ((imgHeight - parentHeight) / imgHeight) * 100
        : 0;

    const startAnimationAt = parentTopDoc - windowHeight + config.works.offset.bottom;
    const endAnimationAt = parentTopDoc + parentHeight - config.works.offset.top;


    if (scrollTop < startAnimationAt) {
        img.style.transform = `translate3d(0, 0%, 0)`;
        return;
    }

    if (scrollTop > endAnimationAt) {
        img.style.transform = `translate3d(0, -${maxPercentage}%, 0)`;
        return;
    }

    const totalDistance = endAnimationAt - startAnimationAt;
    const currentDistance = scrollTop - startAnimationAt;

    const scrollProgress = Math.min(Math.max(currentDistance / totalDistance, 0), 1);

    const currentPercentage = scrollProgress * maxPercentage;

    img.style.transform = `translate3d(0, -${easeInOutPercentage(currentPercentage, maxPercentage)}%, 0)`;
}


const slideState = new WeakMap();

const slideWorkImage = (box) => {
    const { distance, start, end, ease } = config.works.slide;
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const top = box.getBoundingClientRect().top;
    const now = performance.now();

    // target: 0 = still below the screen, 1 = in place
    let target = (start * vh - top) / ((start - end) * vh);
    target = Math.min(Math.max(target, 0), 1);

    // hold the slide until the screenshot has really loaded, so the heavy
    // paint doesn't happen in the middle of the animation
    const img = box.querySelector('img');
    if (img && !(img.complete && img.naturalWidth > 0)) target = 0;

    if (heroBg.reducedMotion.matches) target = 1;

    // smoothing (frame-rate independent); first frame snaps so a reload mid-page doesn't replay
    let st = slideState.get(box);
    if (!st) {
        st = { t: target, last: now };
        slideState.set(box, st);
        // keep ONE stable compositor layer; toggling will-change per frame
        // re-creates the huge screenshot layer and causes a freeze
        box.style.willChange = 'transform, opacity';
        box.style.backfaceVisibility = 'hidden';
    }
    const dt = Math.min(now - st.last, 100);
    st.last = now;
    const k = 1 - Math.pow(1 - Math.min(Math.max(ease, 0), 1), dt / 16.67);
    st.t += (target - st.t) * k;
    if (Math.abs(target - st.t) < 0.0005) st.t = target;

    const t = st.t;
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    const fromLeft = box.closest('.work-project--reverse') !== null;
    const dir = fromLeft ? -1 : 1;
    const x = dir * (1 - eased) * distance * vw;

    box.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
    box.style.opacity = eased.toFixed(3);
};

const animateWorks = (imgs = []) => {
    let innerImgs = imgs;
    if (innerImgs.length === 0) {
        innerImgs = document.querySelectorAll('.work-project__image');
    }

    if (innerImgs.length === 0) {
        return;
    }

    innerImgs.forEach(moveWorkBackgroundImage);
    document.querySelectorAll('.work-project__image-background').forEach(slideWorkImage);
}


const heroBg = {
  canvas: null,
  ctx: null,
  ready: false,
  dirty: true,
  w: 0,
  h: 0,
  cols: 0,
  rows: 0,
  cellW: 0,
  cellH: 0,
  pointer: { clientX: 0, clientY: 0, active: false },
  exclude: null,
  mouse: { x: -9999, y: -9999 },
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
};

const initHeroBg = (canvas) => {
  heroBg.canvas = canvas;
  heroBg.ctx = canvas.getContext('2d');
  heroBg.ready = true;

  // mouse only: touch devices get the breathing grid without the cursor effect
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    heroBg.pointer.clientX = e.clientX;
    heroBg.pointer.clientY = e.clientY;
    heroBg.pointer.active = true;
  });

  document.documentElement.addEventListener('mouseleave', () => {
    heroBg.pointer.active = false;
  });

  heroBg.reducedMotion.addEventListener('change', () => {
    heroBg.dirty = true;
  });
};

const resizeHeroBg = () => {
  const { canvas, ctx } = heroBg;
  const { size, minCell } = config.hero.background;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  if (canvas.width === Math.round(w * dpr) && canvas.height === Math.round(h * dpr)) {
    return;
  }

  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  heroBg.w = w;
  heroBg.h = h;
  heroBg.cols = Math.max(1, Math.min(size.width, Math.floor(w / minCell)));
  heroBg.rows = Math.max(1, Math.min(size.height, Math.floor(h / minCell)));
  heroBg.cellW = w / heroBg.cols;
  heroBg.cellH = h / heroBg.rows;
  heroBg.dirty = true;
};

const drawHeroBg = (time) => {
  const { ctx, w, h, cols, rows, cellW, cellH, mouse, exclude } = heroBg;
  const { dot, textFade, cursor, breatheSpeed } = config.hero.background;

  const t = heroBg.reducedMotion.matches ? 0 : time * breatheSpeed;

  const fadeX = w * textFade.x;
  const fadeY = h * textFade.y;
  const fadeR = w * textFade.radius;

  // Ripple sources
  const ripples = [
    { x: 0.25, y: 0.35, frequency: 0.16, speed: 0.8, amplitude: 0.5 },
    { x: 0.75, y: 0.65, frequency: 0.14, speed: 0.65, amplitude: 0.35 },
    { x: 0.5, y: 0.5, frequency: 0.12, speed: 0.5, amplitude: 0.15 },
  ];

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = dot.color;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = (i + 0.5) * cellW;
      let y = (j + 0.5) * cellH;

      // Concentric ripple field
      let wave = 0;

      for (const ripple of ripples) {
        const rx = x - w * ripple.x;
        const ry = y - h * ripple.y;
        const distance = Math.hypot(rx, ry);

        wave +=
          Math.sin(distance * ripple.frequency - t * ripple.speed) *
          ripple.amplitude;
      }

      // Normalize combined waves
      wave /= 0.5 + 0.35 + 0.15;

      let r = dot.radius + wave * dot.breathe;
      let a = dot.alpha + wave * 0.05;

      // Quiet zone behind the name
      const fd = Math.hypot(x - fadeX, y - fadeY) / fadeR;

      if (fd < 1) {
        a *= 1 - textFade.strength * (1 - fd);
      }

      // Cursor interaction
      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const d = Math.hypot(dx, dy);

      if (d < cursor.radius) {
        const k = 1 - d / cursor.radius;
        const push = k * k * cursor.push;
        const ring = Math.sin(k * Math.PI);

        if (d > 0.001) {
          x += (dx / d) * push;
          y += (dy / d) * push;
        }

        r += ring * cursor.ring;
        a += ring * 0.12;
        a *= 1 - k * k * 0.7;
      }

      // Portrait exclusion
      if (
        exclude &&
        x > exclude.left &&
        x < exclude.right &&
        y > exclude.top &&
        y < exclude.bottom
      ) {
        continue;
      }

      ctx.globalAlpha = Math.max(a, 0);
      ctx.beginPath();
      ctx.arc(x, y, Math.max(r, 0.3), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
};


const animHeroBg = (time = performance.now()) => {
  const c = document.querySelector('.hero-bg');

  if (!c) {
    return;
  }

  if (!heroBg.ready) {
    initHeroBg(c);
  }

  resizeHeroBg();

  // skip work while the hero is scrolled out of view
  const rect = c.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    return;
  }

  // area taken by the portrait, relative to the hero canvas
  const photo = document.querySelector('.main-photo');
  if (photo) {
    const pr = photo.getBoundingClientRect();
    const gap = config.hero.background.portraitGap;
    const next = {
      left: pr.left - rect.left - gap,
      right: pr.right - rect.left + gap,
      top: pr.top - rect.top - gap,
      bottom: pr.bottom - rect.top + gap
    };
    const prev = heroBg.exclude;
    if (!prev || prev.left !== next.left || prev.top !== next.top || prev.right !== next.right || prev.bottom !== next.bottom) {
      heroBg.dirty = true; // matters for reduced motion, which redraws only when needed
    }
    heroBg.exclude = next;
  } else {
    heroBg.exclude = null;
  }

  const reduced = heroBg.reducedMotion.matches;


  // smooth the cursor (snap on first move, hide when the pointer leaves)
  const { pointer, mouse } = heroBg;
  if (reduced || !pointer.active) {
    mouse.x = mouse.y = -9999;
  } else {
    const tx = pointer.clientX - rect.left;
    const ty = pointer.clientY - rect.top;
    if (mouse.x < -9000) {
      mouse.x = tx;
      mouse.y = ty;
    } else {
      mouse.x += (tx - mouse.x) * config.hero.background.cursor.ease;
      mouse.y += (ty - mouse.y) * config.hero.background.cursor.ease;
    }
  }

  // with reduced motion, draw one still frame and redraw only on resize
  if (reduced && !heroBg.dirty) {
    return;
  }

  drawHeroBg(time);
  heroBg.dirty = false;
};

// ---------- Portrait intro: particles assemble into the photo ----------
const heroIntro = {
  state: 'idle',        // idle -> loading -> running -> done
  photoAlpha: 0,        // multiplier applied to the real photo's opacity
  canvas: null,
  ctx: null,
  particles: [],
  start: 0
};

const clamp01 = (v) => Math.min(Math.max(v, 0), 1);

const finishHeroIntro = () => {
  heroIntro.state = 'done';
  heroIntro.photoAlpha = 1;
  heroIntro.particles = [];
  if (heroIntro.canvas) {
    heroIntro.canvas.remove();
    heroIntro.canvas = null;
  }
};

const sampleHeroPhoto = (img) => {
  const cfg = config.hero.intro;
  const rect = img.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;

  // grid step so that the particle count is roughly cfg.count
  const step = Math.max(3, Math.sqrt((rect.width * rect.height) / cfg.count));
  const cols = Math.max(1, Math.round(rect.width / step));
  const rows = Math.max(1, Math.round(rect.height / step));

  const off = document.createElement('canvas');
  off.width = cols;
  off.height = rows;
  const octx = off.getContext('2d', { willReadFrequently: true });
  octx.drawImage(img, 0, 0, cols, rows);

  let data;
  try {
    data = octx.getImageData(0, 0, cols, rows).data;
  } catch (e) {
    return null; // tainted canvas (e.g. opened via file://)
  }

  const particles = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const k = (j * cols + i) * 4;
      const alpha = data[k + 3];
      if (alpha < 90) continue;

      const u = (i + 0.5) / cols;
      const v = (j + 0.5) / rows;

      // start position: random point on a ring around the photo
      const ang = Math.random() * Math.PI * 2;
      const dist = (0.35 + Math.random() * 0.65) * cfg.scatter;
      const sx = u + Math.cos(ang) * dist;
      const sy = v + Math.sin(ang) * dist;

      particles.push({
        u, v, sx, sy,
        // launch order: top-left -> bottom-right with some randomness
        delay: clamp01((u * 0.45 + v * 0.55) * 0.7 + Math.random() * 0.3) * cfg.spread,
        dur: cfg.duration * (0.75 + Math.random() * 0.5),
        bend: (Math.random() - 0.5) * 2 * cfg.swirl,
        color: `rgb(${data[k]},${data[k + 1]},${data[k + 2]})`,
        alpha: alpha / 255
      });
    }
  }

  return { particles, step };
};

const animateHeroIntro = (time) => {
  const cfg = config.hero.intro;

  if (heroIntro.state === 'done') return;

  const img = document.querySelector('.main-photo');

  if (!img || !cfg.enabled || heroBg.reducedMotion.matches) {
    finishHeroIntro();
    return;
  }

  if (heroIntro.state === 'idle') {
    heroIntro.state = 'loading';
    const begin = () => {
      const sampled = sampleHeroPhoto(img);
      if (!sampled || sampled.particles.length === 0) {
        finishHeroIntro();
        return;
      }

      const c = document.createElement('canvas');
      c.className = 'hero-particles';
      Object.assign(c.style, {
        position: 'fixed',
        inset: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        transform: 'translateX(13px)',
        zIndex: String(cfg.zIndex)
      });
      document.body.querySelector('.hero__content').appendChild(c);

      heroIntro.canvas = c;
      heroIntro.ctx = c.getContext('2d');
      heroIntro.particles = sampled.particles;
      heroIntro.step = sampled.step;
      heroIntro.start = 0;
      heroIntro.state = 'running';
    };

    if (img.complete && img.naturalWidth) begin();
    else {
      img.addEventListener('load', begin, { once: true });
      img.addEventListener('error', finishHeroIntro, { once: true });
    }
    return;
  }

  if (heroIntro.state !== 'running') return;

  if (!heroIntro.start) heroIntro.start = time + cfg.delay;
  const elapsed = time - heroIntro.start;
  if (elapsed < 0) return;

  const { canvas, ctx, particles, step } = heroIntro;

  // keep the canvas matched to the viewport
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (canvas.width !== Math.round(vw * dpr) || canvas.height !== Math.round(vh * dpr)) {
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, vw, vh);

  // the real photo's current on-screen box (follows scroll / resize)
  const r = img.getBoundingClientRect();
  const size = Math.max(r.width, r.height);

  const assembled = cfg.spread + cfg.duration * 1.25;
  const fade = clamp01((elapsed - (assembled - cfg.fadeLead)) / cfg.fadeToPhoto);

  heroIntro.photoAlpha = fade;                 // real photo fades in at the end
  const pAlpha = 1 - fade;                     // particles fade out

  if (fade >= 1) {
    finishHeroIntro();
    return;
  }

  const radius = (step * cfg.size) / 2;

  for (let n = 0; n < particles.length; n++) {
    const p = particles[n];
    const l = clamp01((elapsed - p.delay) / p.dur);
    if (l <= 0) continue;

    const e = 1 - Math.pow(1 - l, 4);          // ease-out quart
    const inv = 1 - e;

    let u = p.sx + (p.u - p.sx) * e;
    let v = p.sy + (p.v - p.sy) * e;

    // curved flight: sideways offset that vanishes on arrival
    const dx = p.u - p.sx;
    const dy = p.v - p.sy;
    const bend = p.bend * inv * e * 2;
    u += -dy * bend;
    v += dx * bend;

    const x = r.left + u * r.width;
    const y = r.top + v * r.height;

    ctx.globalAlpha = Math.min(1, l * 4) * p.alpha * pAlpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(x, y, radius * (0.6 + 0.4 * e), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
};

const heroPhoto = { el: null, y: 0, o: 1, t: 0 };

const animateHeroPhoto = (time = performance.now()) => {
  if (!heroPhoto.el) heroPhoto.el = document.querySelector('.main-photo');
  const el = heroPhoto.el;
  if (!el) return;

  const hero = document.querySelector('.hero');
  const { follow, fadeStart, fadeEnd, ease } = config.hero.photo;
  const scroll = window.scrollY;
  const heroH = hero ? hero.offsetHeight : window.innerHeight;

  // past the hero: nothing to animate
  if (scroll > heroH && heroPhoto.o === 0) return;

  // stays fully visible (and follows the scroll) until fadeStart, then fades out
  const progress = Math.min(Math.max((scroll / heroH - fadeStart) / (fadeEnd - fadeStart), 0), 1);

  const targetY = scroll * follow;
  const targetO = 1 - easeInOutPercentage(progress * 100) / 100;

  // frame-rate independent smoothing: same feel on 60Hz and 144Hz screens
  const dt = heroPhoto.t ? Math.min(time - heroPhoto.t, 100) : 16.67;
  heroPhoto.t = time;
  const k = 1 - Math.pow(1 - Math.min(Math.max(ease, 0), 1), dt / 16.67);
  heroPhoto.y += (targetY - heroPhoto.y) * k;
  heroPhoto.o += (targetO - heroPhoto.o) * k;

  if (Math.abs(targetO - heroPhoto.o) < 0.001) heroPhoto.o = targetO;

  el.style.translate = `0 ${heroPhoto.y.toFixed(2)}px`;
  el.style.opacity = (heroPhoto.o * heroIntro.photoAlpha).toFixed(3);
  el.style.willChange = 'translate, opacity';
};


// ---------- About photo: particles assemble into the photo (same effect as the hero) ----------
const aboutIntro = {
  state: 'idle',   // idle -> waiting -> running -> done
  fig: null,
  img: null,
  canvas: null,
  ctx: null,
  particles: [],
  step: 4,
  start: 0
};

const finishAboutIntro = () => {
  aboutIntro.state = 'done';
  aboutIntro.particles = [];
  if (aboutIntro.img) aboutIntro.img.style.opacity = '1';
  if (aboutIntro.fig) aboutIntro.fig.style.background = '';
  if (aboutIntro.canvas) {
    aboutIntro.canvas.remove();
    aboutIntro.canvas = null;
  }
};

const sampleAboutPhoto = (img, fig) => {
  const cfg = config.about.photo;
  const rect = fig.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  if (!w || !h || !img.naturalWidth) return null;

  const step = Math.max(3, Math.sqrt((w * h) / cfg.count));
  const cols = Math.max(1, Math.round(w / step));
  const rows = Math.max(1, Math.round(h / step));

  // mimic object-fit: cover + object-position: 50% 40%
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  const scale = Math.max(w / nw, h / nh);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (nw - sw) * 0.5;
  const sy = (nh - sh) * 0.4;

  const off = document.createElement('canvas');
  off.width = cols;
  off.height = rows;
  const octx = off.getContext('2d', { willReadFrequently: true });
  octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);

  let data;
  try {
    data = octx.getImageData(0, 0, cols, rows).data;
  } catch (e) {
    return null;
  }

  const particles = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const k = (j * cols + i) * 4;
      const alpha = data[k + 3];
      if (alpha < 90) continue;

      const u = (i + 0.5) / cols;
      const v = (j + 0.5) / rows;

      const ang = Math.random() * Math.PI * 2;
      const dist = (0.35 + Math.random() * 0.65) * cfg.scatter;

      // same grayscale as the CSS filter on the real photo
      const lum = 0.299 * data[k] + 0.587 * data[k + 1] + 0.114 * data[k + 2];
      const g = cfg.grayscale;
      const cr = Math.round(data[k] + (lum - data[k]) * g);
      const cg = Math.round(data[k + 1] + (lum - data[k + 1]) * g);
      const cb = Math.round(data[k + 2] + (lum - data[k + 2]) * g);

      particles.push({
        u, v,
        sx: u + Math.cos(ang) * dist,
        sy: v + Math.sin(ang) * dist,
        delay: clamp01((u * 0.45 + v * 0.55) * 0.7 + Math.random() * 0.3) * cfg.spread,
        dur: cfg.duration * (0.75 + Math.random() * 0.5),
        bend: (Math.random() - 0.5) * 2 * cfg.swirl,
        color: `rgb(${cr},${cg},${cb})`,
        alpha: alpha / 255
      });
    }
  }

  return { particles, step };
};

const animateAboutIntro = (time) => {
  const cfg = config.about.photo;
  const a = aboutIntro;

  if (a.state === 'done') return;

  if (a.state === 'idle') {
    a.fig = document.querySelector('.about__photo');
    a.img = a.fig && a.fig.querySelector('img');

    if (!a.img || heroBg.reducedMotion.matches) {
      finishAboutIntro();
      return;
    }

    a.img.style.opacity = '0';
    a.fig.style.background = 'transparent';
    a.img.loading = 'eager';
    a.state = 'waiting';
  }

  if (a.state === 'waiting') {
    const r = a.fig.getBoundingClientRect();
    if (r.top > window.innerHeight * cfg.trigger) return;
    if (!(a.img.complete && a.img.naturalWidth > 0)) return;

    const sampled = sampleAboutPhoto(a.img, a.fig);
    if (!sampled || sampled.particles.length === 0) {
      finishAboutIntro();
      return;
    }

    const c = document.createElement('canvas');
    Object.assign(c.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '5'
    });
    document.body.appendChild(c);

    a.canvas = c;
    a.ctx = c.getContext('2d');
    a.particles = sampled.particles;
    a.step = sampled.step;
    a.start = time;
    a.state = 'running';
  }

  if (a.state !== 'running') return;

  const elapsed = time - a.start;
  const { canvas, ctx, particles, step } = a;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (canvas.width !== Math.round(vw * dpr) || canvas.height !== Math.round(vh * dpr)) {
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, vw, vh);

  const r = a.fig.getBoundingClientRect(); // follows the scroll while particles fly

  const assembled = cfg.spread + cfg.duration * 1.25;
  const fade = clamp01((elapsed - (assembled - cfg.fadeLead)) / cfg.fadeToPhoto);

  a.img.style.opacity = fade.toFixed(3);
  const pAlpha = 1 - fade;

  if (fade >= 1) {
    finishAboutIntro();
    return;
  }

  const radius = (step * cfg.size) / 2;

  for (let n = 0; n < particles.length; n++) {
    const p = particles[n];
    const l = clamp01((elapsed - p.delay) / p.dur);
    if (l <= 0) continue;

    const e = 1 - Math.pow(1 - l, 4);
    const inv = 1 - e;

    let u = p.sx + (p.u - p.sx) * e;
    let v = p.sy + (p.v - p.sy) * e;

    const dx = p.u - p.sx;
    const dy = p.v - p.sy;
    const bend = p.bend * inv * e * 2;
    u += -dy * bend;
    v += dx * bend;

    ctx.globalAlpha = Math.min(1, l * 4) * p.alpha * pAlpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(r.left + u * r.width, r.top + v * r.height, radius * (0.6 + 0.4 * e), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
};

const startAnims = (time) => {
  animateWorks();
  animateHeroIntro(time);
  if (heroIntro.state === 'done') decodeWorkImages();
  animateHeroPhoto(time);
  animateAboutIntro(time);
  animHeroBg(time);
}

// Decode the big work screenshots one by one in idle time, so the browser
// doesn't freeze the page when they first scroll into view.
let workDecodeStarted = false;
const decodeWorkImages = () => {
  if (workDecodeStarted) return;
  workDecodeStarted = true;

  const idle = (cb) => (window.requestIdleCallback
    ? window.requestIdleCallback(cb, { timeout: 1500 })
    : setTimeout(cb, 200));

  let chain = Promise.resolve();
  document.querySelectorAll('.work-project__image').forEach((img) => {
    img.decoding = 'async';
    chain = chain
      .then(() => new Promise((resolve) => idle(resolve)))
      .then(() => img.decode())
      .catch(() => {});
  });
};

let booted = false;
const boot = () => {
  if (booted) return;
  booted = true;

  let lastTime = 0;
  const fps = config.fps;
  const fpsInterval = 1000 / fps;

  function animate(currentTime) {
    requestAnimationFrame(animate);

    const elapsed = currentTime - lastTime;

    if (elapsed >= fpsInterval) {
      lastTime = currentTime - (elapsed % fpsInterval);
      startAnims(currentTime);
    }
  }

  requestAnimationFrame((timestamp) => {
    lastTime = timestamp;
    requestAnimationFrame(animate);
  });

  document.querySelector('.hero-bg').classList.add('hero-bg--ready');
  document.body.classList.add('loaded');
};

// Start as soon as the hero photo is ready, not when EVERY image on the page
// (including the huge work screenshots) has finished downloading.
const heroPhotoEl = document.querySelector('.main-photo');
if (!heroPhotoEl || heroPhotoEl.complete) {
  boot();
} else {
  heroPhotoEl.addEventListener('load', boot, { once: true });
  heroPhotoEl.addEventListener('error', boot, { once: true });
  setTimeout(boot, 3000);
}
window.addEventListener('load', boot);

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('article-more')) {
        const slug = event.target.dataset.slug;
        document.querySelector(`.article[data-slug=${slug}] .article__hidden`).classList.remove('article__hidden');
        event.target.classList.add('article-more--opened');
    }
});

window.addEventListener("scroll", () => {
  const method = window.scrollY >= config.header.filledOffset ? 'add' : 'remove';
  document.querySelector('.site-header')?.classList[method]('site-header--filled');
});

(function () {
  var btn = document.querySelector('.site-header__toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  function setOpen(open) {
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function () {
    setOpen(!document.body.classList.contains('menu-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();
