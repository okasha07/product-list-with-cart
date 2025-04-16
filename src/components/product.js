function responsiveImg(imageSrc, name) {
  const img = document.createElement("img");

  img.alt = name;
  img.src = imageSrc.desktop;
  img.className = "product-img";
  img.loading = "lazy";

  const widths = {
    mobile: 792,
    tablet: 1024,
    desktop: 1200,
  };

  const srcset = Object.keys(imageSrc).map(
    (key) => `${imageSrc[key]} ${widths[key] || 800}w`
  );

  img.setAttribute(
    "sizes",
    `(max-width: 792px) 100vw, (max-width: 1200px) 1024px, 1200px`
  );

  img.srcset = srcset;

  return img;
}

export function cartMediaAction(imageSrc, name, btn) {
  return `
  <div class="cart-media-action">
    ${responsiveImg(imageSrc, name).outerHTML}
    ${btn}
  </div>`;
}

export function addToCartBtn() {
  return `
  <button class="product-btn add" aria-label="Add this product to your cart">
    <img src="assets/images/icon-add-to-cart.svg" />
    <p>Add to Cart</p>
  </button>`;
}

export function counterBtn() {
  return `
  <button class="product-btn counter">
      <svg class="minus" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
      <span class="product-amount">0</span>
      <svg class="plus" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
  </button>`;
}

export function productInfo(name, category, price) {
  return `
  <ul class="product-info">
    <li class="product-category">${category}</li>
    <li class="product-name">${name}</li>
    <li class="product-price">$${price}</li>
  </ul>`;
}

export function createProduct({ image, name, category, price }) {
  let product = document.createElement("div");
  product.className = "product";
  product.dataset.id = Date.now();

  product.innerHTML = `
  ${cartMediaAction(image, name, addToCartBtn())}
  ${productInfo(name, category, price)}
`;
  return product;
}
