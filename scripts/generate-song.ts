import { MidiEvt, NoteOnEvt } from "../src/midi/types";
import { getNoteNumber, noteOff, noteOn } from "../src/midi";
import { Scale } from "../src/Scale";
import { Chord } from "../src/Chord";
import { notes } from "../src/notes";

const songEvents = new Set<MidiEvt>();

const bpm = 120;
const ticksPerQuarterNote = 960;
const ticksPerBeat = ticksPerQuarterNote / 4;
const ticksPerMeasure = ticksPerBeat * 4;

const scale = Scale.build("C", "IONIAN");

const chordProgression = [
  Chord.build("C", "MAJOR"),
  Chord.build("G", "MAJOR"),
  Chord.build("D", "MAJOR"),
  Chord.build("A", "MAJOR"),
];

for (let measure = 0; measure < 16; measure++) {
  const chord = chordProgression[measure % chordProgression.length];

  const chordNotes = chord.getNotes();
  const octave = 3;

  // arpeggiate the chord
  for (let round = 0; round < 2; round++) {
    for (let note = 0; note < chordNotes.length; note++) {
      const startTime =
        measure * ticksPerMeasure +
        round * ticksPerBeat +
        (note * ticksPerBeat) / chordNotes.length;
      const endTime = startTime + ticksPerBeat / chordNotes.length;

      const noteLetter = chordNotes[note];
      const noteNumber = getNoteNumber(noteLetter, octave);
      const noteOn1 = noteOn({
        channel: 0,
        noteNumber: noteNumber,
        velocity: 127,
        deltaTime: startTime,
      });
      songEvents.add(noteOn1);

      const noteOff1 = noteOff({
        channel: 0,
        noteNumber: noteNumber,
        velocity: 0,
        deltaTime: endTime,
      });
      songEvents.add(noteOff1);
    }
  }
}
