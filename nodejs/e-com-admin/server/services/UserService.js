const database = require('../models');
const bcrypt = require('bcrypt');

class UserService {
    static async getAllData() {
        try {
            return await database.User.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getData(id) {
        try {
            return await database.User.findOne({
                where: { id: Number(id) }
            });
        } catch (error) {
            throw error;
        }
    }

    static async getDataByEmail(email) {
        try {
            return await database.User.findOne({
                where: { email: email }
            });
        } catch (error) {
            throw error;
        }
    }

    static async addData(newData) {
        try {
            newData.password = await bcrypt.hash(newData.password, 10);
            return await database.User.create(newData);
        } catch (error) {
            throw error;
        }
    }

    static async updateData(id, updateData) {
        try {
            const dataToUpdate = await database.User.findOne({
                where: { id: Number(id) }
            });

            if (dataToUpdate) {
                await database.User.update(updateData, { where: { id: Number(id) } });

                return updateData;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteData(id) {
        try {
            const dataToDelete = await database.User.findOne({ where: { id: Number(id) } });

            if (dataToDelete) {
                const deletedData = await database.User.destroy({
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
module.exports = UserService;