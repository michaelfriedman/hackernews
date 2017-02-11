import React, { Component } from 'react'
import list from './list'
import Search from './components/Search'
import Table from './components/Table'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      list,
      searchTerm: ''
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onDismiss (id) {
    const isNotId = item => item.objectID !== id
    const updatedList = this.state.list.filter(isNotId)
    this.setState({ list: updatedList })
  }

  onSearchChange (event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render () {
    const { searchTerm, list } = this.state
    return (
      <div className='page'>
        <div className='interactions'>
          <Search
            onChange={this.onSearchChange}
            value={searchTerm}>
            Search
          </Search>
        </div>
        <Table
          list={list}
          onDismiss={this.onDismiss}
          pattern={searchTerm}
        />
      </div>
    )
  }
}

export default App
