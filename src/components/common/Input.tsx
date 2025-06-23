import { cn } from "@utils/cn";
import React from "react";

// input 컴포넌트 props 타입 정의
type InputProps = {
  label?: string;
  id: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
};

const Input = ({
  label,
  id,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  className
}: InputProps) => {
  
  return (
    <div className="flex items-center">
      {label && <label htmlFor={id} className="text-[14px]">{label}</label>}

      <div className={cn('flex items-center w-[300px] h-[36px] rounded-[3px] pl-[12px] pr-[9px] py-[10px] text-[14px] bg-white border-1 border-[#AAA]', {'border-[#FDA29B]': error}, className)}>

        <input 
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full placeholder-[#AAA] outline-none"
        />

        {error && <span className="w-[16px] h-[16px] text-[#FDA29B] text-center">!</span>}

      </div>
    </div>
  );
}

export default Input;