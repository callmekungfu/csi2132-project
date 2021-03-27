import express from 'express';
import DB from '../../db/data-source';
import { createHotelBrandQuery } from './query';
const router = express.Router();

router.get('/', async (_, res, next) => {
  try {
    const data = await DB.select('*').from('hotel_brands');
    res.json({
      data,
    });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const rawQuery = createHotelBrandQuery(req.body);
    const data = await DB.raw(rawQuery);
    res.json({
      created: data[0],
    });
  } catch (e) {
    next(e);
  }
});

export default router;
