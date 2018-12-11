const express = require( 'express' );
const app = express();
const request = require( 'request' );
const PORT = 2000;
const bodyParser = require( 'body-parser' );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

app.get( '/fritz', ( req, res, next ) => {
    // Talk to other servers.
    const opts = {
        method: 'get',
        url: 'http://localhost:3000'
    };

    request(opts, ( err, response, body ) => {
        if (err) console.log(err);
        else {
            const length = body.length;
            const chosen = Math.floor( Math.random() * length );
            res.send(body[ chosen ]); // Answer to client.
        }
    });
} );

app.post( '/fritz', ( req, res, next ) => {
    // Talk to other servers.
    const doc = req.body;
    if (!doc.hasOwnProperty('attireLevel')) return res.status(422).send('need attireLevel');
    if (!doc.hasOwnProperty('age')) return res.status(422).send('need age');
    if (!doc.hasOwnProperty('temperature')) return res.status(422).send('need temperature');
    if (!doc.hasOwnProperty('location')) return res.status(422).send('need location');
    const opts = {
        method: 'post',
        url: 'http://localhost:3000',
        body: req.body,
        json: true
    };

    request(opts, ( err, response, body ) => {
        if (err) console.log(err);
        else {
            res.send(body); // Answer to client.
        }
    });
} );

app.listen(PORT, () => console.log('what up'));