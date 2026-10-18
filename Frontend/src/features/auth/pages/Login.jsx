import React, { useState } from 'react'
import "../auth.form.scss"
import {useNavigate , Link} from "react-router"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const {loading , handleLogin} = useAuth()
    const navigate = useNavigate();

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")


    const handlesubmit = async(e)=>{
         e.preventDefault();
         await handleLogin({email , password})
         setEmail("");
         setPassword("");
      
}
 if (loading) {
    return (
        <main>
            <h1>Loading.....</h1>
        </main>
    )
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handlesubmit}>
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e)=> {setEmail(e.target.value)}}
                     type="email" value={email} id='email' name='email' placeholder='enter email address' />
                </div>
                 <div className='input-group'>
                    <label htmlFor="password">password</label>
                    <input
                    onChange={(e)=>{setPassword(e.target.value)}}
                     type="password" value={password} id='password' name='password' placeholder='enter your Password' />
                </div>
                <button className='button primary-button'>Login</button>


            </form>

            <p>Don't have an account ? <Link to="/register">Register</Link></p>

        </div>
    </main>
  )
}

export default Login
