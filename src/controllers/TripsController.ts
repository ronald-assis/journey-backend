import {Request, Response} from "express";

import {TripsService} from "../services/tripsService";
import {ITripCreate, ITripCreateResponse} from "../types/trips.types";
import {confirmTripSchema, tripSchema} from "../schemas/trips.schema";

export class TripsController {
  static tripsService: TripsService

  constructor() {
    TripsController.tripsService = new TripsService()
  }

  async createTrip(req: Request, res: Response) {
    const validateData: ITripCreate = tripSchema.parse(req.body)
    const result = await TripsController.tripsService.createTrip(validateData)

    res.status(200).json(result)
  }

  async confirmTrip(req: Request, res: Response) {
    const tripId: ITripCreateResponse = confirmTripSchema.parse(req.params)
    console.log(tripId)

    res.json({ tripId })
  }
}
