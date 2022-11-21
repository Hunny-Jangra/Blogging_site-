const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: ' >>>> Blog title is required',
        trim: true
    },
    body: {
        type: String,
        required: ' >>>> Blog body is requird',
        trim: true
    },
    authorId: {
        type: ObjectId,
        required: ' >>>> authorId is manadatory',
        trim: true,
        ref: 'AuthorModel'
    },
    tags: [{type: String, trim: true}],
    category: {
        type: String,
        required: ' >>>> Blog category is required',
        trim: true
    },
    subcategory: [{
        type: String,
        trim: true
    }],
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }

}, {timestamps :true})

const BlogModel = mongoose.model('BlogModel', blogSchema);

module.exports = BlogModel;