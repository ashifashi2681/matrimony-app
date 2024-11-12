const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const apiRoutes = require("./routes");

const mongoConnect = require("./db/mongoDb");
const cookieParser = require("cookie-parser");
const { app, server } = require("./sockets/socket");
require("./utils/auth");


const port = process.env.PORT || 5000;

//===================

//==================
app.use(express.json());
app.use(cookieParser());
app.use(
	cookieSession({
		name: "session",
		keys: ["key1"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// test route
// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

// routes middleware
app.use("/", apiRoutes);


// db
mongoConnect();

// listen
server.listen(port, () => {
	console.log(`server listening at http://localhost:${port}`);
});

