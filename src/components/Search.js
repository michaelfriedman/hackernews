import React from 'react'

const Search = ({ value, onChange, children }) =>
  <form>
    {children}
    <input
      onChange={onChange}
      type='text'
      value={value}
      />
  </form>

export default Search
