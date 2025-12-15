import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { RoleType } from '../types';
import { Button } from './Button';
import { ChevronRight } from 'lucide-react';

interface QuizProps {
  onComplete: (role: RoleType) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<RoleType, number>>({
    [RoleType.SOCIAL_MEDIA]: 0,
    [RoleType.PERFORMANCE]: 0,
    [RoleType.CONTENT]: 0,
    [RoleType.SEO]: 0,
    [RoleType.FREELANCER]: 0,
  });

  const question = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100;

  const handleOptionSelect = (roleWeight: RoleType) => {
    const newScores = { ...scores, [roleWeight]: scores[roleWeight] + 1 };
    setScores(newScores);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Determine winner
      let maxScore = -1;
      let winningRole = RoleType.SOCIAL_MEDIA;

      (Object.keys(newScores) as RoleType[]).forEach((role) => {
        if (newScores[role] > maxScore) {
          maxScore = newScores[role];
          winningRole = role;
        }
      });
      onComplete(winningRole);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto p-6 justify-center">
      {/* Progress Bar */}
      <div className="w-full bg-gray-800 h-2 rounded-full mb-8 relative overflow-hidden">
        <div 
          className="bg-yellow-400 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="slide-in">
        <h2 className="text-3xl font-black mb-2 text-white leading-tight">
          <span className="text-yellow-400 text-lg uppercase tracking-wider block mb-2 font-bold">Question {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}</span>
          {question.question}
        </h2>
        
        <div className="space-y-4 mt-8">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.weight)}
              className="w-full bg-gray-900 border border-gray-700 hover:border-yellow-400 p-4 rounded-2xl flex items-center justify-between group transition-all duration-200 hover:bg-gray-800 text-left"
            >
              <span className="text-white font-bold text-lg">{option.icon} {option.text}</span>
              <ChevronRight className="text-gray-500 group-hover:text-yellow-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
      
      <p className="text-center text-gray-500 text-sm mt-8 animate-pulse">
        ⚡ Takes less than 60 seconds
      </p>
    </div>
  );
};