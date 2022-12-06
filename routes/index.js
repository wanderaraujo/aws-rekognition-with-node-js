const express = require("express");
const router = express.Router();
const AWSFaceDetection = require("./../resources/aws-rekogniton/FaceDetection");

/* Method - Detect face of users by photo.
   Recive - Photo in format base 64.
   Return - Return result of reconize.
*/
router.post("/detect-face-image", function (req, res) {
  //recive param photo in base64.
  const photo = req.body.photo;

  AWSFaceDetection.searchFaceByImage(photo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* Method - Index new face of user by photo.
   Recive - Photo in format base 64,
    Id_user is a external id of your control aplication.
   Return - Return result of index.
*/
router.post("/face-image", function (req, res) {
  //recive params photo in base64 and any string represent id.
  const newPhoto = {
    photo: req.body.photo,
    userId: req.body.userId,
  };

  AWSFaceDetection.indexNewImageFace(newPhoto)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* Method - Delete face in collection.
   Recive - Face_id unique ID in AWS represent.
   Return - Return result of delete.
*/
router.delete("/face-image/:faceId", function (req, res) {
  //recive param face_id, thats is a unique key of face.
  const faceId = req.params.faceId;

  AWSFaceDetection.deleteImageByFaceId(faceId)
    .then((data) => {
      res.status(202).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
