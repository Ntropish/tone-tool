import { NoteName } from './notes';
import { ChordName } from './chords';
import { ModeName } from './scales';
export declare class PitchClassSet {
    private bitmask;
    get Bitmask(): number;
    constructor(bitmask: number);
    static fromChord(tonic: NoteName, chord: ChordName): PitchClassSet;
    static fromMode(tonic: NoteName, mode: ModeName): PitchClassSet;
    static fromNotes(noteNames: NoteName[]): PitchClassSet;
    getNotes(): ("C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B")[];
    getDegree(degree: number): "C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B";
    getDegrees(): number[];
    transpose(interval: number): PitchClassSet;
    toString(): string;
}
