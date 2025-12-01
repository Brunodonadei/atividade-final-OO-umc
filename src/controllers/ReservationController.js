export default class ReservationController {
  constructor(reservationService) {
    this.reservationService = reservationService;
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.remove = this.remove.bind(this);
  }

  async create(req, res) {
    try {
      const dto = req.body;
      const reservation = await this.reservationService.createReservation(dto);
      res.status(201).json(reservation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async list(req, res) {
    try {
      const items = await this.reservationService.listReservations();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async remove(req, res) {
    try {
      await this.reservationService.deleteReservation(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}
