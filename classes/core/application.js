const { logger } = require("./logger");
const config = require("./config");
const fs = require("fs");
const express = require("express");
const app = express();

const middlewareManager = require("./middlewareManager");
const datasource = require("./datasource");

let sequelize = null;

module.exports = async function() {
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

    async function setSequelize() {
        sequelize = await datasource();
        logger.info("Datasource Creation Complete.");
    }

    /**
     * 초기화 함수
     */
    async function init() {
        readBanner();
        setMiddlewareManager();
        await setSequelize();
    }

    await init();
}