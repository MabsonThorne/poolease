const express = require('express');
const router = express.Router();
const poolTablesController = require('../controllers/poolTablesController');

router.get('/', poolTablesController.getAllPoolTables);
router.post('/', poolTablesController.createOrUpdatePoolTable);
router.post('/switch-table', poolTablesController.switchTable);
router.delete('/', poolTablesController.deleteAllPoolTables);
router.delete('/:id', poolTablesController.deletePoolTable);
router.get('/available', poolTablesController.getAvailableTables); // 新增的路由

module.exports = router;
