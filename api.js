const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const stickman = document.getElementById('stickman');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// Snap positions relative to stickman width 280px
const snapPositions = {
  eyes:      { top: 75, left: 120, width: 50, rotate: 0, z: 5, shadow: '0 2px 4px rgba(0,0,0,0.3)' },
  glasses:   { top: 70, left: 115, width: 70, rotate: -2, z: 6, shadow: '0 2px 6px rgba(0,0,0,0.3)' },
  hats:      { top: 0, left: 105, width: 110, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },
  shirts:    { top: 130, left: 95, width: 110, rotate: 0, z: 4, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  pants:     { top: 220, left: 95, width: 110, rotate: 0, z: 3, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  shoe_L:    { top: 300, left: 100, width: 45, rotate: -5, z: 2, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_R:    { top: 300, left: 180, width: 45, rotate: 5, z: 2, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  faces:     { top: 65, left: 115, width: 75, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' }
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

  let snap;

  // Specific snaps for new images
  if (src.includes('catface.jpg')) snap = { top: 65, left: 115, width: 75, rotate: -2, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' };
  else if (src.includes('roundface.jpg')) snap = { top: 63, left: 113, width: 80, rotate: 1, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' };
  else if (src.includes('redhat.jpg')) snap = { top: 0, left: 105, width: 110, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' };
  else if (src.includes('mansuite.jpg')) snap = { top: 130, left: 95, width: 110, rotate: -1, z: 4, shadow: '0 2px 5px rgba(0,0,0,0.2)' };
  else snap = snapPositions[category];

  // Scale relative to stickman width (280px base)
  const scaleFactor = stickman.clientWidth / 280;
  img.style.width = `${snap.width * scaleFactor}px`;
  img.style.top = `${snap.top * scaleFactor}px`;
  img.style.left = `${snap.left * scaleFactor}px`;
  img.style.transform = `rotate(${snap.rotate}deg)`;
  img.style.zIndex = snap.z;
  img.style.boxShadow = snap.shadow;

  stickmanWrapper.appendChild(img);
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
    if (img.id !== 'stickman' && img.id !== 'logo') img.remove();
  });
}


