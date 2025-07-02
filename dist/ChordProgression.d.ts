import { Chord } from './Chord';
import { Scale } from './Scale';
import { ProgressionName } from './progressions';
export declare class ChordProgression {
    scale: Scale;
    chords: (Chord | null)[];
    constructor(scale: Scale, chords: (Chord | null)[]);
    static fromRoman(scale: Scale, numerals: string): ChordProgression;
    static fromBuiltIn(scale: Scale, name: ProgressionName): ChordProgression;
    generatePossibilities(): ChordProgression[];
    toStrings(): string[];
}
