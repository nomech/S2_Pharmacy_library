// Import base Pharmaceuticals class
import Pharmaceuticals from './pharmaceuticals.js';

// Prescription medicine class, extends Pharmaceuticals
class Prescription extends Pharmaceuticals {
	constructor(name, manufacturer, expiryDate, quantity, type, dosage, frequency) {
		// Call base class constructor
		super(name, manufacturer, expiryDate, quantity, type, dosage, frequency);

		// Additional properties for prescription medicines
		this.dosage = dosage;
		this.frequency = frequency;
	}
}

export default Prescription;
