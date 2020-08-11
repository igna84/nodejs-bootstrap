const config = require("./config");
const fs = require("fs");
const express = require("express");
const app = express();
const middlewareManager = require("./middlewareManager");

module.exports = function() {

    /**
     * 배너 파일 읽기
     */
    function readBanner() {
        const banner = fs.readFileSync( config.BASIC_PATH + config.BANNER_LOCATION );
        console.log( banner.toString() );
    }

    /**
     * 미들웨어 셋팅
     */
    function setMiddlewareManager() {
        middlewareManager( app );
    }

    /**
     * 초기화 함수
     */
    function init() {
        readBanner();
        setMiddlewareManager();
    }

    init();
}