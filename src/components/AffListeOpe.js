import React, { Component } from 'react'
import app from '../firebase'
import { Link } from "react-router-dom"
import EmailUser from './EmailUser';

class AffListeOpe extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listesOpeAff: [],
            listeScoresUser: [],
            listeTempsUser: [],
            idOperation: 0,
            isEnseignant: false,
            idUser: 0
        };

        this.getListesOpe.bind(this);
        this.getScoresUser.bind(this);
        this.selectListeOpe.bind(this);
        this.checkIfEnseignant.bind(this);
    }

    componentDidMount() {
        var ope = "";
        switch(this.props.match.params.id) {
            case "addition":
                ope = "+";
                break;
            case "soustraction":
                ope = "-";
                break;
            case "multiplication":
                ope = "x";
                break;
            case "division":
                ope = "%";
                break;
            default:
                ope = "+";
                break;
        }
        this.getListesOpe(ope);

        this.checkIfEnseignant(document.getElementById("emailUser").value);
    }

    checkIfEnseignant = (email) => {
        var listeUserRef = app.database().ref("Users");
        var dataUser = null;
        listeUserRef.once('value').then( (snapshot) => {
            snapshot.forEach( (childSnapshot) => {
                dataUser = childSnapshot.val();
                if (dataUser.email === email) {
                    this.setState({ idUser : parseInt(dataUser.idUser) })
                    if (parseInt(dataUser.enseignant) === 1) {
                        this.setState({ isEnseignant : true });
                    }
                }
            });

            this.getScoresUser();
        });
    }

    getScoresUser = () => {
        var idUser = this.state.idUser;
        var listeScore = [];
        var listeTemps = [];
        
        var listeOpeUserRef = app.database().ref("Users/" + idUser + "/listeOpe");
        listeOpeUserRef.once('value').then( (snapshot2) => {
            snapshot2.forEach( (childSnapshot2) => {
                var dataOpe = childSnapshot2.val();
                listeScore[dataOpe.idOperation] = dataOpe.score;
                listeTemps[dataOpe.idOperation] = dataOpe.temps;
            });

            this.setState({ listeScoresUser : listeScore, 
                            listeTempsUser : listeTemps });
        });
    }

    getListesOpe = (ope) => {
        var listesOpeRef = app.database().ref("ListeOperations");
    
        listesOpeRef.once('value', (snapshot) => {
            let listesOpe = [];
          
            snapshot.forEach( (childSnapshot) => {
                var data = childSnapshot.val();
    
                if (data.operateur === ope) {
                    listesOpe.push(data);
                }
            });
    
            this.setState({ listesOpeAff : listesOpe });
        });
    }

    selectListeOpe = (idOpe) => {
        this.setState({ idOperation : idOpe });
    }

    render() {
        const isEnseignant = this.state.isEnseignant;
        return (
            <div className="align-items-center justify-content-center" style={{ textAlign: 'center', fontSize: 'larger' }}>
                <Link id="retour" to={ "/" }>
                    <button style={{ backgroundColor: '#ccbc9c', color: '#302010', float: 'left' }}>Retour</button>
                </Link>
                { isEnseignant ? 'Sélectionner la liste de calcul à consulter' : 'Sélectionner la liste de calcul à effectuer'}
                <Link to={ "/createListeOpe/" + this.props.match.params.id }>
                    {
                        this.state.isEnseignant &&
                        <button style={{ color: '#302010', float: 'right' }}>+ Ajouter Liste d'opération</button>
                    }
                </Link>
                <div className="card" style={{ marginTop: '15px' }}>
                    <ul className="list-group list-group-flush">
                    {
                        this.state.listesOpeAff &&
                        this.state.listesOpeAff.map(
                        (res,index) =>
                            <Link  key={index} to={ isEnseignant ? '/feuilleRevision/' + res.idOperation : '/calcul/' + res.idOperation } style={{ color: '#302010' }}>
                                <li className="list-group-item btn btn-lg" style={{ backgroundColor: '#ccbc9c', color: '#302010', border: '1px solid #302010' }}>
                                    <span className="badge badge-dark" style={{ float: 'left', position: 'absolute', left: '10px', top: '10px' }}>{ this.state.listeTempsUser[res.idOperation] && (this.state.listeTempsUser[res.idOperation] / 100) + ' sec' }</span>
                                    { res.nom } - { res.idOperation }
                                    <span className="badge badge-success" style={{ float: 'right', position: 'absolute', right: '10px', top: '10px' }}>{ this.state.listeScoresUser[res.idOperation] && this.state.listeScoresUser[res.idOperation] + ' points' }</span>
                                </li>
                            </Link>
                        )
                    }
                    </ul>
                </div>
                <EmailUser />
            </div>
        )
    }
}

export default AffListeOpe;