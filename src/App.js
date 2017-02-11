import React, { Component } from 'react'
import Search from './components/Search'
import Table from './components/Table'
import Button from './components/Button'
import './App.css'

const DEFAULT_QUERY = 'redux'
const DEFAULT_PAGE = 0
const DEFAULT_HPP = '100'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.setSearchTopstories = this.setSearchTopstories.bind(this)
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this)
  }

  componentDidMount () {
    const { searchTerm } = this.state
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE)
  }

  fetchSearchTopstories (searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(result => this.setSearchTopstories(result))
  }

  onSearchSubmit (event) {
    event.preventDefault()
    const { searchTerm } = this.state
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE)
  }

  setSearchTopstories (result) {
    const { hits, page } = result

    const oldHits = page !== 0
      ? this.state.result.hits
      : []

    const updatedHits = [...oldHits, ...hits]

    this.setState({
      result: { hits: updatedHits, page }
    })
  }

  onSearchChange (event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  onDismiss (id) {
    const isNotId = item => item.objectID !== id
    const updatedHits = this.state.result.hits.filter(isNotId)
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    })
  }

  render () {
    const { searchTerm, result } = this.state
    const page = (result && result.page) || 0
    return (
      <div className='page'>
        <div className='interactions'>
          <Search
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            value={searchTerm}>
            Search
          </Search>
        </div>
        { result &&
          <Table
            list={result.hits}
            onDismiss={this.onDismiss}
        /> }
        <div className='interactions'>
          <Button onClick={() => this.fetchSearchTopstories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    )
  }
}

export default App
