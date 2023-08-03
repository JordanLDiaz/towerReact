import { AppState } from "../AppState";
import { Comment } from "../models/Comment.js";
import { TowerEvent } from "../models/TowerEvent";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { api } from "./AxiosService";

class TowerEventsService {
  async getTowerEvents() {
    const res = await api.get('api/events')
    logger.log('[GETTING TOWEREVENTS]', res.data)
    AppState.towerEvents = res.data.map(towerEvent => new TowerEvent(towerEvent))
  }

  async getTowerEventById(eventId) {
    AppState.activeTowerEvent = null
    const res = await api.get(`api/events/${eventId}`)
    // logger.log('[GETTING EVENT BY ID]', res.data)
    AppState.activeTowerEvent = new TowerEvent(res.data)
    logger.log('[ACTIVE EVENT IN APPSTATE]', AppState.activeTowerEvent)
  }

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('[COMMENTS BY EVENT]', res.data)
    AppState.comments = res.data.map(c => new Comment(c))
  }


  async createTowerEvent(eventData) {
    const res = await api.post('api/events', eventData)
    logger.log('[CREATING AN EVENT]', res.data)
    AppState.towerEvents.push(new TowerEvent(res.data))
  }

  async cancelTowerEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    // @ts-ignore
    AppState.activeTowerEvent.isCanceled = true
    // logger.log('[BEFORE CANCEL]', AppState.activeTowerEvent?.isCanceled)
    // @ts-ignore
    // event.isCanceled = true
    // logger.log('[CANCELING EVENT]', AppState.activeTowerEvent?.isCanceled)
    // let index = AppState.towerEvents.findIndex(t => t.id == eventId)
    // let updateEvent = new TowerEvent(res.data)
    // AppState.towerEvents.splice(index, 1, updateEvent)


  }

}

export const towerEventsService = new TowerEventsService();