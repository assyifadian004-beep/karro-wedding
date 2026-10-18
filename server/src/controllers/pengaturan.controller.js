import * as service from '../services/pengaturan.service.js';

export async function get(_req, res, next) {
  try {
    res.json(await service.getPengaturan());
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    res.json(await service.updatePengaturan(req.body));
  } catch (err) {
    next(err);
  }
}
