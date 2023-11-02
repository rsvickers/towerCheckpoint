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
}

export const commentsService = new CommentsService()