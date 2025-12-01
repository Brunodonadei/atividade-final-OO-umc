export default class ProductRepository {
  constructor(db) {
    this.db = db;
    this.init();
  }

  async init() {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        name TEXT,
        price REAL,
        imageUrl TEXT,
        stock INTEGER DEFAULT 0,
        created_at TEXT
      )
    `);
  }

  async create(product) {
    await this.db.run(
      `INSERT INTO products (id, code, name, price, imageUrl, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        product.id,
        product.code,
        product.name,
        product.price,
        product.imageUrl,
        product.created_at,
      ]
    );

    return await this.findById(product.id);
  }

  async updateById(id, patch) {
    const current = await this.findById(id);
    if (!current) return null;

    const updated = {
      code: patch.code ?? current.code,
      name: patch.name ?? current.name,
      price: patch.price ?? current.price,
      imageUrl: patch.imageUrl ?? current.imageUrl,
      stock: patch.stock ?? current.stock,
    };

    await this.db.run(
      `UPDATE products
       SET code = ?, name = ?, price = ?, imageUrl = ?, stock = ?
       WHERE id = ?`,
      [
        updated.code,
        updated.name,
        updated.price,
        updated.imageUrl,
        updated.stock,
        id,
      ]
    );

    return await this.findById(id);
  }

  async findAll(filters = {}) {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];
    if (filters.name) {
      query += " AND name LIKE ?";
      params.push(`%${filters.name}%`);
    }
    if (filters.code) {
      query += " AND code = ?";
      params.push(filters.code);
    }
    query += " ORDER BY created_at DESC";
    return await this.db.all(query, params);
  }

  async findById(id) {
    return await this.db.get(`SELECT * FROM products WHERE id = ?`, [id]);
  }

  async findByCode(code) {
    return await this.db.get(`SELECT * FROM products WHERE code = ?`, [code]);
  }

  async deleteById(id) {
    return await this.db.run(`DELETE FROM products WHERE id = ?`, [id]);
  }

  async updateStock(id, amount) {
    const product = await this.findById(id);
    if (!product) throw new Error("Produto não encontrado");

    const newStock = amount;
    await this.db.run(`UPDATE products SET stock = ? WHERE id = ?`, [
      newStock,
      id,
    ]);
    return await this.findById(id);
  }

  async setStock(req, res) {
    try {
      const { stock } = req.body;
      const updated = await this.productService.setStock(req.params.id, stock);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async addStock(id, amount) {
    await this.db.run(`UPDATE products SET stock = stock + ? WHERE id = ?`, [
      amount,
      id,
    ]);
    return await this.findById(id);
  }

  async changeStock(id, delta) {
    const product = await this.findById(id);
    if (!product) throw new Error("Produto não encontrado");

    const newStock = (product.stock ?? 0) + delta;
    if (newStock < 0) throw new Error("Stock insuficiente");

    await this.db.run(`UPDATE products SET stock = ? WHERE id = ?`, [
      newStock,
      id,
    ]);
    return await this.findById(id);
  }
}
