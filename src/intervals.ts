export const intervals = {
  PERFECT_UNISON: 0,
  MINOR_SECOND: 1,
  MAJOR_SECOND: 2,
  MINOR_THIRD: 3,
  MAJOR_THIRD: 4,
  PERFECT_FOURTH: 5,
  TRITONE: 6,
  AUGMENTED_FOURTH: 6,
  DIMINISHED_FIFTH: 6,
  PERFECT_FIFTH: 7,
  MINOR_SIXTH: 8,
  MAJOR_SIXTH: 9,
  MINOR_SEVENTH: 10,
  MAJOR_SEVENTH: 11,
  PERFECT_OCTAVE: 12,
};

export type IntervalName = keyof typeof intervals;

export type TransposeArg = number | IntervalName;
