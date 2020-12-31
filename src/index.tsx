import React from "react"
import ReactDOM from "react-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import App from "./App"
import { createUploadLink } from "apollo-upload-client"

const client = new ApolloClient({
  link: createUploadLink({ uri: "http://localhost:4000/graphql" }),

  cache: new InMemoryCache(),
  connectToDevTools: true,
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
