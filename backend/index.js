import express from 'express';
import dotenv from 'dotenv';
import connectToMongo from './Database/db.js';
import userRoutes from "./Routes/user.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectToMongo();

app.use("/api/auth", userRoutes)

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
