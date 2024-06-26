const express = require('express');
const multer = require('multer');
const routes = express.Router()
const {register, users, login, verifyUser, deleteUser} = require('../controllers/userController');
const { verifyToken } = require('../middleware/Auth');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb)=> {
        let img = Date.now() + "-" + file.originalname;
        cb(null, img);
    }
})

const upload  = multer({storage}).single('profileImg')

routes.post('/api/register',upload,register)
routes.post('/api/login',login)
routes.get('/api/users',verifyToken,users)
routes.get('/api/verifyUser',verifyToken,verifyUser)
routes.delete('/api/deleteUser',verifyToken,deleteUser)


module.exports = routes