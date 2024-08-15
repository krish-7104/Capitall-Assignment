const mongoose = require("mongoose")
const databaseName = "OLX"

const connectToMongo = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${databaseName}`)
        console.log(`MongoDb Connected! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
    }
}

module.exports = connectToMongo