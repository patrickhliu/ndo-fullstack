import { createRequire } from "module";
const require = createRequire(import.meta.url);

const NintendoController = require('../controllers/NintendoController');
const express = require('express');
const router = express.Router();

router.get('/all', NintendoController.getAll);

export default router;