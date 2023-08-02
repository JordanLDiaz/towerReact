import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async createComment(commentData) {
    const eventId = AppState.activeTowerEvent?.id
    commentData.eventId = eventId
    const res = await api.post('api/comments', commentData)
    logger.log('[CREATING COMMENT]', res.data)
    AppState.comments.push(new Comment(res.data))
  }

  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('[REMOVING COMMENT]', res.data)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }

}

export const commentsService = new CommentsService();