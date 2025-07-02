export const scaleModes = {
  /* ─────────────────────────── DIATONIC (major-scale) ───────────────────────── */
  DIATONIC: {
    IONIAN: 0b101010110101, // 1-2-3-4-5-6-7   – Major scale
    MAJOR: 0b101010110101,

    DORIAN: 0b011010101101, // 1-2-♭3-4-5-6-♭7

    PHRYGIAN: 0b010110101011, // 1-♭2-♭3-4-5-♭6-♭7

    LYDIAN: 0b101011010101, // 1-2-3-#4-5-6-7

    MIXOLYDIAN: 0b011010110101, // 1-2-3-4-5-6-♭7

    AEOLIAN: 0b010110101101, // 1-2-♭3-4-5-♭6-♭7 – Natural minor
    NATURAL_MINOR: 0b010110101101,

    LOCRIAN: 0b010101101011, // 1-♭2-♭3-4-♭5-♭6-♭7
  },

  /* ─────────────────────────── PENTATONIC (major set) ───────────────────────── */
  PENTATONIC: {
    MAJOR_PENTATONIC: 0b001010010101, // 1-2-3-5-6   – Ionian/major penta
    IONIAN_PENTA: 0b001010010101,

    EGYPTIAN: 0b010010100101, // 1-2-5-6-♭7  – Sometimes “sus”/“suspended” penta
    SUSPENDED_PENTA: 0b010010100101,

    MAN_GONG: 0b010100101001, // 1-♭3-4-♭6-♭7 – “Man Gong” / “blues ♭6” flavour

    RITUSEN: 0b001010100101, // 1-2-5-6-7    – Japanese “ritusen” mode

    MINOR_PENTATONIC: 0b010010101001, // 1-♭3-4-5-♭7 – Common minor/blues penta
    AEOLIAN_PENTA: 0b010010101001,
  },

  /* ─────────────────────────── MELODIC-MINOR family ───────────────────────── */
  MELODIC_MINOR: {
    MELODIC_MINOR_ASC: 0b101010101101, // 1-2-♭3-4-5-6-7
    DORIAN_FLAT2: 0b011010101011, // 1-♭2-♭3-4-5-6-♭7
    LYDIAN_AUG: 0b101101010101, // 1-2-3-#4-#5-6-7
    LYDIAN_DOM: 0b011011010101, // 1-2-3-#4-5-6-♭7
    MIXO_FLAT6: 0b010110110101, // 1-2-3-4-5-♭6-♭7
    LOCRIAN_SHARP2: 0b010101101101, // 1-2-♭3-4-♭5-♭6-♭7
    ALTERED: 0b010101011011, // 1-♭2-♭3-♭4-♭5/#5-♭6-♭7 (Super-Locrian)
  },

  /* ─────────────────────────── HARMONIC-MAJOR family ──────────────────────── */
  HARMONIC_MAJOR: {
    HARMONIC_MAJOR: 0b100110110101, // 1-2-3-4-5-♭6-7
    DORIAN_FLAT5: 0b011001101011, // 1-2-♭3-4-♭5-6-♭7
    PHRYGIAN_FLAT4: 0b010110011011, // 1-♭2-♭3-♭4-5-♭6-♭7
    LYDIAN_FLAT3: 0b101011001101, // 1-2-♭3-#4-5-6-7
    MIXO_FLAT2: 0b011010110011, // 1-♭2-3-4-5-6-♭7
    LOCRIAN_SHARP2_SHARP5: 0b101100101101, // 1-2-♭3-4-#5-♭6-♭7
    ALTERED_DOM7_B13: 0b001101101011, // 1-♭2-♭3-♭4-♭5-♭6-𝄫7
  },

  /* ───────────────────── symmetrical / synthetic families ─────────────────── */
  WHOLE_TONE: {
    WHOLE_TONE: 0b010101010101, // 1-2-3-#4-#5-♭7
  },

  DIMINISHED: {
    HALF_WHOLE: 0b011011011011, // 1-♭2-♯2-3-#4-5-6-♭7  (dominant ♭9 scale)
    WHOLE_HALF: 0b101101101101, // 1-2-♭3-4-♭5-♯5-6-7  (diminished 7th scale)
  },

  AUGMENTED_HEX: {
    AUGMENTED: 0b100110011001, // 1-♭3-3-5-#5-7  (symmetrical)
  },

  /* ─────────────────────────── BLUES / HEXATONIC ──────────────────────────── */
  BLUES: {
    MINOR_BLUES: 0b010011101001, // 1-♭3-4-♯4-5-♭7
    MAJOR_BLUES: 0b001010011101, // 1-2-♭3-3-5-6
  },

  /* ─────────────────────────── BEBOP (8-note) ─────────────────────────────── */
  BEBOP: {
    BEBOP_DOM: 0b111010110101, // Mixolydian + 7 (1-2-3-4-5-6-♭7-7)
    BEBOP_MAJ: 0b111010110101, // Ionian + ♭7  (same mask, alt name)
    BEBOP_DORIAN: 0b011010111101, // Dorian + M3  (1-2-♭3-3-4-5-6-♭7)
  },
};

export const modes = {
  ...scaleModes.DIATONIC,
  ...scaleModes.PENTATONIC,
  ...scaleModes.BLUES,
  ...scaleModes.MELODIC_MINOR,
  ...scaleModes.HARMONIC_MAJOR,
  ...scaleModes.WHOLE_TONE,
  ...scaleModes.DIMINISHED,
  ...scaleModes.AUGMENTED_HEX,
  ...scaleModes.BEBOP,
};

export type ModeName = keyof typeof modes;
