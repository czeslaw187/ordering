import { sql_query } from "../../../lib/db";

export default async function realiseOrder(req, res) {
    const {orderId, procedure} = req.body
    try {
        await sql_query('UPDATE orders SET realised=? WHERE order_id = ?',[procedure, orderId])
        res.json({message: 'ok'})
    } catch (error) {
        res.json({message: error.message})
    }
}