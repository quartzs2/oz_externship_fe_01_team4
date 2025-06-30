import Button from '@components/Button'
import Input from '@components/common/Input'
import { useState } from 'react'

type SearchBarProps = {
  onSearch: (keyword: string) => void
  placeholder?: string
}

const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
  const [keyword, setKeyword] = useState('')

  const handleSearch = () => onSearch(keyword.trim())

  return (
    <div className="inline-flex items-center gap-[10px]">
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        wrapClassName="w-[250px]"
      />

      <Button
        children="조회"
        onClick={handleSearch}
        variant="VARIANT2"
        className="w-[70px] text-[14px]"
      />
    </div>
  )
}

export default SearchBar
