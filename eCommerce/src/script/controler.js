//--------------------------
//   - - -  IMPORT - - -
//--------------------------


// - GET products from API
import * as productsModul from "./products.js";

// Nav functions (INIT)
import navigation from './navigation.js';

// Slider
import {moveSlide as heroSlider, goToNextSlide, goToPerviousSlide, btnSlideLeft, btnSlideRight} from './slider.js';

// All classes
import productsViewClass from "./productsView.js";
import addToCartClass from "./addToCart.js";
import changeQuantityClass from './changeQuantity.js';
import previewProductClass from "./previewProduct.js";
import removeFromCart from "./removeFromCart.js";
import bookmarkClass from "./bookmark.js";

// Get local storage
addToCartClass._getLocalStorage();
bookmarkClass._getLocalStorage();


import {addedToCart} from "./addToCart.js";
import { bookmarkList } from "./bookmark.js";




////////////////////////////
// ✅ BOOKMARK FUNCTION  #1
////////////////////////////

const bookmark = function(e){

// 1) Get BTN
const btn = e.target.closest('.bookmark__btn');

// 2) Get ID
const productID = +btn.dataset.bookmark;

// 3) Find product by ID
const product = productsModul.allProducts.find(product=>product.id===productID);

// 4) Push product in bookmark if bookmark not includes it.
const productExistInBookmark = bookmarkList.find(bookmarkProduct=>bookmarkProduct.id===product.id);

// 5) productExist ? - remove from data and remove SOLID icon : >>>>ELSE - add to data and set SOLID icon
if(productExistInBookmark){
    btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
    const index = bookmarkList.indexOf(productExistInBookmark);
    
    bookmarkList.splice(index, 1);
} else {
    btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
    bookmarkList.push(product);
}

// 6) Local storage
bookmarkClass._setLocalStorage();

// 7) Update DOM
bookmarkClass._insertInBookmarkDOM();

};





////////////////////////////
// ✅ ChangeQuantity FUNCTION  #2
////////////////////////////
const changeQuantity = function(e){

    // 1) Get input by e.target
    const inputChangeQuantity = e.target;

    // 2) Get value from that input (quantity)
    const quantity = +inputChangeQuantity.value;
    
    // 3) Find product with same ID (product===input.id)

    const product = addedToCart.find(product => product.id === +inputChangeQuantity.id);
    if(!product) return;
    
    // 4) Update quantity of that product
    product.quantity = quantity;

    document.querySelector(`[data-added="${inputChangeQuantity.id}"]`).textContent = (product.price*product.quantity).toFixed(2) + '$';
    
    // 5) Calculate total
    addToCartClass._total();

    // 6) Local storage
    addToCartClass._setLocalStorage();
    }




/////////////////////////////////////
// ✅ DeleteFromCart FUNCTION  #3
/////////////////////////////////////
  
const deleteFromCart = function(e){
    
        const btn = e.target;

        const productID = +btn.dataset.delete;

        const productIndex = addedToCart.findIndex(product=>product.id===productID);

        const product = productsModul.allProducts.find(product=>product.id===productID);

        product.quantity = 1;

        // Delete from cart
        addedToCart.splice(productIndex, 1);

        // Delete from DOM
        removeFromCart._removeDIV(productID);

        // Update total

        addToCartClass._total();

        // Local storage
        addToCartClass._setLocalStorage();


      
    };
    
    


/////////////////////////////////////
// ✅ Add To Cart FUNCTION  #4
/////////////////////////////////////
    
const addToCart = function(e, quickView = false){4

    // 1) Get btn 
    const btn = e.target.closest('.addToCart');

    // 2) Get product ID by attribute of btn

    const productID = btn.getAttribute('data-product');

    // 3) Find product
    const findProduct = productsModul.allProducts.find(product=>product.id===+productID);
  
    // Two types of addToCart btns (one from addedToCart section, second one from quickView product - where we can modify quantity)
    if(quickView) {
        const quantity = Array.from(document.querySelectorAll('.preview__product__quantity')).find(quantityInput => quantityInput.id===productID).value;
       

        findProduct.quantity = +quantity;    
  
    } 
  
  
    // 4) Display product in addedProducts section (cart)
    addToCartClass._displayInAddedProducts(findProduct);
   
    // NO DUPLICATE 
    let productExist = addedToCart.find(product=>product.id===findProduct.id);
    
     // 5) Push product in cart object
    productExist ? productExist = findProduct : addedToCart.push(findProduct);;

  
    // 6) Enable modify quantity in cart
    changeQuantityClass._changeQuantityHandler(changeQuantity);

    // 7) Calculate total
    addToCartClass._total();

    // Enable remove from cart
    removeFromCart._render(deleteFromCart);
    
    // Set local storage
    addToCartClass._setLocalStorage();
      
  };



/////////////////////////////////////
// ✅ Preview (quickView) FUNCTION  #5
/////////////////////////////////////

const previewClickedProduct = function(e){
    const btn = e.target.closest('.quickView');
    if(!btn) return;

    const productID = +btn.dataset.product;

    previewProductClass._showPreviewDetails(productID);

    addToCartClass._addToCartHandle(addToCart);

}


///////////////////////////////////////
// ✅ Load All Products  FUNCTION  #5
///////////////////////////////////////

const loadAllProducts = async function(){
    try {

        // Get all products
        await productsModul.getProducts();

        // Render all products
        productsViewClass._render(productsModul.allProducts);

    } catch(err){
        alert('cant load products');
    }
};



// INIT (refresh-start loading)

(async () => {

    heroSlider();
    btnSlideRight.addEventListener('click', goToNextSlide);
    btnSlideLeft.addEventListener('click', goToPerviousSlide);

    await loadAllProducts();

    bookmarkClass._enableBookmark(bookmark);
    addToCartClass._addToCartHandle(addToCart);
    bookmarkClass._insertInBookmarkDOM();

    addedToCart.forEach(product=>{
        addToCartClass._displayInAddedProducts(product, false);
        removeFromCart._render(deleteFromCart);
        changeQuantityClass._changeQuantityHandler(changeQuantity);
    });

    previewProductClass._previewHandle(previewClickedProduct);
})();