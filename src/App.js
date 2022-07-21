import Board from "./components/Board/Board";
import Modal from "./components/Modal/Modal";
import { useState, useContext } from "react";
import CardsProvider from "./store/CardsProvider";
import CardsContext from "./store/cards-context";

function App() {

  const [difficulty, setDifficulty] = useState(null)
  const [gameStart, setGameStart] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isVictory, setIsVictory] = useState(false)
  const [gameDuration, setGameDuration] = useState(0)

  const startGameHandler = () => {
    setGameStart(true)
    setIsModalOpen(false)
    setIsVictory(false)
  }

  const gameDurationHandler = (time) => {
    setGameDuration(time)
  }

  const setDifficultyHandler = (difficulty) => {
    setDifficulty(difficulty)
  }

  const closeModalHandler = () => {
    setIsModalOpen(false)
  }

  const victoryHandler = () => {
    setIsVictory(true)
    setIsModalOpen(true)
    setGameStart(false)
  }

  const resetGameHandler = () => {
    setIsVictory(false)
    setGameStart(false)
    setIsModalOpen(true)
    setGameDuration(0)
  }

  return (
    <CardsProvider>
      {!gameStart && isModalOpen && <Modal gameDuration={gameDuration} onReset={resetGameHandler} isVictory={isVictory} onCloseModal={closeModalHandler} onSetDifficulty={setDifficultyHandler} isGameStart={gameStart} />}
      <Board onGameDuration={gameDurationHandler} isModalOpen={isModalOpen} onReset={resetGameHandler} isVictory={isVictory} onVictory={victoryHandler} onStartGame={startGameHandler} gameStart={gameStart} difficulty={difficulty} />
    </CardsProvider>
  );
}

export default App;
