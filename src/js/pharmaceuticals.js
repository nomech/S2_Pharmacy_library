import { v4 as uuidv4 } from 'uuid';

class Pharmaceuticals {
  constructor(name, manufacturer, expiryDate, quantity, type) {
    this.id = uuidv4();
    this.name = name;
    this.manufacturer = manufacturer;
    this.expiryDate = expiryDate;
    this.quantity = quantity;
    this.type = type;
  }
}

export default Pharmaceuticals;
