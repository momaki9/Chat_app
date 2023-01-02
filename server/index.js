const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:3000`]
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a test user connected');
  let token = socket.handshake.auth.token;
  console.log(token)
  socket.on('send-msg', (data) => {
    socket.broadcast.emit("from-server", data)
    console.log(`test ${data}`)
  })
  socket.on('chat message', (msg) => {
    console.log(`message: ${msg}`)
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    console.log('The user disconnected')
  })
});

server.listen(4000, () => {
  console.log('Listening on *:4000')
});

const { ApolloServer } = require('apollo-server-express');
// const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const { authMiddleware } = require('./utils/auth');
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    })
  })
};


startApolloServer(typeDefs, resolvers);
