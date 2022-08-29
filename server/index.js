const { joinRoom, removeUser, findRoom } = require("./users");
const {
  gameStatus,
  changeTurn,
  changeTable,
  changeWinner,
  resetGame,
  setCounter,
  winPatterns,
  initialState,
} = require("./online");

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const cors = require("cors");
const dotenv = require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.on("join", async (userAndRoom, callback) => {
    const { error, joinedRoom } = joinRoom(
      { name: userAndRoom.name, room: userAndRoom.room },
      socket.id
    );

    if (error) {
      return callback(error);
    }

    socket.join(userAndRoom.room);

    io.to(userAndRoom.room).emit("userJoined", joinedRoom);
  });

  socket.on("gameStarted", ({ isStarted }) => {
    if (isStarted === true) {
      gameStatus(true);

      const room = findRoom(socket.id);
      if (room && !initialState.turn) {
        const random = Math.floor(Math.random() * 2);
        random === 0
          ? changeTurn(room.users[0].name)
          : changeTurn(room.users[1].name);
        io.emit("setInitialState", {
          initialState,
          pattern: winPatterns,
          room,
        });
      }
    }
  });

  socket.on("changeTable", ({ index, symbol }) => {
    changeTable({ index, symbol });

    io.emit("setInitialState", {
      initialState,
      pattern: winPatterns,
    });
  });

  socket.on("setCounter", ({ counter }) => {
    setCounter(counter);
    io.emit("setInitialState", {
      initialState,
      pattern: winPatterns,
    });
  });

  socket.on("changeTurn", (turn) => {
    changeTurn(turn);

    io.emit("setInitialState", {
      initialState,
      pattern: winPatterns,
    });
  });

  socket.on("changeWinner", (winner) => {
    changeWinner(winner);

    io.emit("setInitialState", {
      initialState,
      pattern: winPatterns,
    });
  });

  socket.on("resetGame", () => {
    resetGame();
    const roomData = removeUser(socket.id);


    io.emit("setInitialState", {
      resetGame: true,
    });
  });

  socket.on("gameStatus", ({ status }) => {
    initialState.isStarted = status;
    io.emit("setInitialState", {
      initialState,
      pattern: winPatterns,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    const roomData = removeUser(socket.id);
    console.log(roomData);
    if (roomData) {
      io.to(roomData.roomName).emit("userLeft", roomData);
    }
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Server is running!");
});
