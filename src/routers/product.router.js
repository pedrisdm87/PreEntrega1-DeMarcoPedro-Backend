import { Router } from 'express';
import { ProductManager } from '../productManager.js'

const router = Router();
const productManager = new ProductManager('./data/products.json')



router.get('/', async (req, res) => {
    const result = await productManager.getProducts()
    const limit = req.query.limit
    if (typeof result == 'string'){
        const error = result.split(' ')
        return res.status (parseInt(error[0].slice(1,4))).json({ error: result.slice(6) })
        }
        res.status(200).json ({ status: 'success', payload: result.slice(0, limit) })
    
})

router.get('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const result = await productManager.getProductById(pid)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status (parseInt(error[0].slice(1,4))).json ({ error: result.slice (6) })
    }
})

router.post('/', async (req, res) => {
    const product = req.body
    const result = await productManager.addProduct(product)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status (parseInt(error[0].slice(1,4))).json({ error: result.slice (6) })
    }
    res.status(201).json ({ status: 'succes', payload: result })
    
})

router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const data = req.body
    const result = await productManager.updateProduct(id, data)
    if(!result) return res.status(404).json({status: 'error', error: 'The product cannot be modified.'})
 
    return res.status(201).json({status: 'success', payload: result})
  
  })

  router.delete('/:pid', async( req, res) =>{
    const id = parseInt(req.params.pid); 
  
        const product = await productManager.getProducts()
        const productId = product.find(item => item.pid == id)
        if (!productId) {return res.status(404).json({error: 'The product does not exist'})}
         
         await productManager.deleteProduct(id)
        return res.status(200).json({ message: 'Product successfully removed' });
   
  })
    
  
  
    export default router 


    //----------TERMINADO------------//