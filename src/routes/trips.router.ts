import {Router} from 'express'

import {TripsController} from "../controllers/trips.controller";

const tripsRouter = Router()
const controller = new TripsController()

// tripsRouter.post('/', controller.createTrip)
tripsRouter.get('/:tripId/confirm', controller.confirmTrip)


export { tripsRouter }
