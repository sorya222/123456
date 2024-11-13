import React from 'react';
import { BarChart, Users, BookOpen, Calendar } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { icon: BookOpen, label: 'Subjects', value: '8' },
    { icon: Calendar, label: 'Study Hours', value: '24' },
    { icon: BarChart, label: 'Progress', value: '75%' },
    { icon: Users, label: 'Study Groups', value: '3' },
  ];

  return (
    <div className="flex-1 p-8 overflow-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <Icon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};