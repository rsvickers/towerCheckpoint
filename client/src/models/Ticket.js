export class Ticket {
    constructor(data) {
        this.id = data.id || data._id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.profile = data.profile
        this.event = data.event ? new Event(data.event) : null
    }
}