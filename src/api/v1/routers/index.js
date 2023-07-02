const Routers = require('express').Router();

//------------------------  Initializing your controllers here -------------X
const AuthControllers = require('../controllers/AuthControllers'); //Auth Controller
const ImgControllers = require('../controllers/ImgControllers');

//------------------------  Initializing your middleares here -------------X
const FetchUser = require('../middlewares/FetchUser'); //Fetch the user info regarding to token
const SingleUpload = require('../middlewares/UploadImg');


//----------------------- INitailizing your apis's routes here --------------------X

//-------------------------------- Auth Controllers Specific Stuff--------------------------X
Routers.post('/register',AuthControllers().Register); //Register the users ,using POST '/api/user/register'
Routers.post('/login',AuthControllers().Login); //Login the users ,using POST '/api/user/login'

Routers.get('/getUser', FetchUser , AuthControllers().getUser); //get the info of login users ,using GET '/api/user/getUser'
//--------------------------------------- Auth Controllers Specific Stuff ---------------------------X


//-------------------------------- Img Controllers Specific Stuff--------------------------X
Routers.post('/upload',FetchUser, SingleUpload.single('file') , ImgControllers().UploadImg); //upload the user img with title and description, using POST '/api/user/upload'
Routers.get('/show',FetchUser,ImgControllers().ShowAllImgs); //Show the images of the users with title,description,views, using GET '/api/user/show'
Routers.get('/show/:id',FetchUser,ImgControllers().ShowImg); //Show the only one img content with title,description,views, using GET '/api/user/show/:id'
//-------------------------------- Img Controllers Specific Stuff--------------------------X


module.exports = Routers