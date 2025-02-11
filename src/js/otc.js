import Pharmaceuticals from "./pharmaceuticals.js";

class OTC extends Pharmaceuticals {
  constructor(name, manufacturer, expiryDate, quantity, type, age, price) {
    super(name, manufacturer, expiryDate, quantity, type);
    this.age = age;
    this.price = price;
  }
}

export default OTC;
