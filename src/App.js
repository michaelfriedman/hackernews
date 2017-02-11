import React, { Component } from 'react'
import Search from './components/Search'
import Table from './components/Table'
import Button from './components/Button'
import Loading from './components/Loading'
import ButtonWithLoading from './components/ButtonWithLoading'
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
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
    this.onSort = this.onSort.bind(this)
  }

  componentDidMount () {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  fetchSearchTopStories (searchTerm, page) {
    this.setState({ isLoading: true })
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }

  needsToSearchTopStories (searchTerm) {
    return !this.state.results[searchTerm]
  }

  onSearchSubmit (event) {
    event.preventDefault()
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
    }
  }

  setSearchTopStories (result) {
    const { hits, page } = result
    const { searchKey, results } = this.state

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : []

    const updatedHits = [...oldHits, ...hits]

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
    })
  }

  onSearchChange (event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  onDismiss (id) {
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]
    const isNotId = item => item.objectID !== id
    const updatedHits = hits.filter(isNotId)
    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page
        }
      }
    })
  }

  onSort (sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
    this.setState({ sortKey, isSortReverse })
  }

  render () {
    const {
      searchTerm,
      results,
      searchKey,
      isLoading,
      isSortReverse,
      sortKey
    } = this.state
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || []

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
        <Table
          isSortReverse={isSortReverse}
          list={list}
          onDismiss={this.onDismiss}
          onSort={this.onSort}
          sortKey={sortKey}
        />
        <div className='interactions'>
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </ButtonWithLoading>
        </div>
      </div>
    )
  }
}

export default App

export {
  Button,
  Search,
  Table,
  Loading,
  ButtonWithLoading
}
