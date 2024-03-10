import { Medication } from './medication';

export type Visit = {
  date: Date;
  meds: Medication[];
  symptoms: string[];
  mood: string;
  notes: string;
};