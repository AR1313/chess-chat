import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const PiecesContext = createContext([]);

// Provider component
export const PiecesProvider = ({ children }) => {

    const [pieces, setPieces] = useState([])

    useEffect(() => {

        async function fetchPieces() {
            try {
                const res = await axios.get(`${API_URL}/api/chess-pieces`)
                setPieces(res.data)
            }
            catch (err) {
                console.error("Error fetching pieces: ", err)
            }
        }

        fetchPieces()

    }, [])


    return (
        <PiecesContext.Provider value={pieces}>
            {children}
        </PiecesContext.Provider>
    );
};

// Custom hook for easier access
export const usePieces = () => useContext(PiecesContext);