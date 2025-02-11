import Ui from "./ui";
import ClientController from "./clientController";

const showButton = document.querySelector(".button--show-form");
const formModal = document.querySelector(".form-modal");
const form = document.querySelector(".form");
const deleteButton = document.querySelector(".button--delete");
const deleteModal = document.querySelector(".delete-modal");

const cancelButton = document.querySelector(".button--cancel");
const deleteCancelButton = document.querySelector(
  ".delete-modal__button--cancel"
);

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

const prescriptionFields = [
  document.querySelector(".form__input--dosage"),
  document.querySelector(".form__input--frequency"),
];

const otcSection = document.querySelector(".form__group--otc");
const otcFields = [
  document.querySelector(".form__input--price"),
  document.querySelector(".form__input--age"),
];

document.addEventListener("DOMContentLoaded", () => {
  Ui.renderData();
  Ui.openModal(showButton, formModal);
  Ui.openModal(deleteButton, deleteModal);
  Ui.closeModal(cancelButton, formModal);
  Ui.closeModal(deleteCancelButton, deleteModal);

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
    ClientController.addProduct(
      name.value.trim(),
      manufacturer.value.trim(),
      expiryDate.value.trim(),
      quantity.value.trim(),
      typeField.value.trim(),
      age.value.trim(),
      price.value.trim(),
      dosage.value.trim(),
      frequency.value.trim()
    );
    if (typeField.value !== "none") {
      Ui.closeOnSubmit(formModal);
      Ui.renderData();
    }
  });
});
