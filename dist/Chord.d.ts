import { PitchClassSet } from './pcs';
import { ChordName } from './chords';
import { NoteName } from './notes';
import { Scale } from './Scale';
import { ModeName } from './scales';
export declare class Chord {
    pcs: PitchClassSet;
    tonic: NoteName;
    constructor(tonic: NoteName, pcs: PitchClassSet);
    toString(): string;
    get [Symbol.toStringTag](): string;
    static build(tonic: NoteName, shape: ChordName): Chord;
    getNotes(): ("C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B")[];
    transpose(interval: number): Chord;
    getScales(config?: {
        where?: {
            tonic?: NoteName | NoteName[];
            mode?: ModeName | ModeName[];
        };
    }): Scale[];
    getQualities(): string[];
    getNames(): string[];
}
