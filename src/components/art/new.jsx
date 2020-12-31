import { useMutation, gql, useQuery } from "@apollo/client"
import { mainModule } from "process"
import { useState, useEffect } from "react"
import { updateSourceFile } from "typescript"
import { ArtType } from "../../schema"

const ADD_ART = gql`
  mutation AddArt($name: String, $owner_id: Int, $file: Upload!, $price: Int) {
    addArt(name: $name, owner_id: $owner_id, file: $file, price: $price) {
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

  const [addArt, { data }] = useMutation(ADD_ART)

  useEffect(() => {
    if (!data) return
    if (!data.addArt) return
    setArt(data.addArt)
  }, [data])

  function handleCreate() {}

  return (
    <div>
      <h2>create your art!</h2>
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
      <Canvas setFile={setFile}></Canvas>

      <button
        onClick={() => {
          addArt({
            variables: {
              name: name,
              owner_id: Number(localStorage.getItem("id")),
              file: file,
              price: Number(price),
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

function Canvas(props) {
  let [p, setP] = useState()
  let [ctx, setCtx] = useState()
  let [canvas, setCanvas] = useState()
  let [mouse, setMouse] = useState("up")

  const [upload, { data }] = useMutation(SINGLE_UPLOAD_MUTATION)

  useEffect(() => {
    let canvas = document.getElementById("canvas")
    setCanvas(canvas)
    let ctx = canvas.getContext("2d")
    setCtx(ctx)
  }, [])

  useEffect(() => {
    if (!ctx) return

    if (mouse == "up") {
      ctx.moveTo(p?.x, p?.y)
      return
    }

    ctx.lineTo(p?.x, p?.y)
    ctx.strokeStyle = "#000"
    ctx.stroke()
  }, [p])

  function handleMouseMove(e) {
    var rect = canvas.getBoundingClientRect()
    setP({
      x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    })
  }

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1])

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length)

    // create a view into the buffer
    var ia = new Uint8Array(ab)

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString })

    return blob
  }

  function handleMouseUp() {
    setMouse("up")
    let data = canvas.toDataURL()
    let file = dataURItoBlob(data)
    props.setFile(file)
  }

  return (
    <div>
      <canvas
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseDown={() => setMouse("down")}
        onMouseUp={() => handleMouseUp()}
        onMouseLeave={() => setMouse("up")}
        id="canvas"
        width="600px"
        height="400px"
        style={{
          border: "1px solid black",
          display: "block",
          margin: "auto",
          backgroundColor: "#eee",
          cursor: "cell",
        }}
      ></canvas>
    </div>
  )
}

export default New
