import ClientController from "./clientController";

class Ui {
  // mothod to open modal
  static openModal(button, modal) {
    const inputFields = document.querySelectorAll(".form__input");
    const form = document.querySelector(".form");

    form.dataset.mode = "add";
    
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.style.display = "none";
      }
    });

    button.addEventListener("click", () => {
      modal.style.display = "flex";
      inputFields.forEach((input) => {
        if (input.name !== "type") {
          input.value = "";
          input.placeholder = "";
        }
      });
    });
  }

  static currentId = null;

  static openEditModal(modal, product) {
    const form = document.querySelector(".form");
    form.dataset.mode = "edit";
    Ui.currentProductId = product.id;

    const inputFields = document.querySelectorAll(".form__input");

    // add event listener to button to open modal
    modal.style.display = "flex";

    inputFields.forEach((input) => {
      Object.keys(product).forEach((key) => {
        if (key === input.name) {
          input.value = product[key];
        }
      });
    });
  }

  static closeModal(button, modal, prescriptionSection, otcSection) {
    const submitEdit = document.querySelector(".button--submit-edit");
    const submitAdd = document.querySelector(".button--submit");

    button.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "none";
      submitEdit.style.display = "none";
      submitAdd.style.display = "block";
      if (prescriptionSection && otcSection) {
        prescriptionSection.style.display = "none";
        otcSection.style.display = "none";
      }
    });
  }

  static closeOnSubmit(modal, prescriptionSection, otcSection) {
    modal.style.display = "none";
    prescriptionSection.style.display = "none";
    otcSection.style.display = "none";
  }

  static toggleMedicineSection(
    prescriptionSection,
    prescriptionFields,
    otcSection,
    otcFields,
    select
  ) {
    prescriptionSection.style.display = "none";
    otcSection.style.display = "none";
    prescriptionFields.forEach((field) => {
      field.value = "";
    });
    otcFields.forEach((field) => {
      field.value = "";
    });

    if (select.value === "prescription") {
      prescriptionSection.style.display = "inherit";
    } else if (select.value === "otc") {
      otcSection.style.display = "inherit";
    } else {
      prescriptionSection.style.display = "none";
      otcSection.style.display = "none";
    }
  }

  static renderData() {
    const data =
      JSON.parse(localStorage.getItem("products")) ||
      "There is currently no products";
    const allProducts = data.all ? [...data.all] : [];
    const dataContainer = document.querySelector(".data");

    dataContainer.innerHTML = "";

    if (!allProducts.length > 0) {
      const noProduct = document.createElement("p");
      noProduct.className = "data__no-data";
      noProduct.innerHTML = "There are no products added yet";
      dataContainer.append(noProduct);
    }

    allProducts.forEach((product) => {
      const card = document.createElement("div");
      const cardDataGroup = document.createElement("div");
      const cardheader = document.createElement("div");
      const cardTitle = document.createElement("h3");
      const cardFooter = document.createElement("div");
      const cardText = document.createElement("p");
      const cardButtons = document.createElement("div");
      const editButton = document.createElement("button");
      const editImg = document.createElement("img");
      const deleteButton = document.createElement("button");
      const deleteImg = document.createElement("img");
      const formModal = document.querySelector(".form-modal");
      const submitEdit = document.querySelector(".button--submit-edit");
      const submitAdd = document.querySelector(".button--submit");

      card.className = "data__card card";
      cardDataGroup.className = "card__data-group";
      cardheader.className = "card__header";
      cardTitle.className = "card__title";
      cardFooter.className = "card__footer";
      cardText.className = "card__text";
      cardButtons.className = "card__button-group";
      editButton.className = "button button--edit button--card";
      deleteButton.className = "button button--delete button--card";
      editImg.className = "button__image button__image--edit";
      deleteImg.className = "button__image on__image--delete";

      cardTitle.innerText = `${product.name}`;
      cardText.innerText = `Mfr. ${product.manufacturer} | Exp. ${product.expiryDate} | Qty. ${product.quantity}`;

      editImg.src = `./src/assets/icons/edit.svg`;
      deleteImg.src = `./src/assets/icons/delete.svg`;

      cardheader.append(cardTitle);
      cardFooter.append(cardText);

      cardDataGroup.append(cardheader, cardFooter);
      editButton.append(editImg, `Edit`);
      deleteButton.append(deleteImg, `Delete`);
      cardButtons.append(editButton, deleteButton);
      card.append(cardDataGroup, cardButtons);
      dataContainer.append(card);

      editButton.addEventListener("click", (e) => {
        Ui.openEditModal(formModal, product);
        submitEdit.style.display = "block";
        submitAdd.style.display = "none";
      });

      deleteButton.addEventListener("click", () => {
        ClientController.deleteProducts(product.id);
        Ui.renderData();
      });
    });
  }
}

export default Ui;
