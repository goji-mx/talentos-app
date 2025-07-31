export interface BaseUser {
  /** ObjectId de Mongo como cadena */
  _id?: string;
  authType?: 'google' | 'microsoft' | 'direct';
  userType?: 'admin' | 'student';
  fullName?: string;
  email?: string;
  phone?: string;
  /** Fecha en ISO o null */
  privacyPolicyAccepted: boolean,
  privacyPolicyAcceptedAt?: string | Date | null,
  verificationEmailSent?: boolean;
  emailVerified?: boolean;
  /** Este campo normalmente no se expone al cliente */
  password?: string;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
  allowAccess?: boolean;
  backupEmail?: string;
  licenseNumber?: string;
  specialtyOther?: string;
  universityOther?: string;
  residencyHospitalOther?: string;
  specialty?: string;
  university?: string;
  residencyHospital?: string;
  residency?: string;
  document?: string;
  customSpecialty?: string;
  customHospital?: string;
}
