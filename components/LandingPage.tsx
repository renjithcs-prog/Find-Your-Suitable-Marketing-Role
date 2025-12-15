import React from 'react';
import { Button } from './Button';
import { Clock } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-screen relative overflow-hidden bg-gradient-to-br from-[#001e4d] via-[#004cb3] to-[#001e4d] font-sans text-white">
      
      {/* Background Glow effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[0%] right-[-10%] w-[60%] h-[50%] bg-cyan-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="p-6 pt-8 z-10 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-800 font-extrabold text-xl shadow-lg">E</div>
           <span className="font-bold text-2xl tracking-tight drop-shadow-md">entri</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 z-10 relative">
        
        {/* Centered Content */}
        <div className="flex-1 flex flex-col justify-center items-center w-full max-w-lg mx-auto">
            {/* Typography Hero */}
            <div className="space-y-6 mb-10 relative text-center">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-lg text-white">
                  Confused on choosing the <br/>
                  perfect Digital Marketing role?
                </h1>
            </div>

            {/* Value Prop Badge */}
            <div className="bg-white text-blue-900 rounded-full py-3 pl-3 pr-8 flex items-center gap-4 w-fit mx-auto shadow-2xl transform rotate-1 transition-transform hover:rotate-0 hover:scale-105 duration-300">
                <div className="shrink-0 bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Clock size={24} className="text-blue-700" />
                </div>
                <p className="font-bold text-base leading-tight">
                    This <span className="text-red-600 font-extrabold">60-second test</span><br/> gives instant clarity.
                </p>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-8 pt-6 space-y-6 w-full max-w-lg mx-auto shrink-0">
            <Button fullWidth onClick={onStart} className="!bg-yellow-400 !text-black !font-black !text-xl !py-5 !rounded-xl shadow-2xl hover:!scale-[1.02] active:!scale-95 flex items-center justify-center gap-2 border-none uppercase tracking-wide">
                Find My Perfect Role
            </Button>
            
            <div className="text-center">
                <button className="text-xs text-blue-200/80 font-medium underline hover:text-white transition-colors">
                    Learn in Malayalam
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};