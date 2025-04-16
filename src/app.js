import { fetchData } from "./script/fetchData.js";
import { createProduct } from "./components/product.js";
import { increment } from "./script/increment.js";
import { decrement } from "./script/decrement.js";
import { remove } from "./script/deleteOrder.js";
import { confirmOrders } from "./script/confirmOrder.js";
import { orders } from "./script/addProductToOrders.js";

fetchData().then((data) => {
  let productsData = [];

  // Handle Data
  data.forEach((element) => {
    productsData.push(element);
  });

  let fragment = document.createDocumentFragment();
  let productHolder = document.querySelector(".product-holder");
  let cart = document.querySelector(".cart");

  productsData.forEach((product) =>
    fragment.appendChild(createProduct(product))
  );

  productHolder.appendChild(fragment);

  productHolder.addEventListener("click", (e) => {
    if (e.target.closest(".add") || e.target.closest(".plus")) {
      let product = e.target.closest(".product");
      increment(product);
    } else if (e.target.closest(".add") || e.target.closest(".minus")) {
      let product = e.target.closest(".product");
      decrement(product);
    }
  });

  cart.addEventListener("click", (e) => {
    if (e.target.closest(".delete")) {
      remove(e.target.closest(".order"));
    } else if (e.target.closest(".confirm-order")) {
      confirmOrders(orders);
    }
  });
});
