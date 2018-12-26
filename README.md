# aws-rekognition-with-node-js

Simple application example, using Node Js and API Amazon Rekognition. Index new faces, delete faces and the main functionality facial recognition using photo detect.

## Getting Started

To start, you must have an AWS account, it is necessary to create collection and perform calls to API rekognition.

### Prerequisites

Install Node JS and AWS CLI in your enviroment.

### Installing

The first step, create Collection in your terminal using the folow command 

***Make sure AWS CLI is configured with your keys***

```
aws rekognition create-collection --collection-id <your collection name>
```

Clone this repo

```
git clone https://github.com/wanderaraujo/aws-rekognition-with-node-js.git
```

Run command to install resources 

```
npm i
```

In file **aws-config.js** on folder **/resource/config**, put the collectionName and region that you create your collection
```
module.exports.collectionName = "PUT YOUR COLLECTION NAME HERE";
module.exports.region = "PUT YOUR REGION COLLECTION HERE";
```

And finally run command to start example

```
npm start or node server
```
The application running at port 3000

## Calling the methods 
Using Postman

* **POST /detect-face**
```
POST /detect-face HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

photo=<source with image base 64>
```

* **POST /index-new-face**
```
POST /index-new-face HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
photo=<source with image base 64>&id_user=<id of user in your data base>
```

* **POST /delete-face**
```
POST /delete-face HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

face_id= <string with face id to delete>

```
***Put param photo whitout "image/png;base64,"***

## Built With

* [Node JS](https://nodejs.org/en/) - The base for developer
* [AWS Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/getting-started.html) - API's with reconize
* [AWS CLI](https://docs.aws.amazon.com/rekognition/latest/dg/setup-awscli-sdk.html) - Used to create collections


## Authors

* **Wanderson Araujo** - [WanderAraujo](https://github.com/wanderaraujo)

## License

This project is licensed under the GNU License - see the [LICENSE.md](LICENSE.md) file for details
