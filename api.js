// ---------------- SELECT ELEMENTS ----------------
const draggables = document.querySelectorAll('.draggable');
const rightColumn = document.getElementById('right-column');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// ---------------- SNAP POSITIONS ----------------
const snapPositions = {
  eyes: { top: 90, left: 145, width: 60 },
  hats: { top: 25, left: 125, width: 100 },        // default hat
  shirts: { top: 150, left: 105, width: 120 },     // default shirts
  pants: { top: 240, left: 105, width: 120 },
  shoe_L: { top: 335, left: 110, width: 50 },
  shoe_R: { top: 335, left: 190, width: 50 },
  faces: { top: 70, left: 125, width: 100 }        // average for catface & roundface
};

// ---------------- DRAG & DROP ----------------
draggables.forEach(img => {
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', img.src);
    e.dataTransfer.setData('category', img.dataset.category);
  });
});

rightColumn.addEventListener('dragover', e => e.preventDefault());

rightColumn.addEventListener('drop', e => {
  e.preventDefault();
  let src = e.dataTransfer.getData('text/plain');
  let category = e.dataTransfer.getData('category');

  // Correct shoe category
  if (category === 'shoes') {
    if (src.includes('_L')) category = 'shoe_L';
    if (src.includes('_R')) category = 'shoe_R';
  }

  addItem(src, category);
});

// ---------------- ADD ITEM ----------------
function addItem(src, category) {
  const existing = rightColumn.querySelector(`img[data-category='${category}']`);
  if (existing) existing.remove();

  const img = document.createElement('img');
  img.src = src;
  img.dataset.category = category;

  // Apply individual positions for new images
  let snap;
  if (src.includes('catface.png')) snap = { top: 75, left: 130, width: 90 };
  else if (src.includes('roundface.png')) snap = { top: 70, left: 125, width: 100 };
  else if (src.includes('redhat.png')) snap = { top: 15, left: 120, width: 110 };
  else if (src.includes('mansuite.png')) snap = { top: 150, left: 105, width: 120 };
  else snap = snapPositions[category];

  img.style.position = 'absolute';
  img.style.top = `${snap.top}px`;
  img.style.left = `${snap.left}px`;
  img.style.width = `${snap.width}px`;

  rightColumn.appendChild(img);
}

// ---------------- RANDOM OUTFIT ----------------
randomBtn.addEventListener('click', () => {
  clearCanvas();

  const categories = {
    eyes: ['images/eyes_01.png','images/eyes_03.png'],
    hats: ['images/hat_02.png','images/redhat.png'],
    shirts: ['images/shirt_01.png','images/shirt_02.png','images/shirt_03.png','images/shirt_04.png','images/shirt_05.png','images/mansuite.png'],
    pants: ['images/pants_01.png','images/pants_02.png','images/pants_03.png','images/pants_04.png','images/pants_05.png'],
    shoe_L: ['images/shoe_01_L.png','images/shoe_02_L.png'],
    shoe_R: ['images/shoe_01_R.png','images/shoe_02_R.png'],
    faces: ['images/catface.png','images/roundface.png']
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
  const images = rightColumn.querySelectorAll('img');
  images.forEach(img => {
    if (img.id !== 'stickman' && img.id !== 'logo') img.remove();
  });
}
