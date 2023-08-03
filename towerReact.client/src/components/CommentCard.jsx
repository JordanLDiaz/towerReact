import React from 'react';
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";
import PropTypes from 'prop-types'
import { Comment } from "../models/Comment.js";
import { AppState } from "../AppState.js";

/** @param {{comment: Comment}} props */
export default function CommentCard({ comment }) {

  async function deleteComment() {
    try {
      const yes = await Pop.confirm('Remove this comment?')
      if (!yes) { return }
      await commentsService.deleteComment(comment.id)
    }
    catch (error) {
      Pop.error(error.message)
    }
  }

  const account = AppState.account


  return (
    <div className="CommentCard">
      <div className="card my-3">
        <div className="d-flex">
          <img src={comment.creator.picture} alt={comment.creator.name} className="img-fluid rounded m-1" />
          <div className="d-flex flex-column">
            <h3 className="mx-3">{comment.creator.name}</h3>
            <h5 className="text-center">{comment.body}</h5>
          </div>
        </div>
        <div className={account?.id == comment.creatorId ? "d-flex" : "d-none"}>
          <button className="btn btn-danger w-25 m-1" onClick={deleteComment}>Delete</button>
        </div>
      </div>
    </div>
  )
}

CommentCard.propTypes = {
  comment: PropTypes.instanceOf(Comment)
}
// NOTE might need prop types when we create comment to make reactive