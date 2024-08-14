
export let cart;
loadfromstorage();
export function loadfromstorage(){
    cart = JSON.parse(localStorage.getItem('carts'));
if (!cart) {
    cart = [];
}};
function savetoStorage() {
    localStorage.setItem('carts', JSON.stringify(cart));
}
// Function to add a product to the cart
export function addToCart(productName) {
    let matchingItem = cart.find(item => item.productnames === productName);
    const selectedQuantity = Number(document.querySelector(`.js-selector-${productName}`).value);

    if (matchingItem) {
        matchingItem.quantity += selectedQuantity;
    } else {
        cart.push({
            productnames: productName,
            quantity: selectedQuantity,
            deliveryOptionsId:'1'
        });
    }
    savetoStorage();
}
// Function to calculate and display the cart quantity
export function calculateCart() {
    let quantity = 0;
    cart.forEach(item => {
        quantity += item.quantity;
    });
    if(quantity===0){
        document.querySelector(".cart-quantity").innerHTML = "";
    }else{
    document.querySelector(".cart-quantity").innerHTML = quantity;}
}

// Function to remove an item from the cart
export function removeCart(productName) {
    cart = cart.filter(cartItem => cartItem.productnames !== productName);
    savetoStorage();
}
export function updateQuantity(productid, newQuantity){
    cart.forEach((items)=>{
        if (items.productnames===productid){
            items.quantity = newQuantity;
            savetoStorage();
            return
        }
    })
}
export function updateDeliveryoption(idProduct, idofoption){
    let matchingItem = cart.find(item => item.productnames === idProduct);
    matchingItem.deliveryOptionsId = idofoption;
    savetoStorage();
}