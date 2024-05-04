import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Registration.css'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import SuccessfulRegistrationModal from "./SuccessfulRegistrationModal";

import { LoggedUserContext } from "../../Technician/Contexts/LoggedUserContext";
import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext";

function Registration() {
  const { colorPallet } = useContext(ColorPalletContext);
  const { handlerMapForRegistration } = useContext(LoggedUserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    igName: "",
  });

  const [emailWasAlreadyTakenError, setEmailWasAlreadyTakenError] =
    useState("Email");

  const [photoFile, setPhotoFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleCloseModal = () => {
    setRegistrationSuccess(false);
  };

  const handleOpenModal = () => {
    setRegistrationSuccess(true);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setPhotoFile(e.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = "This field is required";
      }
    }

    if (
      !photoFile ||
      !["image/jpeg", "image/jpg", "image/png"].includes(photoFile.type)
    ) {
      errors.photo = "Please select a valid image file (JPEG, JPG, or PNG)";
    }

    if (Object.keys(errors).length === 0) {
      delete formData.photo;

      const registrationResult =
        await handlerMapForRegistration.userRegistration(formData);
      if (
        registrationResult &&
        registrationResult.code === "emailAlreadyExists"
      ) {
        setEmailWasAlreadyTakenError("Email už existuje");
        setFormErrors({ ...formErrors, email: "Email is already taken" });
      } else if (registrationResult) {
        setRegistrationSuccess(true);
        setTimeout(() => {
          redirectToLogin();
        }, 3000);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "50vw",
          margin: '0 auto'
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label style={{ color: colorPallet.fourthcolor }}>
            Meno
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Zadajte meno"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!formErrors.name}
            className="custom-placeholder-color"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label style={{ color: colorPallet.fourthcolor }}>
            Priezvisko
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Zadajte priezvisko"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            isInvalid={!!formErrors.surname}
            className="custom-placeholder-color"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.surname}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: colorPallet.fourthcolor }}>
            {emailWasAlreadyTakenError}
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Zadajte email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!formErrors.email}
            className="custom-placeholder-color"
          />
          {formErrors.email && (
            <div className="invalid-feedback">{formErrors.email}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: colorPallet.fourthcolor }}>
            Heslo
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Zadajte heslo"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!formErrors.password}
            className="custom-placeholder-color"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicIgName">
          <Form.Label style={{ color: colorPallet.fourthcolor }}>
            Instagram
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Zadajte IG meno"
            name="igName"
            value={formData.igName}
            onChange={handleChange}
            isInvalid={!!formErrors.igName}
            className="custom-placeholder-color"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.igName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
          <Form.Label style={{ color: colorPallet.fourthcolor }}>
            Profilová fotka
          </Form.Label>
          <Form.Control
            type="file"
            name="photo"
            onChange={handleChange}
            isInvalid={!!formErrors.photo}
            className="custom-placeholder-color"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.photo}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" style={{
          color: colorPallet.fourthcolor,
          backgroundColor: colorPallet.maincolor,
          border: `2px solid ${colorPallet.fourthcolor}`,
          borderRadius: '10px',
        }}>
          REGISTROVAŤ
        </Button>
      </Form>
      {registrationSuccess && (
        <SuccessfulRegistrationModal
          name={formData.name}
          show={handleOpenModal}
          onClose={handleCloseModal}
          
        />
      )}
    </>
  );
}

export default Registration;
