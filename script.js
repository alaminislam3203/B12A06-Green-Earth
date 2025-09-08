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