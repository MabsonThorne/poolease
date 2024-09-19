// controllers/merchantSceneImageController.js
const db = require('../config/db'); // 假设有一个数据库配置文件

// 上传商家场景图片
exports.uploadImage = async (req, res) => {
    try {
        const { storeId } = req.body;
        const imageUrl = req.file.path; // 文件路径从 multer 中获取

        // 插入数据库
        await db.query(
            'INSERT INTO merchant_scene_images (storeId, image_url) VALUES (?, ?)',
            [storeId, imageUrl]
        );

        res.status(201).json({ message: '图片上传成功', imageUrl });
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error });
    }
};

// 获取商家所有场景图片
exports.getImages = async (req, res) => {
    try {
        const { storeId } = req.params;

        const [rows] = await db.query(
            'SELECT * FROM merchant_scene_images WHERE storeId = ?',
            [storeId]
        );

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error });
    }
};

// 删除商家场景图片
exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            'DELETE FROM merchant_scene_images WHERE id = ?',
            [id]
        );

        res.status(200).json({ message: '图片删除成功' });
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error });
    }
};
