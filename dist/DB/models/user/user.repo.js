"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const user_model_1 = require("./user.model");
class UserRepository extends abstract_repo_1.AbstractRepository {
    constructor() {
        super(user_model_1.User);
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
