import express from 'express';
import DB from '../../db/data-source';
import { NotFoundError, BadRequestError } from '../../lib/errors';
import { selectAllHotelsOfBrandQuery, selectHotelByIdQuery } from './query';
import RoomRouter from '../rooms/handler';
import BookingRouter from '../bookings/handler';
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  const { brandId } = req.params;

  if (!brandId) {
    next(new BadRequestError(`Brand id is required but missing from request.`));
    return;
  }

  try {
    const data = await DB.raw(selectAllHotelsOfBrandQuery(+brandId));
    res.json({
      data: data.rows,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:hotelId', async (req, res, next) => {
  try {
    const { hotelId, brandId } = req.params;

    if (!hotelId) {
      next(new BadRequestError(`No hotel brand with id ${hotelId} found`));
      return;
    }

    const data = await DB.raw(selectHotelByIdQuery(+hotelId, +brandId));
    if (!data.rows?.length) {
      next(new NotFoundError(`No hotel with id ${hotelId} found`));
      return;
    }
    res.json(data.rows[0]);
  } catch (e) {
    next(e);
  }
});

router.use('/:hotelId/rooms', RoomRouter);
router.use('/:hotelId/bookings', BookingRouter);

export default router;
