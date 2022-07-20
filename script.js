let lamps = [];
let d = [];
let materiall = document.querySelector('.material');
let dimensions = document.querySelector('.dim');
let wei = document.querySelector('.weight');
let electr = document.querySelector('.electr');
let mainImg = document.querySelector('.wrapper_big-lamp');
let bigLamp = document.querySelector('.show-lamp-main-image');
let lampDiv = document.querySelector('.LampList');
let darkest = document.querySelector('.dark-button');
let light = document.querySelector('.light-button');

//buttons.js
darkest.addEventListener('click', function() {
  if (document.querySelector('.hasDark').classList.contains('clicked')) {
    document.querySelector('.main-image').src = 'dark.webp';
    document.querySelector('.wrapper_big-lamp').style.display = 'none';
    darkest.classList.add("show")
  } else {
    document.querySelector('.main-image').src = 'main_img.webp';
    document.querySelector('.wrapper_big-lamp').style.display = 'block';
  };
})

light.addEventListener('click', function() {
  document.querySelector('.main-image').src = 'main_img.webp';
  document.querySelector('.wrapper_big-lamp').style.display = 'block';

  if (darkest.classList.contains('show')) {
    darkest.classList.remove("show")
  }
})

//temp.js
function createTemp(lamps, i) {
  return `
    <div onmouseleave='nohov()' class='big-lamp ${lamps[i].isDarkMode ? 'hasDark' : 'hasntDark'}''
    id='${lamps[i].name}')' onmouseover='hov(${i}, "${lamps[i].name}")' onclick='inf(${lamps[i].height},
      ${lamps[i].width}, ${lamps[i].weight}, "${lamps[i].material}", "${lamps[i].electrification}",
      "${lamps[i].image}", "${lamps[i].name}", ${lamps[i].id})'><img class='lamp-img' id='${i}' src=${lamps[i].image}
      height="73px" width="23px" '></div>
  `
}

//hover.js
function nohov() {
  document.querySelector('.main-image').border = '0px';
  document.querySelector('.main-image').style.boxShadow = ''

}

function hov(img, id) {
  document.getElementById(id).style.height = '90px';
  document.getElementById(id).style.width = '6vw';
  document.getElementById(id).style.borderRadius = '10px';
  document.getElementById(id).style.marginLeft = '1.3vw';
  if (document.getElementById(id).classList.contains("clicked")) {
    document.querySelector('.main-image').border = '1px';
    document.querySelector('.main-image').style.borderBottom = '0px';
    document.querySelector('.main-image').style.boxShadow = '0px 5px 5px -5px rgba(34, 60, 80, 0.6)'
  } else {
    document.querySelector('.main-image').style.boxShadow = '';
  }
}


//getAllLamps.js
async function allLamps() {
  let response = await fetch('https://private-anon-0b16fd64cb-lampshop.apiary-mock.com/lamps');
  let result = await response.json();
  result.forEach((item, i) => {
    lamps.push(item)
  });
  for (let i = 0; i < lamps.length; i++) {
    let lampList = document.querySelector('.LampList');
    lampList.innerHTML += createTemp(lamps, i)
  };
  inf(lamps[0].height, lamps[0].width, lamps[0].weight, lamps[0].material,
    lamps[0].electrification, lamps[0].image, lamps[0].name)
};
allLamps();

//information.js
function inf(height, width, weight, material, electrification, img, id, i) {
  materiall.innerHTML = `<div class='div-inf'><p class='p-inf'> Material: </p><p class='p-inf slim'> ${material[0].toUpperCase() + material.slice(1)}</p></div>`;
  dimensions.innerHTML = `<div class='div-inf'><p class='p-inf'>Dimensions(cm): </p><p class='p-inf slim'> H ${height} x W ${width} x D ${width}</p></div>`;
  wei.innerHTML = `<div class='div-inf'><p class='p-inf'>Net Weight: </p><p class='p-inf slim'>${weight} kg</p></div>`;
  electr.innerHTML = `<div class='div-inf no-flex'><p class='p-inf no-flex-p'>Electrification:</p><p class='p-inf no-flex-slim slim'>${electrification}</p></div>`;
  mainImg.innerHTML = `<img class='show-img ${material}-${i}' src=${img}>`;
  bigLamp.innerHTML = `<img class='show-lamp-main-image lamp-${material}-${i}' src=${img}>`;
  let elem = document.getElementsByClassName('big-lamp');
  for (let i = 0; i < elem.length; i++) {
     elem[i].style.background = '';
     elem[i].classList.remove("clicked");
   }
   if (document.querySelector('.show-img').classList.contains('metal-2')) {
     document.querySelector('.metal-2').style.width = '83px';
     document.querySelector('.metal-2').style.height = '180px';
     //document.querySelector('.metal-2').style.marginLeft = '860px';
     document.querySelector('.lamp-metal-2').style.width = '160px';
   } else if (document.querySelector('.show-img').classList.contains('plastic-4')) {
     document.querySelector('.lamp-plastic-4').style.width = '270px';
     document.querySelector('.plastic-4').style.width = '170px';
   }

  document.getElementById(id).classList.add("clicked")
  document.getElementById(id).style.background = '#e1edee';
  document.querySelector('.main-image').border = '1px';
  document.querySelector('.main-image').style.borderBottom = '0px';
  document.querySelector('.main-image').style.boxShadow = '';
  document.querySelector('.main-image').style.boxShadow = '0px 5px 5px -5px rgba(34, 60, 80, 0.6)';

  let d = document.getElementsByClassName('hasntDark');
  for (let i = 0; i < d.length; i++) {
    if (d[i].classList.contains('clicked')) {
      document.querySelector('.main-image').src = 'main_img.webp';
      document.querySelector('.wrapper_big-lamp').style.display = 'block';
    };
  }
  if (document.querySelector('.hasDark').classList.contains('clicked')) {
    darkest.style.background = '#4d5454'
  } else {
    darkest.style.background = '#94A6A6'
  }
}
