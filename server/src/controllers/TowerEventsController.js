import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { dbContext } from "../db/DbContext.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }
    async getEvents(request, response, next) {
        try {
            const query = request.query
            const events = await towerEventsService.getEvents(query)
            return response.send(events)
        } catch (error) {
            next(error)
        }
    }
    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await towerEventsService.getEventById(eventId)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getEventTickets(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketsService.getEventTickets(eventId)
            return response.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async getEventComments(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentsService.getEventComments(eventId)
            return response.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            const userId = request.userInfo.id
            eventData.creatorId = userId
            const event = await towerEventsService.createEvent(eventData)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const eventData = request.body
            const userId = request.userInfo.id
            const editEvent = await towerEventsService.editEvent(eventId, eventData, userId)
            return response.send(editEvent)
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const event = await towerEventsService.cancelEvent(eventId, userId)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
}