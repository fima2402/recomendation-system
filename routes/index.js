import express from 'express';
import AHP from '../functions/AHP/index.js'
import electre from '../functions/electre/index.js';
import saw from '../functions/SAW/index.js';
import { school } from '../database/index.js';

const router = express.Router();
const schoolData = school();

router.get('/', async (req, res) => {
    res.send('Welcom Boi!');
});

// Ekspor router sebagai default
export default router;
