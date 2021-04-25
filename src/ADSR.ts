import * as types from './types'
import * as math from 'mathjs'

export default class ADSR {
  attackDuration: number
  attackLevel: number
  decayDuration: number
  sustainLevel: number
  releaseDuration: number
  constructor() {
    this.attackDuration = 100
    this.attackLevel = 1
    this.decayDuration = 100
    this.sustainLevel = 0.8
    this.releaseDuration = 400
  }

  get attackEvent(): types.ADSREvent {
    return [this.attackLevel, this.attackDuration / 1000]
  }

  get decayEvent(): types.ADSREvent {
    return [this.sustainLevel, this.decayDuration / 1000]
  }

  get releaseEvent(): types.ADSREvent {
    return [0, this.releaseDuration / 1000]
  }
}
