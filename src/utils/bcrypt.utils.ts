import * as bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

export async  function hashPassword(password:string){
    return await bcrypt.hash(password, salt);
}

export async function comparePassword(password:string,hash:string){
    return await bcrypt.compare(password, hash);
    }
    