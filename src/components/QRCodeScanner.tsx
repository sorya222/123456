import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { format, isSameDay } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';
import type { QRData } from '../types';

export const QRCodeScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<QRData | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    }, false);

    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  const checkDailyAttendance = (studentId: string): boolean => {
    const attendanceList = JSON.parse(localStorage.getItem('attendance') || '[]');
    const today = new Date();
    
    return attendanceList.some((record: any) => 
      record.studentId === studentId && 
      isSameDay(new Date(record.scannedAt), today)
    );
  };

  const onScanSuccess = (decodedText: string) => {
    try {
      const result = JSON.parse(decodedText) as QRData;
      if (result.type !== 'attendance') {
        throw new Error('Invalid QR code type');
      }

      if (checkDailyAttendance(result.studentId)) {
        setError('Student has already registered attendance today');
        setSuccess(false);
        return;
      }
      
      setScanResult(result);
      setSuccess(true);
      setError('');

      const attendanceList = JSON.parse(localStorage.getItem('attendance') || '[]');
      attendanceList.push({
        ...result,
        scannedAt: Date.now(),
      });
      localStorage.setItem('attendance', JSON.stringify(attendanceList));
    } catch (err) {
      setError('Invalid QR code format');
      setSuccess(false);
    }
  };

  const onScanError = (err: string) => {
    console.warn(err);
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Scan Attendance QR Code
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Point your camera at a valid QR code to record attendance
        </p>
      </div>

      <div id="reader" className="mb-6"></div>

      {error && (
        <div className="flex items-center justify-center text-red-500 mb-4">
          <XCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {success && scanResult && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-700 dark:text-green-400 font-medium">
              Attendance Recorded Successfully
            </span>
          </div>
          <div className="text-sm text-green-600 dark:text-green-300 space-y-1">
            <p>Name: {scanResult.name}</p>
            <p>Student ID: {scanResult.studentId}</p>
            <p>Class: {scanResult.class}</p>
            <p>Recorded at: {format(new Date(), 'PPpp')}</p>
          </div>
        </div>
      )}
    </div>
  );
};