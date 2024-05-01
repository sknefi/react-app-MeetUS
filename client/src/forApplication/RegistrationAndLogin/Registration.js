import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { LoggedUserContext } from "../../Technician/Contexts/LoggedUserContext"

function Registration() {
  // nefunguje mi keď sa user snaží zaregistrovať a zadá email, ktorý už je v databáze. tak z nejakého dôvodu sa mi nechce zmeniť text
  // na error text aby to ten user videl ('Email už existuje')
  const { handlerMapForRegistration } = useContext(LoggedUserContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    igName: "",
  })

  const [emailWasAlreadyTakenError, setEmailWasAlreadyTakenError] = useState('Email')

  const [photoFile, setPhotoFile] = useState(null)
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type } = e.target

    if (type === "file") {
      setPhotoFile(e.target.files[0])
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    setFormErrors({
      ...formErrors,
      [name]: "",
    })
  }

  const redirectToLogin = () => {
    navigate("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = {}
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = "This field is required"
      }
    }
  
    if (!photoFile || !["image/jpeg", "image/jpg", "image/png"].includes(photoFile.type)) {
      errors.photo = "Please select a valid image file (JPEG, JPG, or PNG)"
    }
  
    if (Object.keys(errors).length === 0) {
      delete formData.photo
  
      const registrationResult =
        await handlerMapForRegistration.userRegistration(formData)
      if (registrationResult && registrationResult.code === "emailAlreadyExists") {
        setEmailWasAlreadyTakenError('Email už existuje')
        setFormErrors({ ...formErrors, email: "Email is already taken" })
      } else if (registrationResult) {
        setFormData({
          name: "",
          surname: "",
          email: "",
          password: "",
          igName: "",
        })
        redirectToLogin()
      }
    } else {
      setFormErrors(errors)
    }
  }
  

  return (
    <>
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
        <Form.Control.Feedback type="invalid">
          {formErrors.name}
        </Form.Control.Feedback>
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
        <Form.Control.Feedback type="invalid">
          {formErrors.surname}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{emailWasAlreadyTakenError}</Form.Label>
        <Form.Control
          type="email"
          placeholder="Zadajte email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!formErrors.email}
        />
        {formErrors.email && (
          <div className="invalid-feedback">{formErrors.email}</div>
        )}
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
        <Form.Control.Feedback type="invalid">
          {formErrors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicIgName">
        <Form.Label>Instagram</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zadajte IG meno"
          name="igName"
          value={formData.igName}
          onChange={handleChange}
          isInvalid={!!formErrors.igName}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.igName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhoto">
        <Form.Label>Profilová fotka</Form.Label>
        <Form.Control
          type="file"
          name="photo"
          onChange={handleChange}
          isInvalid={!!formErrors.photo}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.photo}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        REGISTROVAŤ
      </Button>
    </Form>

    </>
  )
}

export default Registration
