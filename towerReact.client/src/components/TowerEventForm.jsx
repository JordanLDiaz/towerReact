
import React from 'react';
import { BindEditable } from "../utils/FormHandler.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { AppState } from "../AppState.js";
import { observer } from "mobx-react";
import { logger } from "../utils/Logger.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { Modal } from "bootstrap";


function TowerEventForm() {

  let editable = {}
  const bindEditable = BindEditable(editable)

  const types = ['concert', 'convention', 'sport', 'digital', 'misc']
  const options = types.map(type => {
    return (<option key={type}>{type}</option>)
  })

  // NOTE this also works!
  // const options = types.map(function (type) {
  //   return (<option>{type}</option>)
  // })


  async function createTowerEvent() {
    try {
      window.event?.preventDefault()
      // logger.log({ editable })
      await towerEventsService.createTowerEvent(editable)
      Modal.getOrCreateInstance('#exampleModal').hide()
      editable = new TowerEvent({})
    }
    catch (error) {
      Pop.error(error.message)
    }
  }

  if (!AppState.account) {
    return
  }

  return (

    <div className="TowerEventForm">
      <form action="" onSubmit={createTowerEvent}>
        <div className="form-floating mb-2">
          <input defaultValue={editable.name} onChange={bindEditable} type="text" className="form-control" id="floatingInput name" name="name" aria-describedby="name"
            maxLength={30} required />
          <label htmlFor="floatingInput">Event Name</label>
        </div>
        <div className="form-floating mb-2">
          <textarea defaultValue={editable.description} onChange={bindEditable} className="form-control" id="floatingInput description" name="description"
            aria-describedby="description" required></textarea>
          <label htmlFor="floatingInput">Event Description</label>
        </div>
        <div className="form-floating mb-2">
          <input defaultValue={editable.coverImg} onChange={bindEditable} type="url" className="form-control" id="floatingInput coverImg" name="coverImg" aria-describedby="coverImg"
            required />
          <label htmlFor="floatingInput">Event Cover Image</label>
        </div>
        <div className="form-floating mb-2">
          <input defaultValue={editable.location} onChange={bindEditable} type="text" className="form-control" id="floatingInput location" name="location" aria-describedby="location"
            required />
          <label htmlFor="floatingInput">Event Location</label>
        </div>
        <div className="form-floating mb-2">
          <input defaultValue={editable.capacity} onChange={bindEditable} type="number" className="form-control" id="floatingInput capacity" name="capacity" aria-describedby="capacity"
            required />
          <label htmlFor="floatingInput">Event Capacity</label>
        </div>
        <div className="form-floating mb-2">
          <input defaultValue={editable.startDate} onChange={bindEditable} type="date" className="form-control" id="floatingInput startDate" name="startDate" aria-describedby="startDate"
            required />
          <label htmlFor="floatingInput">Event Date</label>
        </div>
        <select defaultValue={editable.type} onChange={bindEditable} className="form-select mb-2" aria-label="Default select type" name="type" id="type" required>
          <option>Select an event type</option>
          {options}
        </select>

        <div className="text-end">
          <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-outline mx-1">Submit</button>
        </div>
      </form>
    </div >
  )

}
// @ts-ignore
export default observer(TowerEventForm)