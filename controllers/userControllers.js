const model = require('../models/index');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const expressjwt = require('express-jwt')
dotenv.config()
module.exports = {
     async ola(req,res) {
        await res.status(200).json({
            message : "Ola vc esta no inicio"
        })
    },

    async usuarios(req,res) {
        const allUsersfromDB = await model.Users.findAll({})
        .then(users=>res.json({
            error : false,
            data : users
        }))
        .catch((err)=> {
            res.status(400).json({
                error : true,
                data : [],
                error : error,
                message : "Cannot load the users"
            })
        })

    },//finaliza

    async getUserById(req,res) {
       const { id } = req.params

       const findUser = await model.Users.findByPk(id)

       if (!findUser) {
           return res.status(400).json({
               error : "user not found"
           })
        }
       return res.json(findUser)
    },

    async Store(req,res) {
        const { email,firstName,lastName,password } = req.body

        const createUser = await model.Users.create({
            email : email ,firstName : firstName,lastName : lastName,password : password
        }).then(()=> {
            return res.status(200).json({message : "User created successfully"})
        })
        .catch((err)=> {return res.status(400).json({message : err})})
    },
    async signIn(req,res) {
        const {email,password} = req.body
        // ver se um usuario pelo email
        model.Users.findOne({where : {email : email }}).then((user,err)=> {
            if (err || !user) {
                return res.status(400).json({message : "Email does not exist"})
            }
            if (!user.validPassword(password)) {
                return res.status(400).json({message : "Email and password does not match"})
            }
            // gerar token se deu tudo beleza
            const token = jwt.sign({id : user.id},process.env.JWT_SECRET)
            res.cookie = ('t',token,{expire : new Date() + 9999})
            user.password  = undefined
            return res.json({
                token,user
            })
        })
    },

    async requireSignIn() {
        expressjwt({
            secret : process.env.JWT_SECRET,
            userProperty : 'auth'
        })
    },

    async isAuthenticated(req,res,next) {
       let user = (req.profile && req.auth && req.profile.id == req.auth.id)
       if (!user) {
           return res.status(400).json({error : "Access Denied you dont have permission to do this operation"})
       }
       next()
    },
    async isAdmin(req,res,next) {
        if (req.user.role ==0) {
            return res.status(400).json({message : "You dont have access to do it"})
        }
        res.json(user)
        next()
    }
}