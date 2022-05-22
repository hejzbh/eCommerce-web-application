
import { allProducts } from "./products.js";

class removeFromCart {
    _div = document.querySelector('.added__products');

    constructor(){
  
    }

    _render(fn){
        this._deleteButtons = document.querySelectorAll('.added__product__delete');

        this._enableRemove(fn)
    }

    _enableRemove(fn){
        this._deleteButtons.forEach(btn => btn.addEventListener('click', fn));
    }

    _removeDIV(id){
        const div = this._div.querySelector(`[data-product='${id}']`);
         div.remove();
    }

}

export default new removeFromCart();