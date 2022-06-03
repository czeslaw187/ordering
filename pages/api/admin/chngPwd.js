export default async function changePwd(req, res) {
    const{pass, conf} = req.body
    try {
        if (pass !== conf) {
            res.json({message: 'password doesn\'t match'})
        } else if (!pass || !conf) {
            res.json({message: 'enter credentials'})
        } else {
            res.json({message: 'password changed'})
            
        }
    } catch (error) {
        res.json({message: error.message})
    }
}