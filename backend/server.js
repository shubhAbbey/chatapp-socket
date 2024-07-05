const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require("./config/config")
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")
const routes = require("./routes")
const PORT = 5000;
const app = express();
const mongoUri = config.mongo.uri
const mongoOptions = config.mongo.options
mongoose.connect(mongoUri, mongoOptions)

mongoose.connection.on("error", function (err) {
  console.error(`MongoDB connection error: ${err}`)
  process.exit(-1) // eslint-disable-line no-process-exit
})

mongoose.connection.once("open", function () {
  console.log("Connected to Mongodb")
  app.emit("ready")
})
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
routes(app)
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on("connection", socket => {
  socket.on('message',({message}, callback)=>{
    io.emit('messages',message)
    callback()
  })
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
// server.on("ready",()=>{
  server.listen(PORT, ()=> {
    console.log(`server started at http://localhost:${PORT}`);
  })
// })


module.exports = {
    app: app
};
