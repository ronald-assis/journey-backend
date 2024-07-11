import {Router} from "express";
import {tripsRouter} from "./trips.router";


const router = Router()

router.use('/trips', tripsRouter)

export { router }