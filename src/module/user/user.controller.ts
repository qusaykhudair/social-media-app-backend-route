import { NextFunction, Request, Response, Router } from "express";
import { multerUplodeFile } from "../../common/utils/multer.utils";
import userService from "./user.service";

const router = Router()

router.post("/upload-image", //to do : auth ,
    multerUplodeFile().single('profilePic'),
    async (req: Request, res: Response, next: NextFunction) => {
        const {url,key} = await userService.uploadImage(req.file!, req.user.userId)
        return res.json({
            message: "Image uploaded successfully",
            success: true,
            data:{
                url,
                key
            }
        })
    }
)

export default router