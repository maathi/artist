import { useQuery, useMutation, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserType } from "../../schema"
import Card from "../art/card"
import "../../styles/arts.css"
import "../../styles/user.css"
const GET_USER = gql`
  query User($id: Int) {
    user(id: $id) {
      id
      name
      password
      photo
      arts {
        id
        name
        pic
        price
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
  mutation UpdatePhoto($id: Int, $photo: Upload) {
    updatePhoto(id: $id, photo: $photo) {
      photo
    }
  }
`
function User() {
  let [user, setUser] = useState()
  let { id } = useParams()

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: Number(id) },
  })

  const [updatePhoto, { photoData }] = useMutation(UPDATE_PHOTO)

  useEffect(() => {
    if (!data) return
    if (!data.user) return

    setUser(data.user)
  }, [data])

  //   const [deleteArt, { data: deletedArtdata }] = useMutation(DELETE_ART)

  function handleUpload({
    target: {
      validity,
      files: [photo],
    },
  }) {
    validity.valid && updatePhoto({ variables: { id: Number(id), photo } })
  }

  function handleClick() {
    document.getElementById("upload").click()
  }

  if (loading) return <h1>loading...</h1>
  if (error) return <h1>error!</h1>

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      {user ? (
        <div id="user">
          <div className="photo-wrapper">
            <img
              src={`http://localhost:4000/${user.photo}`}
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
          <h4>
            <span style={{ color: "white" }}>{user.name}</span>'s paintings :
          </h4>
          <div className="arts">
            {user.arts.map((j) => (
              <Card key={j.id} j={j}></Card>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default User
