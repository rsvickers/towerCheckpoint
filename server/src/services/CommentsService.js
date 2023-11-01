import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId })
            .populate('creator', 'name picture')
        return comments
    }
    async createComment(commentData) {
        const event = await towerEventsService.getEventById(commentData.eventId)
        // if (event.isCanceled) {
        //     throw new Forbidden('Canceled Event')
        // }

        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')

        return comment
    }

    async removeComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)

        if (!comment) {
            throw new BadRequest('NO COMMENT TO DELETE')
        }

        // if (comment.accountId.toString() != userId) {
        //     throw new Forbidden('NOT YOUR DATA')
        // }

        await comment.delete()
        return "COMMENT DELETED"
    }
}

export const commentsService = new CommentsService()