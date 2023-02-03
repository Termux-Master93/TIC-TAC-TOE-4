import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './componets/Square'
import { TURNS } from './constans'
import { checkWinnerFrom, checkedEndGame } from './logical/board'
import { WinnerModal } from './componets/WinnerModal'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
    return Array(16).fill(null)
  })

  const [turns, setTurns] = useState(() => {
    const turnsFromLocalStorage = window.localStorage.getItem('turn')
    return turnsFromLocalStorage ?? TURNS.x
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    console.log(board[index])
    if (board[index] || winner) return
    const newBoard = [...board] //vreamos un nuevo array
    newBoard[index] = turns
    setBoard(newBoard)
    //Llenamos el tablero almacenado el valor segun condicional terniaria
    const newTurns = turns === TURNS.x ? TURNS.o : TURNS.x
    setTurns(newTurns)

    //Guardar el localStore la ultima gugada y el turno
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurns)
    //  Checamos si hay un ganador 
    const newWinner = checkWinnerFrom(newBoard)

    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkedEndGame(newBoard)) {
      setWinner(false)
    }

  }
  const resetGame = () => {
    setBoard(Array(16).fill(null))
    setTurns(TURNS.x)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='board'>
      <h3 className='title'>4 en Raya</h3>
      <button
        onClick={resetGame}
        className='buttonReiniciar'>Reiniciar</button>
      <section className='game'>
        {

          board.map((_, index) => (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          ))
        }
      </section>
      <section className='turn'>
        <Square isSelected={turns === TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected={turns === TURNS.o}>
          {TURNS.o}
        </Square>

      </section>
      <WinnerModal
        winner={winner}
        resetGame={resetGame}
      />
    </main>
  )
}

export default App
