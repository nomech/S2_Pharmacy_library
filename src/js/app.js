import Ui from "./ui";
import ClientController from "./clientController";
import PageElements from "./pageElements.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = new PageElements();
  const ui = new Ui(page);
  ui.renderData("all");
  Ui.renderData("all");
  Ui.openModalOnClick(showButton);
  Ui.closeModalTest(cancelButton);
  Ui.closeModalTest(deleteCancelButton);
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
        return;
      }

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
