export declare const intervals: {
    PERFECT_UNISON: number;
    MINOR_SECOND: number;
    MAJOR_SECOND: number;
    MINOR_THIRD: number;
    MAJOR_THIRD: number;
    PERFECT_FOURTH: number;
    TRITONE: number;
    AUGMENTED_FOURTH: number;
    DIMINISHED_FIFTH: number;
    PERFECT_FIFTH: number;
    MINOR_SIXTH: number;
    MAJOR_SIXTH: number;
    MINOR_SEVENTH: number;
    MAJOR_SEVENTH: number;
    PERFECT_OCTAVE: number;
};
export type IntervalName = keyof typeof intervals;
export type TransposeArg = number | IntervalName;
