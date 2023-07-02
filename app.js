const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const raffleRouter = require("./routes/raffle");

const app = express();

const port = 3010;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/raffle", raffleRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server listening on port : ${port} 🦉`);
});