const db = require('../../models/index');

class CategoryController {
    async getAllCat(req, res) {
        try {
            const getAllCat = await db.Categories.findAll();
            return res.status(200).json(getAllCat)
        } catch (error) {
            console.error('>>> co loi ', error);
            return res.status(500).json({ Error: '>>> co loi ', err: error.message });
        }
    }
}

module.exports = new CategoryController