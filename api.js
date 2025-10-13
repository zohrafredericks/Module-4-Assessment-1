const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// ---------------- SNAP POSITIONS (for 280x400 stickman) ----------------
const snapPositions = {
  hats:      { top: 0,   left: 140, width: 120, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },
  eyes:      { top: 80,  left: 140, width: 50,  rotate: 0, z: 6,  shadow: '0 2px 4px rgba(0,0,0,0.3)' },
  glasses:   { top: 80,  left: 140, width: 70,  rotate: 0, z: 7,  shadow: '0 2px 6px rgba(0,0,0,0.3)' },
  faces:     { top: 75,  left: 140, width: 75,  rotate: 0, z: 6,  shadow: '0 2px 5px rgba(0,0,0,0.3)' },
  shirts:    { top: 150, left: 140, width: 160, rotate: 0, z: 5,  shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  mansuite:  { top: 150, left: 140, width: 160, rotate: 0, z: 5,  shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  pants:     { top: 250, left: 140, width: 120, rotate: 0, z: 4,  shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  shoe_L:    { top: 350, left: 120, width: 45,  rotate: -5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_R:    { top: 350, left: 160, width: 45,  rotate: 5,  z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' }
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
  img.draggable = false;

  const snap = snapPositions[category] || snapPositions.faces;
  positionItem(img, snap);
  stickmanWrapper.appendChild(img);
}

// ---------------- POSITION ITEM (no shrinking) ----------------
function positionItem(img, snap) {
  const tempImg = new Image();
  tempImg.src = img.src;
  tempImg.onload = () => {
    const aspect = tempImg.width / tempImg.height;
    const newWidth = snap.width;
    const newHeight = newWidth / aspect;

    img.style.width = `${newWidth}px`;
    img.style.height = `${newHeight}px`;
    img.style.top = `${snap.top}px`;
    img.style.left = `${snap.left}px`;
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
      hats: ['images/redhat.jpg','images/hat_02.png'],
      eyes: ['images/eyes_01.png','images/eyes_03.png'],
      glasses: ['images/glasses_01.png','images/glasses_03.png'],
      faces: ['images/catface.jpg','images/roundface.jpg'],
      shirts: ['images/shirt_01.png','images/shirt_02.png','images/shirt_03.png','images/shirt_04.png','images/shirt_05.png'],
      mansuite: ['images/mansuite.jpg'],
      pants: ['images/pants_01.png','images/pants_02.png','images/pants_03.png','images/pants_04.png','images/pants_05.png'],
      shoe_L: ['images/shoe_01_L.png','images/shoe_02_L.png'],
      shoe_R: ['images/shoe_01_R.png','images/shoe_02_R.png']
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
