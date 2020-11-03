const express = require("express");
port = process.env.PORT || 8080;

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

server = app.listen(port, () => {
  console.log("https://localhost:8080");
});
const io = require("socket.io")(server);
// какая у нас будет функциональность чата у нас будет?

// можно будет отправлять сообщения

io.on("connection", (socket) => {
  console.log("У нас новiй пользователь");
  socket.username = "Anonim";

  // можно будет представляться в чате
  socket.on("change_username", (data) => {
    socket.username = data.username;
  });
  socket.on("new_message", (data) => {
    if (data.message == "") {
      return;
    }
    io.sockets.emit("add_mes", {
      message: data.message,
      username: socket.username,
      color: data.color,
    });
  });
});
