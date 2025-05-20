import { useState, useEffect, useCallback } from 'react'

import { getShuffledArray } from '../utility'

export function useMemoryGame(initialCards) {
    const [cards, setCards] = useState(() => getShuffledArray(initialCards))
    const [openCards, setOpenCards] = useState([])
    const [guessedPairs, setGuessedPairs] = useState([])
    const [isGameEnded, setIsGameEnded] = useState(false)

    // Start a new game
    const newGame = useCallback(() => {
        const newShuffledArray = getShuffledArray(initialCards).map(card => ({...card, isOpened: false}))
        setCards(newShuffledArray)
        setGuessedPairs([])
        setIsGameEnded(false)
        setOpenCards([])
    }, [initialCards])

    // Card flip logic
    const cardFlip = useCallback((id, isGuessed) => {
        if (openCards.length < 2 && isGuessed === false && !openCards.includes(id)) {
            setCards(prevArr => prevArr.map(card => card.id === id ? {...card, isOpened: true} : card))
            
            // Add card id to the openCards array
            setOpenCards(prevArr => [...prevArr, id])
        }
    }, [openCards, cards])

    // Main Game logic
    useEffect(() => {
        let timeout = null

        // Check if all pairs are found then end the game
        if (guessedPairs.length === cards.length / 2) {
            setIsGameEnded(true)
        }

        // Check if two cards are opened right now
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
                    setCards(prevArr => prevArr.map(card => 
                        guessedPairs.includes(card.pairId)
                            ? card
                            : {...card, isOpened: false}
                    ))
                }, 1000)
            }
        }

        return () => clearTimeout(timeout)
    }, [openCards])

    return {
        cards,
        openCards,
        setOpenCards,
        guessedPairs,
        isGameEnded,
        newGame,
        cardFlip
    }
}
