class Ui {
  // mothod to open modal
  static openModal(button, modal, cancel) {
    // add event listener to button to open modal
    button.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    // add event listener to cancel button to close modal
    cancel.addEventListener("click", (event) => {
      event.preventDefault();
      modal.style.display = "none";
    });
  }
}

export default Ui;
