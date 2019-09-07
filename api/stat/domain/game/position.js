import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  // mock for now
  const mean = {
    goalKeeper: 9,
    defender: 7,
    midfielder: 10,
    forward: 12,
  };
  res.send(mean);
});

export default router;
