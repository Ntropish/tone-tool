const popularProgressions = {
  // Pop & Rock Progressions
  "Axis of Awesome": "I-V-vi-IV",
  "The 50s": "I-vi-IV-V",
  "Sensitive Female": "vi-IV-I-V",
  Wonderwall: "I-bVII-IV",
  "Andalusian Cadence": "i-bVII-bVI-V",
  // Foundational & Classical
  "I-IV-V": "I-IV-V",
  "Pachelbel's Canon": "I-V-vi-iii-IV-I-IV-V",
  "Authentic Cadence": "V-I",
  "Plagal Cadence": "IV-I",
  "Deceptive Cadence": "V-vi",
  // Jazz & Blues Standards
  "ii-V-I": "ii-V-I",
  "Rhythm Changes": "I-vi-ii-V",
  "Basic Blues": "I7-IV7-V7",
  "12-Bar Blues": "I7-I7-I7-I7-IV7-IV7-I7-I7-V7-IV7-I7-V7",
  "Minor ii-V-i": "iiø7-V7-i",
  "Minor Rock": "i-bVI-bIII-bVII"
};
const notes = {
  C: 1,
  "C#": 2,
  Db: 2,
  D: 4,
  "D#": 8,
  Eb: 8,
  E: 16,
  F: 32,
  "F#": 64,
  Gb: 64,
  G: 128,
  "G#": 256,
  Ab: 256,
  A: 512,
  "A#": 1024,
  Bb: 1024,
  B: 2048
};
const notesByNumber = {
  1: ["C"],
  2: ["C#", "Db"],
  4: ["D"],
  8: ["D#", "Eb"],
  16: ["E"],
  32: ["F"],
  64: ["F#", "Gb"],
  128: ["G"],
  256: ["G#", "Ab"],
  512: ["A"],
  1024: ["A#", "Bb"],
  2048: ["B"]
};
const chords = {
  // POWER & SUSPENDED --------------------------------------------------------
  POWER: 129,
  // 1-5
  SUS2: 133,
  // 1-2-5
  SUS4: 161,
  // 1-4-5
  // TRIADS -------------------------------------------------------------------
  MAJOR: 145,
  // 1-3-5
  MAJ: 145,
  MINOR: 137,
  // 1-♭3-5
  MIN: 137,
  DIMINISHED: 73,
  // 1-♭3-♭5
  DIM: 73,
  AUGMENTED: 273,
  // 1-3-#5
  AUG: 273,
  // ADDED-TONE (“add”) --------------------------------------------------------
  ADD2: 149,
  // major +2
  ADD4: 177,
  // major +4
  ADD9: 149,
  // alias of ADD2
  MAJOR_ADD9: 149,
  MINOR_ADD9: 141,
  // minor +9
  // SIXTHS -------------------------------------------------------------------
  MAJOR6: 657,
  // 1-3-5-6
  MAJOR6_ADD9: 661,
  // “6/9”
  MINOR6: 649,
  // 1-♭3-5-6
  // SEVENTHS -----------------------------------------------------------------
  DOMINANT7: 1169,
  // 7, 1-3-5-♭7
  SEVENTH: 1169,
  MAJOR7: 2193,
  // Δ, 1-3-5-7
  MAJ7: 2193,
  MINOR7: 1161,
  // m7, 1-♭3-5-♭7
  MIN7: 1161,
  MINOR_MAJOR7: 2185,
  // mΔ7
  MM7: 2185,
  DIMINISHED7: 585,
  // °7, 1-♭3-♭5-𝄫7
  DIM7: 585,
  HALF_DIMINISHED7: 1097,
  // ø, m7♭5
  MIN7_FLAT5: 1097,
  AUGMENTED7: 1297,
  // 7#5
  AUG7: 1297,
  AUGMENTED_MAJOR7: 2321,
  // Δ#5
  AUGMAJ7: 2321,
  SUS4_7: 1185,
  // 7sus4
  SUS2_7: 1157,
  // 7sus2
  // NINTHS -------------------------------------------------------------------
  DOMINANT9: 1173,
  // 9
  "9": 1173,
  MAJOR9: 2197,
  // Δ9
  MINOR9: 1165,
  // m9
  MIN9: 1165,
  MINOR_MAJOR9: 2189,
  // mΔ9
  DOMINANT7_FLAT9: 1171,
  // 7♭9
  "7B9": 1171,
  DOMINANT7_SHARP9: 1177,
  // 7#9
  "7SHARP9": 1177,
  // ELEVENTHS ----------------------------------------------------------------
  DOMINANT11: 1205,
  // 11  (7 + 9 + 11)
  11: 1205,
  MINOR11: 1197,
  // m11
  MAJOR11: 2229,
  // Δ11
  DOMINANT7_SHARP11: 1237,
  // 7#11
  // THIRTEENTHS --------------------------------------------------------------
  DOMINANT13: 1685,
  // 13  (7 + 9 + 13)
  13: 1685,
  MAJOR13: 2709,
  // Δ13
  MINOR13: 1677,
  // m13
  // ALTERED DOMINANT (jazz “alt”) -------------------------------------------
  ALT: 1499
  // 7 with ♭/♯5 and ♭/♯9 set
};
const scaleModes = {
  /* ─────────────────────────── DIATONIC (major-scale) ───────────────────────── */
  DIATONIC: {
    IONIAN: 2741,
    // 1-2-3-4-5-6-7   – Major scale
    MAJOR: 2741,
    DORIAN: 1709,
    // 1-2-♭3-4-5-6-♭7
    PHRYGIAN: 1451,
    // 1-♭2-♭3-4-5-♭6-♭7
    LYDIAN: 2773,
    // 1-2-3-#4-5-6-7
    MIXOLYDIAN: 1717,
    // 1-2-3-4-5-6-♭7
    AEOLIAN: 1453,
    // 1-2-♭3-4-5-♭6-♭7 – Natural minor
    NATURAL_MINOR: 1453,
    LOCRIAN: 1387
    // 1-♭2-♭3-4-♭5-♭6-♭7
  },
  /* ─────────────────────────── PENTATONIC (major set) ───────────────────────── */
  PENTATONIC: {
    MAJOR_PENTATONIC: 661,
    // 1-2-3-5-6   – Ionian/major penta
    IONIAN_PENTA: 661,
    EGYPTIAN: 1189,
    // 1-2-5-6-♭7  – Sometimes “sus”/“suspended” penta
    SUSPENDED_PENTA: 1189,
    MAN_GONG: 1321,
    // 1-♭3-4-♭6-♭7 – “Man Gong” / “blues ♭6” flavour
    RITUSEN: 677,
    // 1-2-5-6-7    – Japanese “ritusen” mode
    MINOR_PENTATONIC: 1193,
    // 1-♭3-4-5-♭7 – Common minor/blues penta
    AEOLIAN_PENTA: 1193
  },
  /* ─────────────────────────── MELODIC-MINOR family ───────────────────────── */
  MELODIC_MINOR: {
    MELODIC_MINOR_ASC: 2733,
    // 1-2-♭3-4-5-6-7
    DORIAN_FLAT2: 1707,
    // 1-♭2-♭3-4-5-6-♭7
    LYDIAN_AUG: 2901,
    // 1-2-3-#4-#5-6-7
    LYDIAN_DOM: 1749,
    // 1-2-3-#4-5-6-♭7
    MIXO_FLAT6: 1461,
    // 1-2-3-4-5-♭6-♭7
    LOCRIAN_SHARP2: 1389,
    // 1-2-♭3-4-♭5-♭6-♭7
    ALTERED: 1371
    // 1-♭2-♭3-♭4-♭5/#5-♭6-♭7 (Super-Locrian)
  },
  /* ─────────────────────────── HARMONIC-MAJOR family ──────────────────────── */
  HARMONIC_MAJOR: {
    HARMONIC_MAJOR: 2485,
    // 1-2-3-4-5-♭6-7
    DORIAN_FLAT5: 1643,
    // 1-2-♭3-4-♭5-6-♭7
    PHRYGIAN_FLAT4: 1435,
    // 1-♭2-♭3-♭4-5-♭6-♭7
    LYDIAN_FLAT3: 2765,
    // 1-2-♭3-#4-5-6-7
    MIXO_FLAT2: 1715,
    // 1-♭2-3-4-5-6-♭7
    LOCRIAN_SHARP2_SHARP5: 2861,
    // 1-2-♭3-4-#5-♭6-♭7
    ALTERED_DOM7_B13: 875
    // 1-♭2-♭3-♭4-♭5-♭6-𝄫7
  },
  /* ───────────────────── symmetrical / synthetic families ─────────────────── */
  WHOLE_TONE: {
    WHOLE_TONE: 1365
    // 1-2-3-#4-#5-♭7
  },
  DIMINISHED: {
    HALF_WHOLE: 1755,
    // 1-♭2-♯2-3-#4-5-6-♭7  (dominant ♭9 scale)
    WHOLE_HALF: 2925
    // 1-2-♭3-4-♭5-♯5-6-7  (diminished 7th scale)
  },
  AUGMENTED_HEX: {
    AUGMENTED: 2457
    // 1-♭3-3-5-#5-7  (symmetrical)
  },
  /* ─────────────────────────── BLUES / HEXATONIC ──────────────────────────── */
  BLUES: {
    MINOR_BLUES: 1257,
    // 1-♭3-4-♯4-5-♭7
    MAJOR_BLUES: 669
    // 1-2-♭3-3-5-6
  },
  /* ─────────────────────────── BEBOP (8-note) ─────────────────────────────── */
  BEBOP: {
    BEBOP_DOM: 3765,
    // Mixolydian + 7 (1-2-3-4-5-6-♭7-7)
    BEBOP_MAJ: 3765,
    // Ionian + ♭7  (same mask, alt name)
    BEBOP_DORIAN: 1725
    // Dorian + M3  (1-2-♭3-3-4-5-6-♭7)
  }
};
const modes = {
  ...scaleModes.DIATONIC,
  ...scaleModes.PENTATONIC,
  ...scaleModes.BLUES,
  ...scaleModes.MELODIC_MINOR,
  ...scaleModes.HARMONIC_MAJOR,
  ...scaleModes.WHOLE_TONE,
  ...scaleModes.DIMINISHED,
  ...scaleModes.AUGMENTED_HEX,
  ...scaleModes.BEBOP
};
class PitchClassSet {
  // not editable
  get Bitmask() {
    return this.bitmask;
  }
  constructor(bitmask) {
    this.bitmask = bitmask & 4095;
  }
  // to string
  toString() {
    return this.bitmask.toString(2).padStart(12, "0");
  }
  get [Symbol.toStringTag]() {
    return this.toString();
  }
  static fromChord(tonic, chord) {
    const tonicInterval = Math.log2(notes[tonic]);
    const chordMask = chords[chord];
    return new PitchClassSet(transpose(chordMask, tonicInterval));
  }
  static fromMode(tonic, mode) {
    const tonicInterval = Math.log2(notes[tonic]);
    const modeMask = modes[mode];
    return new PitchClassSet(transpose(modeMask, tonicInterval));
  }
  static fromNotes(noteNames) {
    const bitmask = noteNames.reduce((acc, note) => acc | notes[note], 0);
    return new PitchClassSet(bitmask);
  }
  getNotes() {
    const degrees = [];
    for (let i = 0; i < 12; i++) {
      if (this.bitmask & 1 << i) {
        const note = notesByNumber[1 << i][0];
        if (note) {
          degrees.push(note);
        }
      }
    }
    return degrees;
  }
  getDegree(degree) {
    const note = notesByNumber[1 << degree][0];
    if (note) {
      return note;
    }
    return null;
  }
  getDegrees() {
    const degrees = [];
    for (let i = 0; i < 12; i++) {
      if (this.bitmask & 1 << i) {
        degrees.push(i);
      }
    }
    return degrees;
  }
  transpose(interval) {
    return new PitchClassSet(transpose(this.bitmask, interval));
  }
}
function transpose(bitmask, interval) {
  const n = (interval % 12 + 12) % 12;
  if (n === 0) {
    return bitmask;
  }
  return (bitmask << n | bitmask >> 12 - n) & 4095;
}
class Scale {
  // public mode: ModeName;
  constructor(tonic, pcs) {
    this.tonic = tonic;
    this.pcs = pcs;
  }
  static build(tonic, mode) {
    const pcs = PitchClassSet.fromMode(tonic, mode);
    return new Scale(tonic, pcs);
  }
  getNotes() {
    const allNotes = this.pcs.getNotes();
    const tonicBit = notes[this.tonic];
    const tonicIndex = allNotes.findIndex((note) => notes[note] === tonicBit);
    if (tonicIndex === -1) {
      return allNotes;
    }
    return [...allNotes.slice(tonicIndex), ...allNotes.slice(0, tonicIndex)];
  }
  transpose(interval) {
    const currentTonicIndex = Math.log2(notes[this.tonic]);
    const newTonicIndex = (currentTonicIndex + interval % 12 + 12) % 12;
    const newTonicBit = 1 << newTonicIndex;
    const newTonicName = notesByNumber[newTonicBit][0];
    return new Scale(newTonicName, this.pcs.transpose(interval));
  }
  getChords(config) {
    const matchingChords = [];
    const scaleMask = this.pcs.Bitmask;
    const qualitiesIn = config?.where?.quality;
    const qualitiesToTest = qualitiesIn ? Array.isArray(qualitiesIn) ? qualitiesIn : [qualitiesIn] : Object.keys(chords);
    const notesIn = config?.where?.note;
    const tonicsToTest = notesIn ? Array.isArray(notesIn) ? notesIn : [notesIn] : this.getNotes();
    for (const quality of qualitiesToTest) {
      for (const tonic of tonicsToTest) {
        if (!this.getNotes().includes(tonic)) continue;
        const chordPcs = PitchClassSet.fromChord(tonic, quality);
        const chordMask = chordPcs.Bitmask;
        if ((scaleMask & chordMask) === chordMask) {
          matchingChords.push(Chord.build(tonic, quality));
        }
      }
    }
    return matchingChords;
  }
  getNames() {
    const names = /* @__PURE__ */ new Set();
    const thisMask = this.pcs.Bitmask;
    for (const tonicName of Object.keys(notes)) {
      const tonicInterval = Math.log2(notes[tonicName]);
      for (const modeName of Object.keys(modes)) {
        const modeMask = modes[modeName];
        const newPcs = new PitchClassSet(modeMask).transpose(tonicInterval);
        if (newPcs.Bitmask === thisMask) {
          names.add(`${tonicName} ${modeName}`);
        }
      }
    }
    return Array.from(names);
  }
  toString() {
    return `${this.tonic} ${this.pcs.toString()}`;
  }
}
class Chord {
  constructor(tonic, pcs) {
    this.tonic = tonic;
    this.pcs = pcs;
  }
  static build(tonic, shape) {
    const pcs = PitchClassSet.fromChord(tonic, shape);
    return new Chord(tonic, pcs);
  }
  getNotes() {
    const allNotes = this.pcs.getNotes();
    const tonicIndex = allNotes.findIndex((note) => note === this.tonic);
    if (tonicIndex === -1) {
      return allNotes;
    }
    return [...allNotes.slice(tonicIndex), ...allNotes.slice(0, tonicIndex)];
  }
  transpose(interval) {
    const currentTonicIndex = Math.log2(notes[this.tonic]);
    const newTonicIndex = (currentTonicIndex + interval % 12 + 12) % 12;
    const newTonicBit = 1 << newTonicIndex;
    const newTonicName = notesByNumber[newTonicBit][0];
    return new Chord(newTonicName, this.pcs.transpose(interval));
  }
  getScales(config) {
    const matchingScales = [];
    const chordMask = this.pcs.Bitmask;
    const modesIn = config?.where?.mode;
    const modesToTest = modesIn ? Array.isArray(modesIn) ? modesIn : [modesIn] : Object.keys(modes);
    const tonicsIn = config?.where?.tonic;
    const tonicsToTest = tonicsIn ? Array.isArray(tonicsIn) ? tonicsIn : [tonicsIn] : Object.keys(notes);
    for (const mode of modesToTest) {
      for (const tonic of tonicsToTest) {
        const scalePcs = PitchClassSet.fromMode(tonic, mode);
        const scaleMask = scalePcs.Bitmask;
        if ((scaleMask & chordMask) === chordMask) {
          matchingScales.push(Scale.build(tonic, mode));
        }
      }
    }
    return matchingScales;
  }
  getQualities() {
    const allQualities = Object.keys(chords);
    const chordMask = this.pcs.Bitmask;
    return allQualities.filter(
      (quality) => (chords[quality] & chordMask) === chordMask
    );
  }
  toString() {
    return this.getNames()[0];
  }
  get [Symbol.toStringTag]() {
    return this.toString();
  }
  getNames() {
    const names = /* @__PURE__ */ new Set();
    const thisMask = this.pcs.Bitmask;
    for (const tonicName of Object.keys(notes)) {
      const tonicInterval = Math.log2(notes[tonicName]);
      for (const qualityName of Object.keys(chords)) {
        const qualityMask = chords[qualityName];
        const newPcs = new PitchClassSet(qualityMask).transpose(tonicInterval);
        if (newPcs.Bitmask === thisMask) {
          names.add(`${tonicName} ${qualityName}`);
        }
      }
    }
    return Array.from(names);
  }
}
const numeralMap = {
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
  iiø7: { degree: 2, quality: "HALF_DIMINISHED7" },
  // For minor keys
  // Common alterations
  i: { degree: 1, quality: "MINOR" },
  bIII: { degree: 3, quality: "MAJOR" },
  // Borrowed from parallel minor
  bVI: { degree: 6, quality: "MAJOR" },
  // Borrowed from parallel minor
  bVII: { degree: 7, quality: "MAJOR" },
  // Borrowed from parallel minor
  I7: { degree: 1, quality: "DOMINANT7" },
  // Blues
  IV7: { degree: 4, quality: "DOMINANT7" }
  // Blues
};
function fromRoman(numeral, scale) {
  const mapping = numeralMap[numeral];
  if (!mapping) {
    throw new Error(`Unknown Roman numeral: ${numeral}`);
  }
  const tonicNote = scale.getNotes()[mapping.degree - 1];
  const isBorrowed = numeral.startsWith("b");
  const finalTonic = isBorrowed ? Object.keys(notes).find(
    (n) => notes[n] === notes[tonicNote] - 1
  ) : tonicNote;
  const quality = mapping.quality;
  return new Chord(finalTonic, quality);
}
class ChordProgression {
  constructor(scale, chords2) {
    this.scale = scale;
    this.chords = chords2;
  }
  static fromRoman(scale, numerals) {
    const numeralArray = numerals.split("-");
    const chords2 = numeralArray.map((numeral) => {
      if (numeral === "?") {
        return null;
      }
      return fromRoman(numeral, scale);
    });
    return new ChordProgression(scale, chords2);
  }
  static fromBuiltIn(scale, name) {
    const numeralPattern = popularProgressions[name];
    return ChordProgression.fromRoman(scale, numeralPattern);
  }
  generatePossibilities(options = {}) {
    const { exactLength = true } = options;
    const possibilities = [];
    const currentProgressionStrings = this.chords.map(
      (chord) => chord ? chord.toString() : null
    );
    for (const key in popularProgressions) {
      const popularProgressionName = key;
      const popularProgressionNumerals = popularProgressions[popularProgressionName].split("-");
      if (exactLength && popularProgressionNumerals.length !== currentProgressionStrings.length) {
        continue;
      }
      const popularProgressionChords = popularProgressionNumerals.map(
        (numeral) => fromRoman(numeral, this.scale)
      );
      const popularProgressionStrings = popularProgressionChords.map(
        (chord) => chord.toString()
      );
      let isMatch = true;
      for (let i = 0; i < currentProgressionStrings.length; i++) {
        const currentChord = currentProgressionStrings[i];
        if (currentChord !== null) {
          if (i >= popularProgressionStrings.length || currentChord !== popularProgressionStrings[i]) {
            isMatch = false;
            break;
          }
        }
      }
      if (isMatch) {
        possibilities.push(
          new ChordProgression(this.scale, popularProgressionChords)
        );
      }
    }
    return possibilities;
  }
  toStrings() {
    return this.chords.map((chord) => chord?.toString() || "null");
  }
}
const intervals = {
  PERFECT_UNISON: 0,
  MINOR_SECOND: 1,
  MAJOR_SECOND: 2,
  MINOR_THIRD: 3,
  MAJOR_THIRD: 4,
  PERFECT_FOURTH: 5,
  TRITONE: 6,
  AUGMENTED_FOURTH: 6,
  DIMINISHED_FIFTH: 6,
  PERFECT_FIFTH: 7,
  MINOR_SIXTH: 8,
  MAJOR_SIXTH: 9,
  MINOR_SEVENTH: 10,
  MAJOR_SEVENTH: 11,
  PERFECT_OCTAVE: 12
};
export {
  Chord,
  ChordProgression,
  PitchClassSet,
  Scale,
  chords,
  fromRoman,
  intervals,
  modes,
  notes,
  notesByNumber,
  popularProgressions,
  scaleModes
};
