# Chords

The `Chord` class represents a musical chord, which is a combination of three or more notes played simultaneously. Like a `Scale`, a `Chord` is defined by a `tonic` note and a `PitchClassSet` that describes its quality (e.g., major, minor, dominant 7th).

## Creating a Chord

You can create a `Chord` using the static `build` method, which takes a `tonic` and a `ChordName`.

```typescript
import { Chord } from "tone-tool";

// Create a C Major chord
const cMajor = Chord.build("C", "MAJOR");

// Create a G Dominant 7th chord
const g7 = Chord.build("G", "DOMINANT7");
```

### Available Chord Qualities

The library includes a wide variety of chord qualities, from basic triads to complex jazz chords. You can find all available `ChordName` types by inspecting the `chords` export.

Here are some common examples:

- `MAJOR` (or `MAJ`)
- `MINOR` (or `MIN`)
- `DIMINISHED` (or `DIM`)
- `AUGMENTED` (or `AUG`)
- `MAJOR7` (or `MAJ7`)
- `MINOR7` (or `MIN7`)
- `DOMINANT7`

## Chord API

### Getting Notes

The `getNotes()` method returns an array of the note names in the chord, ordered starting from the tonic.

```typescript
const g7 = Chord.build("G", "DOMINANT7");
console.log(g7.getNotes());
// -> ['G', 'B', 'D', 'F']
```

### Transposing Chords

The `transpose(interval)` method returns a new `Chord` instance transposed by a given number of semitones.

```typescript
const cMinor7 = Chord.build("C", "MINOR7");
const fMinor7 = cMinor7.transpose(5); // Transpose up a perfect fourth (5 semitones)

console.log(fMinor7.toString()); // -> 'F MINOR7'
console.log(fMinor7.getNotes()); // -> ['F', 'G#', 'C', 'D#']
```

### Finding Matching Scales

The `getScales()` method is the inverse of `Scale.getChords()`. It finds all scales that contain the given chord. You can filter the search by tonic or mode.

```typescript
const cMajor = Chord.build("C", "MAJOR");

// Find all scales containing a C Major triad
const allScales = cMajor.getScales();
console.log(allScales.map((s) => s.toString()).slice(0, 3));
// -> ['C IONIAN', 'C LYDIAN', 'C MIXOLYDIAN', ...] (and many more)

// Find only Lydian modes that contain a G Major chord
const gMajor = Chord.build("G", "MAJOR");
const lydianModes = gMajor.getScales({ where: { mode: "LYDIAN" } });
console.log(lydianModes.map((s) => s.toString()));
// -> ['G LYDIAN', 'D LYDIAN', 'C LYDIAN']
```

### Identifying a Chord

You can get all possible names for a chord using `getNames()`. This is useful for chords that have enharmonic equivalents or multiple common names.

```typescript
const cSharpMajor = Chord.build("C#", "MAJOR");
console.log(cSharpMajor.getNames());
// -> ['C# MAJOR', 'C# MAJ']
```
