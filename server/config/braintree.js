var braintree = require('braintree');

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "nj4dckhx7c733nd2",
    publicKey: "dbmf6bpswtqdfsys",
    privateKey: "1b373744c30bc32c71e7405a2b7f332d",
});

function pay({ amount, method }){
    gateway.transaction
        .sale({
            amount: amount,
            paymentMethodNonce: method,
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
};

function generateToken({ userId }) {
    gateway.clientToken.generate({
        customerId: userId
    }, ( err, response ) => {
        const clientToken = response.clientToken
        return clientToken;
    });
};

module.exports = { pay, generateToken }