import React, { Component } from 'react'

class AffCalcul extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        listeOpeAff :[
        {
          nombre1: 2,
          operateur: "+",
          nombre2: 4,
          resultatCorrect: 6,
          resultats: [6, 9, 3,45]
        },
        {
          nombre1: 5,
          operateur:"+",
          nombre2: 3,
          resultatCorrect:8,
          resultats: [6, 7, 8, 12]
        }
        ,
        {
          nombre1: 10,
          operateur:"+",
          nombre2: 6,
          resultatCorrect:16,
          resultats: [8, 16, 32, 15]
        },
        {
          nombre1: 5,
          operateur:"+",
          nombre2: 9,
          resultatCorrect:14,
          resultats: [9, 14, 18, 20]
        },
        {
          nombre1: 40,
          operateur:"+",
          nombre2: 3,
          resultatCorrect:43,
          resultats: [40, 43, 58, 52]
  
        }],
        calculAff: 0,
        compteurBonneRep: 0
      };
      this.cliquerep.bind(this);
      this.bonneRep.bind(this);
      this.passerCalculSuivant.bind(this);
    }
  
    passerCalculSuivant = () => {
      var calTmp = this.state.calculAff + 1
      if (this.state.listeOpeAff.length > calTmp) {
          this.setState({ calculAff: (this.state.calculAff + 1)});
      }
    }
  
    bonneRep = () => {
      this.setState({compteurBonneRep:(this.state.compteurBonneRep + 1)});
    }
  
    cliquerep = (rep) => {
    var bonRep = this.state.listeOpeAff[this.state.calculAff].resultatCorrect
        if (rep == bonRep){
            alert("bonne réponse");
            this.bonneRep();
            this.passerCalculSuivant();
        
        } else {
            alert("Mauvaise réponse, la réponse correct était: " + this.state.listeOpeAff[this.state.calculAff].resultatCorrect);
            this.passerCalculSuivant();
        }
    }
  
    render() {
        return (
            <div className="App">
                <h1>Score: {this.state.compteurBonneRep}</h1>
                <h1>{this.state.listeOpeAff[this.state.calculAff].nombre1} {this.state.listeOpeAff[this.state.calculAff].operateur} {this.state.listeOpeAff[this.state.calculAff].nombre2} =</h1>
                <br/>
                Cliquez sur la bonne réponse
                <br/>
                
                {
                    this.state.listeOpeAff &&
                    this.state.listeOpeAff[this.state.calculAff].resultats.map(
                    (res,index) =>
                        <button key={index} onClick={ () => {this.cliquerep(res)}}>
                            { res }
                        </button>
                    )
                }
            </div>
        );
    }
}

export default AffCalcul;