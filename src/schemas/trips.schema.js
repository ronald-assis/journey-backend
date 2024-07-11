"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmTripSchema = exports.tripSchema = void 0;
var zod_1 = require("zod");
exports.tripSchema = zod_1.z.object({
    destination: zod_1.z.string().min(4),
    starts_at: zod_1.z.coerce.date(),
    ends_at: zod_1.z.coerce.date(),
    owner_name: zod_1.z.string(),
    owner_email: zod_1.z.string().email(),
    emails_to_invite: zod_1.z.array(zod_1.z.string().email())
});
exports.confirmTripSchema = zod_1.z.object({
    tripId: zod_1.z.string().uuid()
});
