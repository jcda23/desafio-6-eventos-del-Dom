const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
items.addEventListener("click", (e) => {
  addCarrito(e);
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

const addCarrito = (e) => {
  console.log(e.target);
  console.log(e.target.classList.contains("btn-dark"));
};

const stockProductos = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector("h5").textContent = "Código: " + producto.id;
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

//FUNCION REUTILIZABLE, ME TOCA IMPLEMENTARLA PARA AGREGAR TODOS LOS ELEMENTOS DEL DOM A TRAVES DE ELLA
//Añadimos los atributos al elemento
const addAttributes = (element, attrObject) => {
  for (let attr in attrObject) {
    if (attrObject.hasOwnProperty(attr)) {
      element.setAttribute(attr, attrObject[attr]);
    }
  }
};

//Recibimos un elemento y un objeto con atributos y sus hijos
const createCustomElement = (element, attributes, children) => {
  let customElement = document.createElement(element);
  if (children !== undefined)
    children.forEach((child) => {
      if (child.nodeType) {
        if (child.nodeType === 1 || child.nodeType === 11)
          customElement.appendChild(child);
      } else {
        customElement.innerHTML += child;
      }
    });
  addAttributes(customElement, attributes);
  return customElement;
};

const ventanaModal = (content) => {
  const modalContent = createCustomElement(
      "div",
      {
        id: "modal-content",
        class: "modal-content",
      },
      [content]
    ),
    modalContainer = createCustomElement(
      "div",
      {
        id: "modal-container",
        class: "modal-container",
      },
      [modalContent]
    );
  //Despliega la ventana modal
  document.body.appendChild(modalContainer);

  const closeModal = () => {
    document.body.removeChild(modalContainer);
  };
  //Añadimos el evento para cerrar la ventana modal
  modalContainer.addEventListener("click", (e) => {
    if (e.target.id === "modal-container") {
      closeModal();
    }
  });
};
async function main() {
  data = await fetchData();
  ventanaModal(`<h1>HOLA BIENVEDIDO A LA TIENDA ONLINE DE MERXIMPORT!!!</h1>`);
  stockProductos(data);
}
main();
