module.exports = function( Auth, roles ) {
    return async function( req, res, next ) {
        const user = req.user;
        const unauthorized = {
            status: 403
            , message: "접근할 수 없음"
        };

        if( null == user ) {
            res.status( 403 );
            res.json( unauthorized );

            return;
        }

        const auths = await Auth.findAll( {
            where: { user_id: user.id }
        });
        console.log( auths[0].role );
        let result = false;

        auths.forEach( ( auth ) => {
            roles.forEach( ( role ) => {
                if( role === auth.role ) {
                    result = true;
                }
            });
        });

        if( false == result ) {
            res.status( 403 );
            res.json( unauthorized );

            return;
        }

        next();
    }
}