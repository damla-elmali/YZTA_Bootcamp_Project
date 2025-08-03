import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full pt-6 px-6 z-10">
      <div className="w-full max-w-2xl mx-auto">
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden"> {/* Yüksekliği biraz artırdım */}
          <div
            className="h-full bg-white transition-all duration-700 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/60"> {/* Rengi biraz daha belirgin yaptım */}
          <span>Adım {currentStep}/{totalSteps}</span>
          <span>Öğrenme profiliniz oluşturuluyor</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;