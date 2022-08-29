const rooms = [];

// odaya giriş
const joinRoom = (userAndRoom, id) => {
  const { name, room } = userAndRoom;
  let joinedRoom;

  const isCreated = rooms.filter((item) => item.roomName === room)[0];

  if (isCreated && isCreated.users.length === 2) {
    console.log("Bu oda dolu!");
    return { error: "Bu oda dolu!" };
  }

  if (isCreated && isCreated.users.length != 2) {
    if (isCreated.users.length === 1) {
      if (isCreated.users[0].name === name) {
        console.log("İsim zaten alınmış!");
        return { error: "İsim zaten alınmış! Başka bir isimle girin." };
      }

      if (isCreated.users[0].symbol === "O") {
        console.log("Kullanıcı odaya giriş yaptı!");
        isCreated.users.push({ id, name, symbol: "X" });
        isCreated.waiting = false;
        joinedRoom = isCreated;
        console.log(joinedRoom);
        return { joinedRoom };
      }
      console.log("Kullanıcı odaya giriş yaptı!");
      isCreated.users.push({ id, name, symbol: "O" });
      isCreated.waiting = false;
      joinedRoom = isCreated;
      console.log(joinedRoom);
      return { joinedRoom };
    }

    console.log("Kullanıcı odaya giriş yaptı!");
    isCreated.users.push({ id, name, symbol: "X" });
    isCreated.waiting = false;
    joinedRoom = isCreated;
    console.log(joinedRoom);
    return { joinedRoom };
  }

  rooms.push({
    roomName: room,
    users: [{ id, name, symbol: "X" }],
    waiting: true,
  });
  console.log("Oda oluşturuldu.");
  joinedRoom = rooms.filter((item) => item.roomName === room)[0];
  return { joinedRoom };
};

const removeUser = (userId) => {
  let userList = rooms.filter(
    (item) => item.users.filter((user) => user.id === userId)[0]
  );

  let userRoom = rooms.filter(
    (item) => item.users.filter((user) => user.id === userId)[0]
  )[0];

  if (userList[0]) {
    userList = userList[0].users;
    const index = userList.findIndex((user) => user.id === userId);
    if (index !== -1) {
      userList.splice(index, 1)[0];
      return userRoom;
    }
  }
};

const findRoom = (userId) => {
  let usersRoom = rooms.filter(
    (item) => item.users.filter((user) => user.id === userId)[0]
  )[0];

  return usersRoom;
};

module.exports = { joinRoom, removeUser, findRoom };
