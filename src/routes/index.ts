import {Router} from "express";
import {vai} from "./tripsRouter";
// import {tripsRouter} from "./trips.router";

const router = Router()

// router.use('/trips', tripsRouter)
router.use('/v', vai)

export { router }