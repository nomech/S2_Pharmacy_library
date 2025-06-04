// Import uuid for unique product IDs
import { v4 as uuidv4 } from 'uuid';

// Base class for all pharmaceutical products
class Pharmaceuticals {
	constructor(name, manufacturer, expiryDate, quantity, type) {
		// Generate a unique ID for each product
		this.id = uuidv4();
		this.name = name;
		this.manufacturer = manufacturer;
		this.expiryDate = expiryDate;
		this.quantity = quantity;
		this.type = type;
	}
}

export default Pharmaceuticals;
