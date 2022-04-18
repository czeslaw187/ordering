export default async function(req, res) {
    const {item} = req.body
    try {        
        item[0].id = Date.now()
        console.log(item)
        res.json(item)
    } catch(e) {
        res.json({message: e.message})
    }
}