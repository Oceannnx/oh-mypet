import './login.css'
import { Navbar } from "../../component/Navbar"
import { Link } from 'react-router-dom'
import { Footer } from '../../component/Footer'

export const Login = () => {
  return (
    <>
      <Navbar></Navbar>
      <form className='border-solid bg-slate-400'>
        <h1>Login</h1>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' placeholder='Username' className='focus:border-none'/>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' placeholder='Password'/>
        <Link to='/fogotpassword' className='text-blue-900 hover:text-blue-700'>Forgot Password?</Link>
        <Link to='/signup' className='text-blue-900 hover:text-blue-700'>New to Ohmypet ?</Link>
        <input type='submit' />
      </form>
      <Footer></Footer>
    </>
  )
}