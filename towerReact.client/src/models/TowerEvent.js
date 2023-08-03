import { makeAutoObservable } from "mobx"

export class TowerEvent {
  constructor(data = {}) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creator = data.creator
    this.creatorId = data.creatorId


    // NOTE this most likely only works within this template but should make things reactive 
    // makeAutoObservable(this)
  }
}