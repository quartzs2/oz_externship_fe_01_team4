import ErrorIcon from "@assets/icons/input/error.svg?react"
import Icon from "@components/Icon";
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
  labelClassName?: string;
  inputClassName?: string;
  wrapClassName?: string;
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
  labelClassName,
  inputClassName,
  wrapClassName
}: InputProps) => {
  
  return (
    <div className={cn('flex items-center', wrapClassName)}>
      {label && (
        <label htmlFor={id} className={cn('text-[14px]', labelClassName)}>
          {label}
        </label>
    )}

      <div className={cn(
        'flex items-center w-[300px] h-[36px] rounded-[3px] pl-[12px] pr-[9px] py-[10px] text-[14px] bg-white border-1 border-[#AAA]',
        {'border-[#FDA29B]': error}, inputClassName)}>

        <input 
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full placeholder-[#AAA] outline-none"
        />

        {error && <Icon icon={ErrorIcon} size={16}/>}

      </div>
    </div>
  );
}

export default Input;