const express = require('express')
const router = express.Router()
const ProductsService = require("../../services/products")

const productService= new ProductsService()

router.get('/', async (request, response,next) => {
    const {tags} = request.query
    try {
        const products = await productService.getProducts({tags})
        response.render('products', { products })    
    } catch (error) {
        next(error)        
    }

})
module.exports = router
