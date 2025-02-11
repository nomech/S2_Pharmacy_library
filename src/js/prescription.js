import Pharmaceuticals from "./pharmaceuticals.js";

class Prescription extends Pharmaceuticals {
  constructor(name, manufacturer, expiryDate, quantity, doseage, frequancy) {
    super(name, manufacturer, expiryDate, quantity, doseage, frequancy);
    this.doseage = doseage;
    this.frequancy = frequancy;
  }
}

export default Prescription;
