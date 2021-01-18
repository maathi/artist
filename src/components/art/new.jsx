import { useMutation, gql } from "@apollo/client"
import { useState, useEffect } from "react"
import Canvas from "./canvas"
import { HexColorPicker } from "react-colorful"
import "react-colorful/dist/index.css"
import { useFormik } from "formik"
import * as Yup from "yup"

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
  // let [name, setName] = useState("")
  // let [description, setDescription] = useState("")
  let [file, setFile] = useState()
  let [color, setColor] = useState("#000")
  let [lineWidth, setLineWidth] = useState(3)

  const [addArt, { data }] = useMutation(ADD_ART)

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "name must be at least 3 characters long")
        .required("Required"),
      description: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      addArt({
        variables: {
          name: values.name,
          file: file,
          description: values.description,
        },
      })
    },
  })

  useEffect(() => {
    if (!data) return
    if (!data.addArt) return
    setArt(data.addArt)
  }, [data])

  return (
    <div>
      <h2>add a new painting!</h2>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <input
          name="name"
          placeholder="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="error">
          {formik.touched.name && formik.errors.name
            ? formik.errors.name
            : null}
        </div>
        <textarea
          name="description"
          placeholder="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="error">
          {formik.touched.description && formik.errors.description
            ? formik.errors.description
            : null}
        </div>
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
        <button type="submit">create</button>
      </form>
      {art ? <p>{art.name} was added!</p> : ""}
    </div>
  )
}

export default New
