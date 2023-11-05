import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService"

class TicketsService {

    async getTicketForEvent(eventId) {
        const eventData = {eventId: eventId}
        const res = await api.post('api/tickets', {eventId})
        logger.log('get ticket', res.data)
        AppState.tickets.push(new Ticket(res.data))
    }

    async getTicketByUserId() {
        const res = await api.get('account/tickets')
        logger.log('got my ticket', res.data)
        AppState.tickets = res.data.map((pojo) => new Ticket(pojo))
    }
 async getTicketsOnEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('tickets Service, getting tickets hopefully', res.data)
    AppState.tickets = res.data.map((ticketPOJO) => new Ticket(ticketPOJO))
   }
}

export const ticketsService = new TicketsService()