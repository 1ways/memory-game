import { useMemoryGame } from './hooks/useMemoryGame'

import Card from './components/Card'

import cardsArr from './data'

export default function App() {
    const { cards, isGameEnded, newGame, guessedPairs, cardFlip } = useMemoryGame(cardsArr)

    // Render cards
    const cardsElements = cards.map(card => (
        <Card 
            key={card.id} 
            icon={card.icon} 
            id={card.id}
            isOpened={card.isOpened}
            isGuessed={guessedPairs.includes(card.pairId)}
            onFlip={cardFlip}
        />
    ))

    return (
        <div className='wrapper'>
            <h1 className='title'>The Memory Game</h1>
            <p className='subtitle'>Memory Game: Flip randomly arranged cards and try to match them with their pairs. Have fun testing your memory!</p>
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