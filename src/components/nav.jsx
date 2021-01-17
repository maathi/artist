import { Link } from "react-router-dom"
import logo from "../img/artist.png"
import { RiPaintBrushFill } from "react-icons/ri"
import { FaPaintBrush } from "react-icons/fa"
import "../styles/navbar.css"
function Nav(props) {
  function logout() {
    localStorage.clear()
    window.location.href = "/login"
  }

  return (
    <ul id="nav">
      <li>
        <Link to="/paintings">
          <img id="logo" src={logo} alt="" />
        </Link>
      </li>
      <li>
        <Link to="/paintings/new">
          <FaPaintBrush id="brush" />
        </Link>
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

        <Link to={"/@" + localStorage.getItem("name")}>
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
