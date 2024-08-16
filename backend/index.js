import express from 'express';
import dotenv from 'dotenv';
import connectToMongo from './Database/db.js';
import userRoutes from "./Routes/user.route.js"
import productRoutes from "./Routes/product.route.js"
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: [process.env.FRONTEND_LINK], credentials: true }))
connectToMongo();

app.use("/api/auth", userRoutes)
app.use("/api/product", productRoutes)

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
