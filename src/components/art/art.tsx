import { useQuery, gql, useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArtType } from "../../schema"
import { Link } from "react-router-dom"

const GET_ART = gql`
  query Art($id: Int) {
    art(id: $id) {
      id
      name
      pic
      description
      owner {
        id
        name
      }
    }
  }
`

function Art() {
  let [art, setArt] = useState<ArtType>()
  let { id }: any = useParams()

  const { loading, error, data } = useQuery(GET_ART, {
    variables: { id: Number(id) },
  })

  useEffect(() => {
    if (!data) return
    console.log(data)

    if (!data.art) return
    setArt(data.art)
    console.log("my arts", art)
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <p>{art?.name}</p>
      <img
        src={`${process.env.REACT_APP_URL}/${art?.pic}.png`}
        style={{
          backgroundColor: "rgb(209, 209, 209)",
          border: "3px solid black",
        }}
        alt=""
      />

      <p style={{ fontSize: "18px" }}>
        <span>Created by : </span>
        <Link to={`/@${art?.owner.name}`} style={{ color: "white" }}>
          {art?.owner.name}
        </Link>
      </p>
      <p style={{ fontSize: "18px" }}>
        <span>Description :</span>
        <span style={{ color: "white" }}> {art?.description}</span>
      </p>
    </div>
  )
}

export default Art
