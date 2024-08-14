
import { updateQuantity, cart, removeCart,updateDeliveryoption } from '../../data/cart.js';
import { products } from '../../data/products.js';
//import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';//default export
import { deliveryOptions, deliveryoptionhtml } from '../../data/deliveryOptions.js'
import { renderpayment } from './paymentsummary.js';
import { calculateItem } from './checkoutHeader.js';


export function renderordersummary() {
  function days(matching, cartItem) {
    let deliveryhtml = "";
    deliveryOptions.forEach((deliveryoption) => {
      const dateString = deliveryoptionhtml(deliveryoption);
      const priceCents = deliveryoption.priceCents === 0 ? 'Free' : (deliveryoption.priceCents / 100).toFixed(2);
      const ischecked = deliveryoption.id === cartItem.deliveryOptionsId;
      deliveryhtml += `<div class="delivery-option js-delivery-option" data-product-id="${matching.id}" data-delievry-option = "${deliveryoption.id}">
            <input type="radio" ${ischecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matching.id}">
            <div>
              <div class="delivery-option-date">
                  ${dateString}          </div>
              <div class="delivery-option-price">
                ${priceCents} - Shipping
              </div>
            </div>
          </div>`
    })
    return deliveryhtml;


  }



  let html = "";
  let matching;
  //console.log(cart);
  cart.forEach((cartItem) => {
    const productId = cartItem.productnames;
    
    products.forEach((value) => {
      if (value.id === productId) {
        matching = value;
      }
    });
    const deliveryoptionid = cartItem.deliveryOptionsId;
    let deliverys;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryoptionid) {
        deliverys = option;
        return
      }
    });
    
    const dateString = deliveryoptionhtml(deliverys);
    //console.log(matching);
    html += `<div class="cart-item-container js-container-${matching.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matching.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matching.name}
        </div>
        <div class="product-price">
          $${(matching.priceCents / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matching.id}">${cartItem.quantity}</span>
          </span>
          <input class="quantity-input js-quantity-input-${matching.id}" data-product-id="${matching.id}"> </input>
          <span class="save-quantity-link link-primary" data-product-id="${matching.id}">Save</span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matching.id}">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matching.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${days(matching, cartItem)}
        
        
        
      </div>
    </div>
  </div>`
  });

  document.querySelector(".order-summary").innerHTML = html;
  calculateItem();
  document.querySelectorAll(".js-delete-link").forEach((button) => {
    button.addEventListener("click", () => {
      const buttonid = button.dataset.productId;
      removeCart(buttonid);
      const container = document.querySelector(`.js-container-${buttonid}`);
      container.remove();
      calculateItem();

      renderpayment();
    });
  });
  // function calculateItem() {
  //   let items = 0;
  //   cart.forEach(item => {
  //     items += item.quantity;
  //   });

  //   document.querySelector(".js-cart-quantity").innerHTML = `${items} items`;
  // }
  document.querySelectorAll(".js-update-link").forEach((update) => {
    update.addEventListener("click", () => {
      const prodId = update.dataset.productId;
      console.log(prodId);
      const cont = document.querySelector(`.js-container-${prodId}`);
      cont.classList.add("is-editing-quantity");

    });
  });
  function saveFunction(buttonId) {


    const editedContainer = document.querySelector(`.js-container-${buttonId}`);
    editedContainer.classList.remove("is-editing-quantity");
    const inputquantity = Number(document.querySelector(`.js-quantity-input-${buttonId}`).value);
    if (inputquantity >= 0 && inputquantity <= 1000) {
      updateQuantity(buttonId, inputquantity);
      document.querySelector(`.js-quantity-label-${buttonId}`).innerHTML = inputquantity;
      calculateItem();
    }
    else {
      alert("Products quantity should be within 0-1000")
    }
  }
  document.querySelectorAll(".save-quantity-link").forEach((saveButton) => {
    saveButton.addEventListener("click", () => {
      const buttonId = saveButton.dataset.productId;
      saveFunction(buttonId);
    })
  })
  document.querySelectorAll(".quantity-input").forEach((saveinput) => {
    saveinput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const inputbuttonid = saveinput.dataset.productId;
        saveFunction(inputbuttonid);
      }

    });
  })

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const dofoption = element.dataset.delievryOption;
      const idofproduct = element.dataset.productId;
      updateDeliveryoption(idofproduct, dofoption);
      renderordersummary();
      renderpayment();
    });
  })
}
