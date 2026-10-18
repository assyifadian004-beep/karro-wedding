import * as service from '../services/paket.service.js';

export async function list(_req, res, next) {
  try {
    res.json(await service.listPaket());
  } catch (err) {
    next(err);
  }
}

export async function detail(req, res, next) {
  try {
    res.json(await service.detailPaket(req.params.slug));
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    res.status(201).json(await service.tambahPaket(req.body, req.file));
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    res.json(await service.editPaket(Number(req.params.id), req.body, req.file));
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await service.hapusPaket(Number(req.params.id));
    res.json({ message: 'Paket dihapus.' });
  } catch (err) {
    next(err);
  }
}
