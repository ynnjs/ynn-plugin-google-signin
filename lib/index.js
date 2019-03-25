const { OAuth2Client } = require( 'google-auth-library' );

module.exports = ( app, options ) => {
    const config = options.config || app.config( 'google-signin' );
    const client_id = config.client_id;

    if( !client_id ) {
        this.output.error( '[Plugin Google Signin] client_id should be a string' );
    }

    const client = new OAuth2Client( client_id );

    app[ options.name ] = async function( token ) {
        const ticket = await client.verifyIdToken( {
            idToken : token,
            audience : client_id
        } );
        return ticket.getPayload();
    }
}
