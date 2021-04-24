import React from 'react'
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"
import Profile from "./Profile"
import PrivateRoute from "./PrivateRoute"
import Home from "./Home"
import AffCalcul from "./AffCalcul"
import Menu from "./Menu"
import AffListeOpe from "./AffListeOpe"
import AffPalmares from "./AffPalmares"
import CreateListeOpe from './CreateListeOpe'
import AffFeuilleRevision from './AffFeuilleRevision'

export default function Layout() {
    return (
        <div className="app">
            <div className="app__sidebar">
                <Menu /> 
            </div>
            <main className="app__content">
                <Container>
                    <div>
                        <AuthProvider>
                            <Switch>
                                <PrivateRoute exact path="/" component={Home} />
                                <PrivateRoute path="/listeOperation/:id" component={AffListeOpe} />
                                <PrivateRoute path="/calcul/:id" component={AffCalcul} />
                                <PrivateRoute path="/profile" component={Profile} />
                                <PrivateRoute path="/createListeOpe/:id" component={CreateListeOpe} />
                                <PrivateRoute path="/feuilleRevision/:id" component={AffFeuilleRevision} />
                                <Route path="/palmares" component={AffPalmares} />
                                <Route path="/signup" component={Signup} />
                                <Route path="/login" component={Login} />
                            </Switch>
                        </AuthProvider>
                    </div>
                </Container>
            </main>
        </div>
    )
}
