import React, { Component } from 'react'
import { Link } from "react-router-dom"

class AffOperateur extends Component {
    constructor(props) {
        super(props);

        this.state = {
            operateurs: [
                {
                    nom: "addition",
                    image: "plus.png",
                    alt: "+"
                },{
                    nom: "soustraction",
                    image: "moins.png",
                    alt: "-"
                },{
                    nom: "multiplication",
                    image: "mult.png",
                    alt: "x"
                },{
                    nom: "division",
                    image: "div.png",
                    alt: "%"
                }
            ]
        };
    }

    render() {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                {
                    this.state.operateurs &&
                    this.state.operateurs.map(ope => (
                        <button key={ope.nom} style={{ border: 'none', backgroundColor: 'transparent', padding: "15px"  }}>
                            <Link to={ "/listeOperation/" + ope.nom }>
                                <img src={ ope.image } alt={ ope.alt } style={{width: 150 + "px", height: 150 + "px"}}></img>
                            </Link>
                        </button>
                    ))
                }
                </div>
            </div>
        )
    }
}

export default AffOperateur;