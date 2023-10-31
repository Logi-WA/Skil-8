import { formatNumber } from "./lib/helpers.js";
import { createCartLine, showCartContent } from "./lib/ui.js";

const products = [
  {
    id: 1,
    title: "HTML húfa",
    description:
      "Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.",
    price: 5_000,
  },
  {
    id: 2,
    title: "CSS sokkar",
    description: "Sokkar sem skalast vel með hvaða fótum sem er.",
    price: 3_000,
  },
  {
    id: 3,
    title: "JavaScript jakki",
    description: "Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.",
    price: 20_000,
  },
];

/** Bæta vöru í körfu */
function addProductToCart(product, quantity) {
  // Hér þarf að finna `<tbody>` í töflu og setja `cartLine` inn í það
  const cartTableBody = document.querySelector(".cart .table tbody");

  if (!cartTableBody) {
    console.warn("fann ekki '.cart .table tbody'");
    return;
  }

  // TODO hér þarf að athuga hvort lína fyrir vöruna sé þegar til

  const existingProductLine = cartTableBody.querySelector(
    `[data-cart-product-id="${product.id}"]`
  );

  if (existingProductLine) {
    const quantityElement =
      existingProductLine.querySelector("td:nth-child(2)");
    const currentQuantity = parseInt(quantityElement.textContent, 10);
    quantityElement.textContent = currentQuantity + quantity;

    const totalPriceElement = existingProductLine.querySelector(
      "td:nth-child(4) .price"
    );
    const totalProductPrice = product.price * (currentQuantity + quantity);
    totalPriceElement.textContent = formatNumber(totalProductPrice);

    return;
  }

  const cartLine = createCartLine(product, quantity);
  cartTableBody.appendChild(cartLine);

  // Sýna efni körfu
  showCartContent(true);

  // TODO sýna/uppfæra samtölu körfu
}

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();

  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest("tr");

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  // Athugum hvort vara sé til
  if (!product) {
    console.warn("Fann ekki vöru með");
    return;
  }

  const quantityInput = parent.querySelector('input[type="number"]');
  const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 0;

  // Bætum vöru í körfu (athugun var á tilvist vöru var bætt við í línu 59)
  quantity
    ? addProductToCart(product, quantity)
    : console.warn("Velja þarf fjölda");
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll(".add");

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener("submit", submitHandler);
}

// TODO bæta við event handler á form sem submittar pöntun
