const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// ---------------- SNAP POSITIONS ----------------
// Coordinates in pixels relative to 280x400 stickman
const snapPositions = {
  // Hats
  redhat: { top: -77, left: 140, width: 120, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },
  hat_02: { top: -77, left: 138, width: 115, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },
  
  // Eyes
  eyes_01: { top: 45, left: 140, width: 40, rotate: 0, z: 6, shadow: '0 2px 4px rgba(0,0,0,0.3)' },
  eyes_03: { top: 45, left: 140, width: 40, rotate: 0, z: 6, shadow: '0 2px 4px rgba(0,0,0,0.3)' },

  // Glasses
  glasses_01: { top: 40, left: 140, width: 70, rotate: 0, z: 7, shadow: '0 2px 6px rgba(0,0,0,0.3)' },
  glasses_03: { top: 40, left: 140, width: 70, rotate: 0, z: 7, shadow: '0 2px 6px rgba(0,0,0,0.3)' },

  // Face
  roundface: { top: 60, left: 140, width: 75, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' },
  catface: { top: 60, left: 140, width: 75, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' },

  // Shirts / Mansuite
  mansuite: { top: 150 - 8, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_01: { top: 150 - 8, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_02: { top: 150 - 8, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_03: { top: 150 - 8, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_04: { top: 150 - 8, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_05: { top: 150 - 8, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },

  // Pants
  pants_01: { top: 270 - 13, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_02: { top: 270 - 13, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_03: { top: 270 - 13, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_04: { top: 270 - 13, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_05: { top: 270 - 13, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },

  // Shoes
  shoe_01_L: { top: 370, left: 120, width: 45, rotate: -5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_01_R: { top: 370, left: 160, width: 45, rotate: 5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_02_L: { top: 370, left: 120, width: 45, rotate: -5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_02_R: { top: 370, left: 160, width: 45, rotate: 5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' }
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

// ---------------- ADD & POSITION ITEM ----------------
function addItem(src, category) {
  const existing = stickmanWrapper.querySelector(`img[data-category='${category}']`);
  if (existing) existing.remove();

  const img = document.createElement('img');
  img.src = src;
  img.dataset.category = category;
  img.style.position = 'absolute';
  img.draggable = false;

  const snap = snapPositions[category] || snapPositions.roundface;
  positionItem(img, snap);
  stickmanWrapper.appendChild(img);
}

function positionItem(img, snap) {
  const tempImg = new Image();
  tempImg.src = img.src;
  tempImg.onload = () => {
    const newWidth = snap.width || tempImg.naturalWidth;
    const newHeight = newWidth * (tempImg.naturalHeight / tempImg.naturalWidth);

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
      redhat: ['images/redhat.jpg'],
      hat_02: ['images/hat_02.png'],
      glasses_01: ['images/glasses_01.png'],
      glasses_03: ['images/glasses_03.png'],
      eyes_01: ['images/eyes_01.png'],
      eyes_03: ['images/eyes_03.png'],
      roundface: ['images/roundface.jpg'],
      catface: ['images/catface.jpg'],
      mansuite: ['images/mansuite.jpg'],
      shirt_01: ['images/shirt_01.png'],
      shirt_02: ['images/shirt_02.png'],
      shirt_03: ['images/shirt_03.png'],
      shirt_04: ['images/shirt_04.png'],
      shirt_05: ['images/shirt_05.png'],
      pants_01: ['images/pants_01.png'],
      pants_02: ['images/pants_02.png'],
      pants_03: ['images/pants_03.png'],
      pants_04: ['images/pants_04.png'],
      pants_05: ['images/pants_05.png'],
      shoe_01_L: ['images/shoe_01_L.png'],
      shoe_01_R: ['images/shoe_01_R.png'],
      shoe_02_L: ['images/shoe_02_L.png'],
      shoe_02_R: ['images/shoe_02_R.png']
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


