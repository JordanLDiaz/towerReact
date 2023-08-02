import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { useParams } from "react-router-dom";
import TowerEventDetailsCard from "../components/TowerEventDetailsCard.jsx";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import CommentCard from "../components/CommentCard.jsx";
import CommentForm from "../components/CommentForm.jsx";

function TowerEventDetailsPage() {

  const { id } = useParams()

  async function getTowerEventById() {
    try {
      await towerEventsService.getTowerEventById(id)
    } catch (error) {
      Pop.error(error.message)
    }
  }

  async function getCommentsByEventId() {
    try {
      await towerEventsService.getCommentsByEventId(id)
    }
    catch (error) {
      Pop.error(error);
    }
  }

  const comments = AppState.comments.map(c => {
    return (
      <div className="col-10" key={c.id}>
        <CommentCard comment={c} />
      </div>
    )
  })

  // NOTE pass in eventId to array because we're specifically watching the variables that are passed in here, can add additional variables to watch here with ,
  useEffect(() => {
    getTowerEventById(),
      getCommentsByEventId()
  }, [id])

  return (

    <div className="TowerEventDetailsPage">
      <div className="container">
        <section className="row justify-content-center">
          <div className="col-10 m-3">
            <TowerEventDetailsCard />
          </div>
        </section>

        <section className="row justify-content-center">
          <div className="col-10">
            <CommentForm />
          </div>
        </section>

        <section className="row">
          {comments}
        </section>
      </div>
    </div>
  )

}
export default observer(TowerEventDetailsPage)