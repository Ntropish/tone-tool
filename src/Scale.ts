import { PitchClassSet } from "./pcs";
import { ModeName, modes, scaleModes } from "./scales";
import { NoteName, notes, notesByNumber } from "./notes";
import { Chord } from "./Chord";
import { ChordName, chords } from "./chords";

export class Scale {
  public pcs: PitchClassSet;
  public tonic: NoteName;
  // public mode: ModeName;

  public constructor(tonic: NoteName, pcs: PitchClassSet) {
    this.tonic = tonic;
    this.pcs = pcs;
  }

  public static build(tonic: NoteName, mode: ModeName): Scale {
    const pcs = PitchClassSet.fromMode(tonic, mode);
    return new Scale(tonic, pcs);
  }

  public getNotes() {
    const allNotes = this.pcs.getNotes();
    const tonicBit = notes[this.tonic];
    const tonicIndex = allNotes.findIndex((note) => notes[note] === tonicBit);

    if (tonicIndex === -1) {
      return allNotes; // Should not happen in a valid scale
    }
    return [...allNotes.slice(tonicIndex), ...allNotes.slice(0, tonicIndex)];
  }

  public transpose(interval: number): Scale {
    const currentTonicIndex = Math.log2(notes[this.tonic]);
    const newTonicIndex = (currentTonicIndex + (interval % 12) + 12) % 12;
    const newTonicBit = 1 << newTonicIndex;
    const newTonicName = notesByNumber[newTonicBit][0];

    return new Scale(newTonicName, this.pcs.transpose(interval));
  }

  public getChords(config?: {
    where?: {
      note?: NoteName | NoteName[];
      quality?: ChordName | ChordName[];
    };
  }): Chord[] {
    const matchingChords: Chord[] = [];
    const scaleMask = this.pcs.Bitmask;

    const qualitiesIn = config?.where?.quality;
    const qualitiesToTest = qualitiesIn
      ? Array.isArray(qualitiesIn)
        ? qualitiesIn
        : [qualitiesIn]
      : (Object.keys(chords) as ChordName[]);

    const notesIn = config?.where?.note;
    const tonicsToTest = notesIn
      ? Array.isArray(notesIn)
        ? notesIn
        : [notesIn]
      : this.getNotes();

    for (const quality of qualitiesToTest) {
      for (const tonic of tonicsToTest) {
        // Ensure the tonic is actually in the scale before checking the chord
        if (!this.getNotes().includes(tonic)) continue;

        const chordPcs = PitchClassSet.fromChord(tonic, quality);
        const chordMask = chordPcs.Bitmask;

        if ((scaleMask & chordMask) === chordMask) {
          matchingChords.push(Chord.build(tonic, quality));
        }
      }
    }

    return matchingChords;
  }

  // 1. transpose the local scale to the c-based standard
  // 2. for each chord,
  // 3. if the chord matches the transposed scale, add the chord name to the set
  // 4. return the set of chord names

  public getQualities(): string[] {
    const names = new Set<string>();

    const tonicInterval = Math.log2(notes[this.tonic]);
    const transposedPcs = this.pcs.transpose(-tonicInterval);

    for (const [quality, mask] of Object.entries(modes)) {
      if (mask === transposedPcs.Bitmask) {
        names.add(quality);
      }
    }

    return Array.from(names);
  }

  public getNames(): string[] {
    return this.getQualities().map((quality) => `${this.tonic} ${quality}`);
  }

  public toString() {
    return this.getNames()[0];
  }

  get [Symbol.toStringTag]() {
    return this.toString() || `Unknown Scale: ${this.tonic} ${this.pcs}`;
  }
}
