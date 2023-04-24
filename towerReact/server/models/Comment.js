import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    body: { type: String, required: true },
    isAttending: { type: Boolean, default: false, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})