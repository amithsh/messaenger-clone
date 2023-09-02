"use client ";

import clsx from "clsx";
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "secondary" ;
  children?: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  
  disabled?: boolean;
  fullwidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  danger,
  onClick,
  secondary,
  disabled,
  fullwidth,
}) => {
  return <div>
    <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={clsx(`
    flex
    justify-center
    rounded-md
    px-3
    py-2
    text-sm
    font-semibold
    focus:outline-2
    focus-visible:outline-2
    focus-visible:outline-offset-2
    hover:bg-slate-500
    `,
    disabled && "opacity-50 cursor-default",
    fullwidth && "w-full",
    secondary && "text-slate-600 text-white",
    danger && "bg-rose-600 hover:bg-rose-600 focus-visible:outline-rose-600",
    !danger && !danger && "bg-sky-500 hover:bg-sky-500 focus-visible:outline-sky-500"

    )}
    >
        {children}
    </button>
    </div>
    
};

export default Button;
