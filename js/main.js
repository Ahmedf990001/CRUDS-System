// select all values
//------------------------------
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
//------------------------------ 
const createBtn = document.getElementById("create");
const dataPreviewBtn = document.getElementById("dataPreview");
//------------------------------
const updateBtn = document.getElementById("update");
const deleteBtn = document.getElementById("delete");
//------------------------------
//select spans elements in the card
const titleValue = document.getElementById("titleVal");
const priceValue = document.getElementById("priceVal");
const taxesValue = document.getElementById("taxesVal");
const adsValue = document.getElementById("adsVal");
const discountValue = document.getElementById("discountVal");
const totalValue = document.getElementById("totalVal");
const categoryValue = document.getElementById("categoryVal");
//select search elements
const searchInput = document.getElementById("search");
const searchModeTitle = document.getElementById("searchTitle");
const searchModeCategory = document.getElementById("searchCategory");
const deleteAllBtn = document.getElementById("deleteAll");

// ------------------------------
/* ========== Codes For Moving Between Pages ========== */
const dataReview = document.getElementById("dataReview");
const creationPage = document.getElementById("creationPage");


title.focus();
document.addEventListener("DOMContentLoaded",displayProducts);

//todo Create Product Function
function createProduct() {

const productTitle = title.value.trim();
const productPrice = price.value.trim();
const productCount = count.value.trim();
const productTaxes = taxes.value.trim();
const productAds = ads.value.trim();
const productDiscount = discount.value.trim();
//-----------------------------
const numberOfProducts = count.value.trim();
const productCategory = category.value.trim();


 // inputs validation
let isValid = true;
if(!productTitle) {
    document.getElementById("errorTitleInput").innerHTML = "This field is required";
    title.style.borderColor = "red";
    isValid = false;
}else {
    document.getElementById("errorTitleInput").innerHTML = "";
    title.style.borderColor = "";
}

if(!productPrice) {
    document.getElementById("erorrPriceInput").innerHTML = "This field is required";
    price.style.borderColor = "red";
    isValid = false;
}else {
    document.getElementById("erorrPriceInput").innerHTML = "";
    price.style.borderColor = "";
}

if(!productTaxes) {
    document.getElementById("erorrtaxesInput").innerHTML = "This field is required";
    taxes.style.borderColor = "red";
    isValid = false;
}else {
    document.getElementById("erorrtaxesInput").innerHTML = "";
    taxes.style.borderColor = "";
}

if(!productAds) {
    document.getElementById("erorrAdsInput").innerHTML = "This field is required";
    ads.style.borderColor = "red";
    isValid = false;
}else {
    document.getElementById("erorrAdsInput").innerHTML = "";
    ads.style.borderColor = "";
}

if(!productDiscount) {
    document.getElementById("discountErorrInput").innerHTML = "This field is required";
    discount.style.borderColor = "red";
    isValid = false;
}else {
    document.getElementById("discountErorrInput").innerHTML = "";
    discount.style.borderColor = "";
}

if(!productCategory) {
    document.getElementById("catErorrInput").innerHTML = "This field is required";
    category.style.borderColor = "red";
    isValid = false;
}else {
    document.getElementById("catErorrInput").innerHTML = "";
    category.style.borderColor = "";
}

if(!isValid) {
    return;
}


//? create product
const product = {
    title: productTitle,
    price: productPrice,
    taxes: productTaxes,
    ads: productAds,
    discount: productDiscount,
    total: +productPrice + +productTaxes + +productAds - +productDiscount,
    count: numberOfProducts,
    category: productCategory
  };

     // If update mode is active, update product and reset
    if (updateIndex !== -1) {
        productData[updateIndex] = product;
        updateIndex = -1;
        createBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Create";
        count.style.display = "block";
    } else {
        // Handle multiple product creation using count
        const countValue = productCount > 0 ? productCount : 1;  // Default count is 1
        for (let i = 0; i < countValue; i++) {
            productData.push({...product});  // Push a clone of the product
        }
    }

  
  //save the updated array to the local storage
  localStorage.setItem("products", JSON.stringify(productData));

  //? display the updated list of products
  displayProducts();

  //? sucess message
  showSuccessAlert();

  //? clear inputs
  clearInputs();
}

// todo getTotal Function
function getTotal() {
    if (price.value != "") {
      let total = +price.value + +taxes.value + +ads.value - +discount.value; 
      totalValue.innerHTML =`$${total}`;
      
}else {
      totalValue.innerHTML = "$0";
}
}

//todo Real-time updates in the card span elements
title.addEventListener("keyup", () => {
    titleValue.innerHTML = title.value;
});

price.addEventListener("keyup", () => {
    priceValue.innerHTML =  `$${price.value}`;
    getTotal();
});

taxes.addEventListener("keyup", () => {
    taxesValue.innerHTML = `$${taxes.value}`;
    getTotal();
});

ads.addEventListener("keyup", () => {
    adsValue.innerHTML = `$${ads.value}`;
    getTotal();
});

discount.addEventListener("keyup", () => {
    discountValue.innerHTML = `-$${discount.value}`;
    getTotal();
});

category.addEventListener("keyup", () => {
    categoryValue.innerHTML = category.value;
});


//todo check if there is data in the local storage
if(localStorage.getItem("products") !== null) {
    productData = JSON.parse(localStorage.getItem("products"));
}else {
    productData = [];
}

// todo show data function
function displayProducts() {
      let table = "";   
      for(let i = 0; i < productData.length; i++) {
        table += `<tr>
          <td>${i+1}</td>
          <td>${productData[i].title}</td>
          <td>$${productData[i].price}</td>
          <td>$${productData[i].taxes}</td>
          <td>$${productData[i].ads}</td>
          <td>$${productData[i].discount}</td>
          <td>$${productData[i].total}</td>
          <td>${productData[i].category}</td>
          <td><button class="update" onclick="updateProduct(${i})"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
          <td><button class="delete" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`;
}
document.getElementById("tbody").innerHTML = table;
if(productData.length > 0) {
    deleteAllBtn.innerHTML = `<button onclick="deleteAll()"><i class="fa-solid fa-trash-can"></i> Delete All (${productData.length})</button>`
}else {
    deleteAllBtn.innerHTML = "";
}
}

//todo update product
let updateIndex = -1;
function updateProduct(index) {
    updateIndex = index;
    title.value = productData[index].title;
    price.value = productData[index].price;
    taxes.value = productData[index].taxes;
    ads.value = productData[index].ads;
    discount.value = productData[index].discount;
    count.value = productData[index].count;
    category.value = productData[index].category;

    //update the card values also 
    titleValue.innerHTML = title.value; 
    priceValue.innerHTML =  `$${price.value}`;
    taxesValue.innerHTML = `$${taxes.value}`;
    adsValue.innerHTML = `$${ads.value}`;
    discountValue.innerHTML = `-$${discount.value}`;
    categoryValue.innerHTML = category.value;

    getTotal();
    count.style.display = "none";
    createBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Update`;
    scroll({top: 0, left: 0, behavior: 'smooth' });

    document.querySelector(".outputs-section").classList.toggle("hidden");
    document.querySelector(".inputs-section").classList.toggle("hidden");
}


//todo delete one product
function deleteProduct(index) {
    productData.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productData));
    displayProducts();
}

//todo delete all products function
function deleteAll() {
    localStorage.clear();
    productData = [];
    displayProducts();
}

//todo search product
let searchMode = "title";  // Default search mode is by title

searchModeTitle.addEventListener("click", () => {
    searchMode = "title";
    searchInput.placeholder = "Search by Title";
    searchInput.focus();
});

searchModeCategory.addEventListener("click", () => {
    searchMode = "category";
    searchInput.placeholder = "Search by Category";
    searchInput.focus();
});

function searchData(value) {
    let table = '';
    for (let i = 0; i < productData.length; i++) {
        if (searchMode === "title") {
            if (productData[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${productData[i].title}</td>
                    <td>$${productData[i].price}</td>
                    <td>$${productData[i].taxes}</td>
                    <td>$${productData[i].ads}</td>
                    <td>$${productData[i].discount}</td>
                    <td>$${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td><button onclick="updateProduct(${i})"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
                    <td><button onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`;
            }
        } else if (searchMode === "category") {
            if (productData[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${productData[i].title}</td>
                    <td>$${productData[i].price}</td>
                    <td>$${productData[i].taxes}</td>
                    <td>$${productData[i].ads}</td>
                    <td>$${productData[i].discount}</td>
                    <td>$${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td><button onclick="updateProduct(${i})"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
                    <td><button onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

//todo Clear Inputs Function
function clearInputs() {
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("taxes").value = "";
    document.getElementById("ads").value = "";
    document.getElementById("discount").value = "";
    document.getElementById("count").value = "";
    document.getElementById("category").value = "";
}

function showSuccessAlert() {
    Swal.fire({
        title: 'Success!',
        text: 'Your action was successful.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

/* ========== Codes For Moving Between Pages ========== */
dataReview.onclick = function() {
  document.querySelector(".inputs-section").classList.toggle("hidden");
  document.querySelector(".inputs-section").classList.toggle("active");
  document.querySelector(".outputs-section").classList.toggle("hidden");
  document.querySelector(".outputs-section").classList.toggle("active");
}

creationPage.onclick = function() {
  document.querySelector(".outputs-section").classList.toggle("hidden");
  document.querySelector(".inputs-section").classList.toggle("hidden");
}