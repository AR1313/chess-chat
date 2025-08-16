import { usePieces } from "../context/PiecesContext.jsx";
import chessIcons from '../assets/chessIcons.js'
import { cornerRounding } from '../utils/ui.js'

export default function Square({ color, coord }) {

    const corner = cornerRounding(coord)
    const icons = chessIcons
    const pieces = usePieces();
    if (pieces.hasOwnProperty(coord)) {
        console.log(coord, pieces[coord], icons[pieces[coord]?.name]);
    }
    else {
        console.log("PIECES: ", pieces)
    }

    return (
        <div
            className={`square ${color}`}
            role="gridcell"
            aria-label={coord}
            style={{ borderRadius: corner }}>
            {
                pieces.hasOwnProperty(coord) &&
                <img src={icons[pieces[coord].name]} />

            }
        </div>
    );
}