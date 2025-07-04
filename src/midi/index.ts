import {
  NoteOnEvt,
  NoteOffEvt,
  PolyAfterEvt,
  ControlChangeEvt,
  ProgramChangeEvt,
  ChannelAfterEvt,
  PitchBendEvt,
  SysExEvt,
  MetaEvt,
} from "./types";
import { NoteName, notes } from "../notes";

/* ------------------------------------------------------------------ *
 *  Channel-voice / Channel-mode events                               *
 * ------------------------------------------------------------------ */

/** Options for creating a `noteOn` event. */
export interface NoteOnOptions {
  channel: number;
  noteNumber: number;
  velocity?: number;
  deltaTime?: number;
}

/** Creates a `noteOn` event. */
export const noteOn = (options: NoteOnOptions): NoteOnEvt => ({
  kind: "noteOn",
  ch: options.channel,
  n: options.noteNumber,
  v: options.velocity ?? 100,
  d: options.deltaTime ?? 0,
});

/** Options for creating a `noteOff` event. */
export interface NoteOffOptions {
  channel: number;
  noteNumber: number;
  velocity?: number;
  deltaTime?: number;
}

/** Creates a `noteOff` event. */
export const noteOff = (options: NoteOffOptions): NoteOffEvt => ({
  kind: "noteOff",
  ch: options.channel,
  n: options.noteNumber,
  v: options.velocity ?? 64, // Standard release velocity
  d: options.deltaTime ?? 0,
});

/** Options for creating a polyphonic aftertouch event. */
export interface PolyphonicAftertouchOptions {
  channel: number;
  noteNumber: number;
  pressure: number;
  deltaTime?: number;
}

/** Creates a polyphonic aftertouch event. */
export const polyphonicAftertouch = (
  options: PolyphonicAftertouchOptions
): PolyAfterEvt => ({
  kind: "polyAT",
  ch: options.channel,
  n: options.noteNumber,
  p: options.pressure,
  d: options.deltaTime ?? 0,
});

/** Options for creating a control change event. */
export interface ControlChangeOptions {
  channel: number;
  controller: number;
  value: number;
  deltaTime?: number;
}

/** Creates a control change event. */
export const controlChange = (
  options: ControlChangeOptions
): ControlChangeEvt => ({
  kind: "cc",
  ch: options.channel,
  c: options.controller,
  v: options.value,
  d: options.deltaTime ?? 0,
});

/** Options for creating a program change event. */
export interface ProgramChangeOptions {
  channel: number;
  program: number;
  deltaTime?: number;
}

/** Creates a program change event. */
export const programChange = (
  options: ProgramChangeOptions
): ProgramChangeEvt => ({
  kind: "pc",
  ch: options.channel,
  p: options.program,
  d: options.deltaTime ?? 0,
});

/** Options for creating a channel aftertouch event. */
export interface ChannelAftertouchOptions {
  channel: number;
  pressure: number;
  deltaTime?: number;
}

/** Creates a channel aftertouch event. */
export const channelAftertouch = (
  options: ChannelAftertouchOptions
): ChannelAfterEvt => ({
  kind: "chAT",
  ch: options.channel,
  p: options.pressure,
  d: options.deltaTime ?? 0,
});

/** Options for creating a pitch bend event. */
export interface PitchBendOptions {
  channel: number;
  value: number;
  deltaTime?: number;
}

/** Creates a pitch bend event. */
export const pitchBend = (options: PitchBendOptions): PitchBendEvt => ({
  kind: "pb",
  ch: options.channel,
  v: options.value,
  d: options.deltaTime ?? 0,
});

/* ------------------------------------------------------------------ *
 *  System Exclusive (SysEx)                                          *
 * ------------------------------------------------------------------ */

/** Options for creating a SysEx event. */
export interface SysExOptions {
  data: Uint8Array;
  deltaTime?: number;
}

/** Creates a SysEx event. */
export const sysEx = (options: SysExOptions): SysExEvt => ({
  kind: "sysEx",
  data: options.data,
  d: options.deltaTime ?? 0,
});

/* ------------------------------------------------------------------ *
 *  Meta events (track-local, non-MIDI)                               *
 * ------------------------------------------------------------------ */

type BaseMetaOptions = { deltaTime?: number };

/** Options for creating a sequence number event. */
export interface SequenceNumberOptions extends BaseMetaOptions {
  number: number;
}

/** Creates a sequence number event. */
export const sequenceNumber = (
  options: SequenceNumberOptions
): MetaEvt<"sequenceNumber"> => ({
  kind: "meta",
  type: "sequenceNumber",
  data: { num: options.number },
  d: options.deltaTime ?? 0,
});

/** Options for creating a text event. */
export interface TextOptions extends BaseMetaOptions {
  text: string;
}

/** Creates a text event. */
export const text = (options: TextOptions): MetaEvt<"text"> => ({
  kind: "meta",
  type: "text",
  data: options.text,
  d: options.deltaTime ?? 0,
});

/** Options for creating a copyright event. */
export interface CopyrightOptions extends BaseMetaOptions {
  text: string;
}

/** Creates a copyright event. */
export const copyright = (options: CopyrightOptions): MetaEvt<"copyright"> => ({
  kind: "meta",
  type: "copyright",
  data: options.text,
  d: options.deltaTime ?? 0,
});

/** Options for creating a track name event. */
export interface TrackNameOptions extends BaseMetaOptions {
  name: string;
}

/** Creates a track name event. */
export const trackName = (options: TrackNameOptions): MetaEvt<"trackName"> => ({
  kind: "meta",
  type: "trackName",
  data: options.name,
  d: options.deltaTime ?? 0,
});

/** Options for creating an instrument name event. */
export interface InstrumentNameOptions extends BaseMetaOptions {
  name: string;
}

/** Creates an instrument name event. */
export const instrumentName = (
  options: InstrumentNameOptions
): MetaEvt<"instrument"> => ({
  kind: "meta",
  type: "instrument",
  data: options.name,
  d: options.deltaTime ?? 0,
});

/** Options for creating a lyrics event. */
export interface LyricsOptions extends BaseMetaOptions {
  text: string;
}

/** Creates a lyrics event. */
export const lyrics = (options: LyricsOptions): MetaEvt<"lyrics"> => ({
  kind: "meta",
  type: "lyrics",
  data: options.text,
  d: options.deltaTime ?? 0,
});

/** Options for creating a marker event. */
export interface MarkerOptions extends BaseMetaOptions {
  text: string;
}

/** Creates a marker event. */
export const marker = (options: MarkerOptions): MetaEvt<"marker"> => ({
  kind: "meta",
  type: "marker",
  data: options.text,
  d: options.deltaTime ?? 0,
});

/** Options for creating a cue point event. */
export interface CuePointOptions extends BaseMetaOptions {
  text: string;
}

/** Creates a cue point event. */
export const cuePoint = (options: CuePointOptions): MetaEvt<"cuePoint"> => ({
  kind: "meta",
  type: "cuePoint",
  data: options.text,
  d: options.deltaTime ?? 0,
});

/** Options for creating a set tempo event. */
export interface SetTempoOptions extends BaseMetaOptions {
  bpm: number;
}

/** Creates a set tempo event. */
export const setTempo = (options: SetTempoOptions): MetaEvt<"setTempo"> => ({
  kind: "meta",
  type: "setTempo",
  data: { microPerQuarter: 60_000_000 / options.bpm },
  d: options.deltaTime ?? 0,
});

/** Options for creating a time signature event. */
export interface TimeSignatureOptions extends BaseMetaOptions {
  numerator: number;
  denominator: number;
  clocksPerMetronomeClick?: number;
  thirtySecondNotesPerQuarter?: number;
}

/** Creates a time signature event. */
export const timeSignature = (
  options: TimeSignatureOptions
): MetaEvt<"timeSig"> => {
  if (Math.log2(options.denominator) % 1 !== 0) {
    throw new Error("Time signature denominator must be a power of 2.");
  }
  return {
    kind: "meta",
    type: "timeSig",
    data: {
      nn: options.numerator,
      dd: Math.log2(options.denominator),
      cc: options.clocksPerMetronomeClick ?? 24,
      bb: options.thirtySecondNotesPerQuarter ?? 8,
    },
    d: options.deltaTime ?? 0,
  };
};

/** Options for creating a key signature event. */
export interface KeySignatureOptions extends BaseMetaOptions {
  sharps: number;
  isMinor?: boolean;
}

/** Creates a key signature event. */
export const keySignature = (
  options: KeySignatureOptions
): MetaEvt<"keySig"> => {
  if (options.sharps < -7 || options.sharps > 7) {
    throw new Error(
      "Key signature must be between -7 (7 flats) and 7 (7 sharps)."
    );
  }
  return {
    kind: "meta",
    type: "keySig",
    data: {
      sf: options.sharps,
      mi: options.isMinor ? 1 : 0,
    },
    d: options.deltaTime ?? 0,
  };
};

/** Options for creating an end of track event. */
export interface EndOfTrackOptions extends BaseMetaOptions {}

/** Creates an end of track event. */
export const endOfTrack = (
  options?: EndOfTrackOptions
): MetaEvt<"endOfTrack"> => ({
  kind: "meta",
  type: "endOfTrack",
  data: null,
  d: options?.deltaTime ?? 0,
});

/**
 * Calculates the MIDI note number for a given note name and octave.
 *
 * This function uses scientific pitch notation where C4 is middle C.
 * The resulting MIDI note number for C4 will be 60.
 *
 * @param note The name of the note (e.g., "C", "F#") or its pitch class value from the `notes` object.
 * @param octave The octave number (e.g., 4 for middle C).
 * @returns The MIDI note number (0-127).
 */
export const getNoteNumber = (
  note: NoteName | number,
  octave: number
): number => {
  let noteValue: number;

  if (typeof note === "string") {
    if (!(note in notes)) {
      throw new Error(`Invalid note name: ${note}`);
    }
    noteValue = notes[note as NoteName];
  } else {
    noteValue = note;
  }

  const pitchClassIndex = Math.log2(noteValue);
  if (
    pitchClassIndex < 0 ||
    pitchClassIndex > 11 ||
    !Number.isInteger(pitchClassIndex)
  ) {
    throw new Error(
      `Invalid note value: ${noteValue}. It must correspond to a valid pitch class.`
    );
  }

  // Formula maps scientific octave to MIDI note number.
  // e.g. getNoteNumber("C", 4) => 60 (Middle C)
  // e.g. getNoteNumber("A", 4) => 69 (A440)
  // The octave is adjusted by +1 because the MIDI octave range is offset
  // from scientific pitch notation's octave range. C4 (scientific) is in the 5th MIDI octave.
  const midiNote = 12 * (octave + 1) + pitchClassIndex;

  if (midiNote < 0 || midiNote > 127) {
    throw new Error(
      `Resulting MIDI note ${midiNote} is out of valid range (0-127).`
    );
  }

  return midiNote;
};
