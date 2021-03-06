import { notes } from './notes'
import ADSR from './ADSR'
import * as types from './types'

function getAudioContext(): AudioContext {
  //@ts-ignore
  const AC = window.AudioContext ?? window.webkitAudioContext ?? false
  return new AC()
}

let context: AudioContext

try {
  context = getAudioContext()
} catch {
  alert('your browser does not support the Web Audio API')
  // TODO: export somethign
}

export default class OSC {
  static context = context
  static sine: OscillatorType = 'sine'
  static square: OscillatorType = 'square'
  static sawtooth: OscillatorType = 'sawtooth'
  static triangle: OscillatorType = 'triangle'
  oscillator: OscillatorNode
  gain: GainNode
  adsr: ADSR
  high: boolean
  #earliestEvent: number
  constructor(note: string = 'Ash4') {
    this.adsr = new ADSR()
    this.oscillator = context.createOscillator()
    this.gain = context.createGain()
    this.oscillator.type = OSC.sawtooth
    this.oscillator.connect(this.gain)
    this.high = false
    if (note) {
      this.oscillator.frequency.value = 400

      //@ts-ignore
      this.oscillator.frequency.value = notes[note]
    } else {
      this.oscillator.frequency.value = 400
    }
    this.gain.connect(context.destination)
    this.gain.gain.setValueAtTime(0, context.currentTime)
    this.oscillator.start(context.currentTime)
    this.#earliestEvent = context.currentTime
    //oscillator.stop(now + duration)
  }

  setHigh() {
    this.high = true
    this.gain.gain.setValueAtTime(1, context.currentTime)
  }

  setLow() {
    this.gain.gain.setValueAtTime(0, context.currentTime)
    this.high = false
  }

  get context() {
    return context
  }
}
