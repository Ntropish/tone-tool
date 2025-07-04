import { Chord } from "./Chord";
import { ChordName } from "./chords";
import { NoteName, notes } from "./notes";
import { Scale } from "./Scale";

const numeralMap: Record<string, { degree: number; quality: ChordName }> = {
  // Major
  I: { degree: 1, quality: "MAJOR" },
  ii: { degree: 2, quality: "MINOR" },
  iii: { degree: 3, quality: "MINOR" },
  IV: { degree: 4, quality: "MAJOR" },
  V: { degree: 5, quality: "MAJOR" },
  vi: { degree: 6, quality: "MINOR" },
  viiº: { degree: 7, quality: "DIMINISHED" },

  // Seventh Chords
  Imaj7: { degree: 1, quality: "MAJOR7" },
  ii7: { degree: 2, quality: "MINOR7" },
  iii7: { degree: 3, quality: "MINOR7" },
  IVmaj7: { degree: 4, quality: "MAJOR7" },
  V7: { degree: 5, quality: "DOMINANT7" },
  vi7: { degree: 6, quality: "MINOR7" },
  viiø7: { degree: 7, quality: "HALF_DIMINISHED7" },
  iiø7: { degree: 2, quality: "HALF_DIMINISHED7" }, // For minor keys

  // Common alterations
  i: { degree: 1, quality: "MINOR" },
  bIII: { degree: 3, quality: "MAJOR" }, // Borrowed from parallel minor
  bVI: { degree: 6, quality: "MAJOR" }, // Borrowed from parallel minor
  bVII: { degree: 7, quality: "MAJOR" }, // Borrowed from parallel minor
  I7: { degree: 1, quality: "DOMINANT7" }, // Blues
  IV7: { degree: 4, quality: "DOMINANT7" }, // Blues
};

export function fromRoman(numeral: string, scale: Scale): Chord {
  const mapping = numeralMap[numeral];
  if (!mapping) {
    throw new Error(`Unknown Roman numeral: ${numeral}`);
  }

  // Get the note from the scale degree
  const tonicNote = scale.getNotes()[mapping.degree - 1];

  // Adjust for borrowed chords (e.g. bVII in a major key)
  const isBorrowed = numeral.startsWith("b");
  const finalTonic = isBorrowed
    ? (Object.keys(notes).find(
        (n) => notes[n as NoteName] === notes[tonicNote] - 1
      ) as NoteName)
    : tonicNote;

  const quality = mapping.quality;

  return Chord.build(finalTonic, quality);
}
