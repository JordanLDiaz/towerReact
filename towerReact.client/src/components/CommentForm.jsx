import { observer } from 'mobx-react-lite';
import React from 'react';
import { AppState } from "../AppState.js";
import { BindEditable } from "../utils/FormHandler.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger.js";

function CommentForm() {

  const editable = {}
  const bindEditable = BindEditable(editable)

  async function createComment() {
    try {
      window.event?.preventDefault()
      logger.log('[editable]', { editable })
      await commentsService.createComment(editable)
    }
    catch (error) {
      Pop.error(error);
    }
  }

  return (

    <div className="CommentForm">
      <form onSubmit={createComment} >
        <textarea name="body" className="form-control" id="body" rows={3} placeholder="Leave a comment..." defaultValue={editable.body} onChange={bindEditable}></textarea>
        <button type="submit" className="btn btn-outline-success my-3">Submit</button>
      </form>

    </div>
  )

}
export default observer(CommentForm)