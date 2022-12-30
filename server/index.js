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
    // console.log('A user connected!');
    socket.on('send-msg', (data) => {
        // console.log('message recieved!', data)
        socket.broadcast.emit("from-server", data)
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
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// Create a new instance of an Apollo server with the GraphQL schema
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
  
  // Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
