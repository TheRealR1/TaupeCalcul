import React from 'react'
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import Profile from "./Profile"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Home from "./Home"
import AffCalcul from "./AffCalcul"
import Menu from "./Menu"

export default function Layout() {
    return (
        <div className="app">
            <div className="app__sidebar">
                <Menu /> 
            </div>
            <main className="app__content">
                <Container
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}>
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <AuthProvider>
                            <Switch>
                                <PrivateRoute exact path="/" component={Home} />
                                <PrivateRoute path="/calcul" component={AffCalcul} />
                                <PrivateRoute path="/profile" component={Profile} />
                                <PrivateRoute path="/udpate-profile" component={UpdateProfile} />
                                <Route path="/signup" component={Signup} />
                                <Route path="/forgot-password" component={ForgotPassword} />
                                <Route path="/login" component={Login} />
                            </Switch>
                        </AuthProvider>
                    </div>
                </Container>
            </main>
        </div>
    )
}
