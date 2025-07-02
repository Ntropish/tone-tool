import { notesByNumber, NoteName, notes } from "./notes";
import { ChordName, chords } from "./chords";
import { modes, ModeName } from "./scales";

export class PitchClassSet {
  private bitmask: number; // not editable
  public get Bitmask() {
    return this.bitmask;
  }
  public constructor(bitmask: number) {
    this.bitmask = bitmask & 4095;
  }
  public static fromChord(tonic: NoteName, chord: ChordName) {
    const tonicInterval = Math.log2(notes[tonic]);
    const chordMask = chords[chord];

    return new PitchClassSet(transpose(chordMask, tonicInterval));
  }

  public static fromMode(tonic: NoteName, mode: ModeName) {
    const tonicInterval = Math.log2(notes[tonic]);
    const modeMask = modes[mode];
    return new PitchClassSet(transpose(modeMask, tonicInterval));
  }

  public static fromNotes(noteNames: NoteName[]) {
    const bitmask = noteNames.reduce((acc, note) => acc | notes[note], 0);
    return new PitchClassSet(bitmask);
  }

  public getNotes() {
    const degrees: NoteName[] = [];
    for (let i = 0; i < 12; i++) {
      if (this.bitmask & (1 << i)) {
        const note = notesByNumber[1 << i][0];
        if (note) {
          degrees.push(note);
        }
      }
    }
    return degrees;
  }

  public getDegree(degree: number) {
    const note = notesByNumber[1 << degree][0];
    if (note) {
      return note;
    }
    return null;
  }

  public getDegrees() {
    const degrees: number[] = [];
    for (let i = 0; i < 12; i++) {
      if (this.bitmask & (1 << i)) {
        degrees.push(i);
      }
    }
    return degrees;
  }

  public transpose(interval: number) {
    return new PitchClassSet(transpose(this.bitmask, interval));
  }

  // to string
  public toString() {
    return this.bitmask.toString(2).padStart(12, "0");
  }
}

function transpose(bitmask: number, interval: number) {
  const n = ((interval % 12) + 12) % 12;
  if (n === 0) {
    return bitmask;
  }
  return ((bitmask << n) | (bitmask >> (12 - n))) & 4095;
}
