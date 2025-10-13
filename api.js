const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// ---------------- SNAP POSITIONS ----------------
const snapPositions = {
  // ---------------- HATS ----------------
  redhat: { top: -77, left: 140, width: 120, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },
  hat_02: { top: -77, left: 138, width: 115, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },

  // ---------------- EYES ----------------
  eyes_01: { top: 70, left: 140, width: 40, rotate: 0, z: 6, shadow: '0 2px 4px rgba(0,0,0,0.3)' },
  eyes_03: { top: 70, left: 140, width: 40, rotate: 0, z: 6, shadow: '0 2px 4px rgba(0,0,0,0.3)' },

  // ---------------- GLASSES ----------------
  glasses_01: { top: 68, left: 140, width: 70, rotate: -2, z: 7, shadow: '0 2px 6px rgba(0,0,0,0.3)' },
  glasses_03: { top: 68, left: 140, width: 70, rotate: -2, z: 7, shadow: '0 2px 6px rgba(0,0,0,0.3)' },

  // ---------------- FACE ----------------
  roundface: { top: 60, left: 140, width: 75, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' },
  catface: { top: 60, left: 140, width: 75, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' },

  // ---------------- SHIRTS ----------------
  mansuite: { top: 128, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_01: { top: 128, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_02: { top: 128, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_03: { top: 128, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_04: { top: 128, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_05: { top: 128, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },

  // ---------------- PANTS ----------------
  pants_01: { top: 224, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_02: { top: 224, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_03: { top: 224, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_04: { top: 224, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_05: { top: 224, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },

  // ---------------- SHOES ----------------
  shoe_01_L: { top: 355, left: 60, width: 45, rotate: -5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_01_R: { top: 355, left: 175, width: 45, rotate: 5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_02_L: { top: 355, left: 60, width: 45, rotate: -5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_02_R: { top: 355, left: 175, width: 45, rotate: 5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' }
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
  if (category === 'shoes') {
    finalCategory = src.includes('_L') ? 'shoe_01_L' : 'shoe_01_R';
  }

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

  const snap = snapPositions[category] || snapPositions.roundface;
  img.style.width = `${snap.width}px`;
  img.style.top = `${snap.top}px`;
  img.style.left = `${snap.left}px`;
  img.style.transform = `rotate(${snap.rotate}deg) translateX(-50%)`;
  img.style.zIndex = snap.z;
  img.style.boxShadow = snap.shadow;

  stickmanWrapper.appendChild(img);
}

// ---------------- RANDOM OUTFIT ----------------
if (randomBtn) {
  randomBtn.addEventListener('click', () => {
    clearCanvas();
    const categories = {
      eyes_01: ['images/eyes_01.png'],
      eyes_03: ['images/eyes_03.png'],
      glasses_01: ['images/glasses_01.png'],
      glasses_03: ['images/glasses_03.png'],
      redhat: ['images/redhat.jpg'],
      hat_02: ['images/hat_02.png'],
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
      shoe_02_R: ['images/shoe_02_R.png'],
      roundface: ['images/roundface.jpg'],
      catface: ['images/catface.jpg']
    };

    for (const cat in categories) {
      const files = categories[cat];
      const file = files[Math.floor(Math.random() * files.length)];
      addItem(file, cat);
    }
  });
}

// ---------------- CLEAR ----------------
if (clearBtn) {
  clearBtn.addEventListener('click', clearCanvas);
}

function clearCanvas() {
  const images = stickmanWrapper.querySelectorAll('img[data-category]');
  images.forEach(img => img.remove());
}

