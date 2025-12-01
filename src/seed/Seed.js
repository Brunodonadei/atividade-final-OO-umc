// src/seed/Seed.js
import ProductRepository from "../repositories/ProductRepository.js";
import DB from "../utils/Database.js";

export default class Seed {
  static async run() {
    const db = await DB.getInstance();

    await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        code TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        imageUrl TEXT,
        created_at TEXT NOT NULL
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS reservations (
        id TEXT PRIMARY KEY,
        product_code TEXT NOT NULL,
        customer_name TEXT,
        customer_number TEXT,
        created_at TEXT
      );
    `);

    const row = await db.get("SELECT COUNT(*) AS c FROM products");
    if (row.c === 0) {
      const repo = new ProductRepository(db);

      await repo.create({
        id: "seed-1",
        code: "#P100",
        name: "Vestido floral",
        price: 79.9,
        imageUrl: "",
        created_at: new Date().toISOString(),
      });

      await repo.create({
        id: "seed-2",
        code: "#P101",
        name: "Camisa social",
        price: 49.9,
        imageUrl: "",
        created_at: new Date().toISOString(),
      });

      console.log("Seed executada com sucesso.");
    } else {
      console.log("Seed ignorada — produtos já existem.");
    }
  }
}
