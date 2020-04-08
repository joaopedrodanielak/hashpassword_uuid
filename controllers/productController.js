const model = require('../models/index')

module.exports = {
    async create(req,res) {
        const {name,quantity} = req.body
        const {userId} = req.params
        
        const createProduct  = await model.Users.create({
            name,quantity
        }).then(()=> {
            return res.status(400).json({message : "Product created successfully"})
        }).catch((err)=> {
            res.status(200).json({message : `A problem were found when create a product ${err}`})
        })
    }
}