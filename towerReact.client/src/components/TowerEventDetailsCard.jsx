import React, { useEffect, useState } from 'react';
import { AppState } from "../AppState.js";
import { observer } from "mobx-react";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";

function TowerEventDetailsCard() {

  const activeTowerEvent = AppState.activeTowerEvent
  const account = AppState.account

  const [isCanceled, setIsCanceled] = useState(activeTowerEvent?.isCanceled)



  async function cancelTowerEvent() {
    try {
      const yes = await Pop.confirm('Are you sure you want to cancel this event?')
      if (!yes) { return }
      await towerEventsService.cancelTowerEvent(activeTowerEvent?.id)
      setIsCanceled(activeTowerEvent?.isCanceled)
      Pop.toast('Event canceled!')
    }
    catch (error) {
      Pop.error(error.message)
    }
  }


  // NOTE doing this here throws the pop confirm immediately when you open the page
  // useEffect(() => {
  //   cancelTowerEvent()
  // }, [])

  function isCanceledStyle() {
    if (isCanceled) {
      return (
        <h1>This event is canceled</h1>
      )
    } else {
      return (
        <div className="col-9 text-center ms-2">
          <h3>{activeTowerEvent?.name}</h3>
          <div className="d-flex flex-row justify-content-between">
            <h5 className="">{activeTowerEvent?.location}</h5>
            <h5 className="">{new Date(activeTowerEvent?.startDate).toLocaleDateString()}</h5>
          </div>
          <div>
            {activeTowerEvent?.description}
          </div>
          <div className={account?.id == activeTowerEvent?.creatorId ? 'd-flex' : 'd-none'}>
            <button onClick={cancelTowerEvent} type="button" className="btn btn-outline-primary my-3">Cancel Event</button>
          </div>
        </div>
      )
    }
  }



  return !activeTowerEvent ? (<div>loading...</div>) : (

    <div className="TowerEventDetailsCard">
      <div className="row card bg-primary rounded">
        <div className="d-flex flex-row ps-0">
          <div className="col-3">
            <img src={activeTowerEvent.coverImg} alt={activeTowerEvent.name} className="img-fluid rounded-start" />
          </div>
          <div className="col-9">{isCanceledStyle()}</div>
          {/* STUB this is happening in the above if statement ---> CONDITIONAL RENDER */}
          {/* <div className="col-9 text-center ms-2">
            <h3>{activeTowerEvent.name}</h3>
            <div className="d-flex flex-row justify-content-between">
              <h5 className="">{activeTowerEvent.location}</h5>
              <h5 className="">{new Date(activeTowerEvent.startDate).toLocaleDateString()}</h5>
            </div>
            <div>
              {activeTowerEvent.description}
            </div>
            <div className={account?.id == activeTowerEvent.creatorId ? 'd-flex' : 'd-none'}>
              <button onClick={cancelTowerEvent} type="button" className="btn btn-outline-primary my-3">Cancel Event</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )

}

// NOTE making this observable prevents appstate from being one behind when we set active
export default observer(TowerEventDetailsCard)