import Reservation from "../models/Reservation.js";

export default class ReservationService {
  constructor(reservationRepository, productRepository) {
    this.reservationRepository = reservationRepository;
    this.productRepository = productRepository;
  }

  async createReservation({
    product_code,
    customer_name = null,
    customer_number = null,
    quantity = 1,
  }) {
    if (!product_code) throw new Error("product_code obrigatório");
    const product = await this.productRepository.findByCode(product_code);
    if (!product) throw new Error("Produto não encontrado");
    if (product.stock < quantity) throw new Error("Estoque insuficiente");

    const reservation = new Reservation({
      product_code,
      customer_name,
      customer_number,
      quantity,
    });
    await this.productRepository.addStock(product.id, -quantity);
    return await this.reservationRepository.create(reservation.toPlain());
  }

  async listReservations() {
    return await this.reservationRepository.findAll();
  }

  async deleteReservation(id) {
    const existing = await this.reservationRepository.findById(id);
    if (!existing) {
      throw new Error("Reserva não encontrada");
    }
    await this.reservationRepository.deleteById(id);
    return true;
  }
}
