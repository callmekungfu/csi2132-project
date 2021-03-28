import express from 'express';
import DB from '../../db/data-source';
import { NotFoundError } from '../../lib/errors';
import {
  createHotelBrandQuery,
  selectAllHotelBrandsQuery,
  selectHotelBrandByIdQuery,
} from './query';
const router = express.Router();

router.get('/', async (_, res, next) => {
  try {
    const data = await DB.raw(selectAllHotelBrandsQuery());
    res.json({
      data: data.rows,
    });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const rawQuery = createHotelBrandQuery(req.body);
    const data = await DB.raw(rawQuery);
    res.status(201).json({
      created: data.rows[0],
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:brandId', async (req, res, next) => {
  try {
    const id = req.params.brandId;
    const data = await DB.raw(selectHotelBrandByIdQuery(+id));
    if (!data.rows?.length) {
      next(new NotFoundError(`No hotel brands with id ${id} found`));
      return;
    }
    res.json(data.rows[0]);
  } catch (e) {
    next(e);
  }
});

export default router;
