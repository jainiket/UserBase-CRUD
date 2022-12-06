const express = require('express');
const UserService = require('../service/UserService');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination:'./public',
  filename:function(req,file,cb) {
      cb(null,Date.now()+'.'+file.mimetype.split('/')[1]);
  }
})
const upload = multer({storage:storage});

router.get('/getUser/:userId',async (request, response) => {
    try {
        let userId = request.params.userId;
        let userData = await UserService.getUser(userId);
        response.json(userData)
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.post('/createUser',upload.single('profileImg'),async(request, response) => {
    try {
        request.body.profileImg = request.file.destination+"/"+request.file.filename;
        let isInserted = await UserService.createUser(request.body);
        if (isInserted.status == "200") {
            response.send(isInserted);
        }
    } catch (error) {
        response.json(error);
    }
});

router.post('/updateUser/:userId', upload.single('profileImg'),async(request, response) => {
    try {
        let userId = request.params.userId;
        request.body.profileImg = request.file.destination+"/"+request.file.filename;
        let userData = await UserService.updateUser(userId,request.body);
        response.json(userData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.delete('/removeUser/:userId', async(request, response) => {
    try {
        let userId = request.params.userId;
        let userData = await UserService.removeUser(userId);
        response.json(userData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.get('/getAllUser', async(request, response) => {
    try {
        let userData = await UserService.getAllUser();
        response.json(userData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});
module.exports = router;