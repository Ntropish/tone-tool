export const popularProgressions = {
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
  "Minor Rock": "i-bVI-bIII-bVII",
};

export type ProgressionName = keyof typeof popularProgressions;
