import axios from 'axios'
import { sql_query } from '../../lib/db'

export default async function sendMail(req, res) {
    try {
        // send confitmation email
        let nodemailer = require('nodemailer')
        const {details, id, order, total} = req.body
        console.log(order, 'api order')
        
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
          // insert customer details into db
          let result = await sql_query('INSERT INTO users (name, email, address1, address2, city, postCode, client_order_id) VALUES (?,?,?,?,?,?,?)', [
            details.name,
            details.email,
            details.address1,
            details.address2,
            details.city,
            details.postCode,
            id
          ])
          // insert customer order insto db
          
          let result2 = await sql_query('INSERT INTO orders (name, total, order_id, date) VALUES (?, ?, ?, ?)',[
            JSON.stringify(order),
            total,
            id,
            id
          ])

        res.status(200).json({result:result, result2:result2})
    } catch(e) {
        res.json({message: e.message})
    }
}