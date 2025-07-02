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

  public static fromRoman(scale: Scale, numerals: string): ChordProgression {
    const numeralArray = numerals.split("-");
    const chords = numeralArray.map((numeral) => {
      if (numeral === "?") {
        return null;
      }
      return fromRoman(numeral, scale);
    });
    return new ChordProgression(scale, chords);
  }

  public static fromBuiltIn(
    scale: Scale,
    name: ProgressionName
  ): ChordProgression {
    const numeralPattern = popularProgressions[name];
    return ChordProgression.fromRoman(scale, numeralPattern);
  }

  public generatePossibilities(): ChordProgression[] {
    const possibilities: ChordProgression[] = [];

    // Get the string representation of the current chord progression
    const currentProgressionStrings = this.chords.map((chord) =>
      chord ? chord.toString() : null
    );

    for (const key in popularProgressions) {
      const popularProgressionName = key as ProgressionName;
      const popularProgressionNumerals =
        popularProgressions[popularProgressionName].split("-");

      if (
        popularProgressionNumerals.length !== currentProgressionStrings.length
      ) {
        continue; // Lengths don't match, so it can't be a possibility
      }

      const popularProgressionChords = popularProgressionNumerals.map(
        (numeral) => fromRoman(numeral, this.scale)
      );
      const popularProgressionStrings = popularProgressionChords.map((chord) =>
        chord.toString()
      );

      let isMatch = true;
      for (let i = 0; i < currentProgressionStrings.length; i++) {
        const currentChord = currentProgressionStrings[i];
        const popularChord = popularProgressionStrings[i];

        // If the current chord is not null, it must match the popular progression's chord
        if (currentChord !== null && currentChord !== popularChord) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        possibilities.push(
          new ChordProgression(this.scale, popularProgressionChords)
        );
      }
    }

    return possibilities;
  }

  public toStrings(): string[] {
    return this.chords.map((chord) => chord?.toString() || "null");
  }
}
