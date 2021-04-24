import React, { Component } from 'react'
import app from '../firebase'
import { Link } from "react-router-dom"
import { Alert } from "react-bootstrap"

const InputCalcul = ({ index, ope }) => {
    return (
        <div id={"calcul_" + index } className="calcul" style={{ marginTop: "10px" }}>
            Calcul { index + 1 } :
            <br/>
            <input type="text" id={"c" + index + "_nombre1"} className="nombre1" placeholder="Premier nombre" style={{ marginRight: '5px', maxWidth: '150px' }}></input>
            { ope }
            <input type="text" id={"c" + index + "_nombre2"} className="nombre2" placeholder="Deuxième nombre" style={{ marginLeft: '5px', marginRight: '5px', maxWidth: '150px' }}></input>
            =
            <input type="text" className={"c" + index + "_resultat"} id={"c" + index + "_resultatCorrect"} placeholder="Résultat attendu" style={{ marginLeft: '5px', marginRight: '5px', maxWidth: '150px' }}></input>
            <input type="text" className={"c" + index + "_resultat"} id={"c" + index + "_resultat1"} placeholder="Faux résultat" style={{ marginLeft: '5px', maxWidth: '150px' }}></input>
            <input type="text" className={"c" + index + "_resultat"} id={"c" + index + "_resultat2"} placeholder="Faux résultat" style={{ maxWidth: '150px' }}></input>
            <input type="text" className={"c" + index + "_resultat"} id={"c" + index + "_resultat3"} placeholder="Faux résultat" style={{ maxWidth: '150px' }}></input>
        </div>
    )
}

function melangeAleatoireListe(liste) {
    var j, x, i;
    for (i = liste.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = liste[i];
        liste[i] = liste[j];
        liste[j] = x;
    }
    return liste;
}

function convertOperateur(ope) {
    var res = "";
    switch(ope) {
        case "addition":
            res = "+";
            break;
        case "soustraction":
            res = "-";
            break;
        case "multiplication":
            res = "x";
            break;
        case "division":
            res = "%";
            break;
        default:
            res = "+";
            break;
    }

    return res;
}

export default class CreateListeOpe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputCalculList: [],
            operateur: convertOperateur(this.props.match.params.id),
            isListeCree: false,
            isListeEnvoye: false
        };

        this.ajouterCalcul.bind(this);
        this.createListeOperation.bind(this);
    }

    componentDidMount() {
        this.setState({ operateur: convertOperateur(this.props.match.params.id) });
        this.ajouterCalcul(this.state.operateur);
    }

    ajouterCalcul = (ope) => {
        var index = parseInt(document.querySelector("#calculsListeOpe").childElementCount) - 1;
        this.setState({ inputCalculList: this.state.inputCalculList.concat(<InputCalcul key={index} index={index} ope={ope} />) });
    }

    checkAllInputCalcul = (nbCalcul) => {
        for (var i = 0; i < nbCalcul; i++) {
            if ((document.getElementById("c" + i + "_nombre1").value).trim() === "" ||
                (document.getElementById("c" + i + "_nombre2").value).trim() === "" ||
                (document.getElementById("c" + i + "_resultatCorrect").value).trim() === "" ||
                (document.getElementById("c" + i + "_resultat1").value).trim() === "" ||
                (document.getElementById("c" + i + "_resultat2").value).trim() === "" ||
                (document.getElementById("c" + i + "_resultat3").value).trim() === "") {
                    return false;
            }
        }

        return true;
    }

    createListeOperation = (ope) => {
        var nomListeOpe = document.getElementById("nomListeOpe").value;
        var nbCalcul = parseInt(document.querySelector("#calculsListeOpe").childElementCount) - 1;

        if (nomListeOpe.trim() !== "" && this.checkAllInputCalcul(nbCalcul)) {
            this.setState({ isListeEnvoye : true });
            var listesOpeRef = app.database().ref("ListeOperations");
            var idOpe = 0;
            listesOpeRef.limitToLast(1).once('value').then( (snapshot) => {
                snapshot.forEach( (childSnapshot) => {
                    idOpe = parseInt(childSnapshot.key) + 1;
                });

                listesOpeRef.child(idOpe).set({
                    idOperation: idOpe,
                    nom: nomListeOpe,
                    operateur: ope
                });
            });

            var idCalcul = 0;
            var calculsRef = app.database().ref("Calculs");
            calculsRef.limitToLast(1).once('value').then( (snapshot) => {
                snapshot.forEach( (childSnapshot) => {
                    idCalcul = parseInt(childSnapshot.key) + 1;
                });

                for (var i = 0; i < nbCalcul; i++) {
                    var listeResultats = [
                        document.getElementById("c" + i + "_resultatCorrect").value,
                        document.getElementById("c" + i + "_resultat1").value,
                        document.getElementById("c" + i + "_resultat2").value,
                        document.getElementById("c" + i + "_resultat3").value
                    ];
                    listeResultats = melangeAleatoireListe(listeResultats)

                    var nombre1 = document.getElementById("c" + i + "_nombre1").value;
                    var nombre2 = document.getElementById("c" + i + "_nombre2").value;
                    var resultatCorrect = document.getElementById("c" + i + "_resultatCorrect").value;

                    calculsRef.child(idCalcul).set({
                        idOperation: idOpe,
                        nombre1: nombre1,
                        nombre2: nombre2,
                        operateur: ope,
                        resultatCorrect: resultatCorrect,
                        resultats: {
                            0: listeResultats[0],
                            1: listeResultats[1],
                            2: listeResultats[2],
                            3: listeResultats[3]
                        }
                    });

                    idCalcul += 1;
                }

                this.setState({ isListeCree : true });
            });
        } else {
            alert("Veuillez renseigner tous les champs !");
        }
    }

    render() {
        return (
            <div>
                <Link id="retour" to={ "/listeOperation/" + this.props.match.params.id }>
                    <button style={{ color: '#302010' }} disabled={ (!this.state.isListeEnvoye && this.state.isListeCree) || (this.state.isListeEnvoye && !this.state.isListeCree) }>
                        Retour
                    </button>
                </Link>
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh" }}>
                    <div className="w-100 redimWidth">
                        <div id="calculsListeOpe">
                            <button onClick={ () => this.ajouterCalcul(this.state.operateur) } disabled={ this.state.isListeEnvoye } style={{ color: '#302010', marginTop: '20px' }}>
                                + Ajouter calcul
                            </button>
                            {this.state.inputCalculList}
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    {
                        this.state.isListeCree &&
                        <Alert variant="success">Liste créée, vous pouvez maintenant appuyer sur "Retour".</Alert>
                    }    
                    <button id="creerListeOpe" onClick={ () => this.createListeOperation(this.state.operateur) } style={{ color: '#302010' }} disabled={ this.state.isListeEnvoye }>
                        Créer la liste d'opération
                    </button>
                    <input type="text" id="nomListeOpe" placeholder="Nom liste d'opération" required></input>
                </div>
            </div>
        )
    }
}