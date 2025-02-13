import Pharmaceuticals from "./pharmaceuticals.js";

class Prescription extends Pharmaceuticals {
  constructor(
    name,
    manufacturer,
    expiryDate,
    quantity,
    type,
    doesage,
    frequency
  ) {
    super(name, manufacturer, expiryDate, quantity, type, doesage, frequency);
    this.doesage = doesage;
    this.frequancy = frequency;
  }
}

export default Prescription;
