import { cartSummarySection, emptyCartUi } from "../components/cart.js";
import { orderUl } from "../components/cart.js";

export function updateCart(orders) {
  let cart = document.querySelector(".cart");
  let emptyCart = document.querySelector(".empty-cart");
  let cartUl = document.querySelector(".cart-summary-section");
  let cartAmount = document.querySelector(".cart-amount");

  let totalOrdersPrice = orders.reduce((acc, order) => acc + order.total, 0);
  let totalCartAmount = orders.reduce((acc, order) => acc + order.amount, 0);

  cartAmount.textContent = `Your Cart (${totalCartAmount})`;

  if (orders.length > 0) {
    if (emptyCart) emptyCart.remove();
    if (cartUl) cartUl.remove();

    let ordersHTML = orders.map((order) => orderUl(order, order.id)).join("");
    cart.appendChild(cartSummarySection(ordersHTML, totalOrdersPrice));
  } else {
    cartUl.remove();
    cart.appendChild(emptyCartUi());
  }
}
