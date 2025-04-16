import { counterBtn } from "../components/product.js";
import { addProductToOrders } from "./addProductToOrders.js";

export function increment(product) {
  // Change To Counter Btn
  let addBtn = product.querySelector(".product-btn.add");
  if (addBtn) addBtn.outerHTML = counterBtn();

  // Declare Counter Btn
  let btn = product.querySelector(".product-btn.counter");

  let amount = btn.querySelector(".product-amount");

  ++amount.textContent;

  let productName = product.querySelector(".product-name").textContent;
  let productAmount = Number(amount.textContent);
  let productPrice = Number(
    product.querySelector(".product-price").textContent.match(/\d+(\.\d+)?/g)
  );
  let productTotal = productAmount * productPrice;
  let productImg = product.querySelector(".product-img");
  let productId = product.dataset.id;

  productImg.classList.add("active");

  addProductToOrders(
    productName,
    productAmount,
    productPrice,
    productTotal,
    productImg.srcset,
    productId
  );
}
