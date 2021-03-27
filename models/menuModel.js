const mongoose = require("mongoose")
const Schema = mongoose.Schema
const scheme = Schema(
    {
        name: String,
        price: Number,
    },
    { collection: "menus", timestamps: true, toJSON: { virtuals: true } ,toObject: { virtuals: true } }
)

const menu = mongoose.model("Menu", scheme)
module.exports = menu

scheme.virtual("price_vat").get(function () {
    return this.price * 0.07 + this.price
})

//many to one
