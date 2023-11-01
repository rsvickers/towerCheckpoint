import { Schema } from "mongoose";

export const CommentSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
        body: { type: String, required: true, maxLength: 1000 },
        // isAttending: { type: Boolean, }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})