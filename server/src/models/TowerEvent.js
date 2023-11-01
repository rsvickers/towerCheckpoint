import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
        name: { type: String, required: true, maxLength: 500 },
        description: { type: String, required: true, maxLength: 500 },
        coverImg: { type: String, required: true, maxLength: 500 },
        location: { type: String, required: true, maxLength: 500 },
        capacity: { type: Number, required: true, max: 500 },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, required: true, default: false },
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