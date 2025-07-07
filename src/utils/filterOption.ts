type Option = { label: string; value: string }

export function filterOption<T>(
  data: T[],
  key: keyof T,
  labelFormatter?: (val: string) => string
): Option[] {
  const values = Array.from(
    new Set(data.map((item) => String(item[key] ?? '')).filter(Boolean))
  )
  return [
    { label: '전체 보기', value: '' },
    ...values.map((val) => ({
      label: labelFormatter ? labelFormatter(val) : val,
      value: val,
    })),
  ]
}
