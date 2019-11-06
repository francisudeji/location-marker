import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import './styles/index.css'

const dev = process.env.NODE_ENV !== 'production'

export const client = new ApolloClient({
  uri: dev ? 'http://localhost:4000' : "https://limitless-wildwood-72617.herokuapp.com/graphql",
  clientState: {
    defaults: {
      locations: [{}]
    },
    typeDefs: `
      type Location {
        id: ID
        name: String
        latitude: Float
        longitude: Float
      }

      type Query {
        locations: [Location]
      }
    `
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
