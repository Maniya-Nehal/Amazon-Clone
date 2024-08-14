import {cart} from '../../data/cart.js'
import { products } from '../../data/products.js';
function priceofproduct(idofproduct){
    const product = products.find(product => product.id === idofproduct);
    return product ? product.priceCents : 0;
        
};

export function renderpayment(){
    let items = 0;
    let shipping = 0;
    let number = 0;
    cart.forEach((cartItems)=>{
        const price = priceofproduct(cartItems.productnames);
        items+= (price*cartItems.quantity);
        if(cartItems.deliveryOptionsId==="2"){
            shipping+=499;

        }else if(cartItems.deliveryOptionsId==="3"){
            shipping+=999;
        }
        number+=1;
    })
    const taxes = ((shipping+items)*10)/100;
    
    document.querySelector(".js-number-items").innerHTML = `Items (${number})`;
    document.querySelector(".js-summary-money").innerHTML = `$${(items/100).toFixed(2)}`;
    //console.log(shipping)
    document.querySelector(".shipping").innerHTML = `$${(shipping/100).toFixed(2)}`;
    document.querySelector(".before-tax").innerHTML = `$${((shipping+items)/100).toFixed(2)}`;
    
    document.querySelector(".tax").innerHTML = `$${(taxes/100).toFixed(2)}`;
    document.querySelector(".total").innerHTML = `$${((taxes+shipping+items)/100).toFixed(2)}`;
    
};
