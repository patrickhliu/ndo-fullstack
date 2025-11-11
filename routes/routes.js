import { createRequire } from "module";
const require = createRequire(import.meta.url);

const NintendoController = require('../controllers/NintendoController');
const WalmartController = require('../controllers/WalmartController');
const EbayController = require('../controllers/EbayController');
const express = require('express');
const router = express.Router();

router.get('/nintendo/all', NintendoController.getAll);
router.get('/walmart/all', WalmartController.getAll);
router.get('/ebay/search', EbayController.search);

export default router;