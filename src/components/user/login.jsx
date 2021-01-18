import { useLazyQuery, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import { UserType } from "../../schema"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import "../../styles/login.css"
import logo from "./../../img/artist.png"
import jwt from "jsonwebtoken"

const LOG_IN = gql`
  query Login($name: String, $password: String) {
    login(name: $name, password: $password)
  }
`

function Login() {
  let [user, setUser] = useState()
  let [loginError, setLoginError] = useState("")
  const [login, { loading, data, error }] = useLazyQuery(LOG_IN)

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: (values) => {
      login({
        variables: { name: values.name, password: values.password },
      })
    },
  })

  useEffect(() => {
    if (!data) return
    if (!data.login) {
      setLoginError("your username and password don't match... genius")
      return
    }

    async function decode() {
      let user = await jwt.decode(data.login)
      setUser(user)
    }

    localStorage.setItem("token", data.login)
    decode()
  }, [data])

  useEffect(() => {
    if (!user) return

    localStorage.setItem("id", user.id.toString())
    localStorage.setItem("name", user.name.toString())
    localStorage.setItem("photo", user.photo)
    window.location.href = "/paintings"
  }, [user])

  if (loading) return <p>loading...</p>
  if (error) return <p>`Error! ${error}`</p>

  return (
    <div id="login-page">
      <img id="login-logo" src={logo} alt="" />
      <h1>Login</h1>
      <form id="user-form" onSubmit={formik.handleSubmit} autoComplete="off">
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
        <div className="error">{loginError ? loginError : null}</div>
      </form>
      <span id="not-a-user">
        not a user? <Link to="/register">register</Link>
      </span>
    </div>
  )
}

export default Login
