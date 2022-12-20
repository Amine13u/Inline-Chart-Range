const express = require("express");

const app = express();
const cors = require("cors");

const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

const metricRouter = require("./routes/metricRoute");

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.use("/metric", metricRouter);

app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`);
});
