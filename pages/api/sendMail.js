import {Client} from 'pg'

export default async function sendMail(req, res) {
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    
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
          await client.connect()
          let result = await client.query('INSERT INTO users (name, email, mobile, address1, address2, city, postCode, client_order_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [
            details.name,
            details.email,
            details.mobile,
            details.address1,
            details.address2,
            details.city,
            details.postCode,
            id
          ])
          // insert customer order insto db
          
          let todayNow = new Intl.DateTimeFormat('en-UK', {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit'}).format(Date.now())

          let result2 = await client.query('INSERT INTO orders (name, total, order_id, date, note) VALUES ($1, $2, $3, $4, $5)',[
            JSON.stringify(order),
            total,
            id,
            todayNow,
            details.myNote
          ])

        res.status(200).json({result:result.rows, result2:result2.rows})
    } catch(e) {
        res.json({message: e.message})
    } finally {
      client.end()
    }
}