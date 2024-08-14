const cart = {cartItems:undefined,
    loadfromstorage(){
        this.cartItems = JSON.parse(localStorage.getItem('carts'));
    if (!this.cartItems) {
        this.cartItems = [];
    }},
    savetoStorage() {
        localStorage.setItem('carts', JSON.stringify(this.cartItems));
    },
    addToCart(productName) {
        let matchingItem = this.cartItems.find(item => item.productnames === productName);
        const selectedQuantity = Number(document.querySelector(`.js-selector-${productName}`).value);
    
        if (matchingItem) {
            matchingItem.quantity += selectedQuantity;
        } else {
            this.cartItems.push({
                productnames: productName,
                quantity: selectedQuantity,
                deliveryOptionsId:'1'
            });
        }
        this.savetoStorage();
    },
    calculateCart() {
        let quantity = 0;
        this.cartItems.forEach(item => {
            quantity += item.quantity;
        });
        if(quantity===0){
            document.querySelector(".cart-quantity").innerHTML = "";
        }else{
        document.querySelector(".cart-quantity").innerHTML = quantity;}
    },
    removeCart(productName) {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.productnames !== productName);
        this.savetoStorage();
    },
    updateQuantity(productid, newQuantity){
        this.cartItems.forEach((items)=>{
            if (items.productnames===productid){
                items.quantity = newQuantity;
                this.savetoStorage();
                return
            }
        })},
    updateDeliveryoption(idProduct, idofoption){
        let matchingItem = this.cartItems.find(item => item.productnames === idProduct);
        matchingItem.deliveryOptionsId = idofoption;
        this.savetoStorage();
    }

    


    

};

cart.loadfromstorage();
console.log(cart)