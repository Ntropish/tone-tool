# Tone-Tool: A Modern Music Theory Library for TypeScript

A powerful, intuitive, and type-safe library for composing, analyzing, and manipulating musical structures like chords and scales. Designed with a musician-first API.

## Features

- **Intuitive API**: Work with musical concepts directly, like `new Chord("C", "MAJOR")`.
- **Type-Safe**: Fully written in TypeScript to catch errors at compile time.
- **Powerful Data Structures**: Robust classes for `PitchClassSet`, `Chord`, and `Scale`.
- **Advanced Functionality**: Transpose, get notes, and find all possible names for any chord or scale.
- **Relational Methods**: Intelligently discover the relationships between chords and scales (e.g., find all chords in a scale, or all scales that fit a chord).
- **Comprehensive Test Suite**: A full suite of tests ensures reliability and correctness.

## Installation

```bash
npm install tone-tool
# or
pnpm add tone-tool
```

## Usage

### Chords

Creating and working with chords is simple and intuitive.

```typescript
import { Chord, intervals } from "tone-tool";

// Create a new C Major chord
const cMajor = new Chord("C", "MAJOR");

// Access properties
console.log(cMajor.tonic); // "C"
console.log(cMajor.quality); // "MAJOR"
console.log(cMajor.pcs.toString()); // "000010010001"

// Get the notes in the chord, ordered from the tonic
console.log(cMajor.getNotes()); // ["C", "E", "G"]

// Transpose up a perfect fifth
const gMajor = cMajor.transpose(intervals.PERFECT_FIFTH);
console.log(gMajor.toString()); // "G MAJOR"
console.log(gMajor.getNotes()); // ["G", "B", "D"]

// For more readable transpositions, you can use the `intervals` map
const aMajor = gMajor.transpose(intervals.MAJOR_SECOND);
console.log(aMajor.toString()); // "A MAJOR"

// Find all possible names for a chord, including enharmonic equivalents
const dbMajor = new Chord("Db", "MAJOR");
console.log(dbMajor.getNames());
// [ "Db MAJOR", "C# MAJOR", "Db MAJ", "C# MAJ" ]
```

### Scales

Scales follow a similar, easy-to-use API.

```typescript
import { Scale } from "tone-tool";

// Create a new C Ionian (Major) scale
const cMajorScale = new Scale("C", "IONIAN");

// Access properties
console.log(cMajorScale.tonic); // "C"
console.log(cMajorScale.mode); // "IONIAN"

// Get the notes in the scale, ordered from the tonic
console.log(cMajorScale.getNotes());
// ["C", "D", "E", "F", "G", "A", "B"]

// Transpose down a minor third (3 semitones)
const aNaturalMinor = cMajorScale.transpose(-3);
console.log(aNaturalMinor.toString()); // "A NATURAL_MINOR" (or AEOLIAN)
console.log(aNaturalMinor.getNotes());
// ["A", "B", "C", "D", "E", "F", "G"]
```

### Discovering Relationships

The real power of Tone-Tool comes from its ability to discover the relationships between chords and scales.

#### Finding Chords in a Scale

The `getChords()` method finds all chords that fit within a scale. It can be filtered to find specific chords.

```typescript
const cMajorScale = new Scale("C", "MAJOR");

// Find all the diatonic triads in C Major
const diatonicTriads = cMajorScale.getChords({
  where: { quality: ["MAJOR", "MINOR", "DIMINISHED"] },
});

console.log(diatonicTriads.map((c) => c.toString()));
// [ "C MAJOR", "D MINOR", "E MINOR", "F MAJOR", "G MAJOR", "A MINOR", "B DIMINISHED" ]

// Find only the V chord (G Dominant 7th)
const vChord = cMajorScale.getChords({
  where: { note: "G", quality: "DOMINANT7" },
});
console.log(vChord[0].toString()); // "G DOMINANT7"
```

#### Finding Scales for a Chord

The `getScales()` method finds all scales that contain a specific chord, perfect for analysis or finding soloing options.

```typescript
const gMajor = new Chord("G", "MAJOR");

// Find all Lydian modes that contain a G Major triad
const lydianModes = gMajor.getScales({
  where: { mode: "LYDIAN" },
});

console.log(lydianModes.map((s) => s.toString()));
// [ "G LYDIAN", "F LYDIAN", "C LYDIAN" ]
```

### Low-Level: PitchClassSet

For advanced use cases, you can work directly with the underlying `PitchClassSet`, which uses a 12-bit integer as a bitmask to represent the 12 notes of the chromatic scale.

```typescript
import { PitchClassSet } from "tone-tool";

// C Major triad (notes C, E, G are the 1st, 5th, and 8th bits)
const cMajorMask = 0b000010010001;
const pcs = new PitchClassSet(cMajorMask);

console.log(pcs.getNotes()); // ["C", "E", "G"]

const transposedPcs = pcs.transpose(2); // Transpose up a major second
console.log(transposedPcs.getNotes()); // ["D", "F#", "A"]
```

## License

This project is licensed under the ISC License.
