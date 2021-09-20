const express = require("express");

const connectToMongo = require("./database");
connectToMongo();

const app = express();
const port = 5000;

// mediator
app.use(express.json());
// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
