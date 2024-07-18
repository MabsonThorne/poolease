const express = require('express');
const router = express.Router();
const mahjongTablesController = require('../controllers/mahjongTablesController');

router.get('/', mahjongTablesController.getAllMahjongTables);
router.post('/', mahjongTablesController.createMahjongTable);
router.get('/:id', mahjongTablesController.getMahjongTableById);
router.put('/:id', mahjongTablesController.updateMahjongTable);
router.delete('/:id', mahjongTablesController.deleteMahjongTable);

module.exports = router;
