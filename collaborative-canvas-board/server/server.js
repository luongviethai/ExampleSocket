const path = require("path");
const express = require("express");
const expressApp = express();
const httpServer = require("http").createServer(expressApp);
const io = require("socket.io")(httpServer, {
	cors: { origin: true },
});

const port = process.env.PORT || 5000;

io.on("connection", (socket) => {
	socket.on("image-data", (data) => {
		socket.broadcast.emit("image-data", data);
	});
});

console.log("server env", process.env.NODE_ENV);
expressApp.use(express.static(path.join(__dirname, "../ui/build")));
expressApp.get("*", function (req, res) {
	console.log("response received");
	res.sendFile(path.join(__dirname, "../ui/build", "index.html"));
});

httpServer.listen(port, () => {
	console.log("Server running at", port);
});
