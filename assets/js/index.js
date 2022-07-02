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
    templateCard.getElementById("title__card").textContent =
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
  }
  e.stopPropagation();
};

const addCarrito = (product) => {};

function searchFilters(input, selector) {
  document.addEventListener("keyup", (e) => {
    if (e.target.matches(input)) {
      if (e.key === "Escape") e.target.value = "";
      document.querySelectorAll(selector).forEach((item) => {
        item.textContent.toLowerCase().includes(e.target.value.toLowerCase())
          ? (item.style.display = "block")
          : (item.style.display = "none");
      });
    }
  });
}

async function main() {
  data = await fetchData();
  ventanaModal(
    `<img src="./assets/img/picture1.svg" class="modal__img">`,
    `<h2 class="modal__title">Bienvenidos a mi tienda<span class="modal__title modal__title--bold"> Registrate!</span>
      </h2>`,
    `<p class="modal__paragraph">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ea perferendis
        officiis?
      </p>`,
    `<a id="modal__close" class="modal__close" href="./assets/pages/registro.html">Registrate</a>`
  );
  stockProductos(data);
  searchFilters(".search-bar", ".card");
}
main();
