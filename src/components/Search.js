import React from 'react'

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input
      onChange={onChange}
      type='text'
      value={value}
      />
    <button type='submit'>
      {children}
    </button>
  </form>

export default Search
