import React, {useState, useEffect} from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios'
import Spinner from '../components/Spinner'

function Register() {
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)

    // from submit
    const submitHandler = async (value) => {
        try {
            setloading(true)
            await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/register`, value)
            message.success('Registraation successfull')
            setloading(false)
            navigate('/login')
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
                <h1>Register Form</h1>
                <Form.Item label='Name' name='name'>
                    <Input/>
                </Form.Item>
                 <Form.Item label='Email' name='email'>
                    <Input type='email'/>
                </Form.Item>
                 <Form.Item label='Password' name='password'>
                    <Input type='password'/>
                </Form.Item>

                <div className='d-flex'>
                    <Link to='/login'>Already Register? Click here to login</Link>
                    <button className='btn btn-primary'>Register</button>
                </div>
            </Form>
        </div>
    </>
  )
}

export default Register