import express from 'express';

import graphqlRepo from '../../repo/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  // TODO graphql eslint + graphql type help + graphql syntax highlight
  const query = `
    query {
      player(id: 1) {
        id
        first_name
        second_name
      }
    }
  `;
  const result = await graphqlRepo.request(query);
  res.send(result);
});

export default router;
