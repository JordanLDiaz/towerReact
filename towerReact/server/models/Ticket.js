import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    ref: 'Event',
    foreignField: '_id',
    justOne: true
})