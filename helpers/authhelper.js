const bcrypt = require('bcrypt')

exports.passwordHashing = async(password)=>{
    try {
        const saltrounds = 10
        const hashedpassword = await bcrypt.hash(password,saltrounds)
        return hashedpassword
    } catch (error) {
        console.log(error);
        
    }
}

exports.comparepassword = async(password,hashepassword)=>{
    const match = await bcrypt.compare(password,hashepassword)
    return match
}