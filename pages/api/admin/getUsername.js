import { sql_query } from "../../../lib/db";

export default async function getUsername(req, res) {
    try {
        let response = await sql_query('SELECT * FROM myadmin WHERE name="Grzegorz Michniewicz"')
        res.json(response)
    } catch (error) {
        res.json({message: error.message})
    }
}