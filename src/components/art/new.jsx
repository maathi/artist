import { useMutation, gql } from "@apollo/client"
import { useState, useEffect } from "react"
import { HexColorPicker } from "react-colorful"
import "react-colorful/dist/index.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import Canvas from "./canvas"

const ADD_ART = gql`
  mutation AddArt($name: String, $file: Upload!, $description: String) {
    addArt(name: $name, file: $file, description: $description) {
      id
      name
    }
  }
`

function New() {
  let [color, setColor] = useState("#000")
  let [lineWidth, setLineWidth] = useState(3)

  const [addArt, { data }] = useMutation(ADD_ART)

  const formik = useFormik({
    initialValues: {
      name: "",
      file: null,
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Title must be 20 characters or less")
        .min(4, "Title must be at least 4 characters long")
        .required("A title is required"),
      file: Yup.mixed().test(
        "required",
        "you have to draw something",
        (value) => value
      ),
      description: Yup.string().max(244, "Must be 244 characters or less"),
    }),
    onSubmit: (values) => {
      addArt({
        variables: {
          name: values.name,
          file: values.file,
          description: values.description,
        },
      })
    },
  })

  useEffect(() => {
    if (!data) return
    if (!data.addArt) return

    window.location.href = "/paintings"
  }, [data])

  return (
    <div>
      <h2>add a new painting!</h2>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <input
          name="name"
          placeholder="title"
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
        <Canvas
          color={color}
          lineWidth={lineWidth}
          setFile={(file) => formik.setFieldValue("file", file)}
        ></Canvas>
        <div className="error">
          {formik.errors.file ? formik.errors.file : null}
        </div>
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
    </div>
  )
}

export default New
