import { useQuery, gql, useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import { ArtType } from "../../schema"
import Card from "./card"
import "../../styles/arts.css"
const GET_ARTS = gql`
  query {
    arts {
      id
      name
      pic
      price
      owner {
        id
        name
      }
    }
  }
`

function Arts() {
  let [arts, setArts] = useState<ArtType[]>()
  const { loading, error, data } = useQuery(GET_ARTS)

  useEffect(() => {
    if (!data) return
    console.log(data)

    if (!data.arts) return
    setArts(data.arts)
    console.log("my arts", arts)
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className="arts">
      {arts?.map((j) => (
        <Card key={j.id} j={j}></Card>
      ))}
    </div>
  )
}

export default Arts
