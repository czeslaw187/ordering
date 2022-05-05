export default async function assignId(req, res) {
    const {item} = req.body
    try {        
        item[0].id = Date.now()
        res.json(item)
    } catch(e) {
        res.json({message: e.message})
    }
}