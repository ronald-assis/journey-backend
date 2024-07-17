import { prisma } from '../lib/prisma'
import {ITripCreate} from "../types/trips.types";

export class TripsModel {
  public async createTrips(data: ITripCreate) {
    return prisma.trip.create({
      data: {
        destination: data.destination,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
        participants: {
          createMany: {
            data: [
              {
                name: data.owner_name,
                email: data.owner_email,
                is_owner: true,
                is_confirmed: true,
              },
              ...data.emails_to_invite.map((email: string) => ({ email }))
            ]
          }
        }
      }
    })
  }
}