// ===============================
// Global Variables
// ===============================
const plantCards = document.getElementById("plant-cards");
const loader = document.getElementById("loader");
const cartContainer = document.getElementById("cart-container");
let cartList = [];

// ===============================
// Loader Manager
// ===============================
const manageLoader = (loadingStatus) => {
    if(loadingStatus){
        loader.classList.remove("hidden");
        plantCards.classList.add("hidden");
    }
    else{
        loader.classList.add("hidden");
        plantCards.classList.remove("hidden");
    }
}

// ===============================
// Categories Section
// ===============================

// Load All Categories
const loadAllCategories = async() => {
    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url);
    const data = await res.json();
    showAllCategories(data.categories);
}

// Show Categories in Sidebar
const showAllCategories = (categories) => {
    const categoryList = document.getElementById("category-list");
    categories.forEach(category => {
        categoryList.innerHTML += `
            <li id="tree-${category.id}" 
                onclick="loadPlantsByCategory('${category.id}')"
                class="px-3 py-2 cursor-pointer rounded duration-300 hover:bg-[#15803d] hover:text-white">
                ${category.category_name}
            </li>
        `;
    });
}

// Remove Active Category Highlight
const removeActive = () => {
    const allCategories = document.querySelectorAll("#category-list li");
    allCategories.forEach(category => {
        category.classList.remove("bg-[#15803d]", "text-white");
    });
}

// ===============================
// Plants Section
// ===============================

// Load All Plants
const loadAllPlants = async() => {
    manageLoader(true);
    const url = "https://openapi.programming-hero.com/api/plants";
    const res = await fetch(url);
    const data = await res.json();
    showAllPlants(data.plants);
}

// Show All Plants
const showAllPlants = (plants) => {
    removeActive();
    const allTreeBtn = document.getElementById("tree-all");
    allTreeBtn.classList.add("bg-[#15803d]", "text-white");

    plantCards.innerHTML = "";
    plants.forEach(plant => {
        plantCards.innerHTML += `
            <div class="card bg-base-100 w-full shadow-sm">
                <figure class="px-4 pt-4">
                    <img src="${plant.image}" alt="${plant.name}"
                        class="rounded-xl w-full h-50 object-cover" />
                </figure>
                <div class="card-body pb-4">
                    <h2 class="card-title cursor-pointer" 
                        onclick="loadPlantDetail('${plant.id}')">${plant.name}</h2>
                    <p>${plant.description}</p>
                    <div class="flex justify-between items-center">
                        <div class="rounded-full bg-[#dcfce7] text-[#15803d] py-1 px-3 font-semibold">${plant.category}</div>
                        <div class="font-semibold">৳${plant.price}</div>
                    </div>
                </div>
                <div class="pb-4 px-4">
                    <button class="btn bg-[#15803d] btn-block rounded-full text-white 
                        hover:scale-105 transition-transform duration-100 ease-in-out cursor-pointer">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
    manageLoader(false);
}

// Load Plants by Category
const loadPlantsByCategory = async(id) => {
    manageLoader(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
  showPlantsByCategory(data.plants, id);
  


  
// Show Plants by Selected Category
const showPlantsByCategory = (plants, id) => {
    removeActive();
    const clickedCategory = document.getElementById(`tree-${id}`);
    clickedCategory.classList.add("bg-[#15803d]", "text-white");

    plantCards.innerHTML = "";
    plants.forEach(plant => {
        plantCards.innerHTML += `
            <div class="card bg-base-100 w-full shadow-sm">
                <figure class="px-4 pt-4">
                    <img src="${plant.image}" alt="${plant.name}"
                        class="rounded-xl w-full h-50 object-cover" />
                </figure>
                <div class="card-body pb-4">
                    <h2 class="card-title cursor-pointer" 
                        onclick="loadPlantDetail('${plant.id}')">${plant.name}</h2>
                    <p>${plant.description}</p>
                    <div class="flex justify-between items-center">
                        <div class="rounded-full bg-[#dcfce7] text-[#15803d] py-1 px-3 font-semibold">${plant.category}</div>
                        <div class="font-semibold">৳${plant.price}</div>
                    </div>
                </div>
                <div class="pb-4 px-4">
                    <button class="btn bg-[#15803d] btn-block rounded-full text-white 
                        hover:scale-105 transition-transform duration-100 ease-in-out cursor-pointer">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
    manageLoader(false);
}


// ===============================
// Plant Details Modal Section
// ===============================
const loadPlantDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showPlantDetail(data.plants);
}

const showPlantDetail = (plant) => {
    const plantModal = document.getElementById("plant_modal");
    const plantDetail = document.getElementById("plant-detail");

    plantModal.showModal();
    plantDetail.innerHTML = `
        <h3 class="text-2xl font-semibold">${plant.name}</h3>
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-60 object-cover rounded-xl">
        <p><strong>Category:</strong> ${plant.category}</p>
        <p><strong>Price:</strong> ৳${plant.price}</p>
        <p><strong>Description:</strong> ${plant.description}</p>
    `;
}



// ===============================
// Cart Section
// ===============================

// Add to Cart Button Event
plantCards.addEventListener('click', (e) => addToCart(e));

// Add Item to Cart
const addToCart = (e) => {
    if(e.target.innerText == "Add to Cart"){
        const name = e.target.parentNode.parentNode.children[1].children[0].innerText;
        const price = e.target.parentNode.parentNode.children[1].children[2].children[1].innerText.slice(1);

        const cartData = {
            plantName: name,
            plantPrice: Number(price),
            quantity: 1
        };

        let existingPlant = cartList.find(cart => cart.plantName === cartData.plantName);
        if(existingPlant){
            existingPlant.quantity++;
        }
        else{
            cartList.push(cartData);
        }

        alert(`${name} has been added to the cart.`);
        showCartList(cartList);
    }
}

// Show Cart Items
const showCartList = (cartList) => {
    const totalPriceEl = document.getElementById("total-price");
    let totalPrice = 0;
    cartContainer.innerHTML = "";

    cartList.forEach(cart => {
        cartContainer.innerHTML += `
            <div class="bg-[#f0fdf4] p-3 rounded-lg flex justify-between items-center gap-4">
                <div>
                    <h5 class="text-lg font-semibold">${cart.plantName}</h5>
                    <p class="text-[#889396]">৳${cart.plantPrice} x ${cart.quantity}</p>
                </div>
                <div class="cursor-pointer" onclick="removeCart('${cart.plantName}')">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        `;
        totalPrice += cart.plantPrice * cart.quantity;
    });

    totalPriceEl.innerText = totalPrice;
}

// Remove Item from Cart
const removeCart = (plantName) => {
    const filteredCart = cartList.filter(cart => cart.plantName !== plantName);
    cartList = filteredCart;
    showCartList(cartList);
}

// ===============================
// Init Functions
// ===============================
loadAllCategories();
  loadAllPlants();