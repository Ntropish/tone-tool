import { describe, expect, it } from "vitest";
import { Chord } from "../Chord";
import { Scale } from "../Scale";
import { ChordProgression } from "../ChordProgression";

describe("ChordProgression", () => {
  const cMajorScale = new Scale("C", "MAJOR");

  describe("fromRoman", () => {
    it("should create a progression from a dash-separated string of Roman numerals", () => {
      const progression = ChordProgression.fromRoman(cMajorScale, "I-V-vi-IV");
      expect(progression.toStrings()).toEqual([
        "C MAJOR",
        "G MAJOR",
        "A MINOR",
        "F MAJOR",
      ]);
    });

    it("should handle '?' as a null placeholder in the pattern", () => {
      const progression = ChordProgression.fromRoman(cMajorScale, "ii-?-I");
      expect(progression.chords[1]).toBeNull();
      expect(progression.toStrings()).toEqual(["D MINOR", "null", "C MAJOR"]);
    });
  });

  describe("fromBuiltIn", () => {
    it("should create the 'Axis of Awesome' progression", () => {
      const progression = ChordProgression.fromBuiltIn(
        cMajorScale,
        "Axis of Awesome"
      );
      expect(progression.toStrings()).toEqual([
        "C MAJOR",
        "G MAJOR",
        "A MINOR",
        "F MAJOR",
      ]);
    });

    it("should create the 'Pachelbel's Canon' progression", () => {
      const dMajorScale = new Scale("D", "MAJOR");
      const progression = ChordProgression.fromBuiltIn(
        dMajorScale,
        "Pachelbel's Canon"
      );
      expect(progression.toStrings()).toEqual([
        "D MAJOR",
        "A MAJOR",
        "B MINOR",
        "F# MINOR",
        "G MAJOR",
        "D MAJOR",
        "G MAJOR",
        "A MAJOR",
      ]);
    });
  });

  describe("generatePossibilities", () => {
    it("should find known progressions that match a pattern", () => {
      // In C Major, I-?-vi-IV is a pattern that should match "Axis of Awesome"
      const progression = ChordProgression.fromRoman(cMajorScale, "I-?-vi-IV");
      const possibilities = progression.generatePossibilities();
      expect(possibilities).toHaveLength(1);
      expect(possibilities[0].toStrings()).toEqual([
        "C MAJOR",
        "G MAJOR",
        "A MINOR",
        "F MAJOR",
      ]);
    });

    it("should find the one correct progression for ii-?-I", () => {
      const progression = ChordProgression.fromRoman(cMajorScale, "ii-?-I");
      const possibilities = progression.generatePossibilities();
      expect(possibilities).toHaveLength(1);
      expect(possibilities[0].toStrings()).toEqual([
        "D MINOR",
        "G MAJOR",
        "C MAJOR",
      ]);
    });

    it("should return an empty array if no popular progressions match", () => {
      const progression = ChordProgression.fromRoman(cMajorScale, "I-?-I-?-I"); // No 5-chord progressions in our list
      const possibilities = progression.generatePossibilities();
      expect(possibilities).toHaveLength(0);
    });

    it("should return the original progression if it is complete and valid", () => {
      const progression = ChordProgression.fromRoman(cMajorScale, "I-IV-V");
      const possibilities = progression.generatePossibilities();
      expect(possibilities).toHaveLength(1);
      expect(possibilities[0].toStrings()).toEqual([
        "C MAJOR",
        "F MAJOR",
        "G MAJOR",
      ]);
    });

    it("should work for a different key (D Major)", () => {
      const dMajorScale = new Scale("D", "MAJOR");
      const progression = ChordProgression.fromRoman(dMajorScale, "?-V-?-IV");
      const possibilities = progression.generatePossibilities();
      expect(possibilities).toHaveLength(1);
      expect(possibilities[0].toStrings()).toEqual([
        "D MAJOR", // from I-V-vi-IV
        "A MAJOR",
        "B MINOR",
        "G MAJOR",
      ]);
    });
  });
});
