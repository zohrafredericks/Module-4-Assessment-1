const draggables = document.querySelectorAll('.draggable');
const rightColumn = document.getElementById('right-column');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// Snap positions for categories including left/right shoes
const snapPositions = {
  eyes: { top: 85, left: 140, width: 60 },
  glasses: { top: 80, left: 130, width: 80 },
  hats: { top: 30, left: 120, width: 100 },
  shirts: { top: 140, left: 100, width: 120 },
  pants: { top: 230, left: 100, width: 120 },
  shoe_L: { top: 320, left: 100, width: 50 },
  shoe_R: { top: 320, left: 190, width: 50 }
};

// Drag from left column
draggables.forEach(img => {
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', img.src);
    e.dataTransfer.setData('category', img.dataset.category);
  });
});

rightColumn.addEventListener('dragover', e => e.preventDefault());

rightColumn.addEventListener('drop', e => {
  e.preventDefault();
  const src = e.dataTransfer.getData('text/plain');
  const category = e.dataTransfer.getData('category');
  addItem(src, category);
});

// Add item with snap positions
function addItem(src, category) {
  // Determine correct category for shoes
  if (category === 'shoes') {
    if (src.includes('_L')) category = 'shoe_L';
    if (src.includes('_R')) category = 'shoe_R';
  }

  // Remove existing item of same category
  const existing = rightColumn.querySelector(`img[data-category='${category}']`);
  if (existing) existing.remove();

  const img = document.createElement('img');
  img.src = src;
  img.dataset.category = category;

  const snap = snapPositions[category];
  img.style.position = 'absolute';
  img.style.top = `${snap.top}px`;
  img.style.left = `${snap.left}px`;
  img.style.width = `${snap.width}px`;

  rightColumn.appendChild(img);
}

// Random outfit generator
randomBtn.addEventListener('click', () => {
  clearCanvas();
  const categories = {
    eyes: ['images/eyes_01.png','images/eyes_03.png'],
    glasses: ['images/glasses_01.png','images/glasses_03.png'],
    hats: ['images/hat_02.png'],
    shirts: ['images/shirt_01.png','images/shirt_02.png','images/shirt_03.png','images/shirt_04.png','images/shirt_05.png'],
    pants: ['images/pants_01.png','images/pants_02.png','images/pants_03.png','images/pants_04.png','images/pants_05.png'],
    shoe_L: ['images/shoe_01_L.png','images/shoe_02_L.png'],
    shoe_R: ['images/shoe_01_R.png','images/shoe_02_R.png']
  };

  for (const cat in categories) {
    const files = categories[cat];
    const file = files[Math.floor(Math.random()*files.length)];
    addItem(file, cat);
  }
});

// Clear canvas overlays
clearBtn.addEventListener('click', clearCanvas);

function clearCanvas() {
  const images = rightColumn.querySelectorAll('img');
  images.forEach(img => {
    if (img.id !== 'stickman' && img.id !== 'logo') img.remove();
  });
}
