import './onlinegame.scss'
import { useDispatch } from 'react-redux'
import { changeTurn, changeTable, setCounter } from '../../redux/gameSlice';

function OnlineGame() {

    const dispatch = useDispatch()
    const turn = "p1";
    const counter = 0;
    const isStarted = true;
    const winner = "p1";
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

export default OnlineGame