import React from 'react'
import AffOperateur from './AffOperateur'

export default function Home() {
    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#302010', marginTop: '10vh' }}>Choisissez une table à réviser :</h1>
            <AffOperateur />
        </div>
    )
}
