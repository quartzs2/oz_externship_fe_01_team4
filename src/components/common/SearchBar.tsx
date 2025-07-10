import Button from '@components/common/Button'
import Input from '@components/common/Input'
import { useState } from 'react'

type SearchBarProps = {
  onSearch: (keyword: string) => void
  placeholder?: string
}

const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
  const [input, setInput] = useState('')

  const handleSearch = () => {
    onSearch(input.trim())
    setInput('')
  }

  return (
    <div className="inline-flex items-center gap-[10px]">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
        placeholder={placeholder}
        wrapClassName="w-[250px]"
      />

      <Button onClick={handleSearch} variant="VARIANT6" className="w-[70px]">
        조회
      </Button>
    </div>
  )
}

export default SearchBar
