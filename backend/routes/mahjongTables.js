const express = require('express');
const router = express.Router();
const mahjongTablesController = require('../controllers/mahjongTablesController');

router.get('/', mahjongTablesController.getAllMahjongTables);
router.post('/', mahjongTablesController.createMahjongTable);
router.get('/:id', mahjongTablesController.getMahjongTableById);
router.put('/:id', mahjongTablesController.updateMahjongTable);
router.delete('/:id', mahjongTablesController.deleteMahjongTable);
router.post('/start-billing', mahjongTablesController.startBilling);
router.put('/end-billing/:id', mahjongTablesController.endBilling);

module.exports = router;
