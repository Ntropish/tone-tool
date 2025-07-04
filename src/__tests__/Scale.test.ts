import { describe, expect, it } from "vitest";
import { Scale } from "../index";

describe("Scale", () => {
  describe("constructor and getNotes", () => {
    it("should correctly create a C Ionian (Major) scale", () => {
      const scale = Scale.build("C", "IONIAN");
      expect(scale.tonic).toBe("C");
      expect(scale.getNotes()).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
    });

    it("should correctly create an Eb Dorian scale", () => {
      const scale = Scale.build("Eb", "DORIAN");
      expect(scale.tonic).toBe("Eb");
      expect(scale.getNotes()).toEqual([
        "D#",
        "F",
        "F#",
        "G#",
        "A#",
        "C",
        "C#",
      ]);
    });

    it("should correctly create an A Minor Pentatonic scale", () => {
      const scale = Scale.build("A", "MINOR_PENTATONIC");
      expect(scale.tonic).toBe("A");
      expect(scale.getNotes()).toEqual(["A", "C", "D", "E", "G"]);
    });
  });

  describe("transpose", () => {
    it("should transpose a G Mixolydian scale up a major second to A Mixolydian", () => {
      const gMixo = Scale.build("G", "MIXOLYDIAN");
      const aMixo = gMixo.transpose(2);
      expect(aMixo.tonic).toBe("A");
      expect(aMixo.getNotes()).toEqual(["A", "B", "C#", "D", "E", "F#", "G"]);
    });

    it("should transpose a D Lydian scale down a perfect fourth to A Lydian", () => {
      const dLydian = Scale.build("D", "LYDIAN");
      const aLydian = dLydian.transpose(-5);
      expect(aLydian.tonic).toBe("A");
      expect(aLydian.getNotes()).toEqual([
        "A",
        "B",
        "C#",
        "D#",
        "E",
        "F#",
        "G#",
      ]);
    });
  });

  describe("getNames", () => {
    it("should find all names for C Ionian, including its alias 'Major'", () => {
      const cMajor = Scale.build("C", "IONIAN");
      const names = cMajor.getNames();
      expect(names).toContain("C IONIAN");
      expect(names).toContain("C MAJOR");
    });

    it("should find all relative modes for G Aeolian", () => {
      const gMinor = Scale.build("G", "AEOLIAN");
      const names = gMinor.getNames();
      expect(names).toContain("G AEOLIAN");
    });

    it("should correctly identify symmetrical scales, like C Whole Tone", () => {
      const cWhole = Scale.build("C", "WHOLE_TONE");
      const names = cWhole.getNames();
      expect(names).toHaveLength(1);
      expect(names).toContain("C WHOLE_TONE");
    });
  });

  describe("getChords", () => {
    it("should find all 7 diatonic major, minor, and diminished triads in C Major", () => {
      const cMajor = Scale.build("C", "MAJOR");
      const diatonicChords = cMajor.getChords({
        where: { quality: ["MAJOR", "MINOR", "DIMINISHED"] },
      });
      const chordNames = diatonicChords.map((c) => c.toString());

      expect(diatonicChords).toHaveLength(7);
      expect(chordNames).toContain("C MAJOR");
      expect(chordNames).toContain("D MINOR");
      expect(chordNames).toContain("E MINOR");
      expect(chordNames).toContain("F MAJOR");
      expect(chordNames).toContain("G MAJOR");
      expect(chordNames).toContain("A MINOR");
      expect(chordNames).toContain("B DIMINISHED");
    });

    it("should find only the minor chords in A Natural Minor using the 'where' filter", () => {
      const aMinor = Scale.build("A", "NATURAL_MINOR");
      const minorChords = aMinor.getChords({ where: { quality: "MINOR" } });
      const chordNames = minorChords.map((c) => c.toString());

      expect(minorChords).toHaveLength(3);
      expect(chordNames).toContain("A MINOR");
      expect(chordNames).toContain("D MINOR");
      expect(chordNames).toContain("E MINOR");
    });

    it("should find the V chord (G7) of C Major using a compound filter", () => {
      const cMajor = Scale.build("C", "MAJOR");
      const vChord = cMajor.getChords({
        where: { note: "G", quality: "DOMINANT7" },
      });
      expect(vChord).toHaveLength(1);
      expect(vChord[0].tonic).toBe("G");
      const notes = vChord[0].getNotes();
      expect(notes).toEqual(["G", "B", "D", "F"]);
      expect(vChord[0].toString()).toBe("G DOMINANT7");
    });
  });
});
