import express from 'express';
import config from 'config';

const app = express();
const port = config.get('api.PORT');

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
