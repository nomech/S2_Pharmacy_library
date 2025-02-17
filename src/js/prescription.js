import Pharmaceuticals from "./pharmaceuticals.js";

class Prescription extends Pharmaceuticals {
  constructor(
    name,
    manufacturer,
    expiryDate,
    quantity,
    type,
    dosage,
    frequency
  ) {
    super(name, manufacturer, expiryDate, quantity, type, dosage, frequency);
    this.dosage = dosage;
    this.frequancy = frequency;
  }
}

export default Prescription;
