import { Link } from "react-router-dom"
import "../../styles/arts.css"
import "../../styles/card.css"

function Card({ j }) {
  return (
    <div className="card">
      <span id="name">{j.name}</span>

      <div className="wrapper">
        <Link to={`/paintings/${j.id}`}>
          <img src={`http://localhost:4000/${j.pic}.png`} alt="" />
        </Link>
      </div>

      <div id="user-info">
        <Link to={`/users/${j.owner.id}`} style={{ color: "white" }}>
          {j.owner.name}
        </Link>

        <Link to={`/users/${j.owner.id}`}>
          <img
            src={`http://localhost:4000/${j.owner.photo}`}
            alt=""
            style={{ height: "1.4rem" }}
          />
        </Link>
      </div>
    </div>
  )
}

export default Card
