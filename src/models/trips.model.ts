import { prisma } from "../lib/prisma";

export class TripsModel {
  static async createTrip(data: {
    destination: string;
    ends_at: Date;
    participants: {
      createMany: {
        data: ({ email: string } | { email: string; is_confirmed: boolean; is_owner: boolean; name: string })[]
      }
    };
    starts_at: Date
  }) {
    return prisma.trip.create({
      data
    })
  }
}
