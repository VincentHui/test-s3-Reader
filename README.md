# test-s3-Reader
A S3 file reader demo. This repo contains 4 folders frontend, backend, bucketContents and tf

# Quick setup

1) First run the npm script install-all which will install all node modules for the backend and frontend
`npm run install-all`

2) Add the needed .env files, one for the backend folder (backend/.env) and the frontend folder (frontend/.env). There are .env.temp files there that describe the needed values for the .env files. For the backend you need access to your AWS console and S3 bucket. 

    for the frontend
`REACT_APP_API_URL=http://localhost:1000`

    for the backend
````

ACCESS_KEY_ID=XXXXXXX
SECRET_KEY=XXXXXXXX
BUCKET_NAME=XXXXXXXXX

````

3) Finally run and build the Node.js backend with this line in the terminal in the backend folder `npm run start`. Then run this line in the frontend folder `npm run start`
