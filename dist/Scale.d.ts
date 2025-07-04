import { PitchClassSet } from './pcs';
import { ModeName } from './scales';
import { NoteName } from './notes';
import { Chord } from './Chord';
import { ChordName } from './chords';
export declare class Scale {
    pcs: PitchClassSet;
    tonic: NoteName;
    constructor(tonic: NoteName, pcs: PitchClassSet);
    static build(tonic: NoteName, mode: ModeName): Scale;
    getNotes(): ("C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B")[];
    transpose(interval: number): Scale;
    getChords(config?: {
        where?: {
            note?: NoteName | NoteName[];
            quality?: ChordName | ChordName[];
        };
    }): Chord[];
    getNames(): string[];
    toString(): string;
}
