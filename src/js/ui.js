class Ui {
  // mothod to open modal
  static openModal(button, modal) {
    // add event listener to button to open modal
    button.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  static closeModal(button, modal) {
    button.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  static closeOnSubmit(modal) {
    modal.style.display = "none";
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
    const all = data.all;
    const dataContainer = document.querySelector(".data");

    dataContainer.innerHTML = "";

    all.forEach((product) => {
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
      cardText.innerText = `${product.manufacturer} | ${product.expiryDate} | Qty. ${product.quantity}`;

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
    });
  }
}

export default Ui;
