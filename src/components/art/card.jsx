import { Link } from "react-router-dom"
import "../../styles/arts.css"
function Card({ j }) {
  return (
    <Link to={`/arts/${j.id}`} className="art">
      <p id="name">{j.name}</p>
      <div className="wrapper">
        <img src={`http://localhost:4000/${j.pic}.png`} alt="" />
      </div>
      <span style={{ fontSize: "16px" }}>
        {"  "}owned by:
        <span style={{ color: "red" }}> {j.owner.name}</span>
        <p>{j.price}</p>
      </span>
    </Link>
  )
}

export default Card
