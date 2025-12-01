import { Router } from "express";
import ProductRepository from "../repositories/ProductRepository.js";
import ProductService from "../services/ProductService.js";
import ProductController from "../controllers/ProductController.js";
import DB from "../utils/Database.js";

export default class ProdutoRoutes {
  static create() {
    const router = Router();
    const db = DB.getInstance();

    const repo = new ProductRepository(db);
    const service = new ProductService(repo);
    const controller = new ProductController(service);

    /**
     * @swagger
     * components:
     *   schemas:
     *     Produto:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *         code:
     *           type: string
     *         name:
     *           type: string
     *         price:
     *           type: number
     *         stock:
     *           type: integer
     *         imageUrl:
     *           type: string
     *         created_at:
     *           type: string
     *           format: date-time
     *       required:
     *         - code
     *         - name
     *         - price
     *         - stock
     */

    /**
     * @swagger
     * /produtos:
     *   post:
     *     summary: Cria um novo produto
     *     tags: [Produtos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Produto'
     *     responses:
     *       201:
     *         description: Produto criado
     *       400:
     *         description: Dados inválidos
     *
     *   get:
     *     summary: Lista produtos com filtros opcionais (code, name)
     *     tags: [Produtos]
     *     parameters:
     *       - name: code
     *         in: query
     *         schema:
     *           type: string
     *       - name: name
     *         in: query
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Lista de produtos
     */

    /**
     * @swagger
     * /produtos/{id}:
     *   get:
     *     summary: Obtém um produto por ID
     *     tags: [Produtos]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Produto encontrado
     *       404:
     *         description: Produto não encontrado
     *
     *   put:
     *     summary: Atualiza um produto
     *     tags: [Produtos]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Produto'
     *     responses:
     *       200:
     *         description: Produto atualizado
     *       404:
     *         description: Produto não encontrado
     *
     *   delete:
     *     summary: Remove um produto
     *     tags: [Produtos]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Produto removido
     */

    /**
     * @swagger
     * /produtos/{id}/stock:
     *   patch:
     *     summary: Define o stock de um produto
     *     tags: [Produtos]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               stock:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Stock atualizado
     */

    /**
     * @swagger
     * /produtos/{id}/stock/add:
     *   patch:
     *     summary: Incrementa ou decrementa o stock de um produto
     *     tags: [Produtos]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               amount:
     *                 type: integer
     *                 description: Valor positivo para adicionar, negativo para remover
     *     responses:
     *       200:
     *         description: Stock alterado
     */

    router.post("/", controller.create);
    router.get("/", controller.list);
    router.get("/:id", controller.get);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.remove);
    router.patch("/:id/stock", controller.setStock);
    router.patch("/:id/stock/add", controller.addStock);

    return router;
  }
}
