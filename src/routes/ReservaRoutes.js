import { Router } from "express";
import ReservationRepository from "../repositories/ReservationRepository.js";
import ReservationService from "../services/ReservationService.js";
import ReservationController from "../controllers/ReservationController.js";
import ProductRepository from "../repositories/ProductRepository.js";
import DB from "../utils/Database.js";

export default class ReservaRoutes {
  static create() {
    const router = Router();
    const db = DB.getInstance();

    const reservationRepo = new ReservationRepository(db);
    const productRepo = new ProductRepository(db);

    const service = new ReservationService(reservationRepo, productRepo);
    const controller = new ReservationController(service);

    /**
     * @swagger
     * components:
     *   schemas:
     *     Reserva:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *         product_code:
     *           type: string
     *         customer_name:
     *           type: string
     *         customer_number:
     *           type: string
     *         created_at:
     *           type: string
     *           format: date-time
     *       required:
     *         - product_code
     */

    /**
     * @swagger
     * /reservas:
     *   post:
     *     summary: Cria uma nova reserva (reduz stock do produto)
     *     tags: [Reservas]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               product_code:
     *                 type: string
     *               customer_name:
     *                 type: string
     *               customer_number:
     *                 type: string
     *               quantity:
     *                 type: string
     *             required:
     *               - product_code
     *     responses:
     *       201:
     *         description: Reserva criada
     *       400:
     *         description: Produto não encontrado ou stock insuficiente
     *
     *   get:
     *     summary: Lista todas as reservas
     *     tags: [Reservas]
     *     responses:
     *       200:
     *         description: Lista de reservas
     */

    /**
     * @swagger
     * /reservas/{id}:
     *   delete:
     *     summary: Remove uma reserva (reposição de stock)
     *     tags: [Reservas]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Reserva removida
     *       404:
     *         description: Reserva não encontrada
     */

    router.post("/", controller.create);
    router.get("/", controller.list);
    router.delete("/:id", controller.remove);

    return router;
  }
}
