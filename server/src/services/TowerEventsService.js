import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {
    async getEvents(query) {
        const events = await dbContext.TowerEvents.find(query).populate('creator', 'name picture')
        return events
    }
    async getEventById(eventId) {
        const event = (await dbContext.TowerEvents.findById(eventId)).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest(`${eventId} is not a valid Id`)
        }
        return event
    }
    async createEvent(eventData) {
        const event = await dbContext.TowerEvents.create(eventData)
        await event.populate('creator', 'name picture')
        return event
    }
    async editEvent(eventId, eventData, userId) {
        const toBeEdited = await this.getEventById(eventId)
        if (toBeEdited.creatorId.toString() != userId) {
            throw new Forbidden('Not yours to edit')
        }
        toBeEdited.description = eventData.description || toBeEdited.description
        toBeEdited.name = eventData.name || toBeEdited.name
        toBeEdited.coverImg = eventData.coverImg || toBeEdited.coverImg
        toBeEdited.location = eventData.location || toBeEdited.location
        toBeEdited.capacity = eventData.capacity || toBeEdited.capacity
        toBeEdited.startDate = eventData.startDate || toBeEdited.startDate
        // toBeEdited.isCanceled = eventData.isCanceled || toBeEdited.isCanceled
        toBeEdited.type = eventData.type || toBeEdited.type

        toBeEdited.save()
        return toBeEdited
    }

}

export const towerEventsService = new TowerEventsService()