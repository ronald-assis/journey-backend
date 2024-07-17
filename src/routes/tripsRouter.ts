import {Router} from 'express'

import {TripsController} from "../controllers/TripsController";

const vai = Router()
const controller = new TripsController()

vai.post('/', controller.createTrip)
vai.get('/:tripId/confirm', controller.confirmTrip)


export { vai }
