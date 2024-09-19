// controllers/cityController.js

const db = require('../config/db'); // 导入数据库配置文件

// 获取唯一的地级市数据
const getCities = async (req, res) => {
    try {
        const [results] = await db.query(
            "SELECT DISTINCT SUBSTRING_INDEX(SUBSTRING_INDEX(address, ' ', 2), ' ', -1) AS city FROM auth WHERE address IS NOT NULL"
        );

        // 提取地级市数据并返回
        const cities = results.map(row => row.city);
        res.json({ cities });
    } catch (err) {
        console.error('查询失败: ', err);
        res.status(500).json({ message: '服务器错误', error: err.message });
    }
};

module.exports = { getCities };
