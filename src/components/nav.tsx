import { Link } from "react-router-dom"
import logo from "../img/artist.png"
import "../styles/navbar.css"
function Nav() {
  return (
    <div id="nav">
      {/* <p style={{ color: "white" }}>
        {localStorage.getItem("id")}. {localStorage.getItem("name")}
      </p> */}
      {/* <img src={logo} alt="" /> */}
      <Link to="/register">register</Link>
      <Link to="/login">login</Link>
      <Link to={"/users/" + localStorage.getItem("id")}>
        {localStorage.getItem("name")}
      </Link>
      <Link to="/arts">arts</Link>
      <Link to="/arts/new">+</Link>
    </div>
  )
}

export default Nav
