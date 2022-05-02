import axios from 'axios'

export default async function getTimeDistance(req, res) {
    const {coords} = req.body
    let location = process.env.NEXT_PUBLIC_MYLOCATION
    location = location.split(',')
    let result = await axios.get(`https://router.hereapi.com/v8/routes?transportMode=car&origin=${location[0]},${location[1]}&destination=${coords[0]},${coords[1]}&return=summary&units=metric&apikey=${process.env.NEXT_PUBLIC_HERE_KEY}`)
    let timeDistance = result.data.routes[0].sections[0].summary
    
    res.json(timeDistance)
}