import axios from 'axios'

export default async function sendMail(req, res) {
    try {
        let nodemailer = require('nodemailer')
        const {details, id, order, total} = req.body
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_USER,
                pass: process.env.NEXT_PUBLIC_EMAIL_PSW
            },
          })

          const mailData = {
            from: `${process.env.NEXT_PUBLIC_EMAIL_USER}`,
            to: `${details.email}`,
            subject: `Message From Me`,
            text: `Confriming order id ${id}`,
           }

           transporter.sendMail(mailData, function (err, info) {
            if(err)
              console.log(err, 'err')
            else
              console.log(info, 'info')
          })

        res.status(200)
    } catch(e) {
        res.json({message: e.message})
    }
}