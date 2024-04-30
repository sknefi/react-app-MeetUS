import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

import david from '../images/userPhotos/david.jpg'

import { LoggedUserContext } from '../../Technician/Contexts/LoggedUserContext'


const Login = () => {
    const navigate = useNavigate()
    const { handlerMapForLogin  } = useContext(LoggedUserContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loginError, setLoginError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const redirectToMainPage = () => {
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const isEmailAndPasswordInDatabase = await handlerMapForLogin.findUserInDatabase(formData.email, formData.password)
        
        if (Object.keys(isEmailAndPasswordInDatabase).length === 0) {
          // returned {}
          // users email and password dont match with any user in database
          setLoginError('Zadali ste nesprávne prihlasovacie údaje')
            
        } else {
          // returned {id: '...'. ...}
          // user wrote correct email and password, we will log him in
          handlerMapForLogin.userIsLoggingIn(isEmailAndPasswordInDatabase)
          redirectToMainPage()
        }

    } catch (error) {
        setLoginError('Invalid email or password')
        console.error('Error logging in:', error.message)
    }
}

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

        <Button variant="primary" type="submit">
          Login
        </Button>

      </Form>
    </div>
  )
}

export default Login
