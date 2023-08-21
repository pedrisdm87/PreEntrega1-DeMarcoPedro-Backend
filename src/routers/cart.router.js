import { Router } from 'express';
import { CartManager } from '../cartManager.js'

const router = Router();
const cartManager = new CartManager('./data/carts.json');

router.post('/', async (req, res) => {
    const result = await cartManager.createCart()
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })

})

router.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const result = await cartManager.getProductsFormCart(id)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6) })
    }
    res.status(200).json({ status: 'success', payload: result })})

    export default router 