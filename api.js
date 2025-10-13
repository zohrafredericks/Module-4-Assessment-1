// ---------------- DRAGGABLE ELEMENTS ----------------
const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// ---------------- SNAP POSITIONS ----------------
// Positions in px based on stickman height 400px and cm offsets
const snapPositions = {
  // HATS: bottom ~0.6cm from top
  redhat:   { top: 0.6*37.8, left: 80, width: 120, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },
  hat_02:   { top: 0.6*37.8, left: 78, width: 115, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },

  // EYES: ~0.5cm below forehead
  eyes:     { top: 0.5*37.8 + 0.6*37.8, left: 105, width: 40, rotate: 0, z: 6, shadow: '0 2px 4px rgba(0,0,0,0.3)' },

  // GLASSES: same vertical as eyes
  glasses:  { top: 0.5*37.8 + 0.6*37.8, left: 103, width: 70, rotate: 0, z: 7, shadow: '0 2px 6px rgba(0,0,0,0.3)' },

  // FACE (nose): slightly below eyes
  faces:    { top: 1*37.8 + 0.6*37.8, left: 105, width: 75, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' },

  // SHIRTS: move up 0.8cm
  shirts:   { top: 150 - (0.8*37.8), left: 60, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  mansuite: { top: 150 - (0.8*37.8), left: 60, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },

  // PANTS: move up 1.3cm
  pants:    { top: 270 - (1.3*37.8), left: 60, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },

  // SHOES: snap to foot zones
  shoe_L:   { top: 370, left: 55, width: 45, rotate: -5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_R:   { top: 370, left: 140, width: 45, rotate: 5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' }
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
  let category = e.dataTransfer.getData('category');

  // Determine shoe side automatically
  if (category === 'shoes') {
    category = src.includes('_L') ? 'shoe_L' : 'shoe_R';
  }

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

  const snap = snapPositions[category] || snapPositions.faces;
  positionItem(img, snap);

  stickmanWrapper.appendChild(img);
}

// ---------------- POSITION ITEM ----------------
function positionItem(img, snap) {
  img.style.position = 'absolute';
  img.style.width = `${snap.width}px`;
  img.style.top = `${snap.top}px`;
  img.style.left = `${snap.left}px`;
  img.style.transform = `rotate(${snap.rotate}deg) translateX(-50%)`;
  img.style.zIndex = snap.z;
  img.style.boxShadow = snap.shadow;
  img.draggable = false;
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


 
