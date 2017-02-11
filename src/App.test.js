import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import App, { Search, Button, Table, Loading, ButtonWithLoading } from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

test('snapshots', () => {
  const component = renderer.create(
    <App />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('Search', () => {
  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search>Search</Search>, div)
  })
  test('snapshots', () => {
    const component = renderer.create(
      <Search>Search</Search>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Button', () => {
  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button>More</Button>, div)
  })
  test('snapshots', () => {
    const component = renderer.create(
      <Button>More</Button>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Loading', () => {
  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Loading />, div)
  })
  test('snapshots', () => {
    const component = renderer.create(
      <Loading />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
describe('ButtonWithLoading', () => {
  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ButtonWithLoading />, div)
  })
  test('snapshots', () => {
    const component = renderer.create(
      <ButtonWithLoading />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' }
    ]
  }
  it('shows two items in list', () => {
    const element = shallow(
      <Table {...props} />
    )
    expect(element.find('.table-row').length).toBe(2)
  })
  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Table {...props} />, div)
  })
  test('snapshots', () => {
    const component = renderer.create(
      <Table {...props} />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
