export interface StudentInfo {
  name: string;
  studentId: string;
  class: string;
  specialization: string;
}

export interface QRData extends StudentInfo {
  timestamp: number;
  type: 'attendance';
}

export interface AttendanceRecord extends QRData {
  scannedAt: number;
}

export interface FormErrors {
  [key: string]: string;
}