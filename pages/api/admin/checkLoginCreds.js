import {Client} from 'pg'

export default async function checkCredentials(req, res) {
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    const {credentials} = req.body
    await client.connect()
    try {
        let realCreds = await client.query('SELECT login,password FROM myadmin')
        console.log(realCreds.rows, 'real')
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
        } else if (realCreds.rows[0].login === credentials.login && realCreds.rows[0].password === credentials.password) {
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
    } finally {
        client.end()
    }
}   