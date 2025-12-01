import sqlite3 from "sqlite3";
import { promisify } from "util";
import fs from "fs";

const DB_DIR = "src/data";
const DB_FILE = `${DB_DIR}/database_oo.db`;

export default class DB {
  static instance = null;

  static getInstance() {
    if (DB.instance) return DB.instance;

    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    const db = new sqlite3.Database(DB_FILE, (err) => {
      if (err) console.error("Erro ao abrir o banco:", err.message);
      else console.log("Banco SQLite conectado:", DB_FILE);
    });

    db.run = promisify(db.run.bind(db));
    db.get = promisify(db.get.bind(db));
    db.all = promisify(db.all.bind(db));
    db.exec = promisify(db.exec.bind(db));

    DB.instance = db;
    return DB.instance;
  }
}
