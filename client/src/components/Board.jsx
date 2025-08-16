import Square from './Square';
import '../styles/Board.css';

export default function Board(pieces) {
    const squares = [];


    for (let row = 8; row >= 1; row--) {
        for (let col = 0; col < 8; col++) {
            const coord = String.fromCharCode(97 + col) + row; // a8, b8, etc.
            const isDark = (row + col) % 2 === 1;
            squares.push(
                <Square
                    key={coord}
                    coord={coord}
                    color={isDark ? 'dark' : 'light'}
                />
            );
        }
    }

    return (
        <div className="board" role="grid" aria-label="Empty 8 by 8 chessboard">
            {squares}
        </div>
    );
}