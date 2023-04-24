import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class EventsService {
    async getAllEvents() {
        const events = await dbContext.Events.find().populate('creator')
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId)
        if (!event) {
            throw new BadRequest('No event found at this id')
        }
        return event
    }

    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator')
        return event
    }

    async updateEvent(eventId, updateData, userId) {
        // REVIEW why is this not working? 
        const event = await this.getEventById(eventId)
        if (event.creatorId != userId) throw new Forbidden("You are not allowed to edit another user's event.");
        event.name = updateData.name ? updateData.name : event.name
        event.description = updateData.description ? updateData.description : event.description
        event.coverImg = updateData.coverImg ? updateData.coverImg : event.coverImg
        event.location = updateData.location ? updateData.location : event.location
        event.capacity = updateData.capacity ? updateData.capacity : event.capacity
        event.startDate = updateData.startDate ? updateData.startDate : event.startDate
        event.type = updateData.type ? updateData.type : event.type
        await event.save()
        return event
    }
}

export const eventsService = new EventsService();