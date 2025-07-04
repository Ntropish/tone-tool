# Pitch Class Sets (PCS)

A Pitch Class Set (PCS) is a fundamental concept in `tone-tool`. It represents a collection of pitch classes (e.g., C, D, E) without a specific octave or order. In this library, a PCS is represented by a 12-bit integer (a "bitmask"), where each bit corresponds to one of the 12 chromatic pitches.

While you can create a `PitchClassSet` instance directly, you will more commonly interact with them through `Scale` and `Chord` objects, which are built upon `PitchClassSet`.

## How it Works

The 12 bits of the bitmask correspond to the 12 pitch classes, starting from C:

| Bit  | 11  | 10  | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Note | B   | A#  | A   | G#  | G   | F#  | F   | E   | D#  | D   | C#  | C   |

If a bit is `1`, the corresponding pitch class is in the set.

For example, a C Major chord consists of the notes C, E, and G. Its bitmask would be:

- **C**: `000000000001` (bit 0)
- **E**: `000000010000` (bit 4)
- **G**: `000100000000` (bit 7)

Combining these gives the bitmask `000100010001` (binary) or `1105` (decimal).

## Creating a PitchClassSet

You can create a `PitchClassSet` from a collection of notes, a known chord, or a known scale (mode).

### From Notes

```typescript
import { PitchClassSet } from "tone-tool";

const mySet = PitchClassSet.fromNotes(["C", "F#", "A"]);
console.log(mySet.toString()); // "001001000001"
```

### From a Chord or Scale

```typescript
import { PitchClassSet } from "tone-tool";

// From a C Major chord
const fromChord = PitchClassSet.fromChord("C", "MAJOR");
console.log(fromChord.toString()); // "000100010001"

// From a D Dorian scale
const fromScale = PitchClassSet.fromMode("D", "DORIAN");
console.log(fromScale.toString()); // "010101101010"
```

## API

The `PitchClassSet` class provides methods to get the notes in the set and to transpose it.

- `getNotes()`: Returns an array of `NoteName` strings in the set.
- `transpose(interval: number)`: Returns a _new_ `PitchClassSet` transposed by the given number of semitones.
