import * as service from '../services/booking.service.js';

export async function list(_req, res, next) {
  try {
    res.json(await service.listPermintaan());
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = await service.buatPermintaan(req.body);
    res.status(201).json({ message: 'Permintaan booking diterima.', data });
  } catch (err) {
    next(err);
  }
}
