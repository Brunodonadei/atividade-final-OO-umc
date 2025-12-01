import Product from "../models/Product.js";

export default class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async createProduct({ code, name = null, price = null, imageUrl = null }) {
    if (!code) throw new Error("Código obrigatório");

    const product = new Product({ code, name, price, imageUrl });
    return await this.productRepository.create(product.toPlain());
  }

  async updateProduct(id, patch) {
    return await this.productRepository.updateById(id, patch);
  }

  async listProducts() {
    return await this.productRepository.findAll();
  }

  async getProduct(id) {
    return await this.productRepository.findById(id);
  }

  async deleteProduct(id) {
    return await this.productRepository.deleteById(id);
  }

  async setStock(id, stock) {
    const product = await this.productRepository.findById(id);
    if (!product) return null;

    product.stock = stock;
    await this.productRepository.updateById(id, { stock: product.stock });
    return await this.productRepository.findById(id);
  }

  async addStock(id, amount) {
    const product = await this.productRepository.findById(id);
    if (!product) return null;

    product.stock = (product.stock || 0) + amount;
    if (product.stock < 0) product.stock = 0;
    await this.productRepository.updateById(id, { stock: product.stock });
    return await this.productRepository.findById(id);
  }
}
