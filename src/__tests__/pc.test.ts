import { describe, expect, it } from "vitest";
import { PitchClassSet } from "../index";

describe("PitchClassSet", () => {
  it("should create a pitch class set from a chord", () => {
    const pcSet = PitchClassSet.fromChord("C", "MAJOR");
    expect(pcSet.toString()).toEqual("000010010001");
    expect(pcSet.getNotes()).toEqual(["C", "E", "G"]);
  });

  it("should create a pitch class set from a mode and transpose it a fourth up", () => {
    const pcSet = PitchClassSet.fromMode("C", "IONIAN");
    expect(pcSet.toString(), "original bitmask").toEqual("101010110101");
    expect(pcSet.getNotes(), "original notes").toEqual([
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "B",
    ]);
    const pcSet2 = pcSet.transpose(5);
    expect(pcSet2.toString(), "transposed bitmask").toEqual("011010110101");
    expect(pcSet2.getNotes(), "transposed notes").toEqual([
      "C",
      "D",
      "E",
      "F",
      "G",
      "A",
      "A#",
    ]);
  });

  it("should transpose a C major chord up a perfect fifth to G major", () => {
    const pcSet = PitchClassSet.fromChord("C", "MAJOR").transpose(7);
    expect(pcSet.toString()).toEqual("100010000100");
    expect(pcSet.getNotes()).toEqual(["D", "G", "B"]);
  });

  it("should transpose an A minor chord down a major third to F minor", () => {
    const pcSet = PitchClassSet.fromChord("A", "MINOR").transpose(-4);
    expect(pcSet.toString()).toEqual("000100100001");
    expect(pcSet.getNotes()).toEqual(["C", "F", "G#"]);
  });

  it("should transpose an E diminished chord up a tritone to Bb diminished", () => {
    const pcSet = PitchClassSet.fromChord("E", "DIMINISHED").transpose(6);
    expect(pcSet.toString()).toEqual("010000010010");
    expect(pcSet.getNotes()).toEqual(["C#", "E", "A#"]);
  });

  it("should transpose a D major 7th chord down a minor second to C# major 7th", () => {
    const pcSet = PitchClassSet.fromChord("D", "MAJOR7").transpose(-1);
    expect(pcSet.toString()).toEqual("000100100011");
    expect(pcSet.getNotes()).toEqual(["C", "C#", "F", "G#"]);
  });

  it("should transpose a G dominant 7th chord up a major second to A dominant 7th", () => {
    const pcSet = PitchClassSet.fromChord("G", "DOMINANT7").transpose(2);
    expect(pcSet.toString()).toEqual("001010010010");
    expect(pcSet.getNotes()).toEqual(["C#", "E", "G", "A"]);
  });
});
