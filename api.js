const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const stickman = document.getElementById('stickman');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// Original stickman image width (from images folder)
const ORIGINAL_WIDTH = 1123;

// ---------------- SNAP POSITIONS ----------------
const snapPositions = {
  eyes:      { top: 75, left: 60, width: 50, rotate: 0, z: 6, shadow: '0 2px 4px rgba(0,0,0,0.3)' },
  glasses:   { top: 70, left: 55, width: 70, rotate: -2, z: 7, shadow: '0 2px 6px rgba(0,0,0,0.3)' },
  hats:      { top: 10, left: 45, width: 120, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },
  shirts:    { top: 150, left: 55, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  pants:     { top: 270, left: 55, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  shoe_L:    { top: 370, left: 55, width: 45, rotate: -5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_R:    { top: 370, left: 140, width: 45, rotate: 5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  faces:     { top: 65, left: 55, width: 75, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' }
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
  let src = e.dataTransfer.getData('text/plain');
  let category = e.dataTransfer.getData('category');

  // Identify left/right shoes
  if (category === 'shoes') {
    if (src.includes('_L')) category = 'shoe_L';
    if (src.includes('_R')) category = 'shoe_R';
  }

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
  img.draggable = false;

  // Choose position based on category
  let snap;
  if (src.includes('catface.jpg') || src.includes('roundface.jpg')) snap = snapPositions.faces;
  else if (src.includes('redhat.jpg')) snap = snapPositions.hats;
  else if (src.includes('mansuite.jpg')) snap = snapPositions.shirts;
  else snap = snapPositions[category];

  positionItem(img, snap);
  stickmanWrapper.appendChild(img);
}

// ---------------- POSITION ITEM ----------------
function positionItem(img, snap) {
  const scaleFactor = stickman.clientWidth / ORIGINAL_WIDTH;

  img.style.width     = `${snap.width * scaleFactor}px`;
  img.style.top       = `${snap.top * scaleFactor}px`;
  img.style.left      = `${snap.left * scaleFactor}px`;
  img.style.transform = `rotate(${snap.rotate}deg)`;
  img.style.zIndex    = snap.z;
  img.style.boxShadow = snap.shadow;
}

// ---------------- RANDOM OUTFIT ----------------
randomBtn.addEventListener('click', () => {
  clearCanvas();

  const categories = {
    eyes: ['images/eyes_01.png','images/eyes_03.png'],
    glasses: ['images/glasses_01.png','images/glasses_03.png'],
    hats: ['images/hat_02.png','images/redhat.jpg'],
    shirts: ['images/shirt_01.png','images/shirt_02.png','images/shirt_03.png','images/shirt_04.png','images/shirt_05.png','images/mansuite.jpg'],
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

// ---------------- CLEAR CANVAS ----------------
clearBtn.addEventListener('click', clearCanvas);

function clearCanvas() {
  const images = stickmanWrapper.querySelectorAll('img');
  images.forEach(img => {
    if (img.id !== 'stickman') img.remove();
  });
}

// ---------------- RESIZE HANDLER ----------------
window.addEventListener('resize', () => {
  const items = stickmanWrapper.querySelectorAll('img[data-category]');
  items.forEach(img => {
    const snap = snapPositions[img.dataset.category];
    if (snap) positionItem(img, snap);
  });
});

