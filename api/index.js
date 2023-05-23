const express = require ('express')
const cors = require('cors');
const { default: mongoose, } = require('mongoose');
const User = require ('./models/User.jsx')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
require('dotenv').config()
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'ff2dd2ee9rr9ffddererfdfddfdf'
const imageDownloader = require('image-downloader')
const fs = require('node:fs');
const path = require('path');

app.use(express.json());
app.use(cookieParser());
app.use('/models/uploads', express.static(__dirname+'/models/uploads/'));

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}))
console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL)
app.get ('/test', (req,res)=>{
    res.json('test ok')
});

app.post ('/register', async (req,res)=>{
  const {name, email, password} = req.body;
   try {
    const userDoc = await  User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc);
    
   } catch (e) {
    res.status(422).json(e)
   }
 
})
app.post ('/login', async (req,res)=>{
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc) {
        const passOk = bcrypt.compareSync(password,userDoc.password)
     if (passOk) {
        jwt.sign({
             email:userDoc.email,
             id:userDoc._id, 
            //  name:userDoc.name,
        },
             jwtSecret, {}, (err,token)=>{
            if (err) throw err;
            res.cookie('token',token).json(userDoc);
        })
     }else{
        res.status(422).json('pass not okay')
     }
    }
    else{
        res.json('not found')
    }
} )
app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if (token){
      jwt.verify(token, jwtSecret, {}, async (err,userData)=>{
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      })
    }else{
        res.json(null);
    }
    
})
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})


app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName ='photo'+ Date.now() + '.jpg';

  const uploadDir = path.join(__dirname, '/models/uploads/');
  const destPath = path.join(uploadDir, newName);

  try {
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    await imageDownloader.image({
      url: link,
      dest: destPath,
    });

    res.json(newName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload the image' });
  }
});

const photosmiddleware = multer({dest: '/models/uploads'})
app.post('/upload',photosmiddleware.array('photos',100) , (req, res) => {
  const uploadedFiles = [];
   for (let i = 0; i<req.files.length; i++) {
  const {path,originalname} = req.files[i];
  const extension = path.ext(originalname);
  const newPath = path.join(path.dirname(path), `${path.basename(path, extension)}${extension}`);
  fs.renameSync(path, newPath);
  uploadedFiles.push(newPath.replace('/models/uploads/', ''));
}
  res.json(uploadedFiles);
})



//7SMVToAcZ6SXH1up

app.listen(4000)