var express = require("express");
var router = express.Router();
var facialAWS = require("./../resources/aws-rekogniton/facial-detection");

/* Method - Detect face of users by photo.
   Recive - Photo in format base 64.
   Return - Return result of reconize.
*/   
router.post('/detect-face', function(req, res){
    
    //recive param photo in base64.
    const obj = {
        photo: req.body.photo
    }
    
    //calling method API AWS to recoknition face.
    facialAWS.search_face(obj, function(data){
        
        if(data.found) res.send(data);
        else res.send(data);
        
    });
   
});

/* Method - Index new face of user by photo.
   Recive - Photo in format base 64,
            Id_user is a external id of your control aplication.
   Return - Return result of index.
*/  
router.post('/index-new-face', function(req, res){
    
    //recive params photo in base64 and any string represent id.
    const obj = {
        photo: req.body.photo,
        id_user:req.body.id_user
    }

    //calling method API AWS to index face.
    facialAWS.indexFaces(obj, function(data){
        if(data.found) res.send(data);    
        else res.send(data);
    });
        
});

/* Method - Delete face in collection.
   Recive - Face_id unique ID in AWS represent.
   Return - Return result of delete.
*/  
router.post('/delete-face', function(req, res){

    //recive param face_id, thats is a unique key of face.
    const obj = {
        face_id: req.body.face_id
    }

    //calling method API AWS to delete face.    
    facialAWS.deleteFace(obj, function(data){
        res.send(data);
    });
});

module.exports = router;