import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
        name: { type: String, required: true, maxLength: 50000 },
        description: { type: String, required: true, maxLength: 50000 },
        coverImg: { type: String, required: true, maxLength: 50000 },
        location: { type: String, required: true, maxLength: 50000 },
        capacity: { type: Number, required: true, max: 50000 },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, default: false, },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

// TODO come back when ticket and comments are made
TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})