// Class to store references to all key DOM elements used in the app
class PageElements {
	constructor() {
		// Button to show the add product form modal
		this.showButton = document.querySelector('.button--show-form');

		// Modals for form and delete confirmation
		this.formModal = document.querySelector('.form-modal');
		this.deleteModal = document.querySelector('.delete-modal');

		// Form and form error elements
		this.form = document.querySelector('.form');
		this.formErrors = document.querySelectorAll('.form__error');
		this.formErrorSelect = document.querySelector('.form__error--select');
		this.openConfirmModal = document.querySelector('.button--delete');
		this.addButton = document.querySelector('.button--add');
		this.submitEdit = document.querySelector('.button--submit-edit');
		this.submitAdd = document.querySelector('.button--submit');
		this.cancelButton = document.querySelector('.button--cancel');
		this.deleteCancelButton = document.querySelector('.delete-modal__button--cancel');

		// Tab navigation elements
		this.tab = document.querySelectorAll('.tab');

		// Container for displaying product data
		this.dataContainer = document.querySelector('.data');

		// Form input fields
		this.name = document.querySelector('.form__input--name');
		this.manufacturer = document.querySelector('.form__input--manufacturer');
		this.expiryDate = document.querySelector('.form__input--expire');
		this.quantity = document.querySelector('.form__input--quantity');
		this.dosage = document.querySelector('.form__input--dosage');
		this.frequency = document.querySelector('.form__input--frequency');
		this.price = document.querySelector('.form__input--price');
		this.age = document.querySelector('.form__input--age');
		this.typeField = document.querySelector('.form__input--type');
		this.prescriptionSection = document.querySelector('.form__group--prescription');

		// Arrays of fields for prescription and OTC sections
		this.prescriptionFields = [
			document.querySelector('.form__input--dosage'),
			document.querySelector('.form__input--frequency'),
		];

		this.otcSection = document.querySelector('.form__group--otc');
		this.otcFields = [
			document.querySelector('.form__input--price'),
			document.querySelector('.form__input--age'),
		];

		// Search and panel elements
		this.searchInput = document.querySelector('.nav__search-input');
		this.searchReset = document.querySelector('.button--reset');
		this.inputFields = document.querySelectorAll('.form__input');
		this.searchPanel = document.querySelector('.panel__search');
		this.resetButton = document.querySelector('.button--reset');
		this.queryText = document.querySelector('.panel__search-query');

		// Confirmation and error elements
		this.confirmDelete = document.querySelector('.button--confirm');
		this.confirmModal = document.querySelector('.delete-modal');
		this.formHeaderError = document.querySelector('.form__header-error');
		this.panelTitle = document.querySelector('.panel__title');

		// Tabs container
		this.tabs = document.querySelector('.tabs');
	}
}

export default PageElements;
