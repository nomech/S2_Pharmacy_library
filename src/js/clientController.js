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
    ClientController.products = ClientController.products.filter((product) => {
      return product.id !== id;
    });

    ClientController.saveProducts(ClientController.products);
  }

  static editProduct(editedProduct) {
    const index = ClientController.products.findIndex(
      (product) => product.id === editedProduct.id
    );

    if (index !== -1) {
      const editedType = editedProduct.type;
      let currentType = ClientController.products[index].type;

      ClientController.products[index] = editedProduct;
    } else {
      console.log("Product not found");
    }

    this.saveProducts(ClientController.products);
  }
}

export default ClientController;
