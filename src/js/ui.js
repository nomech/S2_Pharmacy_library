import ClientController from "./clientController";
import editIcon from "../assets/icons/edit.svg";
import deleteIcon from "../assets/icons/delete.svg";

class Ui {
  constructor(page) {
    this.page = page;
    this.currentProductId = null;
    this.currentTab = "all";
  }

  openModalOnClick(button, product) {
    button.addEventListener("click", () => {
      this.openModal(button.dataset.method, product);
    });
  }

  getProductID() {
    return this.currentProductId;
  }

  setProductId(id) {
    this.currentProductId = id;
  }

  openModal(method, product) {
    if (method === "add") {
      this.page.formModal.style.display = "flex";
      this.page.form.dataset.mode = "add";
      this.page.submitEdit.style.display = "none";
      this.page.submitAdd.style.display = "flex";

      for (let element of this.page.form) {
        if (element.classList.contains("form__input"))
          if (element.name !== "type") {
            element.value = "";
            element.placeholder = "";
          } else {
            element.value = "none";
          }
        if (element.classList.contains(".form__error")) {
          element.style.display = "none";
        }
      }
    } else if (method === "edit") {
      this.setProductId(product.id);
      console.log(this.currentProductId);
      this.page.form.dataset.mode = "edit";
      this.page.submitEdit.style.display = "flex";
      this.page.submitAdd.style.display = "none";
      this.page.formModal.style.display = "flex";

      for (let element of this.page.form) {
        element.value = product[element.name];
      }

      if (product.type === "prescription") {
        this.page.prescriptionSection.style.display = "inherit";
        this.page.otcSection.style.display = "none";
      } else if (product.type === "otc") {
        this.page.otcSection.style.display = "inherit";
        this.page.prescriptionSection.style.display = "none";
      } else {
        this.page.prescriptionSection.style.display = "none";
        this.page.otcSection.style.display = "none";
      }
    } else if (method === "confirm-delete") {
      this.page.deleteModal.style.display = "flex";
      this.page.confirmDelete.addEventListener("click", () => {
        ClientController.deleteProducts(product.id);
        this.page.deleteModal.style.display = "none";
        this.renderData(this.currentTab);
      });
    }
  }

  static currentId = null;

  closeModal(button) {
    button.addEventListener("click", (e) => {
      console.log("closing");
      e.preventDefault();
      this.closeModalOnClick(button);
    });
  }

  closeModalOnClick(button) {
    const method = button.dataset.method;
    let modal;
    if (method === "cancel-form" || method === "submit") {
      modal = this.page.formModal;
    if (method === "cancel-form" || method === "submit") {
      modal = this.page.formModal;
    } else if (method === "cancel-delete") {
      modal = this.page.confirmModal;
      modal = this.page.confirmModal;
    }

    modal.style.display = "none";
    this.page.prescriptionSection.style.display = "none";
    this.page.otcSection.style.display = "none";
    this.page.formErrors.forEach((error) => {
      error.style.display = "none";
    modal.style.display = "none";
    this.page.prescriptionSection.style.display = "none";
    this.page.otcSection.style.display = "none";
    this.page.formErrors.forEach((error) => {
      error.style.display = "none";
    });
  }

  toggleMedicineSection(
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
  createElements(data, mode) {
    const dataContainer = document.querySelector(".data");

    dataContainer.innerHTML = "";

    if (!data.length > 0) {
      const noProduct = document.createElement("p");
      noProduct.className = "data__no-data";
      noProduct.innerHTML =
        mode === "search"
          ? "No products found with that name"
          : "There are no products added yet";
      dataContainer.append(noProduct);
    }

    data.forEach((product) => {
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

      editButton.dataset.method = "edit";
      deleteButton.dataset.method = "confirm-delete";

      let ageData = "";
      if (product.age === "1") {
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
      editImg.src = `${editIcon}`;
      deleteImg.src = `${deleteIcon}`;

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

      this.openModalOnClick(editButton, product);
      this.openModalOnClick(deleteButton, product);
    });
  }

  // renders data
  renderData(type) {
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
      console.error("Unable to render: Invalid type");
      console.error("Unable to render: Invalid type");
    }
  }

  renderDataOnClick(tabs) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Removes any active tab indicator
        tabs.forEach((tab) => {
          if (tab.classList.contains("tab--active"))
            tab.classList.remove("tab--active");
        });

        this.currentTab = tab.dataset.id;

        //Renders data for the current tab.
        this.renderData(tab.dataset.id);

        //Makes the current tab active
        tab.classList.add("tab--active");
      });
    });
  }

  renderSearchData(data) {
    this.createElements(data, "search");
  }

  resetSearch() {
    const panelTitle = document.querySelector(".panel__title");
    const addButton = document.querySelector(".button--add");
    const searchPanel = document.querySelector(".panel__search");
    const resetButton = document.querySelector(".button--reset");
    const tabs = document.querySelector(".tabs");
    const searchInput = document.querySelector(".nav__search-input");

    const data = JSON.parse(localStorage.getItem("products")) || [];
    panelTitle.innerText = "Admin Panel";
    addButton.style.display = "flex";
    resetButton.style.display = "none";
    searchPanel.style.display = "none";
    tabs.style.display = "flex";
    searchInput.value = "";

    this.createElements(data);
  }

  submitSearch(searchQuery) {
    const panelTitle = document.querySelector(".panel__title");
    const addButton = document.querySelector(".button--add");
    const searchPanel = document.querySelector(".panel__search");
    const resetButton = document.querySelector(".button--reset");
    const queryText = document.querySelector(".panel__search-query");
    const tabs = document.querySelector(".tabs");
    const data = JSON.parse(localStorage.getItem("products")) || [];
    const results = data.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    this.renderSearchData(results);
    queryText.innerText = `"${searchQuery}"`;
    if (searchQuery.length > 0) {
      addButton.style.display = "none";
      panelTitle.innerText = "Search Results";
      searchPanel.style.display = "flex";
      tabs.style.display = "none";
      resetButton.style.display = "flex";
    } else {
      this.resetSearch();
    }
  }
}

export default Ui;
