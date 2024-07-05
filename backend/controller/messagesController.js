const httpStatus = require("http-status")
const Chats = require("../models/messages.model")


exports.getChatsForUser = async (req, res) => {
    try{
        let mobile = req.params.mobile
        const chats = await Chats.find({$or:[
            {"users.from":parseInt(mobile)},
            {"users.to":{$in:parseInt(mobile)}}
        ]})
        return res.status(200).json(chats)
    }catch(err){
        return res.status(500).json(err)
    }
}

exports.getUserBasedChats = async (req, res) => {
    try{
        let mobile = req.params.mobile
        let to = req.params.to
        const chats = await Chats.find({$or:[
            {$and:[{"users.from":parseInt(mobile)},{"users.to":parseInt(to)}]},
            {$and:[{"users.from":parseInt(to)},{"users.to":parseInt(mobile)}]}
        ]}).sort({createdAt:1})
        return res.status(200).json(chats)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.createChats = async (req, res) => {
    console.log("gggggggggggggggggggggg")
    try{
        let body = req.body
        console.log(77777777777777)
        if(!body.group){
            body.mobile = parseInt(body.mobile)
            // body.users = {from:body.mobile, to:parseInt(body.users.to)}
            let created = await Chats.create(body)
            console.log(created)
            if(created){
                return res.status(httpStatus.OK).json({message:"Chat Sent", status:true})
            }else{
                console.log(000000000000000000)
                return res.status(httpStatus.OK).json({message:"Check your Internet", status:false})
            }
        }
    }catch(err){
        console.log("pppppppppppp")
        return res.status(500).json({err:err.message})
    }
    }
    
