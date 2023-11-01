import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService"

class EventsService {

    async getEvents() {
        const res = await api.get('api/events')
        logger.log('got events', res.data)
        AppState.events = res.data.map((eventPOJO) => new Event(eventPOJO))
    }
}

export const eventsService = new EventsService()