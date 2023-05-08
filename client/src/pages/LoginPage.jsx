import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'
export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const {setUser} = useContext(UserContext)
    async function handleLoginSubmit (ev){
      ev.preventDefault();
    try {
     const data =  await axios.post('/login', {email, password})
      setUser(data)
      alert('Login Successful');
      setRedirect(true)
    } catch (e) {
      alert('login failed')
    }
    }
    if (redirect){
      return<Navigate to={'/'}/>
    }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
       <div className='-mt-64'>
       <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
          <input type='email' placeholder='your@email.com'
           value={email}
           onChange={ev=>setEmail(ev.target.value)}/>
          <input type='password' placeholder='password'
          value={password}
          onChange={ev=>setPassword(ev.target.value)}
          />
          <button className='primary'>Login</button>
          <div className='text-center py-2 text-gray-500'>Dont have an account yet?
            <Link to={'/register'} className='underline text-black '>Register now</Link>
          </div>
        </form>
       </div>
    </div>
  )
}
