import express from 'express';
import config from 'config';

import player from './domain/player/index.js';
import game from './domain/game/index.js';
import team from './domain/team/index.js';

const app = express();
const port = config.get('api.PORT');

app.get('/', (req, res) => res.send('Hello FPL.'));
app.use('/player', player);
app.use('/game', game);
app.use('/team', team);

app.listen(port, () => console.log(`FPL on port ${port}!`));
