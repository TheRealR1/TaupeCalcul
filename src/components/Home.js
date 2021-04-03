import React from 'react'

export default function Home() {
    return (
        <div>
            <h1>Test TaupeCalcul</h1>
            <button onClick={ () => { alert("Addition") } }><img src="plus.png" style={{width: 100 + "px"}, {height: 100 + "px"}}></img></button>
            <button onClick={ () => { alert("Soustraction") } }><img src="moins.png" style={{width: 100 + "px"}, {height: 100 + "px"}}></img></button>
            <button onClick={ () => { alert("Multiplication") } }><img src="mult.png" style={{width: 100 + "px"}, {height: 100 + "px"}}></img></button>
            <button onClick={ () => { alert("Division") } }><img src="div.png" style={{width: 100 + "px"}, {height: 100 + "px"}}></img></button>
        </div>
    )
}
