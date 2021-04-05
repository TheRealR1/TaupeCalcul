import React from 'react'
import './modal.css';
import { Link } from "react-router-dom"

export class AffCalcul extends React.Component { };

export default function Modal(props) {
    return (
        <div className='Modal'
            style = {{    transform: props.visible ? 'translateY(0vh' : 'translateY(100vh)',
                        opacity: props.visible ? '1' : '0'
                    }}>
            <Link to={ "/" }>
                <button onClick={ () => props.cache(props.rep) }>X</button>
            </Link>
            <p>
                Bravo vous avez terminez le quizz votre score est de : { props.rep }
                <br/>
                Vous allez revenir automatiquement à l'accueil.
            </p>
        </div>
    )
}