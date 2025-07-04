import { PitchClassSet } from "./pcs";
import { ChordName, chords } from "./chords";
import { NoteName, notes, notesByNumber } from "./notes";
import { Scale } from "./Scale";
import { ModeName, modes } from "./scales";

export class Chord {
  public pcs: PitchClassSet;
  public tonic: NoteName;

  public constructor(tonic: NoteName, pcs: PitchClassSet) {
    this.tonic = tonic;
    this.pcs = pcs;
  }

  toString() {
    const firstQuality = this.getQualities()[0];
    return `${this.tonic} ${firstQuality}`;
  }

  get [Symbol.toStringTag]() {
    return this.toString() || `Unknown Chord: ${this.tonic} ${this.pcs}`;
  }

  public static build(tonic: NoteName, shape: ChordName): Chord {
    if (!notes[tonic]) {
      throw new Error(`Invalid tonic: ${tonic}`);
    }
    if (!chords[shape]) {
      throw new Error(`Invalid chord quality: ${shape}`);
    }
    const pcs = PitchClassSet.fromChord(tonic, shape);
    return new Chord(tonic, pcs);
  }

  public getNotes() {
    const allNotes = this.pcs.getNotes();
    const tonicIndex = allNotes.findIndex((note) => note === this.tonic);
    if (tonicIndex === -1) {
      return allNotes; // Should not happen in a valid chord
    }
    return [...allNotes.slice(tonicIndex), ...allNotes.slice(0, tonicIndex)];
  }

  public transpose(interval: number): Chord {
    const currentTonicIndex = Math.log2(notes[this.tonic]);
    const newTonicIndex = (currentTonicIndex + (interval % 12) + 12) % 12;
    const newTonicBit = 1 << newTonicIndex;
    const newTonicName = notesByNumber[newTonicBit][0];

    return new Chord(newTonicName, this.pcs.transpose(interval));
  }

  public getScales(config?: {
    where?: {
      tonic?: NoteName | NoteName[];
      mode?: ModeName | ModeName[];
    };
  }): Scale[] {
    const matchingScales: Scale[] = [];
    const chordMask = this.pcs.Bitmask;

    const modesIn = config?.where?.mode;
    const modesToTest = modesIn
      ? Array.isArray(modesIn)
        ? modesIn
        : [modesIn]
      : (Object.keys(modes) as ModeName[]);

    const tonicsIn = config?.where?.tonic;
    const tonicsToTest = tonicsIn
      ? Array.isArray(tonicsIn)
        ? tonicsIn
        : [tonicsIn]
      : (Object.keys(notes) as NoteName[]);

    for (const mode of modesToTest) {
      for (const tonic of tonicsToTest) {
        const scalePcs = PitchClassSet.fromMode(tonic, mode);
        const scaleMask = scalePcs.Bitmask;

        if ((scaleMask & chordMask) === chordMask) {
          matchingScales.push(Scale.build(tonic, mode));
        }
      }
    }
    return matchingScales;
  }

  public getQualities(): string[] {
    // 1. for each chord,
    // 2. transpose the chord to the local tonic
    // 3. if the chord matches the local tonic, add the chord name to the set
    // 4. return the set of chord names

    const names = new Set<string>();
    const thisMask = this.pcs.Bitmask;

    const tonicInterval = Math.log2(notes[this.tonic]);
    const transposedPcs = this.pcs.transpose(-tonicInterval);

    for (const [quality, mask] of Object.entries(chords)) {
      if (mask === transposedPcs.Bitmask) {
        names.add(quality);
      }
    }

    return Array.from(names);
  }

  public getNames(): string[] {
    return this.getQualities().map((quality) => `${this.tonic} ${quality}`);
  }
}
