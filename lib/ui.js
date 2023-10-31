import { formatNumber } from "./helpers.js";

export function createCartLine(product, quantity) {
  // TODO útfæra þannig að búin sé til lína í körfu á forminu:

  /*
  <tr data-cart-product-id="1">
    <td>HTML húfa</td>
    <td>1</td>
    <td><span class="price">5.000 kr.-</span></td>
    <td><span class="price">5.000 kr.-</span></td>
    <td>
      <form class="remove" method="post">
        <button>Eyða</button>
      </form>
    </td>
  </tr>
  */

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

  // TODO hér þarf að búa til eventListener sem leyfir að eyða línu úr körfu

  removeButton.addEventListener("click", function (event) {
    event.preventDefault();
    const rowToRemove = event.target.closest("tr");
    rowToRemove.remove();
  });

  return tr;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector(".cart");

  if (!cartElement) {
    console.warn("fann ekki .cart");
    return;
  }

  const emptyMessage = cartElement.querySelector(".empty-message");
  const cartContent = cartElement.querySelector(".cart-content");

  if (!emptyMessage || !cartContent) {
    console.warn("fann ekki element");
    return;
  }

  if (show) {
    emptyMessage.classList.add("hidden");
    cartContent.classList.remove("hidden");
  } else {
    emptyMessage.classList.remove("hidden");
    cartContent.classList.add("hidden");
  }
}
