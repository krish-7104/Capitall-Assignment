const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./Database/db.js');
const userRoutes = require('./Routes/user.route.js');
const productRoutes = require('./Routes/product.route.js');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: [process.env.FRONTEND_LINK, "http://localhost:5173"], credentials: true }));
connectToMongo();

app.get("/", (req, res) => {
    res.send("Hello, I am working fine! 🚀")
})

app.use('/api/auth', userRoutes);
app.use('/api/product', productRoutes);

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
