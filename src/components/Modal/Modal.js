import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.scss'
import { useContext } from 'react'
import CardsContext from '../../store/cards-context'
import ResetButton from '../ResetButton/ResetButton'

const Modal = (props) => {
    const { onReset, onSetDifficulty, onCloseModal, isVictory, gameDuration } = props

    const setDifficultyHandler = (e) => {
        const difficulty = e.target.value
        onSetDifficulty(difficulty)
        onCloseModal()
    }

    let modalContent
    if (!isVictory) {
        modalContent = (<>
            <h3>Welcome!</h3>
            <div className='action_container'>
                <p>Please Choose Difficulty:</p>
                <div className='action_buttons'>
                    <button className='easy' onClick={setDifficultyHandler} value={4}>Easy 4 X 4</button>
                    <button className='medium' onClick={setDifficultyHandler} value={8}>Medium 8 X 8</button>
                    <button className='hard' onClick={setDifficultyHandler} value={10}>Hard 10 X 10</button>
                </div>
            </div>
        </>
        )
    }

    if (isVictory) {
        modalContent = (<>
            <h3>Victory!</h3>
            <div className='action_container'>
                <p>You Are The Winner</p>
                <p>{gameDuration}s</p>
                <ResetButton onReset={onReset} />
            </div>
        </>)
    }

    const clickHandler = (e) => {
        e.stopPropagation()
    }

    return (
        <section className='modal'>
            <div className='modal_backdrop'>
                <div onClick={clickHandler} className='modal_container'>
                    {modalContent}
                </div>
            </div>
        </section>
    )
}

export default Modal