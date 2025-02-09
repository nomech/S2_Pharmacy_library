import Ui from "./ui";

const addButton = document.querySelector(".button--show-form");
const formModal = document.querySelector(".form-modal");
const deleteButton = document.querySelector(".button--delete");
const deleteModal = document.querySelector(".delete-modal");

const cancelButton = document.querySelector(".button--cancel");
const deleteCancelButton = document.querySelector(
  ".delete-modal__button--cancel"
);

const typeFiled = document.querySelector(".form__input--type");

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
  Ui.openModal(addButton, formModal, cancelButton);
  Ui.openModal(deleteButton, deleteModal, deleteCancelButton);

  typeFiled.addEventListener("change", () => {
    Ui.toggleMedicineSection(
      prescriptionSection,
      prescriptionFields,
      otcSection,
      otcFields,
      typeFiled
    );
  });
});
