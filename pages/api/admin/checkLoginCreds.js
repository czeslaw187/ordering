export default async function checkCredentials(req, res) {
    const {credentials} = req.body
    console.log(credentials, 'api creds')
    res.json(true)
}   