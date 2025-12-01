import { v4 as uuidv4 } from "uuid";

export default class Reservation {
  constructor({
    id = null,
    product_code,
    customer_name = null,
    customer_number = null,
    quantity = 1,
    created_at = null,
  }) {
    this.id = id || uuidv4();
    this.product_code = product_code;
    this.customer_name = customer_name;
    this.customer_number = customer_number;
    this.quantity = quantity;
    this.created_at = created_at || new Date().toISOString();
  }

  toPlain() {
    return {
      id: this.id,
      product_code: this.product_code,
      customer_name: this.customer_name,
      customer_number: this.customer_number,
      quantity: this.quantity,
      created_at: this.created_at,
    };
  }
}
