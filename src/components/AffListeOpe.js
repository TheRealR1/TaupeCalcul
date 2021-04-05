import React, { Component } from 'react'
import app from '../firebase'
import { Link } from "react-router-dom"

class AffListeOpe extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listesOpeAff: [],
            idOperation: 0
        };

        this.getListesOpe.bind(this);
        this.selectListeOpe.bind(this);
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
        return (
            <div className="align-items-center justify-content-center" style={{ textAlign: 'center', fontSize: 'larger' }}>
                <Link id="retour" to={ "/" }>
                    <button style={{ backgroundColor: '#ccbc9c', color: '#302010', float: 'left' }}>Retour</button>
                </Link>
                Sélectionner la liste de calcul à effectuer
                <Link to={ "/createListeOpe/" + this.props.match.params.id }>
                    <button style={{ backgroundColor: '#ccbc9c', color: '#302010', float: 'right' }}>+ Ajouter Liste d'opération</button>
                </Link>
                <div className="card" style={{ marginTop: '15px' }}>
                    <ul className="list-group list-group-flush">
                    {
                        this.state.listesOpeAff &&
                        this.state.listesOpeAff.map(
                        (res,index) =>
                            <Link  key={index} to={ "/calcul/" + res.idOperation } style={{ color: '#302010' }}>
                                <li className="list-group-item btn btn-lg" style={{ backgroundColor: '#ccbc9c', color: '#302010', border: '1px solid #302010' }}>
                                    { res.nom } - { res.idOperation }
                                </li>
                             </Link>
                        )
                    }
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default AffListeOpe;