const express = require('express');
const {
    CreateProductHandler,
    GetProductHandler,
    UpdateProductHandler,
    DeleteProductHandler,
    GetProductsHandler,
    BuyProductHandler
} = require('../Controller/product.controller.js');

const router = express.Router();

router.get('/all-products', GetProductsHandler);
router.get('/get-product/:id', GetProductHandler);
router.post('/add-product', CreateProductHandler);
router.put('/update-product/:id', UpdateProductHandler);
router.delete('/delete-product/:id', DeleteProductHandler);

router.post('/buy-product/:id', BuyProductHandler);

module.exports = router;
