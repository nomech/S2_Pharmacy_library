import OTC from "./otc.js";
import Prescription from "./prescription.js";

class ClientController {
  static products = JSON.parse(localStorage.getItem("products")) || {
    all: [],
    otc: [],
    prescription: [],
  };

  static addProduct(
    name,
    manufacturer,
    expiryDate,
    quantity,
    type,
    age,
    price,
    dosage,
    frequency
  ) {
    if (type === "otc") {
      this.product = this.addOTC(
        name,
        manufacturer,
        expiryDate,
        quantity,
        type,
        age,
        price
      );
      ClientController.products.otc.push(this.product);
      ClientController.products.all.push(this.product);
    } else if (type === "prescription") {
      this.product = this.addPrescription(
        name,
        manufacturer,
        expiryDate,
        quantity,
        type,
        dosage,
        frequency
      );
      ClientController.products.prescription.push(this.product);
      ClientController.products.all.push(this.product);
    } else {
      console.log("Invalid type");
    }

    this.saveProducts(ClientController.products);
  }

  static addOTC(name, manufacturer, expiryDate, quantity, age, price) {
    return new OTC(name, manufacturer, expiryDate, quantity, age, price);
  }

  static addPrescription(
    name,
    manufacturer,
    expiryDate,
    quantity,
    type,
    dosage,
    frequency
  ) {
    return new Prescription(
      name,
      manufacturer,
      expiryDate,
      quantity,
      type,
      dosage,
      frequency
    );
  }

  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static deleteProducts(id) {
    console.log(id);
    console.log(ClientController.products);
    ClientController.products.all = ClientController.products.all.filter(
      (product) => {
        return product.id !== id;
      }
    );
    ClientController.products.otc = ClientController.products.otc.filter(
      (product) => {
        return product.id !== id;
      }
    );
    ClientController.products.prescription =
      ClientController.products.prescription.filter((product) => {
        return product.id !== id;
      });

    this.saveProducts(ClientController.products);
  }
}

export default ClientController;
