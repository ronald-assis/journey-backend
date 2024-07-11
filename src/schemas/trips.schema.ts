import { z } from "zod";

export const tripSchema = z.object({
  destination: z.string().min(4),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date(),
  owner_name: z.string(),
  owner_email: z.string().email(),
  emails_to_invite: z.array(z.string().email())
});

export const confirmTripSchema = z.object({
  tripId: z.string().uuid()
})