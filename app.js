const express = require("express");
const cors = require('cors');

require("dotenv").config();

const routes=require("./routes");

const app = express();

app.use(cors({
  origin: '*'
}));

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

app.get("/", async (req, res) => {
  // const result=await sendMail();
  res.send("Welcome to Gmail API with NodeJS");
});

app.use('/api',routes);