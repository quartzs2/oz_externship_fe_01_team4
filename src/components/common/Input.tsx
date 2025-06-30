import ErrorIcon from '@assets/icons/input/error.svg?react'
import Icon from '@components/common/Icon'
import { cn } from '@utils/cn'
import React from 'react'

// input 컴포넌트 props 타입 정의
type InputProps = {
  id?: string
  type?: string
  name?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  wrapClassName?: string
  min?: number
}

const Input = ({
  id,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  wrapClassName,
  min,
}: InputProps) => {
  return (
    <div
      className={cn(
        'flex h-[36px] w-[300px] items-center rounded-[3px] border-1 border-[#DDD] bg-white py-[10px] pr-[9px] pl-[12px] text-[14px]',
        { 'border-[#FDA29B]': error },
        wrapClassName
      )}
    >
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        className="w-full placeholder-[#666] outline-none"
      />

      {error && <Icon icon={ErrorIcon} size={16} />}
    </div>
  )
}

export default Input
