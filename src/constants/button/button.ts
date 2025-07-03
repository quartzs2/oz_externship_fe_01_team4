const BASE_STYLE = 'h-[36px] w-[55px] text-[14px]'

export const BUTTON_VARIANTS = {
  VARIANT1: `${BASE_STYLE} bg-[#522193] text-[#FFFFFF]`,
  VARIANT2: `${BASE_STYLE} bg-[#86838B] text-[#FFFFFF]`,
  VARIANT3: `${BASE_STYLE} bg-[#FFFFFF] text-[#666666]`,
  VARIANT4: `${BASE_STYLE} bg-[#CC0A0A] text-[#FFFFFF]`,
  VARIANT5:
    ' bg-[#5EB669] text-[#FFFFFF] h-[26px] w-[50px] text-[12px] leading-none',
  VARIANT6: 'bg-[#86838B] text-[#FFFFFF] h-[36px] w-[79px] text-[14px]',
  VARIANT7: 'bg-[#F3EEFF] text-[#522193] w-[55px] h-[36px] text-[14px]',
  VARIANT8:
    'flex items-center justify-between bg-[#F3EEFF] text-[#522193] h-[36px] w-[135px] text-[14px] px-[12px]',
} as const

export const DEFAULT_BUTTON_VARIANT = 'VARIANT1'
