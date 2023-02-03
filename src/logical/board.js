import { WINNER_COMBOS } from "../constans";
export const checkWinnerFrom = (boardToCheck) => {
    for (let combo of WINNER_COMBOS) {
        const [a, b, c, d] = combo;
        if (boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c] &&
            boardToCheck[a] === boardToCheck[d]) {
            return boardToCheck[a]
        }
    }
    return null
}
//Chekamos si se termino el guego
export const checkedEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
}