import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({
    hotel_brands: '/hotel-brands',
  });
});

export default router;
