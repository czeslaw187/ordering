import {Client} from 'pg'

export default async function changePwd(req, res) {
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    const{username, pass, conf} = req.body
    await client.connect()
    try {
        if (username) {
            await client.query('UPDATE myadmin SET login=$1 WHERE name=$2', [username, process.env.NEXT_PUBLIC_MYNAME])
            res.json({message: 'username changed', status: 'ok'})
        }

        if (pass !== conf) {
            res.json({message: 'password doesn\'t match', status: 'error'})
        } else if (!pass || !conf) {
            res.json({message: 'enter credentials', status: 'error'})
        } else {
            await client.query('UPDATE myadmin SET password=$1 WHERE name=$2',[pass, process.env.NEXT_PUBLIC_MYNAME])
            res.json({message: 'password changed', status: 'ok'})
        }
    } catch (error) {
        res.json({message: error.message})
    } finally {
        client.end()
    }
}