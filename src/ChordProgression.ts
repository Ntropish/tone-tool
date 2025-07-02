import { Chord } from "./Chord";
import { Scale } from "./Scale";
import { popularProgressions, ProgressionName } from "./progressions";
import { fromRoman } from "./romanNumerals";
import { ChordName } from "./chords";

export class ChordProgression {
  public scale: Scale;
  public chords: (Chord | null)[];

  public constructor(scale: Scale, chords: (Chord | null)[]) {
    this.scale = scale;
    this.chords = chords;
  }

  public static fromRoman(
    scale: Scale,
    pattern: ProgressionName | string[]
  ): ChordProgression {
    const numeralPattern =
      typeof pattern === "string" ? popularProgressions[pattern] : pattern;
    const chords = numeralPattern.map((numeral) => fromRoman(numeral, scale));
    return new ChordProgression(scale, chords);
  }

  public generatePossibilities(config?: {
    where?: { quality?: ChordName | ChordName[] };
  }): ChordProgression[] {
    const possibilities: ChordProgression[] = [];
    const firstNullIndex = this.chords.indexOf(null);

    if (firstNullIndex === -1) {
      // Base case: no nulls, this is a complete progression
      return [this];
    }

    const availableChords = this.scale.getChords(config);

    for (const candidateChord of availableChords) {
      const newChords = [...this.chords];
      newChords[firstNullIndex] = candidateChord;
      const newProgression = new ChordProgression(this.scale, newChords);
      possibilities.push(...newProgression.generatePossibilities(config));
    }

    return possibilities;
  }

  public toStrings(): string[] {
    return this.chords.map((chord) => chord?.toString() || "null");
  }
}
