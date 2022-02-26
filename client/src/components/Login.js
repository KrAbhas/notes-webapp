import axios from 'axios';
import React, {useState} from 'react'

export default function Login({setIsLogin}) {
    const [user, setUser] = useState({name: '',email: '',password: ''})
    const [err, setErr] = useState('')
    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user,[name]: value})
        setErr('')
    }

    const loginSubmit = async e =>  {
        e.preventDefault()
        try{
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password
            })
            setUser({name: '', email: '', password: ''})
            localStorage.setItem('tokenStore',res.data.token)
            setIsLogin(true)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const registerSubmit = async e =>  {
        e.preventDefault()
        try{
            const res = await axios.post('/users/register', {
                username: user.name,
                email: user.email,
                password: user.password
            })
            setUser({name: '', email: '', password: ''})
            setErr(res.data.msg)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

  return (
    <section>
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
                <input type="email" name="email" id="login-email" placeholder='email' required value={user.email} onChange={onChangeInput}/>
                <input type="password" name="password" id="login-password" placeholder='Password' required value={user.password} onChange={onChangeInput} autoComplete="true"/>
                <button type="submit">Login</button>
                <p>You don't have an account?<span>Register Now</span></p>
            </form>
            <h3>{err}</h3>
        </div>

        <div className='Register'>
            <h2>Register</h2>
            <form onSubmit={registerSubmit}>
                <input type="text" name="name" id='register-name' placeholder='User Name' required value={user.name} onChange={onChangeInput}/>
                <input type="email" name="email" id="register-email" placeholder='email' required value={user.email} onChange={onChangeInput}/>
                <input type="password" name="password" id="register-password" placeholder='Password' required value={user.password} onChange={onChangeInput} autoComplete="true"/>
                <button type="submit">Register</button>
                <p>You don't have an account?<span>Login Now</span></p>
                <h3>{err}</h3>
            </form>
        </div>
    </section>
  )
}
