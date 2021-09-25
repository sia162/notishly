const express = require("express");

const connectToMongo = require("./database");
connectToMongo();

const app = express();
const port = 5000;

// express package cors -> helps to fetch api from backend in frontend
var cors = require("cors");
app.use(cors());

// mediator
app.use(express.json());
// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Notishly Backend listening at http://localhost:${port}`);
});
