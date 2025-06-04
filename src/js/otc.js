// Import base Pharmaceuticals class
import Pharmaceuticals from './pharmaceuticals.js';

// OTC (Over-the-counter) medicine class, extends Pharmaceuticals
class OTC extends Pharmaceuticals {
	constructor(name, manufacturer, expiryDate, quantity, type, age, price) {
		// Call base class constructor
		super(name, manufacturer, expiryDate, quantity, type);

		// Additional properties for OTC medicines
		this.age = age;
		this.price = price;
	}
}

export default OTC;
