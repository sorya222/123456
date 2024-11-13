import React from 'react';
import { Layout, BookOpen, Calendar, FileText, Settings } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: Layout, label: 'Dashboard' },
    { id: 'subjects', icon: BookOpen, label: 'Subjects' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'assignments', icon: FileText, label: 'Assignments' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-full shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Study Tracker</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              currentPage === id ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''
            }`}
          >
            <Icon className="h-5 w-5 mr-3" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};