import React from 'react'
import { useAuth } from "../contexts/AuthContext"

export default function EmailUser() {
    const { currentUser } = useAuth()

    return (
        <input type="text" id="emailUser" style={{ display: 'none' }} value={ currentUser.email } readOnly></input>
    )
}
