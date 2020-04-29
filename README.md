# Test S3 Connection

Allow users to quickly run this node script to test an S3 connection with the provided environment properties. Useful to test an application's connectivity, whether embedded in a container or not, without leveraging the aws-cli

## Setup

* `npm install`
* `node app.js`

## Local S3 Development

For local development you can deploy an S3 docker container:

* `docker run -p 9000:9000 minio/minio server /data`
* Visit: `http://127.0.0.1:9000/` for a browser-based solution
* S3 API Endpoint: `https://play.min.io:9000`


## Dockerized Execution

* Build: `docker build -t test-s3-connection:latest .`
* Run: `docker run -d --name test-s3-connection --env-file .env test-s3-connection:latest tail -f /dev/null`
* Execute: `docker exec -it -u 0 test-s3-connection node app.js`
