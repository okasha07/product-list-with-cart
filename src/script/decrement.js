import { addProductToOrders } from "./addProductToOrders.js";
import { addToCartBtn } from "../components/product.js";
import { updateCart } from "./updateCart.js";

// export function decrement(product) {
//   // Change To Counter Btn
//   let addBtn = product.querySelector(".product-btn.add");
//   if (addBtn) addBtn.outerHTML = counterBtn();

//   // Declare Counter Btn
//   let btn = product.querySelector(".product-btn.counter");

//   let amount = btn.querySelector(".product-amount");

//   let productImg = product.querySelector(".product-img");

//   let productName = product.querySelector(".product-name").textContent;
//   let productAmount = Number(amount.textContent);
//   let productPrice = Number(
//     product.querySelector(".product-price").textContent.match(/\d+(\.\d+)?/g)
//   );
//   let productTotal = productAmount * productPrice;

//   if (amount.textContent > 0) {
//     --amount.textContent;

//     addProductToOrders(
//       productName,
//       productAmount,
//       productPrice,
//       productTotal,
//       productImg.srcset
//     );
//   } else {
//     btn.outerHTML = addToCartBtn();
//     productImg.classList.remove("active");
//     updateCart();
//   }
//   if (Number(amount.textContent) === 0) {
//     btn.outerHTML = addToCartBtn();
//     productImg.classList.remove("active");
//     addProductToOrders(productName, 0, productPrice, 0, productImg.srcset);
//   }
// }

// عندي سؤالين لي في الكود الي فوق مش شغال وليه العدد بتاع الكارت سابق ب 1 واي فايدة ال ELSE & IN nUMBER(AMOUNT)  واي الي فرق بين الكود الأولاني والتاني في نقطة اتنين IF او IF AND ELSE

export function decrement(product) {
  // Change To Counter Btn
  let addBtn = product.querySelector(".product-btn.add");
  if (addBtn) addBtn.outerHTML = counterBtn();

  // Declare Counter Btn
  let btn = product.querySelector(".product-btn.counter");

  let amount = btn.querySelector(".product-amount");

  let productImg = product.querySelector(".product-img");

  let productName = product.querySelector(".product-name").textContent;
  let productAmount = Number(amount.textContent);
  let productPrice = Number(
    product.querySelector(".product-price").textContent.match(/\d+(\.\d+)?/g)
  );
  let productTotal = productAmount * productPrice;
  let productId = product.dataset.id;

  if (amount.textContent >= 1) {
    --amount.textContent;
    --productAmount;

    addProductToOrders(
      productName,
      productAmount,
      productPrice,
      productTotal,
      productImg.srcset,
      productId
    );
  }
  if (amount.innerHTML < 1) {
    btn.outerHTML = addToCartBtn();
    productImg.classList.remove("active");
  }
}
