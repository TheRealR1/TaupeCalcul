import React, { Component } from 'react'
import app from '../firebase'
import { Link } from "react-router-dom"
import './affFeuilleRevision.css'

function convertIdOperateur(ope) {
    var res = "";
    switch(ope) {
        case "+":
            res = "addition";
            break;
        case "-":
            res = "soustraction";
            break;
        case "x":
            res = "multiplication";
            break;
        case "%":
            res = "division";
            break;
        default:
            res = "addition";
            break;
    }

    return res;
}

class AffFeuilleRevision extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listeOpeAff :[],
            ope: 'addition'
        };

        this.getCalculsListeOpe.bind(this);
    }
    
    componentDidMount() {
        this.getCalculsListeOpe(parseInt(this.props.match.params.id));
    }

    getCalculsListeOpe = (idOpe) => {
        var listeOpeRef = app.database().ref("Calculs");

        listeOpeRef.once('value', (snapshot) => {
            let listeOpe = [];
          
            snapshot.forEach( (childSnapshot) => {
                var data = childSnapshot.val();

                if (data.idOperation === idOpe) {
                    listeOpe.push(data);
                }
            });

            this.setState({ listeOpeAff : listeOpe });
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.listeOpeAff &&
                    this.state.listeOpeAff[0] &&
                    <Link id="retour" to={ "/listeOperation/" + convertIdOperateur(this.state.listeOpeAff[0].operateur) }>
                        <button style={{ color: '#302010' }}>
                            Retour
                        </button>
                    </Link>
                }
                <div className="App d-flex justify-content-center" style={{ minHeight: "100vh" }}>
                    <table>
                        <tbody>
                    {
                        this.state.listeOpeAff &&
                        this.state.listeOpeAff.map(
                        (calcul,index) =>
                            <tr key={index} style={{ fontSize: '30px' }}>
                                <td>
                                    <span className="badge badge-dark" style={{ margin: '20px 20px' }}>
                                        Calcul {index + 1} :
                                    </span>
                                </td>
                                <td>
                                    <span className="badge badge-success nombre-aff">
                                        {calcul.nombre1}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge nombre-aff">
                                        {calcul.operateur}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge badge-success nombre-aff">
                                        {calcul.nombre2}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge nombre-aff">
                                        =
                                    </span>
                                </td>
                                <td>
                                    <span className="badge badge-success nombre-aff">
                                        {calcul.resultatCorrect}
                                    </span>
                                </td>
                            {
                                calcul.resultats &&
                                calcul.resultats.map(
                                    (res,index2) =>
                                        res !== calcul.resultatCorrect &&
                                        <td key={index2}>
                                            <span className='badge badge-danger nombre-aff'>
                                                {res}
                                            </span>
                                        </td>
                                )
                            }
                            </tr>
                        )
                    }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AffFeuilleRevision;