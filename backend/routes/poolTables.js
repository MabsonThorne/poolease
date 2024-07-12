const express = require('express');
const router = express.Router();
const poolTablesController = require('../controllers/poolTablesController');

router.get('/', poolTablesController.getAllPoolTables);
router.post('/', poolTablesController.createPoolTable);
router.get('/:id', poolTablesController.getPoolTableById);
router.put('/:id', poolTablesController.updatePoolTable);
router.delete('/:id', poolTablesController.deletePoolTable);
router.post('/start-billing', poolTablesController.startBilling);
router.put('/end-billing/:id', poolTablesController.endBilling);

module.exports = router;
