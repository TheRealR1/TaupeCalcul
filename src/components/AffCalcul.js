import React, { Component } from 'react'
import app from '../firebase'
import { withRouter } from 'react-router-dom';
import './affCalcul.css';
import Modal from './Modal'
import EmailUser from './EmailUser';

class AffCalcul extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listeOpeAff :[],
            calculAff: 0,
            compteurBonneRep: 0,
            visible: false
        };

        this.cliquerep.bind(this);
        this.bonneRep.bind(this);
        this.passerCalculSuivant.bind(this);
        this.getCalculsListeOpe.bind(this);
        this.updateUserScore.bind(this);
    }

    componentDidMount() {
        this.getCalculsListeOpe(parseInt(this.props.match.params.id));
    }
  
    passerCalculSuivant = () => {
      var calTmp = this.state.calculAff + 1;
      if (this.state.listeOpeAff.length > calTmp) {
          this.setState({ calculAff: calTmp});
      } else {
          this.montre();
      }

    }
  
    bonneRep = () => {
      this.setState({compteurBonneRep:(this.state.compteurBonneRep + 1)});
    }
  
    cliquerep = (rep) => {
        var bonRep = this.state.listeOpeAff[this.state.calculAff].resultatCorrect
        if (rep === bonRep){
            alert("bonne réponse");
            this.bonneRep();
            this.passerCalculSuivant();
        
        } else {
            alert("Mauvaise réponse, la réponse correct était: " + this.state.listeOpeAff[this.state.calculAff].resultatCorrect);
            this.passerCalculSuivant();
        }
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

    updateUserScore = (score) => {
        var email = document.getElementById("emailUser").value;
        var idOpe = parseInt(this.props.match.params.id);

        var listeUserRef = app.database().ref("Users");
        var idUser= 0;
        var data = null;
        listeUserRef.once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().email === email) {
                    data = childSnapshot.val();
                    idUser = parseInt(childSnapshot.key);
                }
            });
    
            if (data != null) {
                var listeOpeUserRef = app.database().ref("Users/" + idUser + "/listeOpe");
                var idListeOpe = 0;
                var isOpeDejaExistant = false;
                listeOpeUserRef.once('value').then(function(snapshot2) {
                    snapshot2.forEach(function(childSnapshot2) {
                        if (!isOpeDejaExistant) {
                            if (childSnapshot2.val().idOperation === idOpe) {
                                idListeOpe = parseInt(childSnapshot2.key);
                                isOpeDejaExistant = true;
                            } else {
                                idListeOpe = parseInt(childSnapshot2.key) + 1;
                            }
                        }
                    });

                    listeOpeUserRef.child(idListeOpe).set({
                        idOperation: idOpe,
                        score: score
                    });
                });
            }
        });
    }
    
    montre = () => {
        var calTmp = this.state.calculAff +1
        if (this.state.listeOpeAff.length <= calTmp) {
            this.setState({visible: true})
        }
    }
    
    cache = (score) => {
        this.setState({
            visible:false
        })
        this.updateUserScore(score);
    }
  
    render() {
        return (
            <div className="App d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    {
                        this.state.listeOpeAff &&
                        this.state.listeOpeAff[this.state.calculAff] &&
                        <h1 className="Bouton">{this.state.listeOpeAff[this.state.calculAff].nombre1} {this.state.listeOpeAff[this.state.calculAff].operateur} {this.state.listeOpeAff[this.state.calculAff].nombre2} =</h1>
                    }
                    <br/>
                    Cliquez sur la bonne réponse
                    <br/>
                    
                    {
                        this.state.listeOpeAff &&
                        this.state.listeOpeAff[this.state.calculAff] &&
                        this.state.listeOpeAff[this.state.calculAff].resultats.map(
                        (res,index) =>
                            <button className='Bouton' key={index} onClick={ () => {this.cliquerep(res)}} >
                                { res }
                                <img src="../taupe.png" alt="" style={{width: 100 + "px", height: 100 + "px"}}></img>
                            </button>
                        )
                    }
                    <Modal visible = {this.state.visible}
                        cache={this.cache}
                        rep={this.state.compteurBonneRep}/> 

                    <EmailUser />
                </div>   
            </div>
        );
    }
}

export default withRouter(AffCalcul);