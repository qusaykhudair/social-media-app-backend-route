import { NextFunction, Request, Response, Router } from "express";
import requestService from "./request.service";
import { Types } from "mongoose";

const router = Router()

// send request
router.post("/:receiverId",async(req:Request , res:Response , next:NextFunction)=>{
   await requestService.sendRequest(new Types.ObjectId("690d2e4ddddb56a870060e68"),new Types.ObjectId("690d2e4ddddb56a870060e67"))
  return res.status(204)
}
)

// accept request
router.post("/accept/:requestId",async(req:Request , res:Response , next:NextFunction)=>{
   await requestService.acceptRequest(new Types.ObjectId("690d2e4ddddb56a870060e68"),new Types.ObjectId("690d2e4ddddb56a870060e67"))
  return res.status(204)
}
)

// decline request 
router.delete("/decline/:requestId",async(req:Request , res:Response , next:NextFunction)=>{
  await requestService.declineRequest(new Types.ObjectId("690d2e4ddddb56a870060e68"),new Types.ObjectId("690d2e4ddddb56a870060e67"))
 return res.status(204)
}
)

// delete request or unfriend 
router.delete("/remove/:requestId",async(req:Request , res:Response , next:NextFunction)=>{
  await requestService.removeRequest(new Types.ObjectId("690d2e4ddddb56a870060e68"),new Types.ObjectId("690d2e4ddddb56a870060e67"))
 return res.status(204)
}
)



export default router