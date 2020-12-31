import { Link } from "react-router-dom"
import "../../styles/arts.css"
function Card({ j }) {
  return (
    <div className="art">
      <p id="name">{j.name}</p>

      <div className="wrapper">
        <Link to={`/arts/${j.id}`}>
          <img src={`http://localhost:4000/${j.pic}.png`} alt="" />
        </Link>
      </div>

      <span style={{ fontSize: "16px" }}>
        <p>{j.price} M $</p>
        {"  "} by:
        <span style={{ color: "white" }}> {j.owner.name}</span>
      </span>
    </div>
  )
}

export default Card
