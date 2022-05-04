import {sql_query} from '../../../lib/db.js'

export default async function getAllOrders(req, res) {
    try {
        let result = await sql_query('SELECT users.name, users.email, users.address1, users.address2, users.postCode, users.city, orders.name, orders.total, orders.order_id, orders.date FROM users LEFT JOIN orders ON users.client_order_id = orders.order_id')
        res.json(result)
    } catch(e) {
        res.json({message: e.message})
    }
}