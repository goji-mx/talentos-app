import type { BaseUser } from "./BaseUser";

export interface Student extends BaseUser {
  isResident?: boolean;
  specialty?: string;
  university?: string;
  residencyHospital?: string;
  residency?: string;
  specialtyOther?: string;
  universityOther?: string;
  residencyHospitalOther?: string;
}