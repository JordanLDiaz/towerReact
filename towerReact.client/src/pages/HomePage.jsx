import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import { AppState } from "../AppState";
import TowerEventCard from "../components/TowerEventCard.jsx";
import TowerEventForm from "../components/TowerEventForm.jsx";

function HomePage() {

  async function getTowerEvents() {
    try {
      await towerEventsService.getTowerEvents()
    }
    catch (error) {
      Pop.error(error.message)
    }
  }

  // NOTE once we have saved the towerEvents to our appstate in service, we need to map our tower events in html (similar to computed)
  // NOTE this is also where we bring in our component (this is bringing in our computed and component at the same time)
  const towerEvents = AppState.towerEvents.map(t => {
    return (

      <div className="col-md-4 my-3" key={t.id}>
        {/* bring in component for towerEvent card */}
        <TowerEventCard towerEvent={t} />
      </div>
    )
  })

  // this watch effect is a global hook that handles things like onMounted
  // contains an array that will contain what we want to watch. 
  useEffect(() => {
    getTowerEvents()
  }, [])


  return (

    <div className="HomePage row">
      {towerEvents}

      {/*Bootstrap Modal*/}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <TowerEventForm />
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )

}

//NOTE we make homePage observable because we expect things to update on this page
export default observer(HomePage)