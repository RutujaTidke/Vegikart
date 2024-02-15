import React from 'react'
import { IoIosSearch } from 'react-icons/io';

const Search = () => {
  return (
   
<div className="flex bg-gray-200 group space-x-4 w-30 group-focus:border-gray-400 border items-center pr-10 border-gray-400 rounded-full px-2">
        <label htmlFor="search" className="">
          <IoIosSearch className="text-lg text-gray-400" />
        </label>
        <input
          type="search"
          name="search"
          id="search"
          className="bg-gray-100 hover:bg-transparent focus:bg-transparent placeholder:text-sm px-2 py-1 outline-none w-full rounded-sm transition"
          placeholder="Search"
        />
      </div>

  )
}

export default Search