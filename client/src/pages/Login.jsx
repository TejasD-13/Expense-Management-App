import React, {useState, useEffect} from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Password from 'antd/es/input/Password';
import Spinner from '../components/Spinner'

function Login() {
    const [loading, setloading] = useState(false);
    const navigate = useNavigate()
    const submitHandler = async (value) => {
        try {
            setloading(true)
           const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/login`, value)
            console.log("Login API response:", data); // ✅ log this
           message.success('login success')
           localStorage.setItem('user', JSON.stringify({...data.user, password:''}))
           setloading(false)
           navigate('/')
        } catch (error) {
            setloading(false)
            message.error('Something went wrong')
        }
    }

    // prevent 
        useEffect(() => {
            if(localStorage.getItem('user')){
                navigate('/');
            }
        }, [navigate])

  return (
    <>
        <div className="register-page ">
            {loading && <Spinner/>}
                    <Form layout='vertical' onFinish={submitHandler}>
                        <h1>Login Form</h1>
                         <Form.Item label='Email' name='email'>
                            <Input type='email'/>
                        </Form.Item>
                         <Form.Item label='Password' name='password'>
                            <Input type='password'/>
                        </Form.Item>
        
                        <div className='d-flex'>
                            <Link to='/register'>Not a user ? Click here to register</Link>
                            <button className='btn btn-primary'>Login</button>
                        </div>
                    </Form>
                </div>
    </>
  )
}

export default Login