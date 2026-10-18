import * as service from '../services/testimoni.service.js';

export async function list(_req, res, next) {
  try {
    res.json(await service.listTestimoni());
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    res.status(201).json(await service.tambahTestimoni(req.body, req.file));
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    res.json(await service.editTestimoni(Number(req.params.id), req.body, req.file));
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await service.hapusTestimoni(Number(req.params.id));
    res.json({ message: 'Testimoni dihapus.' });
  } catch (err) {
    next(err);
  }
}
