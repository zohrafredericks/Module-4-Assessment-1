const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// ---------------- ZONES ----------------
const zones = {
  redhat: document.getElementById('hat-zone'),
  hat_02: document.getElementById('hat-zone'),
  eyes: document.getElementById('head-zone'),
  glasses: document.getElementById('head-zone'),
  faces: document.getElementById('nose-zone'),
  shirts: document.getElementById('torso-zone'),
  mansuite: document.getElementById('torso-zone'),
  pants: document.getElementById('legs-zone'),
  shoe_L: document.getElementById('left-foot'),
  shoe_R: document.getElementById('right-foot')
};

// Optional offsets for better alignment (in pixels)
const offsets = {
  redhat: { top: 6, left: 0 },
  hat_02: { top: 6, left: 0 },
  eyes: { top: 10, left: 0 },
  glasses: { top: 10, left: 0 },
  faces: { top: 0, left: 0 },
  shirts: { top: 5, left: 0 },
  mansuite: { top: 5, left: 0 },
  pants: { top: 8, left: 0 },
  shoe_L: { top: 0, left: 0 },
  shoe_R: { top: 0, left: 0 }
};

// ---------------- DRAG & DROP ----------------
draggables.forEach(img => {
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', img.src);
    e.dataTransfer.setData('category', img.dataset.category);
  });
});

stickmanWrapper.addEventListener('dragover', e => e.preventDefault());

stickmanWrapper.addEventListener('drop', e => {
  e.preventDefault();
  const src = e.dataTransfer.getData('text/plain');
  const category = e.dataTransfer.getData('category');

  addItem(src, category);
});

// ---------------- ADD ITEM ----------------
function addItem(src, category) {
  // Remove existing item in same category
  const existing = stickmanWrapper.querySelector(`img[data-category='${category}']`);
  if (existing) existing.remove();

  const img = document.createElement('img');
  img.src = src;
  img.dataset.category = category;
  img.style.position = 'absolute';
  img.draggable = false;

  // Snap to zone
  const zone = zones[category];
  if (zone) {
    const offset = offsets[category] || { top: 0, left: 0 };
    img.style.top = zone.offsetTop + offset.top + 'px';
    img.style.left = zone.offsetLeft + offset.left + 'px';
    img.style.width = zone.offsetWidth + 'px';
    img.style.height = zone.offsetHeight + 'px';
    img.style.zIndex = 5;
  }

  stickmanWrapper.appendChild(img);
}

// ---------------- RANDOM OUTFIT ----------------
if (randomBtn) {
  randomBtn.addEventListener('click', () => {
    clearCanvas();

    const categories = {
      eyes: ['images/eyes_01.png','images/eyes_03.png'],
      glasses: ['images/glasses_01.png','images/glasses_03.png'],
      redhat: ['images/redhat.jpg'],
      hat_02: ['images/hat_02.png'],
      shirts: ['images/shirt_01.png','images/shirt_02.png','images/shirt_03.png','images/shirt_04.png','images/shirt_05.png'],
      mansuite: ['images/mansuite.jpg'],
      pants: ['images/pants_01.png','images/pants_02.png','images/pants_03.png','images/pants_04.png','images/pants_05.png'],
      shoe_L: ['images/shoe_01_L.png','images/shoe_02_L.png'],
      shoe_R: ['images/shoe_01_R.png','images/shoe_02_R.png'],
      faces: ['images/catface.jpg','images/roundface.jpg']
    };

    for (const cat in categories) {
      const files = categories[cat];
      const file = files[Math.floor(Math.random() * files.length)];
      addItem(file, cat);
    }
  });
}

// ---------------- CLEAR CANVAS ----------------
if (clearBtn) {
  clearBtn.addEventListener('click', clearCanvas);
}

function clearCanvas() {
  const images = stickmanWrapper.querySelectorAll('img[data-category]');
  images.forEach(img => img.remove());
}


