import {sql_query} from '../../../lib/db.js'

export default async function checkCredentials(req, res) {
    const {credentials} = req.body
    const myName = process.env.NEXT_PUBLIC_MYNAME
    
    try {
        let realCreds = await sql_query('SELECT login,password FROM myadmin WHERE name=?',[myName])
        if (credentials.login === '') {
            res.json({
                message: 'Enter valid login',
                logged: false
            })
        } else if (credentials.password === '') {
            res.json({
                message: 'Enter valid password',
                logged: false
            })
        } else if (realCreds[0].login === credentials.login && realCreds[0].password === credentials.password) {
            res.json({
                message: 'ok',
                logged: true
            })
        } else {
            res.json({
                message: 'wrong login/password',
                logged: false
            })
        }
    } catch(e) {
        res.json({message: e.message})
    }
}   