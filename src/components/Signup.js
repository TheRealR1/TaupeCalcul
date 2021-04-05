import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import app from '../firebase'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      createUser(emailRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  function createUser(email) {
    var prenom = document.getElementById("inputPrenom").value;
    var nom = document.getElementById("inputNom").value;
    var classe = document.getElementById("inputClasse").value;
    var ecole = document.getElementById("inputEcole").value;
    var listeUserRef = app.database().ref("Users");
    var idUser= 0;
    listeUserRef.limitToLast(1).once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              idUser = parseInt(childSnapshot.key) + 1;
        });

        listeUserRef.child(idUser).set({
            idUser: idUser,
            email: email,
            prenom: prenom,
            nom: nom,
            classe: classe,
            ecole: ecole,
            score: 0
        });
    });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" id="inputNom" required />
            </Form.Group>
            <Form.Group id="prenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" id="inputPrenom" required />
            </Form.Group>
            <Form.Group id="classe">
              <Form.Label>Classe</Form.Label>
              <Form.Control type="text" id="inputClasse" required />
            </Form.Group>
            <Form.Group id="ecole">
              <Form.Label>Ecole</Form.Label>
              <Form.Control type="text" id="inputEcole" required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
