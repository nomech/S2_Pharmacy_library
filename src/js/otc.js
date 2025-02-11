import Pharmaceuticals from "./pharmaceuticals.js";

class OTC extends Pharmaceuticals {
  constructor(name, manufacturer, expiryDate, quantity, age, price) {
    super(name, manufacturer, expiryDate, quantity);
    this.age = age;
    this.price = price;
  }
}

export default OTC;
