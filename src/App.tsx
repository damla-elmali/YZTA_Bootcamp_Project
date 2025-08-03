import React, { useState } from 'react';
import Onboarding from './containers/Onboarding';
import Dashboard from './containers/Dashboard';
import Welcome from './containers/Welcome';
import { UserPreferences } from './types';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  const handleOnboardingComplete = (userPreferences: UserPreferences) => {
    setPreferences(userPreferences);
  };

  const handleReset = () => {
    setPreferences(null);
    setShowOnboarding(false);
  };

  const startOnboarding = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {preferences ? (
        <Dashboard preferences={preferences} onReset={handleReset} />
      ) : showOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Welcome onStart={startOnboarding} />
      )}
    </div>
  );
}

export default App;