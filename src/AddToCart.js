import cartProducts from './CartProducts';


function addToCart(product, operation) {
    if (operation === "plus") {
        if (cartProducts.filter((item) => item.id === product.id).length > 0) {
            const existingProduct = cartProducts.find((item) => item.id === product.id);
            // console.log(existingProduct);
            existingProduct.quantity += 1;
        }
        else {
            product.quantity = 1;
            cartProducts.push(product);
        }

    }
    else if (operation === "minus") {
        if (cartProducts.filter((item) => item.id === product.id).length > 0) {
            const existingProduct = cartProducts.find((item) => item.id === product.id);
            existingProduct.quantity -= 1;
            if (existingProduct.quantity <= 0) {
                cartProducts.splice(product, 1);
            }
        }

    }
    else{
        return cartProducts.length;
    }
    // console.log(cartProducts);  
}

export default addToCart;