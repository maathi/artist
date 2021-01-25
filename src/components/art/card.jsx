import { Link } from "react-router-dom"
import "../../styles/arts.css"
import "../../styles/card.css"
import { FaRegHeart } from "react-icons/fa"
function Card({ j }) {
  return (
    <div className="card">
      <span id="name">{j.name}</span>

      <div className="wrapper">
        <Link to={`/${j.id}`}>
          <img src={`${process.env.REACT_APP_URL}/${j.pic}.png`} alt="" />
        </Link>
      </div>

      <div id="bottom">
        <FaRegHeart id="heart" />
        <div id="user-info">
          <Link to={`/@${j.owner.name}`} style={{ color: "white" }}>
            {j.owner.name}
          </Link>

          <Link to={`/@${j.owner.name}`}>
            <img
              src={`${process.env.REACT_APP_URL}/${j.owner.photo}`}
              alt=""
              style={{ height: "1.4rem" }}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
