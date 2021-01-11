import React from "react"
import ReactDOM from "react-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  ApolloProvider,
  concat,
} from "@apollo/client"
import App from "./App"
import { createUploadLink } from "apollo-upload-client"

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null,
    },
  })

  return forward(operation)
})

const upoloadLink = createUploadLink({ uri: "http://localhost:4000/graphql" })
const client = new ApolloClient({
  link: concat(authMiddleware, upoloadLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: { authorization: "dandandooooooooo" },
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
