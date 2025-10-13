const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

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
  const src = e.dataTransfer.getData('text/plain');
  const category = e.dataTransfer.getData('category');

  let finalCategory = category;
  if (category === 'shoes') finalCategory = src.includes('_L') ? 'shoe_L' : 'shoe_R';

  addItem(src, finalCategory);
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

  const snap = snapPositions[category] || snapPositions.faces;
  positionItem(img, snap);
  stickmanWrapper.appendChild(img);
}

// ---------------- POSITION ITEM ----------------
function positionItem(img, snap) {
  const stickmanWidth = stickmanWrapper.clientWidth;
  const scaleFactor = stickmanWidth / 1123; // new width 280px / original 1123px

  const tempImg = new Image();
  tempImg.src = img.src;
  tempImg.onload = () => {
    const aspect = tempImg.width / tempImg.height;
    const newWidth = snap.width * scaleFactor;
    const newHeight = newWidth / aspect;

    img.style.width = `${newWidth}px`;
    img.style.height = `${newHeight}px`;
    img.style.top = `${snap.top * scaleFactor}px`;
    img.style.left = `${snap.left * scaleFactor}px`;
    img.style.transform = `rotate(${snap.rotate}deg) translateX(-50%)`;
    img.style.zIndex = snap.z;
    img.style.boxShadow = snap.shadow;
  };
}

// ---------------- RANDOM OUTFIT ----------------
if (randomBtn) {
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
}

// ---------------- CLEAR CANVAS ----------------
if (clearBtn) {
  clearBtn.addEventListener('click', clearCanvas);
}

function clearCanvas() {
  const images = stickmanWrapper.querySelectorAll('img[data-category]');
  images.forEach(img => img.remove());
}

// ---------------- RESIZE HANDLER ----------------
window.addEventListener('resize', () => {
  const items = stickmanWrapper.querySelectorAll('img[data-category]');
  items.forEach(img => {
    const snap = snapPositions[img.dataset.category];
    if (snap) positionItem(img, snap);
  });
});

