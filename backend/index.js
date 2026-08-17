const express = require("express");
const usersRouter = require("./routes/users");
const propertiesRouter = require("./routes/properties");

const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Server radi!");
});

app.use("/users", usersRouter);
app.use("/properties", propertiesRouter);

app.listen(3000, () => {
    console.log("Server radi na portu 3000");
});