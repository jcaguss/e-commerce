import { Router } from "express";
import { postProducts } from "../controllers/mockingProducts.controller.js";

const mockingProductsRouter = Router()

mockingProductsRouter.post('/', postProducts)

export default mockingProductsRouter