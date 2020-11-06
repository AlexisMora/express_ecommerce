const express = require('express')
const router = express.Router()
const ProductsService = require('../../services/products')

const productService = new ProductsService()

router.get('/', async (request, response, next) => {
    const { tags } = request.query
    try {
        throw new Error('This is an Error from the Api')
        const products = await productService.getProducts({ tags })

        response.status(200).json({
            data: products,
            message: 'products listed',
        })
    } catch (error) {
        next(error)
    }
})

router.get('/:productId', async (request, response, next) => {
    const { productId } = request.params
    try {
        const product = await productService.getProduct({ productId })
        response.status(200).json({
            data: product,
            message: 'product retrieved',
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', (request, response, next) => {
    const { body: product } = request
    try {
        const productCreated = productService.createProduct({ product })
        response.status(201).json({
            data: productCreated,
            message: 'products created',
        })
    } catch (error) {
        next(error)
    }
})

router.put('/:productId', (request, response, next ) => {
    const { productId } = request.params
    const { body: product } = request
    try {
        const updatedProduct = productService.updateProduct({ productId, product })
        response.status(200).json({
            data: updatedProduct,
            message: 'products updated',
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:productId', (request, response , next) => {
    const { productId } = request.params
    try {
        const product = productService.deleteProduct({ productId })

        response.status(200).json({
            data: product,
            message: 'products deleted',
        })
        
    } catch (error) {
        next(error)
    }
})

module.exports = router
