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
      <div className="card">
        <div className="">{comment.creator.name}</div>
        <div className="">{comment.body}</div>
        <div className={account?.id == comment.creatorId ? "d-flex" : "d-none"}>
          <button className="btn btn-danger w-50" onClick={deleteComment}>Delete</button>
        </div>
      </div>
    </div>
  )

}

CommentCard.propTypes = {
  comment: PropTypes.instanceOf(Comment)
}
// NOTE might need prop types when we create comment to make reactive