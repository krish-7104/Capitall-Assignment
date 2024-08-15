import express from 'express';
import {
    CreateProductHandler,
    GetProductHandler,
    UpdateProductHandler,
    DeleteProductHandler,
    GetProductsHandler
} from '../Controller/product.controller.js';

const router = express.Router();

router.get('/all-products', GetProductsHandler);
router.get('/get-product/:id', GetProductHandler);
router.post('/add-product', CreateProductHandler);
router.put('/update-product/:id', UpdateProductHandler);
router.delete('/delete-product/:id', DeleteProductHandler);

export default router;
