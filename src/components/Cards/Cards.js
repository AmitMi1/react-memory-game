import SingleCard from '../SingleCard/SingleCard'
import './Cards.scss'

const Cards = (props) => {
    const { cards, onStartGame, isGameStart, difficulty, onVictory } = props

    return (
        <section className='cards'>
            {cards.map(card =>
                <SingleCard onVictory={onVictory} difficulty={difficulty} isGameStart={isGameStart} onStartGame={onStartGame} card={card} key={card.id} />)}
        </section>
    )
}

export default Cards