import React, { useState } from 'react';
import { Button } from './Button';
import { User, Phone, Globe, Briefcase, Loader2 } from 'lucide-react';
import { submitToGoogleSheet } from '../services/sheetService';
import { UtmParams } from '../types';

interface SignupData {
  name: string;
  phone: string;
  language: string;
}

interface SignupFormProps {
  onComplete: (data: SignupData) => void;
  utmParams: UtmParams;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onComplete, utmParams }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('Malayalam');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
        setError('Please enter your full name');
        return;
    }
    
    // Strict Phone Validation
    const cleanedPhone = phone.replace(/\D/g, '');

    // 1. Check Length (Must be 10 digits for Indian mobile numbers)
    if (cleanedPhone.length !== 10) {
        setError('Please enter a valid 10-digit mobile number');
        return;
    }

    // 2. Check first digit (Cannot start with 0)
    if (cleanedPhone.startsWith('0')) {
        setError('Phone number cannot start with 0');
        return;
    }

    // 3. Check for obvious dummy numbers
    // Check if all digits are the same (e.g., 9999999999)
    if (/^(\d)\1+$/.test(cleanedPhone)) {
        setError('Please enter a valid mobile number');
        return;
    }

    // Check for sequential patterns
    if (cleanedPhone === '1234567890' || cleanedPhone === '9876543210') {
         setError('Please enter a valid mobile number');
         return;
    }

    setIsSubmitting(true);
    setError('');

    // Merge user input with UTM parameters
    const submissionData = { 
      name, 
      phone: cleanedPhone, // Send the cleaned 10-digit number
      language,
      ...utmParams
    };

    // Send to Google Sheet
    await submitToGoogleSheet(submissionData);

    setIsSubmitting(false);
    onComplete({ name, phone: cleanedPhone, language });
  };

  return (
    <div className="flex flex-col h-full min-h-screen w-full max-w-md mx-auto p-6 justify-center">
      <div className="slide-in space-y-8">
        <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-400/10 mb-6 animate-pulse ring-1 ring-yellow-400/30">
                <Briefcase className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" size={40} />
            </div>
            <h2 className="text-3xl font-black text-white leading-tight">Your Career Path is Ready!</h2>
            <p className="text-gray-400 max-w-[90%] mx-auto font-medium leading-relaxed">
              Unlock your personalized Career Blueprint: Your <span className="text-yellow-400 font-black tracking-wide uppercase">Perfect Role</span>, <span className="text-yellow-400 font-black tracking-wide uppercase">Salary Potential</span> & The <span className="text-yellow-400 font-black tracking-wide uppercase">TOOLS</span> You Need To Master.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1">Full Name</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 focus:border-yellow-400 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 outline-none transition-all"
                        placeholder="Enter your name"
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1">Phone Number</label>
                <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
                    <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => {
                            // Only allow digits to be typed
                            const val = e.target.value;
                            if (val === '' || /^[0-9]+$/.test(val)) {
                                setPhone(val);
                            }
                        }}
                        maxLength={10}
                        className="w-full bg-gray-900 border border-gray-700 focus:border-yellow-400 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 outline-none transition-all"
                        placeholder="Enter 10-digit mobile number"
                        disabled={isSubmitting}
                    />
                </div>
            </div>

             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1">Preferred Language</label>
                <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 focus:border-yellow-400 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition-all appearance-none cursor-pointer"
                        disabled={isSubmitting}
                    >
                        <option value="Malayalam">Malayalam</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
            
            {error && <p className="text-red-500 text-sm text-center font-bold bg-red-500/10 py-2 rounded-lg">{error}</p>}

            <Button fullWidth type="submit" disabled={isSubmitting} className="mt-2 !text-xl !py-4 shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span>Unlocking...</span>
                  </>
                ) : (
                  "Unlock Result 🔓"
                )}
            </Button>
        </form>
        
        <div className="text-center space-y-2">
             <p className="text-xs text-gray-600">
                Join 10,000+ students finding their path.
            </p>
        </div>
      </div>
    </div>
  );
};