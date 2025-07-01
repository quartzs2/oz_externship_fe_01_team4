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
<<<<<<< HEAD         
          if (e.key === 'Enter') handleSearch()
        }}
=======
        if (e.key === 'Enter') handleSearch()}
        }
>>>>>>> 0f48f5ba8188a768f1925aae90a5ff820b14bfb3
        placeholder={placeholder}
        wrapClassName="w-[250px]"
      />

      <Button
        children="조회"
        onClick={handleSearch}
<<<<<<< HEAD
        variant="VARIANT6"
        className="w-[70px]"
=======
        variant="VARIANT2"
        className="w-[70px] text-[14px]"
>>>>>>> 0f48f5ba8188a768f1925aae90a5ff820b14bfb3
      />
    </div>
  )
}

export default SearchBar