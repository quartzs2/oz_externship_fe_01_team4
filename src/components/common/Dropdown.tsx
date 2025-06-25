import { useState } from 'react';
import { cn } from '@utils/cn';
import ArrowIcon from '@assets/icons/input/arrow.svg?react';
import CheckIcon from '@assets/icons/input/check.svg?react';

type Option = {
  label: string;
  value: string;
}

type DropdownProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  wrapClassName?: string;
  buttonClassName?: string;
};

const Dropdown = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  wrapClassName,
  buttonClassName
}: DropdownProps) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selected: string) => {
    onChange(selected);
    setIsOpen(false);
  }

  const selectedLabel = options.find((op) => op.value === value)?.label ||placeholder || options[0].label;

  return (
    <div className={cn('flex flex-col gap-[2px] w-[300px]', wrapClassName)}>

      <button 
        id={id}
        name={name}
        value={value}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center justify-between w-full h-[36px] py-[10px] pl-[12px] pr-[10px] border-1 border-[#DDD] rounded-[4px] bg-white outline-none cursor-pointer ', buttonClassName)}
      >
        <span className='text-[14px] text-[#666]'>
          {selectedLabel}
        </span>
        <ArrowIcon width={12} height={16}/>
      </button>
      
      {isOpen && (
        <ul className='flex flex-col w-[300px] max-h-[175px] border-1 border-[#DDD] rounded-[3px] bg-white text-[16px] font-[500] text-[#666] cursor-pointer overflow-y-auto custom-scroll custom-shadow overflow-visible]'>
          {options.map((op) => {
            const isSelected = op.value === value;

            return (
              <li 
                key={op.value} 
                onClick={() => handleSelect(op.value)}
                className={cn(
                  'flex justify-between py-[10px] px-[14px]', 
                  {'bg-[#f2effd] ': isSelected}
                )}
              >
                {op.label}
                {isSelected && <CheckIcon />}
              </li>
            );
          })}
        </ul>
      )}   
    </div>
  );
}

export default Dropdown