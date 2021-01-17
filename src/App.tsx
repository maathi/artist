import React from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Arts from "./components/art/arts"
import Art from "./components/art/art"
import New from "./components/art/new"
import User from "./components/user/user"
import Register from "./components/user/register"
import Login from "./components/user/login"
import Nav from "./components/nav.jsx"

function App() {
  return (
    <Router>
      <div className="App">
        {localStorage.getItem("id") ? <Nav></Nav> : ""}
        <Switch>
          <Route path="/@:name">
            <User></User>
          </Route>
          <Route path="/paintings/new">
            <New></New>
          </Route>
          <Route path="/paintings/:id">
            <Art></Art>
          </Route>
          <Route path="/paintings">
            <Arts></Arts>
          </Route>
          <Route path="/users/:id">
            <User></User>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
