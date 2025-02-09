import Ui from "./ui";

const addButton = document.querySelector(".button--show-form");
const formModal = document.querySelector(".form-modal");
const deleteButton = document.querySelector(".button--delete");
const deleteModal = document.querySelector(".delete-modal");

const cancelButton = document.querySelector(".button--cancel");
const deleteCancelButton = document.querySelector(
  ".delete-modal__button--cancel"
);


document.addEventListener("DOMContentLoaded", () => {
  Ui.openModal(addButton, formModal, cancelButton);
  Ui.openModal(deleteButton, deleteModal, deleteCancelButton);

});
