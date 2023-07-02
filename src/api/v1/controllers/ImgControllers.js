//----------------------------- Modals Specific Stuff -----------------------x
const UserModal = require("../models/UserModal");

//----------------------------- Functions Specific Stuff -----------------------x
const GetDataUri = require("../utils/DataUri");

//--------------------------- Packages Specific Stuff --------------------------X
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
// const ObjectId = require('mongoose').ObjectId;

//----------------- Start to writing the img Controller specific stuff functions ---------------X
function ImgControllers() {
    return {

        //Uploading the img with title and description, using POST '/api/user/upload'
        async UploadImg(req, res) {
            try {
                //Constraints to fetch from req.body
                console.log('Check the content of req.body ', req.body);
                const { title, description } = req.body;

                let users = await UserModal.find({ _id: req.user.id });

                // console.log('check the users ',users);

                if (!users) return res.status(404).json({ success: false, msg: 'User not found ' });

                // Now start to create process to uploading images ------------

                //Get the file content 
                const file = req.file;
                // console.log('check the my file content ', file);

                const fileUri = GetDataUri(file);

                const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

                // console.log('check details of cloudinary ', mycloud);

                users = await UserModal.updateOne({ _id: req.user.id },{
                    "$push" : {
                        "uploadImg" : {title,description,img :{
                            public_id:mycloud.public_id,url:mycloud.secure_url
                        }}
                    }
                })

                // users =  await UserModal.findOne({ _id: req.user.id }).select('uploadImg');

                return res.status(200).json({success:true,msg:'Your file uploaded successfully ',users})

            } catch (error) {
                return res.status(500).json({ success: false, msg: `Error occured during upload img ${error}` });
            }
        },

        //Show images with  title, description, img and views , using GET '/api/user/show'
        async ShowAllImgs(req, res) {
            try {

                //-------------- Fetch all the images from user database
                const usersImgs = await UserModal.find({ _id: req.user.id }).select('uploadImg');

                if (!usersImgs) return res.status(404).json({ success: false, msg: "You haven't any realted images are here" })

                console.log('check users img content ', usersImgs);

                return res.status(200).json({ success: true, msg: 'Fetching the images from database', usersImgs });

            } catch (error) {
                return res.status(500).json({ success: false, msg: `Error occured during show all img ${error}` });
            }
        },

        //Show one with title, description, img and views , using GET '/api/user/show/:id'
        async ShowImg(req, res) {
            try {
                console.log('check req.params ',req.params.id)
                // let uploadImgId = new ObjectId(req.params.id);
                // console.log('check upload img id is ',uploadImgId);

                //-------------- Fetch all the images from user database
                // const usersImgs = await UserModal.find({"uploadImg._id":req.params.id});
                // let usersImgs = await UserModal.find({_id:req.user.id},{"uploadImg._id":req.params.id});


                // let usersImgs = await UserModal.aggregate([
                //     {
                //         $match:{_id:req.user.id}
                //     // },{$unwind: "$uploadImg"}, {
                //     //     $match:{"uploadImg._id" : "64a008e9d86c6a32d48046e9"}
                //     }
                // ])

                let usersImgs = await UserModal.find({_id:req.user.id}).select({'uploadImg': {$elemMatch: {'_id':req.params.id}}});

                // console.log('check users upload images ',usersImgs);

                // usersImgs.uploadImg[3] += 1;

                // await usersImgs.save();
                // let usersImgs = await UserModal.updateOne({_id:req.user.id},{
                //     $elemmatch : {
                //         "uploadImg.id" :
                //     }
                // })
                // let usersImgs = await UserModal.find({_id:req.user.id}).select({'uploadImg': {$elemMatch: {'_id':mongoose.Types.ObjectId(req.params.id)}}})

                // let usersImgs = await UserModal.aggregate([{$unwind: "$uploadImg"}, {$match:{"uploadImg._id" : req.params.id}}] )
                // let usersImgs = await UserModal.aggregate([{$match:{"_id": new mongoose.Types.ObjectId(req.user.id)}},{$unwind: "$uploadImg"}, {$match:{"uploadImg._id" : req.params.id}}] )

                // if (!usersImgs) return res.status(404).json({ success: false, msg: "You haven't any realted images are here" })

                console.log('check users img content ', usersImgs[0].uploadImg[0].views);
                usersImgs[0].uploadImg[0].views += 1;

                await usersImgs[0].save();
                // let data = usersImgs[0].uploadImg;

                return res.status(200).json({ success: true, msg: 'You can add one view successfully', usersImgs});

            } catch (error) {
                return res.status(500).json({ success: false, msg: `Error occured during show one img ${error}` });
            }
        }
    }
}

module.exports = ImgControllers;