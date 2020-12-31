import { useQuery, useMutation, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserType } from "../../schema"
import Card from "../art/card"
import "../../styles/arts.css"

const GET_USER = gql`
  query User($id: Int) {
    user(id: $id) {
      id
      name
      password
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

function User() {
  let [user, setUser] = useState<UserType>()
  let { id }: any = useParams()

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: Number(id) },
  })

  useEffect(() => {
    if (!data) return
    if (!data.user) return

    setUser(data.user)
  }, [data])

  //   const [deleteArt, { data: deletedArtdata }] = useMutation(DELETE_ART)

  if (loading) return <h1>loading...</h1>
  if (error) return <h1>error!</h1>

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      {user ? (
        <div>
          <h4>
            <span style={{ color: "white" }}>{user.name}</span>'s arts :
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
