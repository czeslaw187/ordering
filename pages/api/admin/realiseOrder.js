import {Client} from 'pg'

export default async function realiseOrder(req, res) {
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACHDB_URL)
    const {orderId, procedure} = req.body
    await client.connect()
    try {
        await client.query('UPDATE orders SET realised=$1 WHERE order_id=$2',[procedure, orderId])
        res.json({message: 'ok'})
    } catch (error) {
        res.json({message: error.message})
    } finally {
        client.end()
    }
}