import { useMutation, gql, useLazyQuery } from "@apollo/client"
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

const CHECK_NAME = gql`
  query CheckName($name: String) {
    checkName(name: $name) {
      name
    }
  }
`

function Register() {
  let [user, setUser] = useState()
  let [name, setName] = useState("")
  let [password, setPassword] = useState("")
  const [addUser, { data }] = useMutation(ADD_USER)
  const [checkName, { loading, data: checkNameData, error }] = useLazyQuery(
    CHECK_NAME
  )

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "name must be at least 3 characters long")
        .required("Required")
        .test("check username", "username already exists!", async (value) => {
          let fo = await checkName({ variables: { name: value } })
          console.log(fo)
          // let name = await loadCheck(value)
          // console.log("name after resolve", name)
          return !checkNameData?.checkName
        }),
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

  // let myPromise = new Promise(function (myResolve, myReject) {
  //   // "Producing Code" (May take some time)
  //   checkName({ variables: { name } })
  //   if (!loading) myResolve() // when successful
  //   myReject() // when error
  // })

  function em() {
    console.log("em", formik.values.name)
    return false
  }

  function loadCheck(name) {
    let promise = new Promise(function (resolve, reject) {
      console.log("1. name on check", name)
      checkName({ variables: { name } })

      while (loading) {
        console.log("loading...")
      }

      console.log("2. the data after call", checkNameData?.checkName)
      resolve(checkNameData?.checkName)
    })

    return promise
  }

  // useEffect(() => {
  //   if (!formik.values?.name) return

  //   console.log("calling checkName")
  //   checkName({ variables: { name: formik.values.name } })
  // }, [formik.values.name])

  // useEffect(() => {
  //   console.log("checkname data:", checkNameData)
  // }, [checkNameData])

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
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="error">
          {formik.errors.name ? formik.errors.name : null}
        </div>
        <input
          id="password"
          name="password"
          placeholder="password"
          type="text"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="error">
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null}
        </div>
        <button type="submit">Register</button>
      </form>
      <span>
        already have an account? <Link to="/login">login</Link>
      </span>
      {user ? <p>{user.name} was added!</p> : ""}
    </div>
  )
}
export default Register
