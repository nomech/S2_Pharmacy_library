// Import the ClientController for CRUD operations and icons for UI
import ClientController from './clientController';
import editIcon from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/delete.svg';

// UI class handles all DOM updates, rendering, and modal logic
class Ui {
	constructor(page) {
		this.page = page; // Reference to all page elements
		this.currentProductId = null; // Track the currently selected product for editing/deleting
		this.currentTab = 'all'; // Track the current tab (all, otc, prescription)
		this.confirmDeleteListener = null; // Store delete event listener for cleanup
	}

	// Attach modal open logic to a button (add/edit/delete)
	openModalOnClick(button, product) {
		button.addEventListener('click', () => {
			this.openModal(button.dataset.method, product);
		});
	}

	// Get the currently selected product ID
	getProductID() {
		return this.currentProductId;
	}

	// Set the current product ID
	setProductId(id) {
		this.currentProductId = id;
	}

	// Open the appropriate modal based on the method (add, edit, delete)
	openModal(method, product) {
		switch (method) {
			case 'add':
				this.openAddModal();
				break;
			case 'edit':
				this.openEditModal(product);
				break;
			case 'confirm-delete':
				this.openDeleteModal(product);
				break;
			default:
				console.error('Invalid modal method');
		}
	}

	// Show the add product modal and reset form fields
	openAddModal() {
		this.page.formModal.style.display = 'flex';
		this.page.form.dataset.mode = 'add';
		this.page.submitEdit.style.display = 'none';
		this.page.submitAdd.style.display = 'flex';

		// Reset all form fields and hide errors
		for (let element of this.page.form) {
			if (element.classList.contains('form__input')) {
				if (element.name !== 'type') {
					element.value = '';
					element.placeholder = '';
				} else {
					element.value = 'none';
				}
			}
			if (element.classList.contains('.form__error')) {
				element.style.display = 'none';
			}
		}
	}

	// Show the edit product modal and populate fields with product data
	openEditModal(product) {
		this.setProductId(product.id);
		this.page.form.dataset.mode = 'edit';
		this.page.submitEdit.style.display = 'flex';
		this.page.submitAdd.style.display = 'none';
		this.page.formModal.style.display = 'flex';

		// Populate form fields with product data
		for (let element of this.page.form) {
			element.value = product[element.name];
		}

		// Toggle the correct medicine section based on product type
		if (product.type === 'prescription') {
			this.page.prescriptionSection.style.display = 'inherit';
			this.page.otcSection.style.display = 'none';
		} else if (product.type === 'otc') {
			this.page.otcSection.style.display = 'inherit';
			this.page.prescriptionSection.style.display = 'none';
		} else {
			this.page.prescriptionSection.style.display = 'none';
			this.page.otcSection.style.display = 'none';
		}
	}

	// Show the delete confirmation modal and set up the delete event
	openDeleteModal(product) {
		this.page.deleteModal.style.display = 'flex';
		// Remove previous delete listener if present
		if (this.confirmDeleteListener) {
			this.page.confirmDelete.removeEventListener('click', this.confirmDeleteListener);
		}

		// Define a new delete event listener
		this.confirmDeleteListener = () => {
			ClientController.deleteProducts(product.id);
			this.page.deleteModal.style.display = 'none';
			this.renderData(this.currentTab);
		};

		// Attach the new event listener
		this.page.confirmDelete.addEventListener('click', this.confirmDeleteListener);
	}

	static currentId = null;

	// Attach modal close logic to a button
	closeModal(button) {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			this.closeModalOnClick(button);
		});
	}

	// Hide the appropriate modal and reset error states
	closeModalOnClick(button) {
		const method = button.dataset.method;
		let modal;

		if (method === 'cancel-form' || method === 'submit') {
			modal = this.page.formModal;
		} else if (method === 'cancel-delete') {
			modal = this.page.confirmModal;
		}

		if (modal) {
			modal.style.display = 'none';
		}
		this.page.formHeaderError.style.display = 'none';
		this.page.prescriptionSection.style.display = 'none';
		this.page.otcSection.style.display = 'none';
		this.page.formErrors.forEach((error) => {
			error.style.display = 'none';
		});
	}

	// Show/hide medicine-specific form sections based on type selection
	toggleMedicineSection(select) {
		this.page.prescriptionSection.style.display = 'none';
		this.page.otcSection.style.display = 'none';
		this.page.prescriptionFields.forEach((field) => {
			field.value = '';
		});
		this.page.otcFields.forEach((field) => {
			field.value = '';
		});

		if (select.value === 'prescription') {
			this.page.prescriptionSection.style.display = 'inherit';
		} else if (select.value === 'otc') {
			this.page.otcSection.style.display = 'inherit';
		} else {
			this.page.prescriptionSection.style.display = 'none';
			this.page.otcSection.style.display = 'none';
		}
	}

	// Create and render product cards for the data array
	createElements(data, mode) {
		this.page.dataContainer.innerHTML = '';

		// Show message if no products are available
		if (!data.length > 0) {
			const noProduct = document.createElement('p');
			noProduct.className = 'data__no-data';
			noProduct.innerHTML =
				mode === 'search'
					? 'No products found with that name'
					: 'There are no products added yet';
			this.page.dataContainer.append(noProduct);
		}

		// For each product, create a card with all relevant info and buttons
		data.forEach((product) => {
			// Create elements
			const card = document.createElement('div');
			const cardDataGroup = document.createElement('div');
			const cardHeader = document.createElement('div');
			const cardTitle = document.createElement('h3');
			const cardFooter = document.createElement('div');
			const cardText = document.createElement('div');
			const cardButtons = document.createElement('div');
			const editButton = document.createElement('button');
			const editImg = document.createElement('img');
			const deleteButton = document.createElement('button');
			const deleteImg = document.createElement('img');
			const cardlabel = document.createElement('div');
			const stock = document.createElement('p');

			const frequencyLabel = document.createElement('strong');
			const frequencyText = document.createElement('span');
			const frequency = document.createElement('div');

			// Manufacturer
			const mfrLabel = document.createElement('strong');
			const mfrText = document.createElement('span');
			const mfr = document.createElement('div');

			// Expiry Date
			const expLabel = document.createElement('strong');
			const expText = document.createElement('span');
			const exp = document.createElement('div');

			// Age
			const ageLabel = document.createElement('strong');
			const ageText = document.createElement('span');
			const age = document.createElement('div');

			// Price
			const priceLabel = document.createElement('strong');
			const priceText = document.createElement('span');
			const price = document.createElement('div');

			const dosage = product.dosage ? `${product.dosage}mg` : '';

			// Assign class names
			card.className = 'data__card card';
			cardDataGroup.className = 'card__data-group';
			cardHeader.className = 'card__header';
			cardTitle.className = 'card__title';
			cardFooter.className = 'card__footer';
			cardText.className = 'card__text';
			cardButtons.className = 'card__button-group';
			editButton.className = 'button button--edit button--card';
			deleteButton.className = 'button button--delete button--card';
			editImg.className = 'button__image button__image--edit';
			deleteImg.className = 'button__image button__image--delete';
			cardlabel.className = 'card__label';

			stock.className = 'card__stock';
			mfr.className = 'card__manufacturer';
			exp.className = 'card__expire';
			age.className = 'card__age';
			price.className = 'card__names';
			frequency.className = 'card__frequency';

			// Assign values to text elements
			cardlabel.innerText = `${product.type}`;
			cardTitle.innerText = `${product.name} ${dosage}`;
			stock.innerText = `Stock: ${product.quantity} units`;

			mfrLabel.innerText = 'Mfr: ';
			mfrText.innerText = `${product.manufacturer}`;

			expLabel.innerText = 'Exp: ';
			expText.innerText = `${product.expiryDate}`;

			editButton.dataset.method = 'edit';
			deleteButton.dataset.method = 'confirm-delete';

			let ageData = '';
			if (product.age === '1') {
				ageData = 'No age restriction';
			} else if (product.age === '18') {
				ageData = '18+';
			} else if (product.age === '21') {
				ageData = '21+';
			}

			let frequencyData = '';
			if (product.frequency === '1') {
				frequencyData = 'Once a day';
			} else if (product.frequency === '2') {
				frequencyData = 'Twice a day';
			} else if (product.frequency === '3') {
				frequencyData = 'Once a week';
			} else if (product.frequency === '4') {
				frequencyData = 'Twice a week';
			}

			ageLabel.innerText = 'Age: ';
			ageText.innerText = `${ageData}`;

			priceLabel.innerText = 'Price: ';
			priceText.innerText = `${product.price} NOK`;

			frequencyLabel.innerText = 'Frequency: ';
			frequencyText.innerText = `${frequencyData}`;

			mfr.append(mfrLabel, mfrText);
			exp.append(expLabel, expText);

			// Append labels and values for OTC products
			if (product.type === 'otc') {
				age.append(ageLabel, ageText);
				price.append(priceLabel, priceText);
				cardText.append(mfr, exp, age, price);
			}

			// Append labels and values for prescription products
			if (product.type === 'prescription') {
				frequency.append(frequencyLabel, frequencyText);
				cardText.append(mfr, exp, frequency);
			}
			// Add images
			editImg.src = `${editIcon}`;
			deleteImg.src = `${deleteIcon}`;

			// Append all elements to card
			cardHeader.append(cardTitle);
			cardDataGroup.append(cardHeader, cardText);
			editButton.append(editImg, `Edit`);
			deleteButton.append(deleteImg, `Delete`);
			cardButtons.append(editButton, deleteButton);
			cardFooter.append(stock, cardButtons);
			card.append(cardlabel, cardDataGroup, cardFooter);
			this.page.dataContainer.append(card);

			// Attach modal open logic to edit and delete buttons
			this.openModalOnClick(editButton, product);
			this.openModalOnClick(deleteButton, product);
		});
	}

	// Renders data based on product type
	renderData(type) {
		const data = JSON.parse(localStorage.getItem('products')) || [];
		const allData = data ? data : [];
		const otcData = data.filter((item) => item.type === 'otc');
		const prescriptionData = data.filter((item) => item.type === 'prescription');

		if (type === 'all') {
			this.createElements(allData);
		} else if (type === 'otc') {
			this.createElements(otcData);
		} else if (type === 'prescription') {
			this.createElements(prescriptionData);
		} else {
			console.error('Unable to render: Invalid type');
		}
	}

	// Set up tab click listeners to render data for each tab
	renderDataOnClick(tabs) {
		tabs.forEach((tab) => {
			tab.addEventListener('click', () => {
				// Remove any active tab indicator
				tabs.forEach((tab) => {
					if (tab.classList.contains('tab--active')) tab.classList.remove('tab--active');
				});

				this.currentTab = tab.dataset.id;

				// Render data for the current tab.
				this.renderData(this.currentTab);

				// Mark the current tab as active
				tab.classList.add('tab--active');
			});
		});
	}

	// Render search results
	renderSearchData(data) {
		this.createElements(data, 'search');
	}

	// Reset the search UI and show all products
	resetSearch() {
		const data = JSON.parse(localStorage.getItem('products')) || [];
		this.page.panelTitle.innerText = 'Admin Panel';
		this.page.addButton.style.display = 'flex';
		this.page.resetButton.style.display = 'none';
		this.page.searchPanel.style.display = 'none';
		this.page.tabs.style.display = 'flex';
		this.page.searchInput.value = '';

		this.createElements(data);
	}

	// Search for products by name and render results
	submitSearch(searchQuery) {
		const data = JSON.parse(localStorage.getItem('products')) || [];
		const results = data.filter((product) => {
			return product.name.toLowerCase().includes(searchQuery.toLowerCase());
		});

		this.renderSearchData(results);
		this.page.queryText.innerText = `"${searchQuery}"`;
		if (searchQuery.length > 0) {
			this.page.panelTitle.innerText = 'Search Results';
			this.page.searchPanel.style.display = 'flex';
			this.page.addButton.style.display = 'none';
			this.page.tabs.style.display = 'none';
			this.page.resetButton.style.display = 'flex';
		} else {
			this.resetSearch();
		}
	}
}

export default Ui;
