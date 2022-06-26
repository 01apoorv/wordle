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
  const [buttArr, setButtArr] = useState(() => {
    let tmp = []
    tmp[63] = "secondary"
    for (let i = 65; i <= 90; i++) {
      tmp[i] = "secondary"
    }
    return tmp
  })
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
        let tmp2 = [...buttArr]
        let check = ans.split("")
        let gCur = guess.split("")
        for (let i = 0; i < 5; i++) {
          if (gCur[i] === check[i]) {
            tmp[counter][i] = colors[2]
            tmp2[gCur[i].codePointAt(0)] = "success"
            gCur[i] = ''
            check[i] = ''
          }
        }
        if (guess === ans) {
          setCurrMsg(message3)
          setStatus(tmp)
          setButtArr(tmp2)
          setGameOver(true)
          return;
        }
        else {
          for (let i = 0; i < 5; i++) {
            if (gCur[i].length > 0 && check.includes(gCur[i])) {
              tmp[counter][i] = colors[3]
              if (tmp2[gCur[i].codePointAt(0)] !== "success")
                tmp2[gCur[i].codePointAt(0)] = "warning"
              check[check.indexOf(gCur[i])] = ''
              gCur[i] = ''
            }
          }
          for (let i = 0; i < 5; i++) {
            if (gCur[i].length > 0)
              tmp[counter][i] = colors[1]
              if (!(tmp2[gCur[i].codePointAt(0)] === "success" || tmp2[gCur[i].codePointAt(0)] === "warning"))
                tmp2[gCur[i].codePointAt(0)] = "dark"
          }
        }
        setGuess("")
        setStatus(tmp)
        setButtArr(tmp2)
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
    <div id="row3">
      <Row className="justify-content-center">
        <Col>
          <Button onClick={() => update("Q")} id="buttonStyle" variant={buttArr['Q'.codePointAt(0)]} size="sm">Q</Button>
          <Button onClick={() => update("W")} id="buttonStyle" variant={buttArr['W'.codePointAt(0)]} size="sm">W</Button>
          <Button onClick={() => update("E")} id="buttonStyle" variant={buttArr['E'.codePointAt(0)]} size="sm">E</Button>
          <Button onClick={() => update("R")} id="buttonStyle" variant={buttArr['R'.codePointAt(0)]} size="sm">R</Button>
          <Button onClick={() => update("T")} id="buttonStyle" variant={buttArr['T'.codePointAt(0)]} size="sm">T</Button>
          <Button onClick={() => update("Y")} id="buttonStyle" variant={buttArr['Y'.codePointAt(0)]} size="sm">Y</Button>
          <Button onClick={() => update("U")} id="buttonStyle" variant={buttArr['U'.codePointAt(0)]} size="sm">U</Button>
          <Button onClick={() => update("I")} id="buttonStyle" variant={buttArr['I'.codePointAt(0)]} size="sm">I</Button>
          <Button onClick={() => update("O")} id="buttonStyle" variant={buttArr['O'.codePointAt(0)]} size="sm">O</Button>
          <Button onClick={() => update("P")} id="buttonStyle" variant={buttArr['P'.codePointAt(0)]} size="sm">P</Button>
        </Col>
      </Row>
    </div>
    <div id="row2">
      <Row className="justify-content-center">
        <Col>
          <Button onClick={() => update("A")} id="buttonStyle" variant={buttArr['A'.codePointAt(0)]} size="sm">A</Button>
          <Button onClick={() => update("S")} id="buttonStyle" variant={buttArr['S'.codePointAt(0)]} size="sm">S</Button>
          <Button onClick={() => update("D")} id="buttonStyle" variant={buttArr['D'.codePointAt(0)]} size="sm">D</Button>
          <Button onClick={() => update("F")} id="buttonStyle" variant={buttArr['F'.codePointAt(0)]} size="sm">F</Button>
          <Button onClick={() => update("G")} id="buttonStyle" variant={buttArr['G'.codePointAt(0)]} size="sm">G</Button>
          <Button onClick={() => update("H")} id="buttonStyle" variant={buttArr['H'.codePointAt(0)]} size="sm">H</Button>
          <Button onClick={() => update("J")} id="buttonStyle" variant={buttArr['J'.codePointAt(0)]} size="sm">J</Button>
          <Button onClick={() => update("K")} id="buttonStyle" variant={buttArr['K'.codePointAt(0)]} size="sm">K</Button>
          <Button onClick={() => update("L")} id="buttonStyle" variant={buttArr['L'.codePointAt(0)]} size="sm">L</Button>
        </Col>
      </Row>
    </div>
    <div id="row1">
      <Row className="justify-content-center">
        <Col>
          <Button onClick={() => setFlag(!flag)} id="buttonStyle" variant="secondary" size="sm">ENTER</Button>
          <Button onClick={() => update("Z")} id="buttonStyle" variant={buttArr['Z'.codePointAt(0)]} size="sm">Z</Button>
          <Button onClick={() => update("X")} id="buttonStyle" variant={buttArr['X'.codePointAt(0)]} size="sm">X</Button>
          <Button onClick={() => update("C")} id="buttonStyle" variant={buttArr['C'.codePointAt(0)]} size="sm">C</Button>
          <Button onClick={() => update("V")} id="buttonStyle" variant={buttArr['V'.codePointAt(0)]} size="sm">V</Button>
          <Button onClick={() => update("B")} id="buttonStyle" variant={buttArr['B'.codePointAt(0)]} size="sm">B</Button>
          <Button onClick={() => update("N")} id="buttonStyle" variant={buttArr['N'.codePointAt(0)]} size="sm">N</Button>
          <Button onClick={() => update("M")} id="buttonStyle" variant={buttArr['M'.codePointAt(0)]} size="sm">M</Button>
          <Button onClick={() => update("?")} id="buttonStyle" variant={buttArr['?'.codePointAt(0)]} size="sm">?</Button>
          <Button onClick={() => setGuess(guess.slice(0, -1))} id="buttonStyle" variant="secondary" size="sm"><FontAwesomeIcon icon={faDeleteLeft} /></Button>
        </Col>
      </Row>
    </div>
  </div>
  );
}

export default App;
