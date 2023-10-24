import { Link } from 'react-router-dom'
import { useState } from 'react'
// import Swal from "sweetalert2";
import axios from 'axios'

export const SignUp = () => {
  const [register, setRegister] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (register.password === register.confirmPassword) {
      const createNewUser = {
        username: register.username,
        password: register.password,
      }
      // axios.post('http:localhost:3000', createNewUser)
      axios.post('http://localhost:3000/signup', createNewUser)
    } else {
      console.log('Password is not the same')
    }
  }

  return (
    <>
      <form onSubmit={handleRegister} className="bg-slate-400">
        <h1 className="">Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="username" name="username" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="password" name="password" onChange={handleChange} />

        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          id="confirmpassword"
          placeholder="confirm password"
          name="confirmPassword"
          onChange={handleChange}
        />

        <Link to="/login" className="text-blue-900 hover:text-blue-700">
          Already have account?
        </Link>
        <input type="Submit" className="btn" name="submit-btn"></input>
      </form>
    </>
  )
}