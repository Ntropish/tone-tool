# Tone Tool

A simple, powerful, and type-safe music theory library for TypeScript projects.

`tone-tool` provides a set of classes and utilities to work with fundamental musical concepts like scales, chords, and chord progressions.

## Installation

```bash
npm install tone-tool
```

## Getting Started

Here are some basic examples of how to use `tone-tool`.

### Scales

Find all the diatonic chords in a scale.

```typescript
import { Scale } from "tone-tool";

const cMajorScale = new Scale("C", "major");
const chords = cMajorScale.getChords();
// -> [C, Dm, Em, F, G, Am, Bdim]
```

### Chords

Find all the scales that a chord can belong to.

```typescript
import { Chord } from "tone-tool";

const cMajorChord = new Chord("C", "major");
const scales = cMajorChord.getScales();
// -> [C Major, G Mixolydian, F Lydian, ...]
```

### Chord Progressions

Provide a progression with a missing chord (using '?') and get possible suggestions.

```typescript
import { ChordProgression } from "tone-tool";

const progression = new ChordProgression("I-?-vi-IV", "C", "major");
const possibilities = progression.generatePossibilities();
// -> Finds the "Axis of Awesome" progression: [C, G, Am, F]
```

## Documentation

For more detailed information and API documentation, please see the [docs](./docs/index.md) folder.
