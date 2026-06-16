"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    // get authorization from req
    req.headers.authorization;
    // check if token is there
    // check user into database
    let user = { username: "Qusay", email: "" };
    // inject user into request
    req.user = user;
    next();
};
exports.isAuthenticated = isAuthenticated;
