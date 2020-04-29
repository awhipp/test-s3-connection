const AWS = require('aws-sdk');
const fs = require('fs')

require('dotenv').config()

// Format configuration variables properly
let bucket = process.env.BUCKET;
while (bucket.indexOf("/") >= 0) {
    bucket = bucket.replace("/","");
}

let key = process.env.KEY.startsWith("/") ? process.env.KEY.substr(1) : process.env.KEY;

// AWS S3 SDK Configuration
let awsConfig = { s3ForcePathStyle: true, signatureVersion: 'v4' };

if(process.env.ACCESS_KEY_ID) awsConfig.accessKeyId = process.env.ACCESS_KEY_ID;
if(process.env.SECRET_ACCESS_KEY) awsConfig.secretAccessKey = process.env.SECRET_ACCESS_KEY;
if(process.env.REGION) awsConfig.region = process.env.REGION;
if(process.env.ENDPOINT) awsConfig.endpoint = process.env.ENDPOINT;

AWS.config.update(awsConfig);
const s3 = new AWS.S3();

// putObject operation validation
var params = {
    Bucket: bucket, 
    Key: key, 
    Body: process.env.BODY
};

console.log("---Testing AWS S3 Connection---");
console.log("AWS Config: ")
console.log(awsConfig);
console.log("Bucket & Directory Config: ")
console.log(params);
console.log("------------------------------");

s3.putObject(params, function(err, data) {
    if (err) {
        console.log(err)
        console.log("------------------------------");
    } else {
        console.log("Successfully uploaded data to: " +  bucket + "/" + key);
        console.log("------------------------------");
    }
});

// getObject operation validation
var params = {
    Bucket: bucket, 
    Key: key
};

fs.closeSync(fs.openSync(process.env.LOCALDIR, 'w'));

var file = fs.createWriteStream(process.env.LOCALDIR);

s3.getObject(params)
    .on('httpData', function(chunk) { file.write(chunk); })
    .on('httpDone', function() { 
        file.end(); 
        console.log("Successfully downloaded data to: " + process.env.LOCALDIR);
        console.log("------------------------------");
    })
    .send();