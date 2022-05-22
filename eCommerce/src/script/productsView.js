import { bookmarkList } from "./bookmark.js";

class productsView{
    _allProducts;
    _othersDIV = document.querySelector('.others');


    _render(allProducts){
        this._allProducts = allProducts;

        this._insertProductsInCategory();
    }

    

    _generateProductsHTML(product){
        return `
        <div class="product" id="${product.id}">
<div class="image">
    <div class="product-interface">
        <button class="bookmark__btn" data-bookmark="${product.id}">${bookmarkList.some(savedProduct=>savedProduct.id===product.id)?'<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>'}</button>
        <button class="quickView" data-product='${product.id}'><i class="fa-solid fa-eye"></i></button>
        <button class="addToCart" data-product='${product.id}'><i class="fa-solid fa-cart-arrow-down"></i></button>
    </div>
    <img src="${product.image}" alt="">
</div>
<div class="product-description">
    <p class="product__title">${product.title}</p>
    <div class="product__price"><s class="old__price">${Math.round(product.price*1.5)}$</s><span class="new__price">${product.price}$</span></div>
</div>
</div>
        `
    }



    _insertProductsInCategory(){
        this._allProducts.forEach(product=> {
            // 1) Get category
            const category = product.category;

            // 2) Make HTML
            const productHTML = this._generateProductsHTML(product);

            // 3) Select correct categoryDIV
           const categoryDIV = document.querySelector(`[data-category="${category}"]`);

            // 4) Category for product exist ? Insert in : else insert in 'others' div;
            categoryDIV ? categoryDIV.insertAdjacentHTML('afterbegin', productHTML) : this._othersDIV.insertAdjacentHTML(`afterbegin`, productHTML);
        });   
    
}

}

export default new productsView();



