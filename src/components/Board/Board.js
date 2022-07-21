import React, { useEffect, useContext, useState } from 'react'
import './Board.scss'
import Cards from '../Cards/Cards'
import CardsContext from '../../store/cards-context'
import { shuffle, getRndIntInc, makeId } from '../../utils'
import Timer from '../Timer/Timer'
import ResetButton from '../ResetButton/ResetButton'

const Board = (props) => {

    const { gameStart, onStartGame, onVictory, isVictory, isModalOpen } = props

    let { difficulty } = props

    const cardsCtx = useContext(CardsContext)

    const [time, setTime] = useState(0)

    let timerIntervalId

    useEffect(() => {
        if (gameStart && time === 0) {
            timerIntervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000);
        }

        if (isVictory) {
            props.onGameDuration(time)
            setTime(0)

        }
        if (!gameStart) {
            setTime(0)
        }

        return () => {
            clearInterval(timerIntervalId)
        }
    }, [gameStart])

    useEffect(() => {
        if (cardsCtx.cards.length !== 0 && gameStart) {
            return
        }

        if (!difficulty) {
            difficulty = 4
        }

        const cardsAmount = difficulty ** 2
        let cardsArray = []
        for (let i = 0; i < cardsAmount / 2; i++) {
            const randomNumber = getRndIntInc(1, 99)
            cardsArray.push({
                id: makeId(),
                value: randomNumber,
                isExposed: false,
                isMatch: false
            })
        }

        cardsArray.forEach((card) =>
            cardsArray.push({
                id: makeId(),
                value: card.value,
                isExposed: card.isExposed,
                isMatch: card.isMatch
            }))
        const shuffledCards = shuffle(cardsArray)

        cardsCtx.setCards(shuffledCards)

    }, [difficulty, gameStart, isVictory])

    return (
        <main>
            <section className='main_board'>
                <Timer
                    time={time * 1000}
                    gameStart={gameStart} />
                <ResetButton onReset={props.onReset} />
                <Cards
                    time={time * 1000}
                    onVictory={onVictory}
                    difficulty={difficulty}
                    isGameStart={gameStart}
                    onStartGame={onStartGame}
                    cards={cardsCtx.cards} />
            </section>
        </main>
    )
}

export default Board