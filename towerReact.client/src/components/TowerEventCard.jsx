import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite';
import React from 'react';
import { TowerEvent } from "../models/TowerEvent";
import { Link } from "react-router-dom";

/** @param {{towerEvent: TowerEvent}} props */
export default function TowerEventCard({ towerEvent }) {

  return (

    <div className="card bg-primary TowerEventCard">
      <div className="p-2">
        <Link to={"/events/" + towerEvent.id}>
          <img src={towerEvent.coverImg} alt={towerEvent.name} className="selectable img-fluid" />
        </Link>
        <h3>{towerEvent.name}</h3>
        <h5>{towerEvent.location}</h5>
        {/* FIXME change to spots remaining once ticketCount finished */}
        <p className="text-end"><b>{towerEvent.capacity}</b> capacity</p>
      </div>

    </div>
  )

}

// NOTE bring in props here
TowerEventCard.proptypes = {
  towerEvent: PropTypes.instanceOf(TowerEvent)
}