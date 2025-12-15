import React, { useEffect, useState } from 'react';
import { RoleType } from '../types';
import { ROLE_DETAILS } from '../constants';
import { Button } from './Button';
import { getCareerDetails, CareerDetails } from '../services/geminiService';
import { CheckCircle2, Sparkles, Loader2, IndianRupee, Wrench } from 'lucide-react';

interface ResultPageProps {
  role: RoleType;
  onRetake: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ role, onRetake }) => {
  const details = ROLE_DETAILS[role];
  const [careerData, setCareerData] = useState<CareerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCareerDetails(role);
      setCareerData(result);
      setLoading(false);
    };
    fetchData();
  }, [role]);

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto p-4 min-h-screen">
      <div className="flex-1 flex flex-col items-center animate-fade-in">
        
        {/* Header */}
        <div className="w-full bg-gray-900/50 backdrop-blur-md p-4 rounded-b-3xl absolute top-0 left-0 border-b border-gray-800 z-10 flex justify-between items-center">
            <span className="font-bold text-gray-400 text-xs tracking-widest uppercase">Result Unlocked</span>
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                <CheckCircle2 size={12} /> Match Found
            </span>
        </div>

        <div className="mt-20 text-center space-y-4 w-full">
          <p className="text-gray-400 font-medium">You are best suited to become a</p>
          
          <div className="relative inline-block mb-6">
             <div className={`absolute -inset-4 bg-gradient-to-r ${details.bgGradient} opacity-30 blur-xl rounded-full animate-pulse-fast`}></div>
             <div className={`relative bg-gray-900 border-2 border-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4`}>
                <div className={`${details.textColor} transform hover:scale-110 transition-transform duration-300`}>
                    {details.visualIcon}
                </div>
                <h1 className={`text-4xl font-black uppercase leading-none bg-clip-text text-transparent bg-gradient-to-r ${details.bgGradient} text-center`}>
                    {details.title}
                </h1>
             </div>
          </div>

          <p className="text-xl font-medium text-white max-w-xs mx-auto leading-relaxed mt-4">
            {details.description}
          </p>

          {/* Dynamic Content Section */}
          <div className="w-full mt-8 space-y-4">
            
            {loading ? (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3">
                    <Loader2 className="animate-spin text-blue-500" size={32} />
                    <p className="text-sm text-gray-400 animate-pulse">Scanning industry data...</p>
                </div>
            ) : (
                <>
                  {/* Salary Card */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-5 flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-3">
                          <div className="bg-green-500/20 p-2 rounded-lg">
                              <IndianRupee className="text-green-400" size={24} />
                          </div>
                          <div className="text-left">
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Avg. Annual Salary</p>
                              <p className="text-lg font-bold text-white">{careerData?.salary}</p>
                          </div>
                      </div>
                  </div>

                  {/* Tools Card */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <div className="flex items-center gap-2 mb-4">
                        <Wrench className="text-purple-400" size={20} />
                        <h3 className="font-bold text-white">AI Tools to Master</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {careerData?.tools.map((tool, idx) => (
                            <span key={idx} className="bg-gray-800 text-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-700 hover:border-purple-500 hover:text-purple-400 transition-colors">
                                {tool}
                            </span>
                        ))}
                    </div>
                  </div>

                  {/* Quick Tip */}
                   <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-4 flex items-start gap-3">
                      <Sparkles className="text-blue-400 shrink-0 mt-0.5" size={16} />
                      <p className="text-sm text-blue-100 text-left leading-relaxed">
                          <span className="font-bold text-blue-300">Pro Tip: </span>
                          {careerData?.advice}
                      </p>
                   </div>
                </>
            )}
          </div>

          {/* Retake Button (Inline) */}
          <div className="pt-8 pb-8">
                <button onClick={onRetake} className="text-gray-500 text-sm font-medium hover:text-white transition-colors underline decoration-gray-700 underline-offset-4">
                    Retake Quiz
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};