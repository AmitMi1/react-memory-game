import React from "react";

const CardsContext = React.createContext({
    cards: [],
    totalMatchedCards: 0,
    firstExposedCard: null,
    secondExposedCard: null,
    gameDuration: null,
    victory: (gameDuration) => { },
    reset: () => { },
    exposeFirstCard: (card) => { },
    exposeSecondCard: (card) => { },
    hideCards: (cards) => { },
    matchCards: (cards) => { },
    setCards: (cards) => { },

})

export default CardsContext