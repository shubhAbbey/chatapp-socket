
const authenticateToken = require("./awth/authenticateToken")
function routes (app) {

    const messages = require("./routes/messages.routes") // Imports routes for the users
    app.use("/api/messages", messages)

    const users = require("./routes/users.routes") // Imports routes for the users
    app.use("/api/users", users)

}
module.exports = routes