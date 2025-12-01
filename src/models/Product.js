export default class Product {
  constructor({
    id = null,
    code,
    name = null,
    price = null,
    imageUrl = null,
    stock = 0,
    created_at = null,
  }) {
    this.id = id || crypto.randomUUID();
    this.code = code;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.stock = stock;
    this.created_at = created_at || new Date().toISOString();
  }

  toPlain() {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      price: this.price,
      imageUrl: this.imageUrl,
      stock: this.stock,
      created_at: this.created_at,
    };
  }
}
