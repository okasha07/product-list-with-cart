import { updateCart } from "./updateCart.js";

export const orders = [];

export function addProductToOrders(name, amount, price, total, img, id) {
  let existingOrder = orders.findIndex((order) => order.name === name);

  if (orders[existingOrder]) {
    orders[existingOrder].amount = amount;
    orders[existingOrder].total = total;

    if (orders[existingOrder].amount == 0) {
      orders.splice(existingOrder, 1);
    }
  } else {
    orders.push({ name, amount, price, total, img, id });
  }

  updateCart(orders);
}
