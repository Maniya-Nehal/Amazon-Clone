import { cart } from "../../data/cart.js";
export function calculateItem() {
    let items = 0;
    cart.forEach(item => {
      items += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = `${items} items`;
  }