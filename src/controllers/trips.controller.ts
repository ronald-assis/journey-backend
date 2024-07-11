import {Request, Response} from "express";

import {TripsService} from "../services/trips.service";
import {ITripCreate, ITripCreateResponse} from "../types/trips.types";
import {confirmTripSchema, tripSchema} from "../schemas/trips.schema";

export class TripsController {
  private tripsService: TripsService

  constructor() {
    this.tripsService = new TripsService()
  }

  async createTrip(req: Request, res: Response) {
    const validateData: ITripCreate = tripSchema.parse(req.body)

    try {
      const result = await this.tripsService.createTrip(validateData)
      res.status(200).json(result)
    } catch (error: any) { // remove "any" later
      res.status(500).json({
        error: 'Failed to create trip',
        message: error.message || 'Internal server error'
      })
    }
  }

  async confirmTrip(req: Request, res: Response) {
    const tripId: ITripCreateResponse = confirmTripSchema.parse(req.params)
    console.log(tripId)

    try {
      res.json({ tripId })
    } catch (error: any) { // remove "any" later
      res.status(500).json({
        error: 'Failed to create trip',
        message: error.message || 'Internal server error'
      })
    }
  }
}