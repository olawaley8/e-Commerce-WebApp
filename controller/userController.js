const {User} = require('../model/userModel')

const getUserById = async(req, res)=>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send('User with the given Id does not exist')
      return res.status(200).json({data: user})
}

const getUsers = async(req, res)=>{
    const query = req.query.new 
    const users = query ? await User.find().limit(2).sort({_id:-1 })
    : await User.find()
    if(users) return res.status(200).json(users)
      return res.status(500).json({error:err})

}

const updatedUsers = async(req, res)=>{
    const user = await User.findByIdAndUpdate(req.params.id,{
        $set: req.body.username
    },
    {new: true}
    )
    return res.status(200).json(user)

}

const removeUser = async(req, res)=>{
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    return res.status(200).json("User deleted")
}

const userStats = async(req, res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
             $project: {
                month: {$month: "$createdAt"},
             },   
            },
            {
             $group: {
                _id: "$month",
                total: {$sum: 1},
             },   
            }
        ]
        )
        res.status(200).json(data)
    }

    catch(err){
        res.status(500).json(err)

    }
}

module.exports = {getUserById, getUsers, removeUser, updatedUsers, userStats}