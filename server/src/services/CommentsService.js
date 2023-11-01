import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {
    async createComment(commentData) {
        const event = await towerEventsService.getEventById(commentData.eventId)
        // if (event.isCanceled) {
        //     throw new Forbidden('Canceled Event')
        // }

        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')

        return comment
    }

}

export const commentsService = new CommentsService()