import React, { useState } from 'react';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { QRCodeScanner } from './components/QRCodeScanner';
import { AttendanceList } from './components/AttendanceList';
import { QrCode, Scan, Users } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan' | 'list'>('generate');

  const tabs = [
    { id: 'generate', label: 'Generate QR', icon: QrCode },
    { id: 'scan', label: 'Scan QR', icon: Scan },
    { id: 'list', label: 'Attendance', icon: Users },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="py-4 text-2xl font-bold text-gray-900 dark:text-white">
            QR Attendance System
          </h1>
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                  activeTab === id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'generate' && <QRCodeGenerator />}
        {activeTab === 'scan' && <QRCodeScanner />}
        {activeTab === 'list' && <AttendanceList />}
      </main>
    </div>
  );
};