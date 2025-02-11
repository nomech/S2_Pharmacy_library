import OTC from "./otc.js";
import Prescription from "./prescription.js";

class ClientController {
  static addProduct(name,manufacturer,expiryDate,quantity,type,age,price,dosage,frequency) {
    this.product = null;
    if (type === "otc") {
      this.product = this.addOTC(name,manufacturer,expiryDate,quantity,type,age,price);
    } else if (type === "prescription") {
      this.product = this.addPrescription(name,manufacturer,expiryDate,quantity,type,dosage,frequency);
    } else {
      console.log("Invalid type");
    }
  }

  static addOTC(name, manufacturer, expiryDate, quantity, age, price) {
    const otc = new OTC(name, manufacturer, expiryDate, quantity, age, price);
    console.log(otc);
  }

  static addPrescription(name,manufacturer,expiryDate,quantity,type,dosage,frequency) {
    const prescription = new Prescription(name,manufacturer,expiryDate,quantity,type,dosage,frequency);
    console.log(prescription);
  }
}

export default ClientController;
