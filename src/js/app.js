import Ui from "./ui";
import ClientController from "./clientController";
import PageElements from "./pageElements.js";
import formValidator from "./formValidator.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = new PageElements();
  const ui = new Ui(page);

  ui.renderData("all");
  ui.openModalOnClick(page.showButton);
  ui.closeModal(page.cancelButton);
  ui.closeModal(page.deleteCancelButton);

  ui.renderDataOnClick(page.tabs);

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
    const mode = page.form.dataset.mode;
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

    const { duplicateCheck, isValid } = formValidator(page.form, mode);

    if (isValid) {
      page.formErrorSelect.style.display = "block";
      if (mode === "add") {
        ClientController.addProduct(product);
      } else if (mode === "edit") {
        product.id = ui.currentProductId;
        ClientController.editProduct(product);
      } else {
        console.error("Invalid mode");
        return;
      }
      ui.closeModalOnClick(page.submitAdd);
      ui.closeModalOnClick(page.submitEdit);
      ui.renderData(ui.currentTab);
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
