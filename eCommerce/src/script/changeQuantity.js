
class changeQuantityClass {

    _changeQuantityInputs;

    _changeQuantityHandler(fn){
    this._changeQuantityInputs = document.querySelectorAll('.added__product__quantity');

    this._changeQuantityInputs.forEach(input=>input.addEventListener('change', fn));
    }
}


export default new changeQuantityClass();