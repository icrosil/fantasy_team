import express from 'express';
import config from 'config';

import player from './domain/player/index.js';

const app = express();
const port = config.get('api.PORT');

app.get('/', (req, res) => res.send('Hello FPL.'));
app.use('/player', player);

app.listen(port, () => console.log(`FPL on port ${port}!`));
