import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('player1')
})

export default router;
