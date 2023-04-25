import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { eventsService } from "./EventsService";

class TicketsService {
  async createTicket(ticketData) {
    const event = await eventsService.getEventById(ticketData.eventId)
    if (event.capacity == 0) {
      throw new BadRequest('You cannot get a ticket for an event that is full.')
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    event.capacity--
    await event.save()
    await ticket.populate('profile event')
    return ticket
  }

  async getMyTickets(accountId) {
    // send the myTickets request to the db, and find all the tickets connected to that user using the accountId object (this must match the accountId property on ticket model). Populate the event data onto the ticket
    const myTickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return myTickets
  }

  async getEventTickets(eventId) {
    // send the eventTickets request to db, find all tickets connected to the event using the eventId object we passed in as param (make sure it matches model). Then populate the profile onto the tickets (not the event because we already have the event details)
    const eventTickets = await dbContext.Tickets.find({ eventId }).populate('profile')
    return eventTickets
  }

  async deleteTicket(ticketId, userId) {
    // grab the ticket by its id from the db, null check and remove the ticket
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) {
      throw new BadRequest('Invalid ticket id.')
    }
    if (ticket.accountId != userId) {
      throw new Forbidden('You cannot delete a ticket that is not yours.')
    }
    await ticket.remove()

    // grab the event by its ticket.eventId, increase the events capacity, save it, return message
    const event = await eventsService.getEventById(ticket.eventId)
    event.capacity++
    await event.save()
    return ticket
  }
}

export const ticketsService = new TicketsService();