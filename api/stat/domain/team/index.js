import express from 'express';
import ss from 'simple-statistics';

import graphqlRepo from '../../repo/index.js';
import { teams as teamsRequest } from './query.js';

const router = express.Router();

router.get('/topThisSeason', async (req, res) => {
  const { teams } = await graphqlRepo.request(teamsRequest);
  const teamSummary = teams
    .map(team => ({
      name: team.name,
      totalPoints: ss.sum(team.players.map(({ total_points: points }) => points)),
    }))
    .sort((teamA, teamB) => teamB.totalPoints - teamA.totalPoints);
  res.send(teamSummary);
});

export default router;
