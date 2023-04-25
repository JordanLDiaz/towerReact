import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.updateEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    async getAllEvents(req, res, next) {
        try {
            const events = await eventsService.getAllEvents()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            // grab the eventId from params in get request, alias out to eventId and pass to service
            const eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {
            // We need the eventId in order to grab one event
            const eventId = req.params.eventId
            const eventTickets = await ticketsService.getEventTickets(eventId)
            return res.send(eventTickets)
        } catch (error) {
            next(error)
        }
    }


    async createEvent(req, res, next) {
        try {
            // alias out the body of the request
            const eventData = req.body
            // set creator of new event = to the user that's logged in
            eventData.creatorId = req.userInfo.id
            // send the created event to service, passing in the req.body/eventData
            const event = await eventsService.createEvent(eventData)
            // return the created event
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async updateEvent(req, res, next) {
        try {
            // grab the eventId from the params in the put route
            const eventId = req.params.eventId
            // alias out the req.body
            const updateData = req.body
            // alias out the userInfo.Id
            const userId = req.userInfo.id
            // pass all of the above to the service and expect to get updated returned.
            const event = await eventsService.updateEvent(eventId, updateData, userId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const message = await eventsService.cancelEvent(eventId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}