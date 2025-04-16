export function emptyCartUi() {
  let cart = document.createElement("div");
  cart.className = "empty-cart";
  cart.innerHTML = `
    <img src="/public/assets/images/illustration-empty-cart.svg" alt="empty" class="empty-img" />
    <p class="empty-label">Your added items will appear here</p>`;
  return cart;
}

export function orderUl(order, id) {
  return `
    <li class="order" data-id="${id}">
      <div class="checkout-order-info">
        <p class="order-name">${order.name}</p>
        <div class="order-price-details">
          <p class="order-amount">x${order.amount}</p>
          <p class="order-price">@ $${order.price}</p>
          <p class="order-total">$${order.total}</p>
        </div>
      </div>
      <button class="delete">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
      </button>
    </li>`;
}

export function cartSummarySection(ordersHTML, totalOrdersPrice) {
  let cartSummarySection = document.createElement("div");
  cartSummarySection.className = "cart-summary-section";

  cartSummarySection.innerHTML = `
  <ul class="checkout-order-list">
  ${ordersHTML}
    </ul>
    <div class="order-summary">
      <div class="orders-total">
        <p class="orders-total-label">Order Total</p>
        <p class="orders-total-price">$${totalOrdersPrice}</p>
      </div>
      <div class="carbon-neutral">
        <img
          src="assets/images/icon-carbon-neutral.svg"
          alt="carbon neutral"
        />
        <p class="carbon-text">
          This is a <b>carbon-neutral</b> delivery
        </p>
      </div>
      <button class="confirm-order">Confirm Order</button>
    </div>`;

  return cartSummarySection;
}

export function confirmedOrdersHTML(order) {
  return `
  <li class="confirmed-order">
    <img srcset="${order.img}" alt="${order.category}" class="confirmed-order-img"/>
    <div class="order-info">
      <p class="order-item-name">${order.name}</p>
      <div class="order-item-details">
        <p class="order-item-amount">${order.amount}x</p>
        <p class="order-item-price">@ $${order.price}</p>
      </div>
    </div>
    <p class="order-item-total-price">$${order.total}</p>
  </li>`;
}

export function confirmedOrder(orders, totalOrdersPrice) {
  let confirmedDialog = document.createElement("div");
  confirmedDialog.className = "confirmed-dialog";

  confirmedDialog.innerHTML = `
    <div class="order-confirmation">
      <img
        src="/public/assets/images/icon-order-confirmed.svg"
        alt="confirmed"
      />
      <h1 class="order-confirmation-title">Order Confirmed</h1>
      <p class="confirmed-label">We hope you enjoy your food!</p>
      <ul class="confirmed-orders-list">
        ${orders}
        <li class="total-orders-details">
          <p class="order-total-label">Order Total</p>
          <p class="order-total-price">$${totalOrdersPrice}</p>
        </li>
      </ul>
      <button class="new-order">Start New Order</button>
    </div>`;

  return confirmedDialog;
}
