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

    async getEventById(eventId){
        AppState.activeEvent = null
        const res = await api.get(`api/events/${eventId}`)
        logger.log('got album by ID', res.data)
        AppState.activeEvent = new Event(res.data)
    }

    async createEvent(eventData) {
        const res = await api.post(`api/events`, eventData)
        logger.log('created Album', res.data)
        const newEvent = new Event(res.data)
        AppState.events.push(newEvent)
        return newEvent
    }
}


// async createAlbum(albumData) {
//     const res = await api.post(`api/albums`, albumData);
//     logger.log("[ALBUMS SERVICE] createAlbum => res.data:", res.data);
//     const newAlbum = new Album(res.data);
//     AppState.albums.push(newAlbum);
//     return newAlbum;
//   }
export const eventsService = new EventsService()