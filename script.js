//fetch all data

const allDataFetch = async () => {
  const allData = await fetch('https://openapi.programming-hero.com/api/plants');
  const Data = await allData.json();
  card(Data.plants);
}
allDataFetch();
//fetch all categories

const allCategories = async (params) => {
  const allCatData = await fetch('https://openapi.programming-hero.com/api/categories');
  const catData = await allCatData.json();
  catData.categories.forEach((e) => {
    categoryBtn(e.category_name, e.id, 'category')
  });
}
allCategories()
//fetch one type of planes

const oneTypePlants = async (id) => {
  const onePlant = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
  const Plant = await onePlant.json();
  card(Plant.plants);
}

//fetch for plant details

const plantDetails = async (id) => {
  const oneDetails = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const Details = await oneDetails.json();
  popup(Details.plants);
}

//making card function

const card = (infos, cardId = '#card-preview') => {
  const cardPreview = document.querySelector(cardId);
  cardPreview.innerHTML = ''
  infos.forEach((info) => {
    let { category, description, id, image, name, price } = info;
    const tree = document.createElement('div');
    tree.innerHTML += `
<div class="card p-4 flex flex-col gap-3 bg-white rounded-lg  items-stretch h-full">
            <img src="${image}" alt=""
              class="h-full w-full object-fit max-h-[186px]  bg-gray-400 rounded-lg">
            <h5 class="font-semibold text-sm text-[#1F2937] cursor-pointer" onclick="plantDetails(${id})">${name}</h5>
            <p class="text-[#1f2937a1] text-xs flex-grow">${description}</p>
            <div class="cat-price flex justify-between">
              <div class="category-name text-sm bg-[#DCFCE7] text-green-800 rounded-full py-1 px-3">${category}</div>
              <div class="price font-bold text-base">৳${price}</div>
            </div>
            <button class=" px-5 py-3 rounded-full text-base text-white bg-[#15803D]" onclick="addCart('${name}', ${price})">Add to Cart</button>
          </div>

`
    cardPreview.append(tree)
  })

}
//category buttons
const categoryBtn = (name, id, catId) => {
  const btnPreview = document.querySelector(`#${catId}`);

  btnPreview.innerHTML += `
<button class="category-btn py-2 px-3 text-base font-medium w-full rounded-[4px] h-full  text-start hover:bg-[#CFF0DC] hover:text-black" onclick ="oneTypePlants(${id})">${name}</button>
`
  active()

}
//active function
const active = () => {
  const allCatBtn = document.querySelectorAll('.category-btn')
  document.querySelector(`#category`).addEventListener('click', (e) => {
    allCatBtn.forEach(el => el.classList.remove('bg-[#15803D]', 'text-white'));
    if (e.target.classList.contains('category-btn')) {
      e.target.classList.add('bg-[#15803D]', 'text-white')
    }


  })
}

//add to cart function
const addCart = (name, price) => {


  const carts = document.querySelector('.cart-items');
  carts.innerHTML += `
 <div class="cart-item flex justify-between items-center px-3 py-2 bg-[#F0FDF4]">
              <div class="info">
                <h6 class="text-sm font-bold text-[#1f2937]">${name}</h6>
                <span class="text-base text-[#1f293783]">৳<span>${price}</span></span>
               </div>
               <span class="w-[16px] h-[16px] text-base text-[#1f293783] cursor-pointer" onclick="removeCart()">×</span>
            </div>
`
  showTotal();
}
//show the total
const showTotal = () => {
  const countCarts = document.querySelectorAll('.cart-item');
  const totalContent = document.querySelector('.total');
  let total = 0;
  if (countCarts.length > 0) {

    totalContent.classList.remove('hidden');
    totalContent.classList.add('flex')
    countCarts.forEach((e) => {
      let currentPrice = e.children[0].children[1].children[0].textContent;
      let number = parseInt(currentPrice);
      total += number
      console.log(total);
      totalContent.children[1].children[0].textContent = total
    })
  } else {
    totalContent.classList.add('hidden')
  }
}

// remove function

const removeCart = () => {
  const cart = document.querySelector('.cart-item');
  cart.remove();
  showTotal();
}
//details popup

const popup = (e) => {
  const popupContent = document.querySelector('#popup');

  popupContent.innerHTML = `<div class="card z-[9999] p-4 flex flex-col gap-3 bg-white rounded-lg w-[350px]">
  <h5 class="font-semibold text-sm text-[#1F2937]">${e.name}</h5>
            <img src="${e.image}" alt=""
              class="h-full w-full object-fit max-h-[186px]  bg-gray-400 rounded-lg">
            <div class="category-name text-base "><strong class="text-base">Category:</strong>${e.category}</div>
              <div class="price font-bold text-base">Price:<span class="font-normal">৳${e.price}</span></div>
               <p class="text-[#1f2937a1] text-xs"><strong class="text-black text-base">Description:</strong>${e.description}</p>
            <div class="cat-price flex justify-between">
            </div>
            <button class="details-btn px-4 py-3 text-center rounded text-base text-black bg-gray-300 w-20 ml-auto">Close</button>
          </div>`
  popupContent.classList.remove('hidden');
  popupContent.classList.add('flex', 'overflow-x-hidden');
  document.querySelectorAll('.details-btn').forEach((e) => {
    e.addEventListener('click', () => {

      popupContent.classList.add('hidden')
      popupContent.classList.remove('flex', 'overflow-x-hidden');


    })
  })
}

//nav bar
const navBar = () => {
  const burgerNav = document.querySelector('.burger-nav');
  const navTool = document.querySelector('.nav-tool');

  burgerNav.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent click bubbling
    navTool.classList.remove('hidden');
  });

  // close navTool if clicking outside
  document.addEventListener('click', (e) => {
    if (!navTool.contains(e.target) && !burgerNav.contains(e.target)) {
      navTool.classList.add('hidden');
    }
  });
}
navBar();