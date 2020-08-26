const config = require("./config").UPLOAD;
const path = require('path');
const appDir = path.dirname(require.main.filename);

const fs = require('fs');
const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
    storage: multer.diskStorage({
        destination: ( req, file, next ) => {
            const dir = `${ appDir }${ config.PATH }`;

            // 디렉토리가 없을 땐 자동으로 생성
            if( !fs.existsSync( dir ) ) {
                fs.mkdirSync( dir );
            }

            next( null, dir );
        }
        , filename: ( req, file, next ) => {
            const extension = file.originalname.substring( file.originalname.lastIndexOf(".") );
            const filename = `${uuid().split("-").join("")}_${new Date().getTime()}${extension}`;

            next( null, filename );
        }
    })
    , limits: config.LIMIT
});

module.exports = {
    upload
}