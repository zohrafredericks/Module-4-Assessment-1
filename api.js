// ---------------- SELECT ELEMENTS ----------------
const draggables = document.querySelectorAll('.draggable');
const stickmanWrapper = document.getElementById('stickman-wrapper');
const stickman = document.getElementById('stickman');
const randomBtn = document.getElementById('randomBtn');
const clearBtn = document.getElementById('clearBtn');

// ---------------- SNAP POSITIONS ----------------
const snapPositions = {
  hats: { top: 0, left: 105, width: 110, z: 10 },
  glasses: { top: 75, left: 120, width: 60, rotate: -2, z: 7 },
  eyes: { top: 80, left: 125, width: 50, z: 8 },
  faces: { top: 50, left: 115, width: 70, z: 9 },
  shirts: { top: 150, left: 105, width: 120, z: 6 },
  pants: { top: 240, left: 105, width: 120, z: 5 },
  suite: { top: 150, left: 105, width: 120, z: 6 },
  shoe_L: { top: 335, left: 110, width: 50, z: 6 },
  shoe_R: { top: 335, left: 190, width: 50, z: 6 }
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

  switch(category){
    case 'hats': addHat(src); break;
    case 'glasses': addGlasses(src); break;
    case 'eyes': addEyes(src); break;
    case 'faces': addFace(src); break;
    case 'shirts': addShirt(src); break;
    case 'pants': addPants(src); break;
    case 'suite': addSuite(src); break;
    case 'shoes': addShoe(src); break;
  }
});

// ---------------- ADD FUNCTIONS ----------------
function addHat(src){
  removeExisting('hats');
  addItem(src, 'hats');
}

function addGlasses(src){
  removeExisting('glasses');
  addItem(src, 'glasses');
}

function addEyes(src){
  removeExisting('eyes');
  addItem(src, 'eyes');
}

function addFace(src){
  removeExisting('faces');
  addItem(src, 'faces');
}

function addShirt(src){
  removeExisting('shirts');
  addItem(src, 'shirts');
}

function addPants(src){
  removeExisting('pants');
  addItem(src, 'pants');
}

function addSuite(src){
  // Remove shirt and pants first
  removeExisting('shirts');
  removeExisting('pants');
  addItem(src, 'suite');
}

function addShoe(src){
  let category = src.includes('_L') ? 'shoe_L' : 'shoe_R';
  removeExisting(category);
  addItem(src, category);
}

// Generic function to add item
function addItem(src, category){
  const snap = snapPositions[category];
  const scaleFactor = stickman.clientWidth / 280;

  const img = document.createElement('img');
  img.src = src;
  img.dataset.category = category;
  img.style.position = 'absolute';
  img.style.top = `${snap.top * scaleFactor}px`;
  img.style.left = `${snap.left * scaleFactor}px`;
  img.style.width = `${snap.width * scaleFactor}px`;
  if(snap.rotate) img.style.transform = `rotate(${snap.rotate}deg)`;
  img.style.zIndex = snap.z;

  stickmanWrapper.appendChild(img);
}

// Remove existing item of a category
function removeExisting(category){
  const existing = stickmanWrapper.querySelector(`img[data-category='${category}']`);
  if(existing) existing.remove();
}

// ---------------- RANDOM OUTFIT ----------------
randomBtn.addEventListener('click', () => {
  clearCanvas();

  const categories = {
    eyes: ['images/eyes_01.png','images/eyes_03.png'],
    glasses: ['images/glasses_01.png','images/glasses_03.png'],
    hats: ['images/hat_02.png','images/redhat.jpg'],
    shirts: ['images/shirt_01.png','images/shirt_02.png','images/shirt_03.png','images/shirt_04.png','images/shirt_05.png'],
    pants: ['images/pants_01.png','images/pants_02.png','images/pants_03.png','images/pants_04.png','images/pants_05.png'],
    suite: ['images/mansuite.jpg'],
    shoe_L: ['images/shoe_01_L.png','images/shoe_02_L.png'],
    shoe_R: ['images/shoe_01_R.png','images/shoe_02_R.png'],
    faces: ['images/catface.jpg','images/roundface.jpg']
  };

  for(const cat in categories){
    const files = categories[cat];
    const file = files[Math.floor(Math.random()*files.length)];
    if(cat === 'shoes'){ 
      addShoe(file);
    } else if(cat === 'suite'){
      addSuite(file);
    } else {
      addItem(file, cat);
    }
  }
});

// ---------------- CLEAR CANVAS ----------------
clearBtn.addEventListener('click', clearCanvas);

function clearCanvas(){
  const images = stickmanWrapper.querySelectorAll('img');
  images.forEach(img => {
    if(img.id !== 'stickman' && img.id !== 'logo') img.remove();
  });
}


  



