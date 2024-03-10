import { Medication } from './medication';
import { Visit } from './visits';

export type Patient = {
  name: string;
  age: number;
  meds: Medication[];
  symptoms: string[];
  notes: string[];
  visits: Visit[];
};
