import { PitchClassSet } from './pcs';
import { ChordName } from './chords';
import { NoteName } from './notes';
import { Scale } from './Scale';
import { ModeName } from './scales';
export declare class Chord {
    pcs: PitchClassSet;
    tonic: NoteName;
    quality: ChordName;
    constructor(tonic: NoteName, quality: ChordName);
    getNotes(): ("C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B")[];
    transpose(interval: number): Chord;
    getScales(config?: {
        where?: {
            tonic?: NoteName | NoteName[];
            mode?: ModeName | ModeName[];
        };
    }): Scale[];
    toString(): string;
    getNames(): string[];
}
