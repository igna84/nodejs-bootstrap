const config = require("./config").UPLOAD;
const path = require('path');
const appDir = path.dirname(require.main.filename);

const fs = require('fs');
const multer = require("multer");
const uuid = require("uuid").v4;

module.exports = ( path = "" ) => {

    return multer({
        storage: multer.diskStorage({
            destination: ( req, file, next ) => {
                let dir = `${ appDir }${ config.PATH }`;
                
                if( path.length > 0 ) {
                    dir += path[0] == "/" ? path : "/" + path;
                }

                let pathArr = dir.split("/");
                let fullPath = "";

                // 디렉토리가 없을 땐 자동으로 생성
                pathArr.forEach( ( item ) => {
                    fullPath += `${item}/`;

                    if( fullPath.length > 0 && !fs.existsSync( fullPath ) ) {
                        fs.mkdirSync( fullPath );
                    }
                });               
    
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
}