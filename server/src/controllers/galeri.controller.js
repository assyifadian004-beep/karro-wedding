import * as service from '../services/galeri.service.js';

export async function list(_req, res, next) {
  try {
    res.json(await service.listGaleri());
  } catch (err) {
    next(err);
  }
}

export async function listByPaket(req, res, next) {
  try {
    res.json(await service.listGaleriPaket(Number(req.params.paketId)));
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    res.status(201).json(await service.tambahGaleri(req.body, req.file));
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    res.json(await service.editGaleri(Number(req.params.id), req.body));
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await service.hapusGaleri(Number(req.params.id));
    res.json({ message: 'Foto dihapus.' });
  } catch (err) {
    next(err);
  }
}
