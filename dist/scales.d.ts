export declare const scaleModes: {
    DIATONIC: {
        IONIAN: number;
        MAJOR: number;
        DORIAN: number;
        PHRYGIAN: number;
        LYDIAN: number;
        MIXOLYDIAN: number;
        AEOLIAN: number;
        NATURAL_MINOR: number;
        LOCRIAN: number;
    };
    PENTATONIC: {
        MAJOR_PENTATONIC: number;
        IONIAN_PENTA: number;
        EGYPTIAN: number;
        SUSPENDED_PENTA: number;
        MAN_GONG: number;
        RITUSEN: number;
        MINOR_PENTATONIC: number;
        AEOLIAN_PENTA: number;
    };
    MELODIC_MINOR: {
        MELODIC_MINOR_ASC: number;
        DORIAN_FLAT2: number;
        LYDIAN_AUG: number;
        LYDIAN_DOM: number;
        MIXO_FLAT6: number;
        LOCRIAN_SHARP2: number;
        ALTERED: number;
    };
    HARMONIC_MAJOR: {
        HARMONIC_MAJOR: number;
        DORIAN_FLAT5: number;
        PHRYGIAN_FLAT4: number;
        LYDIAN_FLAT3: number;
        MIXO_FLAT2: number;
        LOCRIAN_SHARP2_SHARP5: number;
        ALTERED_DOM7_B13: number;
    };
    WHOLE_TONE: {
        WHOLE_TONE: number;
    };
    DIMINISHED: {
        HALF_WHOLE: number;
        WHOLE_HALF: number;
    };
    AUGMENTED_HEX: {
        AUGMENTED: number;
    };
    BLUES: {
        MINOR_BLUES: number;
        MAJOR_BLUES: number;
    };
    BEBOP: {
        BEBOP_DOM: number;
        BEBOP_MAJ: number;
        BEBOP_DORIAN: number;
    };
};
export declare const modes: {
    BEBOP_DOM: number;
    BEBOP_MAJ: number;
    BEBOP_DORIAN: number;
    AUGMENTED: number;
    HALF_WHOLE: number;
    WHOLE_HALF: number;
    WHOLE_TONE: number;
    HARMONIC_MAJOR: number;
    DORIAN_FLAT5: number;
    PHRYGIAN_FLAT4: number;
    LYDIAN_FLAT3: number;
    MIXO_FLAT2: number;
    LOCRIAN_SHARP2_SHARP5: number;
    ALTERED_DOM7_B13: number;
    MELODIC_MINOR_ASC: number;
    DORIAN_FLAT2: number;
    LYDIAN_AUG: number;
    LYDIAN_DOM: number;
    MIXO_FLAT6: number;
    LOCRIAN_SHARP2: number;
    ALTERED: number;
    MINOR_BLUES: number;
    MAJOR_BLUES: number;
    MAJOR_PENTATONIC: number;
    IONIAN_PENTA: number;
    EGYPTIAN: number;
    SUSPENDED_PENTA: number;
    MAN_GONG: number;
    RITUSEN: number;
    MINOR_PENTATONIC: number;
    AEOLIAN_PENTA: number;
    IONIAN: number;
    MAJOR: number;
    DORIAN: number;
    PHRYGIAN: number;
    LYDIAN: number;
    MIXOLYDIAN: number;
    AEOLIAN: number;
    NATURAL_MINOR: number;
    LOCRIAN: number;
};
export type ModeName = keyof typeof modes;
