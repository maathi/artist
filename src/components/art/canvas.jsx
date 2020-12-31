import { useState, useEffect } from "react"
import { setTextRange } from "typescript"

export default function Canvas(props) {
  let [p, setP] = useState()
  let [ctx, setCtx] = useState()
  let [canvas, setCanvas] = useState()
  let [mouse, setMouse] = useState("up")

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
