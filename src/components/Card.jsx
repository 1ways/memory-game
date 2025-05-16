export default function Card({ icon, id, isGuessed, isOpened, openCards, setOpenCards, setCards }) {
    function handleClick() {
        // Only flip card when openCards arr length is less then 2 and it is not guessed
        if (openCards.length < 2 && isGuessed === false && !openCards.includes(id)) {
            setCards(prevArr => prevArr.map(card => {
                if (card.id === id) {
                    card.isOpened = !isOpened
                }

                return card
            }))

            // Add card id to the openCards array
            setOpenCards(prevArr => [...prevArr, id])
        }
    }

    return (
        <button className={`card${isOpened ? '' : ' closed'}${isGuessed ? ' guessed' : ''}`} onClick={handleClick} disabled={isGuessed} aria-label={`${isGuessed ? 'Button is guessed' : 'Button is not guessed'}`}>
            {isOpened && icon}
        </button>
    )
}