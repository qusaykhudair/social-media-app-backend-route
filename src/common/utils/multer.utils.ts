import multer , {memoryStorage} from "multer";

export function multerUplodeFile (){
    return multer({
        storage:memoryStorage(),
    })
}