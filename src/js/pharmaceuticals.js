import { v4 as uuidv4 } from 'uuid';

class Pharmaceuticals {
  constructor(name, manufacturer, expiryDate, quantity) {
    this.id = uuidv4();
    this.name = name;
    this.manufacturer = manufacturer;
    this.expiryDate = expiryDate;
    this.quantity = quantity;
  }
}

export default Pharmaceuticals;
