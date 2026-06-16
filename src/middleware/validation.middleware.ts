import { NextFunction, Request, Response } from "express";
import { z, ZodObject } from "zod";
import { BadRequestException } from "../utils/erorr.utils";

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

export const isValid=(schema :ZodObject)=>{
    return async (req:Request, res:Response , next:NextFunction)=>{
      const result = await schema.safeParseAsync(req.body);
      if(!result.success){
       throw new BadRequestException("Validation Error",result.error.issues.map((issue)=>{
        return {path : issue.path[0] , message : issue.message} as {path : string , message : string}
       }))
      }
      next();
    }
}   