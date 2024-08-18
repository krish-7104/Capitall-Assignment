const mongoose = require('mongoose');

const databaseName = 'olx-capitall';

const connectToMongo = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${databaseName}`);
        console.log(`MongoDB Connected! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGODB connection FAILED', error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
