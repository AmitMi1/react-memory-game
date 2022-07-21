import { useContext } from 'react'
import './SingleCard.scss'
import CardsContext from '../../store/cards-context'
import cardImage from '../../assets/card.png'


const SingleCard = (props) => {
    const cardsCtx = useContext(CardsContext)

    const { card, onStartGame, isGameStart, difficulty, onVictory } = props

    let exposeClasses = `flip_card ${card.isExposed ? 'exposed' : ''}`

    switch (+difficulty) {
        case 4:
            break;

        case 8:
            exposeClasses += ' medium'
            break;

        case 10:
            exposeClasses += ' hard'
            break;

        default:
            break;
    }

    let matchClasses = `flip_card_back ${card.isMatch ? 'match' : ''}`

    const exposeCardHandler = () => {

        if (!isGameStart) {
            onStartGame()
            cardsCtx.exposeFirstCard(card)
        }

        if (cardsCtx.firstExposedCard && cardsCtx.secondExposedCard || card.isExposed) {
            return
        }


        if (!cardsCtx.firstExposedCard) {
            cardsCtx.exposeFirstCard(card)
            return
        }

        if (!cardsCtx.secondExposedCard) {

            cardsCtx.exposeSecondCard(card)

            const match = cardsCtx.firstExposedCard.value === card.value

            const cards = { card1: { ...cardsCtx.firstExposedCard }, card2: { ...card } }

            if (match) {
                cardsCtx.matchCards(cards)
                const { totalMatchedCards } = cardsCtx
                if (totalMatchedCards === cardsCtx.cards.length - 2) {
                    setTimeout(() => {
                        onVictory()
                    }, 1500);
                }
            }

            if (!match) {
                setTimeout(() => {
                    cardsCtx.hideCards(cards)
                }, 1000);
            }
        }
    }

    return (
        <section onClick={exposeCardHandler} className={exposeClasses}>
            <div className={`flip_card_inner`}>
                <div className="flip_card_front">
                    <img src={cardImage} alt="" />
                </div>
                <div className={matchClasses}>
                    {card.value}
                </div>
            </div>
        </section>
    )
}

export default SingleCard