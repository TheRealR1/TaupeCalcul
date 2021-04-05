import React, { Component } from 'react'
import app from '../firebase'
import './affPalmares.css'
import "./affPalmares.scss";

export default class AffPalmares extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listePalmares: []
        };

        this.getListeUserPalmares.bind(this);
        this.sortByScore.bind(this);
        this.sortByEcole.bind(this);
        this.sortByClasse.bind(this);
        this.onSort.bind(this);
    }

    componentDidMount() {
        this.getListeUserPalmares();
    }

    getListeUserPalmares = () => {
        var listeUserRef = app.database().ref("Users");
        var idUser= 0;
        
        listeUserRef.once('value').then( (snapshot) => {
            let listePalm = [];
            
            snapshot.forEach( (childSnapshot) => {
                var dataUser = childSnapshot.val();
                idUser = parseInt(childSnapshot.key);
                
                var listeOpeUserRef = app.database().ref("Users/" + idUser + "/listeOpe");
                listeOpeUserRef.once('value').then( (snapshot2) => {
                    var scoreTotal = 0;
                    snapshot2.forEach( (childSnapshot2) => {
                        scoreTotal += parseInt(childSnapshot2.val().score);
                    });

                    dataUser.score=parseInt(scoreTotal);
                    listePalm.push(dataUser);
                    listePalm = this.sortByScore(listePalm);
                    this.setState({ listePalmares : listePalm });
                });
            });
        });
    }

    sortByScore = (listeUser) => {
        listeUser.sort(
            (a, b) => b.score - a.score
        );

        return listeUser;
    }

    sortByEcole = (listeUser) => {
        listeUser.sort(
            (a, b) => {
                let fa = a.ecole.toLowerCase(),
                    fb = b.ecole.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            }
        );

        return listeUser;
    }

    sortByClasse = (listeUser) => {
        listeUser.sort(
            (a, b) => {
                let fa = a.classe.toLowerCase(),
                    fb = b.classe.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            }
        );

        return listeUser;
    }

    onSort = (choixSort) => {
        var listeUser = this.state.listePalmares;
        switch (choixSort) {
            case "score":
                listeUser = this.sortByScore(listeUser);
                break;
            case "ecole":
                listeUser = this.sortByScore(listeUser);
                listeUser = this.sortByEcole(listeUser);
                break;
            case "classe":
                listeUser = this.sortByScore(listeUser);
                listeUser = this.sortByClasse(listeUser);
                break;
            default:
                listeUser = this.sortByScore(listeUser);
                break;
        }
        this.setState({ listePalmares : listeUser });
    }

    render() {
        return (
            <div class="container-table">
                <div className="App2">
                    <select id="comboA" onChange={ (e) => this.onSort(e.target.value) }>
                        <option value="score">Score</option>
                        <option value="ecole">Ecole</option>
                        <option value="classe">Classe</option>
                    </select>
                        <div className="table">
                            <div className="table-header">
                            <div className="filter__link" width="40%">Score:</div>
                            <div className="filter__link" width="40%">Prenom:</div>
                            <div className="filter__link" width="40%">Nom:</div>
                            <div className="filter__link" width="40%">Classe:</div>
                            <div className="filter__link" width="40%">Ecole:</div>
                        </div>
                        {
                            this.state.listePalmares &&
                            this.state.listePalmares.map(
                            (user,index) =>
                                <div className="table-content" key={index}>
                                    <div className="table-row">
                                        <div className="table-data">{user.score}</div>
                                        <div className="table-data">{user.prenom}</div>
                                        <div className="table-data">{user.nom}</div>
                                        <div className="table-data">{user.classe}</div>
                                        <div className="table-data">{user.ecole}</div>
                                    </div>
                                </div>
                            )
                        }
                        </div>
                </div>
            </div>      
        )
    }
}