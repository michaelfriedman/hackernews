import React from 'react'
import Button from './Button'

const largeColumn = { width: '40%' }
const midColumn = { width: '30%' }
const smallColumn = { width: '10%' }

const isSearched = searchTerm => item => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())

const Table = ({ list, pattern, onDismiss }) =>
  <div className='table'>
    {
      list.filter(isSearched(pattern)).map(item =>
        <div className='table-row' key={item.objectID}>
          <span style={largeColumn}>
            <a href={item.url}>
              {item.title}
            </a>
          </span>
          <span style={midColumn}>{item.author}</span>
          <span style={smallColumn}>{item.num_comments}</span>
          <span style={smallColumn}>{item.points}</span>
          <span style={smallColumn}>
            <Button
              className='button-inline'
              onClick={() => onDismiss(item.objectID)}>
              Dismiss
            </Button>
          </span>
        </div>)
    }
  </div>

export default Table
