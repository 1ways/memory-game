import React from 'react'

function Card({ icon, id, isOpened, isGuessed, onFlip }) {
    return (
        <button 
            className={`card${isOpened ? '' : ' closed'}${isGuessed ? ' guessed' : ''}`} 
            aria-label={`${isGuessed ? 'Button is guessed' : 'Button is not guessed'}`}
            onClick={() => onFlip(id, isGuessed)} 
            disabled={isGuessed} 
        >
            {isOpened && icon}
        </button>
    )
}

export default React.memo(Card)