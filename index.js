// import the server and start it
const server = require('./api/server')

console.log(`web46 rules!!!!!!!!`)
console.log(process.env.LANG) // computer stuff
console.log(process.argv[2]) // first arg from command line

const port = 5000

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})
