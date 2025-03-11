let productsGrid = document.getElementById("products");
let orders = [];

getData();

async function getData() {
  try {
    let productsResponse = await fetch("./data.json");
    let data = await productsResponse.json();

    productsGrid.innerHTML = "";

    let fragment = document.createDocumentFragment();

    data.forEach((product) => {
      fragment.appendChild(
        createProducts(
          product.category,
          product.name,
          product.price,
          product.image
        )
      );
    });
    productsGrid.appendChild(fragment);
  } catch (error) {
    throw new Error(error);
  }
}

function createProducts(cat, productName, productPrice, imageObj) {
  const product = document.createElement("div");
  product.className = "product";

  const picture = document.createElement("div");
  picture.className = "picture relative mb-8 w-full";

  const img = createResponsiveImages(imageObj, productName);

  const button = document.createElement("button");
  button.className =
    "flex items-center add-to-cart bg-white transition-all hover:border-rose-700 hover:text-red gap-2 justify-center p-2 w-4/5 rounded-full border-solid border select-none border-rose-400 absolute left-1/2 -translate-x-1/2 -bottom-5";
  button.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="add to cart" /><span class="font-normal text-rose-800" >Add to Cart</span>`;

  picture.append(img, button);
  product.appendChild(picture);

  const info = document.createElement("div");
  info.className = "info";

  const category = document.createElement("p");
  category.className = "category text-rose-500 text-sm";
  category.textContent = cat;

  const name = document.createElement("p");
  name.className = "name text-rose-900 font-semibold text-lg";
  name.textContent = productName;

  const price = document.createElement("p");
  price.className = "price text-red font-semibold";
  price.textContent = `$${productPrice}`;

  info.append(category, name, price);
  product.appendChild(info);

  return product;
}

productsGrid.addEventListener("click", (e) => {
  if (e.target.closest(".add-to-cart")) {
    transformToCounterBtn(e.target.closest(".add-to-cart"));
  }
  if (e.target.closest(`.plus`)) {
    increaseAmount(e.target.closest("button"));
  }
  if (e.target.closest(`.minus`)) {
    decrementAmount(e.target.closest("button"));
  }
});

function transformToCounterBtn(btn) {
  let picture = btn.parentElement;
  picture.className = `picture relative mb-8 w-full border-2 rounded-lg border-red`;

  btn.innerHTML = "";

  let minus = document.createElement("span");
  minus.className =
    "minus rounded-[50%] border border-white hover:bg-white hover:text-red font-semibold border-solid w-5 h-5 flex justify-center items-center";
  minus.textContent = "-";

  let count = document.createElement("span");
  count.className = "amount";
  count.textContent = 0;
  ++count.innerHTML;

  let plus = document.createElement("span");
  plus.className =
    "plus rounded-[50%] border border-white hover:bg-white hover:text-red font-semibold border-solid w-5 h-5 flex justify-center items-center";
  plus.textContent = "+";

  btn.className =
    "flex items-center absolute left-1/2 -translate-x-1/2 -bottom-5 justify-between w-4/5 mx-auto bg-white border border-rose-400 py-2 px-5 rounded-full hover:bg-red hover:text-white";

  btn.append(minus, count, plus);

  let name = btn.closest(".product").querySelector(".info .name").innerHTML;
  let price = btn
    .closest(".product")
    .querySelector(".info .price")
    .innerHTML.trim()
    .replace(/[^0-9.]/g, "");

  let total = parseFloat(price);

  let productElement = btn.closest(".product");
  let imageElem = productElement.querySelector(".picture img");
  let imageUrl = imageElem ? imageElem.src : "";

  addOrderToOrders(name, 1, price, total, imageUrl);

  updateCart();

  return btn;
}

function increaseAmount(btn) {
  let amount = btn.querySelector(".amount");

  amount.textContent = parseInt(amount.textContent) + 1;

  let amountValue = parseInt(amount.textContent);

  let name = btn.closest(".product").querySelector(".info .name").innerHTML;

  let price = btn
    .closest(".product")
    .querySelector(".info .price")
    .innerHTML.trim()
    .replace(/[^0-9.]/g, "");

  let total = amount.innerHTML * price;

  addOrderToOrders(name, amountValue, price, total);
}

function decrementAmount(btn) {
  let amount = btn.querySelector(".amount");
  if (amount.innerHTML >= 1) {
    --amount.innerHTML;

    let name = btn.closest(".product").querySelector(".info .name").innerHTML;
    let amountValue = parseInt(amount.textContent);
    let price = btn
      .closest(".product")
      .querySelector(".info .price")
      .innerHTML.trim()
      .replace(/[^0-9.]/g, "");
    let total = amount.innerHTML * price;

    addOrderToOrders(name, amountValue, price, total);
  }
  if (amount.innerHTML < 1) {
    btn.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="add to cart" /><span class="font-normal text-rose-800" >Add to Cart</span>`;
    btn.className = `flex items-center add-to-cart bg-white transition-all hover:border-rose-700 hover:text-red gap-2 justify-center p-2 w-4/5 rounded-full border-solid border select-none border-rose-400 absolute left-1/2 -translate-x-1/2 -bottom-5`;
    btn.parentElement.className = "picture relative mb-8 w-full";
  }
}

function addOrderToOrders(name, amount, price, total, img) {
  let existingOrder = orders.find((order) => order.name === name);

  if (existingOrder) {
    existingOrder.amount = amount;
    existingOrder.total = total;

    if (existingOrder.amount < 1) {
      let orderName = existingOrder.name;
      orders = orders.filter((order) => {
        return order.name != orderName;
      });
    }
  } else {
    orders.push({ name, amount, price, total, img });
  }
  updateCart();
}

function updateCart() {
  let cartContainer = document.querySelector(".cart");

  let cart = document.querySelector(".cart-orders");
  cart.innerHTML = "";
  cart.className = `flex flex-col w-full h-full max-h-fit cart-orders`;

  cartContainer.className = `cart bg-white p-6 rounded-lg max-w-sm w-full max-h-fit min-h-64`;

  let ordersPriceTotal = orders.reduce((acc, order) => acc + order.total, 0);

  let totalCartAmount = orders.reduce(
    (acc, order) => acc + parseInt(order.amount),
    0
  );
  let cartAmount = document.querySelector(".cart h1");
  cartAmount.innerHTML = `Your Cart (${totalCartAmount})`;

  orders.forEach((order) => {
    let orderDiv = document.createElement("div");
    orderDiv.className = `order mb-7 flex items-center justify-between w-full after:border after:absolute relative after:left-0 after:-bottom-2 after:w-full after:opacity-25`;

    let orderDetails = document.createElement("div");
    orderDetails.className = "order-details";

    let orderNameElement = document.createElement("h1");
    orderNameElement.className = "order-name text-rose-500";
    orderNameElement.textContent = order.name;

    let detailsContainer = document.createElement("div");
    detailsContainer.className = "flex items-center gap-2";

    let amountSpan = document.createElement("span");
    amountSpan.className = "text-red font-semibold";
    amountSpan.textContent = `${order.amount}x`;

    let priceWrapper = document.createElement("span");
    priceWrapper.className = "text-[#b9afb0] text-[12px]";
    priceWrapper.innerHTML = `@ <span class="init-price text-product">${order.price}</span>`;

    let totalSpan = document.createElement("span");
    totalSpan.className = "total text-[#b9afb0] font-semibold";
    totalSpan.textContent = `$${order.total}`;

    let removeIcon = document.createElement("img");
    removeIcon.src = "./assets/images/icon-remove-item.svg";
    removeIcon.alt = "remove icon";
    removeIcon.className =
      "w-6 h-6 border-2 rounded-[50%] p-1 border-[#b9afb0] hover:invert hover:cursor-pointer transition-all";

    removeIcon.addEventListener("click", (e) => {
      let element = e.target.closest(".order");
      let orderName = element.querySelector(".order-name").innerHTML;

      orders = orders.filter((item) => {
        return item.name != orderName;
      });

      element.remove();

      let product = [...document.querySelectorAll(".product")].find(
        (p) => p.querySelector(".name").innerHTML === orderName
      );

      if (product) {
        let btn = product.querySelector(".flex.items-center");
        if (btn) {
          btn.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="add to cart" />
            <span class="font-normal text-rose-800">Add to Cart</span>`;
          btn.className = `flex items-center add-to-cart bg-white transition-all hover:border-rose-700 hover:text-red gap-2 justify-center p-2 w-4/5 rounded-full border-solid border select-none border-rose-400 absolute left-1/2 -translate-x-1/2 -bottom-5`;
          btn.parentElement.className = "picture relative mb-8 w-full";
        }
      }
      updateCart();
    });

    detailsContainer.append(amountSpan, priceWrapper, totalSpan);
    orderDetails.append(orderNameElement, detailsContainer);
    orderDiv.append(orderDetails, removeIcon);

    cart.appendChild(orderDiv);
  });

  let ordersDetails = document.createElement("div");

  let ordersTotal = document.createElement("div");
  ordersTotal.className = "flex items-center justify-between";

  let orderTotalSpan = document.createElement("span");
  orderTotalSpan.innerHTML = "Order Total";
  orderTotalSpan.className = `order-total text-sm font-semibold"`;

  let totalSpan = document.createElement("span");
  totalSpan.className = `total-price font-bold text-[1.3rem]`;
  totalSpan.innerHTML = `$${ordersPriceTotal}`;

  ordersTotal.append(orderTotalSpan, totalSpan);

  let carbon = document.createElement("div");
  carbon.innerHTML = `
            <img src="./assets/images/icon-carbon-neutral.svg" alt="carbon" />
            <p>This is a <span class="font-semibold">carbon-neutral</span> delivery</p>`;

  carbon.className = `bg-rose-50 flex items-center p-3 rounded-md justify-center gap-x-2 my-4`;

  let confirmBtn = document.createElement("button");
  confirmBtn.innerHTML = "Confirm";
  confirmBtn.className =
    "text-white bg-red text-center font-semibold w-full p-3 rounded-full hover:bg-rose-900 transition-colors confirm";

  confirmBtn.onclick = confirmOrder;

  ordersDetails.append(ordersTotal, carbon, confirmBtn);

  cart.appendChild(ordersDetails);
}

function confirmOrder() {
  let overlay = document.createElement("div");
  overlay.className =
    "fixed w-full min-h-screen left-0 top-0 backdrop-saturate-100 backdrop-blur-sm";
  document.body.appendChild(overlay);

  let orderConfirmed = document.createElement("div");
  orderConfirmed.className =
    "order-confirmed z-10 p-4 bg-white absolute z-20 left-1/2 top-[50px] -translate-x-1/2  w-[400px] max-md:w-[350px] rounded-lg";

  let orderImg = document.createElement("img");
  orderImg.src = `./assets/images/icon-order-confirmed.svg`;
  orderImg.alt = "Order Confirmed";

  let orderTitle = document.createElement("h1");
  orderTitle.className = "text-[2rem] font-semibold mt-3";
  orderTitle.textContent = "Order Confirmed";

  let orderText = document.createElement("p");
  orderText.className = "text-red-200 mb-5";
  orderText.textContent = "We hope you enjoy your food!";

  let confirmedOrdersDiv = document.createElement("div");
  confirmedOrdersDiv.className =
    "confirmed-orders bg-rose-50 p-3 rounded-t-md pb-1";

  orders.forEach((order) => {
    let orderDiv = document.createElement("div");
    orderDiv.className =
      "order flex mb-3 items-center justify-between mt-1 relative after:w-full after:h-[1px] after:-bottom-1 after:left-0 after:bg-[lightgrey] after:absolute";

    let orderImg = document.createElement("img");
    orderImg.src = order.img;
    orderImg.alt = `${order.name} Thumbnail`;
    orderImg.className = "max-w-12 rounded-md";

    let infoDiv = document.createElement("div");
    infoDiv.className = "info w-full ml-3";

    let orderName = document.createElement("h2");
    orderName.className = "name";
    orderName.textContent = order.name;

    let orderAmount = document.createElement("p");
    orderAmount.className = "amount text-red";
    orderAmount.innerHTML = `${order.amount}x <span class="price text-rose-500 ml-3">@ $${order.price}</span>`;

    infoDiv.appendChild(orderName);
    infoDiv.appendChild(orderAmount);

    let totalP = document.createElement("p");
    totalP.className = "total font-semibold";
    totalP.textContent = `$${order.total}`;

    orderDiv.appendChild(orderImg);
    orderDiv.appendChild(infoDiv);
    orderDiv.appendChild(totalP);

    confirmedOrdersDiv.appendChild(orderDiv);
  });

  let newOrderButton = document.createElement("button");
  newOrderButton.className =
    "new-order bg-red text-white rounded-full text-center font-semibold w-full p-3 mt-5";
  newOrderButton.id = "newOrder";
  newOrderButton.textContent = "Start New Order";

  newOrderButton.addEventListener("click", function () {
    orders = [];
    let cart = document.querySelector(".cart");
    cart.innerHTML = `
            <h1 class="text-red text-[1.5rem] font-bold mb-4 total-orders">Your Cart (0)</h1>
        <div class="flex justify-center items-center flex-col w-full h-full cart-orders">
          <img src="./assets/images/illustration-empty-cart.svg"alt="empty cart"/>
          <p class="text-rose-500 font-semibold text-[14px]">Your added items will appear here</p> </div>`;

    cart.className =
      "cart bg-white p-6 rounded-lg max-w-sm w-full max-h-72 min-h-64";

    this.parentElement.remove();
    overlay.remove();
    getData();
  });

  let ordersTotal = document.createElement("div");
  ordersTotal.className =
    "flex items-start font-semibold justify-between bg-rose-50 p-3 rounded-b-lg";

  let orderTotal = document.createElement("p");
  orderTotal.innerHTML = "Order Total";
  orderTotal.className = "font-[14px] text-rose-900";

  let ordersTotalPrice = document.createElement("p");
  let TotalPrice = orders.reduce((acc, order) => {
    return acc + order.total;
  }, 0);
  ordersTotalPrice.innerHTML = `$${TotalPrice}`;
  orderTotal.className = "font-[14px] text-rose-900";

  ordersTotal.append(orderTotal, ordersTotalPrice);

  orderConfirmed.append(
    orderImg,
    orderTitle,
    orderText,
    confirmedOrdersDiv,
    ordersTotal,
    newOrderButton
  );

  document.body.appendChild(orderConfirmed);
}

function createResponsiveImages(imageObj, productName) {
  const img = document.createElement("img");

  img.alt = productName;
  img.className = "rounded-lg w-full";
  img.setAttribute("loading", "lazy");

  const widths = {
    mobile: 792,
    tablet: 1024,
    desktop: 1200,
  };

  const srcset = Object.keys(imageObj)
    .map((key) => `${imageObj[key]} ${widths[key] || 800}w`)
    .join(", ");

  img.srcset = srcset;

  img.setAttribute(
    "sizes",
    `(max-width: 792px) 100vw, (max-width: 1200px) 1024px, 1200px`
  );

  img.src = imageObj.desktop;

  return img;
}
