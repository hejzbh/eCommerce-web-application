export let allProducts = [];

export const getProducts = async function(){
    try {
        const getAllProducts = await fetch('https://fakestoreapi.com/products');

        if(!getAllProducts.ok) throw new Error(`Nemoguce uzeti podatke`);
 
        const JSONProducts = await getAllProducts.json();

        allProducts = JSONProducts.map(obj =>{
         return {
                ...obj,
                quantity:1,
            }
        });

    }catch(err){
        throw err;
    }
}
