import fs from 'fs';

export class ProductManager {
    #path

    constructor(path) {
        this.#path = path;
        this.#init()
    }

    async init() {
        if (!fs.existsSync(this.#path)) {
            await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2))
        }
    }

    #generatID(products) {
        return (products.length === 0) ? 1 : products[products.length - 1].id +1
    }

    async addProduct(products) {
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.thumbnail || !product.status){
            return '[400] Requested fields missing or invalid'
        if (!fs.existsSync(this.#path)) return '[500] DB file does not exist'
        let data = await fs.promises.readFile(this.#path, 'utf-8')
        let products = JSON.parse(data)
        const found = products.find(item => item.code === product.code)
        if (found) return '[400] Code alreaady exists.'
        const productToAdd = { id: this.#generateID (products), status: true, thumbnails: [], ...product }
        products.push(productToAdd)
        await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 2))
        return productToAdd
        }
    }

    async getProducts(){
        if (!fs.existsSync(this.#path)) return '[500] DB file does not exist.'
        let data = await fs.promises.readFile(this.#path, 'utf-8')
        const products =JSON.parse(data)
    }

    async getProductByID(id) {
        if (!fs.existsSync(this.#path)) return '[500] DB file does not exist,'
        let data = await fs.promises.readFile(this.#path, 'utf-8')
        let products = JSON.parse(data)
        let product = products.find(item => item.id ===id)
    }
}