// Import UI, controller, page elements, and form validator modules
import Ui from './ui';
import ClientController from './clientController';
import PageElements from './pageElements.js';
import formValidator from './formValidator.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
	// Initialize page elements and UI
	const page = new PageElements();
	const ui = new Ui(page);

	// Render all products on initial load
	ui.renderData('all');

	// Set up event listeners for opening and closing modals
	ui.openModalOnClick(page.showButton);
	ui.closeModal(page.cancelButton);
	ui.closeModal(page.deleteCancelButton);

	// Set up tab click listeners to render data by type
	ui.renderDataOnClick(page.tab);

	// Change medicine section in form based on type selection
	page.typeField.addEventListener('change', () => {
		ui.toggleMedicineSection(page.typeField);
	});

	// Handle form submission for adding/editing products
	page.form.addEventListener('submit', (e) => {
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

		// Validate form and check for duplicates
		const { duplicateCheck, isValid } = formValidator(page.form, ui.currentProductId);

		if (isValid) {
			if (!duplicateCheck) {
				// If valid and not duplicate, add or edit product
				page.formErrorSelect.style.display = 'block';
				page.formHeaderError.style.display = 'none';
				if (mode === 'add') {
					ClientController.addProduct(product);
				} else if (mode === 'edit') {
					product.id = ui.currentProductId;
					ClientController.editProduct(product);
				} else {
					console.error('Invalid mode');
					return;
				}

				// Close modal and re-render data
				ui.closeModalOnClick(page.submitAdd);
				ui.closeModalOnClick(page.submitEdit);
				ui.renderData(ui.currentTab);
			} else {
				// Show error if duplicate found
				page.formHeaderError.style.display = 'flex';
			}
		}
	});

	// Search for products by name when Enter is pressed
	page.searchInput.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			ui.submitSearch(e.target.value);
		}
	});

	// Reset search results when reset button is clicked
	page.searchReset.addEventListener('click', () => {
		ui.resetSearch();
	});
});
