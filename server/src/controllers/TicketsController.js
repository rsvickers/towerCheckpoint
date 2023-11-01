import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.removeTicket)
    }

    async createTicket(request, response, next) {
        try {
            const ticketData = request.body
            const userId = request.userInfo.id
            ticketData.accountId = userId
            const ticket = await ticketsService.createTicket(ticketData)
            return response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async removeTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const userId = request.userInfo.id
            const message = await ticketsService.removeTicket(ticketId, userId)
            return response.send(message)
        } catch (error) {
            next(error)
        }
    }
}