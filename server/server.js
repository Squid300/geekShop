const express = require('express');
const { ApolloServer } = require('apollo-server-express');
var braintree = require('braintree');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "nj4dckhx7c733nd2",
  publicKey: "dbmf6bpswtqdfsys",
  privateKey: "1b373744c30bc32c71e7405a2b7f332d",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/token', async ( req, res ) => {
  await gateway.clientToken.generate({}) 
  .then( response => {
    console.log(response.clientToken);
    const token = response.clientToken
    res.send({token});
  });
});

app.post('/pay', ( req, res ) => {
  const clientNonce = req.body.payment_method_nonce;
  const price = req.body.price;
  gateway.transaction
      .sale({
          amount: price,
          paymentMethodNonce: clientNonce,
          options: {
              submitForSettlement: true,
          },
      })
      .then((result) => {
          if (result.success) {
              console.log( result.transaction.id );
          }else {
              console.error( result.message );
          }
      });
  res.redirect('/');
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
  startApolloServer(typeDefs, resolvers);
