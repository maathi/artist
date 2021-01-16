import { useMutation, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import { UserType } from "../../schema"
import { Link } from "react-router-dom"
import logo from "../../img/artist.png"
import { useFormik } from "formik"
import * as Yup from "yup"
const ADD_USER = gql`
  mutation AddUser($name: String, $password: String) {
    addUser(name: $name, password: $password) {
      id
      name
      password
    }
  }
`
function Register() {
  let [user, setUser] = useState()
  let [name, setName] = useState("")
  let [password, setPassword] = useState("")
  const [addUser, { data }] = useMutation(ADD_USER)

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "name must be at least 3 characters long")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      addUser({
        variables: { name: values.name, password: values.password },
      })
    },
  })

  useEffect(() => {
    if (!data) return
    if (!data.addUser) return

    setUser(data.addUser)
    console.log("my user: ", user)
    // localStorage.setItem("userId", data.addUser.id)
    // localStorage.setItem("userName", user?.name)
  }, [data])

  useEffect(() => {
    if (!user) return

    localStorage.setItem("id", user.id.toString())
    localStorage.setItem("name", user.name.toString())
    window.location.href = "/paintings"
  }, [user])

  return (
    <div>
      <img id="login-logo" src={logo} alt="" />
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <div className="error">
          {formik.touched.name && formik.errors.name
            ? formik.errors.name
            : null}
        </div>
        <input
          id="password"
          name="password"
          placeholder="password"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <div className="error">
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null}
        </div>
        <button type="submit">Login</button>
      </form>
      <span>
        already have an account? <Link to="/login">login</Link>
      </span>
      {user ? <p>{user.name} was added!</p> : ""}
    </div>
  )
}
export default Register
