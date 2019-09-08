import express from 'express';
import ss from 'simple-statistics';
import _ from 'lodash';

import graphqlRepo from '../../repo/index.js';
import { teams as teamsRequest } from './query.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { teams } = await graphqlRepo.request(teamsRequest);
  const teamSummary = teams
    .map(team => {
      const groupedPlayers = _.groupBy(team.players, 'element_type');
      const groupedTotalPoints = _.mapValues(groupedPlayers, groupPlayers =>
        ss.mean(_.map(groupPlayers, 'total_points')),
      );
      return {
        name: team.name,
        groupedTotalPoints,
        totalPoints: ss.sum(Object.values(groupedTotalPoints)),
      };
    })
    .sort((teamA, teamB) => teamB.totalPoints - teamA.totalPoints);
  res.send(teamSummary);
});

export default router;
