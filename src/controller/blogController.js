const blogModel = require('../models/blogModel');

exports.createBlog = async(req, res) => {
    try{
        
        const blogData = req.body;
        const blogData_each5 = await blogModel.create(blogData);
        res.status(201).send({
            status: true,
            data: blogData_each5
        })
    }catch(error) {
        res.status(400).send({
            status: false,
            message: error.message
        })
    }

}

exports.getBlogs = async(req, res) => {
    try{

        const authorId = req.query.authorId;
        const category = req.query.category;
        const tags = req.query.tags;
        const subcategory = req.query.subcategory;
        if(authorId || category || tags || subcategory){
            
            if(category){

                var getBycategory = await blogModel.find({category});
            }else if(tags){

                var getBytags = await blogModel.find({tags});
            }else if(subcategory){

                var getsubcategory = await blogModel.find({subcategory});
            }else{

                var getBlogsdata = await blogModel.find({authorId});
            }
            
            if(getBycategory || getBytags || getsubcategory || getBlogsdata){

                res.status(200).send({
                    status: 'Success',
                    data: getBycategory || getBytags || getsubcategory || getBlogsdata
                })
            }
        }

    }catch(error){
        res.status(400).send({
            status: 'Failed to get Blogs',
            message: error.message
        })
    }
}

exports.updateblogsId = async (req, res) => {
    try{

        let blogidData= req.params.blogId;
        let data = req.body;
        const{title, body, tags, subcategory} = data;
        
        const findData = await blogModel.findByIdAndUpdate({_id: blogidData},{ $addToSet: { tags: tags, subcategory: subcategory }, $set: { title: title, body: body, publishedAt: Date.now() } }, { new: true });           
    
        // console.log(findData)
        if(!findData || findData.isDeleted==true){
            res.status(404).send({msg:"Not found",status:false})
        }
       
        res.status(200).send({msg:findData, status:true});
    }catch(error) {
        res.status(400).send({
            status: 'Failed to update',
            message: error.message
        })
    }
  }

  exports.deletedBlogs = async(req, res) => {
    var data = req.params.blogId;

    const getData = await blogModel.findById({_id: data});

    if(!getData || getData.isDeleted==true){
        res.status(400).send({
            status: 'Failed',
            message: 'Id is not available'
        })
    }else{
        res.status(200).send({
            status: 'Success',
            messsage: 'Yes Id is available here'
        })
    }
    
}

exports.deletedBlogswithparams = async(req, res) => {
    try{

        const authorId = req.query.authorId;
        const category = req.query.category;
        const tags = req.query.tags;
        const subcategory = req.query.subcategory;
    
            if(authorId || category || tags || subcategory) {
                if(category){
    
                    var deleteBycategory = await blogModel.deleteOne({category});
                }else if(tags){
    
                    var deleteBytags = await blogModel.deleteOne({tags});
                }else if(subcategory){
    
                    var deletesubcategory = await blogModel.deleteOne({subcategory});
                }else{
    
                    var deleteBlogsdata = await blogModel.deleteOne({authorId});
                }
    
                if(deleteBycategory || deleteBytags || deletesubcategory || deleteBlogsdata){
    
                    res.status(200).send({
                        status: 'Success',
                        message: 'Successfully deleted Blogs....' 
                    })
                }
                
            }
    }catch(error) {
        res.status(400).send({
            status: 'Failed',
            message: 'Sorry! this document is not deleted....'
        })
    }
}
