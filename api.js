const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');

// ---------------- ZONES ----------------
const zones = {
  hats: document.getElementById('hat-zone'),
  eyes: document.getElementById('head-zone'),
  glasses: document.getElementById('nose-zone'),
  faces: document.getElementById('nose-zone'),
  shirts: document.getElementById('torso-zone'),
  mansuite: document.getElementById('torso-zone'),
  pants: document.getElementById('legs-zone'),
  shoe_L: document.getElementById('left-foot'),
  shoe_R: document.getElementById('right-foot')
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
  const existing = stickmanWrapper.querySelector(`img[data-category='${category}']`);
  if (existing) existing.remove();

  const img = document.createElement('img');
  img.src = src;
  img.dataset.category = category;
  img.style.position = 'absolute';
  img.style.pointerEvents = 'none';

  const zone = zones[category];
  if (zone) {
    const rect = zone.getBoundingClientRect();
    const wrapperRect = stickmanWrapper.getBoundingClientRect();

    img.style.top = `${rect.top - wrapperRect.top}px`;
    img.style.left = `${rect.left - wrapperRect.left}px`;
    img.style.width = `${rect.width}px`;
    img.style.height = `${rect.height}px`;
  }

  // Optional: add z-index by category
  const zIndexMap = {
    hats: 10,
    glasses: 7,
    eyes: 6,
    faces: 6,
    shirts: 5,
    mansuite: 5,
    pants: 4,
    shoe_L: 3,
    shoe_R: 3
  };
  img.style.zIndex = zIndexMap[category] || 1;

  stickmanWrapper.appendChild(img);
}

// ---------------- RANDOM OUTFIT ----------------
const randomBtn = document.getElementById('randomBtn');
if (randomBtn) {
  randomBtn.addEventListener('click', () => {
    clearCanvas();
    const categories = {
      eyes: ['images/eyes_01.png','images/eyes_03.png'],
      glasses: ['images/glasses_01.png','images/glasses_03.png'],
      hats: ['images/redhat.jpg','images/hat_02.png'],
      shirts: ['images/shirt_01.png','images/shirt_02.png','images/shirt_03.png','images/shirt_04.png','images/shirt_05.png','images/mansuite.jpg'],
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
const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
  clearBtn.addEventListener('click', clearCanvas);
}

function clearCanvas() {
  const images = stickmanWrapper.querySelectorAll('img[data-category]');
  images.forEach(img => img.remove());
}


