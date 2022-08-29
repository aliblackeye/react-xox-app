import './startpage.scss'
import { Link } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { changeTurn, gameStatus } from '../../redux/gameSlice';
function StartPage() {


    const dispatch = useDispatch()

    const startGame = () => {
        const random = Math.floor((Math.random() * 2))
        random === 0 ? dispatch(changeTurn("p1")) : dispatch(changeTurn("p2"))

        dispatch(gameStatus(true))
    }

    return (
        <div className="start-page">
            <div className="start-page-container">
                <h1 className="game-title"><span className='red'>Tic </span><span className='green'>Tac </span><span className='blue'>Toe </span></h1>
                <div className="buttons-container">
                    <Link to="/local"><button className="start-button online" onClick={startGame}>Yerel Oyun</button></Link>
                    <Link to="/join"><button className="start-button local" onClick={startGame}>Çevrimiçi Oyun</button></Link>
                </div>
            </div>
        </div>
    )
}

export default StartPage