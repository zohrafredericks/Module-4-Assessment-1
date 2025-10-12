const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// Snap positions relative to stickman
const snapPositions = {
  eyes:      { top: 90, left: 145, width: 60, rotate: 0, z: 5, shadow: '0 2px 4px rgba(0,0,0,0.3)' },
  glasses:   { top: 85, left: 135, width: 80, rotate: -2, z: 6, shadow: '0 2px 6px rgba(0,0,0,0.3)' },
  hats:      { top: 25, left: 125, width: 100, rotate: 5, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' },
  shirts:    { top: 150, left: 105, width: 120, rotate: 0, z: 4, shadow: '0 2px 5px rgba(0,0,0,0.2)' },
  pants:     { top: 240, left: 105, width: 120, rotate: 0, z: 3, shadow: '0 2px 4px rgba(0,0,0,0.2)' },
  shoe_L:    { top: 335, left: 110, width: 50, rotate: -5, z: 2, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  shoe_R:    { top: 335, left: 190, width: 50, rotate: 5, z: 2, shadow: '0 1px 3px rgba(0,0,0,0.2)' },
  faces:     { top: 80, left: 135, width: 90, rotate: 0, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' }
};

// DRAG & DROP
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

// ADD ITEM
function addItem(src, category) {
  const existing = stickmanWrapper.querySelector(`img[data-category='${category}']`);
  if (existing) existing.remove();

  const img = document.createElement('img');
  img.src = src;
  img.dataset.category = category;
  img.style.position = 'absolute';

  let snap;
  if (src.includes('catface.jpg')) snap = { top: 80, left: 135, width: 90, rotate: -3, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' };
  else if (src.includes('roundface.jpg')) snap = { top: 75, left: 130, width: 100, rotate: 2, z: 6, shadow: '0 2px 5px rgba(0,0,0,0.3)' };
  else if (src.includes('redhat.jpg')) snap = { top: 10, left: 120, width: 110, rotate: 5, z: 10, shadow: '0 4px 8px rgba(0,0,0,0.4)' };
  else if (src.includes('mansuite.jpg')) snap = { top: 150, left: 105, width: 120, rotate: -2, z: 4, shadow: '0 2px 5px rgba(0,0,0,0.2)' };
  else snap = snapPositions[category];

  img.style.top = `${snap.top}px`;
  img.style.left = `${snap.left}px`;
  img.style.width = `${snap.width}px`;
  img.style.zIndex = snap.z;
  img.style.transform = `rotate(${snap.rotate}deg)`;
  img.style.boxShadow = snap.shadow;

  stickmanWrapper.appendChild(img);
}

// RANDOM OUTFIT
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

// CLEAR CANVAS
clearBtn.addEventListener('click', clearCanvas);

function clearCanvas() {
  const images = stickmanWrapper.querySelectorAll('img');
  images.forEach(img => {
    if (img.id !== 'stickman' && img.id !== 'logo') img.remove();
  });
}



 
