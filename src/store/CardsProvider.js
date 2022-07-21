import { useReducer } from "react";
import CardsContext from "./cards-context";

const defaultCardsState = {
    cards: [],
    firstExposedCard: null,
    secondExposedCard: null,
    totalMatchedCards: 0,
    gameOn: false,
    gameDuration: null
}

const cardsReducer = (state, action) => {
    if (action.type === 'SET_CARDS') {
        const cards = action.cards

        return {
            cards: cards,
            firstExposedCard: null,
            secondExposedCard: null,
            totalMatchedCards: 0,
            gameDuration: null
        }
    }

    if (action.type === 'EXPOSE_FIRST_CARD') {

        const updatedFirstCard = { ...action.card }
        const firstCardIdx = state.cards.findIndex(card => card.id === action.card.id)
        const updatedCards = structuredClone(state.cards)
        updatedCards[firstCardIdx].isExposed = true

        return {
            cards: updatedCards,
            firstExposedCard: updatedFirstCard,
            secondExposedCard: state.secondExposedCard,
            totalMatchedCards: state.totalMatchedCards,
            gameDuration: null,
            gameOn: true,

        }
    }

    if (action.type === 'EXPOSE_SECOND_CARD') {
        const updatedSecondCard = { ...action.card }

        const secondCardIdx = state.cards.findIndex(card => card.id === action.card.id)
        const updatedCards = structuredClone(state.cards)
        updatedCards[secondCardIdx].isExposed = true

        return {
            cards: updatedCards,
            firstExposedCard: state.firstExposedCard,
            secondExposedCard: updatedSecondCard,
            totalMatchedCards: state.totalMatchedCards,
            gameDuration: null,
            gameOn: true,
        }
    }

    if (action.type === 'HIDE_CARDS') {
        const { card1, card2 } = action.cards

        const firstCardIdx = state.cards.findIndex(card => card.id === card1.id)
        const secondCardIdx = state.cards.findIndex(card => card.id === card2.id)
        const updatedCards = structuredClone(state.cards)
        updatedCards[firstCardIdx].isExposed = false
        updatedCards[secondCardIdx].isExposed = false

        return {
            cards: updatedCards,
            firstExposedCard: null,
            secondExposedCard: null,
            totalMatchedCards: state.totalMatchedCards,
            gameDuration: null,
            gameOn: true,
        }
    }

    if (action.type === 'MATCH_CARDS') {
        const { card1, card2 } = action.cards

        const firstCardIdx = state.cards.findIndex(card => card.id === card1.id)
        const secondCardIdx = state.cards.findIndex(card => card.id === card2.id)
        const updatedCards = structuredClone(state.cards)
        updatedCards[firstCardIdx].isMatch = true
        updatedCards[secondCardIdx].isMatch = true
        const updatedTotalMatchedCards = state.totalMatchedCards + 2

        return {
            cards: updatedCards,
            firstExposedCard: null,
            secondExposedCard: null,
            totalMatchedCards: updatedTotalMatchedCards,
            gameDuration: null,
            gameOn: true,
        }
    }

    if (action.type === 'VICTORY') {
        const { gameDuration } = action
        return {
            cards: state.cards,
            firstExposedCard: null,
            secondExposedCard: null,
            totalMatchedCards: 0,
            gameDuration: gameDuration,
            gameOn: true,
        }
    }

    if (action.type === 'RESET') {
        return defaultCardsState
    }

}

const CardsProvider = (props) => {
    const [cardsState, dispatchCardsActions] = useReducer(cardsReducer, defaultCardsState)

    const setCardsHandler = (cards) => {
        dispatchCardsActions({ type: 'SET_CARDS', cards: cards })
    }

    const exposeFirstCardHandler = (card) => {
        dispatchCardsActions({ type: 'EXPOSE_FIRST_CARD', card: card })
    }

    const exposeSecondCardHandler = (card) => {
        dispatchCardsActions({ type: 'EXPOSE_SECOND_CARD', card: card })
    }

    const hideCardsHandler = (cards) => {
        dispatchCardsActions({ type: 'HIDE_CARDS', cards: cards })
    }

    const matchCardsHandler = (cards) => {
        dispatchCardsActions({ type: 'MATCH_CARDS', cards: cards })
    }

    const victoryHandler = (gameDuration) => {
        dispatchCardsActions({ type: 'VICTORY', gameDuration: gameDuration })
    }

    const cardsContext = {
        cards: cardsState.cards,
        totalMatchedCards: cardsState.totalMatchedCards,
        firstExposedCard: cardsState.firstExposedCard,
        secondExposedCard: cardsState.secondExposedCard,
        gameDuration: cardsState.gameDuration,
        victory: victoryHandler,
        exposeFirstCard: exposeFirstCardHandler,
        exposeSecondCard: exposeSecondCardHandler,
        hideCards: hideCardsHandler,
        matchCards: matchCardsHandler,
        setCards: setCardsHandler,
    }

    return (
        <CardsContext.Provider value={cardsContext}>
            {props.children}
        </CardsContext.Provider>
    )
}

export default CardsProvider