# Chord Progressions

A `ChordProgression` is a sequence of chords within a specific `Scale`. This class provides a powerful way to work with common progressions, analyze them, and even generate possibilities for incomplete progressions.

## Creating a Chord Progression

There are two main ways to create a `ChordProgression`: from a Roman numeral string or by using a built-in named progression.

### From Roman Numerals

The `fromRoman` static method parses a dash-separated string of Roman numerals in the context of a given `Scale`.

```typescript
import { ChordProgression, Scale } from "tone-tool";

const cMajorScale = Scale.build("C", "MAJOR");
const progression = ChordProgression.fromRoman(cMajorScale, "I-V-vi-IV");

console.log(progression.toStrings());
// -> ['C MAJOR', 'G MAJOR', 'A MINOR', 'F MAJOR']
```

### From a Built-in Progression

The `fromBuiltIn` static method creates a progression from a list of well-known examples.

```typescript
import { ChordProgression, Scale } from "tone-tool";

const cMajorScale = Scale.build("C", "MAJOR");
const pachelbel = ChordProgression.fromBuiltIn(
  cMajorScale,
  "Pachelbel's Canon"
);

console.log(pachelbel.toStrings().join(" -> "));
// -> C MAJOR -> G MAJOR -> A MINOR -> E MINOR -> F MAJOR -> C MAJOR -> F MAJOR -> G MAJOR
```

### Available Built-in Progressions

- **Pop/Rock**: "Axis of Awesome", "The 50s", "Sensitive Female"
- **Classical**: "Pachelbel's Canon", "Andalusian Cadence"
- **Cadences**: "Authentic Cadence", "Plagal Cadence", "Deceptive Cadence"
- **Jazz/Blues**: "ii-V-I", "Rhythm Changes", "12-Bar Blues", "Minor ii-V-i"

## Generating Possibilities

One of the most powerful features of `ChordProgression` is its ability to suggest completions for a partial progression. Use a `?` as a placeholder for an unknown chord in the Roman numeral string, and the `generatePossibilities` method will search the built-in progressions for matches.

```typescript
import { ChordProgression, Scale } from "tone-tool";

const cMajorScale = Scale.build("C", "MAJOR");

// What chord commonly comes between ii and I in C Major?
const progression = ChordProgression.fromRoman(cMajorScale, "ii-?-I");
const possibilities = progression.generatePossibilities();

// It finds the 'ii-V-I' progression
console.log(possibilities[0].toStrings());
// -> ['D MINOR', 'G MAJOR', 'C MAJOR']
```

This is useful for songwriting, analysis, or educational tools where you might want to find common resolutions or variations.
