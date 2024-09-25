const nodemailer = require('nodemailer')

const sendemail = async(Email,link,username)=>{
    var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_EMAIL_PASSWORD
        }
    });
    try {
        const mailoptions ={
            from:process.env.SENDER_EMAIL,
            to:Email,
            subject:'Reset Password',
            html:`<p> Hi ${username},</p>
            <b>Your password reset link is: <a href=${link}>Reset Password</a></b>`
        }
        transporter.sendMail(mailoptions,function(err,info){
            if(err){
                console.log(err);
            }else{
                console.log('email sent');              
            }
        })
    } catch (error) {
       console.log('error in sending email',error);
       throw error
    }
}

module.exports = sendemail