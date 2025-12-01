export default class ProductController {
  constructor(productService) {
    this.productService = productService;

    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);

    this.setStock = this.setStock.bind(this);
    this.addStock = this.addStock.bind(this);
  }

  async create(req, res) {
    try {
      const dto = req.body;
      const item = await this.productService.createProduct(dto);
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async list(req, res) {
    const filters = { name: req.query.name, code: req.query.code };
    const items = await this.productService.listProducts(filters);
    res.json(items);
  }

  async get(req, res) {
    const item = await this.productService.getProduct(req.params.id);
    if (!item) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(item);
  }

  async update(req, res) {
    try {
      const updated = await this.productService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async remove(req, res) {
    await this.productService.deleteProduct(req.params.id);
    res.status(204).send();
  }

  async setStock(req, res) {
    try {
      const id = req.params.id;
      const { stock } = req.body;
      const updated = await this.productService.setStock(id, stock);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async addStock(req, res) {
    try {
      const id = req.params.id;
      const { amount } = req.body;
      const updated = await this.productService.addStock(id, amount);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
