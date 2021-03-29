import express from 'express';
import DB from '../../db/data-source';
import { NotFoundError, BadRequestError } from '../../lib/errors';
import {
  selectAllRoomsInHotelQuery,
  selectRoomByRoomIdAndHotelIdQuery,
} from './query';
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  const { hotelId } = req.params;

  if (!hotelId) {
    next(new BadRequestError(`Hotel ID is not required but missing.`));
    return;
  }

  try {
    const data = await DB.raw(selectAllRoomsInHotelQuery(+hotelId));
    res.json({
      data: data.rows,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:roomId', async (req, res, next) => {
  try {
    const { hotelId, brandId, roomId } = req.params;

    if (!roomId || !hotelId) {
      next(new BadRequestError(`Invalid Request Parameters`));
      return;
    }

    const data = await DB.raw(
      selectRoomByRoomIdAndHotelIdQuery(+roomId, +hotelId, +brandId),
    );
    if (!data.rows?.length) {
      next(new NotFoundError(`No hotel with id ${hotelId} found`));
      return;
    }
    res.json(data.rows[0]);
  } catch (e) {
    next(e);
  }
});

export default router;
