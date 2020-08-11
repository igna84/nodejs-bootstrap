const path = require('path');
const config = require("../../settings.json");
const appDir = path.dirname(require.main.filename);

config.BASIC_PATH = appDir;
module.exports = config;