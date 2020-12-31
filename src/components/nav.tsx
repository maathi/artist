import { Link } from "react-router-dom"

function Nav() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <p style={{ color: "white" }}>
        {localStorage.getItem("id")}. {localStorage.getItem("name")}
      </p>
      <Link to="/arts">
        <button>arts</button>
      </Link>
      <Link to="/arts/new">
        <button>new</button>
      </Link>
      <Link to={"/users/" + localStorage.getItem("id")}>
        <button>profile</button>
      </Link>
      <Link to="/login">
        <button>login</button>
      </Link>
      <Link to="/register">
        <button>register</button>
      </Link>
    </div>
  )
}

export default Nav
