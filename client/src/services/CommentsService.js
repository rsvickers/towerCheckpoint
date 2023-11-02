import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
 async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('Comments Service, got comments', res.data)
    AppState.comments = res.data.map((comment) => new Comment(comment))
 }

async createComment(commentData){
    const eventId = AppState.activeEvent.id
    commentData.eventId = eventId
    const res = await api.post('api/comments', commentData)
    AppState.comments.push(new Comment(res.data))
}

async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('deleted comment', res.data)
   this.clearCommentData()
}

clearCommentData() {
    AppState.myComments = null
}

}

export const commentsService = new CommentsService()