import React from 'react'

const Button = ({ onClick, className = '', children }) =>
  <button
    className={className}
    onClick={onClick}
    type='button'>
    {children}
  </button>

export default Button
