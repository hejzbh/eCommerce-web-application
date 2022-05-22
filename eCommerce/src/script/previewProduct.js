import { allProducts } from "./products.js";

class previewProduct {
    _buttons;
    _overlay = document.querySelector('.preview__product__overlay');
    _div = document.querySelector('.preview__product');
    _closeBtn = document.querySelector('.close__preview');

    constructor(){
 
        this._closeBtn.addEventListener('click', this._toggleDiv.bind(this));
        
    
    }

    _previewHandle(fn){
        this._buttons = document.querySelectorAll('.quickView');
        this._buttons.forEach(btn=>btn.addEventListener('click', fn));
    }

    

    _showPreviewDetails(id){
        const findProductByID = allProducts.find(product=>product.id===id);
    
        const html = this._makePreviewHTML(findProductByID);

        this._clear();

        this._div.insertAdjacentHTML('afterbegin', html);

        this._toggleDiv();
        
    }

    _makePreviewHTML(product){
        return `
        <div class="preview__product__image">
        <img src="${product.image}" data-name="image">
    </div>
    <div class="preview__product__right">
        <div class="preview__product__description">
            <h2 class="preview__product__title" data-name="title">${product.title}</h2>
            <p class="preview__product__price" data-name="price">${product.price}$</p>
            <p class="preview__product__shortdesc" data-name="description">${product.description}</p>
        </div>
        <div class="preview__product__bottom">
            <input type="number" min="1" value="${product.quantity}" id="${product.id}" class="preview__product__quantity">
            <button class="addToCart fromPreview" data-product="${product.id}">Add to cart</button>
        </div>
    </div>`
    }

    _toggleDiv(){
        this._overlay.classList.toggle('hidden');
    }

    _clear(){
        this._div.innerHTML = '';
    }
}


export default new previewProduct();