const Menu = require('../models/menuModel')

exports.insert = async (req, res, next) => {
    try {
        const { name, price } = req.body
        const user = new Menu({
            name,
            price,
        })
        await user.save()
        res.status(200).json({
            data: user,
        })
    } catch (error) {
        res.status(400).json({
            error,
        })
    }
}

exports.find = async (req, res, next) => {
    try {
        const user = await Menu.find()
        res.status(200).json({
            user,
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}
