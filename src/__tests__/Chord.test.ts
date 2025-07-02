import { describe, expect, it } from "vitest";
import { Chord } from "../Chord";
import { PitchClassSet } from "../pcs";

describe("Chord", () => {
  describe("constructor and getNotes", () => {
    it("should correctly create a C Major chord and order notes from the tonic", () => {
      const chord = new Chord("C", "MAJOR");
      expect(chord.tonic).toBe("C");
      expect(chord.quality).toBe("MAJOR");
      expect(chord.pcs.toString()).toBe("000010010001");
      expect(chord.getNotes()).toEqual(["C", "E", "G"]);
    });

    it("should handle chords with tonics other than C, like F# Minor", () => {
      const chord = new Chord("F#", "MINOR");
      expect(chord.tonic).toBe("F#");
      expect(chord.pcs.toString()).toBe("001001000010");
      expect(chord.getNotes()).toEqual(["F#", "A", "C#"]);
    });
  });

  describe("transpose", () => {
    it("should transpose a G Dominant 7th chord up a perfect fourth to C Dominant 7th", () => {
      const g7 = new Chord("G", "DOMINANT7");
      const c7 = g7.transpose(5);
      expect(c7.tonic).toBe("C");
      expect(c7.quality).toBe("DOMINANT7");
      expect(c7.getNotes()).toEqual(["C", "E", "G", "A#"]);
    });

    it("should handle transpositions that cross the octave boundary, like B Major down a minor third", () => {
      const bMaj = new Chord("B", "MAJOR");
      const gSharpMaj = bMaj.transpose(-3);
      expect(gSharpMaj.tonic).toBe("G#");
      expect(gSharpMaj.getNotes()).toEqual(["G#", "C", "D#"]);
    });

    it("should maintain the chord quality after transposition", () => {
      const quality = "DIMINISHED7";
      const dDim7 = new Chord("D", quality);
      const fDim7 = dDim7.transpose(3);
      expect(fDim7.quality).toBe(quality);
      expect(fDim7.pcs.toString()).toEqual(
        new Chord("F", quality).pcs.toString()
      );
    });
  });

  describe("getNames", () => {
    it("should find all enharmonic equivalents for a common chord, like C# Major", () => {
      const cSharpMajor = new Chord("C#", "MAJOR");
      const names = cSharpMajor.getNames();
      expect(names).toContain("C# MAJOR");
      expect(names).toContain("Db MAJOR");
      expect(names).toContain("C# MAJ");
      expect(names).toContain("Db MAJ");
    });

    it("should identify complex chords with multiple names, like G# diminished 7th", () => {
      const gSharpDim7 = new Chord("G#", "DIMINISHED7");
      const names = gSharpDim7.getNames();
      expect(names).toContain("G# DIM7");
      expect(names).toContain("B DIM7");
      expect(names).toContain("D DIM7");
      expect(names).toContain("F DIM7");
    });
  });

  describe("getScales", () => {
    it("should find all diatonic scales containing a C Major triad", () => {
      const cMajor = new Chord("C", "MAJOR");
      const scales = cMajor.getScales();
      const scaleNames = scales.map((s) => s.toString());

      expect(scales.length).toBeGreaterThan(0);
      expect(scaleNames).toContain("C IONIAN");
      expect(scaleNames).toContain("G MIXOLYDIAN");
      expect(scaleNames).toContain("F LYDIAN");
    });

    it("should find all Lydian modes containing a G Major triad", () => {
      const gMajor = new Chord("G", "MAJOR");
      const lydianModes = gMajor.getScales({ where: { mode: ["LYDIAN"] } });
      const scaleNames = lydianModes.map((s) => s.toString());

      expect(lydianModes).toHaveLength(3);
      expect(scaleNames).toContain("G LYDIAN");
      expect(scaleNames).toContain("F LYDIAN");
      expect(scaleNames).toContain("C LYDIAN");
    });

    it("should find the C Ionian scale for a Cmaj7 chord using a compound filter", () => {
      const cMaj7 = new Chord("C", "MAJOR7");
      const scales = cMaj7.getScales({
        where: { tonic: ["C"], mode: ["IONIAN"] },
      });

      expect(scales).toHaveLength(1);
      expect(scales[0].toString()).toBe("C IONIAN");
    });
  });
});
