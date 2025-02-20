import ClientController from "./clientController";

class Ui {
  // mothod to open modal
  static openModal(button, modal) {
    const submitEdit = document.querySelector(".button--submit-edit");
    const submitAdd = document.querySelector(".button--submit");
    const inputFields = document.querySelectorAll(".form__input");
    const form = document.querySelector(".form");
    const formErrorSelect = document.querySelector(".form__error--select");

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.style.display = "none";
      }
    });

    button.addEventListener("click", () => {
      submitEdit.style.display = "none";
      submitAdd.style.display = "block";
      form.dataset.mode = "add";
      modal.style.display = "flex";
      formErrorSelect.style.visibility = "hidden";

      inputFields.forEach((input) => {
        if (input.name !== "type") {
          input.value = "";
          input.placeholder = "";
        } else {
          input.value = "none";
        }
      });
    });
  }

  static currentId = null;

  static openEditModal(modal, product) {
    const prescriptionSection = document.querySelector(
      ".form__group--prescription"
    );
    const otcSection = document.querySelector(".form__group--otc");
    const form = document.querySelector(".form");
    form.dataset.mode = "edit";
    Ui.currentProductId = product.id;

    modal.style.display = "flex";

    const inputFields = document.querySelectorAll(".form__input");
    console.log(product);
    inputFields.forEach((input) => {
      if (product.hasOwnProperty(input.name)) {
        input.value = product[input.name];
      }
    });

    if (product.type === "prescription") {
      prescriptionSection.style.display = "inherit";
      otcSection.style.display = "none";
    } else if (product.type === "otc") {
      otcSection.style.display = "inherit";
      prescriptionSection.style.display = "none";
    } else {
      prescriptionSection.style.display = "none";
      otcSection.style.display = "none";
    }
  }

  static closeModal(button, modal, prescriptionSection, otcSection) {
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

  //function that creates elements to be rendered
  static createElements(data) {
    const dataContainer = document.querySelector(".data");

    dataContainer.innerHTML = "";

    if (!data.length > 0) {
      const noProduct = document.createElement("p");
      noProduct.className = "data__no-data";
      noProduct.innerHTML = "There are no products added yet";
      dataContainer.append(noProduct);
    }

    data.forEach((product) => {
      console.log(product);

      // Query selectors
      const formModal = document.querySelector(".form-modal");
      const submitEdit = document.querySelector(".button--submit-edit");
      const submitAdd = document.querySelector(".button--submit");

      // Create elements
      const card = document.createElement("div");
      const cardDataGroup = document.createElement("div");
      const cardHeader = document.createElement("div");
      const cardTitle = document.createElement("h3");
      const cardFooter = document.createElement("div");
      const cardText = document.createElement("div");
      const cardButtons = document.createElement("div");
      const editButton = document.createElement("button");
      const editImg = document.createElement("img");
      const deleteButton = document.createElement("button");
      const deleteImg = document.createElement("img");
      const cardlabel = document.createElement("div");
      const stock = document.createElement("p");

      const frequencyLabel = document.createElement("strong");
      const frequencyText = document.createElement("span");
      const frequency = document.createElement("div");

      // Manufacturer
      const mfrLabel = document.createElement("strong");
      const mfrText = document.createElement("span");
      const mfr = document.createElement("div");

      // Expiry Date
      const expLabel = document.createElement("strong");
      const expText = document.createElement("span");
      const exp = document.createElement("div");

      // Age
      const ageLabel = document.createElement("strong");
      const ageText = document.createElement("span");
      const age = document.createElement("div");

      // Price
      const priceLabel = document.createElement("strong");
      const priceText = document.createElement("span");
      const price = document.createElement("div");

      const dosage = product.dosage ? `${product.dosage}mg` : "";

      // Assign class names
      card.className = "data__card card";
      cardDataGroup.className = "card__data-group";
      cardHeader.className = "card__header";
      cardTitle.className = "card__title";
      cardFooter.className = "card__footer";
      cardText.className = "card__text";
      cardButtons.className = "card__button-group";
      editButton.className = "button button--edit button--card";
      deleteButton.className = "button button--delete button--card";
      editImg.className = "button__image button__image--edit";
      deleteImg.className = "button__image button__image--delete";
      cardlabel.className = "card__label";

      stock.className = "card__stock";
      mfr.className = "card__manufacturer";
      exp.className = "card__expire";
      age.className = "card__age";
      price.className = "card__names";
      frequency.className = "card__frequency";

      // Assign values to text elements
      cardlabel.innerText = `${product.type}`;
      cardTitle.innerText = `${product.name} ${dosage}`;
      stock.innerText = `Stock: ${product.quantity} units`;

      mfrLabel.innerText = "Mfr: ";
      mfrText.innerText = `${product.manufacturer}`;

      expLabel.innerText = "Exp: ";
      expText.innerText = `${product.expiryDate}`;

      let ageData = "";
      if (product.age === "none") {
        ageData = "No age restriction";
      } else if (product.age === "18") {
        ageData = "18+";
      } else if (product.age === "21") {
        ageData = "21+";
      }

      let frequencyData = "";
      if (product.frequency === "1") {
        frequencyData = "Once a day";
      } else if (product.frequency === "2") {
        frequencyData = "Twice a day";
      } else if (product.frequency === "3") {
        frequencyData = "Once a week";
      } else if (product.frequency === "4") {
        frequencyData = "Twice a week";
      }

      ageLabel.innerText = "Age: ";
      ageText.innerText = `${ageData}`;

      priceLabel.innerText = "Price: ";
      priceText.innerText = `${product.price} NOK`;

      frequencyLabel.innerText = "Frequency: ";
      frequencyText.innerText = `${frequencyData}`;

      mfr.append(mfrLabel, mfrText);
      exp.append(expLabel, expText);

      // Append labels and values
      if (product.type === "otc") {
        age.append(ageLabel, ageText);
        price.append(priceLabel, priceText);
        cardText.append(mfr, exp, age, price);
      }

      // Append labels and values
      if (product.type === "prescription") {
        frequency.append(frequencyLabel, frequencyText);
        cardText.append(mfr, exp, frequency);
      }
      // Add images
      editImg.src = `./src/assets/icons/edit.svg`;
      deleteImg.src = `./src/assets/icons/delete.svg`;

      // Append all elements to card
      cardHeader.append(cardTitle);
      //cardText.append(mfr, exp, age, price);
      cardDataGroup.append(cardHeader, cardText);
      editButton.append(editImg, `Edit`);
      deleteButton.append(deleteImg, `Delete`);
      cardButtons.append(editButton, deleteButton);
      cardFooter.append(stock, cardButtons);
      card.append(cardlabel, cardDataGroup, cardFooter);
      dataContainer.append(card);

      // Event listeners
      editButton.addEventListener("click", () => {
        Ui.openEditModal(formModal, product);
        submitEdit.style.display = "block";
        submitAdd.style.display = "none";
      });

      deleteButton.addEventListener("click", () => {
        ClientController.deleteProducts(product.id);
        Ui.renderData(Ui.currentTab);
      });
    });
  }

  static currentTab = "all";

  // renders data
  static renderData(type) {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    const allData = data ? data : [];
    const otcData = data.filter((item) => {
      return item.type === "otc";
    });

    const prescriptionData = data.filter((item) => {
      return item.type === "prescription";
    });

    if (type === "all") {
      this.createElements(allData);
    } else if (type === "otc") {
      this.createElements(otcData);
    } else if (type === "prescription") {
      this.createElements(prescriptionData);
    } else {
      console.error("Invalid type");
    }
  }

  static renderDataOnClick(tabs) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Removes any active tab indicator
        tabs.forEach((tab) => {
          if (tab.classList.contains("tab--active"))
            tab.classList.remove("tab--active");
        });

        Ui.currentTab = tab.dataset.id;
        console.log(Ui.currentTab);
        console.log("hello");

        //Renders data for the current tab.
        Ui.renderData(tab.dataset.id);

        //Makes the current tab active
        tab.classList.add("tab--active");
      });
    });
  }

  

  static renderSearchData(data) {
    
    Ui.createElements(data)
  }

  static submitSearch(searchQuery) {
    const results = JSON.parse(localStorage.getItem("products")).filter(
      (product) => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
    );
    Ui.renderSearchData(results);
  }
}

export default Ui;
