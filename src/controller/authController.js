const authorModel = require('../models/authModel');
const jwt = require('jsonwebtoken');

const signupToken = id => {
    return jwt.sign({id}, process.env.JWT_SEC_KEY);
}


exports.createAuthor = async(req, res) => {
    try{
        
        const authorData = req.body;
        const authorCreate = await authorModel.create(authorData);
        const token = await signupToken(authorData._id);

        res.status(200).send({
            status: true,
            token,
            data: authorCreate
        })
    }catch(error) {
        res.status(400).send({
            status: false,
            message: error.message
        })
    }
}

exports.loginAuthor = async(req, res) => {
    
    // 1) Check if email and password is present or not
    const email = req.body.email;
    const password = req.body.password; 

    if(!email) {
        res.status(400).send({
            status: false,
            message: 'Please provide Email or Username'
        });
    }else if(!password){
        res.status(400).send({
            status: false,
            message: 'Please provide password'
        });
    }

    // 2) check email is exist in database and password is correct or not 
    const authorInDB = await authorModel.findOne({email: email, password: password});
  
    if(!authorInDB){
        res.status(400).send({
            status: 'Failed',
            message: 'Please provide valid email and password'
        })
      
    }
    // 3) if everything is ok then pass Token to client
    else{
        const token = signupToken(authorInDB._id);
        res.status(200).send({
            status: 'Perfect login',
            token 
        })
    }

}

exports.protectingMID = async(req, res, next) => {
    // 1) Getting Token and check Toekn is there or not 
    try{

        let token;
        if(req.headers["x-api-key"] && req.headers["x-api-key"].startsWith('Bearer')){
            token = req.headers["x-api-key"].split(' ')[1];
        }
        if(!token) {
            res.status(400).send({
                status: 'Failed',
                message: 'Please logged in to get access'
            })
        }
    
        // 2) verification Process
        const decoded = await jwt.verify(token, process.env.JWT_SEC_KEY);
        console.log(decoded);
    
        // 3)Check if user still exists or not
        const checkUSerExists = await authorModel.findById(decoded.id);
        if(!checkUSerExists) {
            res.status(401).send({
                status: 'invalid user',
                msg: 'User blonging to this token is no longer exist'
            })
        }
        next();
    }catch(error) {
        res.status(400).send({
            status: 'invalid signature',
            msg: error.message
        })
    }
}
