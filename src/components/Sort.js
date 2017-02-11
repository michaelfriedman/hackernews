import React from 'react'
import Button from './Button'
import classNames from 'classnames'

const Sort = ({
  activeSortKey,
  sortKey,
  onSort,
  children
}) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  )

  return (
    <Button
      className={sortClass}
      onClick={() => onSort(sortKey)}>
      {children}
    </Button>
  )
}

export default Sort
