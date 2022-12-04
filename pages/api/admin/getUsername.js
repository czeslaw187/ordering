import {Client} from 'pg'

export default async function getUsername(req, res) {
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        let response = await client.query('SELECT * FROM myadmin WHERE name=$1',[process.env.NEXT_PUBLIC_MYNAME])
        res.json(response.rows)
        console.log(response.rows)
    } catch (error) {
        res.json({message: error.message})
    } finally {
        client.end()
    }
}