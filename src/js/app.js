import Ui from "./ui";
import ClientController from "./clientController";
import formValidator from "./formValidator";

const showButton = document.querySelector(".button--show-form");
const formModal = document.querySelector(".form-modal");
const form = document.querySelector(".form");
const deleteModal = document.querySelector(".delete-modal");

const cancelButton = document.querySelector(".button--cancel");
const deleteCancelButton = document.querySelector(
  ".delete-modal__button--cancel"
);

const tabs = document.querySelectorAll(".tab");

const submitAdd = document.querySelector(".button--submit");
const submitEdit = document.querySelector(".button--submit-edit");

const name = document.querySelector(".form__input--name");
const manufacturer = document.querySelector(".form__input--manufacturer");
const expiryDate = document.querySelector(".form__input--expire");
const quantity = document.querySelector(".form__input--quantity");
const dosage = document.querySelector(".form__input--dosage");
const frequency = document.querySelector(".form__input--frequency");
const price = document.querySelector(".form__input--price");
const age = document.querySelector(".form__input--age");
const typeField = document.querySelector(".form__input--type");
const prescriptionSection = document.querySelector(
  ".form__group--prescription"
);

const formErrors = document.querySelectorAll(".form__error");

const prescriptionFields = [
  document.querySelector(".form__input--dosage"),
  document.querySelector(".form__input--frequency"),
];

const otcSection = document.querySelector(".form__group--otc");
const otcFields = [
  document.querySelector(".form__input--price"),
  document.querySelector(".form__input--age"),
];

const formErrorSelect = document.querySelector(".form__error--select");

const search = document.querySelector(".nav__search-input");
const searchReset = document.querySelector(".button--reset");

document.addEventListener("DOMContentLoaded", () => {
  const page = new PageElements();
  const ui = new Ui(page);
  ui.renderData("all");
  Ui.renderData("all");
  Ui.openModalOnClick(showButton);
  Ui.closeModal(cancelButton);
  Ui.closeModal(deleteCancelButton);
  Ui.renderDataOnClick(tabs);

  page.typeField.addEventListener("change", () => {
    ui.toggleMedicineSection(
      page.prescriptionSection,
      page.prescriptionFields,
      page.otcSection,
      page.otcFields,
      page.typeField
    );
  });

  page.form.addEventListener("submit", (e) => {
    e.preventDefault();
    let product = {
      name: page.name.value.trim(),
      manufacturer: page.manufacturer.value.trim(),
      expiryDate: page.expiryDate.value.trim(),
      quantity: page.quantity.value.trim(),
      type: page.typeField.value.trim(),
      age: page.age.value.trim(),
      price: page.price.value.trim(),
      dosage: page.dosage.value.trim(),
      frequency: page.frequency.value.trim(),
    };

    if (formValidator(form)) {
      page.formErrorSelect.style.display = "block";
      if (form.dataset.mode === "add") {
        ClientController.addProduct(product);
      } else if (form.dataset.mode === "edit") {
        e;
        product.id = Ui.currentProductId;
        ClientController.editProduct(product);
      } else {
        console.error("Invalid mode");
        d;
        return;
      }
      Ui.closeModalOnClick(submitAdd);
      Ui.closeModalOnClick(submitEdit);
      Ui.renderData(Ui.currentTab);
    }
  });

  page.searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      ui.submitSearch(e.target.value);
    }
  });
  page.searchReset.addEventListener("click", () => {
    ui.resetSearch();
  });
});
