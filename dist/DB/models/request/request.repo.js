"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRepo = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const request_model_1 = require("./request.model");
class RequestRepo extends abstract_repo_1.AbstractRepository {
    constructor() {
        super(request_model_1.RequestModel);
    }
}
exports.RequestRepo = RequestRepo;
