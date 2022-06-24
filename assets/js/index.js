const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
items.addEventListener("click", (e) => {
  selectProduct(e);
});

let data;
const fetchData = async () => {
  try {
    const response = await fetch("../../assets/json/api.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const stockProductos = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector("h5").textContent =
      "Producto: " + producto.title;
    templateCard.querySelector("h6").textContent = "Código: " + producto.id;
    templateCard.querySelector("p").textContent =
      "Precio: " + producto.precio + "$";
    templateCard
      .querySelector("img")
      .setAttribute("src", producto.thumbnailUrl);
    templateCard.querySelector(".btn").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};

const selectProduct = (e) => {
  /*   console.log(e.target);
  console.log(e.target.classList.contains("btn-dark")); */
  if (e.target.classList.contains("btn-dark")) {
    console.log(e.target.parentElement);
    ventanaModal(
      `<h1>HAZ AGREGADO</h1> <hr> <h2>${
        e.target.parentElement.querySelector("h5").textContent
      } al carrito</h2>`
    );
  }
  e.stopPropagation();
};
const addCarrito = (product) => {};

async function main() {
  data = await fetchData();
  ventanaModal(`<h1>HOLA BIENVEDIDO A LA TIENDA ONLINE DE MERXIMPORT!!!</h1>`);
  stockProductos(data);
}
main();
