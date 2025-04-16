import { confirmedOrder, confirmedOrdersHTML } from "../components/cart.js";
import { orders } from "./addProductToOrders.js";
export function confirmOrders(orders) {
  let ordersHTML = orders.map((order) => confirmedOrdersHTML(order)).join("");

  let totalOrdersPrice = orders.reduce((acc, order) => acc + order.total, 0);

  document.body.append(confirmedOrder(ordersHTML, totalOrdersPrice));
  let confirmedDialog = document.querySelector(".confirmed-dialog");

  confirmedDialog.addEventListener("click", (e) => {
    if (e.target.closest(".new-order")) {
      orders.splice(0);
      confirmedDialog.remove();
      location.reload();
    }
  });
}
