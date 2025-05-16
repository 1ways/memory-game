import { useEffect, useState } from 'react'

import cardsArr from './data'

import Card from './components/Card'

import { getShuffledArray } from './utility'

export default function App() {
    // States
    const [cards, setCards] = useState(() => getShuffledArray(cardsArr))
    const [openCards, setOpenCards] = useState([])
    const [guessedPairs, setGuessedPairs] = useState([])
    const [isGameEnded, setIsGameEnded] = useState(false)

    // Render cards
    const cardsElements = cards.map(card => {
        const isGuessed = guessedPairs.includes(card.pairId)

        return <Card 
                    key={card.id} 
                    icon={card.icon} 
                    id={card.id} 
                    isGuessed={isGuessed}
                    isOpened={card.isOpened}
                    openCards={openCards}
                    setOpenCards={setOpenCards}
                    setCards={setCards}
                />
    })

    // Start a new game
    function newGame() {
        const newShuffledArray = getShuffledArray(cardsArr).map(card => {
            card.isOpened = false

            return card
        })
        setCards(newShuffledArray)
        setGuessedPairs([])
        setIsGameEnded(false)
    }

    useEffect(() => {
        let timeout = null

        if (guessedPairs.length === cards.length / 2) {
            setIsGameEnded(true)
        }

        if (openCards.length === 2) {
            // Find two objects by their ids
            const firstCard = cards.find(card => card.id === openCards[0])
            const secondCard = cards.find(card => card.id === openCards[1])

            // Compare their pairId value
            if (firstCard.pairId === secondCard.pairId) {
                setGuessedPairs(prevArr => [...prevArr, firstCard.pairId])
                setOpenCards([])
            } else {
                timeout = setTimeout(() => {
                    setOpenCards([])

                    // Flip all the cards whose pairId is not in the guessedPairs arr
                    setCards(prevArr => prevArr.map(card => {
                        if (!guessedPairs.includes(card.pairId)) {
                            card.isOpened = false
                        }

                        return card
                    }))
                }, 1000)
            }
        }

        return () => clearTimeout(timeout)
    }, [openCards])

    return (
        <div className='wrapper'>
            <h1 className='title'>The Memory Game</h1>
            <p className='subtitle'>Memory Game: Arrange cards face down in a grid. Take turns flipping two cards. Match pairs to keep them and play again. No match? Turn them back over. Player with most pairs wins. Have fun testing your memory!</p>
            <div className='board'>
                {cardsElements}
                <div className={`new-game__overlay${isGameEnded ? ' show' : ''}`}>
                    <p className="new-game__text">You won!</p>
                    <button className='new-game__button' onClick={newGame}>New Game</button>
                </div>
            </div>
        </div>
    )
}