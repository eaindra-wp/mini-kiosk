import cartProducts from './CartProducts';

var totalPrice = 0; 

const loadTotalPrice = () => {
    cartProducts.map((product, index) => {
        totalPrice = totalPrice + (product.price * product.quantity); 
    });
    return totalPrice.toFixed(2);
}

export default loadTotalPrice; 