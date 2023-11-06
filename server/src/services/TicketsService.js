import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {
    async getMyTickets(userId) {
        const ticket = await dbContext.Tickets.find({ accountId: userId }).populate('event')
        // .populate({ path: 'event', populate: { path: 'ticketCount' } })

        return ticket
    }
    async createTicket(ticketData) {
        const event = await towerEventsService.getEventById(ticketData.eventId)

        if (event.isCanceled) {
            throw new Forbidden('Canceled Event')
        }

        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        return ticket
    }

    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId })
            .populate('profile', 'name picture')
            .populate('event')
        return tickets
    }
    async removeTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)

        if (!ticket) {
            throw new BadRequest(`${ticketId} is not a valid ID`)
        }

        if (ticket.accountId.toString() != userId) {
            throw new Forbidden('NOT YOUR DATA')
        }
        await ticket.delete()
        return 'ticket has been deleted'
    }
}

export const ticketsService = new TicketsService()