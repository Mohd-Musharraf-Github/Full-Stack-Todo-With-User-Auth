const express = require("express");
const app = express();
const cors = require("cors");
require("./Conn/Conn.js")
const path = require("path");
const auth = require("./routes/auth")
const list = require("./routes/list")


app.use(express.json());
app.use(cors());

// app.get("/",(req,res) => {
//     res.send("Hello");
// });
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "FrontEnd", "build")));
    res.sendFile(path.resolve(__dirname, "FrontEnd", "build", "index.html"));
});

app.use("/api/v1" , auth);
app.use("/api/v2" , list);



app.listen(1000, () =>{
    console.log("server Started")    
});