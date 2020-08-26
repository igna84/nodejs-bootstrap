const controller = require("./controller");
const { upload } = require("../../core/uploadManager");
const router = require("express").Router();

module.exports = ( app, model ) => {
    const sample = controller( model );
    
    router.post(
        "/upload"
        , upload.single("file")
        , sample.upload
    );
        
    app.use( "/v1/sample", router );
}