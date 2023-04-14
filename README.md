<img width="1074" alt="image" src="https://user-images.githubusercontent.com/5358155/232140905-f80c5185-4901-4022-996f-d15632751c50.png">


# test-s3-Reader
A S3 file reader demo. This repo contains 4 folders frontend, backend, bucketContents and tf. The frontend is a create-react-app using the typescript template with animation done with react-spring. The backend is node with typescript, using express and the s3 client sdk to make presigned urls. The Cors policies are not ideal but are needed to have them work correctly with this two applications run on localhost off different ports. Inline CSS is used to save time but ideaaly should be replaced with styled-components.

## Quick setup

1) First run the npm script install-all which will install all node modules for the backend and frontend
`npm run install-all`

2) Add the needed .env files, one for the backend folder (backend/.env) and the frontend folder (frontend/.env). There are .env.temp files there that describe the needed values for the .env files. For the backend you need access to your AWS console and S3 bucket. 

for the frontend
````
REACT_APP_API_URL=http://localhost:1000
````
 for the backend
````
ACCESS_KEY_ID=XXXXXXX
SECRET_KEY=XXXXXXXX
BUCKET_NAME=XXXXXXXXX
````

3) Finally run and build the Node.js backend with this line in the terminal in the backend folder `npm run start`. Then run this line in the frontend folder `npm run start`

## Terraform 
There is terraform present, which when applied will create the needed private s3 bucket resource with the right access policies. Only the file `tf/variable.tf` needs to be added with the appropriate values, then it can be planned and applied. 
````
variable "aws_access_key" {
  default = "AKIAR6U7MLWGDLU6U2EN"
}
variable "aws_secret_key" {
  default = "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"
}
variable "region" {
  default = "eu-west-2"
}
````

## Bucket Contents
If you have the AWS CLI present you can run the npm script `sync-s3` from the root folder, with a s3 bucket address to sync the contents of the bucket contents folder. Something like this `npm run sync-s3 s3://private-bucket-test/`
