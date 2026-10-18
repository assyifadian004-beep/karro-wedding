import { validationResult } from 'express-validator';

export function validate(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(Object.assign(new Error('Data tidak valid.'), { statusCode: 400, errors: errors.array() }));
  }
  next();
}
