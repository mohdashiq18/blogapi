const mongoose = require("mongoose")

const  Blog= mongoose.Schema({
    imgURL: { type: String, required: true },
    Discription: { type: String, required: true },
    Title: { type: String, required: true },
    Url: { type: String, required: true }
})


const BlogModel = mongoose.model("BlogPost", Blog)

module.exports = {
    BlogModel
}