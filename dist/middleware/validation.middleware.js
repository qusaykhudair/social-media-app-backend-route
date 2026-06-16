"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const erorr_utils_1 = require("../utils/erorr.utils");
//  this is the validation middleware 
// it is used to validate the request body
// it is used to validate the request params
// it is used to validate the request query
// it is used to validate the request headers
// it is used to validate the request cookies
// it is used to validate the request files
// it is used to validate the request body
// it is used to validate the request params
// it is used to validate the request query
// it is used to validate the request headers
// it is used to validate the request cookies
// it is used to validate the request files
const isValid = (schema) => {
    return async (req, res, next) => {
        const result = await schema.safeParseAsync(req.body);
        if (!result.success) {
            throw new erorr_utils_1.BadRequestException("Validation Error", result.error.issues.map((issue) => {
                return { path: issue.path[0], message: issue.message };
            }));
        }
        next();
    };
};
exports.isValid = isValid;
