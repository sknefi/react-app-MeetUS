import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function AddGroup({ handleClose }) {
  const [groupName, setGroupName] = useState('')
  const [groupInfo, setGroupInfo] = useState('')
  const [maxMembers, setMaxMembers] = useState(5)
  const [unlimited, setUnlimited] = useState(false)
  const [error, setError] = useState('')

  const incrementMaxMembers = () => {
    if (!unlimited) {
      setMaxMembers(prevMaxMembers => prevMaxMembers + 1)
    }
  }

  const decrementMaxMembers = () => {
    if (maxMembers > 2 && !unlimited) {
      setMaxMembers(prevMaxMembers => prevMaxMembers - 1)
    }
  }

  const handleMaxMembersChange = (event) => {
    const newValue = parseInt(event.target.value)
    setMaxMembers(newValue)
  }

  const handleUnlimitedChange = (event) => {
    const isChecked = event.target.checked
    setUnlimited(isChecked)
    if (isChecked) {
      setMaxMembers('Infinity')
    } else {
      setMaxMembers(5)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!groupName || !groupInfo) {
      setError('Pre vytvorenie skupiny musíte zadať požadované údaje')
      return
    }

    const formData = {
      groupName,
      groupInfo,
      maxMembers: unlimited ? 'Infinity' : maxMembers,
    }

    // Send formData to backend
    console.log(formData)
    handleClose()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupName">
        <Form.Label>Názov skupiny</Form.Label>
        <Form.Control
          type="text"
          placeholder="Jednorožci"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGroupInfo">
        <Form.Label>Informácie o skupine</Form.Label>
        <Form.Control
          type="text"
          placeholder="Spôsob dopravy | Ubytovanie | Požiadavky | ..."
          value={groupInfo}
          onChange={(event) => setGroupInfo(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMaxMembers">
        <Form.Label>Maximálny počet ľudí v skupine</Form.Label>
        <div className="input-group">
          <Button variant="outline-secondary" onClick={decrementMaxMembers} disabled={unlimited}>-</Button>
          <Form.Control type="number" value={maxMembers} onChange={handleMaxMembersChange} readOnly={unlimited} />
          <Button variant="outline-secondary" onClick={incrementMaxMembers} disabled={unlimited}>+</Button>
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="UNLIMITED" onChange={handleUnlimitedChange} />
      </Form.Group>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button variant="primary" type="submit">
        POTVRDIŤ
      </Button>
    </Form>
  )
}

export default AddGroup
