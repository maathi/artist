import { Link } from "react-router-dom"
import logo from "../img/artist.png"
import { RiPaintBrushFill } from "react-icons/ri"
import { FaPaintBrush } from "react-icons/fa"
import "../styles/navbar.css"
import { useContext } from "react"
import UserContext from "../userContext"

function Nav(props) {
  const userContext = useContext(UserContext)

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
          src={`${process.env.REACT_APP_URL}/${userContext.photo}`}
          alt=""
        />

        <Link to={"/@" + userContext.name}>{userContext.name}</Link>
      </li>
      <li>
        <a onClick={logout}>logout</a>
      </li>
    </ul>
  )
}

export default Nav
