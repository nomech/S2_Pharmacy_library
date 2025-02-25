class PageElements {
  constructor() {
    this.showButton = document.querySelector(".button--show-form");

    this.formModal = document.querySelector(".form-modal");
    this.deleteModal = document.querySelector(".delete-modal");

    this.form = document.querySelector(".form");
    this.formErrors = document.querySelectorAll(".form__error");
    this.formErrorSelect = document.querySelector(".form__error--select");
    this.openConfirmModal = document.querySelector(".button--delete");
    this.addButton = document.querySelector(".button--add");
    this.submitEdit = document.querySelector(".button--submit-edit");
    this.submitAdd = document.querySelector(".button--submit");
    this.cancelButton = document.querySelector(".button--cancel");
    this.deleteCancelButton = document.querySelector(
      ".delete-modal__button--cancel"
    );

    this.tab = document.querySelectorAll(".tab");

    this.dataContainer =  document.querySelector(".data");

    this.name = document.querySelector(".form__input--name");
    this.manufacturer = document.querySelector(".form__input--manufacturer");
    this.expiryDate = document.querySelector(".form__input--expire");
    this.quantity = document.querySelector(".form__input--quantity");
    this.dosage = document.querySelector(".form__input--dosage");
    this.frequency = document.querySelector(".form__input--frequency");
    this.price = document.querySelector(".form__input--price");
    this.age = document.querySelector(".form__input--age");
    this.typeField = document.querySelector(".form__input--type");
    this.prescriptionSection = document.querySelector(
      ".form__group--prescription"
    );

    this.prescriptionFields = [
      document.querySelector(".form__input--dosage"),
      document.querySelector(".form__input--frequency"),
    ];

    this.otcSection = document.querySelector(".form__group--otc");
    this.otcFields = [
      document.querySelector(".form__input--price"),
      document.querySelector(".form__input--age"),
    ];

    this.searchInput = document.querySelector(".nav__search-input");
    this.searchReset = document.querySelector(".button--reset");
    this.inputFields = document.querySelectorAll(".form__input");
    this.searchPanel = document.querySelector(".panel__search");
    this.resetButton = document.querySelector(".button--reset");
    this.queryText = document.querySelector(".panel__search-query");

    this.confirmDelete = document.querySelector(".button--confirm");
    this.confirmModal = document.querySelector(".delete-modal");
    this.formHeaderError = document.querySelector(".form__header-error");
    this.panelTitle = document.querySelector(".panel__title");

    this.tabs = document.querySelector(".tabs");
  }
}

export default PageElements;
