const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// ---------------- SNAP POSITIONS ----------------
// 2 cm ≈ 75.6 px (for vertical adjustment)
const snapPositions = {
  redhat: {
    top: -77 - 75.6,  // moved 2cm up
    left: 140,
    width: 120,
    rotate: 0,
    z: 10,
    shadow: '0 4px 8px rgba(0,0,0,0.4)'
  },
  hat_02: {
    top: -77 - 75.6,  // moved 2cm up
    left: 138,
    width: 115,
    rotate: 0,
    z: 10,
    shadow: '0 4px 8px rgba(0,0,0,0.4)'
  }
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

  const snap = snapPositions[category] || { top: 0, left: 0, width: 100, rotate: 0, z: 5, shadow: 'none' };
  positionItem(img, snap);

  stickmanWrapper.appendChild(img);
}

// ---------------- POSITION ITEM ----------------
function positionItem(img, snap) {
  img.style.top = `${snap.top}px`;
  img.style.left = `${snap.left}px`;
  img.style.width = `${snap.width}px`;
  img.style.height = 'auto';  // keep natural aspect ratio
  img.style.transform = `rotate(${snap.rotate}deg) translateX(-50%)`;
  img.style.zIndex = snap.z;
  img.style.boxShadow = snap.shadow;
}

// ---------------- RANDOM OUTFIT ----------------
if (randomBtn) {
  randomBtn.addEventListener('click', () => {
    clearCanvas();
    const categories = {
      redhat: ['images/redhat.jpg'],
      hat_02: ['images/hat_02.png'],
      // Add other categories when ready
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


