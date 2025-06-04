// Main form validation function
const formValidator = (form, id) => {
	let type = 'common';
	let isValid = true;
	const productData = {};

	// Loop through form elements to validate inputs
	for (let element of form) {
		if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
			// Only validate fields relevant to the current type
			if (type === element.dataset.type) {
				// Check if value is missing or not selected
				if (!element.value || element.value === 'none') {
					element.placeholder = `${element.name} is required`;
					isValid = false;

					// Show error for select or date fields
					if (element.tagName === 'SELECT' || element.type === `date`) {
						element.nextElementSibling.style.display = 'block';
					}
				} else if (element.tagName === 'SELECT') {
					// Hide error if select is valid
					element.nextElementSibling.style.display = 'none';
				}

				// If type field, update type for next fields
				if (element.name === 'type') {
					type = element.value;
				}
			}
		}

		// Collect data for duplicate checking
		if (element.name === 'name' || element.name === 'manufacturer' || element.name === 'type') {
			productData[element.name] = element.value.toLowerCase();
		}
	}

	// Check for duplicate products in localStorage
	const duplicateCheck = CheckExistingDataForDuplicates(productData, form.dataset.mode, id);

	return { duplicateCheck, isValid };
};

// Helper to check for duplicates in localStorage
const CheckExistingDataForDuplicates = (data, mode, id) => {
	let duplicatesFound = false;
	const products = JSON.parse(localStorage.getItem('products')) || [];
	const productsData = products.find((product) => product.id === id);

	if (mode === 'edit') {
		// For edit mode, only check if changed fields would cause a duplicate
		Object.keys(data).forEach((key) => {
			if (productsData[key].toLowerCase() !== data[key]) {
				duplicatesFound = duplicateChecker(products, data);
			} else {
				return duplicatesFound;
			}
		});
	} else {
		// For add mode, check all products
		duplicatesFound = duplicateChecker(products, data);
	}

	return duplicatesFound;
};

// Helper to check if any product matches all provided data fields
const duplicateChecker = (products, data) => {
	let duplicates = false;
	products.forEach((product) => {
		if (Object.keys(data).every((key) => data[key] === product[key].toLowerCase())) {
			duplicates = true;
		}
	});
	return duplicates;
};

export default formValidator;
