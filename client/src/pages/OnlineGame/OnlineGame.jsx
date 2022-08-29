import './onlinegame.scss'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'

let socket;

const ENDPOINT = process.env.REACT_APP_ENDPOINT

function OnlineGame() {

    const navigate = useNavigate()

    const [waitingUser, setWaitingUser] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [participant, setParticipant] = useState("");
    const [roomName, setRoomName] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [roomData, setRoomData] = useState(null);

    const { name, room } = queryString.parse(document.location.search);

    // ---------------------------------------------------------------------

    const [serverState, setServerState] = useState(null);
    const [winner, setWinner] = useState(null);
    const [gameTable, setGameTable] = useState([null, null, null, null, null, null, null, null, null]);
    const [turn, setTurn] = useState(null);
    const [counter, setCounter] = useState(0);
    const [winPatterns, setWinPatterns] = useState([]);
    const [symbol, setSymbol] = useState(null);



    useEffect(() => {

        socket = io(ENDPOINT)

        setCurrentUser(name);
        setRoomName(room);

        socket.emit("join", { name, room }, (error) => {
            if (error) {
                alert(error)
                navigate("/join", { replace: true })
            }
        });


    }, [name, room, navigate])


    useEffect(() => {
        socket.on("userJoined", async (data) => {
            setRoomData(data);
            if (data.users.length === 2) {
                const participant = (data.users.filter(user => user.name !== currentUser))[0].name

                setParticipant(participant ? participant : null)

                setIsGameStarted(true)
                setWaitingUser(false)

                socket.emit("gameStarted", ({ isStarted: true }))

            }
        })

        socket.on("userLeft", (data) => {
            setRoomData(data);
            if (data.users.length !== 2) {
                setParticipant(null)
            }
        })
    }, [roomData]);

    useEffect(() => {

        socket.on("setInitialState", ({ initialState, pattern, room, resetGame }) => {
            setServerState(initialState);
            setWinPatterns(pattern);
            setWinner(initialState.winner)
            setGameTable(initialState.gameTable)
            setTurn(initialState.turn)
            setCounter(initialState.counter)

            if (room) {
                const users = room.users

                if (currentUser && users) {
                    setSymbol(users.filter(user => user.name === currentUser)[0].symbol)
                }
            }

            if (resetGame) {
                navigate("/join", { replace: true })
            }

        })

    }, [currentUser, symbol, turn, serverState])


    const handleClick = (box) => {
        if (!winner) {
            if (!box.target.innerText) {
                if (symbol) {
                    if (turn === currentUser) {
                        box.target.innerText = symbol;
                        box.target.classList.toggle("p1");
                        socket.emit("changeTable", { index: box.target.id, symbol });
                        let temp = gameTable;
                        temp[box.target.id] = symbol
                        setGameTable(temp)

                        box.target.classList.toggle("active");
                        socket.emit("setCounter", ({ counter: counter + 1 }));
                        socket.emit("changeTurn", participant);
                        console.log(turn)
                    }
                }
            }
        }
    };


    useEffect(() => {


        var count = 0;
        winPatterns.forEach(pattern => {
            const indexes = pattern;
            count += 1;
            if (gameTable[indexes[0]] === gameTable[indexes[1]] && gameTable[indexes[2]] === gameTable[indexes[1]] &&
                gameTable[indexes[0]] !== null && gameTable[indexes[1]] !== null && gameTable[indexes[2]] !== null) {
                return gameTable[indexes[0]] === symbol ? socket.emit("changeWinner", currentUser) : socket.emit("changeWinner", participant)
            }

            if (count === 7) {
                counter === 9 && socket.emit("changeWinner", "draw")
            }

        })



        winner && setTimeout(() => {
            navigate("/join", { replace: true })
            socket.emit("resetGame", participant);
        }, 1400);



    }, [gameTable, navigate, winner, counter])



    return (
        <div className="xox">

            <div className="xox-container">

                {
                    (isGameStarted && !waitingUser)
                        ?
                        <>

                            <div className="game-status">
                                <h1 className={`finish-text ${winner && "active"}`}>{winner === "draw" && "Berabere"}</h1>
                            </div>
                            <div className="players">

                                <div className="player p1">

                                    <div className={`winner ${winner === currentUser && "active"}`}><img src='./img/king.png' alt='' /></div>
                                    <span className="player-text">{symbol}</span>
                                    <div className={`turn ${(turn === currentUser && !winner) && "active"}`}><img src='./img/arrow.png' alt='' /></div>
                                </div>

                                <div className="player p2">
                                    <div className={`winner ${winner === participant && "active"}`}><img src='./img/king.png' alt='' /></div>
                                    <span className="player-text">{symbol === "X" ? "O" : "X"}</span>
                                    <div className={`turn ${(turn === participant && !winner) && "active"}`}><img src='./img/arrow.png' alt='' /></div>
                                </div>

                            </div>

                            <div className="xox-table">
                                {gameTable.map((box, id) => (
                                    <div id={id} key={id} className={`box ${(box === symbol) && "p1 active"}  ${box === null && "box"} ${(box !== null && box !== symbol) && "p2 active"} `} onClick={(e) => { handleClick(e) }}>{box}</div>
                                ))}
                            </div>
                        </>
                        :
                        <>
                            <div className="participants">

                                <div className="participant owner">
                                    <HiOutlineStatusOnline color='#1ce91f' size={24} /> <span className="name">{currentUser}</span>
                                </div>
                                {(participant) ?
                                    <>
                                        <div className="versus-img"><img src="./img/versus.png" alt="" /></div>
                                        <div className="participant">
                                            <span className="name">{participant}</span>   <HiOutlineStatusOnline color='#1ce91f' size={24} />
                                        </div>
                                    </>
                                    :
                                    <p className='waiting-text'>Oyuncu bekleniyor...</p>
                                }
                            </div>
                        </>
                }

            </div>
        </div>
    )
}

export default OnlineGame