import { useLazyQuery, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import { UserType } from "../../schema"
import { Link } from "react-router-dom"
const LOG_IN = gql`
  query Login($name: String, $password: String) {
    login(name: $name, password: $password) {
      id
      name
      password
      photo
    }
  }
`

function Login() {
  let [user, setUser] = useState()
  let [name, setName] = useState("")
  let [password, setPassword] = useState("")

  const [login, { loading, data, error }] = useLazyQuery(LOG_IN)

  useEffect(() => {
    if (!data) return
    if (!data.login) return

    setUser(data.login)
    // localStorage.setItem("userId", data.login.id)
    // localStorage.setItem("userName", data.login.name)
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
    <div>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => login({ variables: { name, password } })}>
        Login
      </button>

      <span>
        not a user? <Link to="/register">register</Link>
      </span>
      {user ? <p>{user.name} logged in!</p> : ""}
    </div>
  )
}

export default Login
