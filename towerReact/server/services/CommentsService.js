import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { eventsService } from "./EventsService";

class CommentsService {
  async getEventComments(eventId) {
    const eventComments = await dbContext.Comments.find({ eventId }).populate('creator')
    return eventComments
  }

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      return new BadRequest('Invalid comment id')
    }

    if (comment.creatorId != userId) {
      throw new Forbidden('You do not have permission to delete someone elses comment.')
    }
    await comment.remove()
    return 'Comment was deleted.'
  }
}

export const commentsService = new CommentsService();