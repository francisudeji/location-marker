import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { gql } from 'apollo-boost'
import { MockedProvider } from '@apollo/react-testing'
import { render, waitForElement } from '@testing-library/react'

const mocks = [
  {
    request: {
      query: gql`
        query {
          locations {
            id
            name
            longitude
            latitude
          }
        }
      `
    },
    // error: new Error('Sorry (:')
    result: {
      data: {
        locations: [
          { id: 1, name: 'Oshodi', longitude: 4.6674, latitude: 2.5555 },
          { id: 2, name: 'Mushin', longitude: 3.4425, latitude: 2.4453 }
        ]
      }
    }
  }
]

const CustomComponent = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <App />
  </MockedProvider>
)

describe('App Component', () => {
  it('Renders Root App Component Without Crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CustomComponent />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('Renders Children in the DOM', () => {
    const { getByTestId } = render(<CustomComponent />)
    expect(getByTestId('header-text')).toHaveTextContent(/location marker/i)
  })

  it('Should render loading state initially', () => {
    const { getByTestId } = render(<CustomComponent />)
    expect(getByTestId('loading')).toBeInTheDocument()
  })
})
