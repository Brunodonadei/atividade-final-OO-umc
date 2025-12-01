export default class ReservationRepository {
  constructor(db) {
    this.db = db;
    this.init();
  }

  async init() {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS reservations (
        id TEXT PRIMARY KEY,
        product_code TEXT UNIQUE NOT NULL,
        customer_name TEXT,
        customer_number TEXT,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TEXT
      )
    `);
  }

  async create(reservation) {
    await this.db.run(
      `INSERT INTO reservations (id, product_code, customer_name, customer_number, quantity, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
      [
        reservation.id,
        reservation.product_code,
        reservation.customer_name,
        reservation.customer_number,
        reservation.quantity,
        reservation.created_at,
      ]
    );
    return await this.findById(reservation.id);
  }

  async findAll() {
    return await this.db.all(
      `SELECT * FROM reservations ORDER BY created_at DESC`
    );
  }

  async findById(id) {
    return await this.db.get(`SELECT * FROM reservations WHERE id = ?`, [id]);
  }

  async findByProductCode(product_code) {
    return await this.db.get(
      `SELECT * FROM reservations WHERE product_code = ?`,
      [product_code]
    );
  }

  async deleteById(id) {
    return await this.db.run(`DELETE FROM reservations WHERE id = ?`, [id]);
  }
}
