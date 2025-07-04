/* ------------------------------------------------------------------ *
 *  Type-level utilities                                              *
 * ------------------------------------------------------------------ */

type Byte = number; // 0-255   (raw bytes for SysEx / Meta)
type U7 = number; // 0-127   (data byte values)
type U14 = number; // 0-16383 (pitch-bend)

type Tick = number; // delta-time in MIDI ticks (PPQ)

/* ------------------------------------------------------------------ *
 *  Channel-voice / Channel-mode events                               *
 * ------------------------------------------------------------------ */

interface BaseChEvt {
  d: Tick; // delta-time since previous event
  ch: U7; // MIDI channel 0-15
}

export interface NoteOnEvt extends BaseChEvt {
  kind: "noteOn";
  n: U7;
  v: U7;
}
export interface NoteOffEvt extends BaseChEvt {
  kind: "noteOff";
  n: U7;
  v: U7;
}
export interface PolyAfterEvt extends BaseChEvt {
  kind: "polyAT";
  n: U7;
  p: U7;
}
export interface ControlChangeEvt extends BaseChEvt {
  kind: "cc";
  c: U7;
  v: U7;
}
export interface ProgramChangeEvt extends BaseChEvt {
  kind: "pc";
  p: U7;
}
export interface ChannelAfterEvt extends BaseChEvt {
  kind: "chAT";
  p: U7;
}
export interface PitchBendEvt extends BaseChEvt {
  kind: "pb";
  v: U14;
}

/* ------------------------------------------------------------------ *
 *  System Exclusive (SysEx)                                          *
 * ------------------------------------------------------------------ */

export interface SysExEvt {
  d: Tick;
  kind: "sysEx";
  data: Uint8Array; // full length, *excluding* 0xF0 and 0xF7
}

/* ------------------------------------------------------------------ *
 *  Meta events (track-local, non-MIDI)                               *
 * ------------------------------------------------------------------ */

export interface MetaEvt<T extends MetaType = MetaType> {
  d: Tick;
  kind: "meta";
  type: T;
  data: MetaPayload[T];
}

/** Only a subset shown; extend as you need */
type MetaType =
  | "sequenceNumber"
  | "text"
  | "copyright"
  | "trackName"
  | "instrument"
  | "lyrics"
  | "marker"
  | "cuePoint"
  | "setTempo"
  | "timeSig"
  | "keySig"
  | "endOfTrack";

/** Per-type payload helpers */
interface MetaPayloadBase {
  [k: string]: unknown;
}
interface MetaPayload extends MetaPayloadBase {
  sequenceNumber: { num: number };
  text: string;
  copyright: string;
  trackName: string;
  instrument: string;
  lyrics: string;
  marker: string;
  cuePoint: string;
  setTempo: { microPerQuarter: number }; // 500 000 = 120 BPM
  timeSig: { nn: number; dd: number; cc: number; bb: number };
  keySig: { sf: number; mi: 0 | 1 }; // sf: −7…+7, mi: 0 = major
  endOfTrack: null;
}

/* ------------------------------------------------------------------ *
 *  Unified event type                                                *
 * ------------------------------------------------------------------ */

export type MidiEvt =
  | NoteOnEvt
  | NoteOffEvt
  | PolyAfterEvt
  | ControlChangeEvt
  | ProgramChangeEvt
  | ChannelAfterEvt
  | PitchBendEvt
  | SysExEvt
  | MetaEvt;
