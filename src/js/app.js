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
  Ui.renderData("all");
  Ui.openModalOnClick(showButton);
  Ui.closeModal(cancelButton);
  Ui.closeModal(deleteCancelButton);
  Ui.renderDataOnClick(tabs);

  typeField.addEventListener("change", () => {
    Ui.toggleMedicineSection(
      prescriptionSection,
      prescriptionFields,
      otcSection,
      otcFields,
      typeField
    );
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let product = {
      name: name.value.trim(),
      manufacturer: manufacturer.value.trim(),
      expiryDate: expiryDate.value.trim(),
      quantity: quantity.value.trim(),
      type: typeField.value.trim(),
      age: age.value.trim(),
      price: price.value.trim(),
      dosage: dosage.value.trim(),
      frequency: frequency.value.trim(),
    };

    if (formValidator(form)) {
      formErrorSelect.style.display = "block";
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

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      formModal.style.display = "none";
      if (prescriptionSection && otcSection) {
        prescriptionSection.style.display = "none";
        otcSection.style.display = "none";
      }

      formErrors.forEach((error) => {
        error.style.display = "none";
      });
    }
  });

  search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      Ui.submitSearch(e.target.value);
    }
  });
  searchReset.addEventListener("click", () => {
    Ui.resetSearch();
  });
});
