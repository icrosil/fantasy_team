import express from 'express';

import position from './position.js';

const router = express.Router();

router.use('/position', position);

export default router;
