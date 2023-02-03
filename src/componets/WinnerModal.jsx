import { Square } from "./Square";
export function WinnerModal({ winner, resetGame }) {
    if (winner === null) return null
    const textWinner = winner === false ? 'Empate' : 'Gano'
    return (
        <section className="winner">
            <div className="text">
                <h2>{textWinner}</h2>
                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                    <button onClick={resetGame}>Reiniciar</button>
                </footer>
            </div>
        </section>
    );
}