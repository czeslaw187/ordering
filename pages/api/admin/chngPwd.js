import {sql_query} from '../../../lib/db.js'

export default async function changePwd(req, res) {
    const{username, pass, conf} = req.body
    try {
        if (pass !== conf) {
            res.json({message: 'password doesn\'t match'})
        } else if (!pass || !conf) {
            res.json({message: 'enter credentials'})
        } else {
            if (username) {
                await sql_query('UPDATE myadmin SET login=? WHERE name="Grzegorz Michniewicz"', [username])
            }
            await sql_query('UPDATE myadmin SET password=? WHERE name="Grzegorz Michniewicz"',[pass])
            res.json({message: 'password changed'})
        }
    } catch (error) {
        res.json({message: error.message})
    }
}