"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3CloudProvider = void 0;
const dev_config_1 = require("../../../config/dev.config");
const client_s3_1 = require("@aws-sdk/client-s3");
class S3CloudProvider {
    client;
    constructor(config) {
        this.client = new client_s3_1.S3Client({
            region: config.region,
            credentials: {
                accessKeyId: config.credentials.accessKeyId,
                secretAccessKey: config.credentials.secretAccessKey
            }
        });
    }
    async uploadFile(file, path) {
        // upload images to s3
        let command = new client_s3_1.PutObjectCommand({
            Bucket: dev_config_1.BUCKET_NAME,
            Key: `${path}/${file.originalname}`,
            ACL: "public-read",
            ContentType: file.mimetype,
            Body: file.buffer
        });
        await this.client.send(command);
        return command.input.Key;
    }
    async deleteFile(key) {
        let command = new client_s3_1.DeleteObjectCommand({
            Bucket: dev_config_1.BUCKET_NAME,
            Key: key
        });
        const { DeleteMarker } = await this.client.send(command);
        return DeleteMarker;
    }
    async getFile(key) {
        let command = new client_s3_1.GetObjectCommand({
            Bucket: dev_config_1.BUCKET_NAME,
            Key: key
        });
        let response = await this.client.send(command);
        return response.Body;
    }
}
exports.S3CloudProvider = S3CloudProvider;
