import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    /*this.state = {
      listeOpeAff = [
      {
        nb1: 2,
        ope: "+",
        nb2: 4,
        resultatCorrect: 6,
        resultats: [6, "sarthak", 3, "devesh"]
      },
      {
        nb1: 2,
        nb2: 4,
        resultats: [6, "sarthak", "somil", "devesh"]
      }],
      calculAff: 0,
      compteurBonneRep: 0
    };*/
  }

  /*git clone http://github...
  git add -A
  git commit -m "Ceci"
  git push
  <h1>{this.state.listeOpeAff[0].nb1}&nbsp{this.state.listeOpeAff[0].ope}{this.state.listeOpeAff[0].nb1}</h1>
  <button>this.state.listeOpeAff[0].resultats[2]</button><button>this.state.listeOpeAff[0].resultats[0]</button>

  Calculs
  - calcul1 ==> tableOpe1
  - calcul2 ==> tableOpe2
  - calcul3 ==> tableOpe1

  JSON = {
    "jour": "28/03/2021",
    "temps" "nuageux",
    "question": {
      "texte": "Fait-il beau ?",
      reponses: [{
        "valeur": "OUI"
      }, {
        "valeur": "NON"
      }]
    }
  }

  BDD
    I
    JSON (API REST)
    I
  API (BACK)
    I
  Services
    I
    Front (Vue = React/JS)
  */

  render() {
    return (
      <div className="App">
        <h1>Test TaupeCalcul</h1>
        <button onClick={ () => { alert("Addition") } }><img src="plus.png" style={{width: 100 + "px"}, {height: 100 + "px"}}></img></button>
        <button onClick={ () => { alert("Soustraction") } }><img src="moins.png" style={{width: 100 + "px"}, {height: 100 + "px"}}></img></button>
        <button onClick={ () => { alert("Multiplication") } }><img src="mult.png" style={{width: 100 + "px"}, {height: 100 + "px"}}></img></button>
        <button onClick={ () => { alert("Division") } }><img src="div.png" style={{width: 100 + "px"}, {height: 100 + "px"}}></img></button>
      </div>
    );
  }
}

export default App;
