import express from 'express';
import DB from '../../db/data-source';
import { NotFoundError, BadRequestError } from '../../lib/errors';
import {
  selectAllBookingsByHotelIdQuery,
  selectBookingByBookingIdQuery,
} from './query';
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  const { hotelId } = req.params;

  if (!hotelId) {
    next(
      new BadRequestError('Hotel id is required but missing from the request'),
    );
    return;
  }

  try {
    const data = await DB.raw(selectAllBookingsByHotelIdQuery(+hotelId));
    res.json({
      data: data.rows,
    });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = await DB('bookings').insert(req.body, ['booking_id']);
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
});

router.get('/:bookingId', async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      next(
        new BadRequestError(
          `Booking id is required but missing from the request`,
        ),
      );
      return;
    }

    const data = await DB.raw(selectBookingByBookingIdQuery(+bookingId));
    if (!data.rows?.length) {
      next(new NotFoundError(`No boking with id ${bookingId} found`));
      return;
    }
    res.json(data.rows[0]);
  } catch (e) {
    next(e);
  }
});

router.put('/:bookingId/check-in', async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      next(
        new BadRequestError(
          `Booking id is required but missing from the request`,
        ),
      );
      return;
    }

    const updates: Record<string, any> = {
      checked_in_staff: req.body.employee_id,
      checked_in: true,
    };

    const data = await DB('bookings')
      .where('booking_id', '=', +bookingId)
      .update(updates, ['booking_id']);
    res.json(data);
  } catch (e) {
    next(e);
  }
});

export default router;
