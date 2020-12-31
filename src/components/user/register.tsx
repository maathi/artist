import { useMutation, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import { UserType } from "../../schema"

const ADD_USER = gql`
  mutation AddUser($name: String, $password: String) {
    addUser(name: $name, password: $password) {
      id
      name
      password
    }
  }
`

//they are called trainers :(
function Register() {
  let [user, setUser] = useState<UserType>()
  let [name, setName] = useState("")
  let [password, setPassword] = useState("")
  const [addUser, { data }] = useMutation(ADD_USER)

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
  }, [user])

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
      <button onClick={() => addUser({ variables: { name, password } })}>
        Register
      </button>
      {user ? <p>{user.name} was added!</p> : ""}
    </div>
  )
}
export default Register
