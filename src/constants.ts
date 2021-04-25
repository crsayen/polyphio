function round(n: number): number {
  return 0 ^ (n + 0.5)
}

export const NUM_STEPS = 1152
export const MEASURE_LENGTH = round(NUM_STEPS / 4)

export const NOTESIZE: { [note: string]: number } = {
  whole: MEASURE_LENGTH,
  half: round(MEASURE_LENGTH / 2),
  quarter: round(MEASURE_LENGTH / 4),
  eighth: round(MEASURE_LENGTH / 8),
  sixteenth: round(MEASURE_LENGTH / 16),
  thirtysecond: round(MEASURE_LENGTH / 32),
}

export const NOTES = [4, 5, 6]
  .map((n) =>
    ['C', 'Csh', 'D', 'Dsh', 'E', 'F', 'Fsh', 'G', 'Gsh', 'A', 'Ash', 'B']
      .map((d) => `${d}${n}`)
      .join(',')
  )
  .join(',')
  .split(',')
  .reverse()

export const NOTE_OBJ = {
  C4: [],
  Csh4: [],
  D4: [],
  Dsh4: [],
  E4: [],
  F4: [],
  Fsh4: [],
  G4: [],
  Gsh4: [],
  A4: [],
  Ash4: [],
  B4: [],
  C5: [],
  Csh5: [],
  D5: [],
  Dsh5: [],
  E5: [],
  F5: [],
  Fsh5: [],
  G5: [],
  Gsh5: [],
  A5: [],
  Ash5: [],
  B5: [],
  C6: [],
  Csh6: [],
  D6: [],
  Dsh6: [],
  E6: [],
  F6: [],
  Fsh6: [],
  G6: [],
  Gsh6: [],
  A6: [],
  Ash6: [],
  B6: [],
}
