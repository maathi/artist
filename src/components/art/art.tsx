import { useQuery, gql, useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArtType } from "../../schema"

const GET_ART = gql`
  query Art($id: Int) {
    art(id: $id) {
      id
      name
      pic
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
        src={`http://localhost:4000/${art?.pic}.png`}
        style={{ backgroundColor: "rgb(209, 209, 209)" }}
        alt=""
      />
      <p style={{ fontSize: "16px" }}>
        {"  "}owned by:
        <span style={{ color: "white" }}> {art?.owner.name}</span>
      </p>
    </div>
  )
}
export default Art
