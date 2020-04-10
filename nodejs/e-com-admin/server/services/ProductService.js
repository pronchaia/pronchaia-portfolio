const database = require('../models');

class ProductService {
    static async getAllData() {
        try {
            return await database.Product.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getData(id) {
        try {
            return await database.Product.findOne({
                where: { id: Number(id) }
            });
        } catch (error) {
            throw error;
        }
    }

    static async getDataByName(name) {
        try {
            return await database.Product.findOne({
                where: { name: name }
            });
        } catch (error) {
            throw error;
        }
    }

    static async addData(newData) {
        try {
            return await database.Product.create(newData);
        } catch (error) {
            throw error;
        }
    }

    static async updateData(id, updateData) {
        try {
            const dataToUpdate = await database.Product.findOne({
                where: { id: Number(id) }
            });

            if (dataToUpdate) {
                await database.Product.update(updateData, { where: { id: Number(id) } });

                return updateData;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteData(id) {
        try {
          const dataToDelete = await database.Product.findOne({ where: { id: Number(id) } });
    
          if (dataToDelete) {
            const deletedData = await database.Product.destroy({
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
module.exports = ProductService;