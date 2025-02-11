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
}

export default Ui;
