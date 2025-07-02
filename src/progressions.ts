export const popularProgressions = {
  // Foundational Progressions
  "I-IV-V": ["I", "IV", "V"],
  "I-V-vi-IV": ["I", "V", "vi", "IV"], // The "Axis" progression
  "vi-IV-I-V": ["vi", "IV", "I", "V"], // The "Sensitive Female" progression
  "I-vi-IV-V": ["I", "vi", "IV", "V"], // The "50s" progression

  // Jazz & Blues Standards
  "ii-V-I": ["ii", "V", "I"],
  "I-vi-ii-V": ["I", "vi", "ii", "V"], // The "Rhythm Changes" A-section
  "I7-IV7-V7": ["I7", "IV7", "V7"], // Basic Blues
  "12-Bar Blues": [
    "I7",
    "I7",
    "I7",
    "I7",
    "IV7",
    "IV7",
    "I7",
    "I7",
    "V7",
    "IV7",
    "I7",
    "V7",
  ],
  "Minor ii-V-i": ["iiø7", "V7", "i"],

  // Modal & Rock
  "I-bVII-IV": ["I", "bVII", "IV"], // The "Wonderwall" progression
  "i-bVI-bIII-bVII": ["i", "bVI", "bIII", "bVII"], // Minor key rock
  "Andalusian Cadence": ["i", "bVII", "bVI", "V"],

  // Classical Cadences
  "Authentic Cadence": ["V", "I"],
  "Plagal Cadence": ["IV", "I"],
  "Deceptive Cadence": ["V", "vi"],
};

export type ProgressionName = keyof typeof popularProgressions;
