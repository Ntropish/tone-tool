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

  public static build(tonic: NoteName, shape: ChordName): Chord {
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
          matchingScales.push(new Scale(tonic, mode));
        }
      }
    }
    return matchingScales;
  }

  public getQualities() {
    const allQualities = Object.keys(chords) as ChordName[];
    const chordMask = this.pcs.Bitmask;
    return allQualities.filter(
      (quality) => (chords[quality] & chordMask) === chordMask
    );
  }

  public toString() {
    return `${this.tonic} ${this.pcs.toString()}`;
  }

  public getNames(): string[] {
    const names = new Set<string>();
    const thisMask = this.pcs.Bitmask;

    for (const tonicName of Object.keys(notes) as NoteName[]) {
      const tonicInterval = Math.log2(notes[tonicName]);

      for (const qualityName of Object.keys(chords) as ChordName[]) {
        const qualityMask = chords[qualityName];
        const newPcs = new PitchClassSet(qualityMask).transpose(tonicInterval);

        if (newPcs.Bitmask === thisMask) {
          names.add(`${tonicName} ${qualityName}`);
        }
      }
    }
    return Array.from(names);
  }
}
