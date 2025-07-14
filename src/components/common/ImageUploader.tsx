import React from 'react'
import { cn } from '@utils/cn'

interface ImageUploaderProps {
  preview: string | null
  file: File | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isValid: boolean
  errorMessage?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  preview,
  file,
  onFileChange,
  isValid,
  errorMessage = '이미지 파일은 필수입니다.', // 기본 에러 메시지
}) => {
  return (
    <>
      <div
        className={cn(
          `mt-4 h-[132px] w-[146px] overflow-hidden border border-[#DDD] bg-[#F7F7F7]`,
          `flex items-center justify-center`
        )}
      >
        {preview ? (
          <img
            src={preview}
            alt="미리보기"
            className="max-h-[96px] max-w-[96px] object-contain"
          />
        ) : (
          <span className="text-sm">미리보기 없음</span>
        )}
      </div>

      <div className="mt-1 ml-4 flex items-center gap-5">
        <p className="text-[10px] whitespace-nowrap text-[#666666]">
          96 x 96 사이즈로 등록하세요.
        </p>
        <p className="max-w-[150px] truncate text-sm underline">
          {file && file.name}
        </p>
        {!isValid && <p className="text-sm text-[#CC0A0A]">{errorMessage}</p>}
        <label className="cursor-pointer rounded border border-[#DDDDDD] bg-white px-3 py-1 text-sm">
          파일 첨부
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </label>
      </div>
    </>
  )
}

export default ImageUploader
