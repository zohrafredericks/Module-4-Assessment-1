
const stickmanWrapper = document.getElementById('stickman-wrapper');
const draggables = document.querySelectorAll('.draggable');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// ---------------- SNAP POSITIONS (absolute pixels in wrapper) ----------------
const snapPositions = {
  // HATS
  redhat:   { top: 20,  left: 140, width: 120, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },
  hat_02:   { top: 20,  left: 138, width: 115, rotate: 0, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },

  // EYES
  eyes_01:  { top: 120, left: 140, width: 40, rotate: 0, z: 6, shadow: '0 2px 4px rgba(0,0,0,0.3)' },
  eyes_03:  { top: 120, left: 140, width: 40, rotate: 0, z: 6, shadow: '0 2px 4px rgba(0,0,0,0.3)' },

  // GLASSES
  glasses_01: { top: 118, left: 140, width: 70, rotate: 0, z: 7, shadow: '0 2px 6px rgba(0,0,0,0.3)' },
  glasses_03: { top: 118, left: 140, width: 70, rotate: 0, z: 7, shadow: '0 2px 6px rgba(0,0,0,0.3)' },

  // FACE
  catface:  { top: 140, left: 140, width: 75, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' },
  roundface:{ top: 140, left: 140, width: 75, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' },

  // SHIRTS / MANSUITE
  mansuite: { top: 200, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_01:{ top: 200, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_02:{ top: 200, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_03:{ top: 200, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_04:{ top: 200, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  shirt_05:{ top: 200, left: 140, width: 207, rotate: 0, z: 5, shadow: '0 2px 5px rgba(0,0,0,0.2)' },

  // PANTS
  pants_01:{ top: 280, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_02:{ top: 280, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_03:{ top: 280, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_04:{ top: 280, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  pants_05:{ top: 280, left: 140, width: 130, rotate: 0, z: 4, shadow: '0 2px 4px rgba(0,0,0,0.2)' },

  // SHOES
  shoe_01_L:{ top: 370, left: 100, width: 45, rotate: -5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_01_R:{ top: 370, left: 180, width: 45, rotate: 5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_02_L:{ top: 370, left: 100, width: 45, rotate: -5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_02_R:{ top: 370, left: 180, width: 45, rotate: 5, z: 3, shadow: '0 1px 3px rgba(0,0,0,0.2)' }
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
  if(existing) existing.remove();

  const img = document.createElement('img');
  img.src = src;
  img.dataset.category = category;
  img.draggable = false;
  img.style.position = 'absolute';

  // Determine snap key
  const filename = src.split('/').pop().split('.')[0]; // e.g., 'redhat'
  const snap = snapPositions[filename];

  // Apply position
  img.style.top = `${snap.top}px`;
  img.style.left = `${snap.left}px`;
  img.style.width = `${snap.width}px`;
  img.style.height = 'auto';
  img.style.zIndex = snap.z;
  img.style.boxShadow = snap.shadow;
  img.style.transform = `translateX(-50%) rotate(${snap.rotate}deg)`;

  stickmanWrapper.appendChild(img);
}

// ---------------- RANDOM OUTFIT ----------------
if(randomBtn) {
  randomBtn.addEventListener('click', () => {
    clearCanvas();
    const categories = {
      hats: ['images/redhat.jpg','images/hat_02.png'],
      eyes: ['images/eyes_01.png','images/eyes_03.png'],
      glasses: ['images/glasses_01.png','images/glasses_03.png'],
      faces: ['images/catface.jpg','images/roundface.jpg'],
      shirts: ['images/mansuite.jpg','images/shirt_01.png','images/shirt_02.png','images/shirt_03.png','images/shirt_04.png','images/shirt_05.png'],
      pants: ['images/pants_01.png','images/pants_02.png','images/pants_03.png','images/pants_04.png','images/pants_05.png'],
      shoes: ['images/shoe_01_L.png','images/shoe_01_R.png','images/shoe_02_L.png','images/shoe_02_R.png']
    };

    for(const cat in categories) {
      const files = categories[cat];
      const file = files[Math.floor(Math.random()*files.length)];
      addItem(file, file.split('/').pop().split('.')[0]);
    }
  });
}

// ---------------- CLEAR CANVAS ----------------
if(clearBtn) {
  clearBtn.addEventListener('click', clearCanvas);
}

function clearCanvas() {
  const images = stickmanWrapper.querySelectorAll('img[data-category]');
  images.forEach(img => img.remove());
}

