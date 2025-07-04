# Roman Numeral Notation

Roman numeral analysis is a powerful way to describe chord progressions independent of a key. `tone-tool` uses a string-based notation for Roman numerals that is parsed in the context of a `Scale`.

## How it Works

The `fromRoman(numeral, scale)` function (used internally by `ChordProgression`) interprets a numeral string and returns the corresponding `Chord`. The numeral specifies the scale degree and the quality of the chord.

- **Case**: Uppercase numerals (e.g., `I`, `IV`, `V`) typically denote major chords, while lowercase numerals (e.g., `ii`, `iii`, `vi`) denote minor chords.
- **Symbols**: Special symbols are used for diminished (`º`) and half-diminished (`ø`) chords.
- **Alterations**: Prefixes like `b` (flat) can indicate borrowed chords.
- **Extensions**: Numbers like `7` are appended for seventh chords.

## Syntax Reference

Here is a reference for the supported Roman numeral syntax in `tone-tool`.

### Diatonic Triads (in Major)

| Numeral | Chord Quality | Example in C Major |
| ------- | ------------- | ------------------ |
| `I`     | Major         | C Major            |
| `ii`    | Minor         | D Minor            |
| `iii`   | Minor         | E Minor            |
| `IV`    | Major         | F Major            |
| `V`     | Major         | G Major            |
| `vi`    | Minor         | A Minor            |
| `viiº`  | Diminished    | B Diminished       |

### Diatonic Seventh Chords (in Major)

| Numeral  | Chord Quality       | Example in C Major    |
| -------- | ------------------- | --------------------- |
| `Imaj7`  | Major 7th           | C Major 7th           |
| `ii7`    | Minor 7th           | D Minor 7th           |
| `iii7`   | Minor 7th           | E Minor 7th           |
| `IVmaj7` | Major 7th           | F Major 7th           |
| `V7`     | Dominant 7th        | G Dominant 7th        |
| `vi7`    | Minor 7th           | A Minor 7th           |
| `viiø7`  | Half-Diminished 7th | B Half-Diminished 7th |

### Common Alterations & Borrowed Chords

The notation also supports common alterations, which are crucial for describing progressions in minor keys or those that borrow from other modes.

| Numeral | Typical Origin | Example in C Major    |
| ------- | -------------- | --------------------- |
| `i`     | Parallel Minor | C Minor               |
| `bIII`  | Parallel Minor | Eb Major              |
| `bVI`   | Parallel Minor | Ab Major              |
| `bVII`  | Parallel Minor | Bb Major              |
| `I7`    | Blues          | C Dominant 7th        |
| `IV7`   | Blues          | F Dominant 7th        |
| `iiø7`  | Parallel Minor | D Half-Diminished 7th |

## Usage Example

You will typically use these numerals in a dash-separated string when creating a `ChordProgression`.

```typescript
import { ChordProgression, Scale } from "tone-tool";

const scale = Scale.build("A", "NATURAL_MINOR");

// A common minor key progression: i - bVI - bIII - bVII
const progression = ChordProgression.fromRoman(scale, "i-bVI-bIII-bVII");

console.log(progression.toStrings());
// -> ['A MINOR', 'F MAJOR', 'C MAJOR', 'G MAJOR']
```
