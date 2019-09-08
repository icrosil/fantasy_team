import express from 'express';

import graphqlRepo from '../../repo/index.js';
import { player } from './query.js';

const router = express.Router();

router.get('/', async (req, res) => {
  // TODO graphql eslint + graphql type help + graphql syntax highlight
  const result = await graphqlRepo.request(player);
  res.send(result);
});

export default router;
