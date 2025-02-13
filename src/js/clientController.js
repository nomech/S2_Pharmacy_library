import OTC from "./otc.js";
import Prescription from "./prescription.js";

class ClientController {
  static products = JSON.parse(localStorage.getItem("products")) || {
    all: [],
    otc: [],
    prescription: [],
  };

  static addProduct(product) {
    if (product.type === "otc") {
      this.product = this.addOTC(
        product.name,
        product.manufacturer,
        product.expiryDate,
        product.quantity,
        product.type,
        product.age,
        product.price
      );
      ClientController.products.otc.push(this.product);
      ClientController.products.all.push(this.product);
    } else if (product.type === "prescription") {
      this.product = this.addPrescription(
        product.name,
        product.manufacturer,
        product.expiryDate,
        product.quantity,
        product.type,
        product.dosage,
        product.frequency
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
    frequency,
    price
  ) {
    return new Prescription(
      name,
      manufacturer,
      expiryDate,
      quantity,
      type,
      dosage,
      frequency,
      price
    );
  }

  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static deleteProducts(id) {
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

  static editProduct(editedProduct) {
    const index = ClientController.products.all.findIndex(
      (product) => product.id === editedProduct.id
    );

    if (index !== -1) {
      const editedType = editedProduct.type;
      let currentType = ClientController.products.all[index].type;

      ClientController.products.all[index] = editedProduct;
    } else {
      console.log("Product not found");
    }

    this.saveProducts(ClientController.products);
  }
}

export default ClientController;
