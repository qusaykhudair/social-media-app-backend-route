"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3CloudProvider = void 0;
const dev_config_1 = require("../../../config/dev.config");
const s3_service_1 = require("./s3.service");
exports.s3CloudProvider = new s3_service_1.S3CloudProvider({
    region: dev_config_1.BUCKET_REGION,
    credentials: {
        accessKeyId: dev_config_1.BUCKET_ACCESS_KEY_ID,
        secretAccessKey: dev_config_1.BUCKET_SECRET_ACCESS_KEY
    }
});
