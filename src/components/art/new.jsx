import { useMutation, gql, useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import Canvas from "./canvas"

const ADD_ART = gql`
  mutation AddArt(
    $name: String
    $owner_id: Int
    $file: Upload!
    $price: Int
    $description: String
  ) {
    addArt(
      name: $name
      owner_id: $owner_id
      file: $file
      price: $price
      description: $description
    ) {
      id
      name
    }
  }
`
const UPLOAD_FILE = gql`
  mutation Upload($file: Upload!) {
    upload(file: $file)
  }
`
const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
    }
  }
`

function New() {
  let [art, setArt] = useState()
  let [name, setName] = useState("")
  let [file, setFile] = useState()
  let [price, setPrice] = useState("")
  let [description, setDescription] = useState("")

  const [addArt, { data }] = useMutation(ADD_ART)

  useEffect(() => {
    if (!data) return
    if (!data.addArt) return
    setArt(data.addArt)
  }, [data])

  return (
    <div>
      <h2>add a new painting!</h2>
      <input
        placeholder="name"
        value={name}
        onChange={(e) => {
          {
            setName(e.target.value)
          }
        }}
      />
      <input
        placeholder="price"
        value={price}
        onChange={(e) => {
          {
            setPrice(e.target.value)
          }
        }}
      />
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => {
          {
            setDescription(e.target.value)
          }
        }}
      />
      <Canvas setFile={setFile}></Canvas>

      <button
        onClick={() => {
          addArt({
            variables: {
              name: name,
              owner_id: Number(localStorage.getItem("id")),
              file: file,
              price: Number(price),
              description: description,
            },
          })
        }}
      >
        create
      </button>
      {art ? <p>{art.name} was added!</p> : ""}
    </div>
  )
}

export default New
