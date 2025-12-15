import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyle = "py-4 px-8 rounded-full font-black text-lg transition-all transform active:scale-95 shadow-[0_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.3)] hover:translate-y-[2px]";
  
  const variants = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-yellow-400",
    secondary: "bg-blue-600 text-white hover:bg-blue-500 border-2 border-blue-600",
    outline: "bg-transparent text-white border-2 border-white hover:bg-white/10"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};