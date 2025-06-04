// Import OTC and Prescription classes
import OTC from './otc.js';
import Prescription from './prescription.js';

class ClientController {
	// Static array to hold all products, loaded from localStorage
	static products = JSON.parse(localStorage.getItem('products')) || [];

	// Add a new product (OTC or Prescription) to the inventory
	static addProduct(product) {
		let item;
		if (product.type === 'otc') {
			// Create OTC product instance
			item = this.addOTC(
				product.name,
				product.manufacturer,
				product.expiryDate,
				product.quantity,
				product.type,
				product.age,
				product.price
			);

			ClientController.products.push(item);
		} else if (product.type === 'prescription') {
			// Create Prescription product instance
			item = this.addPrescription(
				product.name,
				product.manufacturer,
				product.expiryDate,
				product.quantity,
				product.type,
				product.dosage,
				product.frequency
			);

			ClientController.products.push(item);
		} else {
			// Handle invalid product type
			console.error('Invalid type');
		}

		// Save updated products array to localStorage
		this.saveProducts(ClientController.products);
	}

	// Helper to create an OTC product instance
	static addOTC(name, manufacturer, expiryDate, type, quantity, age, price) {
		return new OTC(name, manufacturer, expiryDate, type, quantity, age, price);
	}

	// Helper to create a Prescription product instance
	static addPrescription(name, manufacturer, expiryDate, quantity, type, dosage, frequency) {
		return new Prescription(name, manufacturer, expiryDate, quantity, type, dosage, frequency);
	}

	// Save products array to localStorage
	static saveProducts(products) {
		localStorage.setItem('products', JSON.stringify(products));
	}

	// Delete a product by its unique ID
	static deleteProducts(id) {
		ClientController.products = ClientController.products.filter((product) => {
			return product.id !== id;
		});

		ClientController.saveProducts(ClientController.products);
	}

	// Edit an existing product by replacing it in the array
	static editProduct(editedProduct) {
		const index = ClientController.products.findIndex(
			(product) => product.id === editedProduct.id
		);

		if (index !== -1) {
			ClientController.products[index] = editedProduct;
		} else {
			// Handle case where product is not found
			console.error('Product not found');
		}

		this.saveProducts(ClientController.products);
	}
}

export default ClientController;
