import React, { useState, useEffect } from 'react';
import { ScreenState, RoleType, UtmParams } from './types';
import { LandingPage } from './components/LandingPage';
import { Quiz } from './components/Quiz';
import { ResultPage } from './components/ResultPage';
import { SignupForm } from './components/SignupForm';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.LANDING);
  const [result, setResult] = useState<RoleType | null>(null);
  const [utmParams, setUtmParams] = useState<UtmParams>({});

  useEffect(() => {
    // Capture UTM parameters from URL on mount
    const params = new URLSearchParams(window.location.search);
    const capturedUtms: UtmParams = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
    };
    setUtmParams(capturedUtms);
  }, []);

  const startQuiz = () => {
    setScreen(ScreenState.QUIZ);
  };

  const handleQuizComplete = (role: RoleType) => {
    setScreen(ScreenState.CALCULATING);
    setResult(role);
    
    // Simulate "calculating" suspense for user experience
    setTimeout(() => {
      setScreen(ScreenState.SIGNUP);
    }, 1500);
  };

  const handleSignupComplete = (userData: { name: string; phone: string; language: string }) => {
    console.log("User signed up:", userData);
    setScreen(ScreenState.RESULT);
  };

  const retakeQuiz = () => {
    setResult(null);
    setScreen(ScreenState.LANDING);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      {screen === ScreenState.LANDING && (
        <LandingPage onStart={startQuiz} />
      )}

      {screen === ScreenState.QUIZ && (
        <Quiz onComplete={handleQuizComplete} />
      )}

      {screen === ScreenState.CALCULATING && (
        <div className="flex flex-col items-center justify-center h-screen space-y-8 p-6">
           <div className="bg-white p-3 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] animate-pulse mb-4">
              <img 
                src="logo.png" 
                alt="Entri" 
                className="h-10 w-auto object-contain" 
                onError={(e) => e.currentTarget.style.display = 'none'} 
              />
           </div>
           <div className="relative">
             <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
             <Loader2 size={64} className="text-blue-500 animate-spin relative z-10" />
           </div>
           <div className="text-center space-y-3">
             <h2 className="text-2xl font-black text-white">Analyzing your profile...</h2>
             <p className="text-gray-500 font-medium">Matching with 5 marketing archetypes</p>
           </div>
        </div>
      )}

      {screen === ScreenState.SIGNUP && (
        <SignupForm onComplete={handleSignupComplete} utmParams={utmParams} />
      )}

      {screen === ScreenState.RESULT && result && (
        <ResultPage role={result} onRetake={retakeQuiz} />
      )}
    </div>
  );
};

export default App;