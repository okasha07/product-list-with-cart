import { orders } from "./addProductToOrders.js";
import { updateCart } from "./updateCart.js";
import { addToCartBtn } from "../components/product.js";

export function remove(orderLi) {
  let orderLiName = orderLi.querySelector(".order-name").textContent;
  let orderIndex = orders.findIndex((order) => order.name === orderLiName);
  let orderId = orders[orderIndex].id;
  let product = document.querySelector(`[data-id="${orderId}"]`);

  product.querySelector(".product-img").classList.remove("active");
  product.querySelector(".product-btn.counter").outerHTML = addToCartBtn();

  orders.splice(orderIndex, 1);

  updateCart(orders);
}
