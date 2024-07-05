
module.exports = {
    mongo: {
        uri: "mongodb://localhost:27017/chatup",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            autoIndex: true
          },
      },
}
