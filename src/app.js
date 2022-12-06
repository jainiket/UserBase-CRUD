const express = require("express");
const app = express();
const PORT = "9001";
const UserRouter = require("./routes/UserRouter");
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", UserRouter);
app.listen(PORT, () => {
  console.log("Server Started and Listening on port :: ", PORT);
});
