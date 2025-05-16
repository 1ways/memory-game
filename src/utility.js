export function getShuffledArray(arr) {
    const newArr = [...arr]

    let currentIndex = newArr.length

    while (currentIndex != 0) {

        const randomIndex = Math.floor( Math.random() * currentIndex )
        currentIndex--

        [newArr[currentIndex], newArr[randomIndex]] = [newArr[randomIndex], newArr[currentIndex]]
    }

    return newArr
}