// STEP 6 - import the server and start it on http://localhost:9000
// invoke listen method on server, give it a port and a callback to run

const server = require("./api/server.js");

server.listen(9000, console.log("server listening on port 9000"));
