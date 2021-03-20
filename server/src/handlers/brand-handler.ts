import express from 'express';
import DB from '../db/data-source';
const router = express.Router();

router.get('/', async (req, res) => {
  const data = await DB.select('*').from('hotel_brands');
  console.log(data);
  res.json({
    data,
  });
});

export default router;
