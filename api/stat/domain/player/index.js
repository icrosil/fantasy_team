import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await axios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
  res.send(result.data);
});

export default router;
