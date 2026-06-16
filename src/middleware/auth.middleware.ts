import {Request, type NextFunction, type Response } from "express";

export const isAuthenticated = (req:Request, res:Response , next:NextFunction) => {
// get authorization from req
req.headers.authorization;
// check if token is there

// check user into database
let user = {username:"Qusay" , email:""};
// inject user into request
req.user = user as any;
next();
};