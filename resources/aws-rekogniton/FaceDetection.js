const AWS = require("aws-sdk");
AWS.config.region = process.env.AWS_REGION;
const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION });

const uuid = require("node-uuid");
const fs = require("fs-extra");
const path = require("path");
const assert = require("assert");

class FaceDetection {
  static async searchFaceByImage(photo) {
    console.log("searching face image in AWS rekognition");

    const data = await rekognition
      .searchFacesByImage({
        CollectionId: process.env.COLLECTION_NAME, // you can pass CollectionId by param to find in multiple collections
        FaceMatchThreshold: 70, //set minumum match in image send
        Image: {
          Bytes: new Buffer.from(photo, "base64"),
        },
        MaxFaces: 1, // set the number face detect in image send
      })
      .promise();

    if (data.FaceMatches.length > 0) {
      return {
        faceFound: true,
        faceId: data.FaceMatches[0].Face.FaceId,
        smilarity: data.FaceMatches[0].Similarity,
        searchedFaceConfidence: data.SearchedFaceConfidence,
        indexFacesModelVersion: data.FaceMatches[0].IndexFacesModelVersion,
      };
    } else {
      return {
        faceFound: false,
      };
    }
  }

  static async indexNewImageFace(newImageFace) {
    console.log("Index new image face ...");

    const { userId, photo } = newImageFace;

    const data = await rekognition
      .indexFaces({
        CollectionId: process.env.COLLECTION_NAME, // you can pass CollectionId by param to find in multiple collections
        DetectionAttributes: ["ALL"], // set detect all atributes on image send.
        ExternalImageId: userId, // you can provide your id thats make sense for your project
        Image: {
          Bytes: new Buffer.from(photo, "base64"),
        },
      })
      .promise();

    if (data.FaceRecords.length > 0) {
      return {
        faceIndexed: true,
        faceId: data.FaceRecords[0].Face.FaceId,
        smilarity: data.FaceRecords[0].Similarity,
        searchedFaceConfidence: data.SearchedFaceConfidence,
        indexFacesModelVersion: data.FaceRecords[0].IndexFacesModelVersion,
      };
    } else {
      return {
        faceIndexed: false,
      };
    }
  }

  static async deleteImageByFaceId(faceId) {
    console.log("Delete image face ...");

    const data = await rekognition
      .deleteFaces({
        CollectionId: process.env.COLLECTION_NAME, // you can pass CollectionId by param to find in multiple collections
        FaceIds: [faceId],
      })
      .promise();

    if (data.DeletedFaces.length > 0) {
      return { imageDelete: true };
    } else {
      return { imageDelete: false };
    }
  }
}

module.exports = FaceDetection;
