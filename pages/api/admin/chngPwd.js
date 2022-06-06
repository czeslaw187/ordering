import {sql_query} from '../../../lib/db.js'

export default async function changePwd(req, res) {
    const{username, pass, conf} = req.body
    try {
        if (username) {
            await sql_query('UPDATE myadmin SET login=? WHERE name=?', [username, process.env.NEXT_PUBLIC_MYNAME])
            res.json({message: 'username changed', status: 'ok'})
        }

        if (pass !== conf) {
            res.json({message: 'password doesn\'t match', status: 'error'})
        } else if (!pass || !conf) {
            res.json({message: 'enter credentials', status: 'error'})
        } else {
            await sql_query('UPDATE myadmin SET password=? WHERE name=?',[pass, process.env.NEXT_PUBLIC_MYNAME])
            res.json({message: 'password changed', status: 'ok'})
        }
    } catch (error) {
        res.json({message: error.message})
    }
}