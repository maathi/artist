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
        <Link to="/artist">
          <img id="logo" src={logo} alt="" />
        </Link>
      </li>
      {userContext.id ? (
        <li>
          <Link to="/new">
            <FaPaintBrush id="brush" />
          </Link>
        </li>
      ) : (
        ""
      )}
      {userContext.id ? (
        <li>
          <img
            id="nav-pic"
            src={`${process.env.REACT_APP_URL}/${userContext.photo}`}
            alt=""
          />

          <Link to={"/@" + userContext.name}>{userContext.name}</Link>
        </li>
      ) : (
        ""
      )}

      {userContext.id ? (
        <li>
          <a onClick={logout}>logout</a>
        </li>
      ) : (
        <li>
          <Link to="/login">login</Link>
        </li>
      )}
    </ul>
  )
}

export default Nav
