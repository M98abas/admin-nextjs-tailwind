import { useState } from 'react'

const Combobox = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredOptions = options.filter((option) =>
    option.titleEn.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectOption = (option) => {
    onSelect(option)
    setSearchTerm('')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder="Search..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-b-md">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectOption(option)}
            >
              {option.titleEn}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Combobox
