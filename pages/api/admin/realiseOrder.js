import { sql_query } from "../../../lib/db";

export default async function realiseOrder(req, res) {
    const {orderId} = req.body
    try {
        await sql_query('UPDATE orders SET realised=true WHERE order_id = ?',[orderId])
        res.json({message: 'ok'})
    } catch (error) {
        res.json({message: error.message})
    }
}