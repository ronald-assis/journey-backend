import {Router} from "express";
import {tripsRouter} from "./tripsRouter";

const router = Router()

router.use('/trips', tripsRouter)

export { router }