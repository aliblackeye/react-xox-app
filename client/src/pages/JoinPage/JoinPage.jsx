import './joinpage.scss';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { TiArrowBack } from 'react-icons/ti'

function JoinPage() {

    const [currentUser, setCurrentUser] = useState("");
    const [room, setRoom] = useState("");

    const navigate = useNavigate()

    const joinRoom = (e) => {
        e.preventDefault();
        if (currentUser && room) {
            navigate(`/game?name=${currentUser}&room=${room}`, { replace: true })
        }
    }

    return (
        <div className="join-page">
            <div className="join-page-container">
            <h1 className="game-title"><span className='red'>Tic </span><span className='green'>Tac </span><span className='blue'>Toe </span></h1>
                <form className='join-game-form'>
                    <h1 className="form-title">Katıl</h1>
                    <div className="input-group">
                        <input type="text" placeholder='İsminiz' onChange={e => setCurrentUser(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder='Oda İsmi' onChange={e => setRoom(e.target.value)} onKeyDown={e => e.key === "Enter" && joinRoom(e)} />
                    </div>
                    <div className="button-container">
                        <button onClick={e => joinRoom(e)} className="join-button">Oyna</button>
                        <a href='/' className="back-button"><TiArrowBack /></a>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default JoinPage