import { Router } from "express";
import productRouter from "./products.routes.js";
import cartRouter from "./carts.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./users.routes.js";
import mockingProductsRouter from "./mockingProducts.routes.js";

const router = Router()

// ---- Routes ----
router.use('/api/users', userRouter)
router.use('/api/products', productRouter)
router.use('/api/mockingproducts', mockingProductsRouter)
router.use('/api/carts', cartRouter)
router.use('/api/session', sessionRouter)

export default router