import './App.css';
import guesses from './guesses.js'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from "react";

const App = () => {
  const [box, setBox] = useState([['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']])
  const [status, setStatus] = useState([["black", "black", "black", "black", "black"],["black", "black", "black", "black", "black"],
  ["black", "black", "black", "black", "black"],["black", "black", "black", "black", "black"],["black", "black", "black", "black", "black"],
  ["black", "black", "black", "black", "black"]])
  const [guess, setGuess] = useState("")
  const [flag, setFlag] = useState(false)
  const [counter, setCounter] = useState(0)
  const colors = ["black", "gray", "green", "orange"]
  const keys = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ?'.split(""))
  const message1 = "Is that even a word?"
  const message2 = "Not enough letters!"
  const message3 = "Yes Meghan, this was my way of asking you on a date :)"
  const message4 = "The word was \"DATE?\" and it was my way of asking you out :/"
  const [currMsg, setCurrMsg] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [first, setFirst] = useState(true)
  const ans = "DATE?"

  useEffect(() => {
    const updateBoard = () => {
      let tmp = [...box]
      tmp[counter] = guess.split("")
      setBox(tmp)
    }
    if (gameOver)
      return;
    updateBoard();
  }, [guess]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const checkGuess = () => {
      if (guess.length === 5 && guesses.has(guess)) {
        let tmp = [...status]
        let check = ans.split("")
        let gCur = guess.split("")
        for (let i = 0; i < 5; i++) {
          if (gCur[i] === check[i]) {
            tmp[counter][i] = colors[2]
            gCur[i] = ''
            check[i] = ''
          }
        }
        if (guess === ans) {
          setCurrMsg(message3)
          setStatus(tmp)
          setGameOver(true)
          return;
        }
        else {
          for (let i = 0; i < 5; i++) {
            if (gCur[i].length > 0 && check.includes(gCur[i])) {
              tmp[counter][i] = colors[3]
              check[check.indexOf(gCur[i])] = ''
              gCur[i] = ''
            }
          }
          for (let i = 0; i < 5; i++) {
            if (gCur[i].length > 0)
              tmp[counter][i] = colors[1]
          }
        }
        setGuess("")
        setStatus(tmp)
        if (counter === 5) {
          setCurrMsg(message4)
          setGameOver(true)
          return;
        }
        setCounter(c => c+1)
      }
      else if (guess.length < 5) {
        if (!first) {
          setCurrMsg(message2)
          setTimeout(() => setCurrMsg(""), 3000)
        }
        else
          setFirst(false)
      }
      else {
        setCurrMsg(message1)
        setTimeout(() => setCurrMsg(""), 3000)
      }
    }
    if (gameOver)
      return;
    checkGuess()
  }, [flag]) // eslint-disable-line react-hooks/exhaustive-deps

  const update = (letter) => {
    if (gameOver)
      return;
    if (guess.length < 5)
      setGuess(guess+letter)
  }

  const handler = (event) => {
    if (gameOver)
      return;
    if (event.key === 'Enter') {
      setFlag(!flag)
    }
    else if (event.key === 'Backspace') {
      setGuess(guess.slice(0, -1))
    }
    else if (keys.has(event.key.toUpperCase())) {
      update(event.key.toUpperCase())
    }
  }
  
  return (
  <div className="main" tabIndex="0" onKeyDown={(e) => handler(e)}>
    <div className = "game-board">
      <div className="box" style={{backgroundColor: status[0][0]}}>{box[0][0]}</div>
      <div className="box" style={{backgroundColor: status[0][1]}}>{box[0][1]}</div>
      <div className="box" style={{backgroundColor: status[0][2]}}>{box[0][2]}</div>
      <div className="box" style={{backgroundColor: status[0][3]}}>{box[0][3]}</div>
      <div className="box" style={{backgroundColor: status[0][4]}}>{box[0][4]}</div>
      <div className="box" style={{backgroundColor: status[1][0]}}>{box[1][0]}</div>
      <div className="box" style={{backgroundColor: status[1][1]}}>{box[1][1]}</div>
      <div className="box" style={{backgroundColor: status[1][2]}}>{box[1][2]}</div>
      <div className="box" style={{backgroundColor: status[1][3]}}>{box[1][3]}</div>
      <div className="box" style={{backgroundColor: status[1][4]}}>{box[1][4]}</div>
      <div className="box" style={{backgroundColor: status[2][0]}}>{box[2][0]}</div>
      <div className="box" style={{backgroundColor: status[2][1]}}>{box[2][1]}</div>
      <div className="box" style={{backgroundColor: status[2][2]}}>{box[2][2]}</div>
      <div className="box" style={{backgroundColor: status[2][3]}}>{box[2][3]}</div>
      <div className="box" style={{backgroundColor: status[2][4]}}>{box[2][4]}</div>
      <div className="box" style={{backgroundColor: status[3][0]}}>{box[3][0]}</div>
      <div className="box" style={{backgroundColor: status[3][1]}}>{box[3][1]}</div>
      <div className="box" style={{backgroundColor: status[3][2]}}>{box[3][2]}</div>
      <div className="box" style={{backgroundColor: status[3][3]}}>{box[3][3]}</div>
      <div className="box" style={{backgroundColor: status[3][4]}}>{box[3][4]}</div>
      <div className="box" style={{backgroundColor: status[4][0]}}>{box[4][0]}</div>
      <div className="box" style={{backgroundColor: status[4][1]}}>{box[4][1]}</div>
      <div className="box" style={{backgroundColor: status[4][2]}}>{box[4][2]}</div>
      <div className="box" style={{backgroundColor: status[4][3]}}>{box[4][3]}</div>
      <div className="box" style={{backgroundColor: status[4][4]}}>{box[4][4]}</div>
      <div className="box" style={{backgroundColor: status[5][0]}}>{box[5][0]}</div>
      <div className="box" style={{backgroundColor: status[5][1]}}>{box[5][1]}</div>
      <div className="box" style={{backgroundColor: status[5][2]}}>{box[5][2]}</div>
      <div className="box" style={{backgroundColor: status[5][3]}}>{box[5][3]}</div>
      <div className="box" style={{backgroundColor: status[5][4]}}>{box[5][4]}</div>
    </div>
    <div className="message">
      <p>{currMsg}</p>
    </div>
    <div id="button">
      <Row>
        <Button onClick={() => update("Q")} as={Col} id="buttonStyle" variant="secondary" size="lg">Q</Button>
        <Button onClick={() => update("W")} as={Col} id="buttonStyle" variant="secondary" size="lg">W</Button>
        <Button onClick={() => update("E")} as={Col} id="buttonStyle" variant="secondary" size="lg">E</Button>
        <Button onClick={() => update("R")} as={Col} id="buttonStyle" variant="secondary" size="lg">R</Button>
        <Button onClick={() => update("T")} as={Col} id="buttonStyle" variant="secondary" size="lg">T</Button>
        <Button onClick={() => update("Y")} as={Col} id="buttonStyle" variant="secondary" size="lg">Y</Button>
        <Button onClick={() => update("U")} as={Col} id="buttonStyle" variant="secondary" size="lg">U</Button>
        <Button onClick={() => update("I")} as={Col} id="buttonStyle" variant="secondary" size="lg">I</Button>
        <Button onClick={() => update("O")} as={Col} id="buttonStyle" variant="secondary" size="lg">O</Button>
        <Button onClick={() => update("P")} as={Col} id="buttonStyle" variant="secondary" size="lg">P</Button>
      </Row>
      <Row>
        <Button onClick={() => update("A")} as={Col} id="buttonStyle" variant="secondary" size="lg">A</Button>
        <Button onClick={() => update("S")} as={Col} id="buttonStyle" variant="secondary" size="lg">S</Button>
        <Button onClick={() => update("D")} as={Col} id="buttonStyle" variant="secondary" size="lg">D</Button>
        <Button onClick={() => update("F")} as={Col} id="buttonStyle" variant="secondary" size="lg">F</Button>
        <Button onClick={() => update("G")} as={Col} id="buttonStyle" variant="secondary" size="lg">G</Button>
        <Button onClick={() => update("H")} as={Col} id="buttonStyle" variant="secondary" size="lg">H</Button>
        <Button onClick={() => update("J")} as={Col} id="buttonStyle" variant="secondary" size="lg">J</Button>
        <Button onClick={() => update("K")} as={Col} id="buttonStyle" variant="secondary" size="lg">K</Button>
        <Button onClick={() => update("L")} as={Col} id="buttonStyle" variant="secondary" size="lg">L</Button>
      </Row>
      <Row>
        <Button onClick={() => setFlag(!flag)} as={Col} id="buttonStyle" variant="secondary" size="lg">ENTER</Button>
        <Button onClick={() => update("Z")} as={Col} id="buttonStyle" variant="secondary" size="lg">Z</Button>
        <Button onClick={() => update("X")} as={Col} id="buttonStyle" variant="secondary" size="lg">X</Button>
        <Button onClick={() => update("C")} as={Col} id="buttonStyle" variant="secondary" size="lg">C</Button>
        <Button onClick={() => update("V")} as={Col} id="buttonStyle" variant="secondary" size="lg">V</Button>
        <Button onClick={() => update("B")} as={Col} id="buttonStyle" variant="secondary" size="lg">B</Button>
        <Button onClick={() => update("N")} as={Col} id="buttonStyle" variant="secondary" size="lg">N</Button>
        <Button onClick={() => update("M")} as={Col} id="buttonStyle" variant="secondary" size="lg">M</Button>
        <Button onClick={() => update("?")} as={Col} id="buttonStyle" variant="secondary" size="lg">?</Button>
        <Button onClick={() => setGuess(guess.slice(0, -1))} as={Col} id="buttonStyle" variant="secondary" size="lg"><FontAwesomeIcon icon={faDeleteLeft} /></Button>
      </Row>
    </div>
  </div>
  );
}

export default App;
