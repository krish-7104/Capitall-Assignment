const express = require("express")
const app = express()
const PORT = process.env.PORT | 5000
const connectToMongo = require("./Database/db.js")
const dotenv = require("dotenv")

dotenv.config()

app.use(express.json())

connectToMongo()


app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`)
})