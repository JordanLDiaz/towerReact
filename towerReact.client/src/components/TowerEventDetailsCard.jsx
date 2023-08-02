import React from 'react';
import { AppState } from "../AppState.js";
import { observer } from "mobx-react";

function TowerEventDetailsCard() {


  const activeTowerEvent = AppState.activeTowerEvent

  return !activeTowerEvent ? (<div>loading...</div>) : (

    <div className="TowerEventDetailsCard">
      <div className="row card bg-primary rounded">
        <div className="d-flex flex-row ps-0">
          <div className="col-3">
            <img src={activeTowerEvent.coverImg} alt={activeTowerEvent.name} className="img-fluid rounded-start" />
          </div>
          <div className="col-9 text-center ms-2">
            <h3>{activeTowerEvent.name}</h3>
            <div className="d-flex flex-row justify-content-between">
              <h5 className="">{activeTowerEvent.location}</h5>
              <h5 className="">{new Date(activeTowerEvent.startDate).toLocaleDateString()}</h5>
            </div>
            <div>
              {activeTowerEvent.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

// NOTE making this observable prevents appstate from being one behind when we set active
export default observer(TowerEventDetailsCard)