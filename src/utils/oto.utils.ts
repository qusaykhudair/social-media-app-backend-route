export function generateOTP(){
    //  6 digit otp
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp
}
