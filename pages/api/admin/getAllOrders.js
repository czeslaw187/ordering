import {Client} from 'pg'

export default async function getAllOrders(req, res) {
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    await client.connect()
    try {
        let result = await client.query('SELECT users.name, users.email, users.mobile, users.address1, users.address2, users.postCode, users.city, orders.name as items, orders.total, orders.order_id, orders.date, orders.realised, orders.note FROM users LEFT JOIN orders ON users.client_order_id = orders.order_id')
        res.json(result.rows)
    } catch(e) {
        res.json({message: e.message})
    } finally {
        client.end()
    }
}