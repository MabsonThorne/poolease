// controllers/addressController.js
const db = require('../config/db');

// 获取某个地级市的所有地址
exports.getAddressesByCity = (req, res) => {
    const cityName = req.params.cityName;

    const query = `
        SELECT addresses.address_name, addresses.address_description
        FROM addresses
        JOIN cities ON addresses.city_id = cities.id
        WHERE cities.city_name = ?;
    `;

    db.query(query, [cityName], (err, results) => {
        if (err) {
            console.error('Error fetching addresses:', err.stack);
            return res.status(500).send('Error fetching addresses.');
        }
        res.json(results);
    });
};

// 创建一个新的地址
exports.createAddress = (req, res) => {
    const { address_name, city_id, address_description } = req.body;

    const query = `
        INSERT INTO addresses (address_name, city_id, address_description)
        VALUES (?, ?, ?);
    `;

    db.query(query, [address_name, city_id, address_description], (err, result) => {
        if (err) {
            console.error('Error creating address:', err.stack);
            return res.status(500).send('Error creating address.');
        }
        res.status(201).send('Address created successfully.');
    });
};

// 更新一个地址
exports.updateAddress = (req, res) => {
    const addressId = req.params.id;
    const { address_name, city_id, address_description } = req.body;

    const query = `
        UPDATE addresses
        SET address_name = ?, city_id = ?, address_description = ?
        WHERE id = ?;
    `;

    db.query(query, [address_name, city_id, address_description, addressId], (err, result) => {
        if (err) {
            console.error('Error updating address:', err.stack);
            return res.status(500).send('Error updating address.');
        }
        res.send('Address updated successfully.');
    });
};

// 删除一个地址
exports.deleteAddress = (req, res) => {
    const addressId = req.params.id;

    const query = `
        DELETE FROM addresses
        WHERE id = ?;
    `;

    db.query(query, [addressId], (err, result) => {
        if (err) {
            console.error('Error deleting address:', err.stack);
            return res.status(500).send('Error deleting address.');
        }
        res.send('Address deleted successfully.');
    });
};
