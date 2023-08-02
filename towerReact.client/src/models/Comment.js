export class Comment {
  constructor(data = {}) {
    this.id = data.id
    this.body = data.body
    this.isAttending = data.isAttending
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.eventId = data.eventId
  }
}