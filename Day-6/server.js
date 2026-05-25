const app = require("./src/app");
const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://netrapal994_db_user:6lTp9BgYHVz6VbP3@cluster0.uduwrc2.mongodb.net/day-6",
    )
    .then(() => {
      console.log("connect to Database");
    });
}
connectToDB();

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
