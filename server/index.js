const express = require("express")

const takwa = express()

const dbConnect = require("./config/db.js")

dbConnect()
takwa.listen(6006, () => {
    console.log('server running');
})

