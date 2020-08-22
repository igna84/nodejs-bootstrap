const crypto = require("crypto");

module.exports = {
    getPasswordBySHA256: function( password, salt ) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(
                password
                , salt
                , 100000
                , 64
                , 'sha256'
                , (err, key) => {
                    if( err ) {
                        reject( err );
                    } else {
                        resolve( key.toString('base64') );
                    }
                });
        });
    }
}