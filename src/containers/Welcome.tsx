import React from 'react';
import { ArrowDown } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="text-center space-y-6 animate-fadeIn">
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight">
          EduSona
        </h1>
        <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto">
          Benzersiz öğrenme tarzınıza uyum sağlayan kişisel yapay zeka öğrenme arkadaşınız
        </p>
        <button
          onClick={onStart}
          className="mt-12 inline-flex flex-col items-center gap-4 transition-opacity hover:opacity-70"
          aria-label="Öğrenmeye başla"
        >
          <span className="text-lg text-white/60">Yolculuğunuza Başlayın</span>
          <ArrowDown className="w-8 h-8 animate-bounce" />
        </button>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/40 text-sm">
          Yapay zeka destekli, kişiselleştirilmiş öğrenme
        </p>
      </div>
    </div>
  );
};

export default Welcome;