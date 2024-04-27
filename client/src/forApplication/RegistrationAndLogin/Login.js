import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate()



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

  const handleSubmit = (e) => {
    e.preventDefault()

    // user-dao/isUserInDatabase(email, password)
    const isUserInDatabase = false
    const isUserInDatabase1 = true

    if (isUserInDatabase1) {
        redirectToMainPage()
    } else {
        setLoginError('Zadali ste neplatný email alebo heslo')
    }
    console.log(formData)  
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
