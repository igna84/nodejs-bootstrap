const controller = require("./controller");
const uploadManager = require("../../core/uploadManager");
const router = require("express").Router();

module.exports = ( app, model ) => {
    const sample = controller( model );
    
    router.post(
        "/upload"
        , uploadManager("sample").single("file")
        , sample.upload
    );
        
    app.use( "/v1/sample", router );
}