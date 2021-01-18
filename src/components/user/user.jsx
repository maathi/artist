import { useQuery, useMutation, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "../../styles/user.css"
import { FaTimesCircle, FaSave } from "react-icons/fa"

const GET_USER = gql`
  query UserByName($name: String) {
    userByName(name: $name) {
      id
      name
      password
      photo
      intro
      arts {
        id
        name
        pic
        owner {
          name
        }
      }
    }
  }
`
const DELETE_ART = gql`
  mutation DeleteArt($id: Int) {
    deleteArt(id: $id) {
      id
      name
    }
  }
`
const UPDATE_PHOTO = gql`
  mutation UpdatePhoto($photo: Upload) {
    updatePhoto(photo: $photo) {
      photo
    }
  }
`

const UPDATE_INTRO = gql`
  mutation UpdateIntro($intro: String) {
    updateIntro(intro: $intro) {
      intro
    }
  }
`
function User() {
  let [user, setUser] = useState()
  let [intro, setIntro] = useState("")
  let [isProfile, setIsProfile] = useState(false)
  let { name } = useParams()

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { name },
  })

  const [updatePhoto, { data: photoData }] = useMutation(UPDATE_PHOTO)
  const [updateIntro, { data: introData }] = useMutation(UPDATE_INTRO)
  const [deleteArt, { data: deletedArtdata }] = useMutation(DELETE_ART)

  useEffect(() => {
    if (!data) return
    if (!data.userByName) return

    setUser(data.userByName)
    setIntro(data.userByName.intro || "")
    if (data.userByName.id == localStorage.getItem("id")) setIsProfile(true)
  }, [data])

  useEffect(() => {
    if (!deletedArtdata) return
    if (!deletedArtdata.deleteArt) return

    let arts = user.arts.filter((a) => a.id != deletedArtdata.deleteArt.id)
    let u = JSON.parse(JSON.stringify(user))
    u.arts = arts
    setUser(u)
  }, [deletedArtdata])

  function handleUpload({
    target: {
      validity,
      files: [photo],
    },
  }) {
    validity.valid && updatePhoto({ variables: { photo } })
  }

  function handleClick() {
    document.getElementById("upload").click()
  }

  function handleDelete(id) {
    deleteArt({ variables: { id: Number(id) } })
  }

  function profileInfo() {
    return (
      <div id="infos">
        <div className="photo-wrapper">
          <img
            src={`http://localhost:4000/${user?.photo}`}
            alt=""
            onClick={handleClick}
          />
        </div>
        <input
          style={{ display: "none" }}
          id="upload"
          type="file"
          onChange={handleUpload}
        />
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          name=""
          id=""
          cols="50"
          placeholder="what's up?"
        ></textarea>
        {intro ? (
          <div>
            <button
              onClick={() => updateIntro({ variables: { intro } })}
              style={{ backgroundColor: "green", color: "white" }}
            >
              <FaSave id="save" />
              save
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    )
  }

  function notProfileInfo() {
    return (
      <div id="infos">
        <div className="photo-wrapper">
          <img src={`http://localhost:4000/${user?.photo}`} alt="" />
        </div>
        <p>{intro}</p>
      </div>
    )
  }

  function card(a) {
    return (
      <div key={a.id} className="card">
        <span id="name">{a.name}</span>

        <div className="wrapper">
          <Link to={`/paintings/${a.id}`}>
            <img src={`http://localhost:4000/${a.pic}.png`} alt="" />
          </Link>
        </div>
        {isProfile ? (
          <div>
            <FaTimesCircle
              id="delete"
              onClick={() => {
                handleDelete(a.id)
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    )
  }

  if (loading) return <h1>loading...</h1>
  if (error) return <h1>error!</h1>

  return (
    <div id="user">
      {isProfile ? profileInfo() : notProfileInfo()}
      <div id="user-arts">
        <h4>
          <span>{user?.name}</span>'s paintings :
        </h4>
        <div className="arts">{user?.arts.map((a) => card(a))}</div>
      </div>
    </div>
  )
}

export default User
