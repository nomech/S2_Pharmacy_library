import OTC from "./otc.js";
import Prescription from "./prescription.js";

class ClientController {
  static products = JSON.parse(localStorage.getItem("products")) || [];

  static addProduct(product) {
    let item;
    if (product.type === "otc") {
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
    } else if (product.type === "prescription") {
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
      console.error("Invalid type");
    }

    this.saveProducts(ClientController.products);
  }

  static addOTC(name, manufacturer, expiryDate, type, quantity, age, price) {
    return new OTC(name, manufacturer, expiryDate, type, quantity, age, price);
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
    ClientController.products = ClientController.products.filter((product) => {
      return product.id !== id;
    });

    ClientController.saveProducts(ClientController.products);
  }

  static editProduct(editedProduct) {
    console.log(editedProduct)
    const index = ClientController.products.findIndex(
      (product) => product.id === editedProduct.id
    );

    if (index !== -1) {
      ClientController.products[index] = editedProduct;
    } else {
      console.error("Product not found");
    }

    this.saveProducts(ClientController.products);
  }
}

export default ClientController;
