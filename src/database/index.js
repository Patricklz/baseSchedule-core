import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/user';
import File from '../app/models/file';
import Appointments from '../app/models/appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointments];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo() {
        this.mongoConnection = mongoose.connect('mongodb://localhost:27017/mongodb',
            { useNewUrlParser: true, useFindAndModify: true }
        )
    }
}

export default new Database();
