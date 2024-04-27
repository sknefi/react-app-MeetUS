import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

function Registration() {
    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    instagram: '',
    profileImage: null 
  })

  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type } = e.target

    const newValue = type === 'file' ? e.target.files[0] : value

    setFormData({
      ...formData,
      [name]: newValue
    })

    // Clear error message if user starts typing
    setFormErrors({
      ...formErrors,
      [name]: ''
    })
  }

  const redirectToLogin = () => {
    navigate('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = 'This field is required'
      }
    }

    if (!formData.profileImage || !['image/jpeg', 'image/jpg', 'image/png'].includes(formData.profileImage.type)) {
      errors.profileImage = 'Please select a valid image file (JPEG, JPG, or PNG)'
    }

    if (Object.keys(errors).length === 0) {
      console.log(formData) 
      redirectToLogin()

    } else {
      setFormErrors(errors)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Meno</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zadajte meno"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!formErrors.name}
        />
        <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Priezvisko</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zadajte priezvisko"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          isInvalid={!!formErrors.surname}
        />
        <Form.Control.Feedback type="invalid">{formErrors.surname}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Zadajte email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!formErrors.email}
        />
        <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Heslo</Form.Label>
        <Form.Control
          type="password"
          placeholder="Zadajte heslo"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!formErrors.password}
        />
        <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicInstagram">
        <Form.Label>Instagram</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zadajte IG meno"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
          isInvalid={!!formErrors.instagram}
        />
        <Form.Control.Feedback type="invalid">{formErrors.instagram}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicProfileImage">
        <Form.Label>Profilová fotka</Form.Label>
        <Form.Control
          type="file"
          name="profileImage"
          onChange={handleChange}
          isInvalid={!!formErrors.profileImage}
        />
        <Form.Control.Feedback type="invalid">{formErrors.profileImage}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        REGISTROVAŤ
      </Button>
    </Form>
  )
}

export default Registration
