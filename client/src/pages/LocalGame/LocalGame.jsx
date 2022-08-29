import './localgame.scss';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { gameStatus, changeTurn, changeTable, changeWinner, resetTable, setCounter } from '../../redux/gameSlice';
import { useEffect } from 'react';

function LocalGame() {

    const { isStarted, gameTable, turn, winner, counter } = useSelector((state) => state.game)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (box) => {

        if (!winner) {
            if (!box.target.innerText) {
                if (turn === "p1") {
                    box.target.innerText = "O"
                    box.target.classList.toggle("p1")
                    dispatch(changeTable({ index: box.target.id, string: "O" }))
                }
                if (turn === "p2") {
                    box.target.innerText = "X"
                    box.target.classList.toggle("p2")
                    dispatch(changeTable({ index: box.target.id, string: "X" }))
                }

                box.target.classList.toggle("active")
                dispatch(setCounter(counter + 1))
                dispatch(changeTurn())
            }
        }

    }

    useEffect(() => {

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        var count = 0;
        winPatterns.forEach(pattern => {
            const indexes = pattern;
            count += 1;
            if (gameTable[indexes[0]] === gameTable[indexes[1]] && gameTable[indexes[2]] === gameTable[indexes[1]] &&
                gameTable[indexes[0]] !== null && gameTable[indexes[1]] !== null && gameTable[indexes[2]] !== null) {
                return gameTable[indexes[0]] === "O" ? dispatch(changeWinner("p1")) : dispatch(changeWinner("p2"))
            }

            if (count === 7) {
                counter === 9 && dispatch(changeWinner("draw"));
            }

        })

        !isStarted && navigate("/")


        winner && setTimeout(() => {
            navigate("/")
            dispatch(resetTable())
            dispatch(gameStatus(false))
            dispatch(changeWinner(null))
            dispatch(changeTurn(null))
            dispatch(setCounter(0))
        }, 1400);



    }, [gameTable, dispatch, isStarted, navigate, winner, counter])





    return (
        <div className="xox">

            <div className="xox-container">
                {isStarted && <>

                    <div className="game-status">
                        <h1 className={`finish-text ${winner && "active"}`}>{winner === "draw" && "Berabere"}</h1>
                    </div>
                    <div className="players">

                        <div className="player p1">
                            <div className={`winner ${winner === "p1" && "active"}`}><img src='./img/king.png' alt='' /></div>
                            <span className="player-text">O</span>
                            <div className={`turn ${(turn === "p1" && !winner) && "active"}`}><img src='./img/arrow.png' alt='' /></div>
                        </div>

                        <div className="player p2">
                            <div className={`winner ${winner === "p2" && "active"}`}><img src='./img/king.png' alt='' /></div>
                            <span className="player-text">X</span>
                            <div className={`turn ${(turn === "p2" && !winner) && "active"}`}><img src='./img/arrow.png' alt='' /></div>
                        </div>
                    </div>

                    <div className="xox-table">
                        <div id="0" className="box" onClick={(e) => { handleClick(e) }}></div>
                        <div id="1" className="box" onClick={(e) => { handleClick(e) }}></div>
                        <div id="2" className="box" onClick={(e) => { handleClick(e) }}></div>
                        <div id="3" className="box" onClick={(e) => { handleClick(e) }}></div>
                        <div id="4" className="box" onClick={(e) => { handleClick(e) }}></div>
                        <div id="5" className="box" onClick={(e) => { handleClick(e) }}></div>
                        <div id="6" className="box" onClick={(e) => { handleClick(e) }}></div>
                        <div id="7" className="box" onClick={(e) => { handleClick(e) }}></div>
                        <div id="8" className="box" onClick={(e) => { handleClick(e) }}></div>
                    </div>

                </>
                }

            </div>
        </div>
    )
}

export default LocalGame