import fs from "fs";
import { ProductManager } from "./productManager.js";

const productManager = new ProductManager("./data/product.json");

export class CartManager {
  #path ="../data/cart.json";

  constructor(path) {
    this.#path = path;
    this.#init();
  }

  async #init() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2));
    }
  }
  #generateID(data) {
    return data.length === 0 ? 1 : data[data.length - 1].id + 1;
  }

  async createCart() {
    if (!fs.existsSync(this.#path)) return "[500] DB file does not exist.";
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let carts = JSON.parse(data);
    const cartToAdd = { id: this.#generateID(carts), products: [] };
    carts.push(cartToAdd);
    await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));
    return cartToAdd;
  }

  async getProductsFromCart(id) {
    if (!fs.existsSync(this.#path)) return "[500] DB file does not exist.";
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let carts = JSON.parse(data);
    let cart = carts.find((item) => item.id === id);
    if (!cart) return "[404] not found";
    return cart;
  }

  async addProductToCart(cid, pid) {
    if (!fs.existsSync(this.#path)) return "[500] DB file does not exist.";
    const result = await productManager.getProductByID(pid);
    if (typeof result == "string")
      return `[404] Product with ID= ${pid} was not found`;
    const cart = await this.getProductsFromCart(cid);
    if (typeof cart == "string")
      return `[404] Product with ID= ${pid} was not found`;
    const productIndex = cart.products.findIndex(
      (item) => item.product === pid
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let carts = JSON.parse(data);
    carts = carts.map((item) => {
      if (item.id === cid) {
        return cart;
      } else {
        return item;
      }
    });
    await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));
    return cart;
  }
}
//----TERMINADO-------//