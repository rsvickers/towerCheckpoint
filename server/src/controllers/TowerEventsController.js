import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
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
}