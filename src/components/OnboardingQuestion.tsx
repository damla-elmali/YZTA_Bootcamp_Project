import React from 'react';

interface Option {
  value: string;
  label: string;
  description: string;
}

interface OnboardingQuestionProps {
  question: string;
  options: Option[];
  value: string; // Seçili olan değer
  onChange: (value: string) => void;
}

const OnboardingQuestion: React.FC<OnboardingQuestionProps> = ({
  question,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-12 transition-all duration-500 ease-out">
      <h2 className="text-2xl font-medium text-white mb-6 text-center sm:text-left">{question}</h2>
      <div className="grid gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            type="button" // Form içinde değilse bile type belirtmek iyi bir pratiktir
            className={`text-left p-4 border rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              value === option.value
                ? 'border-white bg-white/10 ring-2 ring-white' // Seçili olana daha belirgin stil
                : 'border-white/20'
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-3 transition-all duration-200 ease-in-out ${
                  value === option.value
                    ? 'border-white bg-white'
                    : 'border-white/60 bg-transparent'
                }`}
              >
                {value === option.value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                )}
              </div>
              <div>
                <p className="font-medium text-white">{option.label}</p>
                <p className="text-white/70 text-sm mt-1">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OnboardingQuestion;