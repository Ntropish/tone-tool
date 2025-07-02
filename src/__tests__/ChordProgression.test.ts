import { describe, expect, it } from "vitest";
import { Chord } from "../Chord";
import { Scale } from "../Scale";
import { ChordProgression } from "../ChordProgression";

describe("ChordProgression", () => {
  const cMajorScale = new Scale("C", "MAJOR");

  describe("fromRoman", () => {
    it("should create a I-V-vi-IV progression in C Major from a named pattern", () => {
      const progression = ChordProgression.fromRoman(cMajorScale, "I-V-vi-IV");
      expect(progression.toStrings()).toEqual([
        "C MAJOR",
        "G MAJOR",
        "A MINOR",
        "F MAJOR",
      ]);
    });

    it("should create a ii-V-I progression in D Major from a numeral array", () => {
      const dMajorScale = new Scale("D", "MAJOR");
      const progression = ChordProgression.fromRoman(dMajorScale, [
        "ii",
        "V",
        "I",
      ]);
      expect(progression.toStrings()).toEqual([
        "E MINOR",
        "A MAJOR",
        "D MAJOR",
      ]);
    });
  });

  describe("generatePossibilities", () => {
    it("should find all 7 diatonic possibilities for a single null slot in C Major", () => {
      const progression = new ChordProgression(cMajorScale, [null]);
      const possibilities = progression.generatePossibilities({
        where: { quality: ["MAJOR", "MINOR", "DIMINISHED"] },
      });
      expect(possibilities).toHaveLength(7);
      const firstResult = possibilities[0].toStrings();
      expect(firstResult).toEqual(["C MAJOR"]);
    });

    it("should correctly complete a ii-?-I progression in C Major", () => {
      const partial = new ChordProgression(cMajorScale, [
        new Chord("D", "MINOR"),
        null,
        new Chord("C", "MAJOR"),
      ]);
      const possibilities = partial.generatePossibilities({
        where: { quality: ["MAJOR", "MINOR", "DIMINISHED"] },
      });
      const generatedStrings = possibilities.map((p) =>
        p.toStrings().join(" ")
      );
      expect(generatedStrings).toContain("D MINOR G MAJOR C MAJOR"); // The classic V chord
      expect(generatedStrings).toContain("D MINOR B DIMINISHED C MAJOR"); // A valid, if less common, choice
    });

    it("should return an empty array if no chords match the filter", () => {
      const progression = new ChordProgression(cMajorScale, [null]);
      const possibilities = progression.generatePossibilities({
        where: { quality: "AUGMENTED" },
      });
      expect(possibilities).toHaveLength(0);
    });
  });
});
