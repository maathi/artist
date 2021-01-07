import { Link } from "react-router-dom"
import logo from "../img/artist.png"

import "../styles/navbar.css"
function Nav(props) {
  function logout() {
    localStorage.clear()
    window.location.href = "/login"
  }

  return (
    <ul id="nav">
      <li>
        <img id="logo" src={logo} alt="" />
      </li>
      <li>
        <Link to="/paintings/new">+</Link>
      </li>
      <li>
        <Link to="/paintings">paintings</Link>
      </li>
      <li>
        <img
          id="nav-pic"
          src={`http://localhost:4000/${localStorage.getItem("photo")}`}
          alt=""
        />

        <Link to={"/users/" + localStorage.getItem("id")}>
          {localStorage.getItem("name")}
        </Link>
      </li>
      <li>
        <a onClick={logout}>logout</a>
      </li>
    </ul>
  )
}

export default Nav
