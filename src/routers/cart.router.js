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
    const cid = parseInt(req.params.cid)
    const result = await cartManager.getProductsFormCart(cid)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6) })
    }
    res.status(200).json({ status: 'success', payload: result })})

    router.post('/:cid/product/:pid', async (req, res) => {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const result = await cartManager.addProductsToCart(cid, pid)
        if (typeof result === 'string') {
            const error = result.split('');
            return res.status(404).json({ status: 'error', payload: error });
        }
        res.status(200).json({ status: 'success', payload: result });
    });
    

    export default router 