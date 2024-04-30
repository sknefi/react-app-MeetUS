import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { LoggedUserContext } from '../../Technician/Contexts/LoggedUserContext'


function Registration() {
  const { handlerMapForRegistration } = useContext(LoggedUserContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    instagram: '',
    photo: null 
  })

  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type } = e.target

    const newValue = type === 'file' ? e.target.files[0] : value

    setFormData({
      ...formData,
      [name]: newValue
    })

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

    if (!formData.photo || !['image/jpeg', 'image/jpg', 'image/png'].includes(formData.photo.type)) {
      errors.photo = 'Please select a valid image file (JPEG, JPG, or PNG)'
    }

    if (Object.keys(errors).length === 0) {
      delete formData.photo
  
      console.log(formData)
      handlerMapForRegistration.userRegistration(formData)
      // vytvoriť modal na 'USPEŠNÁ REGISTRÁCIA'
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

      <Form.Group className="mb-3" controlId="formBasicPhoto">
        <Form.Label>Profilová fotka</Form.Label>
        <Form.Control
          type="file"
          name="photo"
          onChange={handleChange}
          isInvalid={!!formErrors.photo}
        />
        <Form.Control.Feedback type="invalid">{formErrors.photo}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        REGISTROVAŤ
      </Button>
    </Form>
  )
}

export default Registration
