import Ui from "./ui";
import ClientController from "./clientController";
import PageElements from "./pageElements.js";

const formValidator = (page) => {
  const nameValue = page.name.value.trim();
  const manufacturerValue = page.manufacturer.value.trim();
  const expiryDateValue = page.expiryDate.value.trim();
  const quantityValue = page.quantity.value.trim();
  const typeValue = page.typeField.value.trim();
  const ageValue = page.age.value.trim();
  const priceValue = page.price.value.trim();
  const dosageValue = page.dosage.value.trim();
  const frequencyValue = page.frequency.value.trim();

  let isValid = true;
  if (!nameValue) {
    page.name.placeholder = "Name is reqired";
    isValid = false;
  }

  if (!manufacturerValue) {
    page.manufacturer.placeholder = "Manufacturer is reqired";
    isValid = false;
  }

  if (!expiryDateValue) {
    page.expiryDate.placeholder = "Name is reqired";
    isValid = false;
  }

  if (!quantityValue) {
    page.quantity.placeholder = "Quantity is reqired";
    isValid = false;
  }

  if (typeValue === "none") {
    page.formErrorSelect.style.visibility = "visible";
    isValid = false;
  }

  if (typeValue === "otc") {
    if (!ageValue) {
      page.age.placeholder = "Age is reqired";
      isValid = false;
    }

    if (!priceValue) {
      page.price.placeholder = "Price is reqired";
      isValid = false;
    }
  }

  if (typeValue === "prescription") {
    if (!dosageValue) {
      page.dosage.placeholder = "Dosage is reqired";
      isValid = false;
    }

    if (!frequencyValue) {
      page.requency.placeholder = "Frequency is reqired";
      isValid = false;
    }
  }
  return isValid;
};

document.addEventListener("DOMContentLoaded", () => {
  const page = new PageElements();
  const ui = new Ui(page);
  ui.renderData("all");
  ui.openModal(
    page.showButton,
    page.formModal,
    page.submitEdit,
    page.inputFields,
    page.submitAdd,
    page.form,
    page.formErrorSelect
  );
  ui.closeModal(
    page.cancelButton,
    page.formModal,
    page.prescriptionSection,
    page.otcSection
  );
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

    if (formValidator(page)) {
      page.formErrorSelect.style.visibility = "hidden";
      if (page.form.dataset.mode === "add") {
        ClientController.addProduct(product);
      } else if (page.form.dataset.mode === "edit") {
        product.id = ui.getProductID();
        ClientController.editProduct(product);
      } else {
        console.error("Invalid mode");
        return;
      }
      ui.closeOnSubmit(
        page.formModal,
        page.prescriptionSection,
        page.otcSection
      );
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
