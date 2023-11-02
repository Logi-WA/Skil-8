import { formatNumber } from "./helpers.js";
import { updateTotalPrice } from "../main.js";

/** Býr til nýja línu aftast í körfu */
export function createCartLine(product, quantity) {
  // TODO útfæra þannig að búin sé til lína í körfu á forminu:

  const tr = document.createElement("tr");
  tr.setAttribute("data-cart-product-id", product.id);

  const nameTd = document.createElement("td");
  nameTd.textContent = product.title;
  tr.appendChild(nameTd);

  const quantityTd = document.createElement("td");
  quantityTd.textContent = quantity;
  tr.appendChild(quantityTd);

  const priceTd = document.createElement("td");
  const priceSpan = document.createElement("span");
  priceSpan.classList.add("price");
  priceSpan.textContent = formatNumber(product.price);
  priceTd.appendChild(priceSpan);
  tr.appendChild(priceTd);

  const totalPriceTd = document.createElement("td");
  const totalPriceSpan = document.createElement("span");
  totalPriceSpan.classList.add("price");
  totalPriceSpan.textContent = formatNumber(product.price * quantity);
  totalPriceTd.appendChild(totalPriceSpan);
  tr.appendChild(totalPriceTd);

  const removeTd = document.createElement("td");
  const removeForm = document.createElement("form");
  removeForm.classList.add("remove");
  removeForm.setAttribute("method", "post");
  const removeButton = document.createElement("button");
  removeButton.textContent = "Eyða";
  removeForm.appendChild(removeButton);
  removeTd.appendChild(removeForm);
  tr.appendChild(removeTd);

  showCartContent();

  // TODO hér þarf að búa til eventListener sem leyfir að eyða línu úr körfu
  removeButton.addEventListener("click", function (event) {
    event.preventDefault();
    const rowToRemove = event.target.closest("tr");

    rowToRemove.remove();
    showCartContent();
    updateTotalPrice();
  });

  return tr;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = false) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector(".cart");
  const checkoutForm = document.querySelector(".checkout-form");

  if (!cartElement) {
    console.warn("fann ekki .cart");
    return;
  }

  const emptyMessage = cartElement.querySelector(".empty-message");
  const cartRows = document.querySelectorAll(".cart .table tbody tr");

  if (!emptyMessage) {
    console.warn("fann ekki element");
    return;
  }

  cartRows.length > 0
    ? (emptyMessage.classList.add("hidden"),
      checkoutForm.classList.remove("hidden"))
    : (emptyMessage.classList.remove("hidden"),
      checkoutForm.classList.add("hidden"));
}
