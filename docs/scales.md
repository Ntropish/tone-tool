# Scales

The `Scale` class represents a musical scale, which is defined by a tonic note and a set of intervals (a `PitchClassSet`). It provides utilities for transposition, finding included chords, and identifying its own names and modes.

## Creating a Scale

The primary way to create a `Scale` is by using the static `build` method, providing a `tonic` and a `mode` name.

```typescript
import { Scale } from "tone-tool";

// Create a C Major scale
const cMajor = Scale.build("C", "MAJOR");

// Create an A Minor Pentatonic scale
const aMinorPentatonic = Scale.build("A", "MINOR_PENTATONIC");
```

### Available Scales

The library includes a comprehensive list of scales and modes, from common diatonic and pentatonic scales to more exotic ones like Bebop and Harmonic Major modes.

You can find all available `ModeName` types by inspecting the `modes` export, but here are a few common examples:

- `MAJOR` (or `IONIAN`)
- `NATURAL_MINOR` (or `AEOLIAN`)
- `DORIAN`, `PHRYGIAN`, `LYDIAN`, `MIXOLYDIAN`, `LOCRIAN`
- `MAJOR_PENTATONIC`, `MINOR_PENTATONIC`
- `MELODIC_MINOR_ASC`
- `HARMONIC_MAJOR`
- `WHOLE_TONE`

## Scale API

### Getting Notes

The `getNotes()` method returns an array of the note names in the scale, ordered starting from the tonic.

```typescript
const cMajor = Scale.build("C", "MAJOR");
console.log(cMajor.getNotes());
// -> ['C', 'D', 'E', 'F', 'G', 'A', 'B']
```

### Transposing Scales

The `transpose(interval)` method returns a new `Scale` instance transposed up or down by a given number of semitones.

```typescript
const cMajor = Scale.build("C", "MAJOR");
const dMajor = cMajor.transpose(2); // Transpose up a major second (2 semitones)

console.log(dMajor.tonic); // -> 'D'
console.log(dMajor.getNotes()); // -> ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']
```

### Finding Chords Within a Scale

The `getChords()` method is a powerful utility that finds all chords of a specified quality and/or tonic that fit within the scale.

```typescript
const aMinor = Scale.build("A", "NATURAL_MINOR");

// Find all minor chords in A Natural Minor
const minorChords = aMinor.getChords({ where: { quality: "MINOR" } });
console.log(minorChords.map((c) => c.toString()));
// -> ['A MINOR', 'D MINOR', 'E MINOR']

// Find the dominant (V) chord
const dominantChord = aMinor.getChords({
  where: { note: "E", quality: "MAJOR" },
});
console.log(dominantChord[0].toString());
// -> 'E MAJOR' (Note: In natural minor, the V is minor. To get a major V, you'd use Harmonic Minor)
```

### Identifying a Scale

You can get all possible names for a scale, including its modes, using `getNames()`.

```typescript
const gMajor = Scale.build("G", "MAJOR");
console.log(gMajor.getNames());
// -> ['G MAJOR', 'G IONIAN']
```
