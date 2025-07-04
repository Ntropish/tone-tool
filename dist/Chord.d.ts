import { PitchClassSet } from './pcs';
import { ChordName } from './chords';
import { NoteName } from './notes';
import { Scale } from './Scale';
import { ModeName } from './scales';
export declare class Chord {
    pcs: PitchClassSet;
    tonic: NoteName;
    constructor(tonic: NoteName, pcs: PitchClassSet);
    static build(tonic: NoteName, shape: ChordName): Chord;
    getNotes(): ("C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B")[];
    transpose(interval: number): Chord;
    getScales(config?: {
        where?: {
            tonic?: NoteName | NoteName[];
            mode?: ModeName | ModeName[];
        };
    }): Scale[];
    getQualities(): ("POWER" | "SUS2" | "SUS4" | "MAJOR" | "MAJ" | "MINOR" | "MIN" | "DIMINISHED" | "DIM" | "AUGMENTED" | "AUG" | "ADD2" | "ADD4" | "ADD9" | "MAJOR_ADD9" | "MINOR_ADD9" | "MAJOR6" | "MAJOR6_ADD9" | "MINOR6" | "DOMINANT7" | "SEVENTH" | "MAJOR7" | "MAJ7" | "MINOR7" | "MIN7" | "MINOR_MAJOR7" | "MM7" | "DIMINISHED7" | "DIM7" | "HALF_DIMINISHED7" | "MIN7_FLAT5" | "AUGMENTED7" | "AUG7" | "AUGMENTED_MAJOR7" | "AUGMAJ7" | "SUS4_7" | "SUS2_7" | "DOMINANT9" | "9" | "MAJOR9" | "MINOR9" | "MIN9" | "MINOR_MAJOR9" | "DOMINANT7_FLAT9" | "7B9" | "DOMINANT7_SHARP9" | "7SHARP9" | "DOMINANT11" | 11 | "MINOR11" | "MAJOR11" | "DOMINANT7_SHARP11" | "DOMINANT13" | 13 | "MAJOR13" | "MINOR13" | "ALT")[];
    toString(): string;
    get [Symbol.toStringTag](): string;
    getNames(): string[];
}
