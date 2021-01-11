import { useMutation, gql } from "@apollo/client"
import { useState, useEffect } from "react"
import Canvas from "./canvas"
import { HexColorPicker } from "react-colorful"
import "react-colorful/dist/index.css"

const ADD_ART = gql`
  mutation AddArt($name: String, $file: Upload!, $description: String) {
    addArt(name: $name, file: $file, description: $description) {
      id
      name
    }
  }
`

function New() {
  let [art, setArt] = useState()
  let [name, setName] = useState("")
  let [file, setFile] = useState()
  let [description, setDescription] = useState("")
  let [color, setColor] = useState("#000")
  let [lineWidth, setLineWidth] = useState(3)

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
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => {
          {
            setDescription(e.target.value)
          }
        }}
      />
      <Canvas color={color} lineWidth={lineWidth} setFile={setFile}></Canvas>
      <input
        type="range"
        min="1"
        max="60"
        value={lineWidth}
        onChange={(e) => setLineWidth(e.target.value)}
      ></input>
      {lineWidth}
      <HexColorPicker onChange={setColor} />
      <button
        onClick={() => {
          addArt({
            variables: {
              name: name,
              file: file,
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
