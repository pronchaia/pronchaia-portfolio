const database = require('../models');

class BookService {
    static async getAllData() {
        try {
            return await database.ProductType.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getData(id) {
        try {
            return await database.ProductType.findOne({
                where: { id: Number(id) }
            });
        } catch (error) {
            throw error;
        }
    }

    static async addData(newData) {
        try {
            return await database.ProductType.create(newData);
        } catch (error) {
            throw error;
        }
    }

    static async updateData(id, updateData) {
        try {
            const dataToUpdate = await database.ProductType.findOne({
                where: { id: Number(id) }
            });

            if (dataToUpdate) {
                await database.ProductType.update(updateData, { where: { id: Number(id) } });

                return updateData;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteData(id) {
        try {
          const dataToDelete = await database.ProductType.findOne({ where: { id: Number(id) } });
    
          if (dataToDelete) {
            const deletedData = await database.ProductType.destroy({
              where: { id: Number(id) }
            });
            return deletedData;
          }
          return null;
        } catch (error) {
          throw error;
        }
      }
}
module.exports = BookService;