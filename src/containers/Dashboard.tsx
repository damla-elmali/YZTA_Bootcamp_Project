import React from 'react';
import Chat from '../components/Chat';
import { UserPreferences } from '../types';

interface DashboardProps {
  preferences: UserPreferences;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ preferences, onReset }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-medium text-white">EduSona - Kişisel Öğrenme Asistanınız</h1>
            <p className="text-white/60 text-sm">Konu: {preferences.topic}</p>
          </div>
          <button
            onClick={onReset}
            className="px-3 py-1 text-sm text-white/70 hover:text-white border border-white/20 rounded-lg hover:border-white/40 transition-colors"
          >
            Yeni Konuya Başla
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <Chat preferences={preferences} />
      </div>
    </div>
  );
};

export default Dashboard;