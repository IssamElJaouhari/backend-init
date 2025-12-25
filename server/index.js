const express = require("express")

const app = express()

const dbConnect = require("./config/db.js")

app.use(express.json())

app.use("/api/auth", require("./routes/authRoutes.js")
)

app.get("/", (req, res) => {
    res.end("hello this is home route")
})

dbConnect()
app.listen(6006, () => {
    console.log('server running');
})

