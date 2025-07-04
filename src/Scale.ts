import { PitchClassSet } from "./pcs";
import { ModeName, modes } from "./scales";
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
          matchingChords.push(new Chord(tonic, quality));
        }
      }
    }

    return matchingChords;
  }

  public getNames(): string[] {
    const names = new Set<string>();
    const thisMask = this.pcs.Bitmask;

    for (const tonicName of Object.keys(notes) as NoteName[]) {
      const tonicInterval = Math.log2(notes[tonicName]);

      for (const modeName of Object.keys(modes) as ModeName[]) {
        const modeMask = modes[modeName];
        const newPcs = new PitchClassSet(modeMask).transpose(tonicInterval);

        if (newPcs.Bitmask === thisMask) {
          names.add(`${tonicName} ${modeName}`);
        }
      }
    }
    return Array.from(names);
  }

  public toString() {
    return `${this.tonic} ${this.pcs.toString()}`;
  }
}
