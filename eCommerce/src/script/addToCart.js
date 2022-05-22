
import userInfo from "./userInfo.js";
import removeFromCart from "./removeFromCart.js";

export let addedToCart = [];


 export class addToCart extends userInfo{
     _overlay = document.querySelector('.add__overlay');
     _totalPrice = document.querySelector('.total__price');
     _buttons;
     _newProduct;
     _closeButton = document.getElementById('closeAddToCart');
     _openBtn = document.querySelector('.cart');
     _div = document.querySelector(`.added__products`);

    constructor(){
        super();
        const thisClass = this;

        [this._closeButton,this._openBtn].forEach(btn=>btn.addEventListener('click', this._toggleDIV.bind(this)));

    

    }



    _addToCartHandle(fn){
        this._buttons = document.querySelectorAll('.addToCart');

        this._buttons.forEach(btn=>btn.addEventListener('click', function(e){
            const checkTypeOfButton = e.target.classList.contains('fromPreview');
            const fromPreview = checkTypeOfButton ? true : false;
            e.stopImmediatePropagation();
            fn(e, fromPreview);
        }));


     
    }

    _addedProductHTML(product){
        return `
        <div class="added__product" data-product="${product.id}">
        <img src="${product.image}" alt="">
        <div class="added__product__desc">
            <h4 class="added__product__title">${product.title}</h4>
            <div class="stars">
            ${Array.from({length:product.rating.rate}, (v)=>v).map(rate=>'<i class="fa-solid fa-star"></i>').join('')}
            </div>
            <p class="added__product__price" data-added="${product.id}">${product.price*product.quantity}$</p>
            <div class="added__product__options">
                <input type="number" value="${product.quantity}" min="1" id="${product.id}" class="added__product__quantity">
                <button class="added__product__delete" data-delete="${product.id}" >
                    Delete
                </button>
            </div>
        </div>
    </div>
        `
    }


    _displayInAddedProducts(newProduct, fromUserClick = true){
        this._toggleDIV();
        this._newProduct = newProduct;

        const productExistInCart = addedToCart.find(product => product.id===this._newProduct.id);


        if(productExistInCart && fromUserClick){
            removeFromCart._removeDIV(productExistInCart.id);
        }

        const html = this._addedProductHTML(newProduct);

        this._div.insertAdjacentHTML('afterbegin', html);

    }

    
    

    _total(){
      const total = addedToCart.reduce((totalValue, product)=> totalValue+=product.price*product.quantity, 0);
      
      
      this._totalPrice.textContent = `${total.toFixed(2)}$`;
    }

    _setLocalStorage(){
        localStorage.setItem('productsInCart', JSON.stringify(addedToCart));
    }

    _getLocalStorage(){
        const addedToCartLOCAL = JSON.parse(localStorage.getItem('productsInCart'));

        addedToCartLOCAL ? addedToCart = addedToCartLOCAL : '';
    }


    _toggleDIV(){
        this._overlay.classList.toggle('transform');
    }
}

export default new addToCart();


/*
    _update(currentProduct){
        const newProduct = this._newProduct;
        const curProduct = currentProduct; 


        const newProductHTML = this._addedProductHTML(newProduct);

        const newProductDOM =document.createRange().createContextualFragment(newProductHTML);


        const newProductElements = [...newProductDOM.querySelectorAll('*')];
        newProductElements.splice(0,1);

        const curProductDOM = Array.from(this._div.querySelector(`[data-product="${curProduct.id}"]`).querySelectorAll('*'));


        // treba izbaciti prvi value iz newproducts jer ima viska i onda ne moze pratiti isti redoslijed kao u CURPRODUCT... 
        // dodati previewproduct sa input change auntity i frompreview = true, to cemo uraditi preko klase, pogledati addhandleraddtocart

        newProductElements.forEach((newElement, i)=>{
            const curElement = curProductDOM[i];
            console.log(newElement, curElement);

            if(
                !newElement.isEqualNode(curElement)
             ) {
                curElement.nodeValue = newElement.nodeValue;
             }

        });


    }


      this._closeButton.addEventListener('click', function(e){
            thisClass._toggleDIV();
            e.stopImmediatePropagation(); 
        });

*/